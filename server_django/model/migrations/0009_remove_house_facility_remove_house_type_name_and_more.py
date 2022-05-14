# Generated by Django 4.0.3 on 2022-04-10 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('model', '0008_alter_house_facility_alter_house_house_price_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='house',
            name='facility',
        ),
        migrations.RemoveField(
            model_name='house',
            name='type_name',
        ),
        migrations.AddField(
            model_name='house',
            name='decs',
            field=models.CharField(default='', max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='house',
            name='status',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='house',
            name='tag_names',
            field=models.JSONField(),
        ),
    ]