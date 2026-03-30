/* ================================================================
   LAWSIGN – DOC DETAIL JS
   보낸 문서 상세 페이지 로직
   ================================================================ */

var DUMMY_DOCS = [
  {
    id: 1,
    title: '부동산 매매 계약 해체 통보',
    sendDate: '2025. 12. 01 (월) 14:30',
    sendMethod: '카카오 전자문서',
    status: 'sent',
    statusLabel: '발송완료',
    readDate: '-',
    recipient: { name: '김영수', phone: '010-1234-5678', birth: '1990. 01. 01', address: '-' },
    pageCount: 3
  },
  {
    id: 2,
    title: '임대차 보증금 반환 청구',
    sendDate: '2025. 11. 20 (목) 10:15',
    sendMethod: '카카오 전자문서',
    status: 'read',
    statusLabel: '열람완료',
    readDate: '2025. 11. 21 (금) 09:00',
    recipient: { name: '박철수', phone: '010-9876-5432', birth: '1985. 05. 15', address: '서울특별시 강남구' },
    pageCount: 3
  },
  {
    id: 3,
    title: '층간소음 시정 요구',
    sendDate: '2025. 11. 10 (월) 11:00',
    sendMethod: '카카오 전자문서',
    status: 'read',
    statusLabel: '열람완료',
    readDate: '2025. 11. 11 (화) 10:30',
    recipient: { name: '이영희', phone: '010-5555-6666', birth: '1992. 03. 20', address: '경기도 수원시' },
    pageCount: 2
  }
];

var currentDocId = 1;
var currentPage  = 1;
var totalPages   = 3;
var currentZoom  = 100;

/* ── 증명서 설정 ── */
var CERT_CONFIG = {
  audit: {
    name: '감사추적증명서',
    free: true,
    expiryMonths: null,
    modalDesc: '감사추적 정보를 확인할 수 있는 증명서입니다.',
    cost: '무료',
    modalExpiry: '만료 없음'
  },
  dist: {
    name: '유통증명서',
    free: false,
    expiryMonths: 6,
    modalDesc: '전자문서가 정상적으로 유통(전달)되었음을 증명합니다.',
    cost: '3,300원',
    modalExpiry: '발급일로부터 6개월'
  },
  edoc: {
    name: '전자문서증명서',
    free: false,
    expiryMonths: 6,
    modalDesc: '전자문서의 원본 무결성을 증명합니다.',
    cost: '3,300원',
    modalExpiry: '발급일로부터 6개월'
  }
};

/* 초기 상태 (이미지 기준: 다양한 상태 시연) */
var certStates = {
  audit: { status: 'none',    expiryDate: null },
  dist:  { status: 'expired', expiryDate: '2026. 05. 28' },
  edoc:  { status: 'issued',  expiryDate: '2026. 08. 28' }
};

var pendingCertId = null;

/* ── 문서 ID 읽기 (URL 파라미터 우선) ── */
(function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  if (id) {
    currentDocId = parseInt(id, 10);
  } else {
    var ssId = sessionStorage.getItem('selected_doc_id');
    if (ssId) currentDocId = parseInt(ssId, 10);
  }
})();

function getDoc() {
  return DUMMY_DOCS.find(function (d) { return d.id === currentDocId; }) || DUMMY_DOCS[0];
}

