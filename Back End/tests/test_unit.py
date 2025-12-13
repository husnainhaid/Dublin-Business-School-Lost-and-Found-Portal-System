"""
test_unit.py
------------

Basic unit tests for database operations.
These tests verify that CRUD functions work correctly.
"""
# code from calude ai for testing it shows unit tests of key CRUD functions along one integration test where front and backend interact
from models import create_item, get_all_items

def test_create_item():
    data = {
        "student_name": "Test Student",
        "item_name": "Test Wallet",
        "description": "Black leather wallet",
        "location": "Library",
        "date_lost": "2024-01-01",
        "category": "Personal",
        "student_email": "test@mydbs.ie",
        "phone_number": "+353899999999",
        "image": None
    }

    item_id = create_item(data)
    assert item_id is not None


def test_get_all_items():
    items = get_all_items()
    assert isinstance(items, list)
