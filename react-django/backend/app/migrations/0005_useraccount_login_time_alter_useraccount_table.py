# Generated by Django 4.2.16 on 2024-10-08 03:31

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0004_merge_20241008_0331"),
    ]

    operations = [
        migrations.AddField(
            model_name="useraccount",
            name="login_time",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterModelTable(
            name="useraccount",
            table="useraccount",
        ),
    ]
