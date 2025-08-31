const VALID_IDS = new Set([
  "DPA-SMM-2025-0001",
  "DPA-AI-2025-0007",
  "DPA-DGT-2025-0103",
  "DPA-PRO-2025-0025"
]);

const form = document.getElementById('verify-form');
const input = document.getElementById('cert-id');
const out = document.getElementById('verify-result');

const PATTERN = /^DPA-[A-Z]{2,4}-20\d{2}-\d{4}$/;

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const raw = (input.value || "").trim().toUpperCase().replace(/[–—]/g,'-');
  if (!PATTERN.test(raw)){
    out.className = "verify-result error";
    out.textContent = "Невірний формат ID. Приклад: DPA-SMM-2025-0001";
    return;
  }
  if (VALID_IDS.has(raw)){
    const course = raw.split('-')[1];
    out.className = "verify-result ok";
    out.innerHTML = `✅ Сертифікат <b>${raw}</b> знайдено. Курс: <b>${course}</b>. Статус: дійсний.`;
  } else {
    out.className = "verify-result warn";
    out.textContent = "Сертифікат з таким ID не знайдено. Перевірте номер або зверніться до адміністратора.";
  }
});
