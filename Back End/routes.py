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