/* ================================================================
   SENDIT – LOAN Q1 JS
   ================================================================ */

const STORE_AMOUNT = 'loan_q1_amount';
const STORE_DATE   = 'loan_q1_date';

const amountInput = document.getElementById('loanAmount');
const dateInput   = document.getElementById('loanDate');
const btnNext     = document.getElementById('btnNext');
const btnPrev     = document.getElementById('btnPrev');

function checkReady() {
  btnNext.disabled = !(amountInput.value.trim() && dateInput.value);
}

/* ── 페이지 로드 시 복원 ── */
(function restoreState() {
  const savedAmount = sessionStorage.getItem(STORE_AMOUNT);
  const savedDate   = sessionStorage.getItem(STORE_DATE);
  if (savedAmount) amountInput.value = savedAmount;
  if (savedDate)   dateInput.value   = savedDate;
  checkReady();
})();

amountInput.addEventListener('input', checkReady);
dateInput.addEventListener('change', checkReady);

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = 'select-situation.html';
  }
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  sessionStorage.setItem(STORE_AMOUNT, amountInput.value.trim());
  sessionStorage.setItem(STORE_DATE, dateInput.value);
  window.location.href = 'loan-q2.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
