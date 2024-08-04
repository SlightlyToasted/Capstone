from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("create_task", views.create_task, name="create_task"),
    path("edit_task/<int:task_id>", views.edit_task, name="edit_task"),
]