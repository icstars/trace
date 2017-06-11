from rest_framework import serializers
from .models import Employee,Manager,Location,Location_lookup,Supervision,Rating

class EmployeeDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        exclude = ('id','managment_relationships','termination_date','created_at','updated_at',)
