from django.contrib import admin
from demo.models import Employee,Manager,Supervision,Rating
# Register your models here.
admin.site.register(Employee)
admin.site.register(Manager)
admin.site.register(Supervision)
admin.site.register(Rating)
