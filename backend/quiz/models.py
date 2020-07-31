from django.db import models
from accounts.models import Subject, Teacher, Student
from multiselectfield import MultiSelectField

# Quiz model will give option to make quiz and add either new questions.
# First make a quiz model and then add questions.

ANSWER_CHOICES = (
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
    )

class Question(models.Model):
    
    description = models.TextField(max_length=255)
    option_1 = models.TextField(max_length=255)
    option_2 = models.TextField(max_length=255)
    option_3 = models.TextField(max_length=255)
    option_4 = models.TextField(max_length=255)
    score = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.description

class Quiz(models.Model):

    owner = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    maxScore = models.IntegerField(blank=True, null=True)
    is_published = models.BooleanField(default=False)
    rating = models.DecimalField(default=5, max_digits=2, decimal_places=1)
    questions = models.ManyToManyField(Question, blank=True)

    def __str__(self):
        return self.title

class Answer(models.Model):

    question = models.OneToOneField(Question, on_delete=models.CASCADE)
    answer = MultiSelectField(choices=ANSWER_CHOICES, max_choices=4)

    def __str__(self):
        return self.question.description

class TakenQuizzes(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=5,decimal_places=2)
    date = models.DateTimeField(auto_now_add=True, null=True )

    def __str__(self):
        return self.student.user.get_full_name()

