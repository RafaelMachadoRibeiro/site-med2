/* ======================================================================
   NAVEGADOR DE PASTAS DO DRIVE — embutido no site
   Lista o conteúdo de uma pasta do Google Drive dentro de um modal do
   próprio site (via Drive API v3 + DRIVE_API_KEY) e baixa os arquivos
   direto (blob), sem abrir a interface do Drive. Sempre busca ao vivo
   na API, então fica automaticamente sincronizado com o que está na pasta.

   Sem DRIVE_API_KEY configurada, cai de volta no comportamento antigo
   (abre o link do Drive numa aba nova).
   ====================================================================== */

const DRIVE_EXPORT_MAP = {
  "application/vnd.google-apps.document": { mimeType: "application/pdf", ext: ".pdf" },
  "application/vnd.google-apps.presentation": { mimeType: "application/pdf", ext: ".pdf" },
  "application/vnd.google-apps.spreadsheet": { mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ext: ".xlsx" },
};

let driveBreadcrumb = [];

function driveExtractFolderId(url) {
  if (!url) return null;
  const match = url.match(/folders\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function driveHasKey() {
  return typeof DRIVE_API_KEY === "string" && DRIVE_API_KEY.trim() !== "";
}

async function driveListFolder(folderId) {
  const fields = "files(id,name,mimeType,size)";
  const q = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&key=${DRIVE_API_KEY}&fields=${fields}&orderBy=folder,name&pageSize=200`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Drive API respondeu ${res.status}`);
  const data = await res.json();
  return data.files || [];
}

function driveIsFolder(file) {
  return file.mimeType === "application/vnd.google-apps.folder";
}

async function driveDownloadFile(file) {
  const exportInfo = DRIVE_EXPORT_MAP[file.mimeType];
  const url = exportInfo
    ? `https://www.googleapis.com/drive/v3/files/${file.id}/export?mimeType=${encodeURIComponent(exportInfo.mimeType)}&key=${DRIVE_API_KEY}`
    : `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${DRIVE_API_KEY}`;

  const filename = exportInfo && !file.name.endsWith(exportInfo.ext)
    ? file.name + exportInfo.ext
    : file.name;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Não consegui baixar (${res.status})`);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(blobUrl), 4000);
}

function driveOpenModal(folderUrl, title) {
  if (!driveHasKey()) {
    window.open(folderUrl, "_blank", "noopener");
    return;
  }
  const folderId = driveExtractFolderId(folderUrl);
  if (!folderId) {
    window.open(folderUrl, "_blank", "noopener");
    return;
  }

  driveBreadcrumb = [{ id: folderId, name: title }];
  document.getElementById("driveModal").classList.add("open");
  driveRenderCurrentFolder();
}

function driveCloseModal() {
  document.getElementById("driveModal").classList.remove("open");
}

function driveNavigateTo(index) {
  driveBreadcrumb = driveBreadcrumb.slice(0, index + 1);
  driveRenderCurrentFolder();
}

function driveOpenSubfolder(id, name) {
  driveBreadcrumb.push({ id, name });
  driveRenderCurrentFolder();
}

async function driveRenderCurrentFolder() {
  const crumbEl = document.getElementById("driveBreadcrumb");
  const listEl = document.getElementById("driveFileList");
  const current = driveBreadcrumb[driveBreadcrumb.length - 1];

  crumbEl.innerHTML = driveBreadcrumb
    .map((c, i) => `<span class="drive-crumb" onclick="driveNavigateTo(${i})">${c.name}</span>`)
    .join('<span class="drive-crumb-sep">/</span>');

  listEl.innerHTML = `<p class="drive-loading">Carregando…</p>`;

  try {
    const files = await driveListFolder(current.id);
    if (files.length === 0) {
      listEl.innerHTML = `<p class="drive-empty">Pasta vazia.</p>`;
      return;
    }
    listEl.innerHTML = files.map(f => {
      if (driveIsFolder(f)) {
        return `
          <div class="drive-item drive-folder" onclick="driveOpenSubfolder('${f.id}', '${f.name.replace(/'/g, "\\'")}')">
            <span class="drive-icon">📁</span>
            <span class="drive-name">${f.name}</span>
            <span class="drive-arrow">→</span>
          </div>`;
      }
      return `
        <div class="drive-item drive-file" onclick="driveHandleDownloadClick(this, '${f.id}')">
          <span class="drive-icon">📄</span>
          <span class="drive-name">${f.name}</span>
          <span class="drive-download">baixar ↓</span>
        </div>`;
    }).join("");

    driveCurrentFiles = files;
  } catch (err) {
    listEl.innerHTML = `
      <p class="drive-error">
        Não consegui carregar essa pasta (${err.message}).<br>
        <a href="https://drive.google.com/drive/folders/${current.id}" target="_blank" rel="noopener">Abrir no Google Drive →</a>
      </p>`;
  }
}

let driveCurrentFiles = [];

async function driveHandleDownloadClick(el, fileId) {
  const file = driveCurrentFiles.find(f => f.id === fileId);
  if (!file) return;
  const label = el.querySelector(".drive-download");
  const original = label.textContent;
  label.textContent = "baixando…";
  try {
    await driveDownloadFile(file);
    label.textContent = "baixado ✓";
    setTimeout(() => { label.textContent = original; }, 2000);
  } catch (err) {
    label.textContent = "erro, tente de novo";
    setTimeout(() => { label.textContent = original; }, 2500);
  }
}
