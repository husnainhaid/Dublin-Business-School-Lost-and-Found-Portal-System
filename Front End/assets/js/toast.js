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

  /**
   
   * @param {string} message 
   * @param {string} type 
   * @param {number} duration 
   * @param {string} title 
   */
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

  /**
   
   * @private
   */
  createToast(message, type, duration, title) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    
    const icon = this.getIcon(type);

    
    const toastTitle = title || this.getDefaultTitle(type);
  }
}
