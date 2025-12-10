
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
import { getItems, updateItem, deleteItem } from "./apicall.js";
import { showToast } from "./toast.js";
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

/*
   UPDATE STATUS MODAL
*/
//code from chatgpt: https://chatgpt.com/c/69305867-6b3c-8331-bed3-f1d795077f44 that implement modal logic  structure
function showStatusModal(id, currentStatus, itemName) {
    
    const modalHTML = `
        <div class="modal-overlay" id="statusModal" style="display: flex;">
            <div class="modal">
                <div class="modal-header">
                    <h2 class="modal-title">Update Status - ${escapeHtml(itemName)}</h2>
                    <button class="modal-close" id="closeStatusModal">&times;</button>
                </div>
                <div class="modal-body">
                    <p style="margin-bottom: 1rem; color: #6b7280;">
                        Current status: <strong>${currentStatus}</strong>
                    </p>
                    <label for="newStatus" style="display: block; font-weight: 600; margin-bottom: 0.5rem;">
                        Select New Status
                    </label>
                    <select id="newStatus" class="form-select" style="width: 100%;">
                        <option value="UNCLAIMED" ${currentStatus === 'UNCLAIMED' ? 'selected' : ''}>Unclaimed</option>
                        <option value="CLAIMED" ${currentStatus === 'CLAIMED' ? 'selected' : ''}>Claimed</option>
                        <option value="RETURNED" ${currentStatus === 'RETURNED' ? 'selected' : ''}>Returned</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancelStatusBtn">Cancel</button>
                    <button class="btn btn-primary" id="updateStatusBtn">Update Status</button>
                </div>
            </div>
        </div>
    `;
      
    const existingModal = document.getElementById('statusModal');
    if (existingModal) {
        existingModal.remove();
    }
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.body.style.overflow = 'hidden';

    document.getElementById('closeStatusModal').addEventListener('click', closeStatusModal);
    document.getElementById('cancelStatusBtn').addEventListener('click', closeStatusModal);
    document.getElementById('updateStatusBtn').addEventListener('click', () => updateStatusFromModal(id));

    
    document.getElementById('statusModal').addEventListener('click', (e) => {
        if (e.target.id === 'statusModal') {
            closeStatusModal();
        }
    });
   
}

/* 
   Reference code from chatgpt to Added new functions to close and update status modal in closeStatusModal and updateStatusFromModal`
*/
function closeStatusModal() {
    const modal = document.getElementById('statusModal');
    if (modal) {
        modal.remove();
    }
    document.body.style.overflow = '';
}

/* 
   
 */
async function updateStatusFromModal(id) {
    const newStatus = document.getElementById('newStatus').value;

    const result = await updateItem(id, { status: newStatus });

    if (result.success) {
        showToast("Status updated successfully check your email", "success");
        closeStatusModal();
        loadItems();
    } else {
        showToast("Failed to update status", "error");
    }
}

/**https://github.com/Nycto/PicoModal/blob/master/src/picoModal.js get the code logic  from that template to show delete confirmation proper */
    /** Manages setting the 'overflow: hidden' on the body tag */
    

    
/*   Code from Copilot to SHOW DELETE CONFIRMATION MODAL according to my sequence and structure 
*/
function showDeleteModal(id, itemName) {
    // Create confirmation modal
    const modalHTML = `
        <div class="modal-overlay" id="deleteModal" style="display: flex;">
            <div class="modal">
                <div class="modal-header">
                    <h2 class="modal-title">Confirm Deletion</h2>
                    <button class="modal-close" id="closeDeleteModal">&times;</button>
                </div>
                <div class="modal-body">
                    <p style="font-size: 1rem; color: #4b5563; line-height: 1.6;">
                        Are you sure you want to delete <strong>"${escapeHtml(itemName)}"</strong>?
                    </p>
                    <p style="font-size: 0.875rem; color: #ef4444; margin-top: 1rem;">
                        ⚠️ This action cannot be undone.
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancelDeleteBtn">Cancel</button>
                    <button class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    const existingModal = document.getElementById('deleteModal');
    if (existingModal) {
        existingModal.remove();
    }
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Add event listeners
    document.getElementById('closeDeleteModal').addEventListener('click', closeDeleteModal);
    document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);
    document.getElementById('confirmDeleteBtn').addEventListener('click', () => confirmDelete(id));

    // Close on overlay click
    document.getElementById('deleteModal').addEventListener('click', (e) => {
        if (e.target.id === 'deleteModal') {
            closeDeleteModal();
        }
    });
}

/* 
   CLOSE DELETE MODAL
*/
function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.remove();
    }
    document.body.style.overflow = '';
}

/* 
   CONFIRM DELETE
*/
async function confirmDelete(id) {
    const result = await deleteItem(id);

    if (result.success) {
        showToast("Item deleted successfully", "success");
        closeDeleteModal();
        loadItems();
    } else {
        showToast("Failed to delete item", "error");
    }
}

/* 
   ESCAPE HTML
 */
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text ?? "";
    return div.innerHTML;
}

/* 
   FORMAT DATE
 */
function formatDate(dateString) {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IE", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}