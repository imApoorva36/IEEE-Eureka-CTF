from rest_framework import serializers
from .models import Team, Question, Flagresponse
from django.contrib.auth import get_user_model

class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('name','member1','member2','member3',)

class QuestionsSerializer(serializers.ModelSerializer):
    is_answered = serializers.SerializerMethodField()
    class Meta:
        model = Question
        fields = ('title','text','points','link',)
    def get_is_answered(self, obj):
        user = self.context['request'].user
        user_qns = Team.objects.filter(users=user)
        is_answered = user_qns.filter(questions=obj, answered=True).exists()
        return is_answered

class FlagresponsesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flagresponse
        fields = ('team', 'timestamp', 'question', 'response')

    def create(self, validated_data):
        user = self.context['request'].user  # Get the current user
        response = validated_data.get('response')
        question = validated_data.get('question')
        timestamp = validated_data.get('timestamp')
        flag_response = Flagresponse.objects.create(team=user.team,timestamp=timestamp, question=question, response=response)
        return flag_response

class ScoreboardSerializer(serializers.Serializer):
    top_10_scores = serializers.ListField(child=serializers.IntegerField())
    current_user_score = serializers.IntegerField(allow_null=True)