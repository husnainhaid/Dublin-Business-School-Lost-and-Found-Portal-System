// DOM Elements
const reportForm = document.getElementById('reportForm');
const imageInput = document.getElementById('itemImage');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');


reportForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    
    const formData = {
        studentName: document.getElementById('studentName').value.trim(),
        itemName: document.getElementById('itemName').value.trim(),
        description: document.getElementById('description').value.trim(),
        location: document.getElementById('location').value,
        dateLost: document.getElementById('dateLost').value,
        category: document.getElementById('category').value,
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        image: imagePreview.src || null
    };

    if (!validateForm(formData)) return;

    const submitBtn = reportForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    try {

    }

    catch (error) {

    }

});