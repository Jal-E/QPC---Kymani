# Generated by Django 4.2.16 on 2024-10-14 20:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0005_useraccount_login_time_alter_useraccount_table"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="project",
            name="project_manager",
        ),
        migrations.RemoveField(
            model_name="project",
            name="spent_budget",
        ),
    ]
