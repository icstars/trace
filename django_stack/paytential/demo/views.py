from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from demo.models import Employee,Manager,Location,Location_lookup,Supervision,Rating
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
