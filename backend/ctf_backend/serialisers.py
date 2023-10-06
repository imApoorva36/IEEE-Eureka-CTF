from rest_framework import serializers
from .models import teams, questions, scoreboard
from django.contrib.auth import get_user_model
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username')

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
