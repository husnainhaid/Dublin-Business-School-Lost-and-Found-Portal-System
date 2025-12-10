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


def edit_item(item_id):
    item = Item.query.get_or_404(item_id)

    if request.method == 'POST':
        item.name = request.form['name']
        item.description = request.form['description']
        item.category_id = request.form['category']
        item.status = request.form['status']
        item.date = request.form['date']
        image_file = request.files['image_file']

        if image_file:
            image_filename = secure_filename(image_file.filename)
            image_file.save(f'static/images/{image_filename}')
            item.image_file = image_filename

        db.session.commit()
        flash('Item updated successfully.', 'success')
        return redirect(url_for('home_page'))

    categories = Category.query.all()
    return render_template('edit_item.html', item=item, categories=categories)

def delete_item(item_id):
    item = Item.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    flash('Item deleted successfully.', 'success')
    return redirect(url_for('home_page'))

@app.route('/item/<int:item_id>')