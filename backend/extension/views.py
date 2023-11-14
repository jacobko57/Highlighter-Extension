from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def hello_world(request):
    return HttpResponse("Chewy is super cute!")

def jacob(request):
    return HttpResponse("Jacob is awesome.")

def jianna(request):
    return HttpResponse("Jianna has some super strong pokemon!")

