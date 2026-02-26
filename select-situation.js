/* ================================================================
   SENDIT – SELECT SITUATION JS
   ================================================================ */

/* ── 이전 버튼: 히스토리 있으면 back, 없으면 index.html ── */
document.getElementById('btnPrev').addEventListener('click', function () {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = 'index.html';
  }
});

/* ── 카드 선택 ── */
(function initCardSelect() {
  const cards = document.querySelectorAll('.sit-select-card');

  const routeMap = {
    '임대차':    'lease-q1.html',
    '대여금':    'loan-q1.html',
    '계약관련':  'contract-q1.html',
    '층간소음':  'noise-q1.html',
    '회원권환불': 'membership-q1.html',
    '직접작성':  'custom-q1.html',
  };

  const typeKeyMap = {
    '임대차':    'rent',
    '대여금':    'loan',
    '계약관련':  'contract',
    '층간소음':  'noise',
    '회원권환불': 'membership',
    '직접작성':  'custom',
  };

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      cards.forEach(function (c) { c.classList.remove('selected'); });
      card.classList.add('selected');

      const type = card.dataset.type;
      sessionStorage.setItem('wizard_type', typeKeyMap[type] || type);

      const next = routeMap[type];
      if (next) {
        window.location.href = next;
      }
    });
  });
})();

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
