from rest_framework import serializers
from .models import teams, questions, scoreboard

class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = teams
        fields = '__all__'

class QuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = questions
        fields = '__all__'

class ScoreboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = scoreboard
        fields = '__all__'
