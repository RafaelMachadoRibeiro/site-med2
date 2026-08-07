/* ======================================================================
   DADOS DO SITE — Turma II (Medicina Multivix Serra)
   Edite este arquivo para atualizar horário, materiais e Instagram.
   Não precisa mexer no index.html. Veja o README.md para instruções.
   ====================================================================== */

const DAYS = ["Segunda","Terça","Quarta","Quinta","Sexta"];

const SCHEDULE = {
  "Segunda": [
    {time:"08:00 - 09:30", subj:"Casos Clínicos Integrados II", meta:"Teórica · Todos"},
    {time:"13:00 - 14:30", subj:"Atenção Primária à Saúde II", meta:"Teórica · Todos"},
    {time:"14:30 - 16:30", subj:"PIC II", meta:"Teórica · Quinzenal · Todos"},
    {time:"14:30 - 16:30", subj:"Humanidades II", meta:"Teórica · Quinzenal · Todos"},
    {time:"16:30 - 18:30", subj:"Bioestatística", meta:"Teórica · Quinzenal · Todos"},
  ],
  "Terça": [
    {time:"08:00 - 10:00", subj:"Histologia II", meta:"Teórica · Quinzenal · Todos"},
    {time:"08:00 - 10:00", subj:"Embriologia II", meta:"Teórica · Quinzenal · Todos"},
    {time:"10:00 - 12:00", subj:"Genética", meta:"Teórica · Todos"},
    {time:"13:00 - 16:00", subj:"Fisiologia II", meta:"Teórica · Todos"},
    {time:"17:00 - 19:00", subj:"Casos Clínicos Integrados II", meta:"Prática · Grupos 1, 2, 3 e 4 · Centro de Simulação Realística, MTVX Vitória"},
  ],
  "Quarta": [
    {time:"08:00 - 10:00", subj:"Imunologia", meta:"Teórica · Todos"},
    {time:"10:00 - 12:00", subj:"Anatomia II", meta:"Teórica · Todos"},
    {time:"13:00 - 14:30", subj:"Anatomia II", meta:"Prática · Grupo 1"},
    {time:"13:00 - 14:30", subj:"Histologia II", meta:"Prática · Grupo 3"},
    {time:"14:30 - 16:00", subj:"Histologia II", meta:"Prática · Grupo 1"},
    {time:"14:30 - 16:00", subj:"Anatomia II", meta:"Prática · Grupo 2"},
    {time:"16:00 - 17:30", subj:"Histologia II", meta:"Prática · Grupo 2"},
    {time:"16:00 - 17:30", subj:"Anatomia II", meta:"Prática · Grupo 3"},
  ],
  "Quinta": [
    {time:"08:00 - 12:00", subj:"APS I (prática)", meta:"UBS Jardim Carapina · Grupos 1 e 2 · Profª Ingred"},
    {time:"08:00 - 12:00", subj:"APS I (prática)", meta:"UBS Central Carapina · Grupos 3 e 4 · Profª Fabiana"},
    {time:"08:00 - 12:00", subj:"APS I (prática)", meta:"UBS Jardim Tropical · Grupos 5 e 6 · Profª Grace"},
    {time:"08:00 - 12:00", subj:"APS I (prática)", meta:"UBS Nova Carapina II · Grupos 7 e 8 · Profª Evellyn"},
    {time:"08:00 - 12:00", subj:"APS I (prática)", meta:"UBS Vila Nova de Colares · Grupos 9 e 10 · Profª Nilceia"},
    {time:"13:00 - 15:00", subj:"Semiologia II", meta:"Teórica · Todos"},
    {time:"15:10 - 18:10", subj:"Semiologia II", meta:"Prática · Grupo 1 · Profº Isaac"},
    {time:"15:10 - 18:10", subj:"Semiologia II", meta:"Prática · Grupo 2 · Profº Marlon"},
    {time:"15:10 - 18:10", subj:"Semiologia II", meta:"Prática · Grupo 4 · Profª Alessandra"},
    {time:"16:30 - 19:30", subj:"Semiologia II", meta:"Prática · Grupo 3 · Profº Lucas"},
  ],
  "Sexta": [],
};

