# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-06-07 20:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employee_id', models.PositiveIntegerField(default=0, unique=True)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('gender', models.CharField(max_length=10)),
                ('birth_date', models.DateField(default=django.utils.timezone.now)),
                ('hire_date', models.DateField(default=django.utils.timezone.now)),
                ('termination_date', models.DateField(default=None, null=True)),
                ('position', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=100)),
                ('phone', models.CharField(max_length=20)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'ordering': ('first_name',),
            },
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location_id', models.PositiveIntegerField(default=0)),
                ('location_name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Location_lookup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location_id', models.PositiveIntegerField(default=0)),
                ('location_name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('potential', models.PositiveSmallIntegerField(default=0)),
                ('performance', models.PositiveSmallIntegerField(default=0)),
                ('notes', models.TextField(max_length=1000)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Supervision',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField(default=django.utils.timezone.now)),
                ('end_date', models.DateField(default=None, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Manager',
            fields=[
                ('employee_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='demo.Employee')),
                ('username', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=100)),
                ('permissions_level', models.PositiveIntegerField(default=0)),
            ],
            bases=('demo.employee',),
        ),
        migrations.AddField(
            model_name='supervision',
            name='subordinate',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employees', to='demo.Employee'),
        ),
        migrations.AddField(
            model_name='rating',
            name='managment_relationship',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='demo.Supervision'),
        ),
        migrations.AddField(
            model_name='location',
            name='assigned_employee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='demo.Employee'),
        ),
        migrations.AddField(
            model_name='supervision',
            name='supervisor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='supervisors', to='demo.Manager'),
        ),
        migrations.AddField(
            model_name='employee',
            name='managment_relationships',
            field=models.ManyToManyField(related_name='refers_to', through='demo.Supervision', to='demo.Manager'),
        ),
    ]
