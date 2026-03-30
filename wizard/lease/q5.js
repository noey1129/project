/* ================================================================
   LAWSIGN – LEASE Q5 JS
   ================================================================ */

const inputAmount = document.getElementById('inputAmount');
const btnNext     = document.getElementById('btnNext');
const btnPrev     = document.getElementById('btnPrev');

const STORE_KEY = 'sendit_q5_amount';

/* ── 페이지 로드 시 이전 입력값 복원 ── */
(function restoreState() {
  const saved = sessionStorage.getItem(STORE_KEY);
  if (saved === null) return;
  inputAmount.value = saved === '0' ? '0' : Number(saved).toLocaleString('ko-KR');
  btnNext.disabled  = false;
})();

/* ── 숫자 입력 → 천 단위 콤마 포맷 ── */
inputAmount.addEventListener('input', function () {
  const raw = this.value.replace(/[^0-9]/g, '');
  this.value = raw ? Number(raw).toLocaleString('ko-KR') : '';
  btnNext.disabled = raw === '';
});

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = 'q4.html';
  }
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  if (inputAmount.value.trim() === '') return;

  const raw = inputAmount.value.replace(/[^0-9]/g, '');
  sessionStorage.setItem(STORE_KEY, raw);

  window.location.href = 'q6.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
