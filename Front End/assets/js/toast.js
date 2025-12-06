//Added auto-loading for toast CSS via loadToastCSS() https://chatgpt.com/c/69305867-6b3c-8331-bed3-f1d795077f44
(function loadToastCSS() {
  const cssPath = "assets/css/toast.css";

  if (!document.querySelector(`link[href="${cssPath}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssPath;
    document.head.appendChild(link);
  }
})();

class ToastManager {
  constructor() {
    this.container = null;
    this.toasts = [];
    this.init();
  }


  init() {
    
    if (!document.querySelector('.toast-container')) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    } else {
      this.container = document.querySelector('.toast-container');
    }
  }

  
  show(message, type = 'info', duration = 4000, title = '') {
    const toast = this.createToast(message, type, duration, title);
    this.container.appendChild(toast);
    this.toasts.push(toast);

    
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 10);

    
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(toast);
      }, duration);
    }

    return toast;
  }

 
   createToast(message, type, duration, title) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icon = this.getIcon(type);
    const toastTitle = title || this.getDefaultTitle(type);

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${toastTitle}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">&times;</button>
      ${
        duration > 0
          ? `<div class="toast-progress" style="animation-duration:${duration}ms;"></div>`
          : ""
      }
    `;

    toast.querySelector(".toast-close").addEventListener("click", () => {
      this.dismiss(toast);
    });

    return toast;
  }
    getIcon(type) {
    return { success: "✓", error: "✕", warning: "⚠", info: "ℹ" }[type] || "ℹ";
  }
 
   getDefaultTitle(type) {
    return (
      { success: "Success", error: "Error", warning: "Warning", info: "Info" }[
        type
      ] || "Notification"
    );
  }

  /**   Reference:https://chatgpt.com/c/69305867-6b3c-8331-bed3-f1d795077f44 :get code from chatpt to tosat functions and verify
   * 
   * @param {HTMLElement} toast
   */
  dismiss(toast) {
    toast.classList.add('removing');
    
    setTimeout(() => toast.remove(), 300);
  }

  
  
}
