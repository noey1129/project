/* ================================================================
   LAWSIGN – MEMBERSHIP Q1 JS
   ================================================================ */

const STORE_KEY = 'membership_q1';

const textarea = document.getElementById('situation');
const btnNext  = document.getElementById('btnNext');
const btnPrev  = document.getElementById('btnPrev');

(function restoreState() {
  const saved = sessionStorage.getItem(STORE_KEY);
  if (saved) { textarea.value = saved; btnNext.disabled = false; }
})();

textarea.addEventListener('input', function () {
  btnNext.disabled = !textarea.value.trim();
});

btnPrev.addEventListener('click', function () {
  window.location.href = '../../select-situation.html';
});

btnNext.addEventListener('click', function () {
  sessionStorage.setItem(STORE_KEY, textarea.value.trim());
  window.location.href = 'q2.html';
});

(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
