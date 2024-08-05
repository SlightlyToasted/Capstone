from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("task/create", views.create_task, name="create_task"),
    path("task/edit/<int:task_id>", views.edit_task, name="edit_task"),
    path("task/reorder/<int:task_id>", views.reorder_task, name="reorder_task"),

    #Search
    path("task/datetime/<int:task_id>", views.task_datetime, name="task_datetime"),
   
]