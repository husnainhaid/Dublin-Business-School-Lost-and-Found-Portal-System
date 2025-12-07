const BASE_URL = "http://localhost:5000";

/* 
   CREATE ITEM (Report Form)
 */
export async function createItem(data) {
    const response = await fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return await response.json();
}

/* 
   GET ALL ITEMS (Admin Dashboard)
*/
export async function getItems() {
    const response = await fetch(`${BASE_URL}/items`);
    return await response.json();
}
/* 
   UPDATE ITEM (Only STATUS or fields used in admin.js)
 */
export async function updateItem(id, data) {
    const response = await fetch(`${BASE_URL}/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return await response.json();
}

/* 
   DELETE ITEM (Admin)
 */
export async function deleteItem(id) {
    const response = await fetch(`${BASE_URL}/items/${id}`, {
        method: "DELETE"
    });

    return await response.json();
}