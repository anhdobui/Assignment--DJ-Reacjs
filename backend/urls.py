from django.urls import path,include
from . import views as home
from .user import views as user
from .groupUser import views as groupUser
from .login import views as login
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('product/api',home.GetAllPrd)
router.register('branch/api',home.GetAllBranch)
router.register('catalogue/api',home.GetAllCatalogue)

urlpatterns = [
    path('', home.index, name='dashboard'),
    path('logout/', home.logoutUser,name='logout'),
    path('login/', login.Login.as_view() ,name='login'),
    path('user/', user.index,name='user'),
    path('groupUser/', groupUser.index,name='groupUser'),
    path('product/', include('backend.product.urls')),
    
    # api
    path('', include(router.urls)),
]
