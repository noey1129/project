/* ================================================================
   LAWSIGN – LOGIN JS
   ================================================================ */

const emailInput = document.getElementById('loginEmail');
const pwInput    = document.getElementById('loginPassword');
const btnLogin   = document.getElementById('btnLogin');

function checkReady() {
  btnLogin.disabled = !(emailInput.value.trim() && pwInput.value.trim());
}

[emailInput, pwInput].forEach(function (el) {
  el.addEventListener('input', checkReady);
});

/* ── 더미 계정 ── */
var DUMMY_USERS = [
  { email: 'test@sendit.kr', password: '1234' },
];

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var email = emailInput.value.trim();
  var pw    = pwInput.value;
  var match = DUMMY_USERS.find(function (u) { return u.email === email && u.password === pw; });
  if (match) {
    sessionStorage.setItem('logged_in', 'true');
    sessionStorage.setItem('user_name', '홍길동');
    sessionStorage.setItem('user_email', email);
    window.location.href = 'select-situation.html';
  } else {
    alert('이메일 또는 비밀번호가 올바르지 않습니다.');
  }
});

['btnKakao', 'btnNaver', 'btnGoogle'].forEach(function (id) {
  document.getElementById(id).addEventListener('click', function () {
    alert('소셜 로그인은 준비 중입니다.');
  });
});

(function initNavShadow() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
