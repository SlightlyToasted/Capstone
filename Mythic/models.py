from django.db import models

# Create your models here.

class Task(models.Model):
    description = models.TextField(default="New task")
    completed = models.BooleanField(default=False)
    scheduled = models.BooleanField(default=False)
    due_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
    scheduled_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True, blank=True) 
    start_time = models.DateTimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
    end_time = models.DateTimeField(auto_now=False, auto_now_add=False,null=True, blank=True)

    category = models.CharField(max_length=64, blank=True, null=True)
    project = models.CharField(max_length=64, blank=True, null=True)

    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    previous_task = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subsequent_task')

    def __str__(self):
        return str(self.id) + ": " + self.description + " due " + str(self.due_date)