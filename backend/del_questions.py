import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from ctf_backend.models import Question

def deleteQuestions():
    # Delete all questions
    Question.objects.all().delete()
    print("All questions have been deleted.")

if __name__ == "__main__":
    deleteQuestions()
