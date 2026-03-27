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
  var LOGO_SVG =
    '<svg width="78" height="20" viewBox="0 0 101 26" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M0 19.6104V1.05078H3.84521V16.4316H11.8433V19.6104H0ZM13.5864 15.7139C13.5864 12.6121 16.0986 11.5867 18.7646 11.4329C19.7644 11.3688 21.6357 11.2791 22.2253 11.2534V10.1255C22.1997 8.97192 21.405 8.27979 19.9951 8.27979C18.7134 8.27979 17.8931 8.86938 17.688 9.81787H14.0735C14.3042 7.4082 16.4062 5.51123 20.0977 5.51123C23.1226 5.51123 25.9937 6.86987 25.9937 10.228V19.6104H22.4048V17.6877H22.3022C21.6101 18.9695 20.3027 19.8667 18.2263 19.8667C15.5603 19.8667 13.5864 18.4824 13.5864 15.7139ZM17.2266 15.6113C17.2266 16.688 18.0981 17.252 19.303 17.252C21.0205 17.252 22.251 16.0984 22.2253 14.6372V13.6118C21.6486 13.6375 20.0336 13.7272 19.3799 13.7913C18.0725 13.9194 17.2266 14.5347 17.2266 15.6113ZM31.6333 19.6104L27.8394 5.69067H31.6846L33.8635 15.0986H33.9917L36.2732 5.69067H40.0415L42.3486 15.0474H42.4768L44.6301 5.69067H48.4753L44.6558 19.6104H40.6567L38.2471 10.7664H38.0676L35.658 19.6104H31.6333ZM58.3447 9.81787C58.1909 8.84375 57.3193 8.20288 56.0632 8.20288C54.8328 8.20288 53.8843 8.79248 53.9099 9.63843C53.8843 10.2537 54.397 10.7407 55.7043 11.0227L58.1909 11.5354C60.8826 12.0994 62.1899 13.3042 62.2156 15.3037C62.1899 18.0466 59.729 19.8923 56.0376 19.8923C52.2693 19.8923 50.0647 18.2004 49.7571 15.4832H53.5767C53.7561 16.5854 54.6533 17.1494 56.0376 17.1494C57.4219 17.1494 58.3447 16.5854 58.3447 15.6882C58.3447 14.9705 57.7551 14.5347 56.4478 14.2527L54.1406 13.7913C51.5002 13.2786 50.116 11.8943 50.1416 9.84351C50.116 7.17749 52.4231 5.51123 56.012 5.51123C59.5239 5.51123 61.7029 7.17749 61.908 9.81787H58.3447ZM64.5483 19.6104V5.69067H68.3423V19.6104H64.5483ZM66.4453 3.87061C65.2917 3.87061 64.3689 2.99902 64.3689 1.948C64.3689 0.871338 65.2917 -0.000244141 66.4453 -0.000244141C67.5732 -0.000244141 68.4961 0.871338 68.4961 1.948C68.4961 2.99902 67.5732 3.87061 66.4453 3.87061ZM77.5452 25.1218C73.7 25.1218 71.3416 23.4043 71.1108 20.7639H74.8535C75.0586 21.8662 76.1096 22.3789 77.6221 22.3789C79.3909 22.3789 80.5701 21.6355 80.5701 19.6873V17.1494H80.3906C79.8779 18.2773 78.6475 19.4053 76.4172 19.4053C73.2642 19.4053 70.752 17.2007 70.752 12.5608C70.752 7.84399 73.3411 5.51123 76.4172 5.51123C78.75 5.51123 79.8779 6.89551 80.3906 8.02344H80.5444V5.69067H84.3127V19.7642C84.3127 23.3018 81.4929 25.1218 77.5452 25.1218ZM77.5964 16.5598C79.4934 16.5598 80.5701 15.073 80.5701 12.6121C80.5701 10.1255 79.4934 8.53613 77.5964 8.53613C75.6738 8.53613 74.6484 10.2024 74.6484 12.6121C74.6484 15.0217 75.6738 16.5598 77.5964 16.5598ZM91.0547 11.561V19.6104H87.2607V5.69067H90.8752V8.12598H91.0291C91.6699 6.51099 93.1567 5.51123 95.2075 5.51123C98.1042 5.51123 100.027 7.48511 100.001 10.7407V19.6104H96.2329V11.4072C96.2329 9.6897 95.2844 8.66431 93.7207 8.66431C92.1313 8.66431 91.0547 9.71533 91.0547 11.561Z" fill="#2B3347"/>' +
    '</svg>';

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
