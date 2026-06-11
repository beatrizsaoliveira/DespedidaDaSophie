// ============================================================
// Game engine – answer checking & stage advancement logic
// ============================================================

import { GameState } from './gameState.js';
import { getStageById } from './riddles.js';
import { StageId } from '../types/index.js';

/** Normalise an answer string for comparison */
function normalise(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD') // decompose accents
    .replace(/[\u0300-\u036f]/g, '') // strip accent marks
    .replace(/\s+/g, ' '); // collapse whitespace
}

export interface AnswerResult {
  correct: boolean;
  riddleComplete: boolean;
  stageComplete: boolean;
}

export class GameEngine {
  private gameState: GameState;

  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  /**
   * Check a player's answer for a given riddle.
   * Returns whether the answer was correct, whether the riddle is now complete,
   * and whether the whole stage is now complete.
   */
  checkAnswer(stageId: StageId, riddleId: number, playerAnswer: string): AnswerResult {
    const stage = getStageById(stageId);
    if (!stage)
      return {
        correct: false,
        riddleComplete: false,
        stageComplete: false,
      };

    const riddle = stage.riddles.find((r) => r.id === riddleId);
    if (!riddle)
      return {
        correct: false,
        riddleComplete: false,
        stageComplete: false,
      };

    const correct = normalise(playerAnswer) === normalise(riddle.answer);

    if (!correct)
      return {
        correct: false,
        riddleComplete: false,
        stageComplete: false,
      };

    // Mark riddle as completed
    this.gameState.markRiddleCompleted(stageId, riddleId);

    const progress = this.gameState.getStageProgress(stageId);
    const allRiddlesDone = stage.riddles.every((r) => progress.riddlesCompleted.includes(r.id));

    let stageComplete = false;
    if (allRiddlesDone && !this.gameState.isStageCompleted(stageId)) {
      this.gameState.markStageCompleted(stageId);
      stageComplete = true;
    }

    return { correct: true, riddleComplete: true, stageComplete };
  }

  /** Returns the riddle index the player is currently on (0-based) */
  currentRiddleIndex(stageId: StageId): number {
    const stage = getStageById(stageId);
    if (!stage) return 0;
    const progress = this.gameState.getStageProgress(stageId);
    for (let i = 0; i < stage.riddles.length; i++) {
      if (!progress.riddlesCompleted.includes(stage.riddles[i].id)) {
        return i;
      }
    }
    return stage.riddles.length; // all done
  }

  useHint(stageId: StageId): string | null {
    const stage = getStageById(stageId);
    if (!stage) return null;
    const idx = this.currentRiddleIndex(stageId);
    if (idx >= stage.riddles.length) return null;
    this.gameState.useHint(stageId);
    return stage.riddles[idx].hint;
  }
}
