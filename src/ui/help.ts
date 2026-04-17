// ============================================================
// Help modal – game wiki / instructions
// ============================================================

export class HelpModal {
  private modal: HTMLElement;
  private overlay: HTMLElement;

  constructor(openBtnId = 'help-btn', modalId = 'help-modal', overlayId = 'modal-overlay') {
    const openBtn = document.getElementById(openBtnId);
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById(overlayId);
    if (!openBtn || !modal || !overlay) {
      throw new Error('Help modal elements not found in DOM');
    }
    this.modal = modal;
    this.overlay = overlay;

    openBtn.addEventListener('click', () => this.open());
    overlay.addEventListener('click', () => this.close());

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn?.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open(): void {
    this.modal.classList.add('is-open');
    this.overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.modal.classList.remove('is-open');
    this.overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}
