from django.db import models
from django.utils import timezone

class Employee(models.Model):
    employee_id = models.PositiveIntegerField(unique=True,default=0)
    managment_relationships = models.ManyToManyField('self', through='Supervision',symmetrical=False,related_name='refers_to')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    birth_date = models.DateField(default=timezone.now)
    hire_date = models.DateField(default=timezone.now)
    termination_date = models.DateField(null=True,default=None)
    position = models.CharField(max_length=30)
    operational_unit_id = models.PositiveIntegerField(default=0)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.first_name + " " + self.last_name

class Manager(Employee):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    permissions_level = models.PositiveIntegerField(default=0)

class Supervision(models.Model):
    subordiante = models.ForeignKey('Employee', related_name='employees')
    supervisor = models.ForeignKey('Manager', related_name='supervisors')
    start_date = models.DateField(timezone.now)
    end_date = models.DateField(null=True, default=None)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.manager_id + ":" + self.employee_id)

class Rating(models.Model):
    subordiante = models.ForeignKey('Supervision', related_name='employees', null=True)
    supervisor = models.ForeignKey('Supervision', related_name='supervisors', null=True)
    potential = models.PositiveSmallIntegerField(default=0)
    performance = models.PositiveSmallIntegerField(default=0)
    notes = models.TextField(max_length=1000)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.potential + ":" + self.performance)
