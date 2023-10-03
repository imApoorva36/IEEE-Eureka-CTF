from django.urls import path, include
from . import views
from .views import index
from .api import router
urlpatterns = [
    path("", index, name="index"),
    path('api/', include(router.urls)),
]