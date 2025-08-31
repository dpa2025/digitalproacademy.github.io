document.getElementById('contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = fd.get('name');
  const email = fd.get('email');
  const subject = fd.get('subject');
  const message = fd.get('message');

  const to = 'hello.digitalproacademy@gmail.com';

  const body = [
    `Ім'я: ${name}`,
    `Email: ${email}`,
    '',
    `${message}`
  ].join('%0D%0A');

  const link = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
  const status = document.getElementById('contact-status');
  status.textContent = 'Відкриваємо ваш поштовий клієнт…';
  window.location.href = link;
});
