/* ================================================================
   LAWSIGN – RESET PASSWORD NEW JS
   ================================================================ */

var newPw        = document.getElementById('newPw');
var newPwConfirm = document.getElementById('newPwConfirm');
var newPwError   = document.getElementById('newPwError');
var btnChangePw  = document.getElementById('btnChangePw');

function checkPw() {
  var mismatch = newPwConfirm.value && newPw.value !== newPwConfirm.value;
  newPwError.style.display = mismatch ? 'block' : 'none';
  btnChangePw.disabled = !(newPw.value.length >= 8 && newPw.value === newPwConfirm.value);
}

newPw.addEventListener('input', checkPw);
newPwConfirm.addEventListener('input', checkPw);

document.getElementById('newPwForm').addEventListener('submit', function () {
  document.getElementById('viewNewPw').style.display = 'none';
  document.getElementById('viewChanged').style.display = '';
});

/* ── NAV 그림자 ── */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
