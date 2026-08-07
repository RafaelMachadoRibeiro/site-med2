/* ======================================================================
   DADOS DO SITE — Turma III (Medicina Multivix Serra)
   Edite este arquivo para atualizar horário, materiais, provas e Instagram.
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
    {time:"17:00 - 19:00", subj:"Casos Clínicos Integrados II", meta:"Prática · Grupo 1 · Centro de Simulação Realística, MTVX Vitória · Profº Marlon", group:[1],
      dates:["28/07/2026","25/08/2026","22/09/2026","20/10/2026","17/11/2026"]},
    {time:"17:00 - 19:00", subj:"Casos Clínicos Integrados II", meta:"Prática · Grupo 2 · Centro de Simulação Realística, MTVX Vitória · Profº Marlon", group:[2],
      dates:["04/08/2026","01/09/2026","29/09/2026","27/10/2026","24/11/2026"]},
    {time:"17:00 - 19:00", subj:"Casos Clínicos Integrados II", meta:"Prática · Grupo 3 · Centro de Simulação Realística, MTVX Vitória · Profº Marlon", group:[3],
      dates:["11/08/2026","08/09/2026","06/10/2026","03/11/2026","01/12/2026"]},
  ],
  "Quarta": [
    {time:"08:00 - 10:00", subj:"Imunologia", meta:"Teórica · Todos"},
    {time:"10:00 - 12:00", subj:"Anatomia II", meta:"Teórica · Todos"},
    {time:"13:00 - 14:30", subj:"Anatomia II", meta:"Prática · Grupo 1", group:[1]},
    {time:"13:00 - 14:30", subj:"Histologia II", meta:"Prática · Grupo 3", group:[3]},
    {time:"14:30 - 16:00", subj:"Histologia II", meta:"Prática · Grupo 1", group:[1]},
    {time:"14:30 - 16:00", subj:"Anatomia II", meta:"Prática · Grupo 2", group:[2]},
    {time:"16:00 - 17:30", subj:"Histologia II", meta:"Prática · Grupo 2", group:[2]},
    {time:"16:00 - 17:30", subj:"Anatomia II", meta:"Prática · Grupo 3", group:[3]},
  ],
  "Quinta": [
    {time:"09:00 - 11:00", subj:"Atenção Primária à Saúde II", meta:"Prática · Aula excepcional em sala · Centro Universitário Multivix Serra (não é na UBS) · Todos os grupos",
      dates:["30/07/2026"]},
    {time:"08:00 - 12:00", subj:"APS II (prática)", meta:"UAPS Jardim Carapina · Grupo 1 · Profª Ingred Lopes da Costa", group:[1],
      dates:["06/08/2026","20/08/2026","03/09/2026","17/09/2026","01/10/2026","29/10/2026","12/11/2026"]},
    {time:"08:00 - 12:00", subj:"APS II (prática)", meta:"UAPS Jardim Carapina · Grupo 2 · Profª Ingred Lopes da Costa", group:[2],
      dates:["13/08/2026","27/08/2026","10/09/2026","08/10/2026","22/10/2026","05/11/2026","19/11/2026"]},
    {time:"08:00 - 12:00", subj:"APS II (prática)", meta:"UAPS Central Carapina · Grupo 3 · Profª Fabiana de Oliveira Moreira", group:[3],
      dates:["06/08/2026","20/08/2026","03/09/2026","17/09/2026","01/10/2026","29/10/2026","12/11/2026"]},
    {time:"08:00 - 12:00", subj:"APS II (prática)", meta:"UAPS Central Carapina · Grupo 4 · Profª Fabiana de Oliveira Moreira", group:[4],
      dates:["13/08/2026","27/08/2026","10/09/2026","08/10/2026","22/10/2026","05/11/2026","19/11/2026"]},
    {time:"08:00 - 12:00", subj:"APS II (prática)", meta:"UBS Jardim Tropical · Grupo 5 · Profª Grace Kelly da Silva Dorado", group:[5],
      dates:["06/08/2026","20/08/2026","03/09/2026","17/09/2026","01/10/2026","29/10/2026","12/11/2026"]},
    {time:"08:00 - 12:00", subj:"APS II (prática)", meta:"UBS Jardim Tropical · Grupo 6 · Profª Grace Kelly da Silva Dorado", group:[6],
      dates:["13/08/2026","27/08/2026","10/09/2026","08/10/2026","22/10/2026","05/11/2026","19/11/2026"]},
    {time:"08:00 - 12:00", subj:"APS II (prática)", meta:"UBS Nova Carapina II · Grupo 7 · Profª Evellyn Rodrigues Cordeiro", group:[7],
      dates:["06/08/2026","20/08/2026","03/09/2026","17/09/2026","01/10/2026","29/10/2026","12/11/2026"]},
    {time:"08:00 - 12:00", subj:"APS II (prática)", meta:"UBS Nova Carapina II · Grupo 8 · Profª Evellyn Rodrigues Cordeiro", group:[8],
      dates:["13/08/2026","27/08/2026","10/09/2026","08/10/2026","22/10/2026","05/11/2026","19/11/2026"]},
    {time:"08:00 - 12:00", subj:"APS II (prática)", meta:"UBS Vila Nova de Colares · Grupo 9 · Profª Nilceia Dadalto Squassante", group:[9],
      dates:["06/08/2026","20/08/2026","03/09/2026","17/09/2026","01/10/2026","29/10/2026","12/11/2026"]},
    {time:"08:00 - 12:00", subj:"APS II (prática)", meta:"UBS Vila Nova de Colares · Grupo 10 · Profª Nilceia Dadalto Squassante", group:[10],
      dates:["13/08/2026","27/08/2026","10/09/2026","08/10/2026","22/10/2026","05/11/2026","19/11/2026"]},
    {time:"13:00 - 15:00", subj:"Semiologia II", meta:"Teórica · Todos"},
    {time:"15:10 - 18:10", subj:"Semiologia II", meta:"Prática · Grupo 1 · Profº Isaac", group:[1]},
    {time:"15:10 - 18:10", subj:"Semiologia II", meta:"Prática · Grupo 2 · Profº Marlon", group:[2]},
    {time:"15:10 - 18:10", subj:"Semiologia II", meta:"Prática · Grupo 4 · Profª Alessandra", group:[4]},
    {time:"16:30 - 19:30", subj:"Semiologia II", meta:"Prática · Grupo 3 · Profº Lucas", group:[3]},
  ],
  "Sexta": [],
};

/* Provas bimestrais, substitutivas e finais — 2º MED (2026/2).
   Usado na seção "Calendário de provas". Ordenado por data na hora de exibir. */
