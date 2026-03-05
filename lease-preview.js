/* ================================================================
   SENDIT – LEASE PREVIEW JS
   모든 sessionStorage 값을 읽어 내용증명 문서 자동 생성
   ================================================================ */

/* ── sessionStorage 값 읽기 ── */
var q1  = sessionStorage.getItem('sendit_q1')  || 'ended';
var q2  = sessionStorage.getItem('sendit_q2')  || 'deposit';
var q3a = sessionStorage.getItem('sendit_q3_address') || '';
var q3d = sessionStorage.getItem('sendit_q3_detail')  || '';
var q4  = sessionStorage.getItem('sendit_q4_amount')  || '0';
var q5  = sessionStorage.getItem('sendit_q5_amount')  || '0';
var q6y = sessionStorage.getItem('sendit_q6_year')    || '';
var q6m = sessionStorage.getItem('sendit_q6_month')   || '';
var q6d = sessionStorage.getItem('sendit_q6_day')     || '';
var q8y = sessionStorage.getItem('sendit_q8_year')    || '';
var q8m = sessionStorage.getItem('sendit_q8_month')   || '';
var q8d = sessionStorage.getItem('sendit_q8_day')     || '';
var q9sy = sessionStorage.getItem('sendit_q9_start_year')  || '';
var q9sm = sessionStorage.getItem('sendit_q9_start_month') || '';
var q9sd = sessionStorage.getItem('sendit_q9_start_day')   || '';
var q9ey = sessionStorage.getItem('sendit_q9_end_year')    || '';
var q9em = sessionStorage.getItem('sendit_q9_end_month')   || '';
var q9ed = sessionStorage.getItem('sendit_q9_end_day')     || '';
var q10  = sessionStorage.getItem('sendit_q10') || 'no';
var q10p = sessionStorage.getItem('sendit_q10_problem') || '';
var q11  = sessionStorage.getItem('sendit_q11') || 'no';
var q11a = sessionStorage.getItem('sendit_q11_amount')  || '0';
var q12  = sessionStorage.getItem('sendit_q12') || 'no';
var q12d = sessionStorage.getItem('sendit_q12_damage')  || '';

/* ── 숫자 천단위 포맷 ── */
function fmt(n) {
  return Number(n || 0).toLocaleString('ko-KR');
}

/* ── 날짜 포맷 ── */
function fmtDate(y, m, d) {
  if (!y || !m || !d) return null;
  return y + '년 ' + m + '월 ' + d + '일';
}

/* ── 전화번호 자동 하이픈 포맷 ── */
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

/* ── 데이터 정리 ── */
var contractDate   = fmtDate(q8y, q8m, q8d);
var leaseStart     = fmtDate(q9sy, q9sm, q9sd);
var leaseEnd       = fmtDate(q9ey, q9em, q9ed);
var returnDeadline = fmtDate(q6y, q6m, q6d);
var address        = [q3a, q3d].filter(Boolean).join(' ');
var deposit        = fmt(q4);
var monthlyRent    = Number(q5 || 0) > 0 ? fmt(q5) : null;

var terminationPhrase =
  q1 === 'ended'
    ? '본 임대차 계약 기간의 만료에 따라 종료되었으며'
    : '본 임대차 계약이 적법하게 해지되었으며';

var subjectMap = {
  deposit:     '임대차 보증금 반환 청구',
  termination: '임대차 계약 해지 통보',
  correction:  '임대차 계약 내용 시정 요구',
};
var subject = subjectMap[q2] || subjectMap.deposit;

