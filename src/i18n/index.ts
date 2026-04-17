// ============================================================
// i18n – Active locale
// To add a new language: implement Translations in a new file
// and swap the import below.
// ============================================================

import { ptPT } from './pt-PT.js';
import type { Translations } from './types.js';

export type { Translations };

/** The active translation object used throughout the app. */
export const t: Translations = ptPT;
