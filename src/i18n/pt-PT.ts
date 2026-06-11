// ============================================================
// i18n – Português (Portugal)
// ============================================================

import type { Translations } from './types.js';

export const ptPT: Translations = {
  intro: {
    imgAlt: 'Convite da Despedida da Sophie',
    titlePre: 'Despedida da',
    titleName: 'Sophie',
    subtitle: '18 de Abril · Um dia só teu 💚',
    description: 'Resolve os enigmas e descobre os segredos do dia mais especial…',
    startAriaLabel: 'Iniciar o jogo',
    startBtn: 'Iniciar a Aventura ✨',
  },

  progress: {
    completedMark: '✓',
    starsAriaLabel: (stars) => `${stars} estrelas`,
    riddlesTrackAriaLabel: 'Progresso dos enigmas',
    riddlePipAriaLabel: (n, done) => `Enigma ${n}${done ? ' completo' : ''}`,
  },

  riddle: {
    counter: (current, total) => `Enigma ${current} de ${total}`,
    inputPlaceholder: 'A tua resposta…',
    inputAriaLabel: (n) => `Resposta ao enigma ${n}`,
    submitAriaLabel: 'Submeter resposta',
    submitBtn: 'Responder',
    hintAriaLabel: 'Pedir uma dica (custa 1 estrela)',
    hintBtn: '💡 Dica',
    hintCost: '(−1 ⭐)',
    hintTextPrefix: '💡',
    errorFeedback: '❌ Resposta incorrecta. Tenta outra vez!',
  },

  venueReveal: {
    imgAlt: 'Local do desafio',
    nextHint: 'O próximo desafio espera por ti…',
    nextAriaLabel: 'Ir para o próximo desafio',
    nextBtn: 'Próximo Desafio →',
    finHint: 'Foi uma aventura incrível! Vê a tua pontuação final…',
    finAriaLabel: 'Ver pontuação final',
    finBtn: 'Ver Pontuação 🎉',
  },

  fim: {
    confettiEmoji: '🎉',
    title: 'Parabéns, Sophie!',
    subtitle:
      'Descobriste todos os segredos da tua despedida de solteira.<br>' +
      'O dia foi pensado com todo o amor, para ti. 💚',
    scoreLabel: 'Pontuação final',
    scoreValue: (stars, max) => `${stars} / ${max} ⭐`,
    message: 'Com amor,<br><em>As tuas besties 💕</em>',
    resetAriaLabel: 'Recomeçar o jogo',
    resetBtn: '↺ Recomeçar',
  },

  confirm: {
    resetHeader: 'Tens a certeza de que queres apagar todo o progresso e recomeçar?',
    resetFim: 'Tens a certeza de que queres recomeçar? Todo o progresso será apagado.',
    okBtn: 'Sim, recomeçar',
    cancelBtn: 'Cancelar',
  },
};