/* Materiais por matéria (pastas do Google Drive).
   Preencha "atlas" e "thea" com os links quando tiver — por enquanto ficam como "em breve". */
const SUBJECTS = [
  {
    name:"Anatomia II",
    folder:"https://drive.google.com/drive/folders/1ZApeKwAtrwixESPvicNwUOh2VFVRge9y",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1uYcv4C_eOYrhnry49W3rYW9s-TKbE7cY",
      "Pré Aula":"https://drive.google.com/drive/folders/1Qw201Kw33ikSznqtg8UoFQlHCps6kD-f",
      "Resumo":"https://drive.google.com/drive/folders/1M8qDjioakSaekXN0bainQaMUsRRhFsIc",
      "Transcrição":"https://drive.google.com/drive/folders/1-uKE90T0kJgcB7hstxjUnIK18LjLJiKI",
      "Prática":"https://drive.google.com/drive/folders/1Es2N0aTyMWzKybgRTFyC_OU2RDBS4Hsa",
    },
    atlas:null, thea:null
  },
  {
    name:"Histologia II",
    folder:"https://drive.google.com/drive/folders/1hTsMPhoWa4jiPuHlR0u_Ahqa7DCRuyrI",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1Ke2NAXbznjvGQK7L7KZXQ0i0QHWCIe4P",
      "Resumo":"https://drive.google.com/drive/folders/14xXX5PTvG5nqrWSRo0Kl437zdsmN4y03",
      "Transcrição":"https://drive.google.com/drive/folders/1l8TQcBTF6Gfrccis5IZROqQ5itpfIEqd",
      "Prática":"https://drive.google.com/drive/folders/1ib9sv6KZd6_9HY0rgm_VcZx-VF_BQyWd",
    },
    atlas:null, thea:null
  },
  {
    name:"Semiologia II",
    folder:"https://drive.google.com/drive/folders/1XxGpAAIWTpAr5UXr0V4fXHq3YztfThW7",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1SsKvhMfZJHEMdmCuBIyChATcpxl8vA_L",
      "Pré Aula":"https://drive.google.com/drive/folders/1Ea__IF9eoHrsjcRuwSTr0Td8ZBzTNAPp",
      "Resumo":"https://drive.google.com/drive/folders/1MTLjFt5dJyvwpsCiquJPQSINBrQoTKhZ",
      "Transcrição":"https://drive.google.com/drive/folders/1Xn0_Csy1KEWVrtDsTs5ewrG0rcq3ZPMJ",
      "Prática":"https://drive.google.com/drive/folders/1dYzHXfAQT8UXTKtO4sTqRSkd0euxawrI",
    },
    atlas:null, thea:null
  },
  {
    name:"Imunologia",
    folder:"https://drive.google.com/drive/folders/1r-YMMGHJNOPOfkJBGboyCbZ-znU4iqrD",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1qk4ClsnKp7TSc6BdlZroNMEX2ELiSgL8",
      "Pré Aula":"https://drive.google.com/drive/folders/1m5v5maC6r8zXJfdjaLmeGa5Kw_YGjK8N",
      "Resumo":"https://drive.google.com/drive/folders/1bpDOtrofhB72Mjf512_DAOmq6QyID-Hu",
      "Transcrição":"https://drive.google.com/drive/folders/1U7fJdvB466d54sQxwokH4Srzju-rCUuP",
    },
    atlas:null, thea:null
  },
  {
    name:"Fisiologia II",
    folder:"https://drive.google.com/drive/folders/1ucXfD1JOfFAr8iUx_lZCu1lorDw769gd",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1XXPTv-fEGzpYB7Bj2HplUh8Ojb44Cw8D",
      "Resumo":"https://drive.google.com/drive/folders/1kYf1Rt0KmaDSKZdy1SSoDv9U9P5VriUT",
      "Transcrição":"https://drive.google.com/drive/folders/1dmvfLs9VO_PqhA3SkFMqLr27YNnp3x19",
    },
    atlas:null, thea:null
  },
  {
    name:"Embriologia II",
    folder:"https://drive.google.com/drive/folders/1ngu-EoS1SJjWo2i8dB02icM5nbxb2gIM",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1QBocm_mApfYaDs1DHBrkc6OWn6GV9935",
      "Resumo":"https://drive.google.com/drive/folders/1-HULds7DFiTm1T1IvYvxeMOLS56IIVyA",
      "Transcrição":"https://drive.google.com/drive/folders/1SdPKxDmwfUuHrRCia9GAOEyqbFs-fkJ3",
    },
    atlas:null, thea:null
  },
  {
    name:"Genética",
    folder:"https://drive.google.com/drive/folders/1Ycm6Fyr7-L2UmV3Kr6LCM7pBo_ZytXux",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1Qmfohtg8qavwmbezqbXtrI9e5n1ImF8y",
      "Resumo":"https://drive.google.com/drive/folders/1eqh_78w8Xqoq-oaRQXXN4-DzPCKRKhIp",
      "Transcrição":"https://drive.google.com/drive/folders/1Ev0Dxml792Cdtkm6peeJr4A9XfZWYm3U",
    },
    atlas:null, thea:null
  },
  {
    name:"Bioestatística",
    folder:"https://drive.google.com/drive/folders/1d15SwOOidkKQtS0RSNXvflhyGhQYiip0",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1_p5Okn8hoWoFwap2gIpw6bCJ9gVm3OND",
      "Material":"https://drive.google.com/drive/folders/1DHIgTET-CFQfRnuii6ZurAAD5HTZgO2a",
      "Resumo":"https://drive.google.com/drive/folders/1RX-wtNLS4bT0mPmegnLElpYXNOMNLco-",
    },
    atlas:null, thea:null
  },
  {
    name:"APS II",
    folder:"https://drive.google.com/drive/folders/15pb7cLcF9bng2U9ktJarCGAqGdsFQFbb",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1OOMcB_Ij3V9mnDNMvk_qQ7kMUOpeXrGV",
      "Anotações de Aula":"https://drive.google.com/drive/folders/1q8gXTVArteCuveYQ6LXx5ObLqCSHINf5",
      "Resumo":"https://drive.google.com/drive/folders/1lf-FUh6V-Ho83elQHg1Xth5JmTA9n_Uh",
      "Transcrição":"https://drive.google.com/drive/folders/1_KHRU3978yW8ldd4LvgGY_LsDmCx4OuV",
    },
    atlas:null, thea:null
  },
  {
    name:"Casos Clínicos Integrados II",
    folder:"https://drive.google.com/drive/folders/10Jdttbb9uGImUNfB-z3GetXjOFw407aY",
    links:{
      "Slides":"https://drive.google.com/drive/folders/16KDH79ZFqK9njG0-aIuvfVaA2a_EbtQi",
      "Resumo":"https://drive.google.com/drive/folders/1_b1bXjRQDyX3x5oVCoLCMS1bB_6hGICn",
      "Prática":"https://drive.google.com/drive/folders/1_o45PXzLdwBJP99rQoky8SCjkieQSrLL",
    },
    atlas:null, thea:null
  },
  {
    name:"Humanidades II",
    folder:"https://drive.google.com/drive/folders/1rAQr1ILnzLyGtaEMNrJCxKClrbHUQWWU",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1TRek7OLPh3jsTwsx7TvXHWfJ-m3IK2X0",
      "Resumo":"https://drive.google.com/drive/folders/1MoELQ-e-Gyjt0nGWdSSxcdGjjMcXEmYQ",
    },
    atlas:null, thea:null
  },
  {
    name:"PIC II",
    folder:null,
    links:{},
    atlas:null, thea:null
  },
];

/* TODO Rafael: troque pelo link do seu Instagram (@rafaelm.md) antes de publicar. */
const IG_URL = "https://instagram.com/SEU_USUARIO_AQUI";
