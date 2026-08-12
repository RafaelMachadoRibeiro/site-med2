/* ======================================================================
   Desincentivo simples contra inspeção casual do código.
   Isso NÃO esconde o código de verdade — dá pra ver via view-source:,
   curl, menu do navegador, com JS desabilitado, etc. Serve só pra
   brincar com quem tenta botão direito / F12 no automático.
   ====================================================================== */

const NOINSPECT_MESSAGE = "Você é muito espertinho, aqui uma lola pra você! 🍭";

function noinspectShowToast(){
  const el = document.createElement("div");
  el.textContent = NOINSPECT_MESSAGE;
  el.style.cssText = [
    "position:fixed", "bottom:20px", "right:20px", "z-index:99999",
    "background:#E4032E", "color:#fff", "padding:14px 22px",
    "border-radius:10px", "font-family:'IBM Plex Sans',sans-serif",
    "font-size:14px", "font-weight:600", "box-shadow:0 8px 24px rgba(0,0,0,.4)",
    "max-width:280px",
  ].join(";");
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  noinspectShowToast();
});

document.addEventListener("keydown", (e) => {
  const key = e.key ? e.key.toUpperCase() : "";
  const blocked =
    key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(key)) ||
    (e.ctrlKey && key === "U");

  if (blocked) {
    e.preventDefault();
    noinspectShowToast();
  }
});

console.log(
  "%c" + NOINSPECT_MESSAGE,
  "font-size:18px; font-weight:bold; color:#E4032E; background:#0A100E; padding:10px 16px; border-radius:8px;"
);
