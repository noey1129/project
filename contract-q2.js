/* ================================================================
   SENDIT – CONTRACT Q2 JS
   ================================================================ */

const STORE_KEY = 'contract_q2';
const dateInput = document.getElementById('eventDate');
const btnNext   = document.getElementById('btnNext');
const btnPrev   = document.getElementById('btnPrev');

(function restoreState() {
  const saved = sessionStorage.getItem(STORE_KEY);
  if (saved) { dateInput.value = saved; btnNext.disabled = false; }
})();

dateInput.addEventListener('change', function () { btnNext.disabled = !dateInput.value; });

btnPrev.addEventListener('click', function () { window.location.href = 'contract-q1.html'; });

btnNext.addEventListener('click', function () {
  sessionStorage.setItem(STORE_KEY, dateInput.value);
  window.location.href = 'contract-q3.html';
});

(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
