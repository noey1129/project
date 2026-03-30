/* ================================================================
   LAWSIGN – LEASE Q3 JS
   ================================================================ */

const inputAddress       = document.getElementById('inputAddress');
const inputAddressDetail = document.getElementById('inputAddressDetail');
const btnNext            = document.getElementById('btnNext');
const btnPrev            = document.getElementById('btnPrev');

/* ── 페이지 로드 시 이전 입력값 복원 ── */
(function restoreState() {
  const savedAddress = sessionStorage.getItem('sendit_q3_address');
  const savedDetail  = sessionStorage.getItem('sendit_q3_detail');
  if (savedAddress) {
    inputAddress.value = savedAddress;
    btnNext.disabled   = false;
  }
  if (savedDetail) {
    inputAddressDetail.value = savedDetail;
  }
})();

/* ── 주소 필드 클릭 → 카카오 우편번호 팝업 ── */
inputAddress.addEventListener('click', function () {
  new daum.Postcode({
    oncomplete: function (data) {
      inputAddress.value = data.roadAddress || data.jibunAddress;
      btnNext.disabled = false;
      inputAddressDetail.focus();
    }
  }).open();
});

/* ── 이전 버튼 ── */
btnPrev.addEventListener('click', function () {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = 'q2.html';
  }
});

/* ── 다음 버튼 ── */
btnNext.addEventListener('click', function () {
  if (inputAddress.value.trim() === '') return;

  sessionStorage.setItem('sendit_q3_address', inputAddress.value.trim());
  sessionStorage.setItem('sendit_q3_detail',  inputAddressDetail.value.trim());
  window.location.href = 'q4.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
