/* ================================================================
   LAWSIGN – DASHBOARD HELPER
   사이드바 / 탑바를 대시보드 페이지에 단일 파일로 삽입
   ================================================================ */

(function () {
  var _el  = document.currentScript;
  var _src = _el ? (_el.getAttribute('src') || '') : '';
  var base = _src.replace('dashboard-helper.js', '');

  /* ── 비로그인 차단 ── */
  if (sessionStorage.getItem('logged_in') !== 'true') {
    window.location.href = base + 'login.html';
    return;
  }

  var userName  = sessionStorage.getItem('user_name')  || '사용자';
  var userEmail = sessionStorage.getItem('user_email') || '';
  var currentPage = window.location.pathname.split('/').pop() || 'mypage.html';

  /* ── 아이콘 (inline SVG) ── */
  var ICON_LOGOUT = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4h4v12h-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13.5l4-3.5-4-3.5M12 10H3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var ICON_DOC      = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#sdi1)"><path d="M6 10H17" stroke="#7D7D7D" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16L16.9277 10.4596C17.3317 10.2864 17.3317 9.71359 16.9277 9.54043L4 4L5.69207 10L4 16Z" stroke="#7D7D7D" stroke-linejoin="round"/></g><defs><clipPath id="sdi1"><rect width="14" height="16" fill="white" transform="translate(18 3) rotate(90)"/></clipPath></defs></svg>';
  var ICON_DOC_FILL = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#sdi2)"><path d="M4 16L16.9277 10.4596C17.3317 10.2864 17.3317 9.71359 16.9277 9.54043L4 4L5.69207 10L4 16Z" fill="#FC9950"/><path d="M6 10H17" stroke="#FFF4ED" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16L16.9277 10.4596C17.3317 10.2864 17.3317 9.71359 16.9277 9.54043L4 4L5.69207 10L4 16Z" stroke="#FC9950" stroke-linejoin="round"/></g><defs><clipPath id="sdi2"><rect width="14" height="16" fill="white" transform="translate(18 3) rotate(90)"/></clipPath></defs></svg>';
  var ICON_PERSON      = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="10" cy="6.51786" rx="4.01786" ry="4.01786" stroke="#7D7D7D" stroke-width="1.25"/><path d="M16.25 16.7856C16.25 15.128 15.5915 13.5383 14.4194 12.3662C13.2473 11.1941 11.6576 10.5356 10 10.5356C8.3424 10.5356 6.75269 11.1941 5.58058 12.3662C4.40848 13.5383 3.75 15.128 3.75 16.7856" stroke="#7D7D7D" stroke-width="1.25" stroke-linecap="round"/></svg>';
  var ICON_PERSON_FILL = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="10" cy="6.51786" rx="4.01786" ry="4.01786" fill="#FC9950" stroke="#FC9950" stroke-width="1.25"/><path d="M14.4194 12.3662C15.5915 13.5383 16.25 15.128 16.25 16.7856L3.75 16.7856C3.75 15.128 4.40848 13.5383 5.58058 12.3662C6.75269 11.1941 8.3424 10.5356 10 10.5356C11.6576 10.5356 13.2473 11.1941 14.4194 12.3662Z" fill="#FC9950" stroke="#FC9950" stroke-width="1.25" stroke-linecap="round"/></svg>';

  var navItems = [
    { page: 'mypage.html', href: base + 'mypage.html', label: '내 문서함', icon: ICON_DOC,    iconActive: ICON_DOC_FILL    },
    { page: 'myinfo.html', href: base + 'myinfo.html', label: '내 정보',   icon: ICON_PERSON, iconActive: ICON_PERSON_FILL },
  ];

  /* ── 사이드바 HTML ── */
  function buildSidebar() {
    var activePage = currentPage === 'doc-detail.html' ? 'mypage.html' : currentPage;
    var navHTML = navItems.map(function (item) {
      var active = activePage === item.page;
      var iconSrc = active ? item.iconActive : item.icon;
      return '<a href="' + item.href + '" class="sb-nav-item' + (active ? ' sb-nav-item--active' : '') + '">' +
        '<span class="sb-nav-icon">' + iconSrc + '</span>' +
        '<span>' + item.label + '</span>' +
      '</a>';
    }).join('');

    /* 성(lastName): 이름 첫 글자 */
    var lastName = userName ? userName.charAt(0) : '?';

    return (
      '<div class="sb-top">' +
        '<div class="sb-logo-wrap">' +
          '<a href="' + base + 'index.html" class="sb-logo-text">Lawsign</a>' +
        '</div>' +
        '<div class="sb-profile">' +
          '<div class="sb-avatar">' + lastName + '</div>' +
          '<div class="sb-profile-info">' +
            '<span class="sb-profile-name">' + userName + '님</span>' +
            '<span class="sb-profile-email">' + (userEmail || 'Lawsign@Lawsign.com') + '</span>' +
          '</div>' +
        '</div>' +
        '<a href="' + base + 'select-situation.html" class="sb-cta">새 내용증명 작성하기</a>' +
        '<nav class="sb-nav">' + navHTML + '</nav>' +
      '</div>' +
      '<div class="sb-bottom">' +
        '<button class="sb-logout" id="dbLogoutBtn">' +
          ICON_LOGOUT +
          '<span>로그아웃</span>' +
        '</button>' +
      '</div>'
    );
  }

  /* ── 알림 더미 데이터 ── */
  var NOTIF_DOCS = [
    { id: 1, status: 'sent',  statusLabel: '발송완료', title: '부동산 매매 계약 해체 통보', date: '2025. 12. 01', recipient: '김영수' },
    { id: 2, status: 'read',  statusLabel: '열람완료', title: '임대차 보증금 반환 청구',    date: '2025. 11. 20', recipient: '박철수' },
    { id: 3, status: 'read',  statusLabel: '열람완료', title: '층간소음 시정 요구',          date: '2025. 11. 10', recipient: '이영희' },
  ];

  /* ── 탑바 HTML ── */
  var titleMap = { 'mypage.html': '내 문서함', 'myinfo.html': '내 정보', 'doc-detail.html': '내 문서함' };

  function buildTopbar() {
    return (
      '<span class="db-topbar-title">' + (titleMap[currentPage] || '대시보드') + '</span>' +
      '<div class="db-topbar-actions" style="position:relative;">' +
        '<button class="db-topbar-icon" id="notifBtn" title="알림">' +
          '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3a6 6 0 016 6v3l1.5 2.5H3.5L5 12V9a6 6 0 016-6z" stroke="#333" stroke-width="1.4"/><path d="M9 18a2 2 0 004 0" stroke="#333" stroke-width="1.4" stroke-linecap="round"/></svg>' +
          '<span class="notif-badge">' + NOTIF_DOCS.length + '</span>' +
        '</button>' +
        '<div class="notif-panel" id="notifPanel">' +
          '<div class="notif-panel-header">' +
          '<span>알림</span>' +
          '<button class="notif-clear-btn" id="notifClearBtn">전체 삭제</button>' +
        '</div>' +
          NOTIF_DOCS.map(function (doc) {
            var colorClass = doc.status === 'read' ? 'notif-status--read' : 'notif-status--sent';
            return '<div class="notif-item" data-id="' + doc.id + '">' +
              '<div class="notif-item-top">' +
                '<span class="notif-status ' + colorClass + '">' + doc.statusLabel + '</span>' +
                '<span class="notif-date">' + doc.date + '</span>' +
              '</div>' +
              '<div class="notif-title">' + doc.title + '</div>' +
              '<div class="notif-recipient">수신인 : ' + doc.recipient + '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>'
    );
  }

  /* ── DOM 준비 후 삽입 ── */
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('dbSidebar');
    if (sidebar) sidebar.innerHTML = buildSidebar();

    var topbar = document.getElementById('dbTopbar');
    if (topbar) topbar.innerHTML = buildTopbar();

    var logoutBtn = document.getElementById('dbLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        sessionStorage.clear();
        window.location.href = base + 'login.html';
      });
    }

    /* 알림 패널 토글 */
    var notifBtn   = document.getElementById('notifBtn');
    var notifPanel = document.getElementById('notifPanel');

    if (notifBtn && notifPanel) {
      notifBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        notifPanel.classList.toggle('notif-panel--open');
      });

      /* 전체 삭제 */
      var clearBtn = document.getElementById('notifClearBtn');
      if (clearBtn) {
        clearBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          var items = notifPanel.querySelectorAll('.notif-item');
          items.forEach(function (item) { item.remove(); });
          notifBtn.querySelector('.notif-badge').style.display = 'none';
          clearBtn.style.display = 'none';
          var emptyEl = document.createElement('div');
          emptyEl.className = 'notif-empty';
          emptyEl.innerHTML =
            '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#E9EAED"/><path d="M24 13a9 9 0 019 9v4.5l2.25 3.75H12.75L15 26.5V22a9 9 0 019-9z" stroke="#9EA3AD" stroke-width="2"/><path d="M20.5 37a3.5 3.5 0 007 0" stroke="#9EA3AD" stroke-width="2" stroke-linecap="round"/></svg>' +
            '<p class="notif-empty-title">새로운 알림이 없습니다.</p>' +
            '<p class="notif-empty-desc">내용증명 발송 후 열람 현황을<br>이곳에서 모아볼 수 있어요.</p>';
          notifPanel.appendChild(emptyEl);
        });
      }

      /* 알림 항목 클릭 → 문서 상세 */
      notifPanel.addEventListener('click', function (e) {
        var item = e.target.closest('.notif-item');
        if (!item) return;
        var id = item.dataset.id;
        notifPanel.classList.remove('notif-panel--open');
        window.location.href = base + 'doc-detail.html?id=' + id;
      });

      /* 외부 클릭 시 닫기 */
      document.addEventListener('click', function () {
        notifPanel.classList.remove('notif-panel--open');
      });
    }
  });
})();
