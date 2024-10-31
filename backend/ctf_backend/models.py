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
    score = models.PositiveIntegerField(default=0, null=False)

    def __str__(self):
        return f"{self.id} - {self.user} - {self.name} - {self.score}"

class Question(models.Model):
    title = models.TextField()
    text = models.TextField()
    points = models.IntegerField()
    link = models.TextField(null=True, blank=True)
    flag = models.TextField(default="flag{N4LL_US34}")
    
    def __str__(self):
        return f"{self.id} - {self.title} - {self.text} - {self.points} - {self.link} - {self.flag}"
    def user_response_count(self):
        return FlagResponse.objects.filter(question=self).count()
    def answered(self, user):
        return FlagResponse.objects.filter(question=self, team__user=user).exists()
    
class FlagResponse(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(null=True, blank=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    response = models.CharField(default='', max_length=50, null=True, blank=True)
    
    def __str__(self):
        return f"{self.team} - {self.timestamp} - {self.question} - {self.response}"
    
    class Meta:
        constraints = [models.UniqueConstraint(fields=['team', 'question'], name='unique_response')]
        

