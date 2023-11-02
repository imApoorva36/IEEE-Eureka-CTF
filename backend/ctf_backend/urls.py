from django.urls import path, include
from . import views
from .views import index
from .api import router
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', views.register, name='register'),
    path('api/token/verify/', views.verify_token, name='verify_token'),
    path('api/logout/', views.custom_logout, name='custom_logout'),
    path('api/', include(router.urls)),
    # path("<path:path>", index, name="index"),
]