/* ── 페이지 콘텐츠 ── */
var PAGE_CONTENTS = [
  /* 1페이지 */
  function (doc) {
    return '<div style="text-align:center; margin-bottom:36px;">' +
      '<div style="font-size:20px; font-weight:800; letter-spacing:5px; margin-bottom:8px;">내 용 증 명</div>' +
      '<div style="font-size:11px; color:#888;">로싸인 전자내용증명 서비스</div>' +
    '</div>' +
    '<table style="width:100%; border-collapse:collapse; margin-bottom:28px; font-size:12px;">' +
      '<tr>' +
        '<td style="width:74px; padding:7px 10px; border:1px solid #ccc; background:#f8f8f8; font-weight:700;">발&nbsp;&nbsp;신&nbsp;&nbsp;인</td>' +
        '<td style="padding:7px 10px; border:1px solid #ccc;">홍길동 &nbsp;|&nbsp; 서울특별시 마포구</td>' +
      '</tr>' +
      '<tr>' +
        '<td style="padding:7px 10px; border:1px solid #ccc; background:#f8f8f8; font-weight:700;">수&nbsp;&nbsp;신&nbsp;&nbsp;인</td>' +
        '<td style="padding:7px 10px; border:1px solid #ccc;">' + doc.recipient.name + ' &nbsp;|&nbsp; ' + (doc.recipient.address !== '-' ? doc.recipient.address : '주소 미등록') + '</td>' +
      '</tr>' +
    '</table>' +
    '<div style="font-size:15px; font-weight:800; margin-bottom:20px; text-align:center; letter-spacing:1px;">' + doc.title + '</div>' +
    '<p style="text-indent:2em; margin-bottom:14px;">귀하와의 계약과 관련하여 아래와 같이 통보하오니 이에 따른 조치를 취하여 주시기 바랍니다.</p>' +
    '<p style="text-indent:2em; margin-bottom:14px;">발신인은 귀하와 체결한 계약에 따라 의무를 성실히 이행하였으나, 귀하께서 계약상 의무를 이행하지 않아 본 내용증명을 발송하게 되었습니다.</p>' +
    '<p style="text-indent:2em; margin-bottom:14px;">본 내용증명은 향후 법적 분쟁 시 증거 자료로 활용될 수 있음을 알려드립니다.</p>';
  },

  /* 2페이지 */
  function (_doc) {
    return '<p style="font-weight:700; font-size:14px; margin-bottom:16px;">1. 사실 관계</p>' +
    '<p style="text-indent:2em; margin-bottom:12px;">발신인은 20XX년 X월 X일 귀하와 계약을 체결하였으며, 해당 계약에 따라 제반 의무를 정해진 기한 내에 이행하였습니다.</p>' +
    '<p style="text-indent:2em; margin-bottom:12px;">그러나 귀하께서는 계약서 제3조에서 정한 의무를 불이행함으로써 발신인에게 재산적·정신적 손해를 끼치고 있습니다.</p>' +
    '<p style="text-indent:2em; margin-bottom:24px;">이에 발신인은 귀하에게 계약 이행 및 손해 배상을 요청하기 위해 본 내용증명을 발송합니다.</p>' +
    '<p style="font-weight:700; font-size:14px; margin-bottom:16px;">2. 요구 사항</p>' +
    '<p style="text-indent:2em; margin-bottom:12px;">발신인은 귀하에게 본 내용증명 도달일로부터 7일 이내에 아래 사항을 이행하여 주실 것을 강력히 요구합니다.</p>' +
    '<p style="text-indent:3em; margin-bottom:10px;">① 계약서 제3조에 따른 의무의 완전한 이행</p>' +
    '<p style="text-indent:3em; margin-bottom:10px;">② 불이행으로 인하여 발생한 손해 배상금의 지급</p>' +
    '<p style="text-indent:3em; margin-bottom:10px;">③ 이에 부수하는 기타 의무의 이행</p>';
  },

  /* 3페이지 */
  function (doc) {
    return '<p style="font-weight:700; font-size:14px; margin-bottom:16px;">3. 미이행 시 조치</p>' +
    '<p style="text-indent:2em; margin-bottom:12px;">상기 기한 내에 요구 사항이 이행되지 않을 경우, 발신인은 민사상 손해배상 청구 및 형사 고소를 포함한 모든 법적 조치를 취할 것임을 명확히 알려드립니다.</p>' +
    '<p style="text-indent:2em; margin-bottom:32px;">아울러 이와 관련하여 발생하는 일체의 비용은 귀하가 부담하게 될 것입니다.</p>' +
    '<div style="margin-top:48px; text-align:right; margin-bottom:40px;">' +
      '<div style="margin-bottom:6px;">' + doc.sendDate.split('(')[0].trim() + '</div>' +
      '<div style="font-weight:700; font-size:14px;">발신인 : 홍길동 &nbsp;(인)</div>' +
    '</div>' +
    '<div style="padding:16px; background:#f9f9f9; border-radius:4px; font-size:11px; color:#888; border:1px solid #eee; line-height:1.8;">' +
      '<div style="font-weight:700; margin-bottom:6px; color:#555;">전자내용증명 서비스 안내</div>' +
      '<div>본 문서는 로싸인 전자내용증명 서비스를 통해 공인전자문서센터에 보관됩니다.</div>' +
      '<div>발송일시 : ' + doc.sendDate + '</div>' +
    '</div>';
  }
];

