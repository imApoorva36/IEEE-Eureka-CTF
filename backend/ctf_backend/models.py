from django.db import models
from django.contrib.auth.models import User

class Question(models.Model):
    title=models.TextField()
    text=models.TextField()
    points=models.IntegerField()
    link=models.TextField()
    flag=models.TextField(default="flag{N4LL_US34}")
    def __str__(self):
        return f"{self.id} - {self.title} - {self.text} - {self.points} - {self.link} - {self.flag}"

class Team(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name=models.CharField(max_length=20, null=True, blank=True)
    member1=models.CharField(max_length=20, null=True, blank=True)
    member2=models.CharField(max_length=20, null=True, blank=True)
    member3=models.CharField(max_length=20, null=True, blank=True)
    contact=models.IntegerField()
    def __str__(self):
        return f"{self.id} - {self.user}  - {self.name}"
    
class Flagresponse(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    timestamp=models.DateTimeField(null=True, blank=True)
    question=models.ForeignKey(Question, on_delete=models.CASCADE)
    response=models.CharField(default='', max_length=50, null=True, blank=True)
    def __str__(self):
        return f"{self.team} - {self.timestamp} - {self.question} - {self.response}"