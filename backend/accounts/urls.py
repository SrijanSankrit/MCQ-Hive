from django.urls import path

from .views import SubjectListView, TeacherSubjectsUpdateView, StudentSubjectsUpdateView, MakeTeacher, teacherSubCoursesView, teacherNotSubCoursesView, studentSubCoursesView, studentNotSubCoursesView 

urlpatterns = [
    path('subjects/', SubjectListView),
    path('teacher/subjects/subscribed/<str:pk>/', teacherSubCoursesView, name="teacher-subscribed"),
    path('teacher/subjects/unsubscribed/<str:pk>/', teacherNotSubCoursesView, name="teacher-unsubscribed"),
    path('student/subjects/subscribed/<str:pk>/', studentSubCoursesView, name="student-subscribed"),
    path('student/subjects/unsubscribed/<str:pk>/', studentNotSubCoursesView, name="student-unsubscribed"),

    
    path('student/subjects/update/<str:pk>/', StudentSubjectsUpdateView.as_view()),
    path('teacher/subjects/update/<str:pk>/', TeacherSubjectsUpdateView.as_view()),
    path('teacher/add/<str:pk>/', MakeTeacher.as_view()),
]