from django.db import models
 
class house(models.Model):
    houseid = models.IntegerField()
    comment = models.CharField(max_length=20)
    orderid = models.CharField(max_length=20, primary_key=True)

