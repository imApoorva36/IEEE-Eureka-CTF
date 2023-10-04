from django.urls import path, include
from . import views
from .views import index
from .api import router
urlpatterns = [
    path('api/', include(router.urls)),
    path("<path:path>", index, name="index"),
]