/* ================================================================
   SENDIT – NAV HELPER
   로그인 상태일 때 상단 nav를 유저 모드로 전환
   ================================================================ */
(function () {
  if (sessionStorage.getItem('logged_in') !== 'true') return;
  var navRight = document.querySelector('.nav__right');
  if (!navRight) return;
  var name = sessionStorage.getItem('user_name') || '사용자';
  /* wizard/ 하위 페이지는 상대 경로 조정 */
  var base = window.location.pathname.includes('/wizard/') ? '../' : '';
  navRight.innerHTML =
    '<a href="' + base + 'contact.html" class="nav__contact">서비스문의</a>' +
    '<span class="nav__user-name">' + name + '</span>' +
    '<button class="btn--outline" onclick="' +
      'sessionStorage.removeItem(\'logged_in\');' +
      'window.location.href=\'' + base + 'login.html\'' +
    '">로그아웃</button>';
})();
