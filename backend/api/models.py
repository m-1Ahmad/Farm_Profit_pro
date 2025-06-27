from mongoengine import Document, StringField, BooleanField, EmailField, DateTimeField
import datetime
from django.contrib.auth.hashers import make_password

class User(Document):
    name = StringField(required=True, max_length=100)
    address = StringField(required=True, max_length=255)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)  
    is_verified = BooleanField(default=False)  
    last_login = DateTimeField(default=datetime.datetime.utcnow)

    def get_email_field_name(self):
        return 'email'

    def set_password(self):
        self.password = make_password(self.password)