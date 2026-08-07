# Turma III · Medicina Multivix Serra

Site estático (HTML/CSS/JS puro, sem build) para a turma do 2º período. Três páginas:

- **`index.html`** — Hoje (aulas do dia, com destaque pro que está rolando agora), semana completa, materiais por matéria (Drive + Atlas + Thea) e um painel pra cada aluno configurar seus grupos e dispensas.
- **`calculadora.html`** — calculadora de notas (aprovação direta, recuperação, eixos teórico/prático, matérias de dependência, exportação em PDF).
- **`provas.html`** — calendário de provas (bimestrais, substitutivas e finais), com marcação pessoal de dependência/recuperação e um calendário mês a mês pronto pra imprimir.

As notas e as configurações de cada aluno ficam salvas só no navegador dele (localStorage) — não existe banco compartilhado.

## Estrutura

```
index.html        → página inicial (não precisa mexer no dia a dia)
calculadora.html   → página da calculadora (não precisa mexer no dia a dia)
provas.html        → página do calendário de provas (não precisa mexer no dia a dia)
style.css          → visual do site (tema escuro)
data.js            → horário, materiais, provas e Instagram — é o que você edita sempre
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
- `dates` (opcional): array de datas exatas `"DD/MM/AAAA"` em que essa aula específica acontece (ex: práticas de APS II e Casos Clínicos II, que se revezam por grupo em semanas alternadas). Quando presente, a aula só aparece em **"Hoje"** nessas datas exatas — na "Semana completa" ela continua aparecendo normalmente no dia da semana correspondente, como referência geral. Sem esse campo, a aula é tratada como toda semana.

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
  links:{
    "Slides":"https://drive.google.com/drive/folders/...",
    "Resumo":"https://drive.google.com/drive/folders/...",
    "Provas antigas": null,   // troque por um link quando organizar a pasta
  },
  atlas: null,   // só existe em Anatomia II e Histologia II — troque por um link quando tiver
  thea:  "https://www.thea.study/classes/.../copy?signature=...",
},
```

- `links`: adicione quantos pares `"Rótulo": "URL do Drive"` quiser — cada um vira um botão (pill) que abre a pasta dentro do site. Um valor `null` aparece como "em breve" desabilitado — troque por `"https://..."` quando tiver o link.
- **Provas antigas**: toda matéria (exceto Embriologia II, que não tem prova antiga) já tem esse item em `links` como `null`. Organize uma subpasta com as provas antigas dentro da pasta da matéria no Drive e cole o link dela aqui.
- `atlas`: só existe no objeto de **Anatomia II** e **Histologia II** — nas outras matérias nem inclua esse campo (assim o botão não aparece). Enquanto for `null`, mostra "em breve".
- `thea`: enquanto for `null`, mostra "em breve"; sempre abre em nova aba (não é pasta do Drive, não passa pelo navegador embutido).

Para adicionar uma matéria nova, copie um bloco `{ ... }` inteiro, cole antes do `];` final e ajuste os campos.

### 4. Calendário de provas (`EXAMS`)

Um array de objetos, um por avaliação:

```js
{date:"19/09/2026", subj:"Anatomia II", tipo:"Cognitiva (AC)", fase:"1º Bimestre", time:"08:00 - 10:00"},
```

- `date`: formato `"DD/MM/AAAA"`.
- `subj`: nome da matéria (aparece como texto simples, não precisa bater com `SCHEDULE`).
- `tipo`: ex. `"Cognitiva (AC)"`, `"Prática (Habilidades)"`, `"Prática (OSCE)"`.
- `fase`: `"1º Bimestre"`, `"2º Bimestre"`, `"Substitutiva"` ou `"Final"` — usado nos filtros e na cor da etiqueta.
- `time`: horário da prova.

A tabela em `provas.html` ordena por data automaticamente — só adicionar a linha em qualquer posição do array.

**Marcação de dependência/recuperação:** em `provas.html`, cada aluno marca na coluna "Minha situação" se uma prova é Normal, Dependência ou Recuperação pra ele — fica salvo só no navegador dele (não mexe no `EXAMS`). Isso alimenta o calendário de impressão (ver abaixo).

**Calendário para imprimir:** o card "🖨 Imprimir calendário" em `provas.html` monta um calendário mês a mês (só com as provas do filtro escolhido) e chama a impressão do navegador — o aluno escolhe "Salvar como PDF" na hora de imprimir. Os filtros são 1º Bimestre, 2º Bimestre (usam o campo `fase`), e Dependências/Recuperações (usam a marcação pessoal de cada aluno).

### 5. Instagram (`IG_URL`)

```js
const IG_URL = "https://instagram.com/rafaelm.md";
```

Já está preenchido — só trocar aqui se mudar de usuário.

## Navegador de pastas do Drive embutido (`DRIVE_API_KEY`)

Os botões de pasta ("Slides", "Resumo", "Provas antigas" etc.) abrem um navegador de arquivos **dentro do próprio site** — sem mostrar a interface do Drive — e o clique num arquivo baixa ele direto. Como busca sempre ao vivo na API, fica automaticamente sincronizado com o que está na pasta do Drive (adicionou um arquivo lá, já aparece no site).

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
