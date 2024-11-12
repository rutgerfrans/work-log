# views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ErrorDetail
from .serializers import UserSerializer
from .models import user


class UserViewSet(viewsets.ModelViewSet):
    queryset = user.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'], url_path='register_user')
    def register_user(self, request):
        log_data = request.data
        print(log_data)
        serializer = UserSerializer(data=log_data)
        if serializer.is_valid():
            serializer.save()
            print("Data is saved to log table.")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['get'], url_path='login_user')
    def login_user(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user_instance = user.objects.get(username=username)
            if user_instance.password == password:
                return Response({'success': True}, status=status.HTTP_200_OK)
            else:
                return Response({'success': False, 'error': 'Incorrect password.'}, status=status.HTTP_401_UNAUTHORIZED)
        except user.DoesNotExist:
            return Response({'success': False, 'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='logout_user')
    def logout_user(self, request):
        # Basic response to simulate a logout action
        return Response({'success': True, 'message': 'User logged out successfully.'}, status=status.HTTP_200_OK)        