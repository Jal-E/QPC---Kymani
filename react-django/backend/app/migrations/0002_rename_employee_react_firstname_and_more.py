# Generated by Django 4.2.16 on 2024-09-26 04:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="react",
            old_name="employee",
            new_name="firstname",
        ),
        migrations.RenameField(
            model_name="react",
            old_name="department",
            new_name="lastname",
        ),
        migrations.AddField(
            model_name="react",
            name="username",
            field=models.CharField(default="default_user", max_length=100),
        ),
    ]
