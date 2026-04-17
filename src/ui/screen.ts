// ============================================================
// Screen manager – renders all game screens / stages
// ============================================================

import { GameState } from '../game/gameState.js';
import { GameEngine, AnswerResult } from '../game/engine.js';
import { STAGES, getStageById } from '../game/riddles.js';
import { StageId } from '../types/index.js';
import { launchConfetti, shakeElement, pulseElement } from './animations.js';

export class ScreenManager {
  private gameState: GameState;
  private engine: GameEngine;
  private root: HTMLElement;

  constructor(gameState: GameState, engine: GameEngine, rootId = 'game-root') {
    this.gameState = gameState;
    this.engine = engine;
    const root = document.getElementById(rootId);
    if (!root) throw new Error(`#${rootId} not found`);
    this.root = root;
  }

  render(): void {
    const current = this.gameState.currentStage;
    if (current === StageId.Fim || this.gameState.allStagesCompleted) {
      this.renderFim();
    } else {
      this.renderStage(current);
    }
    this.renderProgress();
  }

  // ── Progress bar ──────────────────────────────────────────

  private renderProgress(): void {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;
    bar.innerHTML = '';
    STAGES.forEach((stage) => {
      const dot = document.createElement('div');
      dot.className = 'progress-dot';
      dot.setAttribute('aria-label', stage.label);
      const completed = this.gameState.isStageCompleted(stage.id);
      const isCurrent = this.gameState.currentStage === stage.id && !this.gameState.allStagesCompleted;
      dot.classList.toggle('completed', completed);
      dot.classList.toggle('current', isCurrent);
      dot.textContent = completed ? '✓' : stage.icon;
      bar.appendChild(dot);
    });
  }

  // ── Stage screen ──────────────────────────────────────────

  private renderStage(stageId: StageId): void {
    const stage = getStageById(stageId);
    if (!stage) return;

    const progress = this.gameState.getStageProgress(stageId);
    const riddleIdx = this.engine.currentRiddleIndex(stageId);
    const totalRiddles = stage.riddles.length;
    const allDone = riddleIdx >= totalRiddles;

    this.root.innerHTML = `
      <div class="stage-card fade-in" id="stage-card" role="main">
        <div class="stage-header">
          <span class="stage-icon">${stage.icon}</span>
          <div class="stage-meta">
            <h2 class="stage-label">${stage.label}</h2>
            <span class="stage-time">${stage.timeContext}</span>
          </div>
          <div class="stage-stars" aria-label="${progress.stars} estrelas">${'⭐'.repeat(progress.stars)}</div>
        </div>

        <p class="stage-description">${stage.description}</p>

        <div class="riddle-progress-track" aria-label="Progresso dos enigmas">
          ${stage.riddles.map((_, i) => `
            <div class="riddle-pip ${i < riddleIdx ? 'done' : i === riddleIdx ? 'active' : ''}"
                 aria-label="Enigma ${i + 1} ${i < riddleIdx ? 'completo' : ''}"></div>
          `).join('')}
        </div>

        ${allDone
          ? this.renderVenueReveal(stage.venueReveal, stageId)
          : this.renderRiddle(stageId, riddleIdx)}
      </div>
    `;

    if (!allDone) {
      this.bindRiddleForm(stageId, stage.riddles[riddleIdx].id);
    }
  }

  private renderRiddle(stageId: StageId, riddleIdx: number): string {
    const stage = getStageById(stageId);
    if (!stage) return '';
    const riddle = stage.riddles[riddleIdx];
    const riddleNum = riddleIdx + 1;
    const totalRiddles = stage.riddles.length;

    const questionHtml = riddle.question
      .split('\n')
      .map((line) => `<span>${line}</span>`)
      .join('<br>');

    return `
      <div class="riddle-card" id="riddle-card">
        <div class="riddle-number">Enigma ${riddleNum} de ${totalRiddles === 3 ? 'três' : totalRiddles}</div>
        <p class="riddle-question" id="riddle-question">${questionHtml}</p>

        <form class="riddle-form" id="riddle-form" autocomplete="off" novalidate>
          <div class="input-wrapper">
            <input
              type="text"
              id="riddle-input"
              class="riddle-input"
              placeholder="A tua resposta..."
              aria-label="Resposta ao enigma ${riddleNum}"
              required
              autocomplete="off"
              spellcheck="false"
            />
            <button type="submit" class="btn btn-primary" id="submit-btn" aria-label="Submeter resposta">
              Responder
            </button>
          </div>
          <div class="riddle-feedback" id="riddle-feedback" aria-live="polite"></div>
        </form>

        <button class="btn btn-hint" id="hint-btn-riddle" aria-label="Pedir uma dica (custa 1 estrela)">
          💡 Dica <span class="hint-cost">(−1 ⭐)</span>
        </button>
        <div class="hint-text" id="hint-text" aria-live="polite" hidden></div>
      </div>
    `;
  }

