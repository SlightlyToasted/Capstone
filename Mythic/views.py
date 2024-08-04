import json
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import Task
from django.views.decorators.csrf import csrf_exempt
from django import forms
from django.urls import reverse
from .models import Task

class NewTaskForm(forms.Form):
    description = forms.CharField(widget=forms.Textarea)
    due_date = forms.DateField(
        widget=forms.SelectDateWidget(
            empty_label=("Choose Year", "Choose Month", "Choose Day"),
        )
    )
    scheduled_date = forms.DateField(
        widget=forms.SelectDateWidget(
            empty_label=("Choose Year", "Choose Month", "Choose Day"),
        )
    )

# Create your views here.
def index(request):
    tasks = search(request)
    return render(request, "mythic/test_create_task.html", {
        "form": NewTaskForm(),
        "tasks": tasks
    })


def create_task(request):
    tasks = search(request)
    """ if request.method == "POST":
        data = json.loads(request.body)
        description = data.get("description", "")
        due_date = data.get("due_date", "")
        scheduled_date = data.get("scheduled_date", "")

        new_task = Task(description=description, due_date=due_date, scheduled_date=scheduled_date)

        new_task.save()
        return JsonResponse({"message": "Task created successfully."}, status=201) """
    
    if request.method == "POST":
        form = NewTaskForm(request.POST)
        if form.is_valid():
            description = form.cleaned_data['description']
            due_date = form.cleaned_data['due_date']
            scheduled_date = form.cleaned_data['scheduled_date']

            new_task = Task(description=description, due_date=due_date, scheduled_date=scheduled_date)
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

def search(request):
    tasks = Task.objects.all()
    return tasks

def edit_task(request, task_id):
    return HttpResponse("Hello")