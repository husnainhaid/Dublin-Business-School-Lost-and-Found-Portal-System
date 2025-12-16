import { showToast } from "./toast.js";
import { adminLogin } from "./apicall.js";

const form = document.getElementById("adminLoginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const result = await adminLogin(username, password);

    if (result.success ===true) {
        showToast(result.Status, "success");
        
        setTimeout(() => {
            window.location.href = "admin.html";
        }, 1000);
    } else {
        showToast(result.Status, "error");
    }
});
