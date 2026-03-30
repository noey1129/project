/* ================================================================
   LAWSIGN – MYPAGE JS
   내 문서함 페이지 로직
   ================================================================ */

var DUMMY_SENT = [
  { id: 1, status: 'sent',  statusLabel: '발송완료', title: '부동산 매매 계약 해체 통보', date: '2025. 12. 01', recipient: '김영수' },
  { id: 2, status: 'read',  statusLabel: '열람완료', title: '임대차 보증금 반환 청구',      date: '2025. 11. 20', recipient: '박철수' },
  { id: 3, status: 'read',  statusLabel: '열람완료', title: '층간소음 시정 요구',            date: '2025. 11. 10', recipient: '이영희' },
];

var DUMMY_DRAFT = [
  { id: 4, status: 'draft', statusLabel: '임시저장', title: '대여금 반환 청구 (작성 중)',   date: '2025. 12. 03', recipient: '-' },
];

var currentTab = 'sent';
var currentQuery = '';

/* ── 카드 HTML 생성 ── */
function buildDocItem(doc) {
  return '<div class="doc-item" onclick="window.location.href=\'doc-detail.html?id=' + doc.id + '\'">' +
    '<div class="doc-item-left">' +
      '<div class="doc-item-top">' +
        '<span class="doc-status doc-status--' + doc.status + '">' + doc.statusLabel + '</span>' +
        '<span class="doc-title">' + doc.title + '</span>' +
      '</div>' +
      '<div class="doc-item-meta">' +
        '<span class="doc-meta-text">' + doc.date + '</span>' +
        '<span class="doc-meta-text">수신인 : ' + doc.recipient + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="doc-item-arrow">' +
      '<svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '</div>' +
  '</div>';
}

/* ── 목록 렌더링 ── */
function renderList() {
  var list = document.getElementById('docList');
  if (!list) return;

  var data = currentTab === 'sent' ? DUMMY_SENT : DUMMY_DRAFT;

  if (currentQuery) {
    var q = currentQuery.toLowerCase();
    data = data.filter(function (d) {
      return d.title.toLowerCase().includes(q) || d.recipient.toLowerCase().includes(q);
    });
  }

  if (data.length === 0) {
    list.innerHTML = '<div class="doc-empty">문서가 없습니다.</div>';
    return;
  }

  list.innerHTML = data.map(buildDocItem).join('');
}

/* ── 탭 전환 ── */
document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.doc-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('doc-tab--active'); });
      tab.classList.add('doc-tab--active');
      currentTab = tab.dataset.tab;
      currentQuery = '';
      document.getElementById('searchInput').value = '';
      renderList();
    });
  });

  /* ── 검색 ── */
  document.getElementById('searchBtn').addEventListener('click', function () {
    currentQuery = document.getElementById('searchInput').value.trim();
    renderList();
  });

  document.getElementById('searchInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      currentQuery = this.value.trim();
      renderList();
    }
  });

  renderList();
});
