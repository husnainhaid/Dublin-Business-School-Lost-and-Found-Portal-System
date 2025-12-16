// Reference from const base_url from chatgpt:https://chatgpt.com/c/6940bf1f-75d4-832d-bccd-b8795a1f1568 that it delpoy my front end on netlify and backend on backend to pythonanywhere to live build my website but their hosting dont show  database on pythonanywhere but sever is live finally
const BASE_URL = "http://localhost:5000";

export async function adminLogin(username, password) {
    const response = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    return result;
}
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

///Reference:https://github.com/prince-c11/lost-found-management   in that project i get the idea from that then make logic of code by chatgpt
/* 
   UPDATE ITEM (Only STATUS or fields used  admin.js)
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
   DELETE ITEM (Admin Dashboard)
 */
export async function deleteItem(id) {
    const response = await fetch(`${BASE_URL}/items/${id}`, {
        method: "DELETE"
    });

    return await response.json();
}
/* 
   getStatusItems code from claude sonnet ai that implement loadStatusItems() based on my backend API and database schema
 */
export async function getStatusItems() {
    const response = await fetch(`${BASE_URL}/ClaimedItems`);
    return await response.json();
}

