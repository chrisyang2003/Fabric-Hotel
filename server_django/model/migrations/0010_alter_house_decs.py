# Generated by Django 4.0.3 on 2022-04-10 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('model', '0009_remove_house_facility_remove_house_type_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='house',
            name='decs',
            field=models.CharField(max_length=20),
        ),
    ]