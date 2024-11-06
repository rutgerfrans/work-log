from django.urls import path
from .views import LogViewSet

urlpatterns = [
    path('', LogViewSet.as_view({'get': 'list'}), name='log-list'),
    path('create/', LogViewSet.as_view({'post': 'create_log'}), name='create-log'),
]