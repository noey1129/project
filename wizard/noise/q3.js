/* ================================================================
   LAWSIGN – NOISE Q3 JS
   ================================================================ */

const STORE_KEY   = 'noise_q3';
const STORE_YEAR  = 'noise_q3_year';
const STORE_MONTH = 'noise_q3_month';
const STORE_DAY   = 'noise_q3_day';

const cards       = document.querySelectorAll('.answer-card');
const btnNext     = document.getElementById('btnNext');
const btnPrev     = document.getElementById('btnPrev');
const dateSection = document.getElementById('dateSection');
const reqYear     = document.getElementById('reqYear');
const reqMonth    = document.getElementById('reqMonth');
const reqDay      = document.getElementById('reqDay');

let selectedValue = null;

function checkReady() {
  if (!selectedValue) { btnNext.disabled = true; return; }
  if (selectedValue === 'yes') {
    btnNext.disabled = !(reqYear.value.trim() && reqMonth.value.trim() && reqDay.value.trim());
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
    if (savedY) reqYear.value  = savedY;
    if (savedM) reqMonth.value = savedM;
    if (savedD) reqDay.value   = savedD;
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
    if (selectedValue === 'no') { reqYear.value = ''; reqMonth.value = ''; reqDay.value = ''; }
    checkReady();
  });
});

[reqYear, reqMonth, reqDay].forEach(function (el) {
  el.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    checkReady();
  });
});

btnPrev.addEventListener('click', function () { window.location.href = 'q2.html'; });

btnNext.addEventListener('click', function () {
  sessionStorage.setItem(STORE_KEY, selectedValue);
  if (selectedValue === 'yes') {
    sessionStorage.setItem(STORE_YEAR,  reqYear.value.trim());
    sessionStorage.setItem(STORE_MONTH, reqMonth.value.trim());
    sessionStorage.setItem(STORE_DAY,   reqDay.value.trim());
  } else {
    sessionStorage.removeItem(STORE_YEAR);
    sessionStorage.removeItem(STORE_MONTH);
    sessionStorage.removeItem(STORE_DAY);
  }
  window.location.href = 'q4.html';
});

(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
