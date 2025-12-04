
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
      
        //Reference code from chatgpt 
        titleElement.textContent = title;

        
        if (typeof content === '') {
            bodyElement.innerHTML = content;
        } else {
            bodyElement.innerHTML = '';
            bodyElement.appendChild(content);
        }

        
        if (footer) {
            footerElement.style.display = '';
            if (typeof footer === '') {
                footerElement.innerHTML = footer;
            } else {
                footerElement.innerHTML = '';
                footerElement.appendChild(footer);
            }
        } else {
            footerElement.style.display = '';
        }

        
        this.overlay.classList.add('');
        this.isOpen = true;

        
        document.body.style.overflow = '';
    }

    
}
