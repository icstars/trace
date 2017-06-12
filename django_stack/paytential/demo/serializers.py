from rest_framework import serializers
from .models import Employee,Manager,Location,Location_lookup,Supervision,Rating

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        depth = 1
        fields = ('employee_id','first_name','last_name','gender','birth_date','hire_date','position','email','phone',)

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = ('employee_id','first_name','last_name','gender','birth_date','hire_date','position','email','phone',)

class LocationSerializer(serializers.ModelSerializer):
    # assigned_employee = EmployeeSerializer()
    class Meta:
        model = Location
        fields = ('location_id', 'location_name',)

class SupervisiorSerializer(serializers.ModelSerializer):
    supervisor = ManagerSerializer()
    class Meta:
        model = Supervision
        fields = ('supervisor','start_date',)

class SubordinateSerializer(serializers.ModelSerializer):
    subordinate = EmployeeSerializer()
    class Meta:
        model = Supervision
        fields = ('subordinate','start_date',)

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        exclude = ('id','managment_relationship','created_at','updated_at',)
