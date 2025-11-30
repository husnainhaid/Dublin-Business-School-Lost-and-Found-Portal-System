from database import get_db



def create_item(data):
    conn = get_db()
    cur = conn.cursor()
