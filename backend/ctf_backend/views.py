from django.shortcuts import render
from django_nextjs.render import render_nextjs_page_sync
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import teams, questions, scoreboard
from .serialisers import TeamsSerializer, QuestionsSerializer, ScoreboardSerializer

def index(request, path):
    return render_nextjs_page_sync(request)

class TeamsViewSet(viewsets.ModelViewSet):
    queryset = teams.objects.all()
    serializer_class = TeamsSerializer
    #permission_classes = [IsAuthenticated]

class QuestionsViewSet(viewsets.ModelViewSet):
    queryset = questions.objects.all()
    serializer_class = QuestionsSerializer
    #permission_classes = [IsAuthenticated]

class ScoreboardViewSet(viewsets.ModelViewSet):
    queryset = scoreboard.objects.all()
    serializer_class = ScoreboardSerializer
    #permission_classes = [IsAuthenticated]

