

# Register your models here.
from django.contrib import admin
from .models import Student

class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'register_number')  # Optional: for table view
    fields = ('name', 'register_number', 'password')  # 👈 explicitly add password here

admin.site.register(Student, StudentAdmin)
