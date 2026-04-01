/* ================================================================
   LAWSIGN – MYINFO JS
   ================================================================ */

var toggle     = document.getElementById('miToggle');
var phoneInput = document.getElementById('miPhone');
var pwCurrent  = document.getElementById('miPwCurrent');
var pwNew      = document.getElementById('miPwNew');
var pwConfirm  = document.getElementById('miPwConfirm');
var saveBtn    = document.getElementById('miSaveBtn');
var nameInput  = document.getElementById('miName');
var emailInput = document.getElementById('miEmail');

/* ── sessionStorage에서 저장값 불러오기 ── */
if (phoneInput && sessionStorage.getItem('user_phone')) {
  phoneInput.value = sessionStorage.getItem('user_phone');
}
if (nameInput && sessionStorage.getItem('user_name')) {
  nameInput.value = sessionStorage.getItem('user_name');
}
if (emailInput && sessionStorage.getItem('user_email')) {
  emailInput.value = sessionStorage.getItem('user_email');
}
var savedMarketing = sessionStorage.getItem('user_marketing');
if (toggle && savedMarketing !== null) {
  var isOn = savedMarketing === 'true';
  toggle.classList.toggle('mi-toggle--on', isOn);
  toggle.classList.toggle('mi-toggle--off', !isOn);
  toggle.setAttribute('aria-pressed', String(isOn));
}

/* ── 초기값 스냅샷 ── */
function getSnapshot() {
  return {
    phone:     phoneInput  ? phoneInput.value : '',
    marketing: toggle      ? toggle.classList.contains('mi-toggle--on') : true,
    pwCurrent: pwCurrent   ? pwCurrent.value  : '',
    pwNew:     pwNew       ? pwNew.value      : '',
    pwConfirm: pwConfirm   ? pwConfirm.value  : '',
  };
}

var orig = getSnapshot();

/* ── 변경 여부 체크 → 버튼 활성화 ── */
function checkDirty() {
  var cur = getSnapshot();
  var isDirty = cur.phone     !== orig.phone     ||
                cur.marketing !== orig.marketing  ||
                cur.pwCurrent !== ''              ||
                cur.pwNew     !== ''              ||
                cur.pwConfirm !== '';
  if (saveBtn) saveBtn.disabled = !isDirty;
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
    /* sessionStorage에 저장 */
    if (phoneInput) sessionStorage.setItem('user_phone', phoneInput.value);
    if (toggle)     sessionStorage.setItem('user_marketing', String(toggle.classList.contains('mi-toggle--on')));

    /* 비밀번호 필드 초기화 */
    if (pwCurrent) pwCurrent.value = '';
    if (pwNew)     pwNew.value     = '';
    if (pwConfirm) pwConfirm.value = '';

    /* 사이드바 이메일 표시 업데이트 */
    var sbEmail = document.querySelector('.sb-profile-email');
    if (sbEmail && emailInput) sbEmail.textContent = emailInput.value;

    /* 원본값 갱신 → 버튼 비활성화 */
    orig = getSnapshot();
    saveBtn.disabled = true;

    /* 저장 완료 토스트 */
    showToast('변경 사항이 저장되었습니다.');
  });
}

/* ── 토스트 메시지 ── */
function showToast(msg) {
  var existing = document.getElementById('miToast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.id = 'miToast';
  toast.className = 'mi-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(function () {
    toast.classList.add('mi-toast--show');
  });

  setTimeout(function () {
    toast.classList.remove('mi-toast--show');
    setTimeout(function () { toast.remove(); }, 300);
  }, 2500);
}

/* ── 초기 상태: 버튼 비활성화 ── */
checkDirty();

/* ── 회원탈퇴 섹션 전환 ── */
var infoSection     = document.getElementById('miInfoSection');
var withdrawSection = document.getElementById('miWithdrawSection');
var withdrawLink    = document.getElementById('miWithdrawLink');
var withdrawCancel  = document.getElementById('miWithdrawCancel');
var withdrawConfirm = document.getElementById('miWithdrawConfirm');
var withdrawAgree   = document.getElementById('miWithdrawAgree');

if (withdrawLink) {
  withdrawLink.addEventListener('click', function () {
    infoSection.classList.add('mi-section--hidden');
    withdrawSection.classList.remove('mi-section--hidden');
  });
}

if (withdrawCancel) {
  withdrawCancel.addEventListener('click', function () {
    withdrawSection.classList.add('mi-section--hidden');
    infoSection.classList.remove('mi-section--hidden');
    /* 초기화 */
    if (withdrawAgree) withdrawAgree.checked = false;
    if (withdrawConfirm) withdrawConfirm.disabled = true;
    var reason = document.getElementById('miWithdrawReason');
    if (reason) reason.value = '';
  });
}

if (withdrawAgree) {
  withdrawAgree.addEventListener('change', function () {
    if (withdrawConfirm) withdrawConfirm.disabled = !this.checked;
  });
}

var withdrawModal   = document.getElementById('miWithdrawModal');
var modalCancel     = document.getElementById('miModalCancel');
var modalConfirm    = document.getElementById('miModalConfirm');

if (withdrawConfirm) {
  withdrawConfirm.addEventListener('click', function () {
    if (withdrawModal) withdrawModal.classList.add('visible');
  });
}

if (modalCancel) {
  modalCancel.addEventListener('click', function () {
    withdrawModal.classList.remove('visible');
  });
}

if (withdrawModal) {
  withdrawModal.addEventListener('click', function (e) {
    if (e.target === withdrawModal) withdrawModal.classList.remove('visible');
  });
}

if (modalConfirm) {
  modalConfirm.addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'withdraw-done.html';
  });
}
