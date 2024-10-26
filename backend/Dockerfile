# pull official base image
FROM python:3.12-slim

# set work directory
WORKDIR /code

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./backend/requirements.txt .
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./backend/entrypoint.sh /code/app/entrypoint.sh
RUN sed -i 's/\r$//g' /code/app/entrypoint.sh
RUN chmod +x /code/app/entrypoint.sh

# copy project
COPY ./backend .

# run entrypoint.sh
ENTRYPOINT ["/code/app/entrypoint.sh"]

RUN useradd eureka --create-home --shell /bin/bash
USER eureka:eureka