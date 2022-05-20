from django.db import models
 
class house(models.Model):
    name = models.CharField(max_length=20)
    passwd = models.CharField(max_length=20)
    salt = models.CharField(max_length=20)

