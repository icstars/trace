from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from demo.models import Employee,Manager,Location,Location_lookup,Supervision,Rating
from demo.serializers import EmployeeSerializer,ManagerSerializer,LocationSerializer,SupervisiorSerializer,SubordinateSerializer,RatingSerializer
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
        employee_serializer = EmployeeSerializer(employees, many=True)
        return Response(employee_serializer.data)

    def post(self):
        pass

class EmployeeDetail(APIView):
    def get(self, request, pk):
        #employee
        emp = Employee.objects.filter(employee_id=pk)
        employee_serializer = EmployeeSerializer(emp, many=True)
        #location
        loc = Location.objects.filter(assigned_employee=emp)
        location_serializer = LocationSerializer(loc, many=True)
        #supervision
        sprv = Supervision.objects.filter(subordinate=emp)
        supervisior_serializer = SupervisiorSerializer(sprv, many=True)
        sub = Supervision.objects.filter(supervisor=emp)
        subordinate_serializer = SubordinateSerializer(sub, many=True)
        #ratings
        rat = Rating.objects.filter(managment_relationship__subordinate=emp)
        rating_serializer = RatingSerializer(rat, many=True)

        return Response({
            'details': employee_serializer.data,
            'assigned_locations': location_serializer.data,
            'supervisors': supervisior_serializer.data,
            'subordinates': subordinate_serializer.data,
            'ratings': rating_serializer.data,
        })
