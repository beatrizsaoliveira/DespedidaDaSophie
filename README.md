# 🌿 Despedida da Sophie

> An interactive riddle game for Sophie's bachelorette party — inspired by the **Exit** board game series.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-6b8f5e?logo=github)](https://beatrizsaoliveira.github.io/DespedidaDaSophie/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📖 About

**Despedida da Sophie** is a static site hosted on GitHub Pages that works as an interactive riddle game for a bachelorette party. Sophie solves sequential riddles to discover the surprise locations of her special day — one stage per venue.

**Visual theme:** matcha green · flowers · books · cats 🐈📖🌸

---

## 🎮 How the Game Works

The game consists of **3 stages** (_desafios_), each with **3 riddles** (_enigmas_):

| #   | Stage           | Time  | Participants                    | Venue              | Activity                     |
| --- | --------------- | ----- | ------------------------------- | ------------------ | ---------------------------- |
| 1   | 🌤️ Desafio I   | Manhã | Sophie + 2 bridesmaids          | EcoMassage         | Massage & wellness           |
| 2   | ☀️ Desafio II  | Tarde | All friends                     | Sailing Lovers     | Sailing on the Tejo          |
| 3   | 🌙 Desafio III | Noite | All friends                     | Golden Vista → Bar | Karaokê & celebration        |

### Rules

- **Riddles 1 and 2** of each stage are atmospheric — they give contextual clues without revealing the activity
- Only **riddle 3** (the last one) reveals the actual venue/activity
- An incorrect answer shows an error message with no penalty
- Players can request one **dica** (hint) per riddle, but it costs 1 ⭐
- Each stage starts with **3 ⭐** — the final score is the sum of all remaining stars

### Answer Normalisation

Answers are checked in a **case-insensitive, accent-insensitive** way. The engine strips accents, converts to lowercase, and trims whitespace before comparing — so players can type freely.

### Correct Answers

| Stage       | #   | Riddle opens with…                   | Answer     |
| ----------- | --- | ------------------------------------ | ---------- |
| 🌤️ Manhã   | 1   | Não se compra, não se vê…            | `paz`      |
| 🌤️ Manhã   | 2   | Toque que fala para quem…            | `massagem` |
| 🌤️ Manhã   | 3   | Templo moderno sem deuses…           | `spa`      |
| ☀️ Tarde   | 1   | Tudo o que cai volta ao seu seio…    | `água`     |
| ☀️ Tarde   | 2   | Linha que conecta dois mundos…       | `tejo`     |
| ☀️ Tarde   | 3   | Ponte flutuante entre quem éramos…   | `barco`    |
| 🌙 Noite   | 1   | Combustível que não deixa cinzas…    | `diversão` |
| 🌙 Noite   | 2   | Frequência que precede palavras…     | `música`   |
| 🌙 Noite   | 3   | Morte e ressurreição em três minutos… | `karaoke`  |

---

## 🖥️ Screens

| Screen            | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| **Intro**         | Cover image (`start.jpg`), title, tagline, and "Iniciar a Aventura" button  |
| **Stage / Riddle**| Stage header, star rating, riddle progress track, riddle card with hint     |
| **Venue reveal**  | Reveal text, venue photo, personalised PT-PT message, next-stage button     |
| **Fim**           | Confetti, final score, per-stage star recap, restart button                 |

---

## 🛠️ Tech Stack

| Technology                        | Purpose                                      |
| --------------------------------- | -------------------------------------------- |
| **TypeScript 5.5**                | Typed source code                            |
| **esbuild**                       | Fast bundler → `public/app.bundle.js`        |
| **Animate.css (CDN)**             | Entrance/exit CSS animations                 |
| **ESLint 9 + @typescript-eslint** | Code linting                                 |
| **Prettier**                      | Automatic code formatting                    |
| **Husky + Commitlint**            | Conventional commit validation               |
| **Vanilla CSS**                   | Full design system with CSS custom properties|
| **localStorage**                  | Game progress persistence                    |
| **GitHub Pages**                  | Static site hosting                          |

---

## 📁 Project Structure

