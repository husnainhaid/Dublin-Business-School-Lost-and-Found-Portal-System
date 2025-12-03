
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