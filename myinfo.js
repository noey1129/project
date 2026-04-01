/* ================================================================
   LAWSIGN – MYINFO JS
   ================================================================ */

var toggle    = document.getElementById('miToggle');
var phoneInput = document.getElementById('miPhone');
var pwCurrent  = document.getElementById('miPwCurrent');
var pwNew      = document.getElementById('miPwNew');
var pwConfirm  = document.getElementById('miPwConfirm');
var saveBtn    = document.getElementById('miSaveBtn');

/* ── 초기값 저장 ── */
var origPhone  = phoneInput ? phoneInput.value : '';
var origToggle = toggle ? toggle.classList.contains('mi-toggle--on') : true;

/* ── 변경 여부 체크 → 버튼 활성화 ── */
function checkDirty() {
  var phoneChanged  = phoneInput && phoneInput.value !== origPhone;
  var toggleChanged = toggle && toggle.classList.contains('mi-toggle--on') !== origToggle;
  var pwFilled      = (pwCurrent && pwCurrent.value) ||
                      (pwNew     && pwNew.value)      ||
                      (pwConfirm && pwConfirm.value);

  var isDirty = phoneChanged || toggleChanged || pwFilled;
  if (saveBtn) {
    saveBtn.disabled = !isDirty;
  }
}

/* ── 토글 ── */
if (toggle) {
  toggle.addEventListener('click', function () {
    var isOn = this.classList.contains('mi-toggle--on');
    this.classList.toggle('mi-toggle--on', !isOn);
    this.classList.toggle('mi-toggle--off', isOn);
    this.setAttribute('aria-pressed', String(!isOn));
    checkDirty();
  });
}

/* ── 전화번호 자동 하이픈 ── */
if (phoneInput) {
  phoneInput.addEventListener('input', function () {
    var digits = this.value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) this.value = digits;
    else if (digits.length <= 7) this.value = digits.slice(0, 3) + '-' + digits.slice(3);
    else this.value = digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7);
    checkDirty();
  });
}

/* ── 비밀번호 필드 ── */
[pwCurrent, pwNew, pwConfirm].forEach(function (el) {
  if (el) el.addEventListener('input', checkDirty);
});

/* ── 저장 버튼 ── */
if (saveBtn) {
  saveBtn.addEventListener('click', function () {
    alert('변경 사항이 저장되었습니다.');
  });
}

/* ── 초기 상태: 버튼 비활성화 ── */
checkDirty();
