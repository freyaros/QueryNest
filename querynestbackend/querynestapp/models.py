from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    register_number = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.register_number})"

class Question(models.Model):
    question_text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question_text[:50]

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    answer_text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Answer to Q{self.question.id}"
