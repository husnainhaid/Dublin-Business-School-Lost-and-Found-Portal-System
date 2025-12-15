from flask import Flask
from flask_cors import CORS
from database import create_tables
import os
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
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
