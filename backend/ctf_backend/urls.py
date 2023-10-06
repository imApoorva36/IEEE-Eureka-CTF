from django.urls import path, include
from . import views
from .views import index, UserAPIView
from .api import router
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/', UserAPIView.as_view(), name='user'),
    path('api/register/', views.register, name='register'),
    path('api/', include(router.urls)),
    path("<path:path>", index, name="index"),
]