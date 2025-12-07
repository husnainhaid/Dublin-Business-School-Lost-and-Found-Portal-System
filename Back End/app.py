from flask import Flask
from flask_cors import CORS
from database import create_tables

# 
# INITIALIZE FLASK APP
# 
app = Flask(__name__)
CORS(app)  # Allows frontend JS to call backend API

# Create SQL tables if they do not exist
create_tables()


# 
# IMPORT ROUTES (after app is created)
# 
from routes import *


# 
# RUN THE SERVER
# 
if __name__ == "__main__":
    app.run(debug=True)
