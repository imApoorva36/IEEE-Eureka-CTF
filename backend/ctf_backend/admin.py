from django.contrib import admin
from .models import Team, Question, FlagResponse
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id','title', 'text', 'points', 'link', 'flag', 'user_response_count')
    def user_response_count(self, obj):
        return obj.user_response_count()
    user_response_count.short_description = 'Users Responded'

class TeamAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'name', 'contact', 'score', 'member1','member2','member3')

class FlagResponseAdmin(admin.ModelAdmin):
    list_display = ('id','team','timestamp','question','response')

admin.site.register(Question, QuestionAdmin)
admin.site.register(Team,TeamAdmin)
admin.site.register(FlagResponse,FlagResponseAdmin)
