/* ============================================================
   common.js — パターン３共通スクリプト
   ページオーバーレイ遷移 / ヘッダー / ハンバーガー / スクロールアニメーション / FAQ
   ============================================================ */

(function () {
  'use strict';

  /* ── ページオーバーレイ遷移 ──────────────────────── */
  const overlay = document.querySelector('.page-overlay');

  if (overlay) {
    // ページ読み込み時：パネルは非表示のまま（アニメーションなし）
    overlay.classList.add('is-hide');

    // リンククリック時：
    //   ① パネルを展開してページを覆う（退場アニメーション）
    //   ② 展開しきった後にページ遷移
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (link.target === '_blank') return;

      try {
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin) return;
        if (url.href === location.href) return;
      } catch (_) { return; }

      e.preventDefault();
      const dest = link.href;

      // ① is-enter で即座に幅ゼロへリセット（transition なし）
      overlay.classList.remove('is-hide', 'is-show');
      overlay.classList.add('is-enter');

      // ② is-show で影が伸びる（幅ゼロ → 全形状、ページを覆う）
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          overlay.classList.remove('is-enter');
          overlay.classList.add('is-show');
        });
      });

      // ③ 展開しきった後（700ms）にページ遷移
      setTimeout(function () {
        window.location.href = dest;
      }, 700);
    });
  }

  /* ── ヘッダー スクロール効果 ─────────────────────── */
  const header = document.getElementById('header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          header.classList.toggle('is-scrolled', window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── ハンバーガーメニュー ────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      hamburger.classList.toggle('is-open', !isOpen);
      mobileNav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('is-nav-open', !isOpen);
    });
    // オーバーレイ外クリックで閉じる
    document.addEventListener('click', function (e) {
      if (mobileNav.classList.contains('is-open') &&
          !mobileNav.contains(e.target) &&
          !hamburger.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        document.body.classList.remove('is-nav-open');
      }
    });
  }

  /* ── スクロールアニメーション (IntersectionObserver) ─ */
  const fadeEls = document.querySelectorAll('.js-fade, .js-fade-left, .js-fade-right');
  /* js-section-bg 内の要素はセクション側で管理するため通常 Observer から除外 */
  const sectionBgChildren = new Set(
    document.querySelectorAll('.js-section-bg .js-fade, .js-section-bg .js-fade-left, .js-section-bg .js-fade-right')
  );
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(function (el) {
      if (!sectionBgChildren.has(el)) { io.observe(el); }
    });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── セクション背景スイープ (js-section-bg) ─────────── */
  const sectionBgEls = document.querySelectorAll('.js-section-bg');
  if (sectionBgEls.length) {
    if ('IntersectionObserver' in window) {
      const bgIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const section = entry.target;
            section.classList.add('is-bg-visible');
            /* 背景スイープ(0.75s)が進んだ 550ms 後にコンテンツをフェードイン */
            setTimeout(function () {
              section.querySelectorAll('.js-fade, .js-fade-left, .js-fade-right')
                .forEach(function (el) { el.classList.add('is-visible'); });
            }, 550);
            bgIO.unobserve(section);
          }
        });
      /* rootMargin で画面下端 400px を除外し、セクションが十分見えてから発火 */
      }, { threshold: 0.15, rootMargin: '0px 0px -400px 0px' });
      sectionBgEls.forEach(function (el) { bgIO.observe(el); });
    } else {
      /* IntersectionObserver 非対応: 即座に全表示 */
      sectionBgEls.forEach(function (el) {
        el.classList.add('is-bg-visible');
        el.querySelectorAll('.js-fade, .js-fade-left, .js-fade-right')
          .forEach(function (child) { child.classList.add('is-visible'); });
      });
    }
  }

  /* ── FAQ アコーディオン ──────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('is-open');

      // 同一リスト内の他アイテムを閉じる
      const list = item.closest('.faq-list');
      if (list) {
        list.querySelectorAll('.faq-item.is-open').forEach(function (el) {
          if (el !== item) el.classList.remove('is-open');
        });
      }
      item.classList.toggle('is-open', !isOpen);
    });
  });

  /* ── カリキュラム アコーディオン ─────────────────── */
  document.querySelectorAll('.curriculum-header').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.curriculum-item');
      if (!item) return;
      item.classList.toggle('is-open');
    });
  });

})();
