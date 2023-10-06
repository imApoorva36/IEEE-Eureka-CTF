from django.shortcuts import render
from django_nextjs.render import render_nextjs_page_sync
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import teams, questions, scoreboard
from .serialisers import TeamsSerializer, QuestionsSerializer, ScoreboardSerializer, UserSerializer
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    login(request, user)  # Log in the user immediately after registration

    return Response({'message': 'Registration successful.'}, status=status.HTTP_201_CREATED)


def index(request, path):
    return render_nextjs_page_sync(request)
class UserAPIView(RetrieveAPIView):
    permission_classes=(IsAuthenticated,)
    serializer_class=UserSerializer
    def get_object(self):
        return self.request.user

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

