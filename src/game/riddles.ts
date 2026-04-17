// ============================================================
// All riddle & stage data – Portuguese (Portugal)
// ============================================================

import { Stage, StageId } from '../types/index.js';

export const STAGES: Stage[] = [
  // ────────────────────────────────────────────────────────
  // STAGE 1 – SPA (morning · bride + 2 bridesmaids)
  // ────────────────────────────────────────────────────────
  {
    id: StageId.Spa,
    label: 'Desafio I',
    icon: '🌿',
    timeContext: 'Manhã · Só vós três',
    teaser: 'O primeiro segredo da manhã aguarda por ti... Resolve os enigmas e descobre onde começa a aventura.',
    description: 'O dia começa com calma, carinho e as pessoas certas. São apenas três — a noiva e as suas madrinhas. Um momento só vosso, antes de tudo o resto.',
    venueName: 'EcoMassage',
    venueReveal: '🌿 EcoMassage — o vosso refúgio de manhã. Deixa-te cuidar, Sophie. O dia é teu.',
    riddles: [
      {
        id: 1,
        question: 'São apenas três, no silêncio da manhã que chega.\nSem pressa, sem barulho — só carinho e atenção.\nO dia começa com a promessa de cuidar, de dentro para fora, com toda a dedicação.\n\nO que procuram estas três num único lugar?',
        answer: 'bem-estar',
        hint: 'Pensa no que se sente depois de uma boa massagem e de um momento de paz completa.',
      },
      {
        id: 2,
        question: 'A natureza entra pela porta em óleos, ervas e flores do campo.\nMãos sábias conhecem cada tensão do corpo, cada ponto.\nEntre aromas que curam e silêncio compassado —\n\nComo se chama esta arte de aliviar o que foi guardado?',
        answer: 'massagem',
        hint: 'É feita com as mãos, alivia tensões e usa óleos essenciais.',
      },
      {
        id: 3,
        question: 'Junta o eco do verde à arte de restaurar.\n\'Eco\' no nome, natureza no toque — aqui Sophie vai florescer sem parar.\n\nQual o nome deste refúgio onde o vosso dia vai começar?',
        answer: 'ecomassage',
        hint: 'O nome tem duas partes: uma palavra inglesa ligada à ecologia, e uma palavra portuguesa sobre o toque terapêutico.',
      },
    ],
  },

  // ────────────────────────────────────────────────────────
  // STAGE 2 – BARCO (afternoon · friends + bridesmaids · Tejo)
  // ────────────────────────────────────────────────────────
  {
    id: StageId.Barco,
    label: 'Desafio II',
    icon: '⛵',
    timeContext: 'Tarde · Com todas as amigas',
    teaser: 'O segundo segredo esconde-se onde Lisboa se encontra com a imensidão... Resolve os enigmas.',
    description: 'A tarde chega e o grupo cresce. As amigas juntam-se e a aventura também. Não há chão sólido — só movimento, brisa e horizonte.',
    venueName: 'Sailing Lovers',
    venueReveal: '⛵ Sailing Lovers — um passeio pelo Rio Tejo que nunca vais esquecer. Vento no cabelo, amigas ao lado, Lisboa ao longe.',
    riddles: [
      {
        id: 1,
        question: 'À tarde, o grupo cresce e a aventura também.\nNão há chão sólido — só movimento, brisa e horizonte.\nLisboa fica para trás enquanto vocês seguem em frente.\n\nQue elemento vos abraça, suave e corrente?',
        answer: 'água',
        hint: 'É o elemento em que navegamos. Preenche os rios, os lagos e os mares.',
      },
      {
        id: 2,
        question: 'Ele já viu caravelas partir para o desconhecido.\nTestemunha silencioso de toda a história deste povo.\nNasce longe e entrega-se ao mar com orgulho tão vívido.\n\nQual o nome deste rio que vai ser o vosso palco novo?',
        answer: 'tejo',
        hint: 'É o rio mais longo da Península Ibérica e atravessa Lisboa antes de se juntar ao oceano.',
      },
      {
        id: 3,
        question: 'Amantes do mar, do vento e da vela — paixão no nome e no ofício.\nQue empresa vos leva pelo Tejo numa tarde de maravilha, com arte e com capricho?',
        answer: 'sailing lovers',
        hint: 'O nome está em inglês. Traduz para \'amantes da vela\' — e descreve exatamente o que vos espera.',
      },
    ],
  },

  // ────────────────────────────────────────────────────────
  // STAGE 3 – KARAOKÊ (night · friends + bridesmaids · Golden Vista → bar)
  // ────────────────────────────────────────────────────────
  {
    id: StageId.Karaoke,
    label: 'Desafio III',
    icon: '🎤',
    timeContext: 'Noite · O grande finale',
    teaser: 'O terceiro e último segredo aguarda na escuridão da noite... Resolve os enigmas e brilha até ao fim.',
    description: 'A noite cai e Lisboa acende-se. É o último capítulo deste dia inesquecível — e o mais animado de todos.',
    venueName: 'Golden Vista',
    venueReveal: '🎤 Golden Vista — onde a noite começa. E depois? Um bar para encerrar a noite em grande! 🥂 As tuas amigas não te deixam parar de sorrir.',
    riddles: [
      {
        id: 1,
        question: 'A noite cai e Lisboa acende-se.\nO grupo reúne-se pela última vez neste dia tão especial.\nHá música no ar e alegria que não se contém.\n\nO que é este momento partilhado, luminoso e sentimental?',
        answer: 'festa',
        hint: 'É o que acontece quando amigas se juntam à noite para celebrar com muita alegria.',
      },
      {
        id: 2,
        question: 'A letra aparece no ecrã, a melodia envolve a sala.\nDesafinas? Não importa — o que conta é a gargalhada.\nComo se chama esta forma de cantar sem parar,\nonde cada voz é a estrela da noite encantada?',
        answer: 'karaoke',
        hint: 'É uma palavra de origem japonesa. Significa \'orquestra vazia\' — tu és quem canta por cima da música.',
      },
      {
        id: 3,
        question: 'Uma vista dourada sobre a noite que brilha —\ne depois um bar para fechar com chave de ouro.\nOnde começa este último capítulo,\ncom Sophie no centro, sem filtro?',
        answer: 'golden vista',
        hint: 'O nome tem duas palavras em inglês. Pensa numa cor preciosa e numa paisagem que se avista ao longe.',
      },
    ],
  },
];

export function getStageById(id: StageId): Stage | undefined {
  return STAGES.find((s) => s.id === id);
}
