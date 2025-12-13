"""
test_api.py
-----------

Basic API tests for Flask endpoints.
"""

from app import app

def test_get_items():
    client = app.test_client()
    response = client.get("/items")

    assert response.status_code == 200


def test_update_status():
    client = app.test_client()

    response = client.put(
        "/items/1",
        json={"status": "CLAIMED"}
    )

    assert response.status_code in [200, 404]
