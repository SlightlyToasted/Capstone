import json
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import Task

# Create your views here.
def index(request):
    return HttpResponse("Index")

def create_task(request):
    data = json.loads(request.body)
    description = data.get("description", "")
    due_date = data.get("due_date", "")
    scheduled_date = data.get("scheduled_date", "")
    start_time = data.get("scheduled_date", "")
    end_time = data.get("scheduled_date", "")

    new_task = Task(description=description, due_date=due_date, scheduled_date=scheduled_date, start_time=start_time, end_time=end_time)

    new_task.save()