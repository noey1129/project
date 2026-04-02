/* ================================================================
   LAWSIGN – ADMIN MEMBERS JS
   회원 관리 페이지 로직 (필터, 검색, 페이지네이션, 모달)
   ================================================================ */

var PAGE_SIZE = 15;
var currentPage = 1;
var filtered = MEMBERS_DATA.slice();

var statusLabel = { active: '활성', suspended: '정지', withdrawn: '탈퇴' };
var statusCls   = {
  active:    'mem-status--active',
  suspended: 'mem-status--suspended',
  withdrawn: 'mem-status--withdrawn'
};

/* ── 현재 필터 상태 ── */
var filterState = { method: '', status: '', range: '', query: '' };

function applyFilter() {
  filtered = MEMBERS_DATA.filter(function (m) {
    if (filterState.method && m.method !== filterState.method) return false;
    if (filterState.status) {
      var st = { '활성': 'active', '정지': 'suspended', '탈퇴': 'withdrawn' }[filterState.status];
      if (m.status !== st) return false;
    }
    if (filterState.range) {
      var days = parseInt(filterState.range);
      var joinMs  = new Date(m.joinDate).getTime();
      var cutoff  = Date.now() - days * 24 * 60 * 60 * 1000;
      if (joinMs < cutoff) return false;
    }
    if (filterState.query) {
      var q = filterState.query.toLowerCase();
      if (!m.name.includes(filterState.query) && !m.email.toLowerCase().includes(q)) return false;
    }
    return true;
  });
  currentPage = 1;
  render();
}

/* ── 행 뱃지 HTML ── */
function statusBadge(status) {
  var label = statusLabel[status] || status;
  return '<span class="mem-status-badge ' + (statusCls[status] || '') + '">' + label + '</span>';
}

function methodBadge(method) {
  return '<span class="mem-method-badge">' + method + '</span>';
}

/* ── 테이블 렌더링 ── */
function render() {
  var total    = filtered.length;
  var totalPages = Math.ceil(total / PAGE_SIZE) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  var start = (currentPage - 1) * PAGE_SIZE;
  var page  = filtered.slice(start, start + PAGE_SIZE);

  var tbody = document.getElementById('memTbody');
  tbody.innerHTML = page.map(function (m, idx) {
    return '<tr data-id="' + m.id + '">' +
      '<td style="text-align:center;">' + (start + idx + 1) + '</td>' +
      '<td style="text-align:center;">' + m.name + '</td>' +
      '<td style="text-align:center;">' + methodBadge(m.method) + '</td>' +
      '<td style="text-align:center;">' + m.email + '</td>' +
      '<td style="text-align:center;">' + m.joinDate + '</td>' +
      '<td style="text-align:center;">' + statusBadge(m.status) + '</td>' +
      '<td style="text-align:center;">' + m.sendCount + '건</td>' +
      '<td style="text-align:center;">' +
        '<button class="mem-btn-detail" data-id="' + m.id + '">상세보기</button>' +
        '<button class="mem-btn-memo"   data-id="' + m.id + '">메모</button>' +
      '</td>' +
    '</tr>';
  }).join('');

  /* 페이지 정보 */
  var pageCount = Math.ceil(total / PAGE_SIZE) || 1;
  document.getElementById('memPageInfo').textContent =
    total + '개 보기  ' + currentPage + '/' + pageCount + ' 페이지, 전체 : ' + total + '건';

  renderPagination(pageCount);
}

/* ── 페이지네이션 ── */
function renderPagination(totalPages) {
  var nav = document.getElementById('memPageNav');
  var GROUP = 10;
  var groupStart = Math.floor((currentPage - 1) / GROUP) * GROUP + 1;
  var groupEnd   = Math.min(groupStart + GROUP - 1, totalPages);

  var html = '<button class="mem-page-btn mem-page-btn--arrow" id="pgFirst">«</button>' +
             '<button class="mem-page-btn mem-page-btn--arrow" id="pgPrev">‹</button>';
  for (var i = groupStart; i <= groupEnd; i++) {
    var active = i === currentPage ? ' mem-page-btn--active' : '';
    html += '<button class="mem-page-btn' + active + '" data-page="' + i + '">' + i + '</button>';
  }
  html += '<button class="mem-page-btn mem-page-btn--arrow" id="pgNext">›</button>' +
          '<button class="mem-page-btn mem-page-btn--arrow" id="pgLast">»</button>';
  nav.innerHTML = html;

  nav.querySelectorAll('[data-page]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentPage = parseInt(this.dataset.page);
      render();
    });
  });
  document.getElementById('pgFirst').addEventListener('click', function () { currentPage = 1; render(); });
  document.getElementById('pgPrev').addEventListener('click', function ()  { if (currentPage > 1) { currentPage--; render(); } });
  document.getElementById('pgNext').addEventListener('click', function ()  { if (currentPage < totalPages) { currentPage++; render(); } });
  document.getElementById('pgLast').addEventListener('click', function ()  { currentPage = totalPages; render(); });
}

