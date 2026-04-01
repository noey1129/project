/* ================================================================
   LAWSIGN – MYINFO JS
   ================================================================ */

/* ── 토글 ── */
var toggle = document.getElementById('miToggle');
if (toggle) {
  toggle.addEventListener('click', function () {
    var isOn = this.classList.contains('mi-toggle--on');
    this.classList.toggle('mi-toggle--on', !isOn);
    this.classList.toggle('mi-toggle--off', isOn);
    this.setAttribute('aria-pressed', String(!isOn));
  });
}

/* ── 전화번호 자동 하이픈 ── */
var phoneInput = document.getElementById('miPhone');
if (phoneInput) {
  phoneInput.addEventListener('input', function () {
    var digits = this.value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) this.value = digits;
    else if (digits.length <= 7) this.value = digits.slice(0, 3) + '-' + digits.slice(3);
    else this.value = digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7);
  });
}

/* ── 저장 버튼 ── */
var saveBtn = document.getElementById('miSaveBtn');
if (saveBtn) {
  saveBtn.addEventListener('click', function () {
    alert('변경 사항이 저장되었습니다.');
  });
}
