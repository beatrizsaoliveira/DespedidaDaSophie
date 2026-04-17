// ============================================================
// Shared TypeScript types & enums for the Despedida da Sophie game
// ============================================================

export type Theme = 'light' | 'dark';

export const enum StageId {
  Intro = 0,
  Spa = 1,
  Barco = 2,
  Karaoke = 3,
  Fim = 4,
}

export interface Riddle {
  id: number;
  /** The riddle text shown to the player */
  question: string;
  /** Accepted answer – checked case & accent insensitive */
  answer: string;
  /** Optional hint text shown when hint button is pressed */
  hint: string;
}

export interface Stage {
  id: StageId;
  /** Short label for navigation  */
  label: string;
  /** Emoji icon */
  icon: string;
  /** Time of day context */
  timeContext: string;
  /** Teaser text shown while locked */
  teaser: string;
  /** Rich description shown when unlocked */
  description: string;
  /** Venue name revealed on completion */
  venueName: string;
  /** Venue reveal message */
  venueReveal: string;
  riddles: Riddle[];
}

export interface StageProgress {
  stageId: StageId;
  completed: boolean;
  riddlesCompleted: number[];
  hintsUsed: number;
  stars: number;
}

export interface SavedState {
  /** Schema version for future migrations */
  version: number;
  currentStage: StageId;
  stages: StageProgress[];
  theme: Theme;
  startedAt: string;
}
