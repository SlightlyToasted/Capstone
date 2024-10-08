# Generated by Django 5.0.6 on 2024-08-04 04:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(default='New task')),
                ('completed', models.BooleanField(default=False)),
                ('scheduled', models.BooleanField(default=False)),
                ('due_date', models.DateTimeField()),
                ('scheduled_date', models.DateTimeField()),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('category', models.CharField(max_length=64)),
                ('project', models.CharField(max_length=64)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Mythic.task')),
            ],
        ),
    ]
