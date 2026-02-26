/* ================================================================
   SENDIT – PREVIEW JS (공통: loan / noise / contract / membership / custom)
   ================================================================ */

/* ── 유형별 이전 페이지 맵 ── */
var prevPageMap = {
  loan:       'loan-q5.html',
  noise:      'noise-q5.html',
  contract:   'contract-q4.html',
  membership: 'membership-q4.html',
  custom:     'custom-q4.html',
};

/* ── 유형별 내용 자동 생성 ── */
function generateContent(type) {
  switch (type) {

    case 'loan': {
      var amount  = sessionStorage.getItem('loan_q1_amount') || '';
      var ldate   = sessionStorage.getItem('loan_q1_date')   || '';
      var hasDue  = sessionStorage.getItem('loan_q2') === 'yes';
      var dueDate = sessionStorage.getItem('loan_q2_date')   || '';
      var evidence;
      try { evidence = JSON.parse(sessionStorage.getItem('loan_q3') || '[]'); } catch(e) { evidence = []; }
      var hasRepaid  = sessionStorage.getItem('loan_q4') === 'yes';
      var repaid     = sessionStorage.getItem('loan_q4_amount') || '';
      var deadline   = sessionStorage.getItem('loan_q5') || '14';

      var amountFmt = amount ? Number(amount).toLocaleString('ko-KR') + '원' : '금액 미입력';
      var remaining = (amount && hasRepaid && repaid)
        ? (Number(amount) - Number(repaid)).toLocaleString('ko-KR') + '원'
        : amountFmt;

      var lines = [];
      lines.push('본인은 귀하에게 ' + ldate + ' 금 ' + amountFmt + '을 대여하였습니다.');
      if (hasDue && dueDate) {
        lines.push('당시 ' + dueDate + '까지 변제하기로 약정하였으나, 현재까지 이를 이행하지 않고 있습니다.');
      } else {
        lines.push('별도의 변제 기한을 정하지 않았으나, 상당한 시일이 경과하도록 변제가 이루어지지 않고 있습니다.');
      }
      if (evidence.length && !evidence.includes('없어요')) {
        lines.push('대여 사실은 ' + evidence.join(', ') + ' 등으로 입증 가능합니다.');
      }
      if (hasRepaid && repaid) {
        lines.push('일부 ' + Number(repaid).toLocaleString('ko-KR') + '원을 변제받았으며, 잔액 ' + remaining + '의 즉시 변제를 요구합니다.');
      } else {
        lines.push('이에 본 내용증명 수령일로부터 ' + deadline + '일 이내에 위 대여금 전액을 변제할 것을 촉구합니다.');
      }
      lines.push('만약 위 기한 내에 변제하지 않을 경우, 법적 절차를 진행할 것임을 통보합니다.');
      return lines.join('\n\n');
    }

    case 'noise': {
      var noiseType = sessionStorage.getItem('noise_q1') || '소음';
      var desc      = sessionStorage.getItem('noise_q2') || '';
      var hasPrior  = sessionStorage.getItem('noise_q3') === 'yes';
      var priorDate = sessionStorage.getItem('noise_q3_date') || '';
      var reported  = sessionStorage.getItem('noise_q4') === 'yes';
      var deadline  = sessionStorage.getItem('noise_q5') || '14';

      var lines = [];
      lines.push('본인은 귀하로 인한 층간소음(' + noiseType + ') 피해로 인하여 본 내용증명을 발송합니다.');
      if (desc) lines.push(desc);
      if (hasPrior && priorDate) {
        lines.push(priorDate + '에 소음 중단을 요청하였으나 현재까지 개선이 이루어지지 않고 있습니다.');
      }
      if (reported) {
        lines.push('관리사무소에 신고하였으나 실질적인 조치가 취해지지 않은 상황입니다.');
      }
      lines.push('이에 본 내용증명 수령일로부터 ' + deadline + '일 이내에 소음 발생 행위를 중단할 것을 강력히 요구합니다.');
      lines.push('위 기한 내에 시정되지 않을 경우, 관련 법규에 따른 법적 조치를 취할 것임을 통보합니다.');
      return lines.join('\n\n');
    }

    case 'contract': {
      var situation = sessionStorage.getItem('contract_q1') || '';
      var eventDate = sessionStorage.getItem('contract_q2') || '';
      var demand    = sessionStorage.getItem('contract_q3') || '';
      var deadline  = sessionStorage.getItem('contract_q4') || '14';

      var lines = [];
      if (situation) lines.push(situation);
      if (eventDate) lines.push('위 사실은 ' + eventDate + '에 발생하였습니다.');
      if (demand)    lines.push(demand);
      lines.push('본 내용증명 수령일로부터 ' + deadline + '일 이내에 위 사항을 이행해 주시기 바랍니다.');
      lines.push('기한 내 이행이 없을 경우 법적 조치를 취할 것임을 통보합니다.');
      return lines.join('\n\n');
    }

    case 'membership': {
      var situation = sessionStorage.getItem('membership_q1') || '';
      var eventDate = sessionStorage.getItem('membership_q2') || '';
      var demand    = sessionStorage.getItem('membership_q3') || '';
      var deadline  = sessionStorage.getItem('membership_q4') || '14';

      var lines = [];
      if (situation) lines.push(situation);
      if (eventDate) lines.push('위 사실은 ' + eventDate + '에 발생하였습니다.');
      if (demand)    lines.push(demand);
      lines.push('본 내용증명 수령일로부터 ' + deadline + '일 이내에 환불을 이행해 주시기 바랍니다.');
      lines.push('기한 내 이행이 없을 경우 법적 조치를 취할 것임을 통보합니다.');
      return lines.join('\n\n');
    }

    case 'custom':
    default: {
      var situation = sessionStorage.getItem('custom_q1') || '';
      var eventDate = sessionStorage.getItem('custom_q2') || '';
      var demand    = sessionStorage.getItem('custom_q3') || '';
      var deadline  = sessionStorage.getItem('custom_q4') || '14';

      var lines = [];
      if (situation) lines.push(situation);
      if (eventDate) lines.push('위 사실은 ' + eventDate + '에 발생하였습니다.');
      if (demand)    lines.push(demand);
      lines.push('본 내용증명 수령일로부터 ' + deadline + '일 이내에 위 사항을 이행해 주시기 바랍니다.');
      lines.push('기한 내 이행이 없을 경우 법적 조치를 취할 것임을 통보합니다.');
      return lines.join('\n\n');
    }
  }
}

