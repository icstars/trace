import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','paytential.settings')

import django
django.setup()

##FAKE POP START

from demo.models import Employee,Manager,Location,Location_lookup,Supervision,Rating
from faker import Faker

fakegen = Faker()

def populate(M=3, N=5):
    i = 0
    #Create 3 Managers
    while i < (M + M * N):
        fname = fakegen.first_name()
        lname = fakegen.last_name()
        uname = fname[0] + lname
        gender = fakegen.random_element(elements=('F','M'))
        bdate = fakegen.date()
        hdate = fakegen.date()
        loc_id = i+1
        loc_name = fakegen.company()
        email= fname[0].lower()+lname.lower()+"@companyname.org"

        mng = Manager.objects.get_or_create(username=uname,password='123',\
        permissions_level=1,employee_id=i,first_name=fname,last_name=lname,\
        gender=gender,birth_date=bdate,hire_date=hdate,position='Manager',\
        email=email,phone=fakegen.phone_number())[0]

        loc = Location.objects.get_or_create(assigned_employee=mng,location_id=loc_id,location_name=loc_name)[0]
        i+=1
        #Create N Employees for each manager
        j = i
        while i < j+N:
            emp_id = i
            fname = fakegen.first_name()
            lname = fakegen.last_name()
            gender = fakegen.random_element(elements=('F','M'))
            bdate = fakegen.date()
            hdate = fakegen.date()
            #termination_date = models.DateField(null=True,default=None)
            pos = fakegen.random_element(elements=('Cashier','Cook','Front','Driver'))
            email= fname[0].lower()+lname.lower()+"@companyname.org"
            phone = fakegen.phone_number()

            emp = Employee.objects.get_or_create(employee_id=emp_id,first_name=fname,\
            last_name=lname,gender=gender,birth_date=bdate,hire_date=hdate,position=pos,\
            email=email,phone=phone)[0]
            #Location
            loc_id = fakegen.random_int(min=1,max=3)
            loc_name = fakegen.company()

            loc = Location.objects.get_or_create(assigned_employee=emp,location_id=loc_id,location_name=loc_name)[0]
            #Supervision
            sdate = fakegen.date()

            sprvs = Supervision.objects.get_or_create(subordinate=emp,supervisor=mng,start_date=sdate)[0]
            #Rating
            pot = fakegen.random_int(1,10)
            perf = fakegen.random_int(1,10)
            notes = fakegen.text(max_nb_chars=50)

            rat = Rating.objects.get_or_create(managment_relationship=sprvs,potential=pot,performance=perf,notes=notes)[0]
            i+=1

if __name__ == '__main__':
    print('Populating...')
    populate(1,1)
    print('Finished!')