```
DespedidaDaSophie/
├── public/               # Files served by GitHub Pages
│   ├── index.html        # App entry point & help modal markup
│   ├── styles.css        # Full design system (light/dark, responsive)
│   ├── app.bundle.js     # esbuild output — do not edit directly
│   └── images/           # Venue photos + intro cover image
│       ├── start.jpg     # Intro screen cover
│       ├── spa.jpg       # EcoMassage venue reveal
│       ├── boat.jpg      # Sailing Lovers venue reveal
│       └── karaoke.jpg   # Golden Vista venue reveal
├── src/                  # TypeScript source
│   ├── main.ts           # Bootstrap: wires all modules, mobile menu
│   ├── types/
│   │   ├── index.ts      # Shared interfaces & enums (Stage, SavedState…)
│   │   └── globals.d.ts  # Global ambient declarations
│   ├── i18n/             # Internationalisation
│   │   ├── types.ts      # Translations interface contract
│   │   ├── pt-PT.ts      # Active locale — Português (Portugal)
│   │   └── index.ts      # Re-exports active locale as `t`
│   ├── game/
│   │   ├── riddles.ts    # All stage & riddle data (questions, answers, hints, images)
│   │   ├── gameState.ts  # State manager + localStorage persistence
│   │   └── engine.ts     # Answer checking, hint logic, stage advancement
│   └── ui/
│       ├── screen.ts     # Renders all screens (intro, stage, venue reveal, fim)
│       ├── theme.ts      # Light/dark mode toggle
│       ├── help.ts       # Help modal open/close
│       └── animations.ts # Confetti launcher & micro-animations (shake, pulse)
├── .husky/
│   ├── commit-msg        # commitlint hook
│   └── pre-commit        # Prettier auto-format hook
├── tsconfig.json
├── eslint.config.mjs
├── .commitlintrc.json
├── .gitignore
├── LICENSE               # MIT
└── package.json
```

---

## 🚀 Local Development

### Prerequisites

- Node.js ≥ 18 (recommended: v20.x via nvm)
- npm ≥ 10

### Install dependencies

```bash
npm install
```

### Development mode (watch)

```bash
npm run dev
```

Open `public/index.html` directly in the browser. The bundle is rebuilt automatically on every change.

### Production build

```bash
npm run build
```

Generates the minified `public/app.bundle.js`.

### TypeScript type-check

```bash
npm run typecheck
```

### Linting

```bash
npm run lint        # check
npm run lint:fix    # auto-fix
```

---

## 📦 Deploy (GitHub Pages)

The repository is configured to deploy from the `main` branch. After making changes:

1. Run the build: `npm run build`
2. Commit the changes including `public/app.bundle.js`
3. Push to `main`

```bash
npm run build
git add public/app.bundle.js
git commit -m "build: update bundle"
git push origin main
```

The site is available at: `https://beatrizsaoliveira.github.io/DespedidaDaSophie/`

> **Note:** GitHub Pages serves from the repository root. Make sure `public/` is set as the source folder in the repository settings, or move the files to the root if needed.

---

## 🔧 Customisation

### Changing riddles

Edit `src/game/riddles.ts`. Each riddle has:

- `question` — riddle text (can be multi-line with `\n`)
- `answer` — accepted answer (always lowercase; accents are stripped automatically)
- `hint` — optional hint (costs 1 ⭐)

Each stage also has:

- `venueImage` — path relative to `public/` (e.g. `images/spa.jpg`)
- `venueMessage` — personalised message shown after the stage is completed

Rebuild after editing: `npm run build`

### Adding a new language

Implement the `Translations` interface from `src/i18n/types.ts` in a new file (e.g. `src/i18n/en-GB.ts`), then swap the import in `src/i18n/index.ts`.

### Changing the visual theme

The design system lives entirely in `public/styles.css` as CSS custom properties (`:root` for light mode, `[data-theme='dark']` for dark mode).

---

## 📝 Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) validated by Husky:

```
feat:     new feature
fix:      bug fix
build:    build system changes
style:    CSS / style changes
docs:     documentation
refactor: code refactoring
chore:    miscellaneous tasks
```

---

## 📄 License

MIT — see [LICENSE](LICENSE)

---


_Com amor, as tuas besties 💕_
