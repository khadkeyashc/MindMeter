from django.urls import path
from .views import TestListView, TestQuestionsView, SubmitTestView, UserTestAttemptsView

urlpatterns = [
    path('', TestListView.as_view(), name='get_tests'),  
    path('<int:test_id>/questions/', TestQuestionsView.as_view(), name='get_test_questions'),  
    path('<int:test_id>/submit/', SubmitTestView.as_view(), name='submit_test'),  
    path('test-attempts/', UserTestAttemptsView.as_view(), name='user_test_attempts'),  
]
