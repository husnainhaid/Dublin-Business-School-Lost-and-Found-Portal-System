
(function(){
  const form = document.getElementById('adminLoginForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const username = (fd.get('username')||'').toString().trim();
    const password = (fd.get('password')||'').toString();
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('isAdmin', 'true');
      Toast.success('Login successful', 'Welcome');
      setTimeout(() => { window.location.href = 'admin.html'; }, 500);
    } else {
      Toast.error('Invalid login credentials', 'Login Failed');
    }

     });
})();
//# admin.js script:
import { getItems, updateItem, deleteItem } from "./apiCall.js";

let allItems = [];


const itemsTableBody = document.getElementById("itemsTableBody");
const noItems = document.getElementById("noItems");


document.addEventListener("DOMContentLoaded", loadItems);


async function loadItems() {
    try {
        const data = await getItems();

        allItems = data.map(item => ({
            id: item.item_id,
            student_name: item.student_name,
            item_name: item.item_name,
            description: item.description,
            location: item.location,
            date_lost: item.date_lost,
            category: item.category,
            email: item.student_email,
            phone: item.phone_number,
            status: item.status
        }));

        renderTable();

    } catch (err) {
        console.error("Error loading items:", err);
    }
}
//# Function resource get from :https://www.rdocumentation.org/packages/shiny/versions/0.8.0/topics/renderTable 
function renderTable() {
    itemsTableBody.innerHTML = "";

    if (allItems.length === 0) {
        noItems.classList.remove("hidden");
        return;
    }

    noItems.classList.add("hidden");

    allItems.forEach(item => {
        itemsTableBody.appendChild(createRow(item));
    });
}

//  code from Chatgpt within i put my attributes  to build Table row
function createRow(item) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>#${item.id}</td>
        <td>${escapeHtml(item.student_name)}</td>
        <td>${escapeHtml(item.item_name)}</td>
        <td>${escapeHtml(item.description)}</td>
        <td>${escapeHtml(item.location)}</td>
        <td>${formatDate(item.date_lost)}</td>
        <td>${escapeHtml(item.category)}</td>
        <td>${escapeHtml(item.email)}</td>
        <td>${escapeHtml(item.phone)}</td>

        //LOGIC of code from copilot  then implement funcation of status
                <td>
            <span class="badge ${getStatusClass(item.status)}">${item.status}</span>
        </td>

        <td>
            <button class="btn btn-sm btn-warning update-status-btn" data-id="${item.id}" data-status="${item.status}" data-item-name="${escapeHtml(item.item_name)}">
                🔄
            </button>

            <button class="btn btn-sm btn-danger delete-item-btn" data-id="${item.id}" data-item-name="${escapeHtml(item.item_name)}">
                🗑️
            </button>
        </td>
    `;

    return row;
}


function getStatusClass(status) {
    if (status === "UNCLAIMED") return "badge-unclaimed";
    if (status === "CLAIMED") return "badge-claimed";
    if (status === "RETURNED") return "badge-returned";
}


itemsTableBody.addEventListener("click", async (e) => {
    
    if (e.target.closest(".update-status-btn")) {
        const btn = e.target.closest(".update-status-btn");
        const id = parseInt(btn.dataset.id);
        const currentStatus = btn.dataset.status;
        const itemName = btn.dataset.itemName;
        showStatusModal(id, currentStatus, itemName);
    }

    
    if (e.target.closest(".delete-item-btn")) {
        const btn = e.target.closest(".delete-item-btn");
        const id = parseInt(btn.dataset.id);
        const itemName = btn.dataset.itemName;
        showDeleteModal(id, itemName);
    }
});