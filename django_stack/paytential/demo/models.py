from django.db import models

class Employee(models.Model):
    employee_id = models.IntegerField(primary_key=True)
    is_manager = models.BooleanField(default=False)
    first_name = models.CharField(max_length=264)
    last_name = models.CharField(max_length=264)
    gender = models.CharField(max_length=10)
    birth_date = models.DateField()
    hire_date = models.DateField()
    termination_date = models.DateField(null=True)
    position = models.CharField(max_length=264)
    operational_unit_id = models.IntegerField()
    email = models.EmailField(max_length=264, unique=True)
    phone = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.f_name + " " + self.l_name

class Management(models.Model):
    employee_id = models.ForeignKey(Employee, related_name='Employee.employee_id+')
    manager_id = models.ForeignKey(Employee, related_name='Employee.employee_id+')
    start_date = models.DateField()
    end_date = models.DateField(null=True)

    def __str__(self):
        return str(self.manager_id + ":" + self.employee_id)

class Rating(models.Model):
    employee_id = models.ForeignKey(Management, related_name='Management.employee_id+')
    manager_id = models.ForeignKey(Management, related_name='Management.manager_id+')
    potential = models.IntegerField()
    performance = models.IntegerField()
    timestamp = models.DateTimeField()
    notes = models.TextField()

    def __str__(self):
        return str(self.potential + ":" + self.performance)
