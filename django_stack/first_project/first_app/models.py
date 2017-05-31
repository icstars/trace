from django.db import models

class Employee(models.Model):
    employee_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=264)
    last_name = models.CharField(max_length=264)
    gender = models.CharField(max_length=264)
    birth_date = models.DateField()
    hire_date = models.DateField()
    position = models.CharField(max_length=264)
    department = models.CharField(max_length=264)
    operational_unit_id = models.IntegerField()
    # location = models.CharField(max_length=264)
    email = models.EmailField(max_length=264, unique=True)
    phone = models.IntegerField(unique=True)
    extension = models.IntegerField()

    def __str__(self):
        return self.f_name + " " + self.l_name

class Management(models.Model):
    #TODO handle recursive assignment
    employee_id = models.ForeignKey(Employee)
    manager_id = models.ForeignKey(Employee)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return str(self.manager_id + ":" + self.employee_id)

class Rating(models.Model):
    #TODO figure out how to assign composite keys
    employee_id = models.ForeignKey(Management)
    manager_id = models.ForeignKey(Management)
    potential = models.IntegerField()
    performance = models.IntegerField()
    timestamp = models.DateTimeField()
    #TODO size notes appropriately
    notes = models.CharField(max_length=264)

    def __str__(self):
        return str(self.potential + ":" + self.performance)
