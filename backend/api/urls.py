from django.urls import path
from .views import ping, predict_price, SignupView, VerifyEmailView, LoginView, ResendVerificationView, ContactView

urlpatterns = [
    path('ping/', ping),
    path('predict/', predict_price),
    path('signup/', SignupView.as_view(), name='signup'),
    path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify-email'),
    path('login/', LoginView.as_view(), name='login'),
    path('resend-verification/', ResendVerificationView.as_view(), name='resend-verification'),
    path('contact/', ContactView.as_view(), name='contact'),
]
    