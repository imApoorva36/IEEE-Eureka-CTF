from django.db import models
from django.contrib.auth.models import User

class teams(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    teamid = models.AutoField(primary_key=True, unique=True, editable=False)
    teamname=models.CharField(max_length=20)
    member1=models.CharField(max_length=20)
    member2=models.CharField(max_length=20)
    member3=models.CharField(max_length=20)
    contact=models.IntegerField()
    def __str__(self):
        return f"{self.user} - {self.teamid} - {self.teamname}"
    
class questions(models.Model):
    qnid=models.AutoField(primary_key=True, unique=True, editable=False)
    qntext=models.TextField()
    points=models.IntegerField()
    links=models.TextField()
    flag=models.TextField(default="flag{N4LL_US34}")
    def __str__(self):
        return f"{self.qnid} - {self.qntext} - {self.flag}"
    
class scoreboard(models.Model):
    team_id=models.IntegerField()
    score=models.IntegerField()
    def __str__(self):
        return f"{self.team_id} - {self.score}"