/* ── 드롭다운 ── */
function initDropdown(selectId, dropId, stateKey, labelDefault) {
  var sel  = document.getElementById(selectId);
  var drop = document.getElementById(dropId);

  sel.addEventListener('click', function (e) {
    e.stopPropagation();
    document.querySelectorAll('.mem-dropdown').forEach(function (d) { d.classList.remove('mem-dropdown--open'); });
    drop.classList.toggle('mem-dropdown--open');
  });

  drop.querySelectorAll('.mem-dropdown-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      drop.querySelectorAll('.mem-dropdown-item').forEach(function (i) { i.classList.remove('mem-dropdown-item--active'); });
      item.classList.add('mem-dropdown-item--active');
      filterState[stateKey] = item.dataset.value;
      sel.querySelector('.mem-select-label').textContent = item.dataset.value || labelDefault;
      drop.classList.remove('mem-dropdown--open');
      applyFilter();
    });
  });
}

/* ── 메모 모달 ── */
var currentMemoId = null;

function openMemo(id) {
  var member = MEMBERS_DATA.find(function (m) { return m.id === id; });
  if (!member) return;
  currentMemoId = id;

  document.getElementById('memoAvatar').textContent      = member.name.charAt(0);
  document.getElementById('memoMemberName').textContent  = member.name;
  document.getElementById('memoMemberEmail').textContent = member.email;

  var textarea = document.getElementById('memoText');
  textarea.value = member.memo || '';
  document.getElementById('memoCharCount').textContent = textarea.value.length;

  document.getElementById('memoOverlay').classList.add('mem-modal-overlay--open');
  setTimeout(function () { textarea.focus(); }, 50);
}

function closeMemo() {
  document.getElementById('memoOverlay').classList.remove('mem-modal-overlay--open');
  currentMemoId = null;
}

/* ── 상세 모달 ── */
function openDetail(id) {
  var member = MEMBERS_DATA.find(function (m) { return m.id === id; });
  if (!member) return;
  var sl = statusLabel[member.status] || member.status;
  var sc = statusCls[member.status]   || '';
  document.getElementById('detailBody').innerHTML =
    '<div class="mem-detail-row"><span class="mem-detail-key">이름</span><span class="mem-detail-val">' + member.name + '</span></div>' +
    '<div class="mem-detail-row"><span class="mem-detail-key">가입방법</span><span class="mem-detail-val">' + methodBadge(member.method) + '</span></div>' +
    '<div class="mem-detail-row"><span class="mem-detail-key">이메일</span><span class="mem-detail-val">' + member.email + '</span></div>' +
    '<div class="mem-detail-row"><span class="mem-detail-key">가입일</span><span class="mem-detail-val">' + member.joinDate + '</span></div>' +
    '<div class="mem-detail-row"><span class="mem-detail-key">상태</span><span class="mem-detail-val"><span class="mem-status-badge ' + sc + '">' + sl + '</span></span></div>' +
    '<div class="mem-detail-row"><span class="mem-detail-key">발송건수</span><span class="mem-detail-val">' + member.sendCount + '건</span></div>' +
    '<div class="mem-detail-row"><span class="mem-detail-key">메모</span><span class="mem-detail-val">' + (member.memo || '없음') + '</span></div>';
  document.getElementById('detailOverlay').classList.add('mem-modal-overlay--open');
}

function closeDetail() {
  document.getElementById('detailOverlay').classList.remove('mem-modal-overlay--open');
}

/* ── DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', function () {
  initDropdown('filterMethod', 'dropMethod', 'method', '가입방법');
  initDropdown('filterStatus', 'dropStatus', 'status', '상태');
  initDropdown('filterRange',  'dropRange',  'range',  '전체');

  document.getElementById('searchBtn').addEventListener('click', function () {
    filterState.query = document.getElementById('searchInput').value.trim();
    applyFilter();
  });
  document.getElementById('searchInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { filterState.query = this.value.trim(); applyFilter(); }
  });

  /* 테이블 이벤트 위임 */
  document.getElementById('memTbody').addEventListener('click', function (e) {
    var detailBtn = e.target.closest('.mem-btn-detail');
    var memoBtn   = e.target.closest('.mem-btn-memo');
    if (detailBtn) openDetail(parseInt(detailBtn.dataset.id));
    if (memoBtn)   openMemo(parseInt(memoBtn.dataset.id));
  });

  /* 글자 수 카운터 */
  document.getElementById('memoText').addEventListener('input', function () {
    document.getElementById('memoCharCount').textContent = this.value.length;
  });

  /* 메모 저장 */
  document.getElementById('memoSave').addEventListener('click', function () {
    if (currentMemoId === null) return;
    var member = MEMBERS_DATA.find(function (m) { return m.id === currentMemoId; });
    if (member) member.memo = document.getElementById('memoText').value.trim();
    closeMemo();
  });
  document.getElementById('memoCancel').addEventListener('click', closeMemo);
  document.getElementById('memoClose').addEventListener('click', closeMemo);
  document.getElementById('detailClose').addEventListener('click', closeDetail);

  document.getElementById('memoOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeMemo();
  });
  document.getElementById('detailOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeDetail();
  });

  /* 드롭다운 외부 클릭 닫기 */
  document.addEventListener('click', function () {
    document.querySelectorAll('.mem-dropdown').forEach(function (d) { d.classList.remove('mem-dropdown--open'); });
  });

  applyFilter();
});
