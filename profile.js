/* ======================================================================
   PERFIL DO ALUNO — grupos e dispensas
   Cada aluno configura, no próprio navegador (localStorage), qual grupo
   ele é em cada matéria com prática e quais matérias já dispensou.
   Isso filtra o que aparece em "Hoje" e "Semana completa".
   ====================================================================== */

const PROFILE_KEY = "turma2_profile_v1";

function profileLoad() {
  const raw = JSON.parse(localStorage.getItem(PROFILE_KEY));
  return {
    groups: (raw && raw.groups) || {},
    dispensed: (raw && raw.dispensed) || [],
  };
}

function profileSave(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function profileAllSubjects() {
  const set = new Set();
  Object.values(SCHEDULE).forEach(day => day.forEach(block => set.add(block.subj)));
  return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function profileBlockVisible(block) {
  const profile = profileLoad();
  if (profile.dispensed.includes(block.subj)) return false;
  if (block.group && profile.groups[block.subj]) {
    return block.group.includes(profile.groups[block.subj]);
  }
  return true;
}

function profileTodayDateStr() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${now.getFullYear()}`;
}

function profileBlockIsToday(block) {
  if (!block.dates) return true;
  return block.dates.includes(profileTodayDateStr());
}

function profileRenderPanel() {
  const body = document.getElementById("profilePanelBody");
  if (!body) return;
  const profile = profileLoad();

  let groupsHTML = "";
  Object.entries(GROUP_OPTIONS).forEach(([subj, options]) => {
    const current = profile.groups[subj] || "";
    groupsHTML += `
      <div class="profile-field">
        <label>${subj}</label>
        <select data-subj="${subj}" onchange="profileOnGroupChange(this)">
          <option value="">Todos os grupos</option>
          ${options.map(o => `<option value="${o.value}" ${String(o.value) === String(current) ? "selected" : ""}>${o.label}</option>`).join("")}
        </select>
      </div>
    `;
  });

  const dispensedHTML = profileAllSubjects().map(subj => `
    <label class="profile-checkbox">
      <input type="checkbox" data-subj="${subj}" ${profile.dispensed.includes(subj) ? "checked" : ""} onchange="profileOnDispensaChange(this)">
      ${subj}
    </label>
  `).join("");

  body.innerHTML = `
    <div class="profile-section">
      <h4>Meus grupos</h4>
      <p>Escolha seu grupo nas matérias com prática. As aulas de outros grupos somem de "Hoje" e da semana.</p>
      <div class="profile-grid">${groupsHTML}</div>
    </div>
    <div class="profile-section">
      <h4>Matérias dispensadas</h4>
      <p>Marque o que você já dispensou — essas aulas somem do horário (continuam em Materiais e na Calculadora).</p>
      <div class="profile-checkbox-grid">${dispensedHTML}</div>
    </div>
  `;
}

function profileOnGroupChange(select) {
  const profile = profileLoad();
  const subj = select.dataset.subj;
  if (select.value === "") {
    delete profile.groups[subj];
  } else {
    profile.groups[subj] = Number(select.value);
  }
  profileSave(profile);
  renderHoje();
  renderWeek();
}

function profileOnDispensaChange(checkbox) {
  const profile = profileLoad();
  const subj = checkbox.dataset.subj;
  if (checkbox.checked) {
    if (!profile.dispensed.includes(subj)) profile.dispensed.push(subj);
  } else {
    profile.dispensed = profile.dispensed.filter(s => s !== subj);
  }
  profileSave(profile);
  renderHoje();
  renderWeek();
}

function profileToggle() {
  const panel = document.getElementById("profilePanel");
  const isOpen = panel.classList.toggle("open");
  if (isOpen) profileRenderPanel();
}
