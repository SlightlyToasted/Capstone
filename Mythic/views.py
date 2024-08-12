import json
import datetime
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import Task
from django.views.decorators.csrf import csrf_exempt
from django import forms
from django.urls import reverse
from .models import Task, Project

class NewTaskForm(forms.Form):
    description = forms.CharField(widget=forms.Textarea)
    due_date = forms.DateField(
        label="Due date",
        required=True,
        widget=forms.DateInput(format="%Y-%m-%d", attrs={"type": "date"}),
        input_formats=["%Y-%m-%d"]
    )
    scheduled_date = forms.DateField(
        label="Scheduled date",
        required=True,
        widget=forms.DateInput(format="%Y-%m-%d", attrs={"type": "date"}),
        input_formats=["%Y-%m-%d"]
    )

# Create your views here.
def index(request):
    tasks = search(request, "no_parents")
    return render(request, "mythic/test_create_task.html", {
        "form": NewTaskForm(),
        "tasks": tasks
    })

#sandbox for testing
def drag_drop_list(request):
    return render(request, "mythic/drag_drop.html")

#Create a new task
def create_task(request):
    tasks = search(request)
    if request.method == "POST":
        form = NewTaskForm(request.POST)
        if form.is_valid():
            description = form.cleaned_data['description']
            due_date: datetime.date = form.cleaned_data["due_date"]
            scheduled_date: datetime.date = form.cleaned_data["scheduled_date"]

            new_task = Task(description=description, due_date=due_date,scheduled_date=scheduled_date)
            new_task.save()
            return HttpResponseRedirect(reverse("index"))
        else:
            
            return render(request, "mythic/test_create_task.html", {
                "form": form,
                "tasks": tasks,
            })
    return render(request, "mythic/test_create_task.html", {
        "form": NewTaskForm(),
        "tasks": tasks,
    })

def search(request, q):
    if q == "no_parents":
        tasks = Task.objects.filter(parent__isnull=True).order_by('order')
    else:
        tasks = Task.objects.all().order_by('order')
    return tasks

# edit fields or get a jsonResponse containing details
@csrf_exempt
def task(request, task_id):
    data = json.loads(request.body)
    task = Task.objects.get(pk=task_id)

    # Return email contents
    if request.method == "GET":
        return JsonResponse(task.serialize())
    
    if request.method == "PUT":

        if "parent" in data:
            parent_id = data["parent"]
            if parent_id == "":
                task.parent = None
            else:
                task.parent = Task.objects.get(pk=parent_id)
                
        if "description" in data:
            task.description = data["description"]
        if "due_date" in data:
            task.due_date = data["due_date"]
        if "scheduled_date" in data:
            task.scheduled_date = data["scheduled_date"]
        if "completed" in data:
            task.completed = data["completed"]
        if "order" in data:
            task.order = data["order"]
        if "project" in data:
            project = Project.objects.get(name=data["project"])
            task.project = project
        task.save()
        return HttpResponse(status=204)
    
#retrieve due date and scheduled date for a task
def task_datetime(request, task_id):
    task = Task.objects.get(pk=task_id)
    if request.method == "GET":
        return JsonResponse(task.get_datetime())