# Generated by Django 5.1.2 on 2024-10-25 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ctf_backend', '0005_team_score_flagresponse_unique_response'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='score',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
