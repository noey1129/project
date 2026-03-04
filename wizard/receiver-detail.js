/* ================================================================
   SENDIT – WIZARD RECEIVER DETAIL JS
   ================================================================ */

const method     = sessionStorage.getItem('send_method') || 'simple';
const isCertified = method === 'certified';

const receiverPhone = document.getElementById('receiverPhone');
const receiverName  = document.getElementById('receiverName');
const birthGroup    = document.getElementById('birthGroup');
const receiverBirth = document.getElementById('receiverBirth');
const nameHint      = document.getElementById('nameHint');
const methodDesc    = document.getElementById('methodDesc');
const btnNext       = document.getElementById('btnNext');
const btnPrev       = document.getElementById('btnPrev');

/* ── 방식에 따라 UI 분기 ── */
(function setupUI() {
  if (isCertified) {
    methodDesc.textContent  = '전자문서+공전소 발송은 수신인의 이름과 생년월일이 필요합니다.';
    nameHint.textContent    = '(전자문서+공전소 필수)';
    birthGroup.style.display = 'flex';
  } else {
    methodDesc.textContent  = '알림톡+공전소 발송은 전화번호만 입력하셔도 됩니다.';
    nameHint.textContent    = '(미입력 시 "수신인"으로 발송)';
    birthGroup.style.display = 'none';
  }
})();

/* ── 전화번호 자동 하이픈 ── */
function formatPhone(value) {
  var digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.startsWith('02')) {
    if (digits.length <= 5)  return digits.slice(0,2)+'-'+digits.slice(2);
    if (digits.length <= 9)  return digits.slice(0,2)+'-'+digits.slice(2,5)+'-'+digits.slice(5);
    return digits.slice(0,2)+'-'+digits.slice(2,6)+'-'+digits.slice(6,10);
  }
  if (digits.length <= 6)  return digits.slice(0,3)+'-'+digits.slice(3);
  if (digits.length <= 10) return digits.slice(0,3)+'-'+digits.slice(3,6)+'-'+digits.slice(6);
  return digits.slice(0,3)+'-'+digits.slice(3,7)+'-'+digits.slice(7,11);
}

function checkReady() {
  var phone = receiverPhone.value.trim();
  if (!phone) { btnNext.disabled = true; return; }
  if (isCertified) {
    btnNext.disabled = !(receiverName.value.trim() && receiverBirth.value.replace(/\D/g,'').length === 8);
  } else {
    btnNext.disabled = false;
  }
}

/* ── 복원 ── */
(function restoreState() {
  var savedPhone = sessionStorage.getItem('receiver_phone');
  var savedName  = sessionStorage.getItem('receiver_name');
  var savedBirth = sessionStorage.getItem('receiver_birth');
  if (savedPhone) receiverPhone.value = savedPhone;
  if (savedName)  receiverName.value  = savedName;
  if (savedBirth) receiverBirth.value = savedBirth;
  checkReady();
})();

receiverPhone.addEventListener('input', function () {
  receiverPhone.value = formatPhone(receiverPhone.value);
  checkReady();
});
receiverName.addEventListener('input', checkReady);
receiverBirth.addEventListener('input', function () {
  receiverBirth.value = receiverBirth.value.replace(/\D/g, '').slice(0, 8);
  checkReady();
});

btnPrev.addEventListener('click', function () {
  window.location.href = 'send-method.html';
});

btnNext.addEventListener('click', function () {
  sessionStorage.setItem('receiver_phone', receiverPhone.value.trim());
  sessionStorage.setItem('receiver_name',  receiverName.value.trim());
  if (isCertified) {
    sessionStorage.setItem('receiver_birth', receiverBirth.value);
  }
  window.location.href = 'payment.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
