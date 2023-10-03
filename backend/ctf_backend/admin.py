from django.contrib import admin
from .models import teams, questions, scoreboard

class ScoreboardAdmin(admin.ModelAdmin):
    ordering = ('-score',)

admin.site.register(teams)
admin.site.register(questions)
admin.site.register(scoreboard, ScoreboardAdmin)

