# Turma II · Medicina Multivix Serra

Site estático (HTML/CSS/JS puro, sem build) para a turma do 2º período. Mostra:

- **Hoje** — as aulas do dia atual, com destaque para o que está rolando agora.
- **Semana completa** — grade de segunda a sexta.
- **Materiais por matéria** — links das pastas do Google Drive (slides, resumos, transcrições, atlas, thea).
- **Calculadora de notas** — embutida no próprio site, com as mesmas regras da Calculadora Acadêmica (aprovação direta, recuperação, eixos teórico/prático e matérias de dependência). As notas ficam salvas no navegador de cada aluno (localStorage), não em um banco compartilhado.

## Estrutura

```
index.html       → estrutura e estilo do site (não precisa mexer aqui no dia a dia)
data.js          → horário da semana e links de materiais — é o que você edita
calculator.js    → lógica da calculadora de notas embutida
```

## Como atualizar o horário e os materiais (`data.js`)

Abra `data.js` no editor. Só existem duas listas para mexer:

### 1. Horário (`SCHEDULE`)

Um objeto com um array por dia da semana. Cada aula é `{time, subj, meta}`:

```js
"Segunda": [
  {time:"08:00 - 09:30", subj:"Casos Clínicos Integrados II", meta:"Teórica · Todos"},
  ...
],
```

- `time`: sempre no formato `"HH:MM - HH:MM"` (é usado para calcular o que está "ao vivo").
- `subj`: nome da matéria/atividade.
- `meta`: linha secundária (tipo de aula, grupo, sala, professor etc).

Para um dia sem aula, deixe o array vazio: `"Sexta": [],`

### 2. Materiais por matéria (`SUBJECTS`)

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
  thea:  null,   // troque por um link quando tiver, ex: "https://..."
},
```

- `folder`: pasta "mãe" da matéria no Drive. Se ainda não existe, deixe `null`.
- `links`: adicione quantos pares `"Rótulo": "URL"` quiser — cada um vira um botão (pill) no card da matéria.
- `atlas` e `thea`: enquanto estiverem `null`, o site mostra "em breve" desabilitado. Assim que tiver o link, troque `null` por `"https://..."` (com aspas) e o botão vira clicável automaticamente.

Para adicionar uma matéria nova, copie um bloco `{ ... }` inteiro, cole antes do `];` final e ajuste os campos.

### 3. Instagram (`IG_URL`)

No fim do `data.js`:

```js
const IG_URL = "https://instagram.com/SEU_USUARIO_AQUI"; // TODO Rafael: troque pelo seu @
```

Troque pela URL do seu Instagram (ex: `https://instagram.com/rafaelm.md`).

## Testar localmente

Basta abrir o `index.html` direto no navegador (duplo clique) ou usar a extensão "Live Server" do VS Code. Não precisa de servidor nem instalação de nada.

## Deploy

O site é publicado via GitHub Pages a partir da branch `main` (raiz do repositório) — qualquer alteração enviada (`git push`) para `main` atualiza o site publicado em alguns minutos.

---

Desenvolvido por Rafael Machado ∴
