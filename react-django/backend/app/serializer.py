from rest_framework import serializers
from .models import * 
class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['username', 'firstname', 'lastname']
class TeamNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['team_name']
class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['username','password','first_name','last_name','email','project_manager','login_time'] 
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['employee_code','first_name','last_name','user_account']
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['role_name']   
class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['team_name','employee_code','role_name'] 
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
class OnProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnProject
        fields = '__all__'
class ClientPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientPartner
        fields = ['client_name','address','email'] 
class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['activity_name','priority','planned_start_date','planned_end_date','actual_start_date','actual_end_date','activity_description','budget','project'] 
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['task_name','priority','planned_start_date','planned_end_date','actual_start_date','actual_end_date','task_description','budget','actual_budget','activity'] 
class AssignedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assigned
        fields = ['employee','activity','role_name'] 
class PrecedingActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = PrecedingActivity
        fields = ['preceding_activity','activity'] 
class PrecedingTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model =PrecedingTask
        fields = ['preceding_task','task']
