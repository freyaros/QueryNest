from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Question, Answer, Student
import json

@csrf_exempt
def questions_api(request):
    if request.method == "GET":
        questions = Question.objects.all().order_by('-created')
        data = [
            {
                "id": q.id,
                "text": q.question_text,
                "answers": [a.answer_text for a in q.answers.all()]
            }
            for q in questions
        ]
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        body = json.loads(request.body)
        question = body.get("question")
        if question:
            Question.objects.create(question_text=question)
            return JsonResponse({"message": "Question added"})
        return JsonResponse({"error": "No question provided"}, status=400)

@csrf_exempt
def answer_api(request, question_id):
    if request.method == "POST":
        body = json.loads(request.body)
        answer_text = body.get("answer_text")
        # Get student info from session or token (not implemented)
        # For now, fallback to name/register_number if sent
        name = body.get("name")
        register_number = body.get("register_number")
        if not (name and register_number and answer_text):
            return JsonResponse({"error": "Missing fields"}, status=400)
        try:
            student = Student.objects.get(name=name, register_number=register_number)
        except Student.DoesNotExist:
            return JsonResponse({"error": "Unauthorized"}, status=403)
        question = Question.objects.get(id=question_id)
        Answer.objects.create(question=question, student=student, answer_text=answer_text)
        return JsonResponse({"message": "Answer posted"})

@csrf_exempt
def student_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name', "").strip()
        register_number = data.get('register_number', "").strip()
        password = data.get('password', "").strip()

        student = Student.objects.filter(
            name=name,
            register_number=register_number,
            password=password
        ).first()

        if student:
            return JsonResponse({'success': True, 'message': 'Login successful'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)

@csrf_exempt
def question_detail_api(request, question_id):
    if request.method == "GET":
        try:
            q = Question.objects.get(id=question_id)
            data = {
                "id": q.id,
                "question_text": q.question_text,
                "answers": [a.answer_text for a in q.answers.all()]
            }
            return JsonResponse(data)
        except Question.DoesNotExist:
            return JsonResponse({"error": "Question not found"}, status=404)

def index(request):
    return HttpResponse("QueryNest API Backend is running.")
