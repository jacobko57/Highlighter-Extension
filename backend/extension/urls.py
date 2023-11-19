# extension/urls.py
from django.urls import path
from .views import hello_world, jacob, jianna, practice, display_message, predict_disease

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),
    path('jacob/', jacob, name='jacob'),
    path('jianna/', jianna, name='jianna'),
    path('practice/', practice, name='practice'),
    path('display/', display_message, name='display'),
    path('predict_disease/', predict_disease, name='predict_disease'),
]
