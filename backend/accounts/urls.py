from django.urls import path
from .views import TeacherSignupView, SubjectListView, StudentSignupView

urlpatterns = [
    path('signup/teacher/', TeacherSignupView.as_view() ),
    path('signup/student/' , StudentSignupView.as_view()),
    path('subjects/', SubjectListView),
]