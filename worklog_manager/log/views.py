# views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ErrorDetail
from .serializers import LogSerializer
from .models import log


class LogViewSet(viewsets.ModelViewSet):
    queryset = log.objects.all().order_by('-date')
    serializer_class = LogSerializer

    @action(detail=False, methods=['post'], url_path='create-log')
    def create_log(self, request):
        log_data = request.data
        print(log_data)
        serializer = LogSerializer(data=log_data)
        if serializer.is_valid():
            serializer.save()
            print("Data is saved to log table.")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)