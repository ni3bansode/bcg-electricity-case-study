# Generated by Django 4.1.7 on 2023-03-25 08:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('electricity', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='connectionsrequest',
            name='Gender',
            field=models.CharField(max_length=20),
        ),
    ]
