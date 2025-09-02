(function () {
  const el = document.getElementById('timer');
  if (!el) return;

  const CYCLE_SEC = 24 * 60 * 60 - 1; // 23:59:59
  const KEY = 'dpa_timer_end_epoch_ms';

  function getTargetEnd() {
    const now = Date.now();
    const saved = Number(localStorage.getItem(KEY) || 0);
    if (!saved || saved <= now) {
      const end = now + CYCLE_SEC * 1000;
      localStorage.setItem(KEY, String(end));
      return end;
    }
    return saved;
  }

  let targetEnd = getTargetEnd();
  let intervalId = null;
  let rafId = null;

  const fmt = (n) => String(n).padStart(2, '0');

  function pluralUa(num, one, few, many) {
    const n = Math.abs(num);
    const d10 = n % 10, d100 = n % 100;
    if (d10 === 1 && d100 !== 11) return one;
    if (d10 >= 2 && d10 <= 4 && (d100 < 12 || d100 > 14)) return few;
    return many;
  }

  function render() {
    const now = Date.now();
    let msLeft = targetEnd - now;

    if (msLeft <= 0) {
      targetEnd = now + CYCLE_SEC * 1000;
      localStorage.setItem(KEY, String(targetEnd));
      msLeft = targetEnd - now;
    }

    const totalSec = Math.floor(msLeft / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    el.textContent = `${fmt(h)}:${fmt(m)}:${fmt(s)}`;

    // Озвучка для скрінрідерів
    const hW = pluralUa(h, 'година', 'години', 'годин');
    const mW = pluralUa(m, 'хвилина', 'хвилини', 'хвилин');
    const sW = pluralUa(s, 'секунда', 'секунди', 'секунд');
    el.setAttribute('aria-label', `Залишилось ${h} ${hW} ${m} ${mW} ${s} ${sW}`);
  }

  function tick() {
    render();
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {});
  }

  if (window.__dpaTimerInterval) clearInterval(window.__dpaTimerInterval);
  if (window.__dpaTimerRaf) cancelAnimationFrame(window.__dpaTimerRaf);

  render();
  window.__dpaTimerInterval = intervalId = setInterval(tick, 200);
  window.__dpaTimerRaf = rafId;

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      targetEnd = getTargetEnd();
      render();
    }
  });
})();
