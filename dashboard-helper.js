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
      '<div class="mypage-sidebar__profile-row">' +
        '<div class="mypage-sidebar__avatar">' + (name ? name.charAt(0) : '?') + '</div>' +
        '<div class="mypage-sidebar__user-info">' +
          '<span class="mypage-sidebar__name">' + name + '님</span>' +
          '<span class="mypage-sidebar__email">' + email + '</span>' +
        '</div>' +
      '</div>' +
      '<a href="select-situation.html" class="mypage-new-btn">새 내용증명 작성하기</a>' +
    '</div>' +
    '<nav class="mypage-sidebar__nav">' +
      '<a href="mypage.html" class="mypage-nav-item' + (!isProfile ? ' active' : '') + '">' +
        '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M4 3h10l2 4v10H4V3z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<path d="M8 3v4h6" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>' +
        '내 문서함' +
      '</a>' +
      '<a href="mypage-profile.html" class="mypage-nav-item' + (isProfile ? ' active' : '') + '">' +
        '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<circle cx="10" cy="7" r="3" stroke="currentColor" stroke-width="1.25"/>' +
          '<path d="M3.75 17.5c0-3.45 2.8-6.25 6.25-6.25s6.25 2.8 6.25 6.25" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>' +
        '</svg>' +
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
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<rect x="3" y="4" width="14" height="16" rx="1" stroke="#B01212" stroke-width="1.33"/>' +
        '</svg>' +
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
      (isProfile ? '내 정보 수정' : '내 문서함') +
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

    /* 헤더: body에 직접 추가 (position:fixed 이므로 DOM 위치 무관) */
    document.body.appendChild(header);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
