from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager): # Defining custom user model
    def create_user(self, email, firstName, lastName, is_student, is_teacher, password=None):
        if not email:
            raise ValueError('Users must have an email address.')

        email = self.normalize_email(email)
        user = self.model(email=email,firstName=firstName, lastName = lastName, is_student=is_student, is_teacher=is_teacher)
        user.set_password(password)
        user.save()

        if(is_student == True):
            Student.objects.create(user=user)
        
        if(is_teacher == True):
            Teacher.objects.create(user=user)

        
        return user


    def create_superuser(self, email, firstName, lastName, password=None, is_student= True, is_teacher=False):
        user = self.create_user(email,firstName,lastName,is_student, is_teacher, password)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class Subject(models.Model):  # class for storing names of subjects
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name

class UserAccount(AbstractBaseUser, PermissionsMixin): # Custom user model
    email = models.EmailField(max_length= 255, unique=True)
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    

    objects = UserAccountManager()

    #Overriding django defualt username and password fields requirement

    USERNAME_FIELD= 'email'
    REQUIRED_FIELDS = ['firstName', 'lastName', 'is_teacher', 'is_student']

    def get_full_name(self):
        return (self.firstName + ' ' +  self.lastName)
    
    def get_short_name(self):
        return self.firstName

    def __str__(self):
        return self.email

class Teacher(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subject, blank=True)

    def __str__(self):
        return self.user.get_full_name()

# All quizzes of a teacher can be accessed by Quiz.objects.filter(owner_id = teacher_id)
    
class Student(models.Model):

    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subject, blank=True)

    def __str__(self):
        return self.user.firstName

# Taken quizzes can be found here
# new quizzes can be found for every subject by 
# Quiz.objects.filter(subject=subject).subtract(Student.objects.get(id=id).takenQuizzes.all())
