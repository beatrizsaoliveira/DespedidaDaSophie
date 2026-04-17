# 🌿 Despedida da Sophie

> Um jogo interativo de charadas para a despedida de solteira da Sophie — inspirado no jogo de tabuleiro **Exit**.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-6b8f5e?logo=github)](https://beatrizsaoliveira.github.io/DespedidaDaSophie/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📖 Sobre o Projeto

A **Despedida da Sophie** é um site estático hospedado no GitHub Pages que funciona como um jogo de charadas interativo para a despedida de solteira. A Sophie resolve enigmas sequenciais para descobrir os locais surpresa do dia — um desafio por cada local.

**Tema visual:** Verde matcha · flores · livros · gatos 🐈📖🌸

---

## 🎮 Como Funciona o Jogo

O jogo é composto por **3 desafios** (estágios), cada um com **3 enigmas**:

| # | Desafio | Período | Quem Participa | Local |
|---|---------|---------|----------------|-------|
| 1 | 🌿 Desafio I | Manhã | Sophie + 2 Madrinhas | EcoMassage |
| 2 | ⛵ Desafio II | Tarde | Todas as amigas | Sailing Lovers |
| 3 | 🎤 Desafio III | Noite | Todas as amigas | Golden Vista + bar |

### Regras
- Os **enigmas 1 e 2** de cada desafio são atmosféricos — dão pistas contextuais sem revelar o local
- Apenas o **enigma 3** (o último) revela o nome do local
- Cada resposta incorrecta mostra um aviso
- É possível pedir uma **dica** por enigma, mas custa 1 ⭐
- Cada desafio começa com **3 estrelas** — a pontuação final é a soma de todas

### Respostas
As respostas são verificadas de forma **insensível a maiúsculas e acentos**. Só é aceite a resposta correcta para cada enigma:

| Desafio | Enigma | Resposta |
|---------|--------|---------|
| 🌿 Spa | 1 | `bem-estar` |
| 🌿 Spa | 2 | `massagem` |
| 🌿 Spa | 3 | `ecomassage` |
| ⛵ Barco | 1 | `água` |
| ⛵ Barco | 2 | `tejo` |
| ⛵ Barco | 3 | `sailing lovers` |
| 🎤 Karaokê | 1 | `festa` |
| 🎤 Karaokê | 2 | `karaoke` |
| 🎤 Karaokê | 3 | `golden vista` |

---

## 🛠️ Stack Técnico

| Tecnologia | Uso |
|-----------|-----|
| **TypeScript 5.5** | Código fonte tipado |
| **esbuild** | Bundle rápido → `public/app.bundle.js` |
| **ESLint 9 + @typescript-eslint** | Linting do código |
| **Husky + Commitlint** | Validação de commits convencionais |
| **Vanilla CSS** | Design system completo |
| **localStorage** | Persistência do progresso |
| **GitHub Pages** | Hosting do site estático |

---

## 📁 Estrutura do Projecto

```
DespedidaDaSophie/
├── public/               # Ficheiros servidos pelo GitHub Pages
│   ├── index.html        # Entrada do site
│   ├── styles.css        # Design system completo
│   └── app.bundle.js     # Bundle gerado pelo esbuild (não editar)
├── src/                  # Código TypeScript (fonte)
│   ├── main.ts           # Ponto de entrada
│   ├── types/
│   │   └── index.ts      # Interfaces e enums partilhados
│   ├── game/
│   │   ├── riddles.ts    # Dados de todos os enigmas e estágios
│   │   ├── gameState.ts  # Gestão de estado + localStorage
│   │   └── engine.ts     # Lógica: verificação de respostas e avanço
│   └── ui/
│       ├── theme.ts      # Toggle light/dark mode
│       ├── help.ts       # Modal de ajuda
│       ├── screen.ts     # Renderização de ecrans/estágios
│       └── animations.ts # Confetti e micro-animações
├── .husky/
│   └── commit-msg        # Hook de commitlint
├── tsconfig.json
├── eslint.config.mjs
├── .commitlintrc.json
├── .gitignore
├── LICENSE               # MIT
└── package.json
```

---

## 🚀 Desenvolvimento Local

### Pré-requisitos
- Node.js ≥ 18 (recomendado: v20.x via nvm)
- npm ≥ 10

### Instalar dependências
```bash
npm install
```

### Modo desenvolvimento (watch)
```bash
npm run dev
```
Abre `public/index.html` directamente no browser. O bundle é reconstruído automaticamente a cada alteração.

### Build de produção
```bash
npm run build
```
Gera o ficheiro `public/app.bundle.js` minificado.

### Verificar tipos TypeScript
```bash
npm run typecheck
```

### Linting
```bash
npm run lint       # Verificar
npm run lint:fix   # Corrigir automaticamente
```

---

## 📦 Deploy (GitHub Pages)

O repositório está configurado para fazer deploy automático a partir da branch `main`. Após cada push:

1. Certifica-te de que o build foi feito: `npm run build`
2. Faz commit das alterações incluindo o `public/app.bundle.js`
3. Push para `main`

```bash
npm run build
git add public/app.bundle.js
git commit -m "build: update bundle"
git push origin main
```

O site fica disponível em: `https://beatrizsaoliveira.github.io/DespedidaDaSophie/`

> **Nota:** O GitHub Pages serve a partir da raíz do repositório. Certifica-te que `public/` como pasta de origem está configurado nas definições do repositório, ou move os ficheiros para a raíz se necessário.

---

## 🔧 Personalização

### Alterar os enigmas
Edita o ficheiro `src/game/riddles.ts`. Cada enigma tem:
- `question` — texto da charada
- `answer` — resposta aceite (sempre em minúsculas)
- `hint` — dica opcional (custa 1 ⭐)

Após editar, faz rebuild: `npm run build`

### Alterar o tema visual
O design system está inteiramente em `public/styles.css` nas CSS Custom Properties (`:root` e `[data-theme='dark']`).

---

## 📝 Commits Convencionais

Este projecto usa [Conventional Commits](https://www.conventionalcommits.org/) validados pelo Husky:

```
feat: nova funcionalidade
fix: correcção de bug
build: alterações de build
style: alterações de CSS/estilos
docs: documentação
refactor: refactorização de código
chore: tarefas gerais
```

---

## 📄 Licença

MIT — ver [LICENSE](LICENSE)

---

*Com amor, as tuas besties 💕*
