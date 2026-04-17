// ============================================================
// Entry point – bootstraps the Despedida da Sophie game
// ============================================================

import { GameEngine } from './game/engine.js';
import { GameState } from './game/gameState.js';
import { t } from './i18n/index.js';
import { showConfirm } from './ui/confirm.js';
import { HelpModal } from './ui/help.js';
import { ScreenManager } from './ui/screen.js';
import { ThemeManager } from './ui/theme.js';

function main(): void {
    const gameState = new GameState();
    const engine = new GameEngine(gameState);
    const screen = new ScreenManager(gameState, engine);
    new ThemeManager(gameState);
    new HelpModal();

    // Mobile menu toggle
    const menuToggle = document.getElementById('header-menu-toggle');
    const menuOverlay = document.getElementById('header-menu-overlay');
    const menuSidebar = document.getElementById('header-menu-sidebar');

    const toggleMenu = () => {
        const isOpen = menuToggle?.classList.toggle('is-open');
        menuOverlay?.classList.toggle('is-open');
        menuSidebar?.classList.toggle('is-open');
        menuToggle?.setAttribute('aria-expanded', String(isOpen));
    };

    menuToggle?.addEventListener('click', toggleMenu);
    menuOverlay?.addEventListener('click', toggleMenu);

    // Mobile menu button listeners
    const helpBtnMobile = document.getElementById('help-btn-mobile');
    const resetBtnMobile = document.getElementById('reset-btn-mobile');

    helpBtnMobile?.addEventListener('click', () => {
        document.getElementById('help-btn')?.click();
        toggleMenu();
    });

    resetBtnMobile?.addEventListener('click', () => {
        toggleMenu();
        void showConfirm(t.confirm.resetHeader).then((ok) => {
            if (ok) {
                gameState.reset();
                screen.render();
            }
        });
    });

    // Persistent reset button (always visible in header)
    const resetBtn = document.getElementById('reset-btn-header');
    resetBtn?.addEventListener('click', () => {
        void showConfirm(t.confirm.resetHeader).then((ok) => {
            if (ok) {
                gameState.reset();
                screen.render();
            }
        });
    });

    screen.render();
}

// Bootstrap after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}
