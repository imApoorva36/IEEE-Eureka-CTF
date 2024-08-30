from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
class Team(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, null=True, blank=True)
    member1 = models.CharField(max_length=30, null=True, blank=True)
    member2 = models.CharField(max_length=30, null=True, blank=True)
    member3 = models.CharField(max_length=30, null=True, blank=True)
    contact = models.CharField(max_length=10, null=True, blank=True)
    highest_section_reached = models.IntegerField(default=1)
    score = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.id} - {self.user} - {self.name}"

class Question(models.Model):
    title = models.TextField()
    text = models.TextField()
    hints = models.TextField(null=True, blank=True)
    show_hints = models.BooleanField(default=False)
    points = models.IntegerField()
    link = models.TextField(null=True, blank=True)
    flag = models.TextField(default="flag{N4LL_US34}")
    section = models.IntegerField(default=1)
    
    def __str__(self):
        return f"{self.id} - {self.title} - {self.text} - {self.points} - {self.link} - {self.flag}"
    def user_response_count(self):
        return Question.objects.filter(flagresponse__question=self).count()
    def answered(self, user):
        # get all responses for this question by this user
        responses = Flagresponse.objects.filter(question=self, team__user=user)
        return Flagresponse.objects.filter(question=self, team__user=user).exists() and responses.last().response == self.flag
    
class Flagresponse(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(null=True, blank=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    response = models.CharField(default='', max_length=50, null=True, blank=True)
    attempts = models.IntegerField(default=0)
    def __str__(self):
        return f"{self.team} - {self.timestamp} - {self.question} - {self.response}"

class Section(models.Model):
    section = models.IntegerField()
    title = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    points_threshold = models.IntegerField()
    def __str__(self):
        return f"{self.section} - {self.title}"