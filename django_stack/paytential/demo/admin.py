from django.contrib import admin
from demo.models import Employee,Manager,Location,Location_lookup,Supervision,Rating
# Register your models here.
admin.site.register(Employee)
admin.site.register(Manager)
admin.site.register(Location)
admin.site.register(Location_lookup)
admin.site.register(Supervision)
admin.site.register(Rating)
