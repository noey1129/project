/* ================================================================
   LAWSIGN – WIZARD PAYMENT JS
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
  var methodLabel   = isCertified ? '전자문서 + 공전소' : '알림톡 + 공전소';

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
    '감사추적증명서 발급',
    '전자문서증명서 (유효기간 6개월)',
    '유통증명서 (유효기간 3개월)',
    '우체국 내용증명과 동일 법적 효력',
  ];
  var simpleItems = [
    '감사추적증명서 발급',
    '전자문서증명서 (유효기간 6개월)',
    '카카오 알림톡으로 즉시 발송',
  ];
  var items = isCertified ? certifiedItems : simpleItems;

  var methodLabel = isCertified ? '전자문서 + 공전소' : '알림톡 + 공전소';
  document.getElementById('completeDesc').textContent =
    typeLabel + ' 내용증명 (' + methodLabel + ') 이 접수되었습니다.';

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

  /* 완료 버튼: 로그인 유저는 문서 상세, 비로그인은 홈 */
  var homeBtn = document.getElementById('completeHomeBtn');
  if (homeBtn) {
    if (sessionStorage.getItem('logged_in') === 'true') {
      /* 가장 최근 발송 문서(id=1)로 이동 */
      homeBtn.href = '../doc-detail.html?id=1';
      homeBtn.textContent = '발송 내역 확인하기';
    } else {
      homeBtn.href = '../index.html';
      homeBtn.textContent = '홈으로 돌아가기';
    }
  }

  /* 하단 바 숨기기 */
  var payBottomBar = document.getElementById('payBottomBar');
  if (payBottomBar) payBottomBar.style.display = 'none';
});

/* ── 이전 버튼 ── */
document.getElementById('btnPrev').addEventListener('click', function () {
  var type = sessionStorage.getItem('wizard_type');
  window.location.href = type === 'rent' ? 'lease/preview.html' : 'preview.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
