# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-06-07 00:55
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('demo', '0003_auto_20170606_1954'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='managment_relationship',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='demo.Supervision'),
        ),
        migrations.AlterField(
            model_name='supervision',
            name='subordinate',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employees', to='demo.Employee'),
        ),
        migrations.AlterField(
            model_name='supervision',
            name='supervisor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='supervisors', to='demo.Manager'),
        ),
    ]
