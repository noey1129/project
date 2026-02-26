/* ================================================================
   SENDIT – LOAN Q4 JS
   ================================================================ */

const STORE_KEY    = 'loan_q4';
const STORE_AMOUNT = 'loan_q4_amount';

const cards         = document.querySelectorAll('.answer-card');
const btnNext       = document.getElementById('btnNext');
const btnPrev       = document.getElementById('btnPrev');
const amountSection = document.getElementById('amountSection');
const repaidAmount  = document.getElementById('repaidAmount');

let selectedValue = null;

function checkReady() {
  if (!selectedValue) { btnNext.disabled = true; return; }
  if (selectedValue === 'yes') {
    btnNext.disabled = !repaidAmount.value.trim();
  } else {
    btnNext.disabled = false;
  }
}

/* ── 페이지 로드 시 복원 ── */
(function restoreState() {
  const saved       = sessionStorage.getItem(STORE_KEY);
  const savedAmount = sessionStorage.getItem(STORE_AMOUNT);
  if (!saved) return;
  selectedValue = saved;
  cards.forEach(function (card) {
    if (card.dataset.value === saved) card.classList.add('selected');
  });
  if (saved === 'yes') {
    amountSection.style.display = 'block';
    if (savedAmount) repaidAmount.value = savedAmount;
  }
  checkReady();
})();

/* ── 카드 클릭 ── */
cards.forEach(function (card) {
  card.addEventListener('click', function () {
    cards.forEach(function (c) { c.classList.remove('selected'); });
    card.classList.add('selected');
    selectedValue = card.dataset.value;
    amountSection.style.display = selectedValue === 'yes' ? 'block' : 'none';
    if (selectedValue === 'no') repaidAmount.value = '';
    checkReady();
  });
});

repaidAmount.addEventListener('input', checkReady);

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  window.location.href = 'loan-q3.html';
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  sessionStorage.setItem(STORE_KEY, selectedValue);
  if (selectedValue === 'yes') {
    sessionStorage.setItem(STORE_AMOUNT, repaidAmount.value.trim());
  } else {
    sessionStorage.removeItem(STORE_AMOUNT);
  }
  window.location.href = 'loan-q5.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
