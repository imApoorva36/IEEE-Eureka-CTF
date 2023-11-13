# Stage 1: Build the backend
FROM python:3.8 as backend-builder

WORKDIR /app

COPY backend/requirements.txt .

RUN pip install -r requirements.txt

COPY backend .

# Assuming your Django application uses collectstatic, migrate, etc.
# RUN python manage.py collectstatic --noinput
RUN python manage.py migrate

# Stage 2: Build the frontend
FROM node:14 as frontend-builder

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend .

# RUN yarn build

# Stage 3: Create the production image
FROM python:3.8-slim

WORKDIR /app

# Copy necessary files from the backend and frontend build stages
COPY --from=backend-builder /app .

COPY --from=frontend-builder /app .

# Assuming your Django application uses a 'static' folder
# COPY --from=frontend-builder /app/frontend/build/static /app/static

# Install only runtime dependencies for the backend
RUN pip install -r requirements.txt

ENV PYTHONUNBUFFERED=1

# Expose the necessary port(s)
EXPOSE 8000
EXPOSE 3000

# Set the command to run your Django application
# CMD ["gunicorn", "-b", "0.0.0.0:8000", "your_django_project.wsgi:application"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"] && \
    cd /app/frontend && \
    npm run dev
