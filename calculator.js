/* ======================================================================
   CALCULADORA DE NOTAS — embutida no site (2º Período · MED02IA)
   Mesmas regras da Calculadora Acadêmica: aprovação direta, recuperação
   e eixos teórico/prático. Notas ficam salvas no navegador (localStorage).
   ====================================================================== */

const CALC_DEFAULT_SUBJECTS = [
  { name: "Anatomia II - MED02IA", hasPratica: true, b1_teo: "", b1_prac: "" },
  { name: "Atenção Primária à Saúde II - MED02IA", hasPratica: false, b1_teo: "" },
  { name: "Bioestatística - MED02IA", hasPratica: false, isBioestatistica: true, b1_trabalho: "", b1_prova: "" },
  { name: "Embriologia II - MED02IA", hasPratica: false, b1_teo: "" },
  { name: "Fisiologia II - MED02IA", hasPratica: false, b1_teo: "" },
  { name: "Genética - MED02IA", hasPratica: false, b1_teo: "" },
  { name: "Histologia II - MED02IA", hasPratica: true, b1_teo: "", b1_prac: "" },
  { name: "Imunologia - MED02IA", hasPratica: false, b1_teo: "" },
  { name: "Semiologia II - MED02IA", hasPratica: true, isSemio: true, b1_teo: "", b1_vhab: "", b1_prac: "" }
];

let calcSubjects = JSON.parse(localStorage.getItem('turma2_calc_v1')) || CALC_DEFAULT_SUBJECTS;
const CALC_TARGET_MEDIA = 6.75; // Aprovação direta: 13,5 pontos no semestre (arredonda para 14)

function calcArredondarMedia(valor) {
  if (isNaN(valor) || valor === null || valor === "") return valor;
  let inteiro = Math.floor(valor);
  let decimal = Math.round((valor - inteiro) * 100);

  if (decimal >= 1 && decimal <= 24) return inteiro;
  if (decimal >= 25 && decimal <= 74) return inteiro + 0.5;
  if (decimal >= 75 && decimal <= 99) return inteiro + 1.0;
  return inteiro;
}

function calcSaveToStorage() {
  localStorage.setItem('turma2_calc_v1', JSON.stringify(calcSubjects));
}

function calcAddDependencia() {
  const nameInput = document.getElementById('calcDepNameInput');
  const hasPracInput = document.getElementById('calcDepHasPratica');
  const name = nameInput.value.trim();

  if (!name) {
    nameInput.focus();
    return;
  }

  const newSubject = { name: name, hasPratica: hasPracInput.checked, isDependencia: true, b1_teo: "" };
  if (hasPracInput.checked) newSubject.b1_prac = "";

  calcSubjects.push(newSubject);
  nameInput.value = "";
  hasPracInput.checked = false;

  calcSaveToStorage();
  calcRenderSubjects();
  calcCalculateAll();
}

function calcRemoveDependencia(index) {
  calcSubjects.splice(index, 1);
  calcSaveToStorage();
  calcRenderSubjects();
  calcCalculateAll();
}

