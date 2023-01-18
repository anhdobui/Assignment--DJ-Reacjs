from django.urls import path
from . import views as product 
urlpatterns = [
            # --------------------------------------------------------------------------------------------
    path('product/', product.product , name='product'),
    path('product/create/', product.create_product, name='productCreate'),    
    path('product/update/<str:pk>/', product.update_product, name='productUpdate'),    
    path('product/delete/<str:pk>/', product.delete_product, name='productDelete'),  
    path('product/<str:pk>/', product.status_product, name='productStatus'), 
        # --------------------------------------------------------------------------------------------
    path('branch/', product.branch , name='productBranch'),    
    path('branch/create/', product.create_branch , name='productBranchCreate'),    
    path('branch/update/<str:pk>/', product.update_branch , name='productBranchUpdate'),    
    path('branch/delete/<str:pk>/', product.delete_branch , name='productBranchDelete'),  
    path('branch/<str:pk>/', product.status_branch , name='productBranchStatus'),   
    # --------------------------------------------------------------------------------------------
    path('catalogue/', product.catalogue , name='productCatalogue'),
    path('catalogue/create/', product.create_catalogue , name='productCatalogueCreate'),
    path('catalogue/update/<str:pk>/', product.update_catalogue , name='productCatalogueUpdate'),
    path('catalogue/delete/<str:pk>/', product.delete_catalogue , name='productCatalogueDelete'),
    path('catalogue/<str:pk>/', product.status_catalogue , name='productCatalogueStatus'),
]