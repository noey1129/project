/* ================================================================
   LAWSIGN – SIGNUP JS
   ================================================================ */

var nameInput  = document.getElementById('signupName');
var emailInput = document.getElementById('signupEmail');
var phoneInput = document.getElementById('signupPhone');
var pwInput    = document.getElementById('signupPassword');
var pwConfirm  = document.getElementById('signupPasswordConfirm');
var pwError    = document.getElementById('pwError');
var chkTerms   = document.getElementById('chkTerms');
var chkPrivacy = document.getElementById('chkPrivacy');
var btnSignup  = document.getElementById('btnSignup');

/* ── 전화번호 자동 하이픈 ── */
function formatPhone(val) {
  var digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return digits.slice(0, 3) + '-' + digits.slice(3);
  return digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7);
}

phoneInput.addEventListener('input', function () {
  this.value = formatPhone(this.value);
  checkReady();
});

/* ── 비밀번호 확인 ── */
function checkPasswordMatch() {
  var mismatch = pwConfirm.value && pwInput.value !== pwConfirm.value;
  pwError.style.display = mismatch ? 'block' : 'none';
  pwConfirm.classList.toggle('error', !!mismatch);
}

pwInput.addEventListener('input', function () { checkPasswordMatch(); checkReady(); });
pwConfirm.addEventListener('input', function () { checkPasswordMatch(); checkReady(); });

/* ── 활성화 체크 ── */
function checkReady() {
  var allFilled = nameInput.value.trim()
    && emailInput.value.trim()
    && phoneInput.value.trim()
    && pwInput.value.length >= 8
    && pwConfirm.value === pwInput.value
    && chkTerms.checked
    && chkPrivacy.checked;
  btnSignup.disabled = !allFilled;
}

[nameInput, emailInput].forEach(function (el) {
  el.addEventListener('input', checkReady);
});

[chkTerms, chkPrivacy].forEach(function (el) {
  el.addEventListener('change', checkReady);
});

/* ── 제출 ── */
btnSignup.addEventListener('click', function () {
  alert('회원가입 기능은 준비 중입니다.');
});

/* ── 소셜 ── */
['btnKakao', 'btnNaver', 'btnGoogle'].forEach(function (id) {
  document.getElementById(id).addEventListener('click', function () {
    alert('소셜 로그인은 준비 중입니다.');
  });
});

/* ── NAV 그림자 ── */
(function initNavShadow() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