function calcRenderSubjects() {
  const container = document.getElementById('calcSubjectsContainer');
  container.innerHTML = '';

  calcSubjects.forEach((subject, index) => {
    const card = document.createElement('div');
    card.className = 'calc-subject-card' + (subject.hasPratica ? ' has-pratica' : '');

    let bodyHTML = '';

    if (subject.hasPratica) {
      let teoInputsHTML = `
        <div class="calc-input-block">
          <label>1ºB Prova Teórica</label>
          <input type="number" step="0.01" min="0" max="10" value="${subject.b1_teo || ''}" oninput="calcUpdateField(${index}, 'b1_teo', this.value)" onblur="calcValidarNota(this)">
        </div>
        <div class="calc-input-block">
          <label>2ºB Prova Teórica</label>
          <input type="number" step="0.01" min="0" max="10" id="calc-b2-teo-${index}" placeholder="Nota" onblur="calcValidarNota(this)">
        </div>
      `;

      bodyHTML = `
        <div class="calc-track-row">
          <div class="calc-track-label">Eixo Teórico <span id="calc-status-teo-${index}" class="calc-status-badge"></span></div>
          ${teoInputsHTML}
          <div class="calc-result-block">
            <span>Precisa no 2ºB</span>
            <div class="calc-result-value" id="calc-needed-b2-teo-${index}">-</div>
          </div>
          <div class="calc-result-block">
            <span>Média Teo</span>
            <div class="calc-result-value" id="calc-media-teo-${index}">-</div>
          </div>
          <div class="calc-result-block">
            <span>Rec. Teoria</span>
            <div class="calc-result-value" id="calc-needed-rec-teo-${index}">-</div>
          </div>
        </div>

        <div class="calc-track-row">
          <div class="calc-track-label">Eixo Prático (Prova Prática) <span id="calc-status-prac-${index}" class="calc-status-badge"></span></div>
          <div class="calc-input-block">
            <label>1ºB Prova Prática</label>
            <input type="number" step="0.01" min="0" max="10" value="${subject.b1_prac || ''}" oninput="calcUpdateField(${index}, 'b1_prac', this.value)" onblur="calcValidarNota(this)">
          </div>
          <div class="calc-input-block">
            <label>2ºB Prova Prática</label>
            <input type="number" step="0.01" min="0" max="10" id="calc-b2-prac-${index}" placeholder="Nota" onblur="calcValidarNota(this)">
          </div>
          ${subject.isSemio ? `
          <div class="calc-input-block">
            <label>1ºB VHAB</label>
            <input type="number" step="0.01" min="0" max="10" value="${subject.b1_vhab || ''}" oninput="calcUpdateField(${index}, 'b1_vhab', this.value)" onblur="calcValidarNota(this)">
          </div>
          <div class="calc-input-block">
            <label>2ºB VHAB</label>
            <input type="number" step="0.01" min="0" max="10" id="calc-b2-vhab-${index}" placeholder="Nota" onblur="calcValidarNota(this)">
          </div>
          ` : ``}
          <div class="calc-result-block">
            <span>Precisa no 2ºB</span>
            <div class="calc-result-value" id="calc-needed-b2-prac-${index}">-</div>
          </div>
          <div class="calc-result-block">
            <span>Média Prac</span>
            <div class="calc-result-value" id="calc-media-prac-${index}">-</div>
          </div>
          <div class="calc-result-block">
            <span>Rec. Prática</span>
            <div class="calc-result-value" id="calc-needed-rec-prac-${index}">-</div>
          </div>
        </div>
        <div class="calc-final-score" id="calc-combined-score-${index}"></div>
      `;
    } else if (subject.isBioestatistica) {
      bodyHTML = `
        <div class="calc-track-row">
          <div class="calc-track-label">Nota do bimestre = Trabalho × 0,3 + Prova × 0,7</div>
          <div class="calc-input-block">
            <label>1ºB Trabalho</label>
            <input type="number" step="0.01" min="0" max="10" value="${subject.b1_trabalho || ''}" oninput="calcUpdateField(${index}, 'b1_trabalho', this.value)" onblur="calcValidarNota(this)">
          </div>
          <div class="calc-input-block">
            <label>1ºB Prova</label>
            <input type="number" step="0.01" min="0" max="10" value="${subject.b1_prova || ''}" oninput="calcUpdateField(${index}, 'b1_prova', this.value)" onblur="calcValidarNota(this)">
          </div>
          <div class="calc-input-block">
            <label>2ºB Trabalho</label>
            <input type="number" step="0.01" min="0" max="10" id="calc-b2-trabalho-${index}" placeholder="Nota" onblur="calcValidarNota(this)">
          </div>
          <div class="calc-input-block">
            <label>2ºB Prova</label>
            <input type="number" step="0.01" min="0" max="10" id="calc-b2-prova-${index}" placeholder="Nota" onblur="calcValidarNota(this)">
          </div>
          <div class="calc-result-block">
            <span>Precisa no 2ºB</span>
            <div class="calc-result-value" id="calc-needed-b2-teo-${index}">-</div>
          </div>
          <div class="calc-result-block">
            <span>Média Semestral</span>
            <div class="calc-result-value" id="calc-media-teo-${index}">-</div>
          </div>
          <div class="calc-result-block">
            <span>Precisa na Rec.</span>
            <div class="calc-result-value" id="calc-needed-rec-teo-${index}">-</div>
          </div>
        </div>
      `;
    } else {
      bodyHTML = `
        <div class="calc-track-row">
          <div class="calc-input-block">
            <label>1ºB Prova Teórica</label>
            <input type="number" step="0.01" min="0" max="10" value="${subject.b1_teo || ''}" oninput="calcUpdateField(${index}, 'b1_teo', this.value)" onblur="calcValidarNota(this)">
          </div>
          <div class="calc-input-block">
            <label>2ºB Prova Teórica</label>
            <input type="number" step="0.01" min="0" max="10" id="calc-b2-teo-${index}" placeholder="Nota" onblur="calcValidarNota(this)">
          </div>
          <div class="calc-result-block">
            <span>Precisa no 2ºB</span>
            <div class="calc-result-value" id="calc-needed-b2-teo-${index}">-</div>
          </div>
          <div class="calc-result-block">
            <span>Média Semestral</span>
            <div class="calc-result-value" id="calc-media-teo-${index}">-</div>
          </div>
          <div class="calc-result-block">
            <span>Precisa na Rec.</span>
            <div class="calc-result-value" id="calc-needed-rec-teo-${index}">-</div>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="calc-subject-header">
        <div class="calc-subject-title-group">
          <span class="calc-subject-title">${subject.name}</span>
          ${subject.isDependencia ? `<span class="calc-dep-badge">Dependência</span>` : ``}
        </div>
        <div class="calc-subject-actions">
          ${subject.isDependencia ? `<button class="calc-remove-btn" onclick="calcRemoveDependencia(${index})">✕ Remover</button>` : ``}
          <span id="calc-status-global-${index}" class="calc-status-badge">A avaliar</span>
        </div>
      </div>
      <div class="calc-subject-body">
        ${bodyHTML}
      </div>
    `;
    container.appendChild(card);

    if (subject.isBioestatistica) {
      document.getElementById(`calc-b2-trabalho-${index}`).addEventListener('input', () => calcCalculateAll());
      document.getElementById(`calc-b2-prova-${index}`).addEventListener('input', () => calcCalculateAll());
    } else {
      document.getElementById(`calc-b2-teo-${index}`).addEventListener('input', () => calcCalculateAll());
      if (subject.hasPratica) {
        document.getElementById(`calc-b2-prac-${index}`).addEventListener('input', () => calcCalculateAll());
        if (subject.isSemio) {
          document.getElementById(`calc-b2-vhab-${index}`).addEventListener('input', () => calcCalculateAll());
        }
      }
    }
  });
}

function calcValidarNota(input) {
  if (input.value === "") return;
  let valor = parseFloat(input.value);
  if (isNaN(valor)) { input.value = ""; return; }
  if (valor < 0) valor = 0;
  if (valor > 10) valor = 10;
  input.value = valor.toFixed(2);
}

function calcUpdateField(index, field, value) {
  if (value === "") {
    calcSubjects[index][field] = "";
    calcSaveToStorage();
    calcCalculateAll();
    return;
  }

  let nota = parseFloat(value);
  if (isNaN(nota)) return;
  if (nota < 0) nota = 0;
  if (nota > 10) nota = 10;

  calcSubjects[index][field] = nota;
  calcSaveToStorage();
  calcCalculateAll();
}

function calcGetText(id) {
  const el = document.getElementById(id);
  return el ? el.textContent.trim() || "-" : "-";
}

function calcGetInputValue(id) {
  const el = document.getElementById(id);
  return el && el.value !== "" ? parseFloat(el.value).toFixed(2) : "-";
}

function calcFormatSubjectName(name) {
  return name.replace(" - MED02IA", "");
}

function calcGetStatusClass(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("aprov") || s === "ok") return "aprovado";
  if (s.includes("reprov") || s === "rep") return "reprovado";
  if (s.includes("rec")) return "recuperacao";
  return "";
}

