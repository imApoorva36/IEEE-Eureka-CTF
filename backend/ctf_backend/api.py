# api.py

from rest_framework import routers
from .views import TeamsViewSet, QuestionsViewSet, ScoreboardViewSet, UserAPIView

router = routers.DefaultRouter()
router.register(r'teams', TeamsViewSet)
router.register(r'questions', QuestionsViewSet)
router.register(r'scoreboard', ScoreboardViewSet)

