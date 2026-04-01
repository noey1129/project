/* ================================================================
   LAWSIGN – ADMIN HELPER
   관리자 사이드바 / 탑바를 단일 파일로 삽입
   ================================================================ */

(function () {
  var _el  = document.currentScript;
  var _src = _el ? (_el.getAttribute('src') || '') : '';
  var base = _src.replace('admin-helper.js', '');

  /* ── 비로그인 차단 ── */
  if (sessionStorage.getItem('admin_logged_in') !== 'true') {
    window.location.href = base + '../login.html';
    return;
  }

  var adminName  = sessionStorage.getItem('admin_name')  || '관리자';
  var adminEmail = sessionStorage.getItem('admin_email') || 'admin@lawsign.com';
  var currentPage = window.location.pathname.split('/').pop() || 'admin-dashboard.html';

  /* ── 인라인 SVG 아이콘 ── */
  var ICON_DASHBOARD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4L14 20M12 12L4 14M4 6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6Z" stroke="#7D7D7D" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_DASHBOARD_FILL = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4L14 20M12 12L4 14M4 6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6Z" stroke="#2B3347" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var ICON_PEOPLE = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="16.2503" cy="9.01786" rx="4.01786" ry="4.01786" stroke="#7D7D7D" stroke-width="1.25"/><path d="M22.5 19.2856C22.5 17.628 21.8415 16.0383 20.6694 14.8662C19.4973 13.6941 17.9076 13.0356 16.25 13.0356C14.5924 13.0356 13.0027 13.6941 11.8306 14.8662C10.6585 16.0383 10 17.628 10 19.2856" stroke="#7D7D7D" stroke-width="1.25" stroke-linecap="round"/><ellipse cx="6.37528" cy="10.4554" rx="3.45536" ry="3.45536" stroke="#7D7D7D" stroke-width="1.25"/><path d="M1 19.2856C1 17.8601 1.56629 16.493 2.5743 15.4849C3.58231 14.4769 4.94946 13.9106 6.375 13.9106C7.40991 13.9106 8.41406 14.2091 9.27235 14.7584" stroke="#7D7D7D" stroke-width="1.25" stroke-linecap="round"/></svg>';
  var ICON_PEOPLE_FILL = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="16.2503" cy="9.01786" rx="4.01786" ry="4.01786" stroke="#2B3347" stroke-width="1.25"/><path d="M22.5 19.2856C22.5 17.628 21.8415 16.0383 20.6694 14.8662C19.4973 13.6941 17.9076 13.0356 16.25 13.0356C14.5924 13.0356 13.0027 13.6941 11.8306 14.8662C10.6585 16.0383 10 17.628 10 19.2856" stroke="#2B3347" stroke-width="1.25" stroke-linecap="round"/><ellipse cx="6.37528" cy="10.4554" rx="3.45536" ry="3.45536" stroke="#2B3347" stroke-width="1.25"/><path d="M1 19.2856C1 17.8601 1.56629 16.493 2.5743 15.4849C3.58231 14.4769 4.94946 13.9106 6.375 13.9106C7.40991 13.9106 8.41406 14.2091 9.27235 14.7584" stroke="#2B3347" stroke-width="1.25" stroke-linecap="round"/></svg>';

  var ICON_FILE = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.16699 17.0833V3.33333C4.16699 2.8731 4.54009 2.5 5.00033 2.5H11.7668C11.9709 2.5 12.1679 2.5749 12.3205 2.71049L15.554 5.58471C15.7319 5.74285 15.8337 5.96952 15.8337 6.20755V17.0833C15.8337 17.5436 15.4606 17.9167 15.0003 17.9167H5.00033C4.54009 17.9167 4.16699 17.5436 4.16699 17.0833Z" stroke="#7D7D7D" stroke-width="1.25" stroke-linecap="round"/><path d="M12.083 2.9165V4.99984C12.083 5.46007 12.4561 5.83317 12.9163 5.83317H15.4163" stroke="#7D7D7D" stroke-width="1.25" stroke-linecap="round"/><path d="M5.83301 7.0835H9.99967" stroke="#7D7D7D" stroke-width="0.833333" stroke-linecap="round"/><path d="M5.83301 9.5835H14.1663" stroke="#7D7D7D" stroke-width="0.833333" stroke-linecap="round"/><path d="M5.83301 12.0835H14.1663" stroke="#7D7D7D" stroke-width="0.833333" stroke-linecap="round"/><path d="M5.83301 14.5835H14.1663" stroke="#7D7D7D" stroke-width="0.833333" stroke-linecap="round"/></svg>';
  var ICON_FILE_FILL = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.16699 17.0833V3.33333C4.16699 2.8731 4.54009 2.5 5.00033 2.5H11.7668C11.9709 2.5 12.1679 2.5749 12.3205 2.71049L15.554 5.58471C15.7319 5.74285 15.8337 5.96952 15.8337 6.20755V17.0833C15.8337 17.5436 15.4606 17.9167 15.0003 17.9167H5.00033C4.54009 17.9167 4.16699 17.5436 4.16699 17.0833Z" stroke="#2B3347" stroke-width="1.25" stroke-linecap="round"/><path d="M12.083 2.9165V4.99984C12.083 5.46007 12.4561 5.83317 12.9163 5.83317H15.4163" stroke="#2B3347" stroke-width="1.25" stroke-linecap="round"/><path d="M5.83301 7.0835H9.99967" stroke="#2B3347" stroke-width="0.833333" stroke-linecap="round"/><path d="M5.83301 9.5835H14.1663" stroke="#2B3347" stroke-width="0.833333" stroke-linecap="round"/><path d="M5.83301 12.0835H14.1663" stroke="#2B3347" stroke-width="0.833333" stroke-linecap="round"/><path d="M5.83301 14.5835H14.1663" stroke="#2B3347" stroke-width="0.833333" stroke-linecap="round"/></svg>';

  var ICON_LOGOUT = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4h4v12h-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13.5l4-3.5-4-3.5M12 10H3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var navItems = [
    { page: 'admin-dashboard.html', href: base + 'admin-dashboard.html', label: '대시보드', icon: ICON_DASHBOARD, iconActive: ICON_DASHBOARD_FILL },
    { page: 'admin-members.html',   href: base + 'admin-members.html',   label: '회원 관리', icon: ICON_PEOPLE,    iconActive: ICON_PEOPLE_FILL },
    { page: 'admin-history.html',   href: base + 'admin-history.html',   label: '발송 내역', icon: ICON_FILE,      iconActive: ICON_FILE_FILL },
  ];

  /* ── 사이드바 HTML ── */
  function buildSidebar() {
    var navHTML = navItems.map(function (item) {
      var active = currentPage === item.page;
      var iconSrc = active ? item.iconActive : item.icon;
      return '<a href="' + item.href + '" class="adm-nav-item' + (active ? ' adm-nav-item--active' : '') + '">' +
        '<span class="adm-nav-icon">' + iconSrc + '</span>' +
        '<span>' + item.label + '</span>' +
      '</a>';
    }).join('');

    var lastName = adminName ? adminName.charAt(0) : 'A';

    return (
      '<div class="adm-sb-top">' +
        '<div class="adm-logo-wrap">' +
          '<span class="adm-logo-text">Lawsign</span>' +
          '<span class="adm-badge">Admin</span>' +
        '</div>' +
        '<div class="adm-profile">' +
          '<div class="adm-avatar">' + lastName + '</div>' +
          '<div class="adm-profile-info">' +
            '<span class="adm-profile-name">' + adminName + '님</span>' +
            '<span class="adm-profile-email">' + adminEmail + '</span>' +
          '</div>' +
        '</div>' +
        '<nav class="adm-nav">' + navHTML + '</nav>' +
      '</div>' +
      '<div class="adm-sb-bottom">' +
        '<button class="adm-logout" id="admLogoutBtn">' +
          ICON_LOGOUT +
          '<span>로그아웃</span>' +
        '</button>' +
      '</div>'
    );
  }

  /* ── 탑바 HTML ── */
  var titleMap = {
    'admin-dashboard.html': '대시보드',
    'admin-members.html':   '회원 관리',
    'admin-history.html':   '발송 내역',
  };

  function buildTopbar() {
    return (
      '<span class="adm-topbar-title">' + (titleMap[currentPage] || '대시보드') + '</span>'
    );
  }

  /* ── DOM 준비 후 삽입 ── */
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('admSidebar');
    if (sidebar) sidebar.innerHTML = buildSidebar();

    var topbar = document.getElementById('admTopbar');
    if (topbar) topbar.innerHTML = buildTopbar();

    var logoutBtn = document.getElementById('admLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        sessionStorage.removeItem('admin_logged_in');
        sessionStorage.removeItem('admin_name');
        sessionStorage.removeItem('admin_email');
        window.location.href = base + '../login.html';
      });
    }
  });
})();
