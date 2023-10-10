from rest_framework import serializers
from .models import teams, questions, scoreboard
from django.contrib.auth import get_user_model
from rest_framework import serializers

class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = teams
        fields = ('name','id','member1','member2','member3',)

class QuestionsSerializer(serializers.ModelSerializer):
    is_answered = serializers.SerializerMethodField()
    class Meta:
        model = questions
        fields = ('title','id','text','points','link',)
    def get_is_answered(self, obj):
        user = self.context['request'].user
        user_qns = teams.objects.filter(users=user)
        is_answered = user_qns.filter(questions=obj, answered=True).exists()
        return is_answered

class ScoreboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = scoreboard
        fields = ('score',)

    def to_representation(self, obj):
        top_scores = scoreboard.objects.order_by('-score')[:10]
        serialized_scores = self.__class__(top_scores, many=True).data
        return serialized_scores
