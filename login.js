/* ================================================================
   SENDIT – LOGIN JS
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

document.getElementById('loginForm').addEventListener('submit', function () {
  /* 실제 API 연동 전 더미 처리 */
  alert('로그인 기능은 준비 중입니다.');
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
