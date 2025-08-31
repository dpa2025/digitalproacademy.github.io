// Looping countdown 31h (1 day + 7h), updates all .countdown elements
(function(){
  const targets = Array.from(document.querySelectorAll('.countdown, #countdown'));
  if (!targets.length) return;

  const DURATION = (24 + 7) * 60 * 60 * 1000; // 31h
  const KEY = 'dpa_loop31_start';

  let start = localStorage.getItem(KEY);
  if (!start){ start = Date.now().toString(); localStorage.setItem(KEY, start); }

  function pad(n){ return String(n).padStart(2,'0'); }

  function tick(){
    const now = Date.now();
    const elapsed = (now - Number(start)) % DURATION;
    const left = DURATION - elapsed;

    const h = Math.floor(left / 3_600_000);
    const m = Math.floor((left % 3_600_000) / 60_000);
    const s = Math.floor((left % 60_000) / 1000);

    const text = `${pad(h)}:${pad(m)}:${pad(s)}`;
    targets.forEach(el => el.textContent = text);

    requestAnimationFrame(tick);
  }
  tick();
})();
