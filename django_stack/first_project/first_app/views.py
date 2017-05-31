from django.shortcuts import render
from django.http import HttpResponse
from first_app.models import Employee, Management, Rating

# Create your views here.

def index(request):
    return render(request,'first_app/index.html')
