from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db
import sqlite3

app = Flask(__name__)
CORS(app)   # Allow frontend to call API without issues

@app.post("/api/items")
def create_item():
    data = request.json

    required = ["student_name", "item_name", "description", "location",
                "date_lost", "category", "student_email", "phone"]