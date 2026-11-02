const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

const letter = document.getElementById('letter-message');
document.getElementById('open-letter').addEventListener('click', () => {
  letter.hidden = false;
  document.getElementById('close-letter').focus();
});
function closeLetter() { letter.hidden = true; }
document.getElementById('close-letter').addEventListener('click', closeLetter);
document.getElementById('close-letter').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') closeLetter();
});
letter.addEventListener('click', (event) => { if (event.target === letter) closeLetter(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLetter(); });

let selectedCard = null;
const upload = document.getElementById('photo-upload');
document.querySelectorAll('[data-photo]').forEach((card) => {
  card.addEventListener('click', () => {
    selectedCard = card;
    upload.click();
  });
});
upload.addEventListener('change', () => {
  const file = upload.files && upload.files[0];
  if (!file || !selectedCard) return;
  if (!file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const area = selectedCard.querySelector('.photo-area');
    area.style.background = `center / cover no-repeat url("${event.target.result}")`;
    area.querySelectorAll('span, small').forEach((el) => el.style.display = 'none');
    selectedCard.setAttribute('aria-label', 'Foto personalizzata');
  };
  reader.readAsDataURL(file);
  upload.value = '';
});
