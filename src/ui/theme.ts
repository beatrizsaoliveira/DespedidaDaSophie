// ============================================================
// Theme manager – light/dark mode toggle with persistence
// ============================================================

import { GameState } from '../game/gameState.js';
import { Theme } from '../types/index.js';

export class ThemeManager {
  private gameState: GameState;
  private toggleBtns: HTMLElement[];

  constructor(gameState: GameState, toggleBtnIds = ['theme-toggle', 'theme-toggle-mobile']) {
    this.gameState = gameState;
    this.toggleBtns = toggleBtnIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (this.toggleBtns.length === 0) throw new Error('No theme toggle buttons found');
    this.apply(gameState.theme);
    this.toggleBtns.forEach((btn) => btn.addEventListener('click', () => this.toggle()));
  }

  private apply(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    const label = theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro';
    const icon =
      theme === 'dark' ?
        '<span class="theme-icon">☀️</span>'
      : '<span class="theme-icon">🌙</span>';
    this.toggleBtns.forEach((btn) => {
      btn.setAttribute('aria-label', label);
      btn.innerHTML = icon;
    });
  }

  toggle(): void {
    const newTheme: Theme = this.gameState.theme === 'dark' ? 'light' : 'dark';
    this.gameState.setTheme(newTheme);
    this.apply(newTheme);
  }
}
