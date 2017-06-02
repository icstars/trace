import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','demo.settings')

import django
django.setup()

##FAKE POP START

import random
from demo.models import Employee,Management,Rating
from faker import Faker

fakegen = Faker()
fnames = ['']

def add_names():
    n = Employee.objects.get_or_create(first_name=random.choice(fnames))[0]
