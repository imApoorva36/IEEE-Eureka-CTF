# api.py
from rest_framework import routers
from .views import TeamsViewSet, QuestionsViewSet, FlagResponsesViewSet, ScoreboardViewSet
router = routers.DefaultRouter()
router.register(r'teams', TeamsViewSet, basename='teams')
router.register(r'questions', QuestionsViewSet, basename='questions')
router.register(r'response', FlagResponsesViewSet, basename='response')
router.register(r'scoreboard', ScoreboardViewSet, basename='scoreboard')