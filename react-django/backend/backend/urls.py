"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from rest_framework import generics
from app.models import React
from app.serializer import *

class ReactItemView(generics.ListCreateAPIView):
    queryset = React.objects.all()
    serializer_class = ReactSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(employee=name)
        return queryset

class TeamItemView(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamNameSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('team_name')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset

class UserAccountView(generics.ListCreateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('username')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset

class EmployeeView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('user_account')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset
    
class RoleView(generics.ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('role_name')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset
    
class TeamMemberView(generics.ListCreateAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('team_name')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset
    
class ProjectManagerView(generics.ListCreateAPIView):
    queryset = ProjectManager.objects.all()
    serializer_class = ProjectManagerSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('user_account')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset
    
class ProjectView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('project_name')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset
    
class OnProjectView(generics.ListCreateAPIView):
    queryset = OnProject.objects.all()
    serializer_class = OnProjectSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('project')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset
    
class ClientPartnerView(generics.ListCreateAPIView):
    queryset = ClientPartner.objects.all()
    serializer_class = ClientPartnerSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('client_name')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset
    
class ActivityView(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('activity_name')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset
    
class TaskView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('task_name')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset
    
class AssignedView(generics.ListCreateAPIView):
    queryset = Assigned.objects.all()
    serializer_class = AssignedSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('employee')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset
    
class PrecedingActivityView(generics.ListCreateAPIView):
    queryset = PrecedingActivity.objects.all()
    serializer_class = PrecedingActivitySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('Preceding_activity')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset
    
class PrecedingTaskView(generics.ListCreateAPIView):
    queryset = PrecedingTask.objects.all()
    serializer_class = PrecedingTaskSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('preceding_task')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset
    
# Define urlpatterns to include your view
urlpatterns = [
    path('react-items/', ReactItemView.as_view(), name='react-item-list'),
    path('team-names/', TeamItemView.as_view(), name='team-names-list'),
    path('user-accounts/', UserAccountView.as_view(), name='useraccount-list'),
    path('Employee/', EmployeeView.as_view(), name='employee-list'),
    path('Role/', RoleView.as_view(), name='Role-list'),
    path('TeamMember/',TeamMemberView.as_view(),name='teammember-list'),
    path('ProjectManager/',ProjectManagerView.as_view(),name='ProjectManager-list'),
    path('Project/',ProjectView.as_view(),name='project-list'),
    path('OnProject/',OnProjectView.as_view(),name='OnProject-list'),
    path('ClientPartner/',ClientPartnerView.as_view(),name='ClientPartner-list'),
    path('Activity/',ActivityView.as_view(),name='Activity-list'),
    path('Task/',TaskView.as_view(),name=' Task-list'),
    path('Assigned/',AssignedView.as_view(),name='Assigned-list'),
    path('PrecedingActivity/',PrecedingActivityView.as_view(),name='PrecedingActivity-list'),
    path('PrecedingTask/',PrecedingTaskView.as_view(),name='PrecedingTask-list')
] 