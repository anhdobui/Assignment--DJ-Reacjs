from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from rest_framework import pagination, viewsets
from rest_framework import status
from rest_framework.response import Response

from .product.models import ProductBranch, ProductCatalogue, ProductItem
from .serializers import (GetBraSerializer, GetCatalogueSerializer,
                          GetPrdSerializer)

# Create your views here.
# api

# ----------------------------------# Api size # -----------------------
class SetPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000
# ----------------------------------------# API Product #-----------------------------------------------------------------------
class GetAllPrd(viewsets.ModelViewSet):
    queryset = ProductItem.objects.filter(active = True).filter(parent_branch__active = True).filter(parent_branch__category__active = True)
    serializer_class = GetPrdSerializer
    pagination_class = SetPagination
   
# ------------------------------------------# API Branch #---------------------------------------------------------------------

class GetAllBranch(viewsets.ModelViewSet):
    queryset = ProductBranch.objects.filter(active = True).filter(category__active = True)
    serializer_class = GetBraSerializer
    pagination_class = SetPagination
    

# --------------------------------------# API Category #-------------------------------------------------------------------------
class GetAllCatalogue(viewsets.ModelViewSet):
    queryset = ProductCatalogue.objects.filter(active = True)
    serializer_class = GetCatalogueSerializer
    pagination_class = SetPagination

# -------------------------------------------------------------------------------------------------------------
@login_required(login_url='login')
def index(request):
    context = {}
    return render(request,'layout/index.html',context)

def logoutUser(request):
    logout(request)
    return redirect('login')



