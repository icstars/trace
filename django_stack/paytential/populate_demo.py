import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','paytential.settings')

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

def populate(N=5):
#Create 3 Managers
    mstart = fakegen.date()
    mend = fakegen.date()
    m1 = Employee.objects.get_or_create(employee_id=34161727,is_manager=True,first_name='Joe',last_name='McManager',gender='M',birth_date=mstart,hire_date=mend,termination_date=None,position='District Manager',operational_unit_id=148,email=fakegen.company_email(),phone=fakegen.phone_number())
    m2 = Employee.objects.get_or_create(employee_id=44613589,is_manager=True,first_name='Sue',last_name='McManager',gender='F',birth_date=mstart,hire_date=mend,termination_date=None,position='District Manager',operational_unit_id=403,email=fakegen.company_email(),phone=fakegen.phone_number())
    m3 = Employee.objects.get_or_create(employee_id=51357643,is_manager=True,first_name='Faker',last_name='_',gender='M',birth_date=mstart,hire_date=mend,termination_date=None,position='District Manager',operational_unit_id=284,email=fakegen.company_email(),phone=fakegen.phone_number())
    for i in range(N):
    #Employee
        employee_id = i
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
        emp = Employee.objects.get_or_create(employee_id,is_manager,first_name,last_name,gender,birth_date,hire_date,termination_date,position,operational_unit_id,email,phone)
    #Create managment relationships for that Employee
        for i in range(1,random.choice(range(1,3))):
            manager_id = random.choice([m1,m2,m3])
            start_date = fakegen.date()
            end_date = None
            mng = Management.objects.get_or_create(emp,manager_id,start_date,end_date)
        #Create ratings for that Employee
            for i in range(1,random.choice(range(4))):
                potential = random.choice(range(1,11))
                performance = random.choice(range(1,11))
                timestamp = fakegen.iso8601()
                notes = fakegen.text(max_nb_chars=200)
                rats = Rating.objects.get_or_create(mng,mng,potential,performance,timestamp,notes)

if __name__ == '__main__':
    populate(1)
