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
var statusLabel = { read: '열람됨', failed: '발송 실패' };
var statusCls   = { read: 'adh-status--read', failed: 'adh-status--failed' };

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
        '<td>' + (statusLabel[d.status] ? '<span class="adh-status ' + statusCls[d.status] + '">' + statusLabel[d.status] + '</span>' : '–') + '</td>' +
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

/* ── 날짜 범위 피커 상태 ── */
var calYear    = new Date().getFullYear();
var calMonth   = new Date().getMonth();
var rangeStart = null;
var rangeEnd   = null;
var calPicking = false;

function pad2(n) { return String(n).padStart(2, '0'); }

function renderCal() {
  var monthNames = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  document.getElementById('adhCalMonthLabel').textContent = calYear + '년 ' + monthNames[calMonth];

  var t = new Date();
  var todayStr = t.getFullYear() + '-' + pad2(t.getMonth()+1) + '-' + pad2(t.getDate());
  var firstDay    = new Date(calYear, calMonth, 1).getDay();
  var daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  var html = '';
  for (var i = 0; i < firstDay; i++) {
    html += '<div class="adh-cal-day adh-cal-day--empty"></div>';
  }
  for (var d = 1; d <= daysInMonth; d++) {
    var ds  = calYear + '-' + pad2(calMonth + 1) + '-' + pad2(d);
    var cls = 'adh-cal-day';
    if (ds === todayStr) cls += ' adh-cal-day--today';
    if (rangeStart && ds === rangeStart) cls += ' adh-cal-day--start';
    if (rangeEnd   && ds === rangeEnd)   cls += ' adh-cal-day--end';
    if (rangeStart && rangeEnd && ds > rangeStart && ds < rangeEnd) cls += ' adh-cal-day--range';
    html += '<div class="' + cls + '" data-date="' + ds + '">' + d + '</div>';
  }
  document.getElementById('adhCalGrid').innerHTML = html;
}

function updateDateLabel() {
  var lbl = document.getElementById('adhDateLabel');
  if (rangeStart && rangeEnd) {
    lbl.textContent = rangeStart.replace(/-/g, '.') + ' ~ ' + rangeEnd.replace(/-/g, '.');
  } else if (rangeStart) {
    lbl.textContent = rangeStart.replace(/-/g, '.') + ' ~ ...';
  } else {
    lbl.textContent = '날짜 선택';
  }
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
    e.stopPropagation();
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

  /* ── 날짜 범위 피커 ── */
  var datePopup   = document.getElementById('adhDatePopup');
  var dateTrigger = document.getElementById('adhDateTrigger');

  dateTrigger.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = datePopup.classList.contains('adh-daterange-popup--open');
    datePopup.classList.toggle('adh-daterange-popup--open', !isOpen);
    if (!isOpen) renderCal();
  });

  datePopup.addEventListener('click', function (e) { e.stopPropagation(); });

  document.getElementById('adhCalPrev').addEventListener('click', function () {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCal();
  });

  document.getElementById('adhCalNext').addEventListener('click', function () {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCal();
  });

  document.getElementById('adhCalGrid').addEventListener('click', function (e) {
    var day = e.target.closest('.adh-cal-day');
    if (!day || day.classList.contains('adh-cal-day--empty') || !day.dataset.date) return;
    var ds = day.dataset.date;
    if (!calPicking) {
      rangeStart = ds;
      rangeEnd   = null;
      calPicking = true;
    } else {
      if (ds < rangeStart) { rangeEnd = rangeStart; rangeStart = ds; }
      else                 { rangeEnd = ds; }
      calPicking = false;
    }
    updateDateLabel();
    renderCal();
  });

  document.getElementById('adhDateReset').addEventListener('click', function () {
    rangeStart = null; rangeEnd = null; calPicking = false;
    fDateFrom = ''; fDateTo = '';
    updateDateLabel();
    renderCal();
    applyFilter();
  });

  document.getElementById('adhDateApply').addEventListener('click', function () {
    fDateFrom = rangeStart || '';
    fDateTo   = rangeEnd   || rangeStart || '';
    datePopup.classList.remove('adh-daterange-popup--open');
    applyFilter();
  });

  /* 드롭다운 + 피커 외부 클릭 닫기 */
  document.addEventListener('click', function () {
    document.querySelectorAll('.adh-dropdown--open').forEach(function (el) {
      el.classList.remove('adh-dropdown--open');
    });
    datePopup.classList.remove('adh-daterange-popup--open');
  });

  /* 검색 버튼 */
  function doSearch() {
    fQuery = document.getElementById('adhSearchInput').value.trim();
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
