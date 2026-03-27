/* ================================================================
   SENDIT – LEASE Q11 JS  (장기수선충당금 반환 요구 여부)
   ================================================================ */

const cards         = document.querySelectorAll('.answer-card');
const btnNext       = document.getElementById('btnNext');
const btnPrev       = document.getElementById('btnPrev');
const amountSection = document.getElementById('amountSection');
const inputAmount   = document.getElementById('inputAmount');

const STORE_KEY        = 'sendit_q11';
const STORE_AMOUNT_KEY = 'sendit_q11_amount';

/* ── 다음 버튼 활성화 여부 판단 ── */
function checkNextEnabled() {
  const selected = document.querySelector('.answer-card.selected');
  if (!selected) { btnNext.disabled = true; return; }

  if (selected.dataset.value === 'yes') {
    btnNext.disabled = inputAmount.value.trim() === '';
  } else {
    btnNext.disabled = false;
  }
}

/* ── 페이지 로드 시 이전 값 복원 ── */
(function restoreState() {
  const saved       = sessionStorage.getItem(STORE_KEY);
  const savedAmount = sessionStorage.getItem(STORE_AMOUNT_KEY);
  if (!saved) return;

  cards.forEach(function (card) {
    if (card.dataset.value === saved) {
      card.classList.add('selected');
    }
  });

  if (saved === 'yes') {
    amountSection.style.display = 'flex';
    if (savedAmount) {
      inputAmount.value = Number(savedAmount).toLocaleString('ko-KR');
    }
  }

  checkNextEnabled();
})();

/* ── 선택지 카드 클릭 ── */
cards.forEach(function (card) {
  card.addEventListener('click', function () {
    cards.forEach(function (c) { c.classList.remove('selected'); });
    card.classList.add('selected');

    if (card.dataset.value === 'yes') {
      amountSection.style.display = 'flex';
    } else {
      amountSection.style.display = 'none';
      inputAmount.value = '';
    }

    checkNextEnabled();
  });
});

/* ── 금액 입력: 숫자만 허용 + 천단위 콤마 ── */
inputAmount.addEventListener('input', function () {
  const raw = this.value.replace(/[^0-9]/g, '');
  this.value = raw ? Number(raw).toLocaleString('ko-KR') : '';
  checkNextEnabled();
});

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = 'q10.html';
  }
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  const selected = document.querySelector('.answer-card.selected');
  if (!selected) return;

  sessionStorage.setItem(STORE_KEY, selected.dataset.value);
  if (selected.dataset.value === 'yes') {
    const raw = inputAmount.value.replace(/[^0-9]/g, '');
    sessionStorage.setItem(STORE_AMOUNT_KEY, raw);
  } else {
    sessionStorage.removeItem(STORE_AMOUNT_KEY);
  }

  // TODO: 다음 질문 페이지로 이동
  window.location.href = 'q12.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
