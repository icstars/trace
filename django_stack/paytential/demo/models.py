from django.db import models
from django.utils import timezone

class Employee(models.Model):
    class Meta:
        ordering = ('first_name',)

    employee_id = models.PositiveIntegerField(unique=True,default=0)
    managment_relationships = models.ManyToManyField('Manager', through='Supervision',symmetrical=False,related_name='refers_to')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    birth_date = models.DateField(default=timezone.now)
    hire_date = models.DateField(default=timezone.now)
    termination_date = models.DateField(blank=True,null=True,default=None)
    position = models.CharField(max_length=30)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "%s. %s ID: %s"% (self.first_name[0],self.last_name,self.employee_id)

class Manager(Employee):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    permissions_level = models.PositiveIntegerField(default=0)

class Location(models.Model):
    assigned_employee = models.ForeignKey(Employee,related_name='assigned_location')
    location_id = models.PositiveIntegerField(default=0)
    location_name = models.CharField(max_length=50)

    def __str__(self):
        return str(self.assigned_employee)+" is assigned to the location: "+self.location_name

class Location_lookup(models.Model):
    location_id = models.PositiveIntegerField(default=0)
    location_name = models.CharField(max_length=50)

    #JUNK: this is an example of how to write Model class methods
    # def getLoc(cls,loc_id):
    #     pass

    def __str__(self):
        return str(self.location_id)+": "+self.location_name

class Supervision(models.Model):
    subordinate = models.ForeignKey('Employee', related_name='supervisors')
    supervisor = models.ForeignKey('Manager', related_name='employees')
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(blank=True,null=True, default=None)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.supervisor) + ": " + str(self.subordinate)

class Rating(models.Model):
    managment_relationship = models.ForeignKey(Supervision,related_name='ratings',null=True)
    potential = models.PositiveSmallIntegerField(default=0)
    performance = models.PositiveSmallIntegerField(default=0)
    notes = models.TextField(max_length=1000)
    date = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.potential) + ":" + str(self.performance)
