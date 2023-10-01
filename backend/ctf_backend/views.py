from django.shortcuts import render
from django_nextjs.render import render_nextjs_page_sync
def index(request):
    return render_nextjs_page_sync(request)

from rest_framework import generics
from .models import Item
from .serialisers import ItemSerializer
from rest_framework.permissions import IsAuthenticated

class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

