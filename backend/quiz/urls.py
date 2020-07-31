from django.urls import path

from . import views

urlpatterns = [
    path('quiz/create/', views.createQuiz, name="create-quiz"),
    path('quiz/delete/<str:quiz_id>/', views.deleteQuiz, name="delete-quiz"),
    path('quiz/detail/<str:quiz_id>/', views.quizDetailView, name="quiz-detail"),
    path('quiz/publish/<str:quiz_id>/', views.publishQuiz, name="publish_quiz"),
    path('quiz/update/<str:quiz_id>/', views.updateQuiz, name="update-quiz"),
    
    path('question/delete/<str:question_id>/', views.deleteQuestion, name="delete-question"),
    path('question/create/<str:quiz_id>/', views.createQuestion, name="question-create"),

    path('student/<str:user_id>/taken-quiz/', views.studentTakenQuizList, name="student-taken-quiz-list"),
    path('student/<str:user_id>/not-taken-quiz/<str:subject_id>/', views.studentNotTakenQuizList, name="student-not-taken-quiz-list"),

    path('teacher/<str:user_id>/quiz-list/<str:subject_id>/', views.teacherQuizList, name="teacher-quiz-list"),
    path('student/<str:user_id>/check-quiz-result/<str:quiz_id>/', views.quizAnswerCheck, name="quiz-answer-check"),

    path('teacher/quiz-answers/<str:quiz_id>/', views.getAnswers, name='quiz-answers'),
    path('teacher/answers/update/<str:quiz_id>/', views.updateAnswers, name="update-answer"),
]