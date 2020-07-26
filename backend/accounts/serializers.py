from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from django.contrib.auth import get_user_model
User = get_user_model()

from .models import Subject

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = {'id', 'firstName', 'LastName', 'email', 'password','is_student', 'is_teacher', 'subjects'}


class SubjectsViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'