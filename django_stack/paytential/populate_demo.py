import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','paytential.settings')

import django
django.setup()

##FAKE POP START

from demo.models import Employee,Manager,Supervision,Rating
from faker import Faker

fakegen = Faker()

def populate(N=5):
    for i in range(N):
        emp_id = i
        fname = fakegen.first_name()
        lname = fakegen.last_name()
        gender = fakegen.random_element(elements=('F','M'))
        # bdate = models.DateField(default=timezone.now)
        # hdate = models.DateField(default=timezone.now)
        # termination_date = models.DateField(null=True,default=None)
        pos = fakegen.random_element(elements=('Cashier','Cook','Front','Driver'))
        opuid = fakegen.random_int(min=1,max=3)
        email = fakegen.email()
        phone = fakegen.phone_number()

        emp = Employee.objects.get_or_create(employee_id=emp_id,first_name=fname,last_name=lname,gender=gender,position=pos,operational_unit_id=opuid,email=email,phone=phone)[0]

if __name__ == '__main__':
    print('Populating...')
    populate(1)
    print('Finished!')
