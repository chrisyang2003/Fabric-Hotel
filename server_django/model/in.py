from django.db import models
 
class sheshi(models.Model):
    name = models.CharField(max_length=20)
    passwd = models.CharField(max_length=20)
    salt = models.CharField(max_length=20)

