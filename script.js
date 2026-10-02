/* No dependencies. All editable words and image paths are in content.js. */
(() => {
  'use strict';
  const content = window.GIFT_CONTENT;
  if (!content) return;
  const text = (selector, value) => document.querySelectorAll(selector).forEach(el => { el.textContent = String(value ?? ''); });
  text('[data-name]', content.name);
  text('[data-year]', content.graduationYear);
  Object.entries(content.chapters || {}).forEach(([key, value]) => text(`[data-copy="${key}"]`, value));
  document.title = "Proud Of You ❤️";
  document.querySelectorAll('img[data-photo]').forEach(img => {
    const path = content.photos?.[img.dataset.photo];
    if (path) img.src = path;
  });
  const paragraphs = document.getElementById('letter-paragraphs');
  paragraphs.replaceChildren();
  (content.letter || []).forEach(paragraph => {
    if (!paragraph.trim()) return;
    const p = document.createElement('p');
    p.textContent = paragraph;
    paragraphs.append(p);
  });
  const signOff = document.getElementById('letter-signoff');
  signOff.textContent = content.signOff || '';
  signOff.hidden = !content.signOff;
  const dayPhoto = document.getElementById('graduation-day-photo');
  const dayFigure = document.getElementById('day-real-photo');
  const dayPlaceholder = document.getElementById('day-placeholder');
  let dayResolved = false;
  const showGraduationDay = () => {
    if (dayResolved || !dayPhoto.naturalWidth) return;
    dayResolved = true;
    dayFigure.hidden = false;
    dayPlaceholder.hidden = true;
    document.querySelector('[data-day-before]').hidden = true;
    document.querySelector('[data-day-after]').hidden = false;
    // Keep Chapter 5's bonus-photo message unchanged when the couple photo loads.
  };
  dayPhoto.addEventListener('load', showGraduationDay);
  dayPhoto.addEventListener('error', () => { dayPhoto.removeAttribute('src'); });
  if (content.photos?.graduationDay) dayPhoto.src = content.photos.graduationDay;
  if (dayPhoto.complete && dayPhoto.naturalWidth) showGraduationDay();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.07, rootMargin: '0px 0px -25px 0px' });
    reveals.forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
  }
  const header = document.getElementById('site-header');
  const progress = document.getElementById('reading-progress');
  let scrollTicking = false;
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
    header.classList.toggle('scrolled', window.scrollY > 38);
    scrollTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollTicking) { window.requestAnimationFrame(updateScroll); scrollTicking = true; }
  }, { passive: true });
  updateScroll();
  const layer = document.getElementById('confetti-layer');
  const button = document.getElementById('celebrate-button');
  let lastBurst = 0;
  const colors = ['#e9c785', '#f8e8c4', '#cf9b86', '#fff8e8', '#d4af75'];
  const celebrate = (source = 'auto') => {
    if (reduceMotion || document.hidden || (source !== 'button' && Date.now() - lastBurst < 1800)) return;
    lastBurst = Date.now();
    layer.replaceChildren();
    const origin = source === 'button'
      ? Math.max(0, button.getBoundingClientRect().top - layer.getBoundingClientRect().top - 190)
      : 30;
    for (let i = 0; i < 28; i++) {
      const piece = document.createElement('i');
      piece.className = 'confetti-piece';
      piece.style.setProperty('--x', `${Math.round(Math.random() * 100)}%`);
      piece.style.setProperty('--origin', `${Math.round(origin)}px`);
      piece.style.setProperty('--dx', `${Math.round((Math.random() - 0.5) * 180)}px`);
      piece.style.setProperty('--duration', `${(2.2 + Math.random() * 1.2).toFixed(2)}s`);
      piece.style.setProperty('--delay', `${(Math.random() * 0.35).toFixed(2)}s`);
      piece.style.setProperty('--spin', `${Math.round(Math.random() * 680 - 340)}deg`);
      piece.style.backgroundColor = colors[i % colors.length];
      layer.append(piece);
      piece.addEventListener('animationend', () => piece.remove(), { once: true });
    }
  };
  button.addEventListener('click', () => celebrate('button'));
  if ('IntersectionObserver' in window && !reduceMotion) {
    let celebrated = false;
    const gradObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting) && !celebrated) {
        celebrated = true;
        window.setTimeout(() => celebrate('auto'), 350);
        gradObserver.disconnect();
      }
    }, { threshold: 0.3 });
    gradObserver.observe(document.getElementById('graduation'));
  }
})();