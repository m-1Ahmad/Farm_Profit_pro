from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models_mongo import PredictionHistory
from xgboost import XGBRegressor
import os
import pandas as pd
import numpy as np
import math
import json
import joblib
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from .models import User
from .serializers import UserSerializer
import traceback
from mongoengine.errors import NotUniqueError
from django.contrib.auth.hashers import check_password
import datetime
import csv

# Load CSV data
Base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
csv_path = os.path.join(Base_dir, 'data', 'final_crop_prices_trend_ready.csv')
csv_data = pd.read_csv(csv_path)

# Create your views here.
class SignupView(APIView):
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                email = serializer.validated_data['email']
                
                # Check if user with this email already exists
                if User.objects(email=email).first():
                    return Response({"error": "Email already exists"}, status=400)

                user = serializer.save()

                uid = urlsafe_base64_encode(force_bytes(str(user.id)))
                token = default_token_generator.make_token(user)

                verification_link = f"http://localhost:5173/verify-email/{uid}/{token}"
                # Create simple text message with button-like formatting
                message = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - Farm Profit Pro</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }}
        .container {{
            background-color: #ffffff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}
        .header {{
            text-align: center;
            margin-bottom: 30px;
        }}
        .logo {{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-bottom: 20px;
        }}
        .title {{
            color: #16a34a;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }}
        .subtitle {{
            color: #666;
            font-size: 16px;
        }}
        .content {{
            margin-bottom: 30px;
        }}
        .verify-button {{
            display: inline-block;
            background-color: #16a34a;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
        }}
        .verify-button:hover {{
            background-color: #15803d;
        }}
        .link-text {{
            word-break: break-all;
            color: #16a34a;
            font-size: 14px;
            margin: 15px 0;
        }}
        .footer {{
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #666;
            font-size: 14px;
        }}
        .warning {{
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #92400e;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://via.placeholder.com/80x80/16a34a/ffffff?text=FP" alt="Farm Profit Pro Logo" class="logo">
            <div class="title">Farm Profit Pro</div>
            <div class="subtitle">Email Verification Required</div>
        </div>
        
        <div class="content">
            <h2>Welcome to Farm Profit Pro! 🌾</h2>
            
            <p>Thank you for signing up! We're excited to have you join our community of farmers and agricultural professionals.</p>
            
            <p>To complete your registration and start using our platform, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
                <a href="{verification_link}" target="_blank" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Verify Email Address</a>
            </div>
            
            <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
            <div class="link-text">{verification_link}</div>
            
            <div class="warning">
                <strong>Security Notice:</strong> This verification link will expire in 24 hours for your security.
            </div>
        </div>
        
        <div class="footer">
            <p>This email was sent from Farm Profit Pro. If you didn't sign up for an account, please ignore this email.</p>
            <p>Best regards,<br>The Farm Profit Pro Team</p>
        </div>
    </div>
</body>
</html>
        """
                from django.core.mail import EmailMessage
                email = EmailMessage(
                    subject="Verify your email - Farm Profit Pro",
                    body=message,
                    from_email="noreply@farmprofitpro.com",
                    to=[user.email]
                )
                email.content_subtype = "html"
                email.send()
                return Response({"message": "User created successfully. Please check your email for verification."}, status=201)

            return Response(serializer.errors, status=400)

        except NotUniqueError:
            return Response({"error": "Email already registered."}, status=400)
        except Exception as e:
            print("Signup Error:", e)
            traceback.print_exc()
            return Response({"error": "Internal server error."}, status=500)

class VerifyEmailView(APIView):
    def get(self, request, uidb64, token):
        try:
            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)
            if default_token_generator.check_token(user, token):
                user.is_verified = True
                user.save()
                return Response({"message": "Email verified successfully."})
            return Response({"error": "Invalid or expired token."}, status=400)
        except (TypeError, ValueError, OverflowError):
            return Response({"error": "Invalid verification link."}, status=400)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=404)
        except Exception as e:
            print("Verification error:", e)
            return Response({"error": "Verification failed. Please try again."}, status=500)

class LoginView(APIView):
    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            if not email or not password:
                return Response({'error': 'Email and password are required.'}, status=400)
            user = User.objects(email=email).first()
            if not user:
                return Response({'error': 'Invalid email or password.'}, status=401)
            if not check_password(password, user.password):
                return Response({'error': 'Invalid email or password.'}, status=401)
            user.last_login = datetime.datetime.utcnow()
            user.save()
            return Response({'message': 'Login successful.', 'name': user.name, 'email': user.email, 'is_verified': user.is_verified}, status=200)
        except Exception as e:
            print('Login error:', e)
            return Response({'error': 'Internal server error.'}, status=500)

class ResendVerificationView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=400)
        user = User.objects(email=email).first()
        if not user:
            return Response({'error': 'User not found.'}, status=404)
        if user.is_verified:
            return Response({'message': 'Email is already verified.'}, status=200)
        uid = urlsafe_base64_encode(force_bytes(str(user.id)))
        token = default_token_generator.make_token(user)
        verification_link = f"http://localhost:5173/verify-email/{uid}/{token}"
        message = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - Farm Profit Pro</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }}
        .container {{
            background-color: #ffffff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}
        .header {{
            text-align: center;
            margin-bottom: 30px;
        }}
        .logo {{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-bottom: 20px;
        }}
        .title {{
            color: #16a34a;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }}
        .subtitle {{
            color: #666;
            font-size: 16px;
        }}
        .content {{
            margin-bottom: 30px;
        }}
        .verify-button {{
            display: inline-block;
            background-color: #16a34a;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
        }}
        .verify-button:hover {{
            background-color: #15803d;
        }}
        .link-text {{
            word-break: break-all;
            color: #16a34a;
            font-size: 14px;
            margin: 15px 0;
        }}
        .footer {{
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #666;
            font-size: 14px;
        }}
        .warning {{
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #92400e;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://via.placeholder.com/80x80/16a34a/ffffff?text=FP" alt="Farm Profit Pro Logo" class="logo">
            <div class="title">Farm Profit Pro</div>
            <div class="subtitle">Email Verification Required</div>
        </div>
        
        <div class="content">
            <h2>Welcome to Farm Profit Pro! 🌾</h2>
            
            <p>Thank you for signing up! We're excited to have you join our community of farmers and agricultural professionals.</p>
            
            <p>To complete your registration and start using our platform, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
                <a href="{verification_link}" target="_blank" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Verify Email Address</a>
            </div>
            
            <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
            <div class="link-text">{verification_link}</div>
            
            <div class="warning">
                <strong>Security Notice:</strong> This verification link will expire in 24 hours for your security.
            </div>
        </div>
        
        <div class="footer">
            <p>This email was sent from Farm Profit Pro. If you didn't sign up for an account, please ignore this email.</p>
            <p>Best regards,<br>The Farm Profit Pro Team</p>
        </div>
    </div>
</body>
</html>
        """
        
        # Send HTML email
        from django.core.mail import EmailMessage
        email = EmailMessage(
            subject="Verify your email - Farm Profit Pro",
            body=message,
            from_email="noreply@farmprofitpro.com",
            to=[user.email]
        )
        email.content_subtype = "html"  # Set content type to HTML
        email.send()
        return Response({'message': 'Verification email sent.'}, status=200)

class ContactView(APIView):
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')
        if not name or not email or not message:
            return Response({'error': 'All fields are required.'}, status=400)
        try:
            send_mail(
                subject=f"Contact Form Message from {name}",
                message=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}",
                from_email="noreply@farmprofitpro.com",
                recipient_list=["mahmad0449939@gmail.com"],
                fail_silently=False,
            )
            return Response({'message': 'Message sent successfully!'}, status=200)
        except Exception as e:
            print('Contact form error:', e)
            return Response({'error': 'Failed to send message.'}, status=500)

Base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
Model_path = os.path.join(Base_dir, 'models')
Encoder_path = os.path.join(Base_dir, 'encoders')

model_min = XGBRegressor()
model_max = XGBRegressor()

model_min.load_model(os.path.join(Model_path, 'xgb_min_price.model'))
model_max.load_model(os.path.join(Model_path, 'xgb_max_price.model'))

# Load encoders with error handling
try:
    crop_encoder = joblib.load(os.path.join(Encoder_path, 'crop_encoder.pkl'))
    crop_type_encoder = joblib.load(os.path.join(Encoder_path, 'crop_type_encoder.pkl'))
    market_encoder = joblib.load(os.path.join(Encoder_path, 'market_encoder.pkl'))
    city_encoder = joblib.load(os.path.join(Encoder_path, 'city_encoder.pkl'))
    province_encoder = joblib.load(os.path.join(Encoder_path, 'province_encoder.pkl'))
except Exception as e:
    print(f"Error loading encoders: {e}")
    crop_encoder = crop_type_encoder = market_encoder = city_encoder = province_encoder = None

# Helper for safe label encoding
def safe_transform(encoder, value, field_name):
    if encoder is None:
        raise ValueError(f"Encoder for {field_name} not loaded.")
    try:
        return encoder.transform([value])[0]
    except ValueError:
        raise ValueError(f"Unknown {field_name}: {value}")

# Function to get historical averages from CSV
def get_historical_averages(crop, crop_type, city, market, province):
    filtered_data = csv_data[
        (csv_data['crop'] == crop) &
        (csv_data['crop_type'] == crop_type) &
        (csv_data['city'] == city) &
        (csv_data['market'] == market) &
        (csv_data['province'] == province) &
        (csv_data['year'] == 2023)
    ]
    if filtered_data.empty:
        return {
            'min_price_lag1': 1899.08,
            'max_price_lag1': 2398.65,
            'min_price_lag2': 1899.08,
            'max_price_lag2': 2398.64,
            'min_price_roll3': 1899.08,
            'max_price_roll3': 2398.64,
            'min_price_yoy_diff': -0.08,
            'max_price_yoy_diff': -0.10,
            'crop_month_roll': 2148.86
        }
    def safe_mean(col):
        return float(filtered_data[col].mean()) if col in filtered_data and not filtered_data[col].isnull().all() else 0.0
    historical_avg = {
        'min_price_lag1': safe_mean('min_price_lag1'),
        'max_price_lag1': safe_mean('max_price_lag1'),
        'min_price_lag2': safe_mean('min_price_lag2'),
        'max_price_lag2': safe_mean('max_price_lag2'),
        'min_price_roll3': safe_mean('min_price_roll3'),
        'max_price_roll3': safe_mean('max_price_roll3'),
        'min_price_yoy_diff': safe_mean('min_price_yoy_diff'),
        'max_price_yoy_diff': safe_mean('max_price_yoy_diff'),
        'crop_month_roll': safe_mean('crop_month_roll')
    }
    return historical_avg

@csrf_exempt
def predict_price(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method"}, status=405)
    
    try:
        data = json.loads(request.body)
        # Validate required fields
        required_fields = ['crop', 'crop_type', 'market', 'city', 'province', 'month', 'year', 'weightage', 'email']
        for field in required_fields:
            if field not in data or not data[field]:
                return JsonResponse({"error": f"Missing or empty field: {field}"}, status=400)
        
        # Encode categorical fields safely
        try:
            crop = safe_transform(crop_encoder, data['crop'], 'crop')
            crop_type = safe_transform(crop_type_encoder, data['crop_type'], 'crop_type')
            market = safe_transform(market_encoder, data['market'], 'market')
            city = safe_transform(city_encoder, data['city'], 'city')
            province = safe_transform(province_encoder, data['province'], 'province')
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=400)
        
        month = int(data['month'])
        year = int(data['year'])
        weightage = float(data['weightage'])
        
        # Get historical averages from CSV
        historical_avg = get_historical_averages(data['crop'], data['crop_type'], data['city'], data['market'], data['province'])
        
        quarter = (year - 2019) * 4 + (month - 1) // 3 + 1
        month_sin = math.sin(2 * math.pi * month / 12)
        month_cos = math.cos(2 * math.pi * month / 12)
        
        if month in [3, 4, 5]:
            supply_score = 1.0
        elif month in [6, 7, 8]:
            supply_score = 0.6
        else:
            supply_score = 0
        
        if month in [9, 10, 11]:
            demand_score = 1.0
        elif month in [12, 1, 2]:
            demand_score = 0.6
        else:
            demand_score = 0
        
        features = pd.DataFrame([{
            'crop': crop,
            'crop_type': crop_type,
            'market': market,
            'city': city,
            'province': province,
            'month': month,
            'year': year,
            'quarter': quarter,
            'weightage': weightage,
            'min_price_lag1': historical_avg['min_price_lag1'],
            'max_price_lag1': historical_avg['max_price_lag1'],
            'min_price_lag2': historical_avg['min_price_lag2'],
            'max_price_lag2': historical_avg['max_price_lag2'],
            'min_price_roll3': historical_avg['min_price_roll3'],
            'max_price_roll3': historical_avg['max_price_roll3'],
            'min_price_yoy_diff': historical_avg['min_price_yoy_diff'],
            'max_price_yoy_diff': historical_avg['max_price_yoy_diff'],
            'month_sin': month_sin,
            'month_cos': month_cos,
            'supply_score': supply_score,
            'demand_score': demand_score,
            'crop_month_roll': historical_avg['crop_month_roll']
        }])

        min_log = model_min.predict(features)[0]
        max_log = model_max.predict(features)[0]

        min_price = round(np.expm1(min_log), 2)
        max_price = round(np.expm1(max_log), 2)
        min_per_kg = round(min_price/40, 2)
        max_per_kg = round(max_price/40, 2)
        min_price = round(min_per_kg*weightage, 2)
        max_price = round(max_per_kg*weightage, 2)
        month_adjustments = {
            1: 0.96, 2: 0.97, 3: 1.00, 4: 1.05, 5: 1.08, 6: 1.10,
            7: 1.07, 8: 1.03, 9: 0.98, 10: 0.96, 11: 0.93, 12: 0.91
        }

        adjustment_factor = month_adjustments.get(month, 1.0)
        min_price = round(min_price * adjustment_factor, 2)
        max_price = round(max_price * adjustment_factor, 2)
        # Only store in DB if store is not set to false
        store = data.get('store', True)
        if isinstance(store, str):
            store = store.lower() != 'false'
        if store:
            PredictionHistory(       
                crop=data['crop'],
                crop_type=data['crop_type'],
                market=data['market'],
                city=data['city'],
                province=data['province'],
                month=data['month'],
                year=data['year'],
                weightage=data['weightage'],
                predicted_min_price=float(min_price),
                predicted_max_price=float(max_price),
                email=data.get('email', None)
            ).save()

        return JsonResponse({
            'min_price': float(min_price),
            'max_price': float(max_price)
        })
    
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=500)

def ping(request):
    return JsonResponse({"message": "model loaded"})
