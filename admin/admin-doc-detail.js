/* ================================================================
   LAWSIGN – ADMIN DOC DETAIL JS
   ================================================================ */

var docId = parseInt(new URLSearchParams(window.location.search).get('id'));
var doc   = ADMIN_DOCS.find(function (d) { return d.id === docId; });
if (!doc) { window.location.href = 'admin-history.html'; }

var currentPage = 1;
var totalPages  = 3;
var currentZoom = 100;

/* ── 문서별 확장 데이터 생성 ── */
var methodLabel = { certified: '카카오 전자문서', simple: '카카오 알림톡' };
var typeDocTitle = {
  '임대차':     '임대차 계약 해지 통보',
  '대여금':     '대여금 반환 청구',
  '계약관련':   '계약 불이행 시정 요구',
  '층간소음':   '층간소음 시정 요구',
  '회원권 환불': '회원권 환불 청구'
};

var docTitle = typeDocTitle[doc.type] || '내용증명';
var timeBase = doc.sendDate.replace(/-/g, '. ');

/* 발송/수신/열람 시간 생성 (id 기반으로 다양하게) */
var h = 8 + (doc.id % 9);
var sendDT    = timeBase + '  ' + String(h).padStart(2, '0') + ':' + String((doc.id * 7) % 60).padStart(2, '0');
var receiveDT = doc.status === 'sent' && doc.id % 3 === 0 ? null
              : timeBase + '  ' + String(h).padStart(2, '0') + ':' + String(((doc.id * 7) % 60) + 5 > 59 ? 5 : ((doc.id * 7) % 60) + 5).padStart(2, '0');
var readDT    = doc.status === 'read'
  ? doc.sendDate.replace(/-/g, '. ') + '  ' + String((h + 1) % 24).padStart(2, '0') + ':' + String((doc.id * 13) % 60).padStart(2, '0')
  : null;

/* 발신인 정보 (더미) */
var senderPhones = ['010-1234-5678','010-9876-5432','010-5555-7777','010-3333-4444','010-2222-9999'];
var senderAddrs  = ['서울시 강남구','서울시 마포구','경기 성남시','서울시 송파구','인천시 남동구'];
var senderPhone = senderPhones[doc.id % senderPhones.length];
var senderAddr  = senderAddrs[doc.id % senderAddrs.length];

/* 수신인 정보 (더미) */
var recipientPhones = ['02-1234-5678','02-9876-0000','031-555-7777','02-3333-1111','032-222-9999'];
var recipientPhone  = recipientPhones[doc.id % recipientPhones.length];

