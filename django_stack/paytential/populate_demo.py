import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','demo.settings')

import django
django.setup()

##FAKE POP START

import random
from demo.models import Employee,Management,Rating
from faker import Faker

fakegen = Faker()
positions = ['Cashier','Cook','Front','Driver']

#generate a random position
def pick_pos():
    p = Employee.objects.get_or_create(position=random.choice(positions))[0]
    p.save()
    return p

operational_unit_id = fakegen.ean(length=3)

def populate(N=5):
    for i in range(N):
    #Employee
        employee_id = i
        #manager_id = False
        first_name = fakegen.first_name()
        last_name = fakegen.last_name()
        gender = fakegen.gender()
    #make y/m/d
        year = random.choice(range(1975, 2001))
        month = random.choice(range(1, 13))
        day = random.choice(range(1, 31))
    #combine y/m/d into a datetime
        birth_date = datetime(year, month, day)
    #hire employee on their 16th birthday
        hire_date = datetime(year + 16, month, day)
    #we NEVER fire employees
        termination_date = null
        position = pick_pos()
        email = fakegen.safe_email()
        phone = fakegen.phone_number()
    #Management
        start_date = datetime(year + random.choice(range(5)), month, day)
        end_date = null
    #Rating
        potential = random.choice(range(1,11))
        performance = random.choice(range(1,11))
        timestamp = datetime(year + random.choice(range(5,10)), month, day)
        notes = fakegen.text(max_nb_chars=200)

    #Create a fake Employee
        emp = Employee.objects.get_or_create(employee_id,manager_id,first_name,last_name,gender,birth_date,hire_date,termination_date,position,email,phone)
    #Create managment relationships for that Employee
        for i in random.choice(range(1,3))
            mng = Management.objects.get_or_create(employee_id,random.choice(range(30,33)),start_date,end_date)

        for i in random.choice(range(1,9))
            ratings = Rating.objects.get_or_create(employee_id,random.choice(range(30,33)),potential,performance,timestamp,notes)
