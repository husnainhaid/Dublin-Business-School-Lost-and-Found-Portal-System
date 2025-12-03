#Reference from template:https://github.com/prince-c11/lost-found-management/blob/main/Lost-Found%20Management/models.py  
# i get the structure from there to create(insert a lost items into database) and read to get data back to store in database
from database import get_db

# CREATE (Insert new lost item)
def create_item(data):
    """Insert a new lost item into the database."""
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO items 
        (student_name, item_name, description, location, date_lost, category, student_email, phone_number, status, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'UNCLAIMED', ?)
    """, (
        data["student_name"],
        data["item_name"],
        data["description"],
        data["location"],
        data["date_lost"],
        data["category"],
        data["student_email"],
        data["phone_number"],
        data.get("image")
    ))

    conn.commit()
    item_id = cur.lastrowid
    conn.close()
    return item_id


def get_all_items():
    """Return a list of all items stored in the database."""
    conn = get_db()
    cur = conn.cursor()

    rows = cur.execute("SELECT * FROM items ORDER BY item_id DESC").fetchall()

    conn.close()
    return [dict(row) for row in rows]