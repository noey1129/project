/* ================================================================
   LAWSIGN – LOAN Q3 JS (다중 선택)
   ================================================================ */

const STORE_KEY = 'loan_q3';

const multiCards    = document.querySelectorAll('.answer-card--multi');
const exclusiveCard = document.querySelector('.answer-card--exclusive');
const btnNext       = document.getElementById('btnNext');
const btnPrev       = document.getElementById('btnPrev');

let selected = [];

function updateBtn() {
  btnNext.disabled = selected.length === 0;
}

function renderSelected() {
  document.querySelectorAll('.answer-card').forEach(function (card) {
    card.classList.toggle('selected', selected.includes(card.dataset.value));
  });
  updateBtn();
}

/* ── 페이지 로드 시 복원 ── */
(function restoreState() {
  const saved = sessionStorage.getItem(STORE_KEY);
  if (!saved) return;
  try { selected = JSON.parse(saved); } catch (e) { selected = []; }
  renderSelected();
})();

/* ── 다중 선택 카드 클릭 ── */
multiCards.forEach(function (card) {
  card.addEventListener('click', function () {
    const val = card.dataset.value;
    // 배타 선택('없어요') 해제
    selected = selected.filter(function (v) { return v !== '없어요'; });
    const idx = selected.indexOf(val);
    if (idx === -1) {
      selected.push(val);
    } else {
      selected.splice(idx, 1);
    }
    renderSelected();
  });
});

/* ── 배타 카드('없어요') 클릭 ── */
exclusiveCard.addEventListener('click', function () {
  selected = ['없어요'];
  renderSelected();
});

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  window.location.href = 'q2.html';
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  sessionStorage.setItem(STORE_KEY, JSON.stringify(selected));
  window.location.href = 'q4.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
