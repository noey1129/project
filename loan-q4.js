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
    const raw = repaidAmount.value.replace(/[^0-9]/g, '');
    btnNext.disabled = !raw;
  } else {
    btnNext.disabled = false;
  }
}

/* ── 복원 ── */
(function restoreState() {
  const saved       = sessionStorage.getItem(STORE_KEY);
  const savedAmount = sessionStorage.getItem(STORE_AMOUNT);
  if (!saved) return;
  selectedValue = saved;
  cards.forEach(function (c) { if (c.dataset.value === saved) c.classList.add('selected'); });
  if (saved === 'yes') {
    amountSection.style.display = 'flex';
    if (savedAmount) repaidAmount.value = Number(savedAmount).toLocaleString('ko-KR');
  }
  checkReady();
})();

/* ── 카드 클릭 ── */
cards.forEach(function (card) {
  card.addEventListener('click', function () {
    cards.forEach(function (c) { c.classList.remove('selected'); });
    card.classList.add('selected');
    selectedValue = card.dataset.value;
    amountSection.style.display = selectedValue === 'yes' ? 'flex' : 'none';
    if (selectedValue === 'no') repaidAmount.value = '';
    checkReady();
  });
});

/* ── 금액: 천단위 콤마 ── */
repaidAmount.addEventListener('input', function () {
  const raw = this.value.replace(/[^0-9]/g, '');
  this.value = raw ? Number(raw).toLocaleString('ko-KR') : '';
  checkReady();
});

btnPrev.addEventListener('click', function () { window.location.href = 'loan-q3.html'; });

btnNext.addEventListener('click', function () {
  sessionStorage.setItem(STORE_KEY, selectedValue);
  if (selectedValue === 'yes') {
    const raw = repaidAmount.value.replace(/[^0-9]/g, '');
    sessionStorage.setItem(STORE_AMOUNT, raw);
  } else {
    sessionStorage.removeItem(STORE_AMOUNT);
  }
  window.location.href = 'loan-q5.html';
});

(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
