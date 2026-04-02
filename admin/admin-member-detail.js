/* ================================================================
   LAWSIGN – ADMIN MEMBER DETAIL JS
   ================================================================ */

var memberId = parseInt(new URLSearchParams(window.location.search).get('id'));
var member   = MEMBERS_DATA.find(function (m) { return m.id === memberId; });

if (!member) {
  window.location.href = 'admin-members.html';
}

var statusLabel = { active: '활성', suspended: '정지', withdrawn: '탈퇴' };
var statusCls   = { active: 'mem-status--active', suspended: 'mem-status--suspended', withdrawn: 'mem-status--withdrawn' };

/* ── 토스트 ── */
function showToast(msg) {
  var toast = document.getElementById('mdtToast');
  toast.textContent = msg;
  toast.classList.add('mdt-toast--show');
  setTimeout(function () { toast.classList.remove('mdt-toast--show'); }, 2200);
}

/* ── 화면 렌더 ── */
function renderPage() {
  /* 헤더 */
  document.getElementById('mdtAvatar').textContent    = member.name.charAt(0);
  document.getElementById('mdtName').textContent      = member.name;
  document.getElementById('mdtEmail').textContent     = member.email;

  var badge = document.getElementById('mdtStatusBadge');
  badge.textContent  = statusLabel[member.status] || member.status;
  badge.className    = 'mem-status-badge ' + (statusCls[member.status] || '');

  /* 기본 정보 */
  document.getElementById('mdtInfoName').textContent     = member.name;
  document.getElementById('mdtInfoMethod').innerHTML     = '<span class="mem-method-badge">' + member.method + '</span>';
  document.getElementById('mdtInfoEmail').textContent    = member.email;
  document.getElementById('mdtInfoJoinDate').textContent = member.joinDate;
  document.getElementById('mdtInfoStatus').innerHTML     =
    '<span class="mem-status-badge ' + (statusCls[member.status] || '') + '">' + (statusLabel[member.status] || member.status) + '</span>';
  document.getElementById('mdtInfoSendCount').textContent = member.sendCount + '건';

  /* 사용 통계 */
  var thisMonth = new Date().toISOString().slice(0, 7); /* YYYY-MM */
  var memberDocs = ADMIN_DOCS.filter(function (d) {
    return d.sender === member.name || d.senderId === member.id;
  });
  var monthDocs = memberDocs.filter(function (d) { return d.sendDate && d.sendDate.startsWith(thisMonth); });
  document.getElementById('mdtStatTotal').textContent = member.sendCount + '건';
  document.getElementById('mdtStatMonth').textContent = monthDocs.length + '건';

  /* 관리 액션 버튼 */
  renderToggleBtn();

  /* 관리자 메모 */
  var textarea = document.getElementById('mdtMemoText');
  textarea.value = member.memo || '';
  document.getElementById('mdtCharCount').textContent = textarea.value.length;
}

function renderToggleBtn() {
  var btn = document.getElementById('mdtToggleBtn');
  var sub = document.getElementById('mdtActionSub');

  if (member.status === 'active') {
    btn.textContent = '계정 정지';
    btn.className   = 'mdt-action-btn mdt-action-btn--suspend';
    sub.textContent = '현재 활성 상태입니다. 정지하면 로그인이 차단됩니다.';
  } else if (member.status === 'suspended') {
    btn.textContent = '계정 활성화';
    btn.className   = 'mdt-action-btn mdt-action-btn--activate';
    sub.textContent = '현재 정지 상태입니다. 활성화하면 로그인이 가능합니다.';
  } else {
    btn.textContent = '계정 활성화';
    btn.className   = 'mdt-action-btn mdt-action-btn--activate';
    sub.textContent = '현재 탈퇴 상태입니다. 활성화하면 로그인이 가능합니다.';
  }
}

/* ── DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', function () {
  renderPage();

  /* 상태 토글 */
  document.getElementById('mdtToggleBtn').addEventListener('click', function () {
    if (member.status === 'active') {
      member.status = 'suspended';
      showToast('계정이 정지되었습니다.');
    } else {
      member.status = 'active';
      showToast('계정이 활성화되었습니다.');
    }
    renderPage();
  });

  /* 탈퇴 처리 */
  document.getElementById('mdtWithdrawBtn').addEventListener('click', function () {
    if (member.status === 'withdrawn') {
      showToast('이미 탈퇴 처리된 회원입니다.');
      return;
    }
    if (!confirm(member.name + ' 회원을 탈퇴 처리하시겠습니까?')) return;
    member.status = 'withdrawn';
    showToast('탈퇴 처리되었습니다.');
    renderPage();
  });

  /* 글자 수 카운터 */
  document.getElementById('mdtMemoText').addEventListener('input', function () {
    document.getElementById('mdtCharCount').textContent = this.value.length;
  });

  /* 메모 저장 */
  document.getElementById('mdtMemoSave').addEventListener('click', function () {
    member.memo = document.getElementById('mdtMemoText').value.trim();
    showToast('메모가 저장되었습니다.');
  });
});
