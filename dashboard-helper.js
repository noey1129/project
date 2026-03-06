/* ================================================================
   SENDIT – DASHBOARD HELPER
   유저 대시보드 공통 레이아웃 주입 (사이드바 + 상단 헤더)
   mypage.html / mypage-detail.html / mypage-profile.html 공용
   ================================================================ */
(function () {

  /* 인증 체크 */
  if (!sessionStorage.getItem('logged_in')) {
    window.location.href = 'login.html';
    return;
  }

  var name  = sessionStorage.getItem('user_name')  || '사용자';
  var email = sessionStorage.getItem('user_email') || '';

  /* 현재 페이지 파악 */
  var path      = window.location.pathname;
  var isProfile = path.includes('mypage-profile');
  var isDetail  = path.includes('mypage-detail');

  /* ── 사이드바 생성 ── */
  var sidebar = document.createElement('aside');
  sidebar.className = 'mypage-sidebar';
  sidebar.innerHTML =
    '<a href="mypage.html" class="mypage-sidebar__logo">Sendit</a>' +
    '<div class="mypage-sidebar__profile">' +
      '<span class="mypage-sidebar__name">'  + name  + '</span>' +
      '<span class="mypage-sidebar__email">' + email + '</span>' +
    '</div>' +
    '<div style="padding:12px 12px 0;">' +
      '<a href="select-situation.html" class="mypage-new-btn">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
        '새 내용증명 작성' +
      '</a>' +
    '</div>' +
    '<nav class="mypage-sidebar__nav">' +
      '<a href="mypage.html" class="mypage-nav-item' + (!isProfile ? ' active' : '') + '">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' +
        '발송 내역' +
      '</a>' +
      '<a href="mypage-profile.html" class="mypage-nav-item' + (isProfile ? ' active' : '') + '">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
        '내 정보' +
      '</a>' +
    '</nav>' +
    '<div class="mypage-sidebar__footer">' +
      '<button class="mypage-logout-btn" onclick="' +
        "sessionStorage.removeItem('logged_in');" +
        "sessionStorage.removeItem('user_name');" +
        "sessionStorage.removeItem('user_email');" +
        "window.location.href='login.html';" +
      '">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"/><path d="M9 12h12l-3-3"/><path d="M18 15l3-3"/></svg>' +
        '로그아웃' +
      '</button>' +
    '</div>';

  /* ── 상단 헤더 생성 ── */
  var header = document.createElement('div');
  header.className = 'mypage-header';

  var leftHTML;
  if (isDetail) {
    leftHTML =
      '<div style="display:flex;align-items:center;gap:14px;">' +
        '<a href="mypage.html" class="mypage-back">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>' +
          '발송 내역으로' +
        '</a>' +
        '<span class="mypage-header__title">발송 상세</span>' +
      '</div>';
  } else {
    leftHTML = '<span class="mypage-header__title">' +
      (isProfile ? '내 정보 수정' : '발송 내역') +
      '</span>';
  }

  header.innerHTML =
    leftHTML +
    '<div class="mypage-header__right">' +
      '<a href="contact.html" class="mypage-header__contact">서비스문의</a>' +
      '<span class="mypage-header__user">' + name + '</span>' +
    '</div>';

  /* ── DOM 주입 ── */
  function inject() {
    var wrap = document.querySelector('.mypage-wrap');
    if (!wrap) return;

    /* 사이드바: wrap 맨 앞에 삽입 */
    wrap.insertBefore(sidebar, wrap.firstChild);

    /* 헤더: main 맨 앞에 삽입 */
    var main = wrap.querySelector('.mypage-main');
    if (main) main.insertBefore(header, main.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