/* ── 전화번호 자동 하이픈 ── */
function formatPhone(value) {
  var digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.startsWith('02')) {
    if (digits.length <= 5)  return digits.slice(0, 2) + '-' + digits.slice(2);
    if (digits.length <= 9)  return digits.slice(0, 2) + '-' + digits.slice(2, 5) + '-' + digits.slice(5);
    return digits.slice(0, 2) + '-' + digits.slice(2, 6) + '-' + digits.slice(6, 10);
  }
  if (digits.length <= 6)  return digits.slice(0, 3) + '-' + digits.slice(3);
  if (digits.length <= 10) return digits.slice(0, 3) + '-' + digits.slice(3, 6) + '-' + digits.slice(6);
  return digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7, 11);
}

/* ── Kakao 주소 검색 ── */
function openKakaoPostcode(addrId, detailId) {
  if (typeof daum === 'undefined' || !daum.Postcode) return;
  new daum.Postcode({
    oncomplete: function (data) {
      document.getElementById(addrId).value = data.roadAddress || data.jibunAddress;
      document.getElementById(detailId).focus();
      checkRequired();
    }
  }).open();
}

/* ── 필수 입력 체크 ── */
var savedOnce = false;

function checkRequired() {
  if (savedOnce) return;
  var name  = document.getElementById('senderName').value.trim();
  var phone = document.getElementById('senderPhone').value.trim();
  var addr  = document.getElementById('senderAddr').value.trim();
  document.getElementById('btnSave').disabled = !(name && phone && addr);
}

