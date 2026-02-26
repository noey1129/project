/* ================================================================
   SENDIT – WIZARD PAYMENT JS
   ================================================================ */

var method     = sessionStorage.getItem('send_method') || 'simple';
var isCertified = method === 'certified';
var price       = isCertified ? 19800 : 9900;
var priceStr    = price.toLocaleString('ko-KR') + '원';

var typeMap = {
  rent:       '임대차',
  loan:       '대여금',
  contract:   '계약관련',
  noise:      '층간소음',
  membership: '회원권환불',
  custom:     '직접작성',
};
var wizardType = sessionStorage.getItem('wizard_type') || 'custom';
var typeLabel  = typeMap[wizardType] || wizardType;

/* ── 요약 카드 채우기 ── */
(function buildSummary() {
  var receiverPhone = sessionStorage.getItem('receiver_phone') || '-';
  var receiverName  = sessionStorage.getItem('receiver_name')  || '수신인';
  var methodLabel   = isCertified ? '본인인증 발송' : '일반 발송';

  var rows = [
    { label: '문서 유형',    value: typeLabel + ' 내용증명' },
    { label: '발송 방식',    value: methodLabel },
    { label: '수신인',       value: receiverName },
    { label: '수신인 연락처', value: receiverPhone },
  ];

  var card = document.getElementById('summaryCard');
  var html = rows.map(function (row) {
    return '<div class="summary-row">' +
      '<span class="summary-row__label">' + row.label + '</span>' +
      '<span class="summary-row__value">'  + row.value + '</span>' +
      '</div>';
  }).join('');
  html += '<div class="summary-total">' +
    '<span class="summary-total__label">결제 금액</span>' +
    '<span class="summary-total__price">' + priceStr + '</span>' +
    '</div>';

  card.innerHTML = html;
  document.getElementById('btnPay').textContent = '카드결제 · ' + priceStr;
})();

/* ── 완료 화면 구성 ── */
function buildCompleteScreen() {
  var certifiedItems = [
    '등기 우편 발송',
    '전자문서 인증 완료',
    '발송 확인증 이메일 발송',
    '보관 기간 5년',
  ];
  var simpleItems = [
    '등기 우편 발송',
    '발송 확인증 이메일 발송',
    '보관 기간 1년',
  ];
  var items = isCertified ? certifiedItems : simpleItems;

  document.getElementById('completeDesc').textContent =
    typeLabel + ' 내용증명이 접수되었습니다. 영업일 기준 1~2일 내에 발송됩니다.';

  var list = document.getElementById('completeList');
  list.innerHTML = items.map(function (item) {
    return '<li>' + item + '</li>';
  }).join('');
}

/* ── 결제 버튼 ── */
document.getElementById('btnPay').addEventListener('click', function () {
  buildCompleteScreen();

  document.getElementById('payScreen').style.display      = 'none';
  document.getElementById('completeScreen').style.display = 'flex';
  document.getElementById('completeScreen').classList.add('visible');

  /* 하단 바 숨기기 */
  var bottomBar = document.querySelector('.bottom-bar');
  if (bottomBar) bottomBar.style.display = 'none';
});

/* ── 이전/다음 버튼은 없지만 하단 바는 유지 ── */
var bottomBar = document.querySelector('.bottom-bar');
if (bottomBar) {
  var inner = bottomBar.querySelector('.bottom-bar__inner') || bottomBar;
  var prevBtn = document.createElement('button');
  prevBtn.className = 'btn-prev';
  prevBtn.textContent = '이전';
  prevBtn.addEventListener('click', function () {
    window.location.href = 'receiver-detail.html';
  });
  inner.prepend(prevBtn);
}

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
