/* ================================================================
   SENDIT – CUSTOM Q2 JS
   ================================================================ */

const STORE_YEAR  = 'custom_q2_year';
const STORE_MONTH = 'custom_q2_month';
const STORE_DAY   = 'custom_q2_day';

const reqYear  = document.getElementById('eventYear');
const reqMonth = document.getElementById('eventMonth');
const reqDay   = document.getElementById('eventDay');
const btnNext  = document.getElementById('btnNext');
const btnPrev  = document.getElementById('btnPrev');

function checkReady() {
  btnNext.disabled = !(reqYear.value.trim() && reqMonth.value.trim() && reqDay.value.trim());
}

(function restoreState() {
  const savedY = sessionStorage.getItem(STORE_YEAR);
  const savedM = sessionStorage.getItem(STORE_MONTH);
  const savedD = sessionStorage.getItem(STORE_DAY);
  if (savedY) reqYear.value  = savedY;
  if (savedM) reqMonth.value = savedM;
  if (savedD) reqDay.value   = savedD;
  checkReady();
})();

[reqYear, reqMonth, reqDay].forEach(function (el) {
  el.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    checkReady();
  });
});

btnPrev.addEventListener('click', function () { window.location.href = 'q1.html'; });

btnNext.addEventListener('click', function () {
  sessionStorage.setItem(STORE_YEAR,  reqYear.value.trim());
  sessionStorage.setItem(STORE_MONTH, reqMonth.value.trim());
  sessionStorage.setItem(STORE_DAY,   reqDay.value.trim());
  window.location.href = 'q3.html';
});

(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
