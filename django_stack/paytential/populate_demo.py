import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','paytential.settings')

import django
django.setup()

##FAKE POP START

import random
from demo.models import Employee,Management,Rating
from faker import Faker
from datetime import date

fakegen = Faker()
positions = ['Cashier','Cook','Front','Driver']

#generate a random position
def pick_pos():
    p = Employee.objects.get_or_create(position=random.choice(positions))[0]
    p.save()
    return p

def populate(N=5):
#Create 3 Managers
    mstart = fakegen.date()
    mend = fakegen.date()
    m1 = Employee.objects.get_or_create(employee_id=34161727,is_manager=True,first_name='Joe',last_name='McManager',gender='M',\
    birth_date=mstart,hire_date=mend,termination_date=None,position='District Manager',operational_unit_id=148,email=fakegen.company_email(),\
    phone=fakegen.phone_number(),create_date=date.today())[0]
    m2 = Employee.objects.get_or_create(employee_id=44613589,is_manager=True,first_name='Sue',last_name='McManager',gender='F',\
    birth_date=mstart,hire_date=mend,termination_date=None,position='District Manager',operational_unit_id=403,email=fakegen.company_email(),\
    phone=fakegen.phone_number(),create_date=date.today())[0]
    m3 = Employee.objects.get_or_create(employee_id=51357643,is_manager=True,first_name='Faker',last_name='_',gender='M',\
    birth_date=mstart,hire_date=mend,termination_date=None,position='District Manager',operational_unit_id=284,email=fakegen.company_email(),\
    phone=fakegen.phone_number(),create_date=date.today())[0]
    for i in range(N):
        create_date = date.today()
    #Employee
        employee_id = fakegen.ean(length=8)
        is_manager = False
        first_name = fakegen.first_name()
        last_name = fakegen.last_name()
        gender = random.choice(['M','F'])
    #employees are at least 16yrs old
        birth_date = fakegen.date()
        hire_date = fakegen.date()
    #we NEVER fire employees
        termination_date = None
        position = pick_pos()
        operational_unit_id = random.choice([148,403,284])
        email = fakegen.company_email()
        phone = fakegen.phone_number()

    #Create a fake Employee
        emp = Employee.objects.get_or_create(employee_id=employee_id,first_name=first_name,last_name=last_name,gender=gender,\
        birth_date=birth_date,hire_date=hire_date,position=position,operational_unit_id=operational_unit_id,email=email,\
        phone=phone,create_date=create_date)[0]
    #Create managment relationships for that Employee
        for i in range(3):
            manager_id = [m1,m2,m3][i]
            start_date = fakegen.date()
            end_date = None
            mng = Management.objects.get_or_create(employee_id=emp,manager_id=manager_id,start_date=start_date,end_date=end_date,create_date=create_date)[0]
        #Create ratings for that Employee
            for i in range(4):
                potential = random.choice(range(1,11))
                performance = random.choice(range(1,11))
                notes = fakegen.text(max_nb_chars=200)
                ratings = Rating.objects.get_or_create(employee_id=mng,manager_id=mng,potential=potential,performance=performance,notes=notes,create_date=create_date)[0]

if __name__ == '__main__':
    populate(1)
