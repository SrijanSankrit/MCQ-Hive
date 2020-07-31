from rest_framework import serializers, fields

from .models import Question, Quiz, Answer, ANSWER_CHOICES, TakenQuizzes

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model=Answer
        fields = ('answer',)


class QuizViewSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model=Quiz
        fields= '__all__'

class TakenQuizSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer(many=False)

    class Meta:
        model=TakenQuizzes
        fields = '__all__'

