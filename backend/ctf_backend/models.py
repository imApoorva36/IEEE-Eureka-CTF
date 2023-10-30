from django.db import models
from django.contrib.auth.models import User

class questions(models.Model):
    title=models.TextField()
    text=models.TextField()
    points=models.IntegerField()
    link=models.TextField()
    flag=models.TextField(default="flag{N4LL_US34}")
    def __str__(self):
        return f"{self.id} - {self.title} - {self.text} - {self.points} - {self.link} - {self.flag}"

class teams(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name=models.CharField(max_length=20)
    member1=models.CharField(max_length=20)
    member2=models.CharField(max_length=20)
    member3=models.CharField(max_length=20)
    contact=models.IntegerField()
    answered = models.ManyToManyField(questions)
    def __str__(self):
        return f"{self.id} - {self.user}  - {self.name}"
    
class scoreboard(models.Model):
    team = models.ForeignKey(teams, on_delete=models.CASCADE)
    score=models.IntegerField()
    def __str__(self):
        return f"{self.id} - {self.team.name} - {self.score}"