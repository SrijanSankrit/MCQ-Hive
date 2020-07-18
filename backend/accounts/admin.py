from django.contrib import admin
from .models import UserAccount, Subject, Teacher, Student

# Register your models here.
admin.site.register(UserAccount)
admin.site.register(Subject)
admin.site.register(Teacher)
admin.site.register(Student)