/* ── 페이지 렌더 ── */
function renderPage() {
  var doc = getDoc();
  var pageEl = document.getElementById('viewerPage');
  if (!pageEl) return;

  var idx = Math.min(currentPage - 1, PAGE_CONTENTS.length - 1);
  pageEl.innerHTML = PAGE_CONTENTS[idx](doc);

  /* 페이지 번호 */
  document.getElementById('curPage').textContent = currentPage;

  /* 썸네일 active 토글 */
  document.querySelectorAll('.thumb-item').forEach(function (item, i) {
    var pre = item.querySelector('.thumb-preview');
    var num = item.querySelector('.thumb-num');
    if (i === currentPage - 1) {
      pre.classList.add('active');
      num.classList.add('active');
    } else {
      pre.classList.remove('active');
      num.classList.remove('active');
    }
  });

  /* 이전/다음 버튼 비활성 */
  document.getElementById('prevPage').disabled = currentPage <= 1;
  document.getElementById('nextPage').disabled = currentPage >= totalPages;
}

/* ── 썸네일 빌드 ── */
function buildThumbs() {
  var list = document.getElementById('thumbList');
  if (!list) return;
  list.innerHTML = '';

  var doc = getDoc();
  /* 썸네일 80px, 뷰어 페이지 640px → scale = 80/640 = 0.125 */
  var SCALE = 0.125;
  var PAGE_W = 640;
  var PAGE_H = 820;

  for (var i = 1; i <= totalPages; i++) {
    var idx = Math.min(i - 1, PAGE_CONTENTS.length - 1);
    var pageHTML = PAGE_CONTENTS[idx](doc);

    var item = document.createElement('div');
    item.className = 'thumb-item';
    item.dataset.page = i;
    item.innerHTML =
      '<div class="thumb-preview' + (i === 1 ? ' active' : '') + '">' +
        '<div class="thumb-mini-doc" style="' +
          'width:' + PAGE_W + 'px;' +
          'height:' + PAGE_H + 'px;' +
          'transform:scale(' + SCALE + ');' +
          'transform-origin:top left;' +
          'position:absolute; top:0; left:0;' +
          'padding:50px 54px;' +
          'font-family:\'Nanum Myeongjo\',serif;' +
          'font-size:13px; line-height:2; color:#1C1E21;' +
          'background:#fff; pointer-events:none;' +
        '">' + pageHTML + '</div>' +
      '</div>' +
      '<div class="thumb-num' + (i === 1 ? ' active' : '') + '">' + i + '</div>';
    list.appendChild(item);
  }

  list.addEventListener('click', function (e) {
    var item = e.target.closest('.thumb-item');
    if (!item) return;
    currentPage = parseInt(item.dataset.page, 10);
    renderPage();
  });
}

/* ── 날짜 포맷 ── */
function formatExpiryDate(date) {
  var y = date.getFullYear();
  var m = String(date.getMonth() + 1).padStart(2, '0');
  var d = String(date.getDate()).padStart(2, '0');
  return y + '. ' + m + '. ' + d;
}