/* ── 내용증명 본문 생성 ── */
function generateContent() {
  var lines = [];

  lines.push('제 목 : ' + subject);
  lines.push('');
  lines.push('귀측(수신인, 이하 \'귀측\')의 건승과 무궁한 발전을 기원합니다.');
  lines.push('');
  lines.push(
    '본 발신인은 아래와 같이 귀하와 임대차 계약을 체결하였음을 확인하며, ' +
    '귀측에게 본 계약에 따른 임대차 보증금 반환의무가 있음을 알려드리는 바, ' +
    '이에 대해 신속히 이행해 주시기를 촉구합니다.'
  );

  lines.push('가. 본 계약의 주요 사항은 다음과 같습니다.');
  var itemNo = 1;
  if (contractDate) {
    lines.push('    ' + itemNo++ + ') 계약 체결일 : ' + contractDate);
  }
  if (address) {
    lines.push('    ' + itemNo++ + ') 임대차 대상 : ' + address);
  }
  if (leaseStart && leaseEnd) {
    lines.push('    ' + itemNo++ + ') 임대차 기간 : ' + leaseStart + ' ~ ' + leaseEnd);
  }
  if (Number(q4) > 0) {
    lines.push('    ' + itemNo++ + ') 임대차 보증금 : ' + deposit + '원');
  }
  if (monthlyRent) {
    lines.push('    ' + itemNo++ + ') 월세 : ' + monthlyRent + '원');
  }

  lines.push(
    '나. 그러나 ' + terminationPhrase + ', 이에 귀측은 임대차 계약 상 ' +
    '본 발신인에게 ' + deposit + '원을 반환할 의무를 이행해야 할 법적 책임이 있습니다.'
  );
  lines.push('');

  if (returnDeadline) {
    lines.push(
      '본 발신인은 귀측이 ' + returnDeadline + '까지 본 발신인에게 임대차 보증금을 반환할 것을 강력히 촉구하는 바입니다. ' +
      '만약 이를 이행하지 않을 경우, 본 발신인은 민사집행법 제276조 이하에 따른 가압류 등 보전 처분, ' +
      '임차권 등기명령 신청, 또는 민사소송법에 따른 보증금 반환 청구 소송 등의 법적 조치를 취할 것을 엄중히 경고드립니다.'
    );
  } else {
    lines.push(
      '본 발신인은 귀측에게 지체 없이 임대차 보증금을 반환할 것을 강력히 촉구하는 바입니다. ' +
      '만약 이를 이행하지 않을 경우, 본 발신인은 민사집행법 제276조 이하에 따른 가압류 등 보전 처분, ' +
      '임차권 등기명령 신청, 또는 민사소송법에 따른 보증금 반환 청구 소송 등의 법적 조치를 취할 것을 엄중히 경고드립니다.'
    );
  }
  lines.push('');

  lines.push(
    '이 경우, 귀측은 임대차 보증금 반환 의무와 관련하여 발생하는 원금, 이자 및 지연손해금뿐만 아니라, ' +
    '소송 비용 전액을 부담하게 될 것입니다. 또한, 본 발신인이 소송을 제기할 경우, 지연 손해금은 ' +
    '「소송촉진 등에 관한 특례법」 제3조 제1항에 의거하여 연 12%의 법정이율이 적용됨을 명확히 통지드립니다.'
  );

  if (q10 === 'yes' && q10p) {
    lines.push('');
    lines.push('또한, 임대차 기간 중 아래와 같은 주거 환경 문제가 있었음을 함께 알려드립니다.');
    lines.push('가. ' + q10p);
  }

  if (q11 === 'yes' && Number(q11a) > 0) {
    lines.push('');
    lines.push(
      '아울러, 본 발신인은 임대차 기간 중 납부한 장기수선충당금 ' + fmt(q11a) + '원의 반환을 함께 청구합니다.'
    );
  }

  if (q12 === 'yes' && q12d) {
    lines.push('');
    lines.push(
      '뿐만 아니라, 본 발신인은 아래와 같이 귀측의 보증금 반환 지연으로 인해 특별한 손해를 입고 있음을 통지드립니다. ' +
      '귀측이 상기 법적 의무를 이행하지 않을 경우, 본 발신인은 귀측을 상대로 해당 특별한 사정으로 발생한 손해에 대한 ' +
      '배상 청구를 진행할 권리가 있음을 명확히 알려드립니다.'
    );
    lines.push('가. ' + q12d);
  }

  lines.push('');
  lines.push(
    '본 발신인이 귀측에게 위와 같은 법적 조치를 취하기 전에 귀측은 기한 내에 귀측의 명백한 ' +
    '임대차보증금 반환 의무를 이행하여 본 건을 원만하게 해결하시기를 마지막으로 말씀드립니다.'
  );

  return lines.join('\n');
}

/* ── 텍스트에리어 높이 자동 조정 ── */
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

/* ── 필수 입력 체크 ── */
var savedOnce = false;
var sendMethod = 'simple';

function checkRequired() {
  if (savedOnce) return;
  var senderName   = document.getElementById('senderName').value.trim();
  var senderPhone  = document.getElementById('senderPhone').value.trim();
  var recName      = document.getElementById('recipientName').value.trim();
  var recPhone     = document.getElementById('recipientPhone').value.trim();
  var recBirth     = document.getElementById('recipientBirth').value.trim();

  var baseOk = senderName && senderPhone && recName && recPhone;
  var certOk = sendMethod === 'certified' ? (baseOk && recBirth.length === 8) : baseOk;

  document.getElementById('btnSave').disabled = !certOk;
}

/* ── 확대/축소 ── */
var docScale  = 1.0;
var MIN_SCALE = 0.6;
var MAX_SCALE = 1.5;
var SCALE_STEP = 0.1;

function applyScale() {
  document.querySelector('.doc-paper').style.zoom = docScale;
}

