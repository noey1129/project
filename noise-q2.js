/* ================================================================
   SENDIT – NOISE Q2 JS
   ================================================================ */

const STORE_KEY = 'noise_q2';

const textarea = document.getElementById('noiseDesc');
const btnNext  = document.getElementById('btnNext');
const btnPrev  = document.getElementById('btnPrev');

/* ── 페이지 로드 시 복원 ── */
(function restoreState() {
  const saved = sessionStorage.getItem(STORE_KEY);
  if (saved) {
    textarea.value = saved;
    btnNext.disabled = false;
  }
})();

textarea.addEventListener('input', function () {
  btnNext.disabled = !textarea.value.trim();
});

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  window.location.href = 'noise-q1.html';
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  sessionStorage.setItem(STORE_KEY, textarea.value.trim());
  window.location.href = 'noise-q3.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
