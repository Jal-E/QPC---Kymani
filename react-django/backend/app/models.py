
from django.db import models
from django.utils import timezone
class React (models.Model):
    username = models.CharField(max_length=100, default='default_user')
    firstname = models.CharField (max_length = 30)
    lastname = models.CharField (max_length = 200)
class UserAccount(models.Model):
    username = models.CharField(max_length=45, primary_key=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    project_manager = models.BooleanField(default=False)
    login_time = models.DateTimeField(default=timezone.now)
    class Meta:
        db_table= 'useraccount'
class Employee(models.Model):
    employee_code = models.CharField(max_length=20, default="DEFAULT")
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    class Meta:
        db_table= 'employee'
class Team(models.Model):
    team_name = models.CharField(max_length=75, primary_key=True)
    class Meta:
        db_table= 'team'
class Role(models.Model):
    role_name = models.CharField(max_length=75, primary_key=True)
    class Meta:
        db_table= 'role'
class TeamMember(models.Model):
    team_name = models.ForeignKey(Team, on_delete=models.CASCADE)
    employee_code = models.ForeignKey(Employee, on_delete=models.CASCADE)
    role_name = models.ForeignKey(Role, on_delete=models.CASCADE,default='DEFAULT')
    class Meta:
        db_table= 'team_member'
class ClientPartner(models.Model):
    client_name = models.CharField(max_length=45, primary_key=True)
    address = models.CharField(max_length=75)
    email = models.CharField(max_length=45)
    class Meta:
        db_table= 'clientpartner'
class Project(models.Model):
    project_name = models.CharField(max_length=75)
    planned_start_date = models.DateField()
    planned_end_date = models.DateField()
    planned_budget = models.DecimalField(max_digits=12, decimal_places=2)
    spent_budget = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    description = models.TextField()
    project_manager = models.ForeignKey(
        UserAccount,
        on_delete=models.CASCADE,
        limit_choices_to={'project_manager': True},
        null=True,
        blank=True
    )
    file_upload = models.FileField(upload_to='uploads/', null=True, blank=True)
    class Meta:
        db_table= 'project'
class OnProject(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    client_partner = models.ForeignKey(ClientPartner, on_delete=models.CASCADE)
    date_start = models.DateField()
    date_end = models.DateField()
    is_client = models.BooleanField()
    is_partner = models.BooleanField()
    description = models.TextField()
    class Meta:
        db_table = 'on_project'
class Activity(models.Model):
    activity_name = models.CharField(max_length=75)
    priority = models.IntegerField(default=0)
    planned_start_date = models.DateField()
    planned_end_date = models.DateField()
    actual_start_date = models.DateField(null=True, blank=True)
    actual_end_date = models.DateField(null=True, blank=True)
    activity_description = models.TextField()
    budget = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    class Meta:
        db_table= 'activity'
class Task(models.Model):
    task_name = models.CharField(max_length=75)
    priority = models.IntegerField(default=0)
    planned_start_date = models.DateField()
    planned_end_date = models.DateField()
    actual_start_date = models.DateField(null=True, blank=True)
    actual_end_date = models.DateField(null=True, blank=True)
    task_description = models.TextField()
    budget = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    actual_budget = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    class Meta:
        db_table= 'task'
class Assigned(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    role_name = models.ForeignKey(Role, on_delete=models.CASCADE, default='DEFAULT')
    class Meta:
        db_table= 'assigned'
class PrecedingActivity(models.Model):
    preceding_activity = models.ForeignKey(Activity, related_name='preceding_activities', on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, related_name='subsequent_activities', on_delete=models.CASCADE)
    class Meta:
        db_table= 'precedingactivity'
class PrecedingTask(models.Model):
    preceding_task = models.ForeignKey(Task, related_name='preceding_tasks', on_delete=models.CASCADE)
    task = models.ForeignKey(Task, related_name='subsequent_tasks', on_delete=models.CASCADE)
    class Meta:
       db_table= 'precedingtask'