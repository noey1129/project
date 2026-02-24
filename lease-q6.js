/* ================================================================
   SENDIT – LEASE Q6 JS
   ================================================================ */

const inputYear  = document.getElementById('inputYear');
const inputMonth = document.getElementById('inputMonth');
const inputDay   = document.getElementById('inputDay');
const btnNext    = document.getElementById('btnNext');
const btnPrev    = document.getElementById('btnPrev');

/* ── 세 필드 모두 채워졌는지 확인 ── */
function checkFilled() {
  const y = inputYear.value.trim();
  const m = inputMonth.value.trim();
  const d = inputDay.value.trim();
  btnNext.disabled = !(y && m && d);
}

/* ── 페이지 로드 시 이전 입력값 복원 ── */
(function restoreState() {
  const y = sessionStorage.getItem('sendit_q6_year');
  const m = sessionStorage.getItem('sendit_q6_month');
  const d = sessionStorage.getItem('sendit_q6_day');
  if (y) inputYear.value  = y;
  if (m) inputMonth.value = m;
  if (d) inputDay.value   = d;
  checkFilled();
})();

/* ── 숫자만 입력 허용 ── */
[inputYear, inputMonth, inputDay].forEach(function (el) {
  el.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    checkFilled();
  });
});

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = 'lease-q5.html';
  }
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  if (btnNext.disabled) return;

  sessionStorage.setItem('sendit_q6_year',  inputYear.value.trim());
  sessionStorage.setItem('sendit_q6_month', inputMonth.value.trim());
  sessionStorage.setItem('sendit_q6_day',   inputDay.value.trim());

  window.location.href = 'lease-q7.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