/* ── 문서 확대/축소 ── */
var docScale  = 1.0;
var MIN_SCALE = 0.6;
var MAX_SCALE = 1.5;
var SCALE_STEP = 0.1;

function applyScale() {
  document.querySelector('.doc-paper').style.zoom = docScale;
}

/* ── 탭 전환 ── */
var currentTab = 'know';

function switchTab(tab) {
  currentTab = tab;
  document.getElementById('tabKnow').classList.toggle('active', tab === 'know');
  document.getElementById('tabUnknown').classList.toggle('active', tab === 'unknown');

  var recipientAddrRow   = document.getElementById('recipientAddrRow');
  var recipientRoleLabel = document.getElementById('recipientRoleLabel');

  if (tab === 'unknown') {
    recipientAddrRow.style.display = 'none';
    recipientRoleLabel.rowSpan = 1;
  } else {
    recipientAddrRow.style.display = '';
    recipientRoleLabel.rowSpan = 2;
  }
}

/* ── 초기화 ── */
(function init() {
  var type = sessionStorage.getItem('wizard_type') || 'custom';

  /* 내용 자동 생성 */
  document.getElementById('docContent').value = generateContent(type);

  /* 이벤트 */
  document.getElementById('tabKnow').addEventListener('click', function () { switchTab('know'); });
  document.getElementById('tabUnknown').addEventListener('click', function () { switchTab('unknown'); });

  document.getElementById('btnPlus').addEventListener('click', function () {
    if (docScale < MAX_SCALE) { docScale = Math.round((docScale + SCALE_STEP) * 10) / 10; applyScale(); }
  });
  document.getElementById('btnMinus').addEventListener('click', function () {
    if (docScale > MIN_SCALE) { docScale = Math.round((docScale - SCALE_STEP) * 10) / 10; applyScale(); }
  });

  /* 전화번호 하이픈 */
  ['senderPhone', 'recipientPhone'].forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener('input', function () {
      var pos = el.selectionStart;
      el.value = formatPhone(el.value);
      checkRequired();
    });
  });

  /* 주소 Kakao */
  document.getElementById('senderAddr').addEventListener('click', function () {
    openKakaoPostcode('senderAddr', 'senderAddrDetail');
  });
  document.getElementById('recipientAddr').addEventListener('click', function () {
    openKakaoPostcode('recipientAddr', 'recipientAddrDetail');
  });

  /* 입력 변경 시 버튼 활성화 체크 */
  ['senderName', 'senderPhone', 'senderAddr', 'senderAddrDetail',
   'recipientName', 'recipientPhone', 'recipientAddr', 'recipientAddrDetail',
   'docContent'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', checkRequired);
  });

  /* 수정완료 버튼 */
  document.getElementById('btnSave').addEventListener('click', function () {
    savedOnce = true;
    document.querySelector('.doc-paper').classList.add('view-mode');
    document.querySelectorAll('.doc-input, .doc-textarea').forEach(function (el) {
      el.readOnly = true;
    });
    document.getElementById('btnSave').disabled = true;
    document.getElementById('btnSend').disabled = false;
  });

  /* PDF 다운로드 (미구현 안내) */
  document.getElementById('btnPdf').addEventListener('click', function () {
    alert('PDF 다운로드 기능은 준비 중입니다.');
  });

  /* 이전 버튼 */
  document.getElementById('btnPrev').addEventListener('click', function () {
    var prev = prevPageMap[type] || 'select-situation.html';
    window.location.href = prev;
  });

  /* 발송 버튼 */
  document.getElementById('btnSend').addEventListener('click', function () {
    window.location.href = 'wizard/send-method.html';
  });
})();

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
