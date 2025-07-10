from django.http import HttpResponse
from django.contrib import admin
from django.urls import path, include

def index(request):
    return HttpResponse("Django backend running. Use /login or /api/ endpoints.")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('querynestapp.urls')),
    
]
