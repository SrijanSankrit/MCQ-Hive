from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth import get_user_model
User = get_user_model()

from .models import Subject, Student, Teacher
from .serializers import SubjectsViewSerializer

# Functional views here.

@api_view(['GET'])
def SubjectListView(request,pk):
    subjects = Subject.objects.all()
    serializer = SubjectsViewSerializer(subjects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def studentSubCoursesView(request,pk):
    myCourses = Student.objects.get(user_id=pk).subjects.all()
    serializer = SubjectsViewSerializer(myCourses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def studentNotSubCoursesView(request,pk):
    allCourses = Subject.objects.all()
    myCourses = Student.objects.get(user_id=pk).subjects.all()
    remCourses = allCourses.difference(myCourses)
    serializer = SubjectsViewSerializer(remCourses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def teacherSubCoursesView(request,pk):
    myCourses = Teacher.objects.get(user_id=pk).subjects.all()
    serializer = SubjectsViewSerializer(myCourses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def teacherNotSubCoursesView(request,pk):
    allCourses = Subject.objects.all()
    myCourses = Teacher.objects.get(user_id=pk).subjects.all()
    remCourses = allCourses.difference(myCourses)
    serializer = SubjectsViewSerializer(remCourses, many=True)
    return Response(serializer.data)



# Class based views here 

class StudentSubjectsUpdateView(APIView): # For updating student subjects

    def post(self, request, pk):
        data = self.request.data

        courses = data['chosenSubjects']

        student = Student.objects.get(user_id=pk)

        student.subjects.clear()

        for course_id in courses:
            subject = Subject.objects.get(id=course_id)
            student.subjects.add(subject)

        student.save()

        return Response({"Success" : "Changed courses for user"})

class TeacherSubjectsUpdateView(APIView):
        
    def post(self,request,pk):
        data = self.request.data
        courses = data['chosenSubjects']
        teacher = Teacher.objects.get(user_id=pk)

        teacher.subjects.clear()

        for course_id in courses:
            subject = Subject.objects.get(id=course_id)
            teacher.subjects.add(subject)

        teacher.save()

        return Response({"Success" : "Changed courses for teacher"})

class MakeTeacher(APIView):
    
    def post(self, request, pk):
        user = User.objects.get(id=pk)

        if user.is_teacher == False :
            Teacher.objects.create(user=user)

        user.is_teacher = True
        user.save()

        return Response({"success" : "Teacher Permissions Unlocked!"})


