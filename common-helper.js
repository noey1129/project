/* ================================================================
   LAWSIGN – COMMON HELPER
   헤더 / 푸터를 모든 페이지에 단일 파일로 삽입
   ================================================================ */

(function () {
  /* ── base 경로: script src 속성에서 자동 산출 ── */
  var _el  = document.currentScript;
  var _src = _el ? (_el.getAttribute('src') || '') : '';
  var base = _src.replace('common-helper.js', '');   // '' | '../' | '../../'

  /* ── 로그인 상태 ── */
  function isLoggedIn() {
    return sessionStorage.getItem('logged_in') === 'true';
  }

  /* ── NAV 우측 버튼 (항상 고정) ── */
  function buildNavRight() {
    if (isLoggedIn()) {
      return '<button class="btn btn--dark" id="commonNavLogout">로그아웃</button>';
    }
    return '<button class="btn btn--accent-fill" onclick="window.location.href=\'' + base + 'signup.html\'">회원가입</button>' +
      '<button class="btn btn--dark" onclick="window.location.href=\'' + base + 'login.html\'">로그인</button>';
  }

  /* ── NAV HTML ── */
  function buildNav() {
    return '<div class="nav__inner">' +
      '<div class="nav__left">' +
        '<a href="' + base + 'index.html" class="nav__logo">' +
          '<img src="' + base + 'assets/Lawsign.svg" alt="Lawsign" height="22">' +
        '</a>' +
        '<nav class="nav__links">' +
          '<a href="' + base + 'index.html#hero"    class="nav__link">이용 상황</a>' +
          '<a href="' + base + 'index.html#how"     class="nav__link">이용 방법</a>' +
          '<a href="' + base + 'index.html#pricing" class="nav__link">가격</a>' +
          '<a href="' + base + 'index.html#faq"     class="nav__link">자주 묻는 질문</a>' +
          '<a href="' + base + 'index.html#trust"   class="nav__link">인증 및 문서</a>' +
          '<a href="' + base + 'index.html#law"     class="nav__link">법 조항</a>' +
        '</nav>' +
      '</div>' +
      '<div class="nav__right">' + buildNavRight() + '</div>' +
    '</div>';
  }

  /* ── FOOTER HTML ── */
  function buildFooter() {
    return '<div class="footer__inner">' +
      '<div class="footer__top">' +
        '<span class="nav__logo"><img src="' + base + 'assets/Lawsign.svg" alt="Lawsign" height="22"></span>' +
        '<div class="footer__links">' +
          '<a href="#">개인정보 처리방침</a>' +
          '<a href="#">이용약관</a>' +
        '</div>' +
      '</div>' +
      '<div class="footer__info">' +
        '<p>(주)와이더랩 ㅣ 대표 : 정용수 &nbsp; 서울특별시 마포구 성미산로 120 8층 (주)와이더랩</p>' +
        '<p>TEL : 1644-9265 ㅣ MAIL : cs@widerlab.co.kr</p>' +
        '<p>통신판매업 신고번호 : 제2022-서울마포-0526호 ㅣ 사업자 등록번호 : 298-81-01172 <a href="#">사업자정보확인</a></p>' +
        '<p>© 2020. Widerlab. All rights reserved</p>' +
      '</div>' +
    '</div>';
  }

  /* ── DOM 준비 후 삽입 ── */
  document.addEventListener('DOMContentLoaded', function () {

    /* 헤더 교체 */
    var nav = document.querySelector('header.nav');
    if (nav) {
      nav.innerHTML = buildNav();
      var logoutBtn = nav.querySelector('#commonNavLogout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
          sessionStorage.clear();
          window.location.href = base + 'index.html';
        });
      }
    }

    /* 푸터 삽입 (없는 경우만, wizard 페이지 제외) */
    var isWizard = window.location.pathname.includes('/wizard/');
    if (!isWizard && !document.querySelector('footer.footer')) {
      var main = document.querySelector('main');
      if (main) {
        var footer = document.createElement('footer');
        footer.className = 'footer';
        footer.innerHTML = buildFooter();
        main.insertAdjacentElement('afterend', footer);
      }
    }

    /* NAV 스크롤 그림자 */
    var navEl = document.querySelector('.nav');
    if (navEl) {
      window.addEventListener('scroll', function () {
        navEl.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
      }, { passive: true });
    }
  });
})();
