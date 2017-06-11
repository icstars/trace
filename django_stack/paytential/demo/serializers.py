from rest_framework import serializers
from .models import Employee,Manager,Location,Location_lookup,Supervision,Rating

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        exclude = ('id','managment_relationships','termination_date','created_at','updated_at',)

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        exclude = ('id','managment_relationships','termination_date','created_at','updated_at','username','password','permissions_level',)

class LocationSerializer(serializers.ModelSerializer):
    assigned_employee = EmployeeSerializer()
    class Meta:
        model = Location
        fields = ('assigned_employee','location_id', 'location_name',)

class SupervisionSerializer(serializers.ModelSerializer):
    subordinate = EmployeeSerializer()
    supervisor = ManagerSerializer()
    class Meta:
        model = Supervision
        fields = ('subordinate','supervisor','start_date',)

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        exclude = ('id','managment_relationship','created_at','updated_at',)
