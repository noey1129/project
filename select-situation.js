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

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      // 기존 선택 해제
      cards.forEach(function (c) { c.classList.remove('selected'); });
      // 클릭 카드 선택
      card.classList.add('selected');

      const type = card.dataset.type;

      // 유형별 다음 페이지 이동
      const routeMap = {
        '임대차': 'lease-q1.html',
      };

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
