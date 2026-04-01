/* ================================================================
   LAWSIGN – PREVIEW JS (공통: loan / noise / contract / membership / custom)
   ================================================================ */

/* ── 유형별 내용 자동 생성 ── */
function generateContent(type) {
  switch (type) {

    case 'loan': {
      var amount  = sessionStorage.getItem('loan_q1_amount') || '';
      var ldY = sessionStorage.getItem('loan_q1_year') || '';
      var ldM = sessionStorage.getItem('loan_q1_month') || '';
      var ldD = sessionStorage.getItem('loan_q1_day') || '';
      var ldate = (ldY && ldM && ldD) ? ldY + '년 ' + ldM + '월 ' + ldD + '일' : '';
      var hasDue  = sessionStorage.getItem('loan_q2') === 'yes';
      var ddY = sessionStorage.getItem('loan_q2_year') || '';
      var ddM = sessionStorage.getItem('loan_q2_month') || '';
      var ddD = sessionStorage.getItem('loan_q2_day') || '';
      var dueDate = (ddY && ddM && ddD) ? ddY + '년 ' + ddM + '월 ' + ddD + '일' : '';
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
      var pdY = sessionStorage.getItem('noise_q3_year') || '';
      var pdM = sessionStorage.getItem('noise_q3_month') || '';
      var pdD = sessionStorage.getItem('noise_q3_day') || '';
      var priorDate = (pdY && pdM && pdD) ? pdY + '년 ' + pdM + '월 ' + pdD + '일' : '';
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
      var cY = sessionStorage.getItem('contract_q2_year') || '';
      var cM = sessionStorage.getItem('contract_q2_month') || '';
      var cD = sessionStorage.getItem('contract_q2_day') || '';
      var eventDate = (cY && cM && cD) ? cY + '년 ' + cM + '월 ' + cD + '일' : '';
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
      var mY = sessionStorage.getItem('membership_q2_year') || '';
      var mM = sessionStorage.getItem('membership_q2_month') || '';
      var mD = sessionStorage.getItem('membership_q2_day') || '';
      var eventDate = (mY && mM && mD) ? mY + '년 ' + mM + '월 ' + mD + '일' : '';
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
      var cuY = sessionStorage.getItem('custom_q2_year') || '';
      var cuM = sessionStorage.getItem('custom_q2_month') || '';
      var cuD = sessionStorage.getItem('custom_q2_day') || '';
      var eventDate = (cuY && cuM && cuD) ? cuY + '년 ' + cuM + '월 ' + cuD + '일' : '';
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

/* ── 필수 입력 체크 ── */
var savedOnce = false;
var sendMethod = 'simple';

function checkRequired() {
  if (savedOnce) return;
  var name     = document.getElementById('senderName').value.trim();
  var phone    = document.getElementById('senderPhone').value.trim();

  var recName  = document.getElementById('recipientName').value.trim();
  var recPhone = document.getElementById('recipientPhone').value.trim();
  var recBirth = document.getElementById('recipientBirth').value.trim();

  var baseOk = name && phone && recName && recPhone;
  var certOk = sendMethod === 'certified' ? (baseOk && recBirth.length === 8) : baseOk;

  document.getElementById('btnSave').disabled = !certOk;
}

/* ── 문서 확대/축소 ── */
var docScale  = 1.0;
var MIN_SCALE = 0.6;
var MAX_SCALE = 1.5;
var SCALE_STEP = 0.1;

function applyScale() {
  document.querySelector('.doc-paper').style.zoom = docScale;
}

/* ── 초기화 ── */
(function init() {
  var type = sessionStorage.getItem('wizard_type') || 'custom';
  sendMethod = sessionStorage.getItem('send_method') || 'simple';

  /* 발송 방식 뱃지 + 안내 */
  var methodBadge  = document.getElementById('methodBadge');
  var methodNotice = document.getElementById('methodNotice');
  var birthRow     = document.getElementById('recipientBirthRow');

  var recipientRoleTd = birthRow.previousElementSibling
    ? birthRow.previousElementSibling.querySelector('.doc-role-label')
    : null;

  if (sendMethod === 'certified') {
    methodBadge.textContent  = '전자문서 + 공전소';
    methodBadge.className    = 'doc-method-badge doc-method-badge--certified';
    methodNotice.textContent = '수신인 생년월일이 있어야 본인 인증 후 발송됩니다.';
    birthRow.style.display   = '';
    if (recipientRoleTd) recipientRoleTd.rowSpan = 2;
  } else {
    methodBadge.textContent  = '알림톡 + 공전소';
    methodBadge.className    = 'doc-method-badge doc-method-badge--simple';
    methodNotice.textContent = '카카오 알림톡으로 발송됩니다.';
    birthRow.style.display   = 'none';
    if (recipientRoleTd) recipientRoleTd.rowSpan = 1;
  }

  /* 내용 자동 생성 */
  document.getElementById('docContent').value = generateContent(type);

  /* 문서 제목 */
  var TITLE_MAP = {
    loan:       '대여금 반환 청구',
    noise:      '층간소음 시정 요구',
    contract:   '계약 해제 통보',
    membership: '회원권 환불 청구',
    custom:     '내용증명'
  };
  var headingEl = document.getElementById('docHeading');
  headingEl.value = sessionStorage.getItem('doc_title') || TITLE_MAP[type] || '내용증명';
  headingEl.addEventListener('input', function () {
    sessionStorage.setItem('doc_title', headingEl.value);
  });

  /* 확대/축소 */
  document.getElementById('btnPlus').addEventListener('click', function () {
    if (docScale < MAX_SCALE) { docScale = Math.round((docScale + SCALE_STEP) * 10) / 10; applyScale(); }
  });
  document.getElementById('btnMinus').addEventListener('click', function () {
    if (docScale > MIN_SCALE) { docScale = Math.round((docScale - SCALE_STEP) * 10) / 10; applyScale(); }
  });

  /* 주소 토글 */
  var addrToggle    = document.getElementById('addrToggle');
  var senderAddrWrap = document.getElementById('senderAddrWrap');
  var addrNoneHint  = document.getElementById('addrNoneHint');
  addrToggle.addEventListener('change', function () {
    var on = this.checked;
    senderAddrWrap.style.display = on ? '' : 'none';
    addrNoneHint.style.display   = on ? 'none' : '';
    if (!on) {
      document.getElementById('senderAddr').value       = '';
      document.getElementById('senderAddrDetail').value = '';
    }
    checkRequired();
  });

  /* 전화번호 하이픈 */
  ['senderPhone', 'recipientPhone'].forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener('input', function () {
      el.value = formatPhone(el.value);
      checkRequired();
    });
  });

  /* 생년월일 숫자만 허용 */
  document.getElementById('recipientBirth').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 8);
    checkRequired();
  });

  /* 입력 변경 시 버튼 활성화 체크 */
  ['senderName', 'senderPhone', 'senderAddr', 'senderAddrDetail',
   'recipientName', 'recipientPhone', 'docContent'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', checkRequired);
  });

  /* ── 뷰 모드 문서 HTML 생성 ── */
  function buildViewDoc() {
    var title    = document.getElementById('docHeading').value || '내용증명';
    var sName    = document.getElementById('senderName').value;
    var sPhone   = document.getElementById('senderPhone').value;
    var sAddr    = document.getElementById('senderAddr').value;
    var sDetail  = document.getElementById('senderAddrDetail').value;
    var rName    = document.getElementById('recipientName').value;
    var rPhone   = document.getElementById('recipientPhone').value;
    var rBirth   = document.getElementById('recipientBirth').value;
    var content  = document.getElementById('docContent').value;
    var addrText = [sAddr, sDetail].filter(Boolean).join(' ');
    var showAddr  = !!addrText;
    var showBirth = sendMethod === 'certified' && !!rBirth;

    var contentHtml = content
      .split('\n')
      .map(function (line) { return line ? '<p>' + line + '</p>' : '<p>&nbsp;</p>'; })
      .join('');

    var sRowspan = showAddr  ? ' rowspan="2"' : '';
    var rRowspan = showBirth ? ' rowspan="2"' : '';

    var addrRowHtml = showAddr
      ? '<tr>' +
          '<td class="doc-sublabel">주소</td>' +
          '<td class="doc-field-cell" colspan="3">' + addrText + '</td>' +
        '</tr>'
      : '';

    var birthRowHtml = showBirth
      ? '<tr>' +
          '<td class="doc-sublabel">생년월일</td>' +
          '<td class="doc-field-cell" colspan="3">' + rBirth + '</td>' +
        '</tr>'
      : '';

    return '<div class="vd-title">' + title + '</div>' +
      '<table class="doc-table">' +
        '<colgroup>' +
          '<col class="col-role" />' +
          '<col class="col-sublabel" />' +
          '<col class="col-content" />' +
          '<col class="col-sublabel" />' +
          '<col class="col-content" />' +
        '</colgroup>' +
        '<tbody>' +
          '<tr>' +
            '<td class="doc-role-label"' + sRowspan + '>발신인<span class="doc-role-sub">(보내는 사람)</span></td>' +
            '<td class="doc-sublabel">성명</td>' +
            '<td class="doc-field-cell">' + sName + '</td>' +
            '<td class="doc-sublabel">전화번호</td>' +
            '<td class="doc-field-cell">' + sPhone + '</td>' +
          '</tr>' +
          addrRowHtml +
          '<tr>' +
            '<td class="doc-role-label"' + rRowspan + '>수신인<span class="doc-role-sub">(받는 사람)</span></td>' +
            '<td class="doc-sublabel">성명</td>' +
            '<td class="doc-field-cell">' + rName + '</td>' +
            '<td class="doc-sublabel">전화번호</td>' +
            '<td class="doc-field-cell">' + rPhone + '</td>' +
          '</tr>' +
          birthRowHtml +
          '<tr><td class="doc-content-label" colspan="5">내 용</td></tr>' +
          '<tr><td class="doc-content-body" colspan="5">' + contentHtml + '</td></tr>' +
        '</tbody>' +
      '</table>';
  }

  /* 수정완료 / 수정하기 버튼 토글 */
  var btnSave = document.getElementById('btnSave');
  var isViewMode = false;

  function enterViewMode() {
    isViewMode = true;
    savedOnce = true;
    sessionStorage.setItem('receiver_name',  document.getElementById('recipientName').value.trim());
    sessionStorage.setItem('receiver_phone', document.getElementById('recipientPhone').value.trim());
    if (sendMethod === 'certified') {
      sessionStorage.setItem('receiver_birth', document.getElementById('recipientBirth').value.trim());
    } else {
      sessionStorage.removeItem('receiver_birth');
    }
    var viewEl = document.getElementById('docPaperView');
    var editEl = document.getElementById('docPaperEdit');
    viewEl.innerHTML = buildViewDoc();
    viewEl.style.display = '';
    editEl.style.display = 'none';
    btnSave.textContent = '수정하기';
    btnSave.disabled = false;
    btnSave.classList.remove('doc-action-btn--save');
    btnSave.classList.add('doc-action-btn--edit');
    document.getElementById('btnSend').disabled = false;
  }

  function enterEditMode() {
    isViewMode = false;
    document.getElementById('docPaperView').style.display = 'none';
    document.getElementById('docPaperEdit').style.display = '';
    btnSave.textContent = '수정완료';
    btnSave.classList.remove('doc-action-btn--edit');
    btnSave.classList.add('doc-action-btn--save');
    document.getElementById('btnSend').disabled = true;
    checkRequired();
  }

  btnSave.addEventListener('click', function () {
    if (isViewMode) {
      enterEditMode();
    } else {
      enterViewMode();
    }
  });

  /* PDF 다운로드 (미구현 안내) */
  document.getElementById('btnPdf').addEventListener('click', function () {
    alert('PDF 다운로드 기능은 준비 중입니다.');
  });

  /* 이전 버튼: 발송 방식 선택으로 돌아가기 */
  document.getElementById('btnPrev').addEventListener('click', function () {
    window.location.href = 'send-method.html';
  });

  /* 발송 버튼: 로그인 여부 확인 후 이동 */
  document.getElementById('btnSend').addEventListener('click', function () {
    if (sessionStorage.getItem('logged_in') === 'true') {
      window.location.href = 'payment.html';
    } else {
      window.location.href = 'signup-prompt.html';
    }
  });
})();

/* ── 다음 주소 검색 ── */
function openAddrSearch() {
  if (document.querySelector('.doc-paper').classList.contains('view-mode')) return;
  new daum.Postcode({
    oncomplete: function (data) {
      document.getElementById('senderAddr').value = data.roadAddress || data.jibunAddress;
      document.getElementById('senderAddrDetail').focus();
      checkRequired();
    }
  }).open();
}

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
