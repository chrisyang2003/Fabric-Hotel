from sqlite3 import Timestamp
from django.db import models
 
class house(models.Model):
    garde = models.IntegerField()
    comment = models.CharField(max_length=20)
    orderid = models.CharField(max_length=20, primary_key=True)
    timestamp = models.TimeField()
    


