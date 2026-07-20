/* ============================================================
   top.js — トップページ専用スクリプト（パターン３）
   カウンターアニメーション / マーキー複製 / サービスタブ
   ============================================================ */

(function () {
  'use strict';

  /* ── カウンターアニメーション ────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target || el.textContent, 10);
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // カウンター要素が画面内に入ったらアニメ開始
  const counterEls = document.querySelectorAll('[data-counter]');
  if (counterEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(function (el) { io.observe(el); });
  }

  /* ── マーキー：トラックを2倍複製してループ ────────── */
  document.querySelectorAll('.marquee__track').forEach(function (track) {
    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
  });

  /* ── SkillMate プログレスバー アニメーション ──────── */
  const barFills = document.querySelectorAll('.sm-bar__fill');
  if (barFills.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width || '0%';
          entry.target.style.width = width;
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    barFills.forEach(function (el) { io.observe(el); });
  }

  /* ── サービスカードのフォーカスアニメーション ──────── */
  document.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      card.style.willChange = 'background';
    });
    card.addEventListener('mouseleave', function () {
      card.style.willChange = 'auto';
    });
  });

})();
