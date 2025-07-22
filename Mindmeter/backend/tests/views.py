from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Test, Question, UserResponse, UserTestAttempt
from .serializers import TestSerializer, QuestionSerializer, UserResponseSerializer, UserTestAttemptSerializer

# ✅ Get all available tests
class TestListView(generics.ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

# ✅ Get all questions for a specific test
class TestQuestionsView(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        test_id = self.kwargs['test_id']
        return Question.objects.filter(test_id=test_id)

# ✅ Submit user answers and calculate score
class SubmitTestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, test_id):
        user = request.user
        test = Test.objects.get(id=test_id)
        responses = request.data.get('responses', [])

        score = 0  # Store user's score

        for response in responses:
            question_id = response.get('question_id')
            selected_option = response.get('selected_option')

            try:
                question = Question.objects.get(id=question_id, test=test)
                is_correct = question.correct_option == selected_option

                if is_correct:
                    score += 1  # Increment score if answer is correct

                # Save user's response
                UserResponse.objects.create(
                    user=user, test=test, question=question, selected_option=selected_option, is_correct=is_correct
                )
            except Question.DoesNotExist:
                return Response({"error": "Invalid question ID"}, status=status.HTTP_400_BAD_REQUEST)

        # Save test attempt with score
        UserTestAttempt.objects.create(user=user, test=test, score=score)

        return Response({"message": "Test submitted successfully", "score": score}, status=status.HTTP_201_CREATED)

# ✅ Get user's previous test scores
class UserTestAttemptsView(generics.ListAPIView):
    serializer_class = UserTestAttemptSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserTestAttempt.objects.filter(user=self.request.user)
