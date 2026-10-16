document.addEventListener('DOMContentLoaded', () => {

  /* ハンバーガーメニュー */
  const hamburger = document.getElementById('hamburger');
  const gnav = document.getElementById('gnav');

  if (hamburger && gnav) {
    /* メニュー開閉（開いている間は背面のスクロールを止める） */
    const setMenu = (open) => {
      hamburger.classList.toggle('is-active', open);
      gnav.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('is-menu-open', open);
    };

    hamburger.addEventListener('click', () => {
      setMenu(!gnav.classList.contains('is-open'));
    });

    gnav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    /* PC幅に広げたときにロックが残らないようにする */
    window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* ヘッダー背景（スクロール時） */
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      header.style.background = window.scrollY > 20
        ? 'rgba(10, 10, 11, 0.92)'
        : 'rgba(10, 10, 11, 0.72)';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* FAQ アコーディオン */
  document.querySelectorAll('.faq__item').forEach((item) => {
    const q = item.querySelector('.faq__q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq__item.is-open').forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove('is-open');
      });
      item.classList.toggle('is-open', !isOpen);
    });
  });

  /* スクロールリビール */
  const revealTargets = document.querySelectorAll(
    '.feature__card, .car-card, .flow__item, .price__table-wrap, .price__options, .access__wrap, .faq__list'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* 車両紹介画像：表示されるたびにフリッカー再生 */
  const carImages = document.querySelectorAll('.car-card__img');

  if ('IntersectionObserver' in window) {
    const flickerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-flickering', entry.isIntersecting);
      });
    }, { threshold: 0.15 });

    carImages.forEach((el) => flickerObserver.observe(el));
  } else {
    carImages.forEach((el) => el.classList.add('is-flickering'));
  }

});
