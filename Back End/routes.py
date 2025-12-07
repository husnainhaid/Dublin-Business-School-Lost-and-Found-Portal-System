# Reference code:https://github.com/prince-c11/lost-found-management/blob/main/Lost-Found%20Management/app.py 

from flask import Flask, Blueprint, render_template, redirect, url_for, flash, request, session
from flask_bcrypt import Bcrypt
from flask_login import login_user, logout_user, login_required, current_user, LoginManager
import random
import os
from datetime import datetime, timezone, timedelta
from werkzeug.utils import secure_filename
from itsdangerous import URLSafeTimedSerializer as Serializer, SignatureExpired
from flask_mail import Mail, Message
from models import db, User, PasswordResetToken, Item, Category, Notification, ItemStatusEnum
app = Flask(__name__)

@app.route('/')
def home_page():
    # Get search and category parameters from the request
    search_term = request.args.get('search', '')
    category_id = request.args.get('category', '')

    # Build the query with filters
    query = Item.query

    if search_term:
        query = query.filter(
            (Item.name.ilike(f'%{search_term}%')) |
            (Item.description.ilike(f'%{search_term}%'))
        )

    if category_id:
        query = query.filter(Item.category_id == category_id)

    items = query.all()
    categories = Category.query.all()

    return render_template('home.html', items=items, categories=categories