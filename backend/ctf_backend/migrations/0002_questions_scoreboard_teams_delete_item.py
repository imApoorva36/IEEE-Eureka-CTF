# Generated by Django 4.2.3 on 2023-10-01 18:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ctf_backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='questions',
            fields=[
                ('qnid', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('qntext', models.TextField()),
                ('points', models.IntegerField()),
                ('links', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='scoreboard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team_id', models.IntegerField()),
                ('score', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='teams',
            fields=[
                ('teamid', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('teamname', models.CharField(max_length=20)),
                ('member1', models.CharField(max_length=20)),
                ('member2', models.CharField(max_length=20)),
                ('member3', models.CharField(max_length=20)),
                ('contact', models.IntegerField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Item',
        ),
    ]
