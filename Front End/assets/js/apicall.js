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
