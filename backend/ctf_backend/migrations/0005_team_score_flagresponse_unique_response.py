# Generated by Django 5.1.2 on 2024-10-25 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ctf_backend', '0004_alter_team_member1_alter_team_member2_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='score',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddConstraint(
            model_name='flagresponse',
            constraint=models.UniqueConstraint(fields=('team', 'question'), name='unique_response'),
        ),
    ]
