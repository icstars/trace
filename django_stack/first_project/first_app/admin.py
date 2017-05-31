from django.contrib import admin
from first_app.models import Employee, Management, Rating
# Register your models here.
admin.site.register(Employee)
admin.site.register(Management)
admin.site.register(Rating)
