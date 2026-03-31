/* ================================================================
   LAWSIGN – FIND ACCOUNT JS
   ================================================================ */

/* 더미 계정 */
var DUMMY_ACCOUNTS = [
  { name: '홍길동', phone: '010-1234-5678', email: 'test@sendit.kr' }
];

var findName  = document.getElementById('findName');
var findPhone = document.getElementById('findPhone');
var btnFind   = document.getElementById('btnFindAccount');
var noAccountModal = document.getElementById('noAccountModal');

/* ── 전화번호 자동 하이픈 ── */
function formatPhone(val) {
  var digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return digits.slice(0, 3) + '-' + digits.slice(3);
  return digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7);
}

findPhone.addEventListener('input', function () {
  this.value = formatPhone(this.value);
  checkReady();
});

findName.addEventListener('input', checkReady);

function checkReady() {
  btnFind.disabled = !(findName.value.trim() && findPhone.value.trim().length >= 9);
}

/* ── 계정 찾기 제출 ── */
document.getElementById('findForm').addEventListener('submit', function () {
  var name  = findName.value.trim();
  var phone = findPhone.value.trim();

  var match = DUMMY_ACCOUNTS.find(function (a) {
    return a.name === name && a.phone === phone;
  });

  if (match) {
    document.getElementById('foundEmail').textContent = match.email;
    document.getElementById('viewSearch').style.display = 'none';
    document.getElementById('viewResult').style.display = '';
  } else {
    noAccountModal.style.display = 'flex';
  }
});

/* ── 팝업 닫기 ── */
document.getElementById('btnNoAccountOk').addEventListener('click', function () {
  noAccountModal.style.display = 'none';
});

noAccountModal.addEventListener('click', function (e) {
  if (e.target === noAccountModal) noAccountModal.style.display = 'none';
});

/* ── NAV 그림자 ── */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
