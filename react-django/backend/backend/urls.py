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
from app.models import *
from app.serializer import *

class ReactItemView(generics.ListCreateAPIView):
    queryset = React.objects.all()
    serializer_class = ReactSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        firstname = self.request.query_params.get('firstname')
        lastname = self.request.query_params.get('lastname')
        username = self.request.query_params.get('username')
        if firstname:
            queryset = queryset.filter(firstname = firstname)
        if lastname:
            queryset = queryset.filter(lastname=lastname)
        if username:
            queryset = queryset.filter(username=username)
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
        username = self.request.query_params.get('username')  # Make sure the query parameter name matches
        if username:
            queryset = queryset.filter(username__exact=username)  # Adjust the field name here if necessary
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

class ProjectView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('project_name')  # Filter by department name
        if name:
            queryset = queryset.filter(name__icontains=name)  # Case-insensitive partial match
        return queryset

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
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
    path('Project/',ProjectView.as_view(),name='project-list'),
    path('Project/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('OnProject/',OnProjectView.as_view(),name='OnProject-list'),
    path('ClientPartner/',ClientPartnerView.as_view(),name='ClientPartner-list'),
    path('Activity/',ActivityView.as_view(),name='Activity-list'),
    path('Task/',TaskView.as_view(),name=' Task-list'),
    path('Assigned/',AssignedView.as_view(),name='Assigned-list'),
    path('PrecedingActivity/',PrecedingActivityView.as_view(),name='PrecedingActivity-list'),
    path('PrecedingTask/',PrecedingTaskView.as_view(),name='PrecedingTask-list'),
    path('user-login/', UserAccountView.as_view(), name='Login')
    path('react-items/<int:pk>/', ReactItemView.as_view(), name='react-item-detail'),
    path('user-accounts/<int:pk>/', UserAccountView.as_view(), name='useraccount-detail'),
    path('employees/<int:pk>/', EmployeeView.as_view(), name='employee-detail'),
    path('roles/<int:pk>/', RoleView.as_view(), name='role-detail'),
    path('team-members/<int:pk>/', TeamMemberView.as_view(), name='teammember-detail'),
    path('projects/<int:pk>/', ProjectView.as_view(), name='project-detail'),
    path('on-projects/<int:pk>/', OnProjectView.as_view(), name='onproject-detail'),
    path('client-partners/<int:pk>/', ClientPartnerView.as_view(), name='clientpartner-detail'),
    path('activities/<int:pk>/', ActivityView.as_view(), name='activity-detail'),
    path('tasks/<int:pk>/', TaskView.as_view(), name='task-detail'),
    path('assigned/<int:pk>/', AssignedView.as_view(), name='assigned-detail'),
    path('preceding-activities/<int:pk>/', PrecedingActivityView.as_view(), name='precedingactivity-detail'),
    path('preceding-tasks/<int:pk>/', PrecedingTaskView.as_view(), name='precedingtask-detail'),
]
