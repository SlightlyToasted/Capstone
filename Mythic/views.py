import json
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import Task
from django.views.decorators.csrf import csrf_exempt
from django import forms
from django.urls import reverse

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
    return render(request, "mythic/test_create_task.html", {
        "form": NewTaskForm()
    })

def create_task(request):
    """ if request.method == "POST":
        data = json.loads(request.body)
        description = data.get("description", "")
        due_date = data.get("due_date", "")
        scheduled_date = data.get("scheduled_date", "")

        new_task = Task(description=description, due_date=due_date, scheduled_date=scheduled_date)

        new_task.save()
        return JsonResponse({"message": "Task created successfully."}, status=201) """
    
    if request.method == "POST":
        # Take in the data the user submitted and save it as form
        form = NewTaskForm(request.POST)
        # Check if form data is valid (server-side)
        if form.is_valid():
            description = form.cleaned_data['description']
            due_date = form.cleaned_data['due_date']
            scheduled_date = form.cleaned_data['scheduled_date']

            new_task = Task(description=description, due_date=due_date, scheduled_date=scheduled_date)
            new_task.save()

            return HttpResponseRedirect(reverse("index"))
        else:
            # If the form is invalid, re-render the page with existing information.
            return render(request, "mythic/test_create_task.html", {
                "form": form
            })
        
    return render(request, "mythic/test_create_task.html", {
        "form": NewTaskForm()
    })