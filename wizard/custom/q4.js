/* ================================================================
   SENDIT – CUSTOM Q4 JS
   ================================================================ */

const STORE_KEY = 'custom_q4';
const cards     = document.querySelectorAll('.answer-card');
const btnNext   = document.getElementById('btnNext');
const btnPrev   = document.getElementById('btnPrev');

(function restoreState() {
  const saved = sessionStorage.getItem(STORE_KEY);
  if (!saved) return;
  cards.forEach(function (card) {
    if (card.dataset.value === saved) { card.classList.add('selected'); btnNext.disabled = false; }
  });
})();

cards.forEach(function (card) {
  card.addEventListener('click', function () {
    cards.forEach(function (c) { c.classList.remove('selected'); });
    card.classList.add('selected');
    btnNext.disabled = false;
  });
});

btnPrev.addEventListener('click', function () { window.location.href = 'q3.html'; });
btnNext.addEventListener('click', function () {
  const selected = document.querySelector('.answer-card.selected');
  if (!selected) return;
  sessionStorage.setItem(STORE_KEY, selected.dataset.value);
  window.location.href = '../send-method.html';
});

(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
