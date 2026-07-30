/**
 * 育て愛 Marriage - main.js
 */

(function () {
  'use strict';

  /* ヒーローフェードインはCSSアニメーションで制御 */

  /* =============================================
     Header scroll effect
  ============================================= */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* =============================================
     Mobile hamburger menu
  ============================================= */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });

    document.addEventListener('click', function (e) {
      if (!header.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  /* =============================================
     Scroll animations (IntersectionObserver)
  ============================================= */
  const animateEls = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window && animateEls.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, i * 60);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animateEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animateEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* =============================================
     FAQ Accordion
  ============================================= */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  /* =============================================
     Smooth scroll for anchor links
  ============================================= */
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

  /* =============================================
     Contact form validation (HTML only)
  ============================================= */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const type = document.getElementById('type');
      const privacy = document.getElementById('privacy');
      let valid = true;

      [name, email, type].forEach(function (el) {
        if (!el) return;
        if (!el.value.trim()) {
          el.style.borderColor = '#e53935';
          valid = false;
        } else {
          el.style.borderColor = '';
        }
      });

      if (privacy && !privacy.checked) {
        alert('プライバシーポリシーへの同意が必要です。');
        valid = false;
      }

      if (valid) {
        const successMsg = document.getElementById('form-success');
        if (successMsg) {
          contactForm.style.display = 'none';
          successMsg.style.display = 'block';
        } else {
          alert('送信されました（※HTMLデモのため実際には送信されません）');
        }
      }
    });
  }

})();
