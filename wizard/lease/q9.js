/* ================================================================
   SENDIT – LEASE Q9 JS  (선택사항: 계약 기간)
   ================================================================ */

const startYear  = document.getElementById('startYear');
const startMonth = document.getElementById('startMonth');
const startDay   = document.getElementById('startDay');
const endYear    = document.getElementById('endYear');
const endMonth   = document.getElementById('endMonth');
const endDay     = document.getElementById('endDay');
const btnNext    = document.getElementById('btnNext');
const btnPrev    = document.getElementById('btnPrev');
const btnSkip    = document.getElementById('btnSkip');

const allFields = [startYear, startMonth, startDay, endYear, endMonth, endDay];

/* ── 6개 필드 모두 채워졌는지 확인 ── */
function checkFilled() {
  btnNext.disabled = !allFields.every(function (el) {
    return el.value.trim() !== '';
  });
}

/* ── 페이지 로드 시 이전 입력값 복원 ── */
(function restoreState() {
  startYear.value  = sessionStorage.getItem('sendit_q9_start_year')  || '';
  startMonth.value = sessionStorage.getItem('sendit_q9_start_month') || '';
  startDay.value   = sessionStorage.getItem('sendit_q9_start_day')   || '';
  endYear.value    = sessionStorage.getItem('sendit_q9_end_year')    || '';
  endMonth.value   = sessionStorage.getItem('sendit_q9_end_month')   || '';
  endDay.value     = sessionStorage.getItem('sendit_q9_end_day')     || '';
  checkFilled();
})();

/* ── 숫자만 입력 허용 ── */
allFields.forEach(function (el) {
  el.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
    checkFilled();
  });
});

/* ── 다음 페이지 이동 공통 함수 ── */
function goNext() {
  // TODO: 다음 질문 페이지로 이동
  window.location.href = 'q10.html';
}

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = 'q8.html';
  }
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  if (btnNext.disabled) return;

  sessionStorage.setItem('sendit_q9_start_year',  startYear.value.trim());
  sessionStorage.setItem('sendit_q9_start_month', startMonth.value.trim());
  sessionStorage.setItem('sendit_q9_start_day',   startDay.value.trim());
  sessionStorage.setItem('sendit_q9_end_year',    endYear.value.trim());
  sessionStorage.setItem('sendit_q9_end_month',   endMonth.value.trim());
  sessionStorage.setItem('sendit_q9_end_day',     endDay.value.trim());
  goNext();
});

/* ── 건너뛰기 버튼 ── */
btnSkip.addEventListener('click', function () {
  ['sendit_q9_start_year', 'sendit_q9_start_month', 'sendit_q9_start_day',
   'sendit_q9_end_year',   'sendit_q9_end_month',   'sendit_q9_end_day'].forEach(function (k) {
    sessionStorage.removeItem(k);
  });
  goNext();
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