function calcBuildPdfReport() {
  calcCalculateAll();
  const tbody = document.getElementById("calcPdfReportBody");
  tbody.innerHTML = "";

  calcSubjects.forEach((subject, index) => {
    const rows = [];
    const subjectName = calcFormatSubjectName(subject.name);
    const globalStatus = calcGetText(`calc-status-global-${index}`);

    let b1Geral, b2Geral;
    if (subject.isBioestatistica) {
      const trabalho1 = subject.b1_trabalho !== "" && subject.b1_trabalho !== undefined ? parseFloat(subject.b1_trabalho).toFixed(2) : "-";
      const prova1 = subject.b1_prova !== "" && subject.b1_prova !== undefined ? parseFloat(subject.b1_prova).toFixed(2) : "-";
      b1Geral = `Trabalho: ${trabalho1} / Prova: ${prova1}`;
      b2Geral = `Trabalho: ${calcGetInputValue(`calc-b2-trabalho-${index}`)} / Prova: ${calcGetInputValue(`calc-b2-prova-${index}`)}`;
    } else {
      b1Geral = subject.b1_teo !== "" && subject.b1_teo !== undefined ? parseFloat(subject.b1_teo).toFixed(2) : "-";
      b2Geral = calcGetInputValue(`calc-b2-teo-${index}`);
    }

    rows.push({
      eixo: subject.hasPratica ? "Teórico" : "Geral",
      b1: b1Geral,
      b2: b2Geral,
      precisa: calcGetText(`calc-needed-b2-teo-${index}`),
      media: calcGetText(`calc-media-teo-${index}`),
      rec: calcGetText(`calc-needed-rec-teo-${index}`),
      status: subject.hasPratica ? calcGetText(`calc-status-teo-${index}`) : globalStatus
    });

    if (subject.hasPratica) {
      let b1Pratica = subject.b1_prac !== "" && subject.b1_prac !== undefined ? parseFloat(subject.b1_prac).toFixed(2) : "-";
      let b2Pratica = calcGetInputValue(`calc-b2-prac-${index}`);

      if (subject.isSemio) {
        const vhab1 = subject.b1_vhab !== "" && subject.b1_vhab !== undefined ? parseFloat(subject.b1_vhab).toFixed(2) : "-";
        const vhab2 = calcGetInputValue(`calc-b2-vhab-${index}`);
        b1Pratica = `Prática: ${b1Pratica} / VHAB: ${vhab1}`;
        b2Pratica = `Prática: ${b2Pratica} / VHAB: ${vhab2}`;
      }

      rows.push({
        eixo: subject.isSemio ? "Prático + VHAB" : "Prático",
        b1: b1Pratica,
        b2: b2Pratica,
        precisa: calcGetText(`calc-needed-b2-prac-${index}`),
        media: calcGetText(`calc-media-prac-${index}`),
        rec: calcGetText(`calc-needed-rec-prac-${index}`),
        status: calcGetText(`calc-status-prac-${index}`)
      });
    }

    rows.forEach((row, rowIndex) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        ${rowIndex === 0 ? `<td rowspan="${rows.length}"><strong>${subjectName}</strong><br><span style="color:#6b7280;font-size:8.5px;">${globalStatus}</span></td>` : ""}
        <td>${row.eixo}</td>
        <td>${row.b1}</td>
        <td>${row.b2}</td>
        <td>${row.precisa}</td>
        <td><strong>${row.media}</strong></td>
        <td>${row.rec}</td>
        <td><span class="calc-pdf-status ${calcGetStatusClass(row.status)}">${row.status || "A avaliar"}</span></td>
      `;
      tbody.appendChild(tr);
    });
  });
}

function calcExportarPDF() {
  calcBuildPdfReport();
  window.print();
}

function calcProcessTrackCalculations(b1, b2, target, neededB2El, mediaEl, neededRecEl, statusEl) {
  if (isNaN(b1)) {
    neededB2El.textContent = "-"; mediaEl.textContent = "-"; neededRecEl.textContent = "-";
    if (statusEl) { statusEl.textContent = ""; statusEl.className = "calc-status-badge"; }
    return { m: NaN, approved: false, activeSimulation: false };
  }

  let neededB2 = (target * 2) - b1;
  if (neededB2 <= 0) { neededB2El.textContent = "0.00"; neededB2El.style.color = "var(--trace)"; }
  else if (neededB2 > 10) { neededB2El.textContent = "10.00+ (Rec)"; neededB2El.style.color = "#E0574C"; }
  else { neededB2El.textContent = neededB2.toFixed(2); neededB2El.style.color = "var(--paper)"; }

  if (isNaN(b2)) {
    mediaEl.textContent = "-";
    neededRecEl.textContent = "Preencha o 2ºB";
    neededRecEl.style.color = "var(--muted)";
    if (statusEl) { statusEl.textContent = ""; statusEl.className = "calc-status-badge"; }
    return { m: NaN, approved: false, activeSimulation: false };
  }

  let projectedMedia = (b1 + b2) / 2;
  projectedMedia = calcArredondarMedia(projectedMedia);
  mediaEl.textContent = projectedMedia.toFixed(2);

  let neededRec = 11.5 - projectedMedia;
  let isApproved = projectedMedia >= target && !isNaN(b2);

  if (statusEl) {
    if (isApproved) {
      statusEl.textContent = "OK"; statusEl.className = "calc-status-badge status-aprovado";
      neededRecEl.textContent = "Não precisa"; neededRecEl.style.color = "var(--trace)";
    } else {
      statusEl.textContent = "REC"; statusEl.className = "calc-status-badge status-recuperacao";
      if (neededRec <= 0) { neededRecEl.textContent = "0.00"; neededRecEl.style.color = "var(--trace)"; }
      else if (neededRec > 10) {
        neededRecEl.textContent = "Inviável"; neededRecEl.style.color = "#E0574C";
        statusEl.textContent = "REP"; statusEl.className = "calc-status-badge status-reprovado";
      }
      else { neededRecEl.textContent = neededRec.toFixed(2); neededRecEl.style.color = "var(--amber)"; }
    }
  }
  return { m: projectedMedia, approved: isApproved, activeSimulation: !isNaN(b2) };
}

function calcCalculateAll() {
  calcSubjects.forEach((subject, index) => {
    let b1TeoFinal = NaN;
    let b2TeoFinal = NaN;
    let activeTeoSim = false;

    if (subject.isSemio) {
      let t1 = parseFloat(subject.b1_teo);
      if (!isNaN(t1)) b1TeoFinal = t1;

      let t2 = parseFloat(document.getElementById(`calc-b2-teo-${index}`).value);
      if (!isNaN(t2)) { b2TeoFinal = t2; activeTeoSim = true; }
    } else if (subject.isBioestatistica) {
      let trabalho1 = parseFloat(subject.b1_trabalho);
      let prova1 = parseFloat(subject.b1_prova);
      if (!isNaN(trabalho1) && !isNaN(prova1)) {
        b1TeoFinal = (trabalho1 * 0.3) + (prova1 * 0.7);
      }

      let trabalho2 = parseFloat(document.getElementById(`calc-b2-trabalho-${index}`).value);
      let prova2 = parseFloat(document.getElementById(`calc-b2-prova-${index}`).value);
      if (!isNaN(trabalho2) || !isNaN(prova2)) {
        b2TeoFinal = ((isNaN(trabalho2) ? 0 : trabalho2) * 0.3) + ((isNaN(prova2) ? 0 : prova2) * 0.7);
        activeTeoSim = true;
      }
    } else {
      let b1 = parseFloat(subject.b1_teo);
      if (!isNaN(b1)) b1TeoFinal = b1;

      let b2 = parseFloat(document.getElementById(`calc-b2-teo-${index}`).value);
      if (!isNaN(b2)) { b2TeoFinal = b2; activeTeoSim = true; }
    }

    const neededB2TeoEl = document.getElementById(`calc-needed-b2-teo-${index}`);
    const mediaTeoEl = document.getElementById(`calc-media-teo-${index}`);
    const neededRecTeoEl = document.getElementById(`calc-needed-rec-teo-${index}`);
    const statusGlobalEl = document.getElementById(`calc-status-global-${index}`);
    let statusTeoEl = subject.hasPratica ? document.getElementById(`calc-status-teo-${index}`) : statusGlobalEl;

    let resTeo = calcProcessTrackCalculations(b1TeoFinal, b2TeoFinal, CALC_TARGET_MEDIA, neededB2TeoEl, mediaTeoEl, neededRecTeoEl, statusTeoEl);
    if (subject.isSemio) resTeo.activeSimulation = activeTeoSim;

    if (subject.hasPratica) {
      let b1Prac = parseFloat(subject.b1_prac);
      let b2Prac = parseFloat(document.getElementById(`calc-b2-prac-${index}`).value);

      if (subject.isSemio) {
        const vhab1 = parseFloat(subject.b1_vhab);
        const vhab2Input = document.getElementById(`calc-b2-vhab-${index}`);
        const vhab2 = vhab2Input ? parseFloat(vhab2Input.value) : NaN;

        if (!isNaN(b1Prac) && !isNaN(vhab1)) {
          b1Prac = (b1Prac * 0.7) + (vhab1 * 0.3);
        } else {
          b1Prac = NaN;
        }

        if (!isNaN(b2Prac) || !isNaN(vhab2)) {
          b2Prac = ((isNaN(b2Prac) ? 0 : b2Prac) * 0.7) + ((isNaN(vhab2) ? 0 : vhab2) * 0.3);
        }
      }

      const neededB2PracEl = document.getElementById(`calc-needed-b2-prac-${index}`);
      const mediaPracEl = document.getElementById(`calc-media-prac-${index}`);
      const neededRecPracEl = document.getElementById(`calc-needed-rec-prac-${index}`);
      const statusPracEl = document.getElementById(`calc-status-prac-${index}`);
      const combinedEl = document.getElementById(`calc-combined-score-${index}`);

      let resPrac = calcProcessTrackCalculations(b1Prac, b2Prac, CALC_TARGET_MEDIA, neededB2PracEl, mediaPracEl, neededRecPracEl, statusPracEl);

      if (!isNaN(b1TeoFinal) && !isNaN(b1Prac)) {
        let hasAnySimulation = resTeo.activeSimulation || resPrac.activeSimulation;
        let finalCombined = (resTeo.m + resPrac.m) / 2;
        finalCombined = calcArredondarMedia(finalCombined);
        combinedEl.innerHTML = `Média Geral (Média Teo + Média Prac) / 2: <strong>${finalCombined.toFixed(2)}</strong>`;

        if (resTeo.approved && resPrac.approved) {
          statusGlobalEl.textContent = "Aprovado";
          statusGlobalEl.className = "calc-status-badge status-aprovado";
        } else if (hasAnySimulation) {
          if (!resTeo.approved && !resPrac.approved) {
            statusGlobalEl.textContent = "Recuperação Ambas";
          } else if (!resTeo.approved) {
            statusGlobalEl.textContent = "Recuperação Teoria";
          } else {
            statusGlobalEl.textContent = "Recuperação Prática";
          }
          statusGlobalEl.className = "calc-status-badge status-recuperacao";

          if ((11.5 - resTeo.m > 10 && resTeo.activeSimulation) || (11.5 - resPrac.m > 10 && resPrac.activeSimulation)) {
            statusGlobalEl.textContent = "Reprovado";
            statusGlobalEl.className = "calc-status-badge status-reprovado";
          }
        } else {
          statusGlobalEl.textContent = "Em avaliação";
          statusGlobalEl.className = "calc-status-badge status-recuperacao";
        }
      } else {
        statusGlobalEl.textContent = "A avaliar";
        statusGlobalEl.className = "calc-status-badge";
        combinedEl.textContent = "";
      }
    } else {
      if (!isNaN(b1TeoFinal)) {
        if (resTeo.approved) {
          statusGlobalEl.textContent = "Aprovado";
          statusGlobalEl.className = "calc-status-badge status-aprovado";
        } else if (resTeo.activeSimulation) {
          statusGlobalEl.textContent = "Recuperação";
          statusGlobalEl.className = "calc-status-badge status-recuperacao";
          if (11.5 - resTeo.m > 10) {
            statusGlobalEl.textContent = "Reprovado";
            statusGlobalEl.className = "calc-status-badge status-reprovado";
          }
        } else {
          statusGlobalEl.textContent = "Em avaliação";
          statusGlobalEl.className = "calc-status-badge status-recuperacao";
        }
      } else {
        statusGlobalEl.textContent = "A avaliar";
        statusGlobalEl.className = "calc-status-badge";
      }
    }
  });
}

calcRenderSubjects();
calcCalculateAll();
