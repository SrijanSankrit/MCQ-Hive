from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view

from .serializers import SubjectSerializer
from .models import Subject, Teacher, Student

# Create your views here.

class TeacherSignupView(APIView):

    def post(self, request, format=None):
        data = self.request.data

        firstName = data['firstName']
        lastName = data['lastName']
        email = data['email']
        password = data['password']
        password2 = data['password2']
        ids = data['subjects']

        if password==password2:
            if User.objects.filter(email=email).exists():
                return Response({'error':'Email already exists'})
            else:
                if len(password) < 6:
                    return Response({'error':'Password must be atleast 6 characters'})
                else:
                    user = User.objects.create_user(email=email, password = password, firstName=firstName, lastName = lastName)

                    for id in ids:
                        current = Subject.objects.get(pk=id)
                        user.subjects.add(current)
                    
                    user.is_teacher = True
                    user.save()
                    Teacher.objects.create(user=user)
                    
                    return Response({'success':'Teacher account created successfully'})
        else:
            return Response({'error': 'Passwords do not match'})

class StudentSignupView(APIView):

    def post(self, request, format=None):
        data = self.request.data

        firstName = data['firstName']
        lastName = data['lastName']
        email = data['email']
        password = data['password']
        password2 = data['password2']
        ids = data['subjects']

        if password==password2:
            if User.objects.filter(email=email).exists():
                return Response({'error':'Email already exists'})
            else:
                if len(password) < 6:
                    return Response({'error':'Password must be atleast 6 characters'})
                else:
                    user = User.objects.create_user(email=email, password = password, firstName=firstName, lastName = lastName)

                    for id in ids:
                        current = Subject.objects.get(pk=id)
                        user.subjects.add(current)
                    
                    user.is_student = True
                    user.save()
                    Student.objects.create(user=user)

                    return Response({'success':'Student account created successfully'})
        else:
            return Response({'error': 'Passwords do not match'})


@api_view(['GET'])
def SubjectListView(request):
    subjects = Subject.objects.all()
    serializer = SubjectSerializer(subjects, many=True)
    return Response(serializer.data)