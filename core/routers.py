from rest_framework import routers

from core.auth.viewsets import LoginViewSet, RefreshViewSet, RegisterViewSet
from core.post.viewsets import PostViewSet
from core.user.viewsets import UserViewSet

router = routers.SimpleRouter()

# User
router.register(r'user', UserViewSet, basename='user')

# Auth
router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# Post
router.register(r'post', PostViewSet, basename='post')

urlpatterns = [
    *router.urls,
]
