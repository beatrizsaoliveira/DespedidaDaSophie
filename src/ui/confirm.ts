// ============================================================
// Custom confirm dialog – replaces window.confirm()
// ============================================================

/**
 * Shows a modal confirmation dialog. Returns a Promise that resolves
 * to `true` if the user confirmed, `false` if they cancelled.
 */
export function showConfirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirm-modal');
        const overlay = document.getElementById('modal-overlay');
        const msgEl = document.getElementById('confirm-modal-message');
        const okBtn = document.getElementById('confirm-ok-btn');
        const cancelBtn = document.getElementById('confirm-cancel-btn');

        if (!modal || !overlay || !msgEl || !okBtn || !cancelBtn) {
            // Fallback to browser confirm if elements are missing
            resolve(globalThis.confirm(message));
            return;
        }

        msgEl.textContent = message;

        const close = (result: boolean) => {
            modal.classList.remove('is-open');
            overlay.classList.remove('is-open');
            document.body.style.overflow = '';
            okBtn.removeEventListener('click', onOk);
            cancelBtn.removeEventListener('click', onCancel);
            document.removeEventListener('keydown', onKey);
            resolve(result);
        };

        const onOk = () => close(true);
        const onCancel = () => close(false);
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close(false);
            if (e.key === 'Enter') close(true);
        };

        okBtn.addEventListener('click', onOk);
        cancelBtn.addEventListener('click', onCancel);
        document.addEventListener('keydown', onKey);

        // Lock body scroll (prevents background scroll on iOS while modal is open)
        document.body.style.overflow = 'hidden';
        modal.classList.add('is-open');
        overlay.classList.add('is-open');

        // Focus the cancel button by default (safer default)
        setTimeout(() => (cancelBtn as HTMLButtonElement).focus(), 50);
    });
}
