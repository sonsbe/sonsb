# Generated by Django 4.2 on 2023-04-14 08:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_user_score'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='score',
        ),
    ]