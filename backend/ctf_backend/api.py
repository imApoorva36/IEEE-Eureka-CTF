# api.py
from rest_framework import routers
from .views import TeamsViewSet, QuestionsViewSet, FlagresponsesViewSet, ScoreboardViewSet, TeamDetailViewSet, SectionViewSet, AttemptsViewSet
router = routers.DefaultRouter()
router.register(r'teams', TeamsViewSet)
router.register(r'team', TeamDetailViewSet)
router.register(r'sections', SectionViewSet)
router.register(r'questions', QuestionsViewSet)
router.register(r'response', FlagresponsesViewSet)
router.register(r'scoreboard', ScoreboardViewSet)
router.register(r'attempts', AttemptsViewSet)