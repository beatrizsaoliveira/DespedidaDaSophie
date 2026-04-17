// ============================================================
// Theme manager – light/dark mode toggle with persistence
// ============================================================

import { GameState } from '../game/gameState.js';
import { Theme } from '../types/index.js';

export class ThemeManager {
  private gameState: GameState;
  private toggleBtn: HTMLElement;

  constructor(gameState: GameState, toggleBtnId = 'theme-toggle') {
    this.gameState = gameState;
    const btn = document.getElementById(toggleBtnId);
    if (!btn) throw new Error(`Theme toggle button #${toggleBtnId} not found`);
    this.toggleBtn = btn;
    this.apply(gameState.theme);
    this.toggleBtn.addEventListener('click', () => this.toggle());
  }

  private apply(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    this.toggleBtn.setAttribute('aria-label',
      theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro');
    this.toggleBtn.innerHTML = theme === 'dark'
      ? '<span class="theme-icon">☀️</span>'
      : '<span class="theme-icon">🌙</span>';
  }

  toggle(): void {
    const newTheme: Theme = this.gameState.theme === 'dark' ? 'light' : 'dark';
    this.gameState.setTheme(newTheme);
    this.apply(newTheme);
  }
}
