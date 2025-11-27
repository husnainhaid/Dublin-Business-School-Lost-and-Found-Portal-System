from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db
import sqlite3

app = Flask(__name__)
CORS(app)   # Allow frontend to call API without issues