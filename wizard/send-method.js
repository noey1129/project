/* ================================================================
   SENDIT – WIZARD SEND METHOD JS
   ================================================================ */

const STORE_KEY = 'send_method';

const cardCertified = document.getElementById('cardCertified');
const cardSimple    = document.getElementById('cardSimple');
const btnNext       = document.getElementById('btnNext');
const btnPrev       = document.getElementById('btnPrev');

let selectedValue = null;

function selectCard(value) {
  selectedValue = value;
  cardCertified.classList.toggle('selected', value === 'certified');
  cardSimple.classList.toggle('selected', value === 'simple');
  btnNext.disabled = false;
}

/* ── 복원 ── */
(function restoreState() {
  const saved = sessionStorage.getItem(STORE_KEY);
  if (saved) selectCard(saved);
})();

cardCertified.addEventListener('click', function () { selectCard('certified'); });
cardSimple.addEventListener('click', function () { selectCard('simple'); });

/* ── 이전 버튼: wizard_type 기반으로 마지막 질문 페이지로 이동 ── */
btnPrev.addEventListener('click', function () {
  var type = sessionStorage.getItem('wizard_type');
  var lastPageMap = {
    'rent':       '../lease-q12.html',
    'loan':       '../loan-q5.html',
    'noise':      '../noise-q5.html',
    'contract':   '../contract-q4.html',
    'membership': '../membership-q4.html',
    'custom':     '../custom-q4.html'
  };
  window.location.href = lastPageMap[type] || '../select-situation.html';
});

/* ── 다음 버튼: wizard_type 기반으로 적절한 미리보기 페이지로 이동 ── */
btnNext.addEventListener('click', function () {
  if (!selectedValue) return;
  sessionStorage.setItem(STORE_KEY, selectedValue);
  var type = sessionStorage.getItem('wizard_type');
  if (type === 'rent') {
    window.location.href = '../lease-preview.html';
  } else {
    window.location.href = '../preview.html';
  }
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
