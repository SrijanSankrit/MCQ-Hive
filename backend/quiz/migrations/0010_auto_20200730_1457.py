# Generated by Django 3.0.8 on 2020-07-30 14:57

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0009_takenquizzes_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='answer',
            field=multiselectfield.db.fields.MultiSelectField(choices=[(1, 1), (2, 2), (3, 3), (4, 4)], max_length=7),
        ),
    ]
