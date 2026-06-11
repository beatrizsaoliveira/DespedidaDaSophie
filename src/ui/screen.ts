// ============================================================
// Screen manager – renders all game screens / stages
// ============================================================

import { AnswerResult, GameEngine } from '../game/engine.js';
import { GameState } from '../game/gameState.js';
import { STAGES, getStageById } from '../game/riddles.js';
import { t } from '../i18n/index.js';
import { StageId } from '../types/index.js';
import { launchConfetti, pulseElement, shakeElement } from './animations.js';
import { showConfirm } from './confirm.js';

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
    if (!this.gameState.hasStarted) {
      this.renderIntro();
      this.hideProgress();
      return;
    }
    const current = this.gameState.currentStage;
    if (current === StageId.Fim || this.gameState.allStagesCompleted) {
      this.renderFim();
    } else {
      this.renderStage(current);
    }
    this.renderProgress();
  }

  private hideProgress(): void {
    const bar = document.getElementById('progress-bar');
    if (bar) bar.innerHTML = '';
  }

  // ── Intro screen ──────────────────────────────────────────

  private renderIntro(): void {
    this.root.innerHTML = `
      <div class="intro-card fade-in" id="intro-card" role="main">
        <div class="intro-image-wrap">
          <img
            src="images/start.jpg"
            alt="${t.intro.imgAlt}"
            class="intro-image"
            draggable="false"
          />
        </div>
        <div class="intro-body">
          <h2 class="intro-title">
            <span class="intro-title-pre">${t.intro.titlePre}</span>
            <span class="intro-title-name">${t.intro.titleName}</span>
          </h2>
          <p class="intro-subtitle">${t.intro.subtitle}</p>
          <p class="intro-desc">${t.intro.description}</p>
          <button class="btn btn-primary btn-start" id="start-btn" aria-label="${t.intro.startAriaLabel}">
            ${t.intro.startBtn}
          </button>
        </div>
      </div>
    `;
    const startBtn = document.getElementById('start-btn');
    startBtn?.addEventListener('click', () => {
      this.gameState.startGame();
      this.render();
    });
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
      const isCurrent =
        this.gameState.currentStage === stage.id && !this.gameState.allStagesCompleted;
      dot.classList.toggle('completed', completed);
      dot.classList.toggle('current', isCurrent);
      dot.textContent = completed ? t.progress.completedMark : stage.icon;
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
          <div class="stage-stars" aria-label="${t.progress.starsAriaLabel(progress.stars)}">${'⭐'.repeat(progress.stars)}</div>
        </div>

        <p class="stage-description">${stage.description}</p>

        <div class="riddle-progress-track" aria-label="${t.progress.riddlesTrackAriaLabel}">
          ${stage.riddles
            .map(
              (_, i) => `
            <div class="riddle-pip ${
              i < riddleIdx ? 'done'
              : i === riddleIdx ? 'active'
              : ''
            }"
                 aria-label="${t.progress.riddlePipAriaLabel(i + 1, i < riddleIdx)}"></div>
          `,
            )
            .join('')}
        </div>

        ${
          allDone ?
            this.renderVenueReveal(stage.venueReveal, stageId)
          : this.renderRiddle(stageId, riddleIdx)
        }
      </div>
    `;

    if (!allDone) {
      this.bindRiddleForm(stageId, stage.riddles[riddleIdx].id);
    } else {
      this.bindVenueActions();
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
        <div class="riddle-number">${t.riddle.counter(riddleNum, totalRiddles)}</div>
        <p class="riddle-question" id="riddle-question">${questionHtml}</p>

        <form class="riddle-form" id="riddle-form" autocomplete="off" novalidate>
          <div class="input-wrapper">
            <input
              type="text"
              id="riddle-input"
              class="riddle-input"
              placeholder="${t.riddle.inputPlaceholder}"
              aria-label="${t.riddle.inputAriaLabel(riddleNum)}"
              required
              autocomplete="off"
              spellcheck="false"
            />
            <button type="submit" class="btn btn-primary" id="submit-btn" aria-label="${t.riddle.submitAriaLabel}" disabled>
              ${t.riddle.submitBtn}
            </button>
          </div>
          <div class="riddle-feedback" id="riddle-feedback" aria-live="polite"></div>
        </form>

        <button class="btn btn-hint" id="hint-btn-riddle" aria-label="${t.riddle.hintAriaLabel}">
          ${t.riddle.hintBtn} <span class="hint-cost">${t.riddle.hintCost}</span>
        </button>
        <div class="hint-text" id="hint-text" aria-live="polite" hidden></div>
      </div>
    `;
  }

  private renderVenueReveal(revealText: string, stageId: StageId): string {
    const nextStageId = stageId + 1;
    const hasNext = nextStageId <= StageId.Karaoke;
    const stage = getStageById(stageId);
    const venueImg = stage?.venueImage ?? '';
    const venueMsg = stage?.venueMessage ?? '';

    return `
      <div class="venue-reveal fade-in" id="venue-reveal">
        <div class="venue-reveal-icon">✨</div>
        <p class="venue-reveal-text">${revealText}</p>
        ${
          venueImg ?
            `
          <div class="venue-image-wrap reveal-pop">
            <img src="${venueImg}" alt="${t.venueReveal.imgAlt}" class="venue-image" draggable="false" />
          </div>
        `
          : ''
        }
        ${
          venueMsg ?
            `
          <p class="venue-message">${venueMsg}</p>
        `
          : ''
        }
        <div class="next-stage-hint">
          <p>${hasNext ? t.venueReveal.nextHint : t.venueReveal.finHint}</p>
          <button class="btn btn-primary btn-next" id="next-stage-btn"
                  aria-label="${hasNext ? t.venueReveal.nextAriaLabel : t.venueReveal.finAriaLabel}">
            ${hasNext ? t.venueReveal.nextBtn : t.venueReveal.finBtn}
          </button>
        </div>
      </div>
    `;
  }

  private bindVenueActions(): void {
    const nextBtn = document.getElementById('next-stage-btn');
    nextBtn?.addEventListener('click', () => this.render());
  }

  // ── Fim screen ────────────────────────────────────────────

  private renderFim(): void {
    const totalStars = this.gameState.getTotalStars();
    const maxStars = STAGES.length * 3;

    this.root.innerHTML = `
      <div class="fim-card fade-in" id="fim-card" role="main">
        <div class="fim-confetti-text">${t.fim.confettiEmoji}</div>
        <h2 class="fim-title">${t.fim.title}</h2>
        <p class="fim-subtitle">${t.fim.subtitle}</p>

        <div class="fim-summary">
          <div class="fim-stars">
            <span class="fim-stars-label">${t.fim.scoreLabel}</span>
            <span class="fim-stars-value">${t.fim.scoreValue(totalStars, maxStars)}</span>
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

        <p class="fim-message">${t.fim.message}</p>

        <button class="btn btn-outline btn-reset" id="reset-btn" aria-label="${t.fim.resetAriaLabel}">
          ${t.fim.resetBtn}
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

    if (!form || !input || !feedback) return;

    const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement | null;

    // Auto-focus only on non-touch devices (prevents keyboard popup on mobile)
    if (!window.matchMedia('(hover: none)').matches) {
      setTimeout(() => input.focus(), 100);
    }

    // Convert answer to lowercase as the user types; update submit button state
    input.addEventListener('input', () => {
      const pos = input.selectionStart ?? input.value.length;
      input.value = input.value.toLowerCase();
      input.setSelectionRange(pos, pos);
      if (submitBtn) submitBtn.disabled = input.value.trim().length === 0;
    });

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
          // Render the venue reveal for THIS stage before advancing
          this.renderStage(stageId);
        } else {
          // Show brief success then advance to next riddle
          const riddleCard = document.getElementById('riddle-card');
          if (riddleCard) pulseElement(riddleCard);
          setTimeout(() => this.renderStage(stageId), 600);
        }
      } else {
        feedback.textContent = t.riddle.errorFeedback;
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
        hintText.textContent = `${t.riddle.hintTextPrefix} ${hint}`;
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
      void showConfirm(t.confirm.resetFim).then((ok) => {
        if (ok) {
          this.gameState.reset();
          this.render();
        }
      });
    });
  }
}
