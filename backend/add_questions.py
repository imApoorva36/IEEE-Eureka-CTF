# Adding Questions to the Question Model 
import os
import django
import csv

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from ctf_backend.models import Question

def csv_to_dict(file_name):
    with open(file_name, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        return [row for row in csv_reader]
    
def create_question(title, text, points, link, flag):
    new_question = Question(title=title, text=text, points=points, link=link, flag=flag)
    new_question.save()
    return new_question

def create_questions_from_csv(file_name):
    for row in csv_to_dict(file_name):
        title = row['title']
        text = row['text']
        points = row['points']
        link = row['link']
        flag = row['flag']
        create_question(title, text, points, link, flag)
        print(f'Created question {title} with flag {flag}')

if __name__ == '__main__':
    create_questions_from_csv('questions.csv')