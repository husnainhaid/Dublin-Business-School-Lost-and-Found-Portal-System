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

    items = [dict(row) for row in rows]
    conn.close()  # Close connection after reading

    return items

#Referene from template:https://github.com/prince-c11/lost-found-management/blob/main/Lost-Found%20Management/app.py this will give undertstanding of def and other variables understadning with  edit
#Code from Copilot Ai that it automatically modfiy functions update_item_status and delete_item within logic then i change according to my attributes
# ======================================
# UPDATE STATUS ONLY
# ======================================
def update_item_status(item_id, new_status):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        UPDATE items
        SET status = ?
        WHERE item_id = ?
    """, (new_status, item_id))

    affected_rows = cur.rowcount  # Get rowcount BEFORE closing
    conn.commit()
    conn.close()  # Close connection to persist changes
    return affected_rows > 0


# ======================================
# DELETE ITEM
# ======================================
def delete_item(item_id):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("DELETE FROM items WHERE item_id = ?", (item_id,))
    affected_rows = cur.rowcount  # Get rowcount BEFORE closing
    conn.commit()
    conn.close()  # Close connection to persist changes

    return affected_rows > 0
