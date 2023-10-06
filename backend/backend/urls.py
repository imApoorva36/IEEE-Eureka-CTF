from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("",include("ctf_backend.urls")),
    path("", include("django_nextjs.urls")),
]
