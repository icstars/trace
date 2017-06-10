from django.conf.urls import url
from demo import views

urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^profile',views.profile,name='profile'),
    url(r'^login',views.login,name='login'),
    url(r'^evaluation',views.evaluation,name='evaluation'),
    url(r'^registration',views.registration,name='registration'),
    url(r'^help',views.help,name='help'),      

]
