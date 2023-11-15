import os
import django
import csv
import random
from password_generator import PasswordGenerator

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User

from ctf_backend.models import Team


def csv_to_dict(file_name):
    with open(file_name, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        return [row for row in csv_reader]


def create_user(username, password):
    new_user = User.objects.create_user(username=username, password=password)
    new_user.save()
    return new_user

def create_team(name, user, member1, member2, member3, contact):
    new_team = Team(name=name, user=user, member1=member1, member2=member2, member3=member3, contact=contact)
    new_team.save()

def create_team_name(team_name):
    return team_name.replace(' ', '_').lower() + '_' + str(random.randint(1000, 9999))

def create_users_from_csv(file_name):
    login_details = {}
    for row in csv_to_dict(file_name):
        member1 = row['Member 1 Name']
        member2 = row['Member 2 Name']
        member3 = row['Member 3 Name']
        contact = row['Member 1 Contact Number']
        team_name = row['Team Name']

        # Check for integrity of member names 
        # if not member1.isalpha() or not member2.isalpha() or not member3.isalpha():
        #     print('Invalid member name')
        #     continue
        
        password = PasswordGenerator().generate()
        username = create_team_name(team_name)
        user = create_user(username, password)
        create_team(team_name, user, member1, member2, member3, contact)
        print(f'Created user {username} with password {password} for team {team_name}')
        login_details[row['Email Address']] = {'username': username, 'password': password}
    dump_login_details(login_details)

def dump_login_details(login_details):
    import json
    with open('login_details.json', 'w') as f:
        json.dump(login_details, f)

if __name__ == '__main__':
    create_users_from_csv('teams.csv')
