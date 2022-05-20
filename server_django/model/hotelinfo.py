from django.db import models
 
class hotelinfo(models.Model):
    name = models.CharField(max_length=20)
    bio = models.CharField(max_length=20)
    tele = models.CharField(max_length=20)
    image = models.CharField(max_length=20)

