from django.contrib import admin
from .models import Team, Question, Flagresponse
class ScoreboardAdmin(admin.ModelAdmin):
    ordering = ('-score',)

admin.site.register(Team)
admin.site.register(Question)
admin.site.register(Flagresponse)
