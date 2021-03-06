# Generated by Django 3.0.8 on 2020-07-28 05:35

from django.db import migrations, models
import django.db.models.deletion
import multiselectfield.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('maxScore', models.IntegerField()),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.Teacher')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.Subject')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(max_length=255)),
                ('option_1', models.TextField(max_length=255)),
                ('option_2', models.TextField(max_length=255)),
                ('option_3', models.TextField(max_length=255)),
                ('option_4', models.TextField(max_length=255)),
                ('score', models.IntegerField()),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quiz.Quiz')),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', multiselectfield.db.fields.MultiSelectField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4')], max_length=7)),
                ('question', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='quiz.Question')),
            ],
        ),
    ]
