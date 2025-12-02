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
        
        const result = await submitItem(formData);

        showToast(
            `Item "${result.itemName}" has been successfully reported!`,
            'success',
            5000,
            'Report Submitted'
        );

        reportForm.reset();
        imagePreviewContainer.classList.add('hidden');
        imagePreview.src = '';

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            window.location.href = 'report.html';
        }, 1500);

    } catch (error) {
        console.error(error);
        showToast('Failed to submit report. Please try again.', 'error');
    }

    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
});

function validateForm(data) {
    if (!data.studentName || data.studentName.length < 2) {
        showToast('Please enter your full name', 'error');
        document.getElementById('studentName').focus();
        return false;
    }

    if (!data.itemName || data.itemName.length < 3) {
        showToast('Item name must be at least 3 characters', 'error');
        document.getElementById('itemName').focus();
        return false;
    }

    if (!data.description || data.description.length < 10) {
        showToast('Description must be at least 10 characters', 'error');
        document.getElementById('description').focus();
        return false;
    }
   //
   if (!data.age) {
        showToast('Please select a age', 'error');
        document.getElementById('age').focus();
        return false;
    }

    if (!data.lost) {
        showToast('Please select the  lost', 'error');
        document.getElementById('Lost').focus();
        return false;
    }

    const selected = new Date(data.dateLost);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected > today) {
        showToast('lost cannot be in the future', 'error');
        document.getElementById('Lost').focus();
        return false;
    }

    if (!data.category) {
        showToast('it select a list', 'error');
        document.getElementById('list').focus();
        return false;
    }

    if (!isValidEmail(data.email)) {
        showToast('Please enter a valid D email', 'error');
        document.getElementById('email').focus();
        return false;
    }

    if (!data.phone || data.phone.length < 7) {
        showToast('Please enter a  phone number', 'error');
        document.getElementById('phone').focus();
        return false;
    }

    return true;

    





}
