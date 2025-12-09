
class ModalManager {
    constructor() {
        this.overlay = null;
        this.modal = null;
        this.isOpen = false;
        this.init();
    }

   
    init() {
        
        if (!document.querySelector('.modal-overlay')) {
            this.createModalStructure();
            this.attachEventListeners();
        } else {
            this.overlay = document.querySelector('.modal-overlay');
            this.modal = this.overlay.querySelector('.modal');
        }
    }

    /**
     * 
     * @private
     */
    createModalStructure() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        this.overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button class="modal-close" aria-label="Close modal">&times;</button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer"></div>
      </div>
    `;
        document.body.appendChild(this.overlay);
        this.modal = this.overlay.querySelector('.modal');
    }

    /**
     
     * @private
     */
    attachEventListeners() {
        
        const closeBtn = this.overlay.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.close());

        
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        
        this.modal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    /**
     * 
     * @param {string} title 
     * @param {string|HTMLElement} content 
     * @param {string|HTMLElement} footer 
     */
    open(title, content, footer = '') {
        const titleElement = this.overlay.querySelector('.modal-title');
        const bodyElement = this.overlay.querySelector('.modal-body');
        const footerElement = this.overlay.querySelector('.modal-footer');

        
        titleElement.textContent = title;

        
        if (typeof content === 'string') {
            bodyElement.innerHTML = content;
        } else {
            bodyElement.innerHTML = '';
            bodyElement.appendChild(content);
        }

        
        if (footer) {
            footerElement.style.display = 'flex';
            if (typeof footer === 'string') {
                footerElement.innerHTML = footer;
            } else {
                footerElement.innerHTML = '';
                footerElement.appendChild(footer);
            }
        } else {
            footerElement.style.display = 'none';
        }

        
        this.overlay.classList.add('active');
        this.isOpen = true;

        
        document.body.style.overflow = 'hidden';
    }

     /**
     * 
     */
    close() {
        this.overlay.classList.remove('active');
        this.isOpen = false;

        
        document.body.style.overflow = '';
    }

    /**
     
     * @param {string} title 
     * @param {string} message 
     * @param {Function} onConfirm 
     * @param {Function} onCancel 
     */
    confirm(title, message, onConfirm, onCancel = null) {
        const content = `<p style="font-size: 1rem; color: #4b5563; line-height: 1.6;">${message}</p>`;

        const footer = document.createElement('div');
        footer.style.display = 'flex';
        footer.style.gap = '1rem';
        footer.style.justifyContent = 'flex-end';

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'btn btn-secondary';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = () => {
            this.close();
            if (onCancel) onCancel();
        };
        
        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'btn btn-primary';
        confirmBtn.textContent = 'Confirm';
        confirmBtn.onclick = () => {
            this.close();
            if (onConfirm) onConfirm();
        };

        footer.appendChild(cancelBtn);
        footer.appendChild(confirmBtn);

        this.open(title, content, footer);
    }
     


     /**
     
     * @param {string} title 
     * @param {string} message 
     * @param {Function} onClose 
     */
    alert(title, message, onClose = null) {
        const content = `<p style="font-size: 1rem; color: #4b5563; line-height: 1.6;">${message}</p>`;

        const footer = document.createElement('div');
        footer.style.display = 'flex';
        footer.style.justifyContent = 'flex-end';

        const okBtn = document.createElement('button');
        okBtn.className = 'btn btn-primary';
        okBtn.textContent = 'OK';
        okBtn.onclick = () => {
            this.close();
            if (onClose) onClose();
        };

        footer.appendChild(okBtn);

        this.open(title, content, footer);
    }
    
    
}


const modalManager = new ModalManager();

/**
 
 */
function openModal(title, content, footer = '') {
    modalManager.open(title, content, footer);
}

function closeModal() {
    modalManager.close();
}

function confirmModal(title, message, onConfirm, onCancel = null) {
    modalManager.confirm(title, message, onConfirm, onCancel);
}

function alertModal(title, message, onClose = null) {
    modalManager.alert(title, message, onClose);
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModalManager, openModal, closeModal, confirmModal, alertModal };
}

