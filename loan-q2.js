/* ================================================================
   SENDIT – LOAN Q2 JS
   ================================================================ */

const STORE_KEY   = 'loan_q2';
const STORE_YEAR  = 'loan_q2_year';
const STORE_MONTH = 'loan_q2_month';
const STORE_DAY   = 'loan_q2_day';

const cards       = document.querySelectorAll('.answer-card');
const btnNext     = document.getElementById('btnNext');
const btnPrev     = document.getElementById('btnPrev');
const dateSection = document.getElementById('dateSection');
const repayYear   = document.getElementById('repayYear');
const repayMonth  = document.getElementById('repayMonth');
const repayDay    = document.getElementById('repayDay');

let selectedValue = null;

function checkReady() {
  if (!selectedValue) { btnNext.disabled = true; return; }
  if (selectedValue === 'yes') {
    btnNext.disabled = !(repayYear.value.trim() && repayMonth.value.trim() && repayDay.value.trim());
  } else {
    btnNext.disabled = false;
  }
}

/* ── 복원 ── */
(function restoreState() {
  const saved = sessionStorage.getItem(STORE_KEY);
  const savedY = sessionStorage.getItem(STORE_YEAR);
  const savedM = sessionStorage.getItem(STORE_MONTH);
  const savedD = sessionStorage.getItem(STORE_DAY);
  if (!saved) return;
  selectedValue = saved;
  cards.forEach(function (c) { if (c.dataset.value === saved) c.classList.add('selected'); });
  if (saved === 'yes') {
    dateSection.style.display = 'flex';
    if (savedY) repayYear.value  = savedY;
    if (savedM) repayMonth.value = savedM;
    if (savedD) repayDay.value   = savedD;
  }
  checkReady();
})();

/* ── 카드 클릭 ── */
cards.forEach(function (card) {
  card.addEventListener('click', function () {
    cards.forEach(function (c) { c.classList.remove('selected'); });
    card.classList.add('selected');
    selectedValue = card.dataset.value;
    dateSection.style.display = selectedValue === 'yes' ? 'flex' : 'none';
    if (selectedValue === 'no') { repayYear.value = ''; repayMonth.value = ''; repayDay.value = ''; }
    checkReady();
  });
});

[repayYear, repayMonth, repayDay].forEach(function (el) {
  el.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    checkReady();
  });
});

btnPrev.addEventListener('click', function () { window.location.href = 'loan-q1.html'; });

btnNext.addEventListener('click', function () {
  sessionStorage.setItem(STORE_KEY, selectedValue);
  if (selectedValue === 'yes') {
    sessionStorage.setItem(STORE_YEAR,  repayYear.value.trim());
    sessionStorage.setItem(STORE_MONTH, repayMonth.value.trim());
    sessionStorage.setItem(STORE_DAY,   repayDay.value.trim());
  } else {
    sessionStorage.removeItem(STORE_YEAR);
    sessionStorage.removeItem(STORE_MONTH);
    sessionStorage.removeItem(STORE_DAY);
  }
  window.location.href = 'loan-q3.html';
});

(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
