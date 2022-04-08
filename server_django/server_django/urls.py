from .views.hello import hello
from django.urls import path

urlpatterns = [
    # 
    path('hello/', hello),



]
