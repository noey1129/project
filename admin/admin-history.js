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
var fDateFrom  = '';
var fDateTo    = '';

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
    if (fDateFrom && d.sendDate < fDateFrom)  return false;
    if (fDateTo   && d.sendDate > fDateTo)    return false;
    if (fQuery) {
      var q = fQuery.toLowerCase();
      if (!d.sender.toLowerCase().includes(q) &&
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
var statusLabel = { sent: '발송됨', read: '열람됨', failed: '발송 실패' };
var statusCls   = { sent: 'adh-status--sent', read: 'adh-status--read', failed: 'adh-status--failed' };

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
        '<td>' + (methodLabel[d.sendMethod] || d.sendMethod) + '</td>' +
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

/* ── 드롭다운 초기화 ── */
function initDropdown(selId, dropId, onSelect) {
  var sel  = document.getElementById(selId);
  var drop = document.getElementById(dropId);
  if (!sel || !drop) return;

  sel.addEventListener('click', function (e) {
    e.stopPropagation();
    drop.classList.toggle('adh-dropdown--open');
  });

  drop.addEventListener('click', function (e) {
    var item = e.target.closest('.adh-dropdown-item');
    if (!item) return;
    drop.querySelectorAll('.adh-dropdown-item').forEach(function (el) {
      el.classList.remove('adh-dropdown-item--active');
    });
    item.classList.add('adh-dropdown-item--active');
    var label = sel.querySelector('.adh-select-label');
    if (label) label.textContent = item.textContent;
    drop.classList.remove('adh-dropdown--open');
    onSelect(item.dataset.value);
  });
}

/* ── DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', function () {
  calcStats();

  /* 채널 드롭다운 */
  initDropdown('adhSelChannel', 'adhDropChannel', function (val) {
    fChannel = val;
    applyFilter();
  });

  /* 상태 드롭다운 */
  initDropdown('adhSelStatus', 'adhDropStatus', function (val) {
    fStatus = val;
    applyFilter();
  });

  /* 드롭다운 외부 클릭 닫기 */
  document.addEventListener('click', function () {
    document.querySelectorAll('.adh-dropdown--open').forEach(function (el) {
      el.classList.remove('adh-dropdown--open');
    });
  });

  /* 검색 버튼 */
  function doSearch() {
    fQuery    = document.getElementById('adhSearchInput').value.trim();
    fDateFrom = document.getElementById('adhDateFrom').value;
    fDateTo   = document.getElementById('adhDateTo').value;
    applyFilter();
  }

  document.getElementById('adhSearchBtn').addEventListener('click', doSearch);
  document.getElementById('adhSearchInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') doSearch();
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
