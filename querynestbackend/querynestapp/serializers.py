from rest_framework import serializers
from .models import Question, Answer, Student

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'

class StudentLoginSerializer(serializers.Serializer):
    name = serializers.CharField()
    reg_no = serializers.CharField()
    password = serializers.CharField()
