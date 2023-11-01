from django.shortcuts import render
from django_nextjs.render import render_nextjs_page_sync
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Team, Question, Flagresponse
from rest_framework.views import APIView
from .serialisers import TeamsSerializer, QuestionsSerializer, FlagresponsesSerializer, ScoreboardSerializer
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login
from rest_framework.decorators import action
from django.http import JsonResponse
from datetime import datetime
from django.contrib.auth import logout
from rest_framework.decorators import api_view, permission_classes

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    # login(request, user)  # Log in the user immediately after registration

    return Response({'message': 'Registration successful.'}, status=status.HTTP_201_CREATED)


def index(request):
    return render_nextjs_page_sync(request)

class TeamsViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamsSerializer
    # permission_classes = [IsAuthenticated]
    @action(detail=True, methods=['GET'])
    def team_detail(self, request, pk=None):
        team = self.get_object()  # Get the team instance
        serializer = self.get_serializer(team)  # Serialize the team data
        return Response(serializer.data)

class QuestionsViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionsSerializer
    permission_classes = [IsAuthenticated]

class FlagresponsesViewSet(viewsets.ModelViewSet):
    queryset = Flagresponse.objects.all()
    permission_classes = [IsAuthenticated]
    def post(self, request):
        flag = request.data.get('flag')
        timestamp = request.data.get('timestamp')
        try:
            question = Question.objects.get(flag=flag)  # Check if the flag exists in the Question table
        except Question.DoesNotExist:
            return Response({'error': 'Flag not found'}, status=status.HTTP_404_NOT_FOUND)
        user = request.user

        data = {
            'team': user.team.id,
            'question': question.id,
            'response': flag,
            'timestamp': datetime.fromisoformat(timestamp),
        }

        serializer = FlagresponsesSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ScoreboardViewSet(viewsets.ModelViewSet):
    # queryset = Flagresponse.objects.all()
    queryset = Team.objects.all()
    serializer_class = ScoreboardSerializer
    permission_classes = [IsAuthenticated]

    # def list(self, request):
    #     user = request.user  # Get the current user
    #     teams = Team.objects.all()
    #     scores = []

    #     for team in teams:
    #         responses = Flagresponse.objects.filter(team=team)
    #         total_score = sum(response.question.points for response in responses)
    #         scores.append({'team': team, 'score': total_score})

    #     scores.sort(key=lambda x: x['score'], reverse=True)
    #     top_10_scores = scores[:10]
    #     current_user_score = next((score for score in scores if score['team'] == user.team), None)

    #     # Serialize the custom data structure using the ScoreboardSerializer
    #     serialized_data = ScoreboardSerializer(top_10_scores, many=True).data

    #     return Response({'top_10_scores': serialized_data, 'current_user_score': current_user_score})
    def list(self, request):
        user = request.user  # Get the current user
        teams = Team.objects.all()
        scores = []

        for team in teams:
            responses = Flagresponse.objects.filter(team=team)
            total_score = sum(response.question.points for response in responses)
            scores.append(total_score)

        scores.sort(reverse=True)
        top_10_scores = scores[:10]
        current_user_score = scores[user.team.id - 1] if 1 <= user.team.id <= len(scores) else None

        # Serialize the data using the ScoreboardSerializer
        serialized_data = ScoreboardSerializer({'top_10_scores': top_10_scores, 'current_user_score': current_user_score})

        return Response(serialized_data.data)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Add this line
def custom_logout(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})

import json
import jwt
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def verify_token(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            token = data.get('token')
            
            # Replace 'your_secret_key' with the actual secret key used to sign the JWT
            secret_key = 'django-insecure-ah&w004!i7v0ia6l4n_bi73k%t^orf=*a6ygl59-pyfh7-3zu7'
            
            try:
                # Attempt to decode and verify the JWT
                decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
                return JsonResponse({'message': 'Token is valid', 'decoded_token': decoded_token})
            except jwt.ExpiredSignatureError:
                return JsonResponse({'message': 'Token has expired'}, status=403)
            except jwt.DecodeError:
                return JsonResponse({'message': 'Token is invalid'}, status=403)

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)

    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)