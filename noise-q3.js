/* ================================================================
   SENDIT – NOISE Q3 JS
   ================================================================ */

const STORE_KEY  = 'noise_q3';
const STORE_DATE = 'noise_q3_date';

const cards       = document.querySelectorAll('.answer-card');
const btnNext     = document.getElementById('btnNext');
const btnPrev     = document.getElementById('btnPrev');
const dateSection = document.getElementById('dateSection');
const requestDate = document.getElementById('requestDate');

let selectedValue = null;

function checkReady() {
  if (!selectedValue) { btnNext.disabled = true; return; }
  if (selectedValue === 'yes') {
    btnNext.disabled = !requestDate.value;
  } else {
    btnNext.disabled = false;
  }
}

/* ── 페이지 로드 시 복원 ── */
(function restoreState() {
  const saved     = sessionStorage.getItem(STORE_KEY);
  const savedDate = sessionStorage.getItem(STORE_DATE);
  if (!saved) return;
  selectedValue = saved;
  cards.forEach(function (card) {
    if (card.dataset.value === saved) card.classList.add('selected');
  });
  if (saved === 'yes') {
    dateSection.style.display = 'block';
    if (savedDate) requestDate.value = savedDate;
  }
  checkReady();
})();

/* ── 카드 클릭 ── */
cards.forEach(function (card) {
  card.addEventListener('click', function () {
    cards.forEach(function (c) { c.classList.remove('selected'); });
    card.classList.add('selected');
    selectedValue = card.dataset.value;
    dateSection.style.display = selectedValue === 'yes' ? 'block' : 'none';
    if (selectedValue === 'no') requestDate.value = '';
    checkReady();
  });
});

requestDate.addEventListener('change', checkReady);

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  window.location.href = 'noise-q2.html';
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  sessionStorage.setItem(STORE_KEY, selectedValue);
  if (selectedValue === 'yes') {
    sessionStorage.setItem(STORE_DATE, requestDate.value);
  } else {
    sessionStorage.removeItem(STORE_DATE);
  }
  window.location.href = 'noise-q4.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
