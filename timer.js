/* Digital Pro Academy — cyclic countdown 23:59:59
   - тикает раз в ~200 мс с компенсацией дрифта
   - переживает перезагрузку страницы (через localStorage)
   - когда доходит до 00:00:00 — стартует заново на 23:59:59
*/
(function () {
  const el = document.getElementById('timer');
  if (!el) return;

  const CYCLE_SEC = 24 * 60 * 60 - 1;        // 23:59:59
  const KEY = 'dpa_timer_end_epoch_ms';

  // Получаем/создаём целевое время конца цикла
  function getTargetEnd() {
    const now = Date.now();
    const saved = Number(localStorage.getItem(KEY) || 0);
    // если нет сохранённого или оно в прошлом — начинаем новый цикл
    if (!saved || saved <= now) {
      const end = now + CYCLE_SEC * 1000;
      localStorage.setItem(KEY, String(end));
      return end;
    }
    return saved;
  }

  let targetEnd = getTargetEnd();
  let rafId = null;
  let intervalId = null;

  function fmt(n) { return String(n).padStart(2, '0'); }

  function render() {
    const now = Date.now();
    let msLeft = targetEnd - now;

    if (msLeft <= 0) {
      // цикл закончился — стартуем заново
      targetEnd = now + CYCLE_SEC * 1000;
      localStorage.setItem(KEY, String(targetEnd));
      msLeft = targetEnd - now;
    }

    const totalSec = Math.floor(msLeft / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    el.textContent = `${fmt(h)}:${fmt(m)}:${fmt(s)}`;
    el.setAttribute('aria-label', `Залишилось ${h} годин ${m} хвилин ${s} секунд`);
  }

  // Тикаем надёжно: интервал + рендер через rAF
  function tick() {
    render();
    rafId = requestAnimationFrame(() => {}); // держим вкладку «живой»
  }

  // Чистим предыдущие таймеры если вдруг этот файл подключили дважды
  if (window.__dpaTimerInterval) clearInterval(window.__dpaTimerInterval);
  if (window.__dpaTimerRaf) cancelAnimationFrame(window.__dpaTimerRaf);

  render();
  intervalId = setInterval(tick, 200); // 5 раз в секунду, плавно и без дрифта
  window.__dpaTimerInterval = intervalId;

  // Пересчёт при возвращении на вкладку
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      targetEnd = getTargetEnd();
      render();
    }
  });

  // Запомним последнюю rAF, чтобы можно было отменить при повторном подключении
  window.__dpaTimerRaf = rafId;
})();
