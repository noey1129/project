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

btnPrev.addEventListener('click', function () {
  // preview.html 또는 lease-preview.html로 돌아가기
  const type = sessionStorage.getItem('wizard_type');
  if (type === 'rent') {
    window.location.href = '../lease-preview.html';
  } else {
    window.location.href = '../preview.html';
  }
});

btnNext.addEventListener('click', function () {
  if (!selectedValue) return;
  sessionStorage.setItem(STORE_KEY, selectedValue);
  window.location.href = 'receiver-detail.html';
});

/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();
