// Допустимі приклади (демо). Пізніше можна підключити реальну базу.
const VALID_IDS = new Set([
  "DPA-SMM-2025-0001",
  "DPA-AI-2025-0007",
  "DPA-DGT-2025-0103",
  "DPA-PRO-2025-0025"
]);

const FORM = document.getElementById('verify-form');
const INPUT = document.getElementById('cert-id');
const OUT = document.getElementById('verify-result');

// Патерн: DPA-XXX-YYYY-NNNN
const PATTERN = /^DPA-[A-Z]{3}-20\d{2}-\d{4}$/;

FORM?.addEventListener('submit', (e) => {
  e.preventDefault();
  const raw = (INPUT.value || "").trim().toUpperCase().replace('–','-').replace('—','-');
  if (!PATTERN.test(raw)) {
    OUT.className = "verify-result error";
    OUT.textContent = "Невірний формат ID. Приклад: DPA-SMM-2025-0001";
    return;
  }
  if (VALID_IDS.has(raw)) {
    OUT.className = "verify-result ok";
    OUT.innerHTML = `✅ Сертифікат <b>${raw}</b> знайдено. Статус: дійсний. Власник: <i>Приклад користувача</i>. Курс: <b>${raw.split('-')[1]}</b>.`;
  } else {
    OUT.className = "verify-result warn";
    OUT.textContent = "Сертифікат з таким ID не знайдено. Перевірте номер або зверніться до адміністратора.";
  }
});
