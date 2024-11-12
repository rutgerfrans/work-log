from django.urls import path
from .views import UserViewSet

urlpatterns = [
    path('login/', UserViewSet.as_view({'get': 'login_user'}), name='login-user'),
    path('logout/', UserViewSet.as_view({'get': 'logout_user'}), name='logout-user'),
    path('register/', UserViewSet.as_view({'post': 'register_user'}), name='register-user')
]