from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.Serializer):
    name = serializers.CharField()
    address = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = User(**validated_data)
        user.clean()
        user.save()
        return user