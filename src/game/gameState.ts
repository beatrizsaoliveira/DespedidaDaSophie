// ============================================================
// Game state manager – loads/saves to localStorage
// ============================================================

import { SavedState, StageId, StageProgress, Theme } from '../types/index.js';
import { STAGES } from './riddles.js';

const STORAGE_KEY = 'despedida_sophie_v1';
const SCHEMA_VERSION = 1;

function makeDefaultStageProgress(): StageProgress[] {
  return STAGES.map((stage) => ({
    stageId: stage.id,
    completed: false,
    riddlesCompleted: [],
    hintsUsed: 0,
    stars: 3,
  }));
}

function makeDefaultState(): SavedState {
  return {
    version: SCHEMA_VERSION,
    currentStage: StageId.Spa,
    stages: makeDefaultStageProgress(),
    theme: 'light',
    startedAt: new Date().toISOString(),
    hasStarted: false,
  };
}

export class GameState {
  private state: SavedState;

  constructor() {
    this.state = this.load();
  }

  private load(): SavedState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return makeDefaultState();
      const parsed = JSON.parse(raw) as SavedState;
      // Migrate if schema version is outdated
      if (parsed.version !== SCHEMA_VERSION) return makeDefaultState();
      return parsed;
    } catch {
      return makeDefaultState();
    }
  }

  save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // Storage may be unavailable (e.g. private mode)
    }
  }

  reset(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.state = makeDefaultState();
  }

  // ── Getters ───────────────────────────────────────────────

  get currentStage(): StageId {
    return this.state.currentStage;
  }

  get theme(): Theme {
    return this.state.theme;
  }
  get hasStarted(): boolean {
    return this.state.hasStarted;
  }
  get allStagesCompleted(): boolean {
    return this.state.stages.every((s) => s.completed);
  }

  getStageProgress(stageId: StageId): StageProgress {
    const progress = this.state.stages.find((s) => s.stageId === stageId);
    if (!progress) throw new Error(`Stage ${stageId} not found in state`);
    return progress;
  }

  isRiddleCompleted(stageId: StageId, riddleId: number): boolean {
    const progress = this.getStageProgress(stageId);
    return progress.riddlesCompleted.includes(riddleId);
  }

  isStageCompleted(stageId: StageId): boolean {
    return this.getStageProgress(stageId).completed;
  }

  getStars(stageId: StageId): number {
    return this.getStageProgress(stageId).stars;
  }

  // ── Mutations ─────────────────────────────────────────────

  markRiddleCompleted(stageId: StageId, riddleId: number): void {
    const progress = this.getStageProgress(stageId);
    if (!progress.riddlesCompleted.includes(riddleId)) {
      progress.riddlesCompleted.push(riddleId);
    }
    this.save();
  }

  useHint(stageId: StageId): void {
    const progress = this.getStageProgress(stageId);
    progress.hintsUsed += 1;
    // Each hint costs 1 star, minimum 0
    progress.stars = Math.max(0, progress.stars - 1);
    this.save();
  }

  markStageCompleted(stageId: StageId): void {
    const progress = this.getStageProgress(stageId);
    progress.completed = true;
    // Advance to next stage
    if (stageId < StageId.Karaoke) {
      this.state.currentStage = (stageId + 1) as StageId;
    } else {
      this.state.currentStage = StageId.Fim;
    }
    this.save();
  }

  setTheme(theme: Theme): void {
    this.state.theme = theme;
    this.save();
  }

  startGame(): void {
    this.state.hasStarted = true;
    this.save();
  }

  getTotalStars(): number {
    return this.state.stages.reduce((acc, s) => acc + s.stars, 0);
  }
}
