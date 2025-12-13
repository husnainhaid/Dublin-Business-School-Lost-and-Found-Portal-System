# Reference code:https://github.com/prince-c11/lost-found-management/blob/main/Lost-Found%20Management/app.py  then update changes with help of chatgpt and understand concpets

from flask import request, jsonify
from app import app
from models import (
    admin_login,
    create_item,
    get_all_items,
    update_item_status,
    delete_item,
    ClaimData,
    email_exists
    
)
from emailServices import send_claimed_email

@app.post("/admin/login")
def admin_login_route():
    data = request.json
    user = admin_login(data["username"], data["password"])


    if user:
        return jsonify({
            "success": True,
            "Status": "Admin successfully logged in"
        })
    else:
        return jsonify({
            "success": False,
            "Status": "User Name or Password Incorrect"
        }), 401


# 
# CREATE ITEM (POST /items)
# Called when user submits the lost-item report form
# 
@app.post("/items")
def add_item():
    data = request.json
    email = data.get("student_email")
    if email_exists(email):
        return jsonify({
            "success": False,
            "message": "This email already exists. Item cannot be reported again."
        }), 400
    
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
# Reference code of email there:chatgpt 
@app.put("/items/<int:item_id>")
def update_status(item_id):
    data = request.json
    new_status = data.get("status")

    if not new_status:
        return jsonify({"success": False, "error": "No status provided"}), 400

    # 1️⃣ Get the item before update (to know the user's email)
    items = get_all_items()
    item_to_update = next((item for item in items if item["item_id"] == item_id), None)
    if not item_to_update:
        return jsonify({"success": False, "error": "Item not found"}), 404

    # 2️⃣ Update the status
    updated = update_item_status(item_id, new_status)

    # 3️⃣ Send email only if new status is CLAIMED
    if updated and new_status == "CLAIMED":
        user_email = item_to_update.get("student_email")
        item_name = item_to_update.get("item_name")
        student_name = item_to_update.get("student_name")
        email_sent = send_claimed_email(user_email,student_name,item_name)
        if email_sent:
            print(f"Email sent to {user_email} for item {item_name}")
        else:
            print(f"Failed to send email to {user_email}")

    return jsonify({"success": updated})
# DELETE ITEM (DELETE /items/<id>)
# Called by admin dashboard delete button
@app.route("/items/<int:item_id>", methods=['DELETE'])
def remove_item(item_id):
    deleted = delete_item(item_id)
    return jsonify({"success": deleted})

@app.get("/ClaimedItems")
def claimed_items():
    items = ClaimData()
    return jsonify(items)