from django.contrib import admin
from .models import Team, Question, Flagresponse
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('title', 'text', 'points', 'link', 'flag', 'user_response_count')
    def user_response_count(self, obj):
        return obj.user_response_count()
    user_response_count.short_description = 'Users Responded'

class TeamAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'contact', 'calculate_score', 'member1','member2','member3')
    def calculate_score(self,obj):
        return obj.calculate_score()
    calculate_score.short_description = 'User Score'

class FlagresponseAdmin(admin.ModelAdmin):
    list_display = ('team','timestamp','question','response')

admin.site.register(Question, QuestionAdmin)
admin.site.register(Team,TeamAdmin)
admin.site.register(Flagresponse,FlagresponseAdmin)
