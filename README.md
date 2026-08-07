# Turma II · Medicina Multivix Serra

Site estático (HTML/CSS/JS puro, sem build) para a turma do 2º período. Duas páginas:

- **`index.html`** — Hoje (aulas do dia, com destaque pro que está rolando agora), semana completa, materiais por matéria (Drive + Atlas + Thea) e um painel pra cada aluno configurar seus grupos e dispensas.
- **`calculadora.html`** — calculadora de notas (aprovação direta, recuperação, eixos teórico/prático, matérias de dependência, exportação em PDF).

As notas e as configurações de cada aluno ficam salvas só no navegador dele (localStorage) — não existe banco compartilhado.

## Estrutura

```
index.html        → página inicial (não precisa mexer no dia a dia)
calculadora.html   → página da calculadora (não precisa mexer no dia a dia)
style.css          → visual do site (tema escuro)
data.js            → horário, materiais e Instagram — é o que você edita sempre
profile.js         → lógica do painel "meus grupos e dispensas"
drive.js           → navegador de pastas do Drive embutido no site
calculator.js      → lógica da calculadora de notas
```

## Como atualizar o horário e os materiais (`data.js`)

Abra `data.js` no editor.

### 1. Horário (`SCHEDULE`)

Um objeto com um array por dia da semana. Cada aula é `{time, subj, meta, group}`:

```js
"Quarta": [
  {time:"13:00 - 14:30", subj:"Anatomia II", meta:"Prática · Grupo 1", group:[1]},
  ...
],
```

- `time`: sempre no formato `"HH:MM - HH:MM"` (usado pro "ao vivo" e pra ordenar).
- `subj`: nome da matéria/atividade. Precisa ser **igual** em todas as aulas da mesma matéria (teórica e prática), pois é isso que agrupa/filtra por dispensa.
- `meta`: linha secundária (tipo de aula, grupo, sala, professor etc).
- `group` (opcional): array com o(s) número(s) de grupo que têm essa aula (ex: `[1]`, ou `[3,4]` quando dois grupos assistem juntos). Só use em aulas que variam por grupo — aulas "Todos" não precisam desse campo. Se usar `group`, cadastre as opções em `GROUP_OPTIONS` (ver abaixo) pra aparecer no painel do aluno.

Para um dia sem aula, deixe o array vazio: `"Sexta": [],`

### 2. Grupos configuráveis (`GROUP_OPTIONS`)

Define quais matérias aparecem no painel "Meus grupos e dispensas" e quais opções cada uma tem:

```js
const GROUP_OPTIONS = {
  "Anatomia II": [
    {value:1, label:"Grupo 1"},
    {value:2, label:"Grupo 2"},
  ],
  ...
};
```

A chave (`"Anatomia II"`) precisa bater exatamente com o `subj` usado no `SCHEDULE`. O `value` escolhido pelo aluno é comparado com o array `group` de cada aula.

### 3. Materiais por matéria (`SUBJECTS`)

Um array de objetos, um por matéria:

```js
{
  name:"Anatomia II",
  folder:"https://drive.google.com/drive/folders/...",   // pasta completa no Drive
  links:{
    "Slides":"https://drive.google.com/drive/folders/...",
    "Resumo":"https://drive.google.com/drive/folders/...",
  },
  atlas: null,   // troque por um link quando tiver, ex: "https://..."
  thea:  "https://www.thea.study/classes/.../copy?signature=...",
},
```

- `folder`: pasta "mãe" da matéria no Drive. Se ainda não existe, deixe `null`.
- `links`: adicione quantos pares `"Rótulo": "URL do Drive"` quiser — cada um vira um botão (pill) que abre a pasta dentro do site.
- `atlas` e `thea`: enquanto estiverem `null`, o site mostra "em breve" desabilitado. Assim que tiver o link, troque `null` por `"https://..."` (com aspas). Esses dois **sempre abrem em nova aba** (não são pastas do Drive, então não passam pelo navegador embutido).

Para adicionar uma matéria nova, copie um bloco `{ ... }` inteiro, cole antes do `];` final e ajuste os campos.

### 4. Instagram (`IG_URL`)

```js
const IG_URL = "https://instagram.com/SEU_USUARIO_AQUI"; // TODO Rafael: troque pelo seu @
```

Troque pela URL do seu Instagram (ex: `https://instagram.com/rafaelm.md`).

## Navegador de pastas do Drive embutido (`DRIVE_API_KEY`)

Os botões de pasta ("Slides", "Resumo", "ABRIR PASTA COMPLETA" etc.) abrem um navegador de arquivos **dentro do próprio site** — sem mostrar a interface do Drive — e o clique num arquivo baixa ele direto. Como busca sempre ao vivo na API, fica automaticamente sincronizado com o que está na pasta do Drive (adicionou um arquivo lá, já aparece no site).

Isso depende de uma chave de API do Google Drive, gratuita e só leitura:

1. Acesse [console.cloud.google.com](https://console.cloud.google.com/) e crie um projeto.
2. **APIs e Serviços → Biblioteca** → ative **Google Drive API**.
3. **APIs e Serviços → Credenciais → Criar credenciais → Chave de API**.
4. Restrinja a chave: em **Restrições de API**, marque só **Google Drive API**; em **Restrições de aplicativo**, escolha **Referenciadores HTTP** e adicione `https://rafaelmachadoribeiro.github.io/*`.
5. Cole a chave em `data.js`:
   ```js
   const DRIVE_API_KEY = "AIzaSy...";
   ```
6. As pastas do Drive precisam estar como **"Qualquer pessoa com o link pode visualizar"**.

Sem a chave configurada (`DRIVE_API_KEY = ""`), os botões voltam ao comportamento simples: abrem o link do Drive numa aba nova.

## Meus grupos e dispensas

Cada aluno abre o painel "⚙ Meus grupos e dispensas" (em cima de "Hoje") e escolhe:

- **Grupo por matéria** — filtra "Hoje" e a semana pra mostrar só as aulas de prática do grupo dele (aulas "Todos" continuam aparecendo sempre).
- **Matérias dispensadas** — soma do horário; continuam aparecendo normalmente em Materiais e na Calculadora.

Fica salvo no navegador de cada aluno (não afeta os outros).

## Testar localmente

Basta abrir o `index.html` direto no navegador (duplo clique) ou usar a extensão "Live Server" do VS Code. Não precisa de servidor nem instalação de nada.

## Deploy

O site é publicado via GitHub Pages a partir da branch `main` (raiz do repositório) — qualquer alteração enviada (`git push`) para `main` atualiza o site publicado em alguns minutos.

---

Desenvolvido por Rafael Machado ∴
