from django.db import models
 
class house(models.Model):
    name = models.CharField(max_length=20)

    house_price = models.IntegerField(default=80)
    market_price = models.IntegerField(default=100)

    area = models.IntegerField(default=10)
    livenums = models.IntegerField(default=1)
    image = models.CharField(max_length=20)
    tag = models.JSONField()
    desc = models.CharField(max_length=20)

    status = models.BooleanField(default=False)

