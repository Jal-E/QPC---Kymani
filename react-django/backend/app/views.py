
from django.shortcuts import render
from rest_framework.views import APIview
from rest_framework.response import Response
from .models import *
from .serializer import *
from django.db.models import Q, F
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate


class ReactView(APIview):
    def get(self, request):
        output = [{"username": output.employee,
                   "firstname": output.firstname,
                   "lastname": output.lastname}
                  for output in React.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class UserAccountView(APIview):
    def get(self, request):
        output = [{"username": output.username,
                   "password": output.password,
                   "first_name": output.first_name,
                   "last_name": output.last_name,
                   "email": output.email,
                   "project_manager": output.project_manager,
                   }
                  for output in UserAccount.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = UserAccountSerializer(data=request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

        


class Login(APIview):
    def post(self, request):
        output = [{"username": output.username,
                   "password": output.password}
                  for output in UserAccount.objects.all()]
        return Response(output)

    
'''

def Login(request):
    flag = 0
    if (request.method == 'POST'):
#       form = AuthenticationForm()
        Uname = request.POST['username']
        Pword = request.POST['password']
         
        serializer = UserAccountSerializer(data=request.data)
        if ((UserAccount.objects.filter(Q(UserName=Uname) & Q(Password=Pword)).exists())):
            
                request.session['user'] = Uname
                flag = 1
                return Response(serializer.data)
'''
class EmployeeView (APIview):
    def get(self, request): 
        output = [{"employee_code": output.employee_code,
                   "first_name": output.first_name,
                   "last_name" : output.last_name,
                   "user_account": output.user_account}                
                   for output in Employee.objects.all ()]
        return Response(output)
    
    def post(self, request):
        serializer = EmployeeSerializer(data = request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response (serializer.data)
        
class RoleView (APIview):
    def get(self, request): 
        output = [{"role_name": output.role_name}
                   for output in Role.objects.all ()]
        return Response(output)
    
    def post(self, request):
        serializer = RoleSerializer(data = request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response (serializer.data)
        
class TeamMemberView (APIview):
    def get(self, request): 
        output = [{"team_name": output.team_name,
                   "employee_code": output.employee_code}
                   for output in TeamMember.objects.all ()]
        return Response(output)
    
    def post(self, request):
        serializer = TeamMemberSerializer(data = request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response (serializer.data)   

class ProjectManagerView (APIview):
    def get(self, request): 
        output = [{"user_account": output.user_account}
                   for output in ProjectManager.objects.all ()]
        return Response(output)
    
    def post(self, request):
        serializer = ProjectManagerSerializer(data = request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response (serializer.data)    
        
class ProjectView (APIview):
    def get(self, request): 
        output = [{"project_name": output.project_name,
                   "planned_start_date ": output.planned_start_date,
                   "planned_end_date": output.planned_end_date,
                   "planned_budget": output.planned_budget,
                   "spent_budget": output.spent_budget,
                   "description": output.description,
                   "project_manager ": output.project_manager}
                   for output in Project.objects.all ()]
        return Response(output)
    
    def post(self, request):
        serializer = ProjectSerializer(data = request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response (serializer.data)  
        
class OnProjectView (APIview):
    def get(self, request): 
        output = [{"project": output.project,
                   "client_partner ": output.client_partner,
                   "date_start": output.date_start,
                   "date_end": output.date_end,
                   "is_client": output.is_client,
                   "is_partner": output.is_partner,
                   "description ": output.description}
                   for output in OnProject.objects.all ()]
        return Response(output)
    
    def post(self, request):
        serializer = OnProjectSerializer(data = request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response (serializer.data)  
        
class ClientPartnerView (APIview):
    def get(self, request): 
        output = [{"client_name": output.client_name,
                   "address ": output.address,
                   "email": output.email}
                   for output in ClientPartner.objects.all ()]
        return Response(output)
    
    def post(self, request):
        serializer = ClientPartnerSerializer(data = request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response (serializer.data)  
        
class ActivityView (APIview):
    def get(self, request): 
        output = [{"activity_name": output.activity_name,
                   "priority": output.priority,
                   "planned_start_date": output.planned_start_date ,
                   "planned_end_date": output.planned_end_date,
                   "actual_start_date": output.actual_start_date,
                   "actual_end_date": output.actual_end_date,
                   "activity_description":output.activity_description,
                   "budget": output.budget,
                   "project": output.project}
                   for output in Activity.objects.all ()]
        return Response(output)
    
    def post(self, request):
        serializer = ActivitySerializer(data = request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response (serializer.data)  
    
class TaskView (APIview):
    def get(self, request): 
        output = [{"task_name": output.task_name,
                   "priority": output.priority,
                   "planned_start_date": output.planned_start_date ,
                   "planned_end_date": output.planned_end_date,
                   "actual_start_date": output.actual_start_date,
                   "actual_end_date": output.actual_end_date,
                   "task_description":output.task_description,
                   "budget": output.budget,
                   "actual_budget": output.actual_budget,
                   "activity": output.activity}
                   for output in Task.objects.all ()]
        return Response(output)
    
    def post(self, request):
        serializer = TaskSerializer(data = request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response (serializer.data)  
        
class AssignedView (APIview):
    def get(self, request): 
        output = [{"employee": output.employee,
                   "activity": output.activity,
                   "role_name":output.role_name}
                   for output in Assigned.objects.all ()]
        return Response(output)
    
    def post(self, request):
        serializer = AssignedSerializer(data = request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response (serializer.data)  
    
class PrecedingActivityView (APIview):
    def get(self, request): 
        output = [{"preceding_activity": output.preceding_activity,
                   "activity": output.activity}
                   for output in PrecedingActivity.objects.all ()]
        return Response(output)
    
    def post(self, request):
        serializer = PrecedingActivitySerializer(data = request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response (serializer.data)  
        
class PrecedingTaskView (APIview):
    def get(self, request): 
        output = [{"preceding_task": output.preceding_task,
                   "task": output.task}
                   for output in PrecedingTask.objects.all ()]
        return Response(output)
    
    def post(self, request):
        serializer = PrecedingTaskSerializer(data = request.data)
        # If serializer is valid then return response with data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response (serializer.data)  
