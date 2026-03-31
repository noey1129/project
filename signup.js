/* ================================================================
   LAWSIGN – SIGNUP JS
   ================================================================ */

var nameInput  = document.getElementById('signupName');
var emailInput = document.getElementById('signupEmail');
var phoneInput = document.getElementById('signupPhone');
var pwInput    = document.getElementById('signupPassword');
var pwConfirm  = document.getElementById('signupPasswordConfirm');
var pwError    = document.getElementById('pwError');
var chkAll     = document.getElementById('chkAll');
var chkTerms   = document.getElementById('chkTerms');
var chkPrivacy = document.getElementById('chkPrivacy');
var btnSignup  = document.getElementById('btnSignup');
var btnVerify       = document.getElementById('btnVerify');
var verifyCodeWrap  = document.getElementById('verifyCodeWrap');
var verifyCodeInput = document.getElementById('signupVerifyCode');
var btnResendHint   = document.getElementById('btnResendHint');
var verifyModalOverlay = document.getElementById('verifyModalOverlay');

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
}

pwInput.addEventListener('input', function () { checkPasswordMatch(); checkReady(); });
pwConfirm.addEventListener('input', function () { checkPasswordMatch(); checkReady(); });

/* ── 전체 동의 ── */
chkAll.addEventListener('change', function () {
  chkTerms.checked = this.checked;
  chkPrivacy.checked = this.checked;
  checkReady();
});

chkTerms.addEventListener('change', function () {
  chkAll.checked = chkTerms.checked && chkPrivacy.checked;
  checkReady();
});

chkPrivacy.addEventListener('change', function () {
  chkAll.checked = chkTerms.checked && chkPrivacy.checked;
  checkReady();
});

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

/* ── 인증요청 ── */
btnVerify.addEventListener('click', function () {
  verifyCodeWrap.style.display = '';
  verifyCodeInput.focus();
});

/* ── 인증번호 못 받음 팝업 ── */
btnResendHint.addEventListener('click', function () {
  verifyModalOverlay.style.display = 'flex';
});

document.getElementById('btnVerifyModalClose').addEventListener('click', function () {
  verifyModalOverlay.style.display = 'none';
});

document.getElementById('btnReEnterPhone').addEventListener('click', function () {
  verifyModalOverlay.style.display = 'none';
  verifyCodeWrap.style.display = 'none';
  verifyCodeInput.value = '';
  phoneInput.value = '';
  phoneInput.focus();
});

document.getElementById('btnResendCode').addEventListener('click', function () {
  verifyModalOverlay.style.display = 'none';
  verifyCodeInput.value = '';
  verifyCodeInput.focus();
});

verifyModalOverlay.addEventListener('click', function (e) {
  if (e.target === verifyModalOverlay) verifyModalOverlay.style.display = 'none';
});

/* ── 제출 ── */
btnSignup.addEventListener('click', function () {
  sessionStorage.setItem('logged_in', 'true');
  sessionStorage.setItem('user_name', '홍길동');
  var redirect = sessionStorage.getItem('after_auth_redirect');
  if (redirect) {
    sessionStorage.removeItem('after_auth_redirect');
    window.location.href = 'wizard/' + redirect;
  } else {
    window.location.href = 'mypage.html';
  }
});

/* ── NAV 그림자 ── */
(function initNavShadow() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
