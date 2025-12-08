# Reference code:https://github.com/prince-c11/lost-found-management/blob/main/Lost-Found%20Management/app.py  then update changes with help of chatgpt and understand concpets

from flask import request, jsonify
from app import app
from models import (
    create_item,
    get_all_items,
    update_item_status,
    delete_item
)


# 
# CREATE ITEM (POST /items)
# Called when user submits the lost-item report form
# 
@app.post("/items")
def add_item():
    data = request.json
    item_id = create_item(data)
    return jsonify({"success": True, "item_id": item_id, "Status": "Item reported successfully! Admin will review it soon."})

@app.route('/edit_item/<int:item_id>', methods=['GET', 'POST'])
@login_required
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