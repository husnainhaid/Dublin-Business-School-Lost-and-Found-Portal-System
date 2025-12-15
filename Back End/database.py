import sqlite3
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Create instance folder if it doesn't exist
INSTANCE_DIR = os.path.join(BASE_DIR, "instance")
os.makedirs(INSTANCE_DIR, exist_ok=True)

DB_PATH = os.path.join(INSTANCE_DIR, "items.db")

# Reference :https://github.com/MarkRaffy28/el5-fp/blob/main/main.py then implement changes  to my attributes with chatgpt
def get_db():
    """Implement changes code to my database  ."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  
    return conn


def create_tables():
    """Create the items table if it doesn't already exist."""
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS items (
            item_id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_name TEXT NOT NULL,
            item_name TEXT NOT NULL,
            description TEXT NOT NULL,
            location TEXT NOT NULL,
            date_lost TEXT NOT NULL,
            category TEXT NOT NULL,
            student_email TEXT NOT NULL,
            phone_number TEXT NOT NULL,
            status TEXT DEFAULT 'UNCLAIMED',
            image TEXT
        )
    """)

    conn.commit()
    conn.close()
