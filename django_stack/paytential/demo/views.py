from django.shortcuts import render
from django.http import HttpResponse
from demo.models import Employee,Manager,Location,Location_lookup,Supervision,Rating
# Create your views here.
def index(request):
    employee_list = Employee.objects.order_by('first_name')
    ratings = Employee.objects.managment_relationships()
    employee_dict = {'employees': employee_list }
    return render(request,'demo/dashboard.html',context=employee_dict)

def profile(request, employee_id):
    return render(request,'demo/profile.html')
