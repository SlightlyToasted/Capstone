from django.contrib import admin

# Register your models here.
from .models import Task

class TaskAdmin(admin.ModelAdmin):
  list_display = ("description", "parent", "order")

# Register your models here.
admin.site.register(Task, TaskAdmin)