/* ── 페이지 콘텐츠 ── */
var PAGE_CONTENTS = [
  function () {
    return '<div style="text-align:center;margin-bottom:36px;">' +
      '<div style="font-size:20px;font-weight:800;letter-spacing:5px;margin-bottom:8px;">내 용 증 명</div>' +
      '<div style="font-size:11px;color:#888;">Lawsign 전자내용증명 서비스</div>' +
    '</div>' +
    '<table style="width:100%;border-collapse:collapse;margin-bottom:28px;font-size:12px;">' +
      '<tr><td style="width:74px;padding:7px 10px;border:1px solid #ccc;background:#f8f8f8;font-weight:700;">발&nbsp;&nbsp;신&nbsp;&nbsp;인</td>' +
      '<td style="padding:7px 10px;border:1px solid #ccc;">' + doc.sender + ' &nbsp;|&nbsp; ' + senderAddr + '</td></tr>' +
      '<tr><td style="padding:7px 10px;border:1px solid #ccc;background:#f8f8f8;font-weight:700;">수&nbsp;&nbsp;신&nbsp;&nbsp;인</td>' +
      '<td style="padding:7px 10px;border:1px solid #ccc;">' + doc.recipient + '</td></tr>' +
    '</table>' +
    '<div style="font-size:15px;font-weight:800;margin-bottom:20px;text-align:center;letter-spacing:1px;">' + docTitle + '</div>' +
    '<p style="text-indent:2em;margin-bottom:14px;">귀하와의 계약과 관련하여 아래와 같이 통보하오니 이에 따른 조치를 취하여 주시기 바랍니다.</p>' +
    '<p style="text-indent:2em;margin-bottom:14px;">발신인은 귀하와 체결한 계약에 따라 의무를 성실히 이행하였으나, 귀하께서 계약상 의무를 이행하지 않아 본 내용증명을 발송하게 되었습니다.</p>' +
    '<p style="text-indent:2em;margin-bottom:14px;">본 내용증명은 향후 법적 분쟁 시 증거 자료로 활용될 수 있음을 알려드립니다.</p>';
  },
  function () {
    return '<p style="font-weight:700;font-size:14px;margin-bottom:16px;">1. 사실 관계</p>' +
    '<p style="text-indent:2em;margin-bottom:12px;">발신인은 귀하와 체결한 계약에 따라 제반 의무를 정해진 기한 내에 이행하였습니다.</p>' +
    '<p style="text-indent:2em;margin-bottom:12px;">그러나 귀하께서는 계약서에서 정한 의무를 불이행함으로써 발신인에게 재산적·정신적 손해를 끼치고 있습니다.</p>' +
    '<p style="text-indent:2em;margin-bottom:24px;">이에 발신인은 귀하에게 계약 이행 및 손해 배상을 요청하기 위해 본 내용증명을 발송합니다.</p>' +
    '<p style="font-weight:700;font-size:14px;margin-bottom:16px;">2. 요구 사항</p>' +
    '<p style="text-indent:2em;margin-bottom:12px;">본 내용증명 도달일로부터 7일 이내에 아래 사항을 이행하여 주실 것을 강력히 요구합니다.</p>' +
    '<p style="text-indent:3em;margin-bottom:10px;">① 계약서에 따른 의무의 완전한 이행</p>' +
    '<p style="text-indent:3em;margin-bottom:10px;">② 불이행으로 인하여 발생한 손해 배상금의 지급</p>' +
    '<p style="text-indent:3em;margin-bottom:10px;">③ 이에 부수하는 기타 의무의 이행</p>';
  },
  function () {
    return '<p style="font-weight:700;font-size:14px;margin-bottom:16px;">3. 미이행 시 조치</p>' +
    '<p style="text-indent:2em;margin-bottom:12px;">상기 기한 내에 요구 사항이 이행되지 않을 경우, 발신인은 민사상 손해배상 청구 및 형사 고소를 포함한 모든 법적 조치를 취할 것임을 명확히 알려드립니다.</p>' +
    '<p style="text-indent:2em;margin-bottom:32px;">아울러 이와 관련하여 발생하는 일체의 비용은 귀하가 부담하게 될 것입니다.</p>' +
    '<div style="margin-top:48px;text-align:right;margin-bottom:40px;">' +
      '<div style="margin-bottom:6px;">' + doc.sendDate.replace(/-/g, '. ') + '</div>' +
      '<div style="font-weight:700;font-size:14px;">발신인 : ' + doc.sender + ' &nbsp;(인)</div>' +
    '</div>' +
    '<div style="padding:16px;background:#f9f9f9;border-radius:4px;font-size:11px;color:#888;border:1px solid #eee;line-height:1.8;">' +
      '<div style="font-weight:700;margin-bottom:6px;color:#555;">전자내용증명 서비스 안내</div>' +
      '<div>본 문서는 Lawsign 전자내용증명 서비스를 통해 공인전자문서센터에 보관됩니다.</div>' +
      '<div>발송일시 : ' + sendDT + '</div>' +
    '</div>';
  }
];

/* ── 페이지 렌더 ── */
function renderPage() {
  var idx = Math.min(currentPage - 1, PAGE_CONTENTS.length - 1);
  document.getElementById('addPage').innerHTML = PAGE_CONTENTS[idx]();
  document.getElementById('addCurPage').textContent = currentPage;
  document.getElementById('addPrevPage').disabled = currentPage <= 1;
  document.getElementById('addNextPage').disabled = currentPage >= totalPages;

  document.querySelectorAll('.add-thumb-preview, .add-thumb-num').forEach(function (el) {
    var p = parseInt(el.closest('.add-thumb-item').dataset.page);
    el.classList.toggle('active', p === currentPage);
  });
}

/* ── 썸네일 빌드 ── */
function buildThumbs() {
  var list = document.getElementById('addThumbList');
  list.innerHTML = '';
  var SCALE = 0.113, PW = 600, PH = 780;

  for (var i = 1; i <= totalPages; i++) {
    var idx  = Math.min(i - 1, PAGE_CONTENTS.length - 1);
    var html = PAGE_CONTENTS[idx]();
    var item = document.createElement('div');
    item.className       = 'add-thumb-item';
    item.dataset.page    = i;
    item.innerHTML =
      '<div class="add-thumb-preview' + (i === 1 ? ' active' : '') + '">' +
        '<div style="width:' + PW + 'px;height:' + PH + 'px;transform:scale(' + SCALE + ');transform-origin:top left;position:absolute;top:0;left:0;padding:48px 52px;font-family:\'Nanum Myeongjo\',serif;font-size:13px;line-height:2;color:#1C1E21;background:#fff;pointer-events:none;">' + html + '</div>' +
      '</div>' +
      '<div class="add-thumb-num' + (i === 1 ? ' active' : '') + '">' + i + '</div>';
    list.appendChild(item);
  }

  list.addEventListener('click', function (e) {
    var item = e.target.closest('.add-thumb-item');
    if (!item) return;
    currentPage = parseInt(item.dataset.page);
    renderPage();
  });
}