/* ── 증명서 행 HTML ── */
function buildCertRow(certId) {
  var cfg   = CERT_CONFIG[certId];
  var state = certStates[certId];
  var subHTML = '';
  var btnHTML = '';

  if (state.status === 'none') {
    subHTML = '<div class="cert-expiry">' + (cfg.expiryMonths ? '유효기간 있음' : '만료 없음') + '</div>';
    btnHTML = '<button class="btn-cert-action btn-cert-apply" data-cert="' + certId + '">무료 발급 신청</button>';

  } else if (state.status === 'issuing') {
    subHTML = '<div class="cert-expiry">' + (cfg.expiryMonths ? '유효기간 있음' : '만료 없음') + '</div>';
    btnHTML = '<button class="btn-cert-action btn-cert-issuing" disabled>' +
                '<span class="cert-spinner"></span>발급중...' +
              '</button>';

  } else if (state.status === 'issued') {
    var expSub = cfg.expiryMonths
      ? '유효기간 : ' + state.expiryDate + '까지 (' + cfg.expiryMonths + '개월)'
      : '만료 없음';
    subHTML = '<div class="cert-expiry">' + expSub + '</div>';
    btnHTML = '<button class="btn-cert-action btn-cert-download" data-cert="' + certId + '">다운로드</button>';

  } else if (state.status === 'expired') {
    subHTML = '<div class="cert-expiry cert-expiry--expired">유효기간 만료 (' + state.expiryDate + ')</div>';
    btnHTML = '<button class="btn-cert-action btn-cert-reapply" data-cert="' + certId + '">재발급 신청</button>';
  }

  return '<div class="cert-row">' +
    '<div><div class="cert-name">' + cfg.name + '</div>' + subHTML + '</div>' +
    btnHTML +
  '</div>';
}

/* ── 증명서 카드 갱신 ── */
function updateCertCard() {
  var card = document.getElementById('certCard');
  if (!card) return;
  card.innerHTML =
    '<div class="info-card-title">증명서</div>' +
    buildCertRow('audit') +
    buildCertRow('dist') +
    buildCertRow('edoc');
}

/* ── 발급 시작 ── */
function startIssuing(certId) {
  certStates[certId].status = 'issuing';
  updateCertCard();
  var delay = CERT_CONFIG[certId].free ? 1200 : 2500;
  setTimeout(function () {
    var cfg = CERT_CONFIG[certId];
    if (cfg.expiryMonths) {
      var exp = new Date();
      exp.setMonth(exp.getMonth() + cfg.expiryMonths);
      certStates[certId].expiryDate = formatExpiryDate(exp);
    }
    certStates[certId].status = 'issued';
    updateCertCard();
  }, delay);
}

/* ── 모달 생성 ── */
function createCertModal() {
  var overlay = document.createElement('div');
  overlay.id = 'certModalOverlay';
  overlay.className = 'cert-modal-overlay';
  overlay.style.display = 'none';
  overlay.innerHTML =
    '<div class="cert-modal" role="dialog">' +
      '<div class="cert-modal-header">' +
        '<span class="cert-modal-title" id="certModalTitle"></span>' +
        '<button class="cert-modal-close" id="certModalClose" aria-label="닫기">' +
          '<svg width="18" height="18" viewBox="0 0 18 18" fill="none">' +
            '<path d="M3 3l12 12M15 3L3 15" stroke="#696B6D" stroke-width="1.6" stroke-linecap="round"/>' +
          '</svg>' +
        '</button>' +
      '</div>' +
      '<p class="cert-modal-desc" id="certModalDesc"></p>' +
      '<div class="cert-modal-info">' +
        '<div class="cert-modal-info-row">' +
          '<span class="cert-modal-info-label">비용</span>' +
          '<strong class="cert-modal-info-cost" id="certModalCost"></strong>' +
        '</div>' +
        '<div class="cert-modal-info-row">' +
          '<span class="cert-modal-info-label">유효기간</span>' +
          '<span class="cert-modal-info-value" id="certModalExpiry"></span>' +
        '</div>' +
      '</div>' +
      '<div class="cert-modal-notes">' +
        '<p class="cert-modal-note">• 유효기간 만료 후에는 재발급이 필요합니다.</p>' +
        '<p class="cert-modal-note">• 발급���지 최대 30분이 소요될 수 있습니다.</p>' +
      '</div>' +
      '<div class="cert-modal-footer">' +
        '<button class="cert-modal-btn cert-modal-btn--cancel" id="certModalCancel">취소</button>' +
        '<button class="cert-modal-btn cert-modal-btn--confirm" id="certModalConfirm">결제하기</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) hideCertModal();
  });
  document.getElementById('certModalClose').addEventListener('click', hideCertModal);
  document.getElementById('certModalCancel').addEventListener('click', hideCertModal);
  document.getElementById('certModalConfirm').addEventListener('click', function () {
    hideCertModal();
    if (pendingCertId) startIssuing(pendingCertId);
  });
}

