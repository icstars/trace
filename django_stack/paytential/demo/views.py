from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from demo.models import Employee,Manager,Location,Location_lookup,Supervision,Rating
from demo.serializers import EmployeeDataSerializer
# Create your views here.
employee_list = Employee.objects.order_by('first_name')

position_list = Employee.objects.order_by('position').distinct('position')
ratings_list = Rating.objects.all()
data_dict = {'employees': employee_list,'positions': position_list,'ratings': ratings_list }

def index(request):
    return render(request,'demo/dashboard.html',context=data_dict)

def profile(request):
    return render(request,'demo/profile.html',context=data_dict)

def login(request):
    return render(request,'demo/login.html')

def evaluation(request):
    return render(request,'demo/evaluation.html',context=data_dict)

def help(request):
    return render(request,'demo/help.html')

def registration(request):
    return render(request,'demo/registration.html')

class EmployeeList(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeDataSerializer(employees, many=True)
        return Response(serializer.data)

    def post(self):
        pass
