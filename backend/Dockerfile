FROM python:3.10

WORKDIR /code

COPY . .

RUN pip install -r requirements.txt
RUN python manage.py collectstatic

ENV PYTHONUNBUFFERED=1

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