function showCertModal(certId) {
  pendingCertId = certId;
  var cfg = CERT_CONFIG[certId];
  document.getElementById('certModalTitle').textContent = cfg.name + ' 발급 신청';
  document.getElementById('certModalDesc').textContent  = cfg.modalDesc;
  document.getElementById('certModalCost').textContent  = cfg.cost;
  document.getElementById('certModalExpiry').textContent = cfg.modalExpiry;
  document.getElementById('certModalOverlay').style.display = 'flex';
}

function hideCertModal() {
  document.getElementById('certModalOverlay').style.display = 'none';
  pendingCertId = null;
}

/* ── 정보 패널 렌더 ── */
function renderInfo() {
  var container = document.getElementById('detailInfo');
  if (!container) return;
  var doc = getDoc();

  var statusBadge = '<span class="status-badge status-badge--' + doc.status + '">' + doc.statusLabel + '</span>';

  container.innerHTML =
    /* 발송 정보 */
    '<div class="info-card">' +
      '<div class="info-card-title">발송 정보</div>' +
      '<div class="info-row"><span class="info-label">발송일</span><span class="info-value">' + doc.sendDate + '</span></div>' +
      '<div class="info-row"><span class="info-label">발송방식</span><span class="info-value">' + doc.sendMethod + '</span></div>' +
      '<div class="info-row"><span class="info-label">상태</span>' + statusBadge + '</div>' +
      '<div class="info-row"><span class="info-label">열람일</span><span class="info-value">' + doc.readDate + '</span></div>' +
    '</div>' +

    /* 수신인 정보 */
    '<div class="info-card">' +
      '<div class="info-card-title">수신인 정보</div>' +
      '<div class="info-row"><span class="info-label">이름</span><span class="info-value">' + doc.recipient.name + '</span></div>' +
      '<div class="info-row"><span class="info-label">전화번호</span><span class="info-value">' + doc.recipient.phone + '</span></div>' +
      '<div class="info-row"><span class="info-label">생년월일</span><span class="info-value">' + doc.recipient.birth + '</span></div>' +
      '<div class="info-row"><span class="info-label">주소</span><span class="info-value">' + (doc.recipient.address || '-') + '</span></div>' +
    '</div>' +

    /* 증명서 */
    '<div class="info-card" id="certCard">' +
      '<div class="info-card-title">증명서</div>' +
      buildCertRow('audit') +
      buildCertRow('dist') +
      buildCertRow('edoc') +
    '</div>' +

    /* 증명서 안내 */
    '<div class="cert-notice">' +
      '<div class="cert-notice-title">' +
        '<svg width="18" height="18" viewBox="0 0 18 18" fill="none">' +
          '<circle cx="9" cy="9" r="7.5" stroke="#BE5F29" stroke-width="1.3"/>' +
          '<path d="M9 8v5M9 5.5v.8" stroke="#BE5F29" stroke-width="1.6" stroke-linecap="round"/>' +
        '</svg>' +
        '증명서 안내' +
      '</div>' +
      '<p class="cert-notice-text">감사추적증명서는 언제든 무료 재발급이 가능합니다.</p>' +
      '<p class="cert-notice-text">유통증명서와 전자문서증명서는 1회에 한해 무료(발송비 포함)입니다.</p>' +
      '<p class="cert-notice-text">유효기간이 있으므로 필요한 시점에 신청하시는 것을 권장합니다.</p>' +
    '</div>';
}

