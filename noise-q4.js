/* ================================================================
   SENDIT – NOISE Q4 JS
   ================================================================ */

const STORE_KEY = 'noise_q4';

const cards   = document.querySelectorAll('.answer-card');
const btnNext = document.getElementById('btnNext');
const btnPrev = document.getElementById('btnPrev');

/* ── 페이지 로드 시 복원 ── */
(function restoreState() {
  const saved = sessionStorage.getItem(STORE_KEY);
  if (!saved) return;
  cards.forEach(function (card) {
    if (card.dataset.value === saved) {
      card.classList.add('selected');
      btnNext.disabled = false;
    }
  });
})();

/* ── 카드 클릭 ── */
cards.forEach(function (card) {
  card.addEventListener('click', function () {
    cards.forEach(function (c) { c.classList.remove('selected'); });
    card.classList.add('selected');
    btnNext.disabled = false;
  });
});

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  window.location.href = 'noise-q3.html';
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  const selected = document.querySelector('.answer-card.selected');
  if (!selected) return;
  sessionStorage.setItem(STORE_KEY, selected.dataset.value);
  window.location.href = 'noise-q5.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
