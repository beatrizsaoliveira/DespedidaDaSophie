// ============================================================
// Entry point – bootstraps the Despedida da Sophie game
// ============================================================

import { GameState } from './game/gameState.js';
import { GameEngine } from './game/engine.js';
import { ThemeManager } from './ui/theme.js';
import { HelpModal } from './ui/help.js';
import { ScreenManager } from './ui/screen.js';

function main(): void {
  const gameState = new GameState();
  const engine = new GameEngine(gameState);
  const screen = new ScreenManager(gameState, engine);
  new ThemeManager(gameState);

  const handleReset = (): void => {
    gameState.reset();
    screen.render();
  };

  new HelpModal('help-btn', 'help-modal', 'modal-overlay', handleReset);

  screen.render();
}

// Bootstrap after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
