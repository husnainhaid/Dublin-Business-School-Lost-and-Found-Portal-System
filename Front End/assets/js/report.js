// Reference:https://chatgpt.com/c/69305867-6b3c-8331-bed3-f1d795077f44  update  code of  report full   within attributtes implemented and accordint to structure 
import { showToast } from "./toast.js";
import { createItem } from "./apicall.js";

// DOM Elements
const reportForm = document.getElementById('reportForm');
const imageInput = document.getElementById('itemImage');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');



imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        imagePreview.src = reader.result;
        imagePreviewContainer.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
});

/* Report form occurance with help of chatgpt within attributes that i taken and show toast notificatiosn logic as well */
reportForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
  /* Email VALIDATION must required valid  */
    if (!email.toLowerCase().endsWith("@dbs.ie")) {
        showToast("Please enter a valid DBS email address (example@dbs.ie).", "error", 5000);
        return;
    }
    /* PHONE VALIDATION must required valid */
    const phone = document.getElementById("phone").value.trim();

    if (!phone.startsWith("+353") || phone.length < 8) {
        showToast("Phone number must start with +353 and be valid.", "error", 5000);
        return;
    }

    const data = {
        student_name: document.getElementById("studentName").value.trim(),
        student_email: email,
        phone_number: document.getElementById("phone").value.trim(),

        item_name: document.getElementById("itemName").value.trim(),
        description: document.getElementById("description").value.trim(),

        location: document.getElementById("location").value,
        category: document.getElementById("category").value,

        date_lost: document.getElementById("dateLost").value,

        image: imageInput.files.length > 0 ? imagePreview.src : null,
    };
/* Submitting login within showToast success  */
    console.log("Submitting data:", data);

    const res = await createItem(data);

    if (res.success === true) {
        showToast(res.Status, "success", 5000);
        reportForm.reset();
        imagePreviewContainer.classList.add("hidden");
        imagePreview.src = "";
        imageInput.value = "";
    } else {
        showToast(res.Status || "Error submitting report", "error", 5000);
    }
});