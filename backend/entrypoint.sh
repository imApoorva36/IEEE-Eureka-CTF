#!/bin/sh

# python3 manage.py flush --no-input
python3 manage.py makemigrations
python3 manage.py migrate

python3 manage.py runserver 0.0.0.0:8080
# python3 manage.py runserver 0.0.0.0:8000
exec "$@"