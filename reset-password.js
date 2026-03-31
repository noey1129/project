/* ================================================================
   LAWSIGN – RESET PASSWORD JS
   ================================================================ */

var resetEmail     = document.getElementById('resetEmail');
var btnSendEmail   = document.getElementById('btnSendEmail');
var modalConfirm   = document.getElementById('modalConfirm');
var modalDone      = document.getElementById('modalDone');
var modalResent    = document.getElementById('modalResent');

/* ── 이메일 입력 시 버튼 활성화 ── */
resetEmail.addEventListener('input', function () {
  btnSendEmail.disabled = !this.value.trim();
});

/* ── 이메일 보내기 → 확인 팝업 ── */
document.getElementById('resetForm').addEventListener('submit', function () {
  modalConfirm.style.display = 'flex';
});

/* ── 확인 팝업: 취소 ── */
document.getElementById('btnConfirmCancel').addEventListener('click', function () {
  modalConfirm.style.display = 'none';
});

/* ── 확인 팝업: 확인 → 완료 팝업 ── */
document.getElementById('btnConfirmOk').addEventListener('click', function () {
  modalConfirm.style.display = 'none';
  modalDone.style.display = 'flex';
});

/* ── 완료 팝업: 확인 → 전송 완료 화면 ── */
document.getElementById('btnDoneOk').addEventListener('click', function () {
  modalDone.style.display = 'none';
  document.getElementById('viewInput').style.display = 'none';
  document.getElementById('viewSent').style.display = '';
});

/* ── 인증 메일 다시 받기 → 재발송 팝업 ── */
document.getElementById('btnResendMail').addEventListener('click', function () {
  document.getElementById('resentEmailTitle').textContent =
    resetEmail.value + '\n인증 메일을 다시 보냈어요.';
  modalResent.style.display = 'flex';
});

/* ── 재발송 팝업: 확인 ── */
document.getElementById('btnResentOk').addEventListener('click', function () {
  modalResent.style.display = 'none';
});

/* ── 배경 클릭으로 팝업 닫기 ── */
[modalConfirm, modalDone, modalResent].forEach(function (modal) {
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.style.display = 'none';
  });
});

/* ── NAV 그림자 ── */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
