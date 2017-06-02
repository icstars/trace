from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def index(request):
    my_dict = {'temp_tag':"Blah blah bblah"}
    return render(request,'demo/index.html',context=my_dict)
    # return HttpResponse("hello world")
