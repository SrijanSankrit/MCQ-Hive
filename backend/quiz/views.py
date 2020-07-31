from rest_framework.response import Response
from rest_framework.decorators import api_view

from accounts.models import Teacher, Student, Subject

from .models import Quiz, Question, Answer, TakenQuizzes
from .serializers import QuestionSerializer, QuizSerializer, QuizViewSerializer, TakenQuizSerializer, AnswerSerializer

# Create Quiz | Done Tested
# Create Question and Answer and adding to quiz | 
# Quiz Detail View | Done Tested
# Delete Quiz | Done Tested
# Publish Quiz |
# Delete Question and Answer | Done
# Update Question | 
# Quiz list for a Teacher | Done Tested
# Quiz not taken list for a student | Done Tested
# Quiz taken list for a student | Done Tested

@api_view(['POST'])
def createQuiz(request):

    user_id = request.data['owner']
    owner = Teacher.objects.get(user_id=user_id)

    subject_id = request.data['subject_id']
    subject = Subject.objects.get(id=subject_id)
    title = request.data['title']
    is_published = request.data['is_published']

    questions_list = request.data['questions']

    quiz = Quiz.objects.create(
        owner=owner,
        subject=subject,
        title=title,
        is_published=is_published,
        maxScore=0
    )

    for question in questions_list:
        createdQuestion = Question.objects.create(
            description=question["Description"],
            option_1=question['Choice_1'],
            option_2=question['Choice_2'],
            option_3=question['Choice_3'],
            option_4=question['Choice_4'],
            score=question['Score'],
        )

        quiz.questions.add(createdQuestion)
        
        quiz.maxScore += int(createdQuestion.score)
        quiz.save()

        answer = Answer.objects.create(
            question=createdQuestion,
            answer = question["Answer"]
        )

    return Response({"Success" : "Quiz Created!", "id" : quiz.id})

@api_view(['POST'])
def updateQuiz(request, quiz_id):
    data = request.data

    quiz = Quiz.objects.get(id=quiz_id)

    quiz.title = data['title']
    quiz.is_published=data["is_published"]

    questions_list = data["questions"]

    questions_id = list(quiz.questions.all().values_list('id', flat=True))

    for i  in range(0,len(questions_list)):
        question = Question.objects.get(id=questions_id[i])
        question.description = questions_list[i]["description"]
        question.option_1 = questions_list[i]["option_1"]
        question.option_2 = questions_list[i]["option_2"]
        question.option_3 = questions_list[i]["option_3"]
        question.option_4 = questions_list[i]["option_4"]
        question.score = questions_list[i]["score"]
        question.save()

    quiz.save()

    return Response({"success" : "quiz updated successfully!"})

    

@api_view(['POST'])
def createQuestion(request, quiz_id):
    questions_list = request.data["questions"]

    quiz = Quiz.objects.get(id=quiz_id)

    for question in questions_list:
        createdQuestion = Question.objects.create(
            description=question["Description"],
            option_1=question['Choice_1'],
            option_2=question['Choice_2'],
            option_3=question['Choice_3'],
            option_4=question['Choice_4'],
            score=question['Score'],
        )

        quiz.questions.add(createdQuestion)
        
        quiz.maxScore += int(createdQuestion.score)
        quiz.save()

        Answer.objects.create(
            question=createdQuestion,
            answer = list(question["Answer"])
        )

    return Response({"Success": "Questions added successfully"})

@api_view(['POST'])
def publishQuiz(request, quiz_id):
    quiz = Quiz.objects.get(id=quiz_id)
    quiz.is_published = True

    return Response({"success" : "Quiz Published!"})

@api_view(['DELETE'])
def deleteQuiz(request, quiz_id):
    quiz = Quiz.objects.get(id=quiz_id)

    questions = quiz.questions.all()

    for question in questions:
        question.delete()

    quiz.delete()

    return Response({"Success" : "Quiz Deleted!"})

@api_view(['DELETE'])
def deleteQuestion(request, question_id):
    question = Question.objects.get(id=question_id)

    question.delete()

    return Response({"Success" : "Question Deleted!"})


@api_view(['GET'])
def teacherQuizList(request, user_id, subject_id):
    teacher = Teacher.objects.get(user_id=user_id)

    teacherQuizzes = Quiz.objects.filter(owner_id=teacher.id).filter(subject_id=subject_id)
    serializer = QuizSerializer(teacherQuizzes, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def studentTakenQuizList(request, user_id):
    
    student = Student.objects.get(user_id=user_id)
    takenQuizList = TakenQuizzes.objects.filter(student=student)

    serializer = TakenQuizSerializer(takenQuizList, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def studentNotTakenQuizList(request, user_id, subject_id):
    student = Student.objects.get(user_id=user_id)
    takenQuizList = TakenQuizzes.objects.filter(student=student).values_list('id', flat=True)

    studentNotTakenQuizList = Quiz.objects.filter(subject_id=subject_id).exclude(id__in=takenQuizList)
    print(studentNotTakenQuizList)

    serializer = QuizSerializer(studentNotTakenQuizList, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def quizDetailView(request, quiz_id):
    quiz = Quiz.objects.get(id=quiz_id)

    serializer = QuizViewSerializer(quiz, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def quizAnswerCheck(request, quiz_id, user_id):
    data = request.data
    questions_id = Quiz.objects.get(id=quiz_id).questions.values_list('id', flat=True)

    StudentAnswers = data['answers']

    studentScore = 0

    for i in range(0,len(StudentAnswers)):
        correctAnswer = list(Answer.objects.get(question_id=questions_id[i]).answer)
        correctAnswer = [int(i) for i in correctAnswer]
        print(correctAnswer, StudentAnswers[i])
        if correctAnswer == StudentAnswers[i]:
            questionScore = Question.objects.get(id=questions_id[i]).score
            studentScore += int(questionScore)
    
    TakenQuizzes.objects.create(
        student= Student.objects.get(user_id=user_id),
        quiz=Quiz.objects.get(id=quiz_id),
        score=studentScore
    )

    return Response({"success": "done checking!"})


@api_view(['GET'])
def getAnswers(request, quiz_id):
    quiz = Quiz.objects.get(id=quiz_id)

    question_ids = quiz.questions.all().values_list('id', flat=True)

    answers = Answer.objects.filter(question_id__in=question_ids)
    serializer = AnswerSerializer(answers, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def updateAnswers(request, quiz_id):

    data = request.data
    print(data)

    quiz = Quiz.objects.get(id=quiz_id)

    question_ids = list(quiz.questions.all().values_list('id', flat=True))

    i=0
    for question_id in question_ids:
        currAns = Answer.objects.get(question_id=question_id)
        data[i]["answer"] = [int(i) for i in data[i]["answer"]]
        currAns.answer = data[i]["answer"]
        currAns.save()
        i = i+1

    return Response({"success" : "answers updated!"})