/* ── 초기화 ── */
document.addEventListener('DOMContentLoaded', function () {
  var doc = getDoc();
  totalPages  = doc.pageCount || 3;
  currentPage = 1;

  /* 제목 */
  var titleEl = document.getElementById('detailTitle');
  if (titleEl) titleEl.textContent = doc.title;

  document.getElementById('totalPage').textContent = totalPages;

  buildThumbs();
  renderPage();
  renderInfo();
  createCertModal();

  /* 증명서 버튼 이벤트 위임 */
  document.getElementById('detailInfo').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cert]');
    if (!btn || btn.disabled) return;
    var certId = btn.dataset.cert;
    var cfg = CERT_CONFIG[certId];

    if (btn.classList.contains('btn-cert-apply') || btn.classList.contains('btn-cert-reapply')) {
      if (cfg.free) {
        startIssuing(certId);
      } else {
        showCertModal(certId);
      }
    } else if (btn.classList.contains('btn-cert-download')) {
      alert('다운로드를 시작합니다.');
    }
  });

  /* 뒤로가기 */
  document.getElementById('backBtn').addEventListener('click', function () {
    window.location.href = 'mypage.html';
  });

  /* 재발송 */
  document.getElementById('resendBtn').addEventListener('click', function () {
    window.location.href = 'select-situation.html';
  });

  /* 페이지 네비게이션 */
  document.getElementById('prevPage').addEventListener('click', function () {
    if (currentPage > 1) { currentPage--; renderPage(); }
  });
  document.getElementById('nextPage').addEventListener('click', function () {
    if (currentPage < totalPages) { currentPage++; renderPage(); }
  });

  /* 줌 공통 함수 */
  var ZOOM_STEPS = [50, 75, 100, 125, 150, 200];

  function applyZoom(zoom) {
    currentZoom = Math.min(Math.max(zoom, ZOOM_STEPS[0]), ZOOM_STEPS[ZOOM_STEPS.length - 1]);
    var wrap = document.getElementById('viewerPageWrap');
    if (wrap) wrap.style.transform = 'scale(' + currentZoom / 100 + ')';

    /* select 동기화 */
    var sel = document.getElementById('zoomSelect');
    if (sel) {
      var matched = false;
      for (var i = 0; i < sel.options.length; i++) {
        if (parseInt(sel.options[i].value, 10) === currentZoom) {
          sel.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched) sel.value = '';
    }

    /* 버튼 비활성 */
    var btnPlus  = document.querySelector('[title="확대"]');
    var btnMinus = document.querySelector('[title="축소"]');
    if (btnPlus)  btnPlus.disabled  = currentZoom >= ZOOM_STEPS[ZOOM_STEPS.length - 1];
    if (btnMinus) btnMinus.disabled = currentZoom <= ZOOM_STEPS[0];
  }

  /* select 변경 */
  document.getElementById('zoomSelect').addEventListener('change', function () {
    applyZoom(parseInt(this.value, 10));
  });

  /* 확대 버튼 */
  document.querySelector('[title="확대"]').addEventListener('click', function () {
    var next = ZOOM_STEPS.find(function (s) { return s > currentZoom; });
    if (next) applyZoom(next);
  });

  /* 축소 버튼 */
  document.querySelector('[title="축소"]').addEventListener('click', function () {
    var prev = ZOOM_STEPS.slice().reverse().find(function (s) { return s < currentZoom; });
    if (prev) applyZoom(prev);
  });

  /* PDF 다운로드 (placeholder) */
  document.getElementById('pdfBtn').addEventListener('click', function () {
    alert('PDF 다운로드 기능은 준비 중입니다.');
  });
});
