# Adding Questions to the Question Model 
import os
import django
import csv

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from ctf_backend.models import Question

def csv_to_dict(file_name, encoding='utf-8'):
    with open(file_name, mode='r', encoding=encoding) as csv_file:
        csv_reader = csv.DictReader(csv_file)
        return [row for row in csv_reader]
    
def create_question(title, text, points, link, flag, section):
    new_question = Question(title=title, text=text, points=points, link=link, flag=flag, section=section)
    new_question.save()
    return new_question

def create_questions_from_csv(file_name):
    for row in csv_to_dict(file_name, encoding='utf-8'):
        title = row['title']
        text = row['description']
        points = row['points']
        link = row['link']
        flag = row['flag']
        section = row['section']
        create_question(title, text, points, link, flag, section)
        print(f'Created question {title} with flag {flag}')

if __name__ == '__main__':
    create_questions_from_csv('questions_.csv')