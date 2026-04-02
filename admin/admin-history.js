/* ================================================================
   LAWSIGN – ADMIN HISTORY JS
   발송 내역 목록 로직
   ================================================================ */

var PAGE_SIZE  = 15;
var currentPage = 1;
var filtered   = ADMIN_DOCS.slice();
var fChannel   = '';
var fStatus    = '';
var fQuery     = '';

/* ── 날짜 기준 ── */
var _now   = new Date();
var _today = _now.getFullYear() + '-' +
  String(_now.getMonth() + 1).padStart(2, '0') + '-' +
  String(_now.getDate()).padStart(2, '0');
var _thisMonth = _today.slice(0, 7);
var _weekAgo   = new Date(_now.getTime() - 7 * 24 * 60 * 60 * 1000);

/* ── 통계 ── */
function calcStats() {
  var today = 0, week = 0, month = 0;
  ADMIN_DOCS.forEach(function (d) {
    if (d.sendDate === _today) today++;
    if (new Date(d.sendDate) >= _weekAgo) week++;
    if (d.sendDate.startsWith(_thisMonth)) month++;
  });
  document.getElementById('adhStatToday').textContent = today;
  document.getElementById('adhStatWeek').textContent  = week;
  document.getElementById('adhStatMonth').textContent = month;
}

/* ── 필터 ── */
function applyFilter() {
  filtered = ADMIN_DOCS.filter(function (d) {
    if (fChannel && d.sendMethod !== fChannel) return false;
    if (fStatus  && d.status    !== fStatus)  return false;
    if (fQuery) {
      var q = fQuery.toLowerCase();
      if (!d.sender.includes(fQuery) &&
          !d.recipient.toLowerCase().includes(q) &&
          !d.type.includes(fQuery)) return false;
    }
    return true;
  });
  currentPage = 1;
  render();
}

/* ── 뱃지 HTML ── */
var methodLabel = { certified: '카카오 전자문서', simple: '카카오 알림톡' };
var methodCls   = { certified: 'adh-badge--certified', simple: 'adh-badge--simple' };
var statusLabel = { sent: '발송됨', read: '열람됨' };
var statusCls   = { sent: 'adh-status--sent', read: 'adh-status--read' };

/* ── 렌더 ── */
function render() {
  var total      = filtered.length;
  var totalPages = Math.ceil(total / PAGE_SIZE) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  var start = (currentPage - 1) * PAGE_SIZE;
  var page  = filtered.slice(start, start + PAGE_SIZE);

  document.getElementById('adhCount').textContent = total;

  var tbody = document.getElementById('adhTbody');
  if (total === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="adh-empty">발송 내역이 없습니다.</td></tr>';
  } else {
    tbody.innerHTML = page.map(function (d, idx) {
      return '<tr data-id="' + d.id + '">' +
        '<td>' + (start + idx + 1) + '</td>' +
        '<td>' + d.sender + '</td>' +
        '<td><span class="adm-type-badge ' + d.typeCls + '">' + d.type + '</span></td>' +
        '<td>' + d.recipient + '</td>' +
        '<td><span class="adh-badge ' + (methodCls[d.sendMethod] || '') + '">' + (methodLabel[d.sendMethod] || d.sendMethod) + '</span></td>' +
        '<td><span class="adh-status ' + (statusCls[d.status] || '') + '">' + (statusLabel[d.status] || d.status) + '</span></td>' +
        '<td>' + d.sendDate.replace(/-/g, '. ') + '</td>' +
        '<td><button class="adh-btn-detail" data-id="' + d.id + '">상세보기</button></td>' +
      '</tr>';
    }).join('');
  }

  document.getElementById('adhPageInfo').textContent =
    total + '건  ' + currentPage + ' / ' + totalPages + ' 페이지';

  renderPagination(totalPages);
}

/* ── 페이지네이션 ── */
function renderPagination(totalPages) {
  var nav = document.getElementById('adhPageNav');
  var GROUP = 10;
  var gs = Math.floor((currentPage - 1) / GROUP) * GROUP + 1;
  var ge = Math.min(gs + GROUP - 1, totalPages);

  var html = '<button class="adh-pg-btn adh-pg-arr" id="pgFirst">«</button>' +
             '<button class="adh-pg-btn adh-pg-arr" id="pgPrev">‹</button>';
  for (var i = gs; i <= ge; i++) {
    html += '<button class="adh-pg-btn' + (i === currentPage ? ' adh-pg-btn--active' : '') + '" data-page="' + i + '">' + i + '</button>';
  }
  html += '<button class="adh-pg-btn adh-pg-arr" id="pgNext">›</button>' +
          '<button class="adh-pg-btn adh-pg-arr" id="pgLast">»</button>';
  nav.innerHTML = html;

  nav.querySelectorAll('[data-page]').forEach(function (btn) {
    btn.addEventListener('click', function () { currentPage = parseInt(this.dataset.page); render(); });
  });
  document.getElementById('pgFirst').addEventListener('click', function () { currentPage = 1; render(); });
  document.getElementById('pgPrev').addEventListener('click',  function () { if (currentPage > 1) { currentPage--; render(); } });
  document.getElementById('pgNext').addEventListener('click',  function () { if (currentPage < totalPages) { currentPage++; render(); } });
  document.getElementById('pgLast').addEventListener('click',  function () { currentPage = totalPages; render(); });
}

/* ── DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', function () {
  calcStats();

  /* 채널 탭 */
  document.getElementById('adhChannelTabs').addEventListener('click', function (e) {
    var btn = e.target.closest('.adh-tab');
    if (!btn) return;
    this.querySelectorAll('.adh-tab').forEach(function (b) { b.classList.remove('adh-tab--active'); });
    btn.classList.add('adh-tab--active');
    fChannel = btn.dataset.channel;
    applyFilter();
  });

  /* 상태 탭 */
  document.getElementById('adhStatusTabs').addEventListener('click', function (e) {
    var btn = e.target.closest('.adh-tab');
    if (!btn) return;
    this.querySelectorAll('.adh-tab').forEach(function (b) { b.classList.remove('adh-tab--active'); });
    btn.classList.add('adh-tab--active');
    fStatus = btn.dataset.status;
    applyFilter();
  });

  /* 검색 */
  document.getElementById('adhSearch').addEventListener('input', function () {
    fQuery = this.value.trim();
    applyFilter();
  });

  /* 행/버튼 클릭 → 상세 */
  document.getElementById('adhTbody').addEventListener('click', function (e) {
    var btn = e.target.closest('.adh-btn-detail');
    var row = e.target.closest('tr[data-id]');
    var id  = btn ? btn.dataset.id : (row ? row.dataset.id : null);
    if (id) window.location.href = 'admin-doc-detail.html?id=' + id;
  });

  applyFilter();
});
