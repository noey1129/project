/* ================================================================
   SENDIT – NAV HELPER
   로그인 상태일 때 사이드바 주입 + nav 전환
   ================================================================ */
(function () {
  if (sessionStorage.getItem('logged_in') !== 'true') return;

  var base = window.location.pathname.includes('/wizard/') ? '../' : '';
  var name  = sessionStorage.getItem('user_name')  || '사용자';
  var email = sessionStorage.getItem('user_email') || '';

  /* ── mypage.css 동적 주입 ── */
  var cssLink = document.createElement('link');
  cssLink.rel  = 'stylesheet';
  cssLink.href = base + 'mypage.css';
  document.head.appendChild(cssLink);

  /* ── 사이드바 HTML 생성 + 주입 ── */
  function injectSidebar() {
    /* 이미 주입된 경우 중복 방지 */
    if (document.querySelector('.mypage-sidebar')) return;

    var sidebar = document.createElement('aside');
    sidebar.className = 'mypage-sidebar';
    sidebar.innerHTML =
      '<a href="' + base + 'mypage.html" class="mypage-sidebar__logo">Sendit</a>' +
      '<div class="mypage-sidebar__profile">' +
        '<span class="mypage-sidebar__name">' + name  + '</span>' +
        '<span class="mypage-sidebar__email">' + email + '</span>' +
      '</div>' +
      '<div style="padding:12px 12px 0;">' +
        '<a href="' + base + 'select-situation.html" class="mypage-new-btn">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          '새 내용증명 작성' +
        '</a>' +
      '</div>' +
      '<nav class="mypage-sidebar__nav">' +
        '<a href="' + base + 'mypage.html" class="mypage-nav-item">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' +
          '발송 내역' +
        '</a>' +
        '<a href="' + base + 'mypage-profile.html" class="mypage-nav-item">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
          '내 정보' +
        '</a>' +
      '</nav>' +
      '<div class="mypage-sidebar__footer">' +
        '<button class="mypage-logout-btn" onclick="' +
          "sessionStorage.removeItem('logged_in');" +
          "sessionStorage.removeItem('user_name');" +
          "sessionStorage.removeItem('user_email');" +
          "window.location.href='" + base + "login.html';" +
        '">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"/><path d="M9 12h12l-3-3"/><path d="M18 15l3-3"/></svg>' +
          '로그아웃' +
        '</button>' +
      '</div>';

    /* body 첫 자식으로 삽입 */
    document.body.insertBefore(sidebar, document.body.firstChild);

    /* 나머지 콘텐츠를 래퍼로 감싸 margin-left 적용 */
    var wrap = document.createElement('div');
    wrap.id = 'sbPageContent';
    wrap.style.marginLeft = '220px';
    var toMove = Array.prototype.slice.call(document.body.children).filter(function (el) {
      return el !== sidebar;
    });
    toMove.forEach(function (el) { wrap.appendChild(el); });
    document.body.appendChild(wrap);

    /* 공용 nav 숨기기 */
    var nav = document.querySelector('.nav');
    if (nav) nav.style.display = 'none';

    /* bottom-bar 오프셋 조정 (사이드바 너비만큼) */
    var bb = document.querySelector('.bottom-bar');
    if (bb) {
      bb.style.left  = '220px';
      bb.style.width = 'calc(100% - 220px)';
    }

    /* question-main 상단 패딩 축소 (nav 제거됐으므로) */
    var qMain = document.querySelector('.question-main');
    if (qMain) qMain.style.paddingTop = '60px';

    var sMain = document.querySelector('.situation-main');
    if (sMain) sMain.style.paddingTop = '60px';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSidebar);
  } else {
    injectSidebar();
  }
})();