  private renderVenueReveal(revealText: string, stageId: StageId): string {
    const nextStageId = stageId + 1;
    const hasNext = nextStageId <= StageId.Karaoke;
    const nextStage = hasNext ? getStageById(nextStageId as StageId) : null;

    return `
      <div class="venue-reveal fade-in" id="venue-reveal">
        <div class="venue-reveal-icon">✨</div>
        <p class="venue-reveal-text">${revealText}</p>
        ${hasNext && nextStage ? `
          <div class="next-stage-hint">
            <p>O próximo desafio espera por ti...</p>
            <button class="btn btn-primary btn-next" id="next-stage-btn" aria-label="Ir para o próximo desafio">
              Próximo Desafio ${nextStage.icon}
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  // ── Fim screen ────────────────────────────────────────────

  private renderFim(): void {
    const totalStars = this.gameState.getTotalStars();
    const maxStars = STAGES.length * 3;

    this.root.innerHTML = `
      <div class="fim-card fade-in" id="fim-card" role="main">
        <div class="fim-confetti-text">🎉</div>
        <h2 class="fim-title">Parabéns, Sophie!</h2>
        <p class="fim-subtitle">Descobriste todos os segredos da tua despedida de solteira.<br>
        O dia foi pensado com todo o amor, para ti. 💚</p>

        <div class="fim-summary">
          <div class="fim-stars">
            <span class="fim-stars-label">Pontuação final</span>
            <span class="fim-stars-value">${totalStars} / ${maxStars} ⭐</span>
          </div>
          <div class="stage-recap-list">
            ${STAGES.map((stage) => {
              const p = this.gameState.getStageProgress(stage.id);
              return `
                <div class="stage-recap-item">
                  <span class="stage-recap-icon">${stage.icon}</span>
                  <span class="stage-recap-name">${stage.venueName}</span>
                  <span class="stage-recap-stars">${'⭐'.repeat(p.stars)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <p class="fim-message">Com amor,<br><em>As tuas besties 💕</em></p>

        <button class="btn btn-outline btn-reset" id="reset-btn" aria-label="Recomeçar o jogo">
          ↺ Recomeçar
        </button>
      </div>
    `;

    launchConfetti(5000);
    this.bindFimActions();
  }

  // ── Event bindings ────────────────────────────────────────

  private bindRiddleForm(stageId: StageId, riddleId: number): void {
    const form = document.getElementById('riddle-form') as HTMLFormElement | null;
    const input = document.getElementById('riddle-input') as HTMLInputElement | null;
    const feedback = document.getElementById('riddle-feedback');
    const hintBtn = document.getElementById('hint-btn-riddle') as HTMLButtonElement | null;
    const hintText = document.getElementById('hint-text');
    const nextStageBtn = document.getElementById('next-stage-btn');

    if (nextStageBtn) {
      nextStageBtn.addEventListener('click', () => this.render());
    }

    if (!form || !input || !feedback) return;

    // Auto-focus the input
    setTimeout(() => input.focus(), 100);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const answer = input.value.trim();
      if (!answer) return;

      const result: AnswerResult = this.engine.checkAnswer(stageId, riddleId, answer);

      if (result.correct) {
        feedback.textContent = '';
        feedback.className = 'riddle-feedback';

        if (result.stageComplete) {
          launchConfetti(4000);
          this.render();
        } else {
          // Show brief success then advance to next riddle
          const riddleCard = document.getElementById('riddle-card');
          if (riddleCard) pulseElement(riddleCard);
          setTimeout(() => this.renderStage(stageId), 600);
        }
      } else {
        feedback.textContent = '❌ Resposta incorrecta. Tenta outra vez!';
        feedback.className = 'riddle-feedback error';
        const inputWrapper = input.parentElement;
        if (inputWrapper) shakeElement(inputWrapper);
        input.select();
      }
    });

    hintBtn?.addEventListener('click', () => {
      if (!hintText) return;
      const hint = this.engine.useHint(stageId);
      if (hint) {
        hintText.textContent = `💡 ${hint}`;
        hintText.hidden = false;
        hintBtn.disabled = true;
        // Update stars display
        const starsEl = this.root.querySelector('.stage-stars');
        const stars = this.gameState.getStars(stageId);
        if (starsEl) starsEl.textContent = '⭐'.repeat(stars);
      }
    });
  }

  private bindFimActions(): void {
    const resetBtn = document.getElementById('reset-btn');
    resetBtn?.addEventListener('click', () => {
      if (confirm('Tens a certeza que queres recomeçar? Todo o progresso será apagado.')) {
        this.gameState.reset();
        this.render();
      }
    });
  }
}
