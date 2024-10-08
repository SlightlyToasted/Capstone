from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("task/create", views.create_task, name="create_task"),
    path("task/<int:task_id>", views.task, name="task"),

    #Search
    path("task/datetime/<int:task_id>", views.task_datetime, name="task_datetime"),

    #sandbox
    path("list", views.drag_drop_list, name="drag_drop_list"),
   
]