const EXAMS = [
  // Bimestrais
  {date:"18/09/2026", subj:"Bioestatística", tipo:"Cognitiva (AC)", fase:"1º Bimestre", time:"09:00 - 11:00"},
  {date:"18/09/2026", subj:"Imunologia", tipo:"Avaliação", fase:"1º Bimestre", time:"13:00 - 15:00"},
  {date:"19/09/2026", subj:"Anatomia II", tipo:"Cognitiva (AC)", fase:"1º Bimestre", time:"08:00 - 10:00"},
  {date:"21/09/2026", subj:"Histologia II", tipo:"Cognitiva (AC)", fase:"1º Bimestre", time:"09:00 - 11:00"},
  {date:"21/09/2026", subj:"Atenção Primária à Saúde II", tipo:"Cognitiva (AC)", fase:"1º Bimestre", time:"13:00 - 15:00"},
  {date:"22/09/2026", subj:"Fisiologia II", tipo:"Cognitiva (AC)", fase:"1º Bimestre", time:"13:00 - 15:00"},
  {date:"23/09/2026", subj:"Anatomia II", tipo:"Prática (Habilidades)", fase:"1º Bimestre", time:"13:00 - 17:00"},
  {date:"23/09/2026", subj:"Histologia II", tipo:"Prática (Habilidades)", fase:"1º Bimestre", time:"13:00 - 17:00"},
  {date:"24/09/2026", subj:"Semiologia II", tipo:"Prática (OSCE)", fase:"1º Bimestre", time:"13:00 - 17:00"},
  {date:"25/09/2026", subj:"Embriologia II", tipo:"Cognitiva (AC)", fase:"1º Bimestre", time:"13:00 - 15:00"},
  {date:"25/09/2026", subj:"Semiologia II", tipo:"Cognitiva (AC)", fase:"1º Bimestre", time:"09:00 - 11:00"},
  {date:"26/09/2026", subj:"Genética", tipo:"Cognitiva (AC)", fase:"1º Bimestre", time:"08:00 - 10:00"},
  {date:"24/11/2026", subj:"Fisiologia II", tipo:"Cognitiva (AC)", fase:"2º Bimestre", time:"13:00 - 15:00"},
  {date:"24/11/2026", subj:"Histologia II", tipo:"Cognitiva (AC)", fase:"2º Bimestre", time:"09:00 - 11:00"},
  {date:"25/11/2026", subj:"Anatomia II", tipo:"Prática (Habilidades)", fase:"2º Bimestre", time:"13:00 - 17:00"},
  {date:"25/11/2026", subj:"Histologia II", tipo:"Prática (Habilidades)", fase:"2º Bimestre", time:"13:00 - 17:00"},
  {date:"26/11/2026", subj:"Semiologia II", tipo:"Prática (OSCE)", fase:"2º Bimestre", time:"13:00 - 17:00"},
  {date:"27/11/2026", subj:"Atenção Primária à Saúde II", tipo:"Cognitiva (AC)", fase:"2º Bimestre", time:"13:00 - 15:00"},
  {date:"27/11/2026", subj:"Semiologia II", tipo:"Cognitiva (AC)", fase:"2º Bimestre", time:"09:00 - 11:00"},
  {date:"28/11/2026", subj:"Anatomia II", tipo:"Cognitiva (AC)", fase:"2º Bimestre", time:"08:00 - 10:00"},
  {date:"30/11/2026", subj:"Bioestatística", tipo:"Cognitiva (AC)", fase:"2º Bimestre", time:"13:00 - 15:00"},
  {date:"01/12/2026", subj:"Embriologia II", tipo:"Cognitiva (AC)", fase:"2º Bimestre", time:"09:00 - 11:00"},
  {date:"01/12/2026", subj:"Genética", tipo:"Cognitiva (AC)", fase:"2º Bimestre", time:"13:00 - 15:00"},
  {date:"02/12/2026", subj:"Imunologia", tipo:"Avaliação", fase:"2º Bimestre", time:"09:00 - 11:00"},
  // Substitutivas
  {date:"08/12/2026", subj:"Anatomia II", tipo:"Cognitiva (AC)", fase:"Substitutiva", time:"08:00 - 12:00"},
  {date:"08/12/2026", subj:"Anatomia II", tipo:"Prática (Habilidades)", fase:"Substitutiva", time:"13:00 - 15:00"},
  {date:"08/12/2026", subj:"Histologia II", tipo:"Prática (Habilidades)", fase:"Substitutiva", time:"08:00 - 12:00"},
  {date:"08/12/2026", subj:"Semiologia II", tipo:"Cognitiva (AC)", fase:"Substitutiva", time:"16:00 - 18:00"},
  {date:"09/12/2026", subj:"Bioestatística", tipo:"Cognitiva (AC)", fase:"Substitutiva", time:"08:00 - 10:00"},
  {date:"09/12/2026", subj:"Embriologia II", tipo:"Cognitiva (AC)", fase:"Substitutiva", time:"11:00 - 13:00"},
  {date:"09/12/2026", subj:"Fisiologia II", tipo:"Cognitiva (AC)", fase:"Substitutiva", time:"15:00 - 17:00"},
  {date:"09/12/2026", subj:"Semiologia II", tipo:"Prática (OSCE)", fase:"Substitutiva", time:"13:00 - 15:00"},
  {date:"10/12/2026", subj:"Genética", tipo:"Cognitiva (AC)", fase:"Substitutiva", time:"08:00 - 10:00"},
  {date:"10/12/2026", subj:"Histologia II", tipo:"Cognitiva (AC)", fase:"Substitutiva", time:"11:00 - 13:00"},
  {date:"10/12/2026", subj:"Imunologia", tipo:"Avaliação", fase:"Substitutiva", time:"15:00 - 17:00"},
  {date:"10/12/2026", subj:"Atenção Primária à Saúde II", tipo:"Cognitiva (AC)", fase:"Substitutiva", time:"18:00 - 20:00"},
  // Finais
  {date:"16/12/2026", subj:"Atenção Primária à Saúde II", tipo:"Cognitiva (AC)", fase:"Final", time:"08:00 - 10:00"},
  {date:"16/12/2026", subj:"Genética", tipo:"Cognitiva (AC)", fase:"Final", time:"11:00 - 13:00"},
  {date:"16/12/2026", subj:"Semiologia II", tipo:"Prática (OSCE)", fase:"Final", time:"13:00 - 15:00"},
  {date:"17/12/2026", subj:"Anatomia II", tipo:"Prática (Habilidades)", fase:"Final", time:"08:00 - 12:00"},
  {date:"17/12/2026", subj:"Histologia II", tipo:"Prática (Habilidades)", fase:"Final", time:"08:00 - 12:00"},
  {date:"17/12/2026", subj:"Histologia II", tipo:"Cognitiva (AC)", fase:"Final", time:"14:00 - 16:00"},
  {date:"18/12/2026", subj:"Anatomia II", tipo:"Cognitiva (AC)", fase:"Final", time:"08:00 - 10:00"},
  {date:"18/12/2026", subj:"Bioestatística", tipo:"Cognitiva (AC)", fase:"Final", time:"16:00 - 18:00"},
  {date:"18/12/2026", subj:"Embriologia II", tipo:"Cognitiva (AC)", fase:"Final", time:"13:00 - 15:00"},
  {date:"21/12/2026", subj:"Fisiologia II", tipo:"Cognitiva (AC)", fase:"Final", time:"08:00 - 10:00"},
  {date:"21/12/2026", subj:"Imunologia", tipo:"Avaliação", fase:"Final", time:"13:00 - 15:00"},
  {date:"21/12/2026", subj:"Semiologia II", tipo:"Cognitiva (AC)", fase:"Final", time:"16:00 - 18:00"},
];

/* Opções de grupo por matéria, usadas no painel "Meus grupos e dispensas".
   O valor escolhido pelo aluno é comparado com o array "group" de cada aula acima. */
const GROUP_OPTIONS = {
  "Anatomia II": [
    {value:1, label:"Grupo 1"},
    {value:2, label:"Grupo 2"},
    {value:3, label:"Grupo 3"},
  ],
  "Histologia II": [
    {value:1, label:"Grupo 1"},
    {value:2, label:"Grupo 2"},
    {value:3, label:"Grupo 3"},
  ],
  "Semiologia II": [
    {value:1, label:"Grupo 1 · Profº Isaac"},
    {value:2, label:"Grupo 2 · Profº Marlon"},
    {value:3, label:"Grupo 3 · Profº Lucas"},
    {value:4, label:"Grupo 4 · Profª Alessandra"},
  ],
  "Casos Clínicos Integrados II": [
    {value:1, label:"Grupo 1"},
    {value:2, label:"Grupo 2"},
    {value:3, label:"Grupo 3"},
  ],
  "APS II (prática)": [
    {value:1, label:"Grupo 1 · UAPS Jardim Carapina"},
    {value:2, label:"Grupo 2 · UAPS Jardim Carapina"},
    {value:3, label:"Grupo 3 · UAPS Central Carapina"},
    {value:4, label:"Grupo 4 · UAPS Central Carapina"},
    {value:5, label:"Grupo 5 · UBS Jardim Tropical"},
    {value:6, label:"Grupo 6 · UBS Jardim Tropical"},
    {value:7, label:"Grupo 7 · UBS Nova Carapina II"},
    {value:8, label:"Grupo 8 · UBS Nova Carapina II"},
    {value:9, label:"Grupo 9 · UBS Vila Nova de Colares"},
    {value:10, label:"Grupo 10 · UBS Vila Nova de Colares"},
  ],
};

