/* ================================================================
   LAWSIGN – MAIN JS
   ================================================================ */

/* ── FAQ 토글 ── */
function toggleFaq(btn) {
  const item   = btn.closest('.faq__item');
  const answer = item.querySelector('.faq__a');
  const icon   = btn.querySelector('.faq__icon');
  const isOpen = !answer.hidden;

  if (isOpen) {
    // 닫기
    answer.hidden = true;
    icon.style.transform = 'rotate(0deg)';   /* + */
    item.classList.remove('faq__item--open');
  } else {
    // 열기 (다른 항목은 건드리지 않음 — 동시 다중 오픈 허용)
    answer.hidden = false;
    icon.style.transform = 'rotate(45deg)';  /* × → - 효과 */
    item.classList.add('faq__item--open');
  }
}

/* ── Scroll-reveal 애니메이션 ── */
(function initReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(32px); transition: opacity .6s ease, transform .6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: .1s; }
    .reveal-delay-2 { transition-delay: .2s; }
    .reveal-delay-3 { transition-delay: .3s; }
    .reveal-delay-4 { transition-delay: .4s; }
    .reveal-delay-5 { transition-delay: .5s; }
  `;
  document.head.appendChild(style);

  // 애니메이션 적용 대상 요소 지정
  const targets = [
    { selector: '.hero__text',      delay: '' },
    { selector: '.hero__mockup',    delay: 'reveal-delay-2' },
    { selector: '.section-title',   delay: '' },
    { selector: '.section-desc',    delay: 'reveal-delay-1' },
    { selector: '.sit-card',        delay: '' },  // 개별 처리
    { selector: '.step-card',       delay: '' },
    { selector: '.pricing__banner', delay: '' },
    { selector: '.pricing-card',    delay: '' },
    { selector: '.faq__item',       delay: '' },
    { selector: '.trust__header',   delay: '' },
    { selector: '.trust-card',      delay: '' },
    { selector: '.law-card',        delay: '' },
    { selector: '.cta h2',          delay: '' },
    { selector: '.cta p',           delay: 'reveal-delay-1' },
    { selector: '.cta__btns',       delay: 'reveal-delay-2' },
  ];

  targets.forEach(({ selector, delay }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // 격자형 요소는 순서대로 딜레이
      if (['sit-card','mock-card','law-card','trust-card','pricing-card','faq__item'].some(c => el.classList.contains(c))) {
        const d = Math.min(i * 0.12, 0.5);
        el.style.transitionDelay = d + 's';
      } else if (delay) {
        el.classList.add(delay);
      }
    });
  });

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ── NAV 스크롤 그림자 ── */
(function initNavShadow() {
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,.07)' : 'none';
  }, { passive: true });
})();


/* ── ScrollSpy: 스크롤 위치에 따라 nav 활성 메뉴 변경 ── */
(function initScrollSpy() {
  const sections = [
    { id: 'hero',    link: '[href="#hero"]' },
    { id: 'how',     link: '[href="#how"]' },
    { id: 'pricing', link: '[href="#pricing"]' },
    { id: 'faq',     link: '[href="#faq"]' },
    { id: 'trust',   link: '[href="#trust"]' },
    { id: 'law',     link: '[href="#law"]' },
  ];

  const navLinks = document.querySelectorAll('.nav__link');

  function setActive(href) {
    navLinks.forEach(link => {
      link.classList.toggle('nav__link--active', link.getAttribute('href') === href);
    });
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 80; // nav 높이 오프셋

    let current = '#hero';
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) {
        current = `#${id}`;
      }
    });

    setActive(current);
  }, { passive: true });
})();/* ── 모의 화면 카드 hover 효과 ── */
(function initMockCards() {
  document.querySelectorAll('.mock-card').forEach(card => {
    card.style.transition = 'transform .2s, box-shadow .2s';
    card.addEventListener('mouseenter', () => {
      card.style.transform  = 'translateY(-2px)';
      card.style.boxShadow  = '0 4px 14px rgba(0,0,0,.09)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.boxShadow  = '';
    });
  });
})();


/* ── Sit-card & Trust-card hover ── */
(function initCardHover() {
  ['.sit-card', '.trust-card', '.pricing-card'].forEach(sel => {
    document.querySelectorAll(sel).forEach(card => {
      card.style.transition = 'transform .25s, box-shadow .25s';
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 8px 28px rgba(0,0,0,.1)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  });
})();