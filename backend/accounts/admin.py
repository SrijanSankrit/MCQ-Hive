from django.contrib import admin

# Register your models here.
from .models import Subject, UserAccount, Teacher, Student

admin.site.register(Subject)
admin.site.register(UserAccount)
admin.site.register(Teacher)
admin.site.register(Student)