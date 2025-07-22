from rest_framework import serializers
from .models import Test, Question, UserResponse, UserTestAttempt

class TestSerializer(serializers.ModelSerializer):
    total_questions = serializers.ReadOnlyField()  # Uses @property from model

    class Meta:
        model = Test
        fields = ['id', 'title', 'total_questions']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text', 'option_a', 'option_b', 'option_c', 'option_d']


class UserResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserResponse
        fields = ['id', 'test', 'question', 'selected_option', 'is_correct']
        read_only_fields = ['is_correct']  # Prevent manual setting of correctness


class UserTestAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTestAttempt
        fields = ['id', 'user', 'test', 'score', 'completed_at']
