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

# 
# READ ALL ITEMS (GET /items)
# Called by admin dashboard to show the items table
# 
@app.get("/items")
def list_items():
    items = get_all_items()
    return jsonify(items)


# 
# UPDATE ITEM STATUS (PUT /items/<id>)
# Called when admin updates CLAIMED / UNCLAIMED / RETURNED
# 
@app.put("/items/<int:item_id>")
def update_status(item_id):
    data = request.json
    new_status = data.get("status")

    if not new_status:
        return jsonify({"success": False, "error": "No status provided"}), 400

    updated = update_item_status(item_id, new_status)

    return jsonify({"success": updated})
# DELETE ITEM (DELETE /items/<id>)
# Called by admin dashboard delete button
@app.route("/items/<int:item_id>", methods=['DELETE'])
def remove_item(item_id):
    deleted = delete_item(item_id)
    return jsonify({"success": deleted})
