# workhours/serializers.py
from rest_framework import serializers
from .models import log

class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = log
        fields = ['date', 'hours', 'description']