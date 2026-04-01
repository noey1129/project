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

  /* ── 아이콘 ── */
  var ICON_DOC = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3.5" y="2.5" width="13" height="15" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 7.5h6M7 11h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
  var ICON_PERSON = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.25" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 17.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
  var ICON_LOGOUT = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4h4v12h-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13.5l4-3.5-4-3.5M12 10H3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var navItems = [
    { page: 'mypage.html',  href: base + 'mypage.html',  label: '내 문서함', icon: ICON_DOC },
    { page: 'myinfo.html',  href: base + 'myinfo.html',  label: '내 정보',   icon: ICON_PERSON },
  ];

  /* ── 사이드바 HTML ── */
  function buildSidebar() {
    var navHTML = navItems.map(function (item) {
      var activePage = currentPage === 'doc-detail.html' ? 'mypage.html' : currentPage;
      var active = activePage === item.page;
      return '<a href="' + item.href + '" class="sb-nav-item' + (active ? ' sb-nav-item--active' : '') + '">' +
        '<span class="sb-nav-icon">' + item.icon + '</span>' +
        '<span>' + item.label + '</span>' +
      '</a>';
    }).join('');

    return (
      '<div class="sb-top">' +
        '<div class="sb-logo-wrap">' +
          '<a href="' + base + 'index.html" class="sb-logo-text">Lawsign</a>' +
        '</div>' +
        '<div class="sb-profile">' +
          '<div class="sb-avatar"></div>' +
          '<div class="sb-avatar"></div>' +
          '<div class="sb-profile-divider"></div>' +
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

  /* ── 탑바 HTML ── */
  var titleMap = { 'mypage.html': '내 문서함', 'myinfo.html': '내 정보', 'doc-detail.html': '내 문서함' };

  function buildTopbar() {
    return (
      '<span class="db-topbar-title">' + (titleMap[currentPage] || '대시보드') + '</span>' +
      '<div class="db-topbar-actions">' +
        '<button class="db-topbar-icon" title="알림">' +
          '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3a6 6 0 016 6v3l1.5 2.5H3.5L5 12V9a6 6 0 016-6z" stroke="#333" stroke-width="1.4"/><path d="M9 18a2 2 0 004 0" stroke="#333" stroke-width="1.4" stroke-linecap="round"/></svg>' +
        '</button>' +
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
  });
})();
