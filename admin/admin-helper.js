/* ================================================================
   SENDIT – ADMIN HELPER
   관리자 공통 사이드바 주입 (모든 어드민 페이지 공용)
   sidebar 변경은 이 파일 하나만 수정하면 됩니다.
   ================================================================ */
(function () {

  /* 인증 체크 */
  if (!sessionStorage.getItem('admin_logged_in')) {
    window.location.href = 'login.html';
    return;
  }

  var adminName  = sessionStorage.getItem('admin_name')  || '관리자';
  var adminEmail = sessionStorage.getItem('admin_email') || 'admin@sendit.kr';

  /* 현재 페이지 파악 → 활성 메뉴 결정 */
  var path        = window.location.pathname;
  var isDashboard = path.includes('dashboard');
  var isMembers   = path.includes('members');
  var isSends     = path.includes('sends');
  var isTemplates = path.includes('templates');

  /* ── 로고 SVG (인라인) ── */
  var LOGO_SVG = '<img src="../assets/Lawsign.svg" alt="Lawsign" height="22">';

  /* ── 네비 아이템 SVG 아이콘 ── */
  var ICON_DASHBOARD =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/>' +
      '<rect x="3" y="15" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/>' +
    '</svg>';

  var ICON_MEMBERS =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="9" cy="7" r="4"/>' +
      '<path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>' +
      '<path d="M16 3.13a4 4 0 0 1 0 7.75"/>' +
      '<path d="M21 21v-2a4 4 0 0 0-3-3.85"/>' +
    '</svg>';

  var ICON_SENDS =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<line x1="10" y1="14" x2="21" y2="3"/>' +
      '<path d="M21 3l-6.5 18a.55.55 0 0 1-1 0l-3.5-7-7-3.5a.55.55 0 0 1 0-1l18-6.5"/>' +
    '</svg>';

  var ICON_TEMPLATES =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M14 3v4a1 1 0 0 0 1 1h4"/>' +
      '<path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/>' +
      '<line x1="9" y1="9" x2="10" y2="9"/>' +
      '<line x1="9" y1="13" x2="15" y2="13"/>' +
      '<line x1="9" y1="17" x2="15" y2="17"/>' +
    '</svg>';

  var ICON_LOGOUT =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M14 8v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"/>' +
      '<path d="M9 12h12l-3-3"/>' +
      '<path d="M18 15l3-3"/>' +
    '</svg>';

  function navItem(href, icon, label, active) {
    return '<a href="' + href + '" class="admin-nav-item' + (active ? ' active' : '') + '">' +
      icon + label +
    '</a>';
  }

  /* ── 사이드바 생성 ── */
  var sidebar = document.createElement('aside');
  sidebar.className = 'admin-sidebar';
  sidebar.innerHTML =
    '<a href="dashboard.html" class="admin-sidebar__logo">' +
      LOGO_SVG +
      '<span class="admin-sidebar__badge">ADMIN</span>' +
    '</a>' +
    '<div class="admin-sidebar__profile">' +
      '<div class="admin-sidebar__avatar">' +
        '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<circle cx="10" cy="7.5" r="3.5" stroke="#9CA3AF" stroke-width="1.4"/>' +
          '<path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#9CA3AF" stroke-width="1.4" stroke-linecap="round"/>' +
        '</svg>' +
      '</div>' +
      '<div class="admin-sidebar__user-info">' +
        '<span class="admin-sidebar__name">' + adminName + '</span>' +
        (adminEmail ? '<span class="admin-sidebar__email">' + adminEmail + '</span>' : '') +
      '</div>' +
    '</div>' +
    '<nav class="admin-nav">' +
      navItem('dashboard.html', ICON_DASHBOARD, '대시보드',    isDashboard) +
      navItem('members.html',   ICON_MEMBERS,   '회원 관리',   isMembers)   +
      navItem('sends.html',     ICON_SENDS,     '발송 내역',   isSends)     +
      navItem('templates.html', ICON_TEMPLATES, '템플릿 관리', isTemplates) +
    '</nav>' +
    '<div class="admin-sidebar__footer">' +
      '<button class="admin-logout-btn" onclick="' +
        "sessionStorage.removeItem('admin_logged_in');" +
        "sessionStorage.removeItem('admin_name');" +
        "sessionStorage.removeItem('admin_email');" +
        "window.location.href='login.html';" +
      '">' +
        ICON_LOGOUT + '로그아웃' +
      '</button>' +
    '</div>';

  /* ── DOM 주입 ── */
  function inject() {
    var wrap = document.querySelector('.admin-wrap');
    if (!wrap) return;
    wrap.insertBefore(sidebar, wrap.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
