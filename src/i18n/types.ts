// ============================================================
// i18n – Translation contract
// Add a new locale by implementing this interface.
// ============================================================

export interface Translations {
    intro: {
        imgAlt: string;
        titlePre: string;
        titleName: string;
        subtitle: string;
        description: string;
        startAriaLabel: string;
        startBtn: string;
    };
    progress: {
        completedMark: string;
        starsAriaLabel: (stars: number) => string;
        riddlesTrackAriaLabel: string;
        riddlePipAriaLabel: (n: number, done: boolean) => string;
    };
    riddle: {
        counter: (current: number, total: number) => string;
        inputPlaceholder: string;
        inputAriaLabel: (n: number) => string;
        submitAriaLabel: string;
        submitBtn: string;
        hintAriaLabel: string;
        hintBtn: string;
        hintCost: string;
        hintTextPrefix: string;
        errorFeedback: string;
    };
    venueReveal: {
        imgAlt: string;
        nextHint: string;
        nextAriaLabel: string;
        nextBtn: string;
        finHint: string;
        finAriaLabel: string;
        finBtn: string;
    };
    fim: {
        confettiEmoji: string;
        title: string;
        /** May contain safe HTML (e.g. <br>, <em>). Used inside innerHTML. */
        subtitle: string;
        scoreLabel: string;
        scoreValue: (stars: number, max: number) => string;
        /** May contain safe HTML. Used inside innerHTML. */
        message: string;
        resetAriaLabel: string;
        resetBtn: string;
    };
    confirm: {
        resetHeader: string;
        resetFim: string;
        okBtn: string;
        cancelBtn: string;
    };
}
