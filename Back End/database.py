import sqlite3
import os


DB_PATH = os.path.join("instance", "items.db")


def get_db():
   
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  
    return conn