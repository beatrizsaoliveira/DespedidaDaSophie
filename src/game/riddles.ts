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
        icon: '🌤️',
        timeContext: 'Manhã · Só vós três',
        teaser: 'O primeiro segredo da manhã aguarda por ti... Resolve os enigmas e descobre onde começa a aventura.',
        description:
            'O dia começa com calma, carinho e as pessoas certas. São apenas três — a noiva e as suas madrinhas. Um momento só vosso, antes de tudo o resto.',
        venueName: 'EcoMassage',
        venueReveal:
            '🌿 EcoMassage — o vosso refúgio de manhã. Deixa-te cuidar, Sophie. O dia é teu.',
        venueImage: 'images/spa.jpg',
        venueMessage:
            'Sophie, que este momento de spa seja apenas o primeiro presente de um dia cheio de amor. Deixa-te mimar — mereces cada segundo. 🌿✨',
        riddles: [
            {
                id: 1,
                question:
                    'Não se compra, não se vê, mas falta quando parte.\nO vazio preenchido que não deixa marca.\nOnde termina a preocupação começa a busca — e onde a busca termina, ela nasce.\nTrês entram nela, as mesmas saem transformadas.\n\nO que vive no silêncio entre as palavras não ditas?',
                answer: 'paz',
                hint: 'Três letras. Não se toca mas cura.',
            },
            {
                id: 2,
                question:
                    'Toque que fala para quem já não ouve palavras.\nCada ponto do corpo relata uma história guardada.\nArte que o Oriente conheceu quando o Ocidente ainda dormia.\nTransformação sem magia — apenas sabedoria das mãos.\n\nComo se chama o diálogo que não usa voz?',
                answer: 'massagem',
                hint: 'Oito letras. Vem do Oriente.',
            },
            {
                id: 3,
                question:
                    'Templo moderno sem deuses, sagrado sem religião.\nOnde o corpo se rende ao ritual e a alma volta à casa.\nNome que evoca verde e promete metamorfose.\nTrês palavras em uma: refúgio, renascimento, respiração.\n\nQual é o santuário urbano que rouba tempo ao tempo?',
                answer: 'spa',
                hint: 'Três letras. Anagrama de "sap".',
            },
        ],
    },

    // ────────────────────────────────────────────────────────
    // STAGE 2 – BARCO (afternoon · friends + bridesmaids · Tejo)
    // ────────────────────────────────────────────────────────
    {
        id: StageId.Barco,
        label: 'Desafio II',
        icon: '☀️',
        timeContext: 'Tarde · Com todas as amigas',
        teaser: 'O segundo segredo esconde-se onde Lisboa se encontra com a imensidão... Resolve os enigmas.',
        description:
            'A tarde chega e o grupo cresce. As amigas juntam-se e a aventura também. Não há chão sólido — só movimento, brisa e horizonte.',
        venueName: 'Sailing Lovers',
        venueReveal:
            '⛵ Sailing Lovers — um passeio pelo Rio Tejo que nunca vais esquecer. Vento no cabelo, amigas ao lado, Lisboa ao longe.',
        venueImage: 'images/boat.jpg',
        venueMessage:
            'Sophie, a brisa do Tejo carrega todo o carinho que temos por ti. Este passeio é só nosso — a memória fica para sempre. ⛵💙',
        riddles: [
            {
                id: 1,
                question:
                    'Tudo o que cai volta ao seu seio.\nFlui sem vontade, sabe sem pensar.\nFoi deus para os Gregos, lágrima ao poeta, espelho à lua.\nNascida do vazio, mãe de tudo, filha de nada.\n\nO que une o mundo inteiro sem precisar de respirar?',
                answer: 'água',
                hint: 'Quatro letras. Invisível mas escuta tudo.',
            },
            {
                id: 2,
                question:
                    'Linha que conecta dois mundos, portal entre séculos.\nPortugal respira pelo seu ritmo ancestral.\nOs navegadores o tocaram com dedo de ouro, mas nunca o possuíram.\nMurmúrio que une quem partiu a quem ficou.\n\nQual é o fio de história que tece a identidade de um povo?',
                answer: 'tejo',
                hint: 'Quatro letras. Mito português.',
            },
            {
                id: 3,
                question:
                    'Ponte flutuante entre quem éramos e quem queremos ser.\nCarrega peso sem ceder, segura esperança sem prometer.\nCascos que cantam para não desaparecerem na bruma.\nVeículo de transformação — quem entra não sai igual.\n\nQual é o mensageiro que leva segredos de margem a margem?',
                answer: 'barco',
                hint: 'Cinco letras. Flutua entre mundos.',
            },
        ],
    },

    // ────────────────────────────────────────────────────────
    // STAGE 3 – KARAOKÊ (night · friends + bridesmaids · Golden Vista → bar)
    // ────────────────────────────────────────────────────────
    {
        id: StageId.Karaoke,
        label: 'Desafio III',
        icon: '🌙',
        timeContext: 'Noite · O grande finale',
        teaser: 'O terceiro e último segredo aguarda na escuridão da noite... Resolve os enigmas e brilha até ao fim.',
        description:
            'A noite cai e Lisboa acende-se. É o último capítulo deste dia inesquecível — e o mais animado de todos.',
        venueName: 'Golden Vista',
        venueReveal:
            '🎤 Golden Vista — onde a noite começa. E depois? Um bar para encerrar a noite em grande! 🥂 As tuas amigas não te deixam parar de sorrir.',
        venueImage: 'images/karaoke.jpg',
        venueMessage:
            'Sophie, hoje és a estrela do palco! Canta, ri, dança — esta noite é toda tua. O melhor final para o melhor dia. 🎤🌟',
        riddles: [
            {
                id: 1,
                question:
                    'Combustível que não deixa cinzas.\nRebelião contra o quotidiano, sublevação da alma.\nVence o tempo, rouba o controlo, leva a razão aos gritos.\nNada disto seria sensato — e por isso floresce.\n\nO que ferve nas veias quando o mundo se torna pequeno?',
                answer: 'diversão',
                hint: 'Oito letras. Ouro líquido da vida.',
            },
            {
                id: 2,
                question:
                    'Frequência que precede palavras, linguagem antes da língua.\nVibração que o universo sussurra a quem sabe ouvir.\nNão conhece fronteiras, não respeita lógica, vence a morte.\nA moeda de troca entre corações que nunca se tocaram.\n\nO que é ao mesmo tempo som e silêncio?',
                answer: 'música',
                hint: 'Seis letras. Conversa da alma.',
            },
            {
                id: 3,
                question:
                    'Morte e ressurreição em três minutos.\nO escudo que te torna invulnerável e te faz completamente exposta.\nÉs espetáculo e plateia, ator e crítico, mortal e imortal.\nNome que promete vazio mas entrega universos.\n\nQual é a alquimia que transforma o tímido em lenda?',
                answer: 'karaoke',
                hint: 'Sete letras. Japão que conquistou o mundo.',
            },
        ],
    },
];

export function getStageById(id: StageId): Stage | undefined {
    return STAGES.find((s) => s.id === id);
}
