from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^dropdown$', views.dropdown),
    url(r'^dropup$', views.dropup),
    url(r'^choose_year$', views.choose_year),
    url(r'^compare$', views.compare),
]