/* Chave da API do Google Drive (somente leitura), usada para abrir as pastas
   dentro do próprio site e baixar arquivos direto, sem aparentar o Drive.
   Sem essa chave, os botões de pasta/material caem no link normal do Drive.
   Veja no README como gerar a sua chave gratuita no Google Cloud Console. */
const DRIVE_API_KEY = "AIzaSyBg4EQTPxhZiMfj8Y--zB1W5WfJ94o6hSc";

/* Materiais por matéria (pastas do Google Drive).
   Cada item de "links" vira um botão que abre a pasta dentro do site.
   Um valor null aparece como "em breve" desabilitado — troque pelo link
   quando tiver. "atlas" só existe em Anatomia II e Histologia II. */
const SUBJECTS = [
  {
    name:"Anatomia II",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1uYcv4C_eOYrhnry49W3rYW9s-TKbE7cY",
      "Resumo":"https://drive.google.com/drive/folders/1M8qDjioakSaekXN0bainQaMUsRRhFsIc",
      "Anotações de Aula":"https://drive.google.com/drive/folders/1-uKE90T0kJgcB7hstxjUnIK18LjLJiKI",
      "Prática":"https://drive.google.com/drive/folders/1Es2N0aTyMWzKybgRTFyC_OU2RDBS4Hsa",
      "Provas antigas": "https://drive.google.com/drive/folders/1Q4LfT9q2WXePC2DOHNDOnwCuYTET-mnd",
    },
    atlas:null, thea:"https://www.thea.study/classes/16663538/copy?signature=f3b5a2e0bf09ed81422a7f80e416cb925690a2ee06f7ae50c8612006c3337dbd"
  },
  {
    name:"Histologia II",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1Ke2NAXbznjvGQK7L7KZXQ0i0QHWCIe4P",
      "Resumo":"https://drive.google.com/drive/folders/14xXX5PTvG5nqrWSRo0Kl437zdsmN4y03",
      "Anotações de Aula":"https://drive.google.com/drive/folders/1l8TQcBTF6Gfrccis5IZROqQ5itpfIEqd",
      "Prática":"https://drive.google.com/drive/folders/1ib9sv6KZd6_9HY0rgm_VcZx-VF_BQyWd",
      "Provas antigas": "https://drive.google.com/drive/folders/1IbWRPnMXRQ-vLd2EjgmnwJbgTYfjXAXr",
    },
    atlas:null, thea:"https://www.thea.study/classes/16645150/copy?signature=ae6b955365ca7445b24492c67677bd38d1872ff1fabb135931e97ed674290b4c"
  },
  {
    name:"Semiologia II",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1SsKvhMfZJHEMdmCuBIyChATcpxl8vA_L",
      "Pré Aula":"https://drive.google.com/drive/folders/1Ea__IF9eoHrsjcRuwSTr0Td8ZBzTNAPp",
      "Resumo":"https://drive.google.com/drive/folders/1MTLjFt5dJyvwpsCiquJPQSINBrQoTKhZ",
      "Anotações de Aula":"https://drive.google.com/drive/folders/1Xn0_Csy1KEWVrtDsTs5ewrG0rcq3ZPMJ",
      "Prática":"https://drive.google.com/drive/folders/1dYzHXfAQT8UXTKtO4sTqRSkd0euxawrI",
      "Provas antigas": "https://drive.google.com/drive/folders/1ywu1XxiOdne6jmiSgRCsCbop-YzZ7XIW",
    },
    atlas:null, thea:"https://www.thea.study/classes/15364442/copy?signature=68e84137a918b147ca83174c8ec3a0e7514369f6e52fe19ea3cb43ec5cd18422"
  },
  {
    name:"Imunologia",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1qk4ClsnKp7TSc6BdlZroNMEX2ELiSgL8",
      "Resumo":"https://drive.google.com/drive/folders/1bpDOtrofhB72Mjf512_DAOmq6QyID-Hu",
      "Anotações de Aula":"https://drive.google.com/drive/folders/1U7fJdvB466d54sQxwokH4Srzju-rCUuP",
      "Provas antigas": "https://drive.google.com/drive/folders/1w6JXyb9RIVOZCeg1t-2erBj0YgsRI66K",
    },
    thea:"https://www.thea.study/classes/16663430/copy?signature=59d73fc18ae363a20ecb5ed37919ff3b0c6ba2f8c04bbbfadaf1f3e8197ecfc8"
  },
  {
    name:"Fisiologia II",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1XXPTv-fEGzpYB7Bj2HplUh8Ojb44Cw8D",
      "Resumo":"https://drive.google.com/drive/folders/1kYf1Rt0KmaDSKZdy1SSoDv9U9P5VriUT",
      "Anotações de Aula":"https://drive.google.com/drive/folders/1dmvfLs9VO_PqhA3SkFMqLr27YNnp3x19",
      "Provas antigas": "https://drive.google.com/drive/folders/1aBuxQuj4N1pkwUFVPGaI_siGfeLoFovt",
    },
    thea:"https://www.thea.study/classes/16784693/copy?signature=a8f3c67401f48430915826e6117e5509a9b4442c3d91f7aa044df7031cd7f5dc"
  },
  {
    name:"Embriologia II",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1QBocm_mApfYaDs1DHBrkc6OWn6GV9935",
      "Resumo":"https://drive.google.com/drive/folders/1-HULds7DFiTm1T1IvYvxeMOLS56IIVyA",
      "Anotações de Aula":"https://drive.google.com/drive/folders/1SdPKxDmwfUuHrRCia9GAOEyqbFs-fkJ3",
    },
    thea:"https://www.thea.study/classes/16784640/copy?signature=ee464246309f2cbfdaff1ce46d1d3c458d811a77ace7e1e9cf6ba5323ae8d8d1"
  },
  {
    name:"Genética",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1Qmfohtg8qavwmbezqbXtrI9e5n1ImF8y",
      "Resumo":"https://drive.google.com/drive/folders/1eqh_78w8Xqoq-oaRQXXN4-DzPCKRKhIp",
      "Anotações de Aula":"https://drive.google.com/drive/folders/1Ev0Dxml792Cdtkm6peeJr4A9XfZWYm3U",
      "Provas antigas": "https://drive.google.com/drive/folders/1AdQ5WbLCleeP1yu6rFP8KHtt6NsNfWja",
    },
    thea:"https://www.thea.study/classes/16757208/copy?signature=85fb5dd428bbb5b87980750e1c4a72136378d36c3695b14ee52512fce64538cb"
  },
  {
    name:"Bioestatística",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1_p5Okn8hoWoFwap2gIpw6bCJ9gVm3OND",
      "Material":"https://drive.google.com/drive/folders/1DHIgTET-CFQfRnuii6ZurAAD5HTZgO2a",
      "Resumo":"https://drive.google.com/drive/folders/1RX-wtNLS4bT0mPmegnLElpYXNOMNLco-",
      "Provas antigas": "https://drive.google.com/drive/folders/1FrieUBWAJqQZGGuoVI2vawXvxN19OYih",
    },
    thea:null
  },
  {
    name:"APS II",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1OOMcB_Ij3V9mnDNMvk_qQ7kMUOpeXrGV",
      "Anotações de Aula":"https://drive.google.com/drive/folders/1q8gXTVArteCuveYQ6LXx5ObLqCSHINf5",
      "Resumo":"https://drive.google.com/drive/folders/1lf-FUh6V-Ho83elQHg1Xth5JmTA9n_Uh",
      "Provas antigas": "https://drive.google.com/drive/folders/1D3-xYUcPzuHuPDnZGvisAz429bS3f9aT",
    },
    thea:"https://www.thea.study/classes/16613061/copy?signature=534d7998a55f1f08e98ec6021b2469d9587c6a897cb840111eb662c41b19ae30"
  },
  {
    name:"Casos Clínicos Integrados II",
    links:{
      "Slides":"https://drive.google.com/drive/folders/16KDH79ZFqK9njG0-aIuvfVaA2a_EbtQi",
      "Resumo":"https://drive.google.com/drive/folders/1_b1bXjRQDyX3x5oVCoLCMS1bB_6hGICn",
      "Prática":"https://drive.google.com/drive/folders/1_o45PXzLdwBJP99rQoky8SCjkieQSrLL",
      "Provas antigas": null,
    },
    thea:null
  },
  {
    name:"Humanidades II",
    links:{
      "Slides":"https://drive.google.com/drive/folders/1TRek7OLPh3jsTwsx7TvXHWfJ-m3IK2X0",
      "Resumo":"https://drive.google.com/drive/folders/1MoELQ-e-Gyjt0nGWdSSxcdGjjMcXEmYQ",
      "Provas antigas": null,
    },
    thea:null
  },
  {
    name:"PIC II",
    links:{
      "Provas antigas": null,
    },
    thea:null
  },
];

const IG_URL = "https://instagram.com/rafaelm.md";
