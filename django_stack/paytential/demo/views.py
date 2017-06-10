from django.shortcuts import render
from django.http import HttpResponse
from demo.models import Employee,Manager,Location,Location_lookup,Supervision,Rating
# Create your views here.
employee_list = Employee.objects.order_by('first_name')
employee_dict = {'employees': employee_list }
def index(request):
    return render(request,'demo/dashboard.html',context=employee_dict)

def profile(request):
    return render(request,'demo/profile.html',context=employee_dict)

def login(request):
    return render(request,'demo/login.html')

def evaluation(request):
    return render(request,'demo/evaluation.html',context=employee_dict)

def help(request):
    return render(request,'demo/help.html')

def registration(request):
    return render(request,'demo/registration.html')
