/* ================================================================
   LAWSIGN – SEND HISTORY JS
   발송 현황 페이지 로직
   ================================================================ */

var PAGE_SIZE = 10;
var currentPage = 1;
var filtered = HISTORY_DATA.slice();
var filterChannel = '';
var filterStatus  = '';
var filterQuery   = '';

/* ── 오늘 날짜 키 (YYYY-MM-DD) ── */
var _now   = new Date();
var _today = _now.getFullYear() + '-' +
  String(_now.getMonth() + 1).padStart(2, '0') + '-' +
  String(_now.getDate()).padStart(2, '0');
var _thisMonth = _today.slice(0, 7);
var _weekAgo   = new Date(_now.getTime() - 7 * 24 * 60 * 60 * 1000);

/* ── 통계 계산 ── */
function calcStats() {
  var today = 0, week = 0, month = 0;
  HISTORY_DATA.forEach(function (d) {
    if (d.sendDate === _today) today++;
    if (new Date(d.sendDate) >= _weekAgo) week++;
    if (d.sendDate.startsWith(_thisMonth)) month++;
  });
  document.getElementById('statToday').textContent = today;
  document.getElementById('statWeek').textContent  = week;
  document.getElementById('statMonth').textContent = month;
}

/* ── 필터 적용 ── */
function applyFilter() {
  filtered = HISTORY_DATA.filter(function (d) {
    if (filterChannel && d.channel !== filterChannel) return false;
    if (filterStatus  && d.status  !== filterStatus)  return false;
    if (filterQuery) {
      var q = filterQuery.toLowerCase();
      if (!d.title.toLowerCase().includes(q) && !d.recipient.toLowerCase().includes(q)) return false;
    }
    return true;
  });
  currentPage = 1;
  render();
}

/* ── 채널 뱃지 ── */
function channelBadge(d) {
  var cls = d.channel === 'kakao_edoc' ? 'sh-badge--edoc' : 'sh-badge--alim';
  return '<span class="sh-badge ' + cls + '">' + d.channelLabel + '</span>';
}

/* ── 상태 뱃지 ── */
var statusCls = { sent: 'sh-status--sent', received: 'sh-status--received', read: 'sh-status--read', failed: 'sh-status--failed' };

function statusBadge(d) {
  return '<span class="sh-status-badge ' + (statusCls[d.status] || '') + '">' + d.statusLabel + '</span>';
}

/* ── 테이블 렌더 ── */
function render() {
  var total      = filtered.length;
  var totalPages = Math.ceil(total / PAGE_SIZE) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  var start = (currentPage - 1) * PAGE_SIZE;
  var page  = filtered.slice(start, start + PAGE_SIZE);

  document.getElementById('shCount').textContent = total;

  var tbody = document.getElementById('shTbody');
  if (total === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="sh-empty">발송 내역이 없습니다.</td></tr>';
  } else {
    tbody.innerHTML = page.map(function (d, idx) {
      return '<tr class="sh-row" data-id="' + d.id + '">' +
        '<td class="sh-td-center">' + (start + idx + 1) + '</td>' +
        '<td class="sh-td-center">' + d.recipient + '</td>' +
        '<td class="sh-td-title">' + d.title + '</td>' +
        '<td class="sh-td-center">' + channelBadge(d) + '</td>' +
        '<td class="sh-td-center">' + statusBadge(d) + '</td>' +
        '<td class="sh-td-center">' + d.sendDate.replace(/-/g, '. ') + '</td>' +
      '</tr>';
    }).join('');
  }

  document.getElementById('shPageInfo').textContent =
    total + '건  ' + currentPage + ' / ' + totalPages + ' 페이지';

  renderPagination(totalPages);
}

/* ── 페이지네이션 ── */
function renderPagination(totalPages) {
  var nav = document.getElementById('shPageNav');
  var GROUP = 10;
  var gs = Math.floor((currentPage - 1) / GROUP) * GROUP + 1;
  var ge = Math.min(gs + GROUP - 1, totalPages);

  var html = '<button class="sh-pg-btn sh-pg-arr" id="pgFirst">«</button>' +
             '<button class="sh-pg-btn sh-pg-arr" id="pgPrev">‹</button>';
  for (var i = gs; i <= ge; i++) {
    html += '<button class="sh-pg-btn' + (i === currentPage ? ' sh-pg-btn--active' : '') + '" data-page="' + i + '">' + i + '</button>';
  }
  html += '<button class="sh-pg-btn sh-pg-arr" id="pgNext">›</button>' +
          '<button class="sh-pg-btn sh-pg-arr" id="pgLast">»</button>';
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
  document.getElementById('channelTabs').addEventListener('click', function (e) {
    var btn = e.target.closest('.sh-tab');
    if (!btn) return;
    this.querySelectorAll('.sh-tab').forEach(function (b) { b.classList.remove('sh-tab--active'); });
    btn.classList.add('sh-tab--active');
    filterChannel = btn.dataset.channel;
    applyFilter();
  });

  /* 상태 탭 */
  document.getElementById('statusTabs').addEventListener('click', function (e) {
    var btn = e.target.closest('.sh-tab');
    if (!btn) return;
    this.querySelectorAll('.sh-tab').forEach(function (b) { b.classList.remove('sh-tab--active'); });
    btn.classList.add('sh-tab--active');
    filterStatus = btn.dataset.status;
    applyFilter();
  });

  /* 검색 */
  var searchInput = document.getElementById('shSearch');
  searchInput.addEventListener('input', function () {
    filterQuery = this.value.trim();
    applyFilter();
  });

  /* 행 클릭 → 문서 상세 */
  document.getElementById('shTbody').addEventListener('click', function (e) {
    var row = e.target.closest('.sh-row');
    if (!row) return;
    window.location.href = 'doc-detail.html?id=' + row.dataset.id;
  });

  applyFilter();
});
