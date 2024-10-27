
from django.shortcuts import render
from rest_framework.response import Response
from .models import *
from .serializer import *
from rest_framework import status
from rest_framework.views import APIView

class ReactView(APIView):
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

class UserAccountView(APIView):
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

class EmployeeView (APIView):
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

class RoleView (APIView):
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

class TeamMemberView (APIView):
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

class ProjectView(APIview):
    def get(self, request):
        output = [{"project_name": output.project_name,
                   "planned_start_date": output.planned_start_date,
                   "planned_end_date": output.planned_end_date,
                   "planned_budget": output.planned_budget,
                   "spent_budget": output.spent_budget,
                   "description": output.description,
                   "project_manager": output.project_manager,
                   "file_upload": output.file_upload}
                  for output in Project.objects.all()]
        return Response(output)

    def get_project(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def put(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
            serializer = ProjectSerializer(instance=project, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except Project.DoesNotExist:
            return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
            project.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Project.DoesNotExist:
            return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

class OnProjectView (APIView):
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

class ClientPartnerView (APIView):
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

class ActivityView (APIView):
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

class TaskView (APIView):
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

class AssignedView (APIView):
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

class PrecedingActivityView (APIView):
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

class PrecedingTaskView (APIView):
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
