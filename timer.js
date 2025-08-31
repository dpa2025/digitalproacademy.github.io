(function () {
  const box = document.getElementById('timer');
  if (!box) return;
  const START = 24 * 60 * 60 - 1; // 23:59:59
  let t = START;
  function render() {
    const h = String(Math.floor(t / 3600)).padStart(2, '0');
    const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
    const s = String(t % 60).padStart(2, '0');
    box.textContent = `${h}:${m}:${s}`;
    t = t <= 0 ? START : t - 1;
  }
  render();
  setInterval(render, 1000);
})();

