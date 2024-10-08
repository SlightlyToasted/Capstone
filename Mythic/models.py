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
    project = models.ForeignKey('Project', on_delete=models.CASCADE, null=True, blank=True, related_name='tasks')

    #relationships
    is_header = models.BooleanField(default=False)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    order = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.id) + ": " + self.description + " due " + str(self.due_date)
    
    def get_datetime(self):
        return {
            "due_date": self.due_date.strftime("%Y-%m-%d"),
            "scheduled_date": self.scheduled_date.strftime("%Y-%m-%d")
        }
    
class Project(models.Model):
    name = models.CharField(max_length=120)
    colour = models.CharField(max_length=10)
    
    def __str__(self):
        return "Project " + str(self.id) + ": " + self.name
