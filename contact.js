/* ================================================================
   SENDIT – CONTACT JS
   ================================================================ */

var nameInput    = document.getElementById('contactName');
var phoneInput   = document.getElementById('contactPhone');
var emailInput   = document.getElementById('contactEmail');
var typeSelect   = document.getElementById('contactType');
var contentInput = document.getElementById('contactContent');
var btnContact   = document.getElementById('btnContact');
var formSection  = document.getElementById('contactForm');
var completeSection = document.getElementById('contactComplete');

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

/* ── 활성화 체크 ── */
function checkReady() {
  var allFilled = nameInput.value.trim()
    && phoneInput.value.trim()
    && emailInput.value.trim()
    && typeSelect.value
    && contentInput.value.trim();
  btnContact.disabled = !allFilled;
}

[nameInput, emailInput, contentInput].forEach(function (el) {
  el.addEventListener('input', checkReady);
});

typeSelect.addEventListener('change', checkReady);

/* ── 접수 완료 ── */
btnContact.addEventListener('click', function () {
  formSection.style.display = 'none';
  completeSection.classList.add('visible');
});

/* ── NAV 그림자 ── */
(function initNavShadow() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