/* ── 페이지 초기화 ── */
(function init() {
  sendMethod = sessionStorage.getItem('send_method') || 'simple';

  /* 발송 방식 뱃지 + 안내 */
  var methodBadge  = document.getElementById('methodBadge');
  var methodNotice = document.getElementById('methodNotice');
  var birthRow     = document.getElementById('recipientBirthRow');

  if (sendMethod === 'certified') {
    methodBadge.textContent  = '전자문서 + 공전소';
    methodBadge.className    = 'doc-method-badge doc-method-badge--certified';
    methodNotice.textContent = '수신인 생년월일이 있어야 본인 인증 후 발송됩니다.';
    birthRow.style.display   = '';
  } else {
    methodBadge.textContent  = '알림톡 + 공전소';
    methodBadge.className    = 'doc-method-badge doc-method-badge--simple';
    methodNotice.textContent = '카카오 알림톡으로 발송됩니다.';
    birthRow.style.display   = 'none';
  }

  /* 내용 자동 생성 */
  var docContent = document.getElementById('docContent');
  var saved = sessionStorage.getItem('sendit_preview_content');
  docContent.value = saved || generateContent();
  autoResize(docContent);

  /* 저장된 발신인 정보 복원 */
  ['senderName', 'senderPhone', 'senderAddr', 'senderAddrDetail'].forEach(function (id) {
    var val = sessionStorage.getItem('sendit_preview_' + id);
    if (val) document.getElementById(id).value = val;
  });

  /* 주소 토글 */
  var addrToggle     = document.getElementById('addrToggle');
  var senderAddrWrap = document.getElementById('senderAddrWrap');
  var addrNoneHint   = document.getElementById('addrNoneHint');

  /* 저장된 주소 있으면 토글 ON */
  if (document.getElementById('senderAddr').value) {
    addrToggle.checked           = true;
    senderAddrWrap.style.display = '';
    addrNoneHint.style.display   = 'none';
  }

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

  checkRequired();
})();

/* ── 텍스트에리어 자동 높이 ── */
document.getElementById('docContent').addEventListener('input', function () {
  autoResize(this);
});

/* ── 전화번호 자동 하이픈 ── */
['senderPhone', 'recipientPhone'].forEach(function (id) {
  document.getElementById(id).addEventListener('input', function () {
    var prev = this.value;
    this.value = formatPhone(prev);
    checkRequired();
  });
});

/* ── 생년월일 숫자만 허용 ── */
document.getElementById('recipientBirth').addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '').slice(0, 8);
  checkRequired();
});

/* ── 입력 변경 감지 ── */
['senderName', 'senderPhone', 'senderAddr', 'senderAddrDetail',
 'recipientName', 'recipientPhone', 'docContent'].forEach(function (id) {
  document.getElementById(id).addEventListener('input', checkRequired);
});

/* ── 확대/축소 버튼 ── */
document.getElementById('btnPlus').addEventListener('click', function () {
  if (docScale < MAX_SCALE) { docScale = Math.round((docScale + SCALE_STEP) * 10) / 10; applyScale(); }
});
document.getElementById('btnMinus').addEventListener('click', function () {
  if (docScale > MIN_SCALE) { docScale = Math.round((docScale - SCALE_STEP) * 10) / 10; applyScale(); }
});

/* ── 수정완료 버튼 ── */
document.getElementById('btnSave').addEventListener('click', function () {
  var docContent = document.getElementById('docContent');
  sessionStorage.setItem('sendit_preview_content', docContent.value);

  /* 발신인 정보 저장 */
  ['senderName', 'senderPhone', 'senderAddr', 'senderAddrDetail'].forEach(function (id) {
    sessionStorage.setItem('sendit_preview_' + id, document.getElementById(id).value);
  });

  /* 수신인 정보 저장 */
  sessionStorage.setItem('receiver_name',  document.getElementById('recipientName').value.trim());
  sessionStorage.setItem('receiver_phone', document.getElementById('recipientPhone').value.trim());
  if (sendMethod === 'certified') {
    sessionStorage.setItem('receiver_birth', document.getElementById('recipientBirth').value.trim());
  } else {
    sessionStorage.removeItem('receiver_birth');
  }

  /* view-mode 전환 */
  document.querySelector('.doc-paper').classList.add('view-mode');
  document.querySelectorAll('.doc-input').forEach(function (el) { el.readOnly = true; });
  docContent.readOnly = true;

  /* 주소 미입력 시 주소 행 숨기기 */
  if (!document.getElementById('senderAddr').value.trim()) {
    document.getElementById('senderAddrRow').style.display = 'none';
  }

  savedOnce = true;
  document.getElementById('btnSave').disabled = true;
  document.getElementById('btnSend').disabled = false;
});

/* ── PDF 다운로드 버튼 ── */
document.getElementById('btnPdf').addEventListener('click', function () {
  window.print();
});

/* ── 이전 버튼: 발송 방식 선택으로 ── */
document.getElementById('btnPrev').addEventListener('click', function () {
  window.location.href = 'wizard/send-method.html';
});

/* ── 발송 버튼: 결제 페이지로 바로 이동 ── */
document.getElementById('btnSend').addEventListener('click', function () {
  window.location.href = 'wizard/payment.html';
});

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