/* ── 정보 패널 렌더 ── */
function renderInfo() {
  var methodStr = methodLabel[doc.sendMethod] || doc.sendMethod;
  var statusHTML = doc.status === 'read'
    ? '<span class="add-status add-status--read">열람됨</span>'
    : '<span class="add-status add-status--sent">발송됨</span>';

  function tlStep(label, time) {
    var done   = !!time;
    var dotCls = done ? 'add-tl-dot--done' : 'add-tl-dot--pending';
    var timeTxt = time || '미확인';
    return '<div class="add-tl-step">' +
      '<div class="add-tl-dot ' + dotCls + '"></div>' +
      '<div class="add-tl-body">' +
        '<span class="add-tl-label">' + label + '</span>' +
        '<span class="add-tl-time' + (!time ? ' add-tl-time--na' : '') + '">' + timeTxt + '</span>' +
      '</div>' +
    '</div>';
  }

  document.getElementById('addInfo').innerHTML =
    /* 발송 정보 */
    '<div class="add-card">' +
      '<div class="add-card-title">발송 정보</div>' +
      '<div class="add-row"><span class="add-label">발송일</span><span class="add-value">' + doc.sendDate.replace(/-/g, '. ') + '</span></div>' +
      '<div class="add-row"><span class="add-label">문서 유형</span><span class="adm-type-badge ' + doc.typeCls + '">' + doc.type + '</span></div>' +
      '<div class="add-row"><span class="add-label">발송 방법</span><span class="add-value">' + methodStr + '</span></div>' +
      '<div class="add-row"><span class="add-label">상태</span>' + statusHTML + '</div>' +
    '</div>' +

    /* 발신인 정보 */
    '<div class="add-card">' +
      '<div class="add-card-title">발신인 정보</div>' +
      '<div class="add-row"><span class="add-label">이름</span><span class="add-value">' + doc.sender + '</span></div>' +
      '<div class="add-row"><span class="add-label">연락처</span><span class="add-value">' + senderPhone + '</span></div>' +
      '<div class="add-row"><span class="add-label">주소</span><span class="add-value">' + senderAddr + '</span></div>' +
    '</div>' +

    /* 수신인 정보 */
    '<div class="add-card">' +
      '<div class="add-card-title">수신인 정보</div>' +
      '<div class="add-row"><span class="add-label">이름</span><span class="add-value">' + doc.recipient + '</span></div>' +
      '<div class="add-row"><span class="add-label">연락처</span><span class="add-value">' + recipientPhone + '</span></div>' +
    '</div>' +

    /* 발송 히스토리 */
    '<div class="add-card">' +
      '<div class="add-card-title">발송 히스토리</div>' +
      '<div class="add-timeline">' +
        tlStep('발송', sendDT) +
        tlStep('수신', receiveDT) +
        tlStep('열람', readDT) +
      '</div>' +
    '</div>';
}

/* ── DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('addTitle').textContent  = docTitle;

  /* 유형+채널 뱃지 */
  document.getElementById('addBadges').innerHTML =
    '<span class="adm-type-badge ' + doc.typeCls + '">' + doc.type + '</span>';

  document.getElementById('addTotalPage').textContent = totalPages;

  buildThumbs();
  renderPage();
  renderInfo();

  /* 히스토리 버튼 */
  document.getElementById('addInfo').addEventListener('click', function (e) {
    if (e.target.closest('#addHistDownload')) { alert('문서 다운로드 기능은 준비 중입니다.'); }
    if (e.target.closest('#addHistReissue'))  { alert('재발급 신청 기능은 준비 중입니다.'); }
  });

  /* 페이지 네비게이션 */
  document.getElementById('addPrevPage').addEventListener('click', function () {
    if (currentPage > 1) { currentPage--; renderPage(); }
  });
  document.getElementById('addNextPage').addEventListener('click', function () {
    if (currentPage < totalPages) { currentPage++; renderPage(); }
  });

  /* 줌 */
  var ZOOM_STEPS = [50, 75, 100, 125, 150];
  function applyZoom(z) {
    currentZoom = Math.min(Math.max(z, 50), 150);
    var wrap = document.getElementById('addPageWrap');
    if (wrap) wrap.style.transform = 'scale(' + currentZoom / 100 + ')';
    var sel = document.getElementById('addZoomSelect');
    if (sel) sel.value = currentZoom;
  }
  document.getElementById('addZoomSelect').addEventListener('change', function () { applyZoom(parseInt(this.value)); });
  document.querySelector('[title="확대"]').addEventListener('click', function () {
    var next = ZOOM_STEPS.find(function (s) { return s > currentZoom; });
    if (next) applyZoom(next);
  });
  document.querySelector('[title="축소"]').addEventListener('click', function () {
    var prev = ZOOM_STEPS.slice().reverse().find(function (s) { return s < currentZoom; });
    if (prev) applyZoom(prev);
  });

  /* PDF */
  document.getElementById('addPdfBtn').addEventListener('click', function () {
    alert('PDF 다운로드 기능은 준비 중입니다.');
  });
});
