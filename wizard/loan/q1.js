/* ================================================================
   SENDIT – LOAN Q1 JS
   ================================================================ */

const STORE_AMOUNT = 'loan_q1_amount';
const STORE_YEAR   = 'loan_q1_year';
const STORE_MONTH  = 'loan_q1_month';
const STORE_DAY    = 'loan_q1_day';

const loanAmount = document.getElementById('loanAmount');
const loanYear   = document.getElementById('loanYear');
const loanMonth  = document.getElementById('loanMonth');
const loanDay    = document.getElementById('loanDay');
const btnNext    = document.getElementById('btnNext');
const btnPrev    = document.getElementById('btnPrev');

function checkReady() {
  const raw = loanAmount.value.replace(/[^0-9]/g, '');
  btnNext.disabled = !(raw && loanYear.value.trim() && loanMonth.value.trim() && loanDay.value.trim());
}

/* ── 페이지 로드 시 복원 ── */
(function restoreState() {
  const savedAmt = sessionStorage.getItem(STORE_AMOUNT);
  const savedY   = sessionStorage.getItem(STORE_YEAR);
  const savedM   = sessionStorage.getItem(STORE_MONTH);
  const savedD   = sessionStorage.getItem(STORE_DAY);
  if (savedAmt) loanAmount.value = Number(savedAmt).toLocaleString('ko-KR');
  if (savedY)   loanYear.value   = savedY;
  if (savedM)   loanMonth.value  = savedM;
  if (savedD)   loanDay.value    = savedD;
  checkReady();
})();

/* ── 금액: 숫자만 + 천단위 콤마 ── */
loanAmount.addEventListener('input', function () {
  const raw = this.value.replace(/[^0-9]/g, '');
  this.value = raw ? Number(raw).toLocaleString('ko-KR') : '';
  checkReady();
});

/* ── 날짜: 숫자만 ── */
[loanYear, loanMonth, loanDay].forEach(function (el) {
  el.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    checkReady();
  });
});

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  window.location.href = '../../select-situation.html';
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  const raw = loanAmount.value.replace(/[^0-9]/g, '');
  sessionStorage.setItem(STORE_AMOUNT, raw);
  sessionStorage.setItem(STORE_YEAR,  loanYear.value.trim());
  sessionStorage.setItem(STORE_MONTH, loanMonth.value.trim());
  sessionStorage.setItem(STORE_DAY,   loanDay.value.trim());
  window.location.href = 'q2.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
