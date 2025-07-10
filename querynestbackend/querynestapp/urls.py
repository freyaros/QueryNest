from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  
    path('api/login/', views.student_login, name='student_login'),
    path('api/questions/', views.questions_api, name='questions_api'),
    path('api/questions/<int:question_id>/', views.question_detail_api, name='question_detail_api'),  # <-- add this
    path('api/answer/<int:question_id>/', views.answer_api, name='answer_api'),
]
