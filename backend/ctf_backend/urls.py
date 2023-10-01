from django.urls import path
from . import views
from . views import ItemListCreateView
from .views import index
urlpatterns = [
    path("", index, name="index"),
    path('items/', ItemListCreateView.as_view(), name='item-list-create'),
]