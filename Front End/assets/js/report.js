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
}
