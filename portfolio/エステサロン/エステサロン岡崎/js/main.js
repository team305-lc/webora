/**
 * Esthe Salon Okazaki - main.js (Static Version)
 */

document.addEventListener('DOMContentLoaded', function () {

  // ── ハンバーガーメニュー ──────────────────────────
  const hamburger   = document.getElementById('hamburger');
  const mobileNav   = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-nav-close');
  const overlay     = document.getElementById('mobile-nav-overlay');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      if (mobileNav.classList.contains('is-open')) {
        closeNav();
      } else {
        openNav();
      }
    });
    mobileClose && mobileClose.addEventListener('click', closeNav);
    overlay && overlay.addEventListener('click', closeNav);
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    function openNav() {
      mobileNav.classList.add('is-open');
      hamburger.classList.add('is-active');
      if (overlay) overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeNav() {
      mobileNav.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      if (overlay) overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // ── スクロールフェードイン ──────────────────────────
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.case-card, .menu-card, .staff-card, .blog-card, .concern-card, .stat-item').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // ── 症例フィルター (静的：キーワード検索のみ) ──────────────
  const filterSubmit = document.getElementById('filter-submit');
  const filterReset  = document.getElementById('filter-reset');
  const caseGrid     = document.getElementById('case-grid');

  if (filterSubmit && caseGrid) {
    filterSubmit.addEventListener('click', runStaticFilter);

    if (filterReset) {
      filterReset.addEventListener('click', function () {
        ['filter-category', 'filter-age', 'filter-concern', 'filter-treatment', 'filter-part'].forEach(function (id) {
          const el = document.getElementById(id);
          if (el) el.value = '';
        });
        const kw = document.getElementById('filter-keyword');
        if (kw) kw.value = '';
        runStaticFilter();
      });
    }

    function runStaticFilter() {
      const keyword = (document.getElementById('filter-keyword') || {}).value || '';
      const category = (document.getElementById('filter-category') || {}).value || '';
      const cards = caseGrid.querySelectorAll('.case-card');
      cards.forEach(function (card) {
        const text = card.textContent.toLowerCase();
        const kw = keyword.toLowerCase();
        const cat = category.toLowerCase();
        const kwMatch = !kw || text.includes(kw);
        const catMatch = !cat || text.includes(cat);
        card.style.display = (kwMatch && catMatch) ? '' : 'none';
      });
    }
  }

  // ── スムーススクロール (アンカーリンク) ──────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── ヘッダースクロール影 ──────────────────────────
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 40
        ? '0 4px 20px rgba(0,0,0,0.12)'
        : '0 2px 12px rgba(0,0,0,0.08)';
    }, { passive: true });
  }

  // ── FAQ アコーディオン ──────────────────────────
  document.querySelectorAll('.faq-question').forEach(function (q) {
    q.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isOpen = answer.style.display === 'block';
      document.querySelectorAll('.faq-answer').forEach(function (a) { a.style.display = 'none'; });
      document.querySelectorAll('.faq-question').forEach(function (q2) { q2.setAttribute('aria-expanded', 'false'); });
      if (!isOpen) {
        answer.style.display = 'block';
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

});
