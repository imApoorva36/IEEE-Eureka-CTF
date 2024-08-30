from django.shortcuts import render
from django_nextjs.render import render_nextjs_page_sync
# from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Team, Question, Flagresponse, Section
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from .serialisers import TeamsSerializer, QuestionsSerializer, FlagresponsesSerializer, ScoreboardSerializer, SectionSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view
# from django.contrib.auth import authenticate, login
from datetime import datetime, tzinfo
from django.utils.timezone import make_aware
from rest_framework.decorators import action
from django.http import JsonResponse
from django.contrib.auth import logout
from celery import shared_task
from rest_framework.decorators import api_view, permission_classes
from .middleware import TimeRestrictedMiddleware
import pytz

def index(request):
    return render_nextjs_page_sync(request)

class TeamsViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamsSerializer
    # permission_classes = [IsAuthenticated]
    def create(self,request): # Basically to handle POST Requests
        return Response("Nope",status=status.HTTP_404_NOT_FOUND)
    @action(detail=True, methods=['GET'])
    def team_detail(self, request, pk=None):
        team = self.get_object()  # Get the team instance
        serializer = self.get_serializer(team)  # Serialize the team data
        return Response(serializer.data)
    

class TeamDetailViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamsSerializer
    permission_classes = [IsAuthenticated]
    def create(self,request): 
        return Response("Nope",status=status.HTTP_404_NOT_FOUND)
    def list(self, request): 
        user = request.user
        team = user.team
        serializer = self.get_serializer(team)
        return Response(serializer.data)
    def update(self, request, pk=None): 
        user = request.user
        team = user.team
        data = request.data
        serializer = self.get_serializer(team, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuestionsViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionsSerializer
    permission_classes = [IsAuthenticated]
    def create(self,request): # Basically to handle POST Requests
        return Response("Nope",status=status.HTTP_404_NOT_FOUND)
    def list(self, request): # Basically to handle GET Requests
        # get the category from the request
        category = int(request.query_params.get('category'))
        # get team score from the request
        team = request.user.team
        score = team.calculate_score()
        
        if category:
            if score >= Section.objects.get(section=category).points_threshold:
                questions = Question.objects.filter(section=category)
            else:
                return Response({'error': 'You have not reached this section yet.'}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'error': 'Category not specified'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(questions,many=True)
        return Response(serializer.data)

class FlagresponsesViewSet(viewsets.ModelViewSet):
    queryset = Flagresponse.objects.all()
    serializer_class = FlagresponsesSerializer
    permission_classes = [IsAuthenticated]
    def create(self, request):
        if request.method == "POST":
            flagres = request.data.get('flag')
            qnid = request.data.get('id')
            timestamp = make_aware(datetime.now())
            try:
                question = get_object_or_404(Question, id=qnid)
                if flagres != question.flag:
                    raise ValidationError("Flag is incorrect")
            except ValidationError as e:
                return Response({'error': "Flag Incorrect"}, status=status.HTTP_400_BAD_REQUEST)
            user = request.user
            
            # compute the team score and update the highest section reached
            team = user.team
            team_score = team.calculate_score()
            highest_section_reached = 1
            sections_thresholds = [section.points_threshold for section in Section.objects.all()]
            for i in range(1, len(sections_thresholds) + 1):
                if team_score >= sections_thresholds[i - 1]:
                    highest_section_reached = i
            if highest_section_reached > team.highest_section_reached:
                team.highest_section_reached = highest_section_reached
                team.save()
                
            existing_flag_response = Flagresponse.objects.filter(team__user=user, question=question)
            if existing_flag_response.exists():
                return Response({'error': "You have already submitted a response for this question."}, status=status.HTTP_404_NOT_FOUND)

            data = {
                'team': user.team.id,
                'question': question.id,
                'response': flagres,
                'timestamp': timestamp,
            }
            # serializer = FlagresponsesSerializer(data=data)
            # if serializer.is_valid():
            Flagresponse.objects.create(team=user.team,timestamp=timestamp,question=question,response=flagres)
            return Response({"Done"},status=status.HTTP_200_OK)
                # serializer.save()
                # return Response(serializer.data, status=status.HTTP_201_CREATED)
            # else:
                # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [IsAuthenticated]
    def create(self,request): # Basically to handle POST Requests
        return Response("Nope",status=status.HTTP_404_NOT_FOUND)
    def list(self, request):
        sections = Section.objects.all()
        serializer = self.get_serializer(sections, many=True)
        return Response(serializer.data)

class ScoreboardViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = ScoreboardSerializer
    permission_classes = [IsAuthenticated]
    def create(self,request): # Basically to handle POST Requests
        return Response("Nope",status=status.HTTP_404_NOT_FOUND)
    def list(self, request):
        user = request.user
        teams = Team.objects.all()
        scores = []
        for team in teams:
            responses = Flagresponse.objects.filter(team=team)
            total_score = sum(response.question.points for response in responses)
            scores.append({'team': team.name, 'score': total_score})
            if len(scores) == 10:
                break
        if user.team in teams:
            responses = Flagresponse.objects.filter(team=user.team)
            current_user_score = sum(response.question.points for response in responses)
        scores = sorted(scores, key=lambda x: x['score'], reverse=True)
        top_10_scores = scores[:10]
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