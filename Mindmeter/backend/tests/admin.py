from django.contrib import admin
from .models import Test, Question, UserResponse, UserTestAttempt

class QuestionInline(admin.TabularInline):  
    """Allows adding questions directly inside the Test model in admin."""
    model = Question
    extra = 3  # Display 3 empty fields for adding new questions

class TestAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'total_questions')  
    search_fields = ('title',)  
    inlines = [QuestionInline]  # Display questions inside the Test page

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'test', 'text', 'correct_option')  
    search_fields = ('text',)  
    list_filter = ('test',)

class UserResponseAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'test', 'question', 'selected_option', 'is_correct')  
    list_filter = ('test', 'is_correct')

class UserTestAttemptAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'test', 'score', 'completed_at')  
    list_filter = ('test', 'user')

# Register models in Django admin
admin.site.register(Test, TestAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(UserResponse, UserResponseAdmin)
admin.site.register(UserTestAttempt, UserTestAttemptAdmin)
