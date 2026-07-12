/* ヤスペン リフォーム — main.js */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── サイドバー開閉 ─────────────────────── */
  const sidebar   = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  const overlay   = document.querySelector('.sb-overlay');

  const closeSidebar = () => {
    sidebar?.classList.remove('open');
    hamburger?.classList.remove('open');
    overlay?.classList.remove('show');
    document.body.style.overflow = '';
  };
  const openSidebar = () => {
    sidebar?.classList.add('open');
    hamburger?.classList.add('open');
    overlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  hamburger?.addEventListener('click', () => {
    sidebar?.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  overlay?.addEventListener('click', closeSidebar);
  sidebar?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeSidebar));

  /* ── アクティブリンク ───────────────────── */
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sb-nav a').forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop();
    if (href === current) a.classList.add('active');
  });

  /* ── Marquee duplicate ─────────────────── */
  document.querySelectorAll('.marquee-track').forEach(t => { t.innerHTML += t.innerHTML; });

  /* ── Reveal on scroll ──────────────────── */
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  /* ── Scroll-to-top ─────────────────────── */
  const toTop = document.querySelector('.to-top');
  if (toTop) {
    window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 400), { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── LP sticky bar ─────────────────────── */
  const bar = document.querySelector('.sticky-bar');
  if (bar) {
    window.addEventListener('scroll', () => bar.classList.toggle('show', window.scrollY > 600), { passive: true });
  }

  /* ── フォーム送信 ──────────────────────── */
  document.querySelectorAll('form[data-contact]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('[required]').forEach(el => {
        const v = el.value.trim();
        el.style.borderColor = v ? '' : '#c0392b';
        if (!v) ok = false;
      });
      if (!ok) return;
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✓ 送信しました。ありがとうございます。';
      btn.disabled = true;
      btn.style.background = '#3E2810';
    });
  });

  /* ── スムーズスクロール ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 16, behavior: 'smooth' });
    });
  });

});
