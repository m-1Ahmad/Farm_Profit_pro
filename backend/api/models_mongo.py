from mongoengine import Document, StringField, IntField, FloatField, DateTimeField
import datetime

class PredictionHistory(Document):
    crop = StringField(required=True)
    crop_type = StringField(required=True)
    market = StringField(required=True)
    city = StringField(required=True)
    province = StringField(required=True)
    month = IntField(required=True)
    year = IntField(required=True)
    weightage = FloatField(required=True)
    predicted_min_price = FloatField(required=True)
    predicted_max_price = FloatField(required=True)
    email = StringField(required=True) 
    created_at = DateTimeField(default=datetime.datetime.utcnow)
