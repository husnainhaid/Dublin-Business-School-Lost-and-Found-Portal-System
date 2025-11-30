from database import get_db


def create_item(data):
    """Create a new lost item entry"""
    conn = get_db()
    cur = conn.cursor()
    
    cur.execute("""
        INSERT INTO items 
        (student_name, item_name, description, location, date_lost, category, student_email, phone, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        
    ))
        
        