# Generated by Django 4.2.5 on 2023-11-17 06:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ctf_backend', '0003_alter_team_contact'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='member1',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='team',
            name='member2',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='team',
            name='member3',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='team',
            name='name',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]