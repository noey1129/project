/* ================================================================
   SENDIT – ADMIN HELPER
   관리자 공통 레이아웃 보조 (인증 체크 + 사이드바 프로필 주입)
   ================================================================ */
(function () {

  /* 인증 체크 */
  if (!sessionStorage.getItem('admin_logged_in')) {
    window.location.href = 'login.html';
    return;
  }

  var adminName  = sessionStorage.getItem('admin_name')  || '관리자';
  var adminEmail = sessionStorage.getItem('admin_email') || '';

  function inject() {
    var logo = document.querySelector('.admin-sidebar__logo');
    if (!logo) return;

    var profile = document.createElement('div');
    profile.className = 'admin-sidebar__profile';
    profile.innerHTML =
      '<div class="admin-sidebar__avatar">' +
        '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<circle cx="10" cy="7.5" r="3.5" stroke="#9CA3AF" stroke-width="1.4"/>' +
          '<path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#9CA3AF" stroke-width="1.4" stroke-linecap="round"/>' +
        '</svg>' +
      '</div>' +
      '<div class="admin-sidebar__user-info">' +
        '<span class="admin-sidebar__name">' + adminName + '</span>' +
        '<span class="admin-sidebar__email">' + adminEmail + '</span>' +
      '</div>';

    /* 로고 바로 다음에 삽입 */
    logo.insertAdjacentElement('afterend', profile);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
