# Generated by Django 3.0.8 on 2020-07-30 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0005_auto_20200730_0618'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='maxScore',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
