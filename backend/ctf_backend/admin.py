from django.contrib import admin
from .models import Team, Question, Flagresponse, Section
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id','title', 'text', 'points', 'link', 'flag', 'section', 'user_response_count')
    def user_response_count(self, obj):
        return obj.user_response_count()
    user_response_count.short_description = 'Users Responded'

class TeamAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'name', 'contact', 'calculate_score', 'member1','member2','member3')
    def calculate_score(self,obj):
        return obj.calculate_score()
    calculate_score.short_description = 'User Score'

class FlagresponseAdmin(admin.ModelAdmin):
    list_display = ('id','team','timestamp','question','response')

class SectionsAdmin(admin.ModelAdmin):
    list_display = ('section','title','description','points_threshold')

admin.site.register(Question, QuestionAdmin)
admin.site.register(Team,TeamAdmin)
admin.site.register(Flagresponse,FlagresponseAdmin)
admin.site.register(Section,SectionsAdmin)
