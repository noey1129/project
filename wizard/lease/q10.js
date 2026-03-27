/* ================================================================
   SENDIT – LEASE Q10 JS
   ================================================================ */

const cards         = document.querySelectorAll('.answer-card');
const btnNext       = document.getElementById('btnNext');
const btnPrev       = document.getElementById('btnPrev');
const problemSection = document.getElementById('problemSection');
const problemDesc   = document.getElementById('problemDesc');

const STORE_KEY      = 'sendit_q10';
const STORE_DESC_KEY = 'sendit_q10_problem';

/* ── 다음 버튼 활성화 여부 판단 ── */
function checkNextEnabled() {
  const selected = document.querySelector('.answer-card.selected');
  if (!selected) { btnNext.disabled = true; return; }

  if (selected.dataset.value === 'yes') {
    btnNext.disabled = problemDesc.value.trim() === '';
  } else {
    btnNext.disabled = false;
  }
}

/* ── 페이지 로드 시 이전 값 복원 ── */
(function restoreState() {
  const saved     = sessionStorage.getItem(STORE_KEY);
  const savedDesc = sessionStorage.getItem(STORE_DESC_KEY);
  if (!saved) return;

  cards.forEach(function (card) {
    if (card.dataset.value === saved) {
      card.classList.add('selected');
    }
  });

  if (saved === 'yes') {
    problemSection.style.display = 'flex';
    if (savedDesc) problemDesc.value = savedDesc;
  }

  checkNextEnabled();
})();

/* ── 선택지 카드 클릭 ── */
cards.forEach(function (card) {
  card.addEventListener('click', function () {
    cards.forEach(function (c) { c.classList.remove('selected'); });
    card.classList.add('selected');

    if (card.dataset.value === 'yes') {
      problemSection.style.display = 'flex';
    } else {
      problemSection.style.display = 'none';
      problemDesc.value = '';
    }

    checkNextEnabled();
  });
});

/* ── 문제 설명 입력 ── */
problemDesc.addEventListener('input', checkNextEnabled);

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = 'q9.html';
  }
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  const selected = document.querySelector('.answer-card.selected');
  if (!selected) return;

  sessionStorage.setItem(STORE_KEY, selected.dataset.value);
  if (selected.dataset.value === 'yes') {
    sessionStorage.setItem(STORE_DESC_KEY, problemDesc.value.trim());
  } else {
    sessionStorage.removeItem(STORE_DESC_KEY);
  }

  window.location.href = 'q11.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
