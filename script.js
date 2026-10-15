const nav = document.querySelector('.nav');
const menuButton = document.querySelector('.menu');

function setMenuOpen(isOpen) {
  nav.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

document.querySelector('.nav-backdrop').addEventListener('click', () => setMenuOpen(false));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenuOpen(false);
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  });
});

const revealTargets = document.querySelectorAll(
  '.section-label, .intro-grid, .section-head, .cards, .facility-grid, .class-list, .cta-box'
);

if ('IntersectionObserver' in window) {
  document.body.classList.add('js-motion');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(target => {
    target.classList.add('reveal');
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach(target => target.classList.add('is-visible'));
}
