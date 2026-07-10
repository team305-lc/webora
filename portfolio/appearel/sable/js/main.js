/* =========================================
   SABLE — main.js
   ========================================= */

/* --- CUSTOM CURSOR --- */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let followerX = 0, followerY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', e => {
  cursorX = e.clientX; cursorY = e.clientY;
  if (cursor) {
    cursor.style.left = cursorX + 'px';
    cursor.style.top  = cursorY + 'px';
  }
});

function animateFollower() {
  followerX += (cursorX - followerX) * 0.12;
  followerY += (cursorY - followerY) * 0.12;
  if (follower) {
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

/* --- PRELOADER --- */
const preloader = document.getElementById('preloader');
const bar = document.querySelector('.preloader-bar');
const countEl = document.querySelector('.preloader-count');

let progress = 0;
const interval = setInterval(() => {
  progress += Math.random() * 12 + 3;
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);
    setTimeout(() => {
      if (preloader) preloader.classList.add('done');
      document.body.classList.add('loaded');
    }, 300);
  }
  if (bar) bar.style.width = progress + '%';
  if (countEl) countEl.textContent = Math.floor(progress) + '%';
}, 80);

/* --- HEADER SCROLL --- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }
  // scroll to top button
  const st = document.querySelector('.scroll-top');
  if (st) st.classList.toggle('visible', window.scrollY > 400);
  syncFilterTop();
});

/* --- FILTER BAR: stick directly under header --- */
function syncFilterTop() {
  const filterSection = document.querySelector('.filter-section');
  if (header && filterSection) {
    filterSection.style.top = header.offsetHeight + 'px';
  }
}
syncFilterTop();
window.addEventListener('resize', syncFilterTop);

/* --- FULLSCREEN MENU --- */
const menuToggle = document.getElementById('menuToggle');
const fullscreenNav = document.getElementById('fullscreenNav');
const navOverlay = document.getElementById('navOverlay');

function toggleMenu(open) {
  if (!menuToggle || !fullscreenNav) return;
  const isOpen = open !== undefined ? open : !fullscreenNav.classList.contains('open');
  menuToggle.classList.toggle('open', isOpen);
  fullscreenNav.classList.toggle('open', isOpen);
  navOverlay.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

if (menuToggle) menuToggle.addEventListener('click', () => toggleMenu());
if (navOverlay) navOverlay.addEventListener('click', () => toggleMenu(false));

// Close nav on item click
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => toggleMenu(false));
});

/* --- HERO SLIDER --- */
const heroImages = document.querySelectorAll('.hero-image');
const heroLabels = ['Cashmere Long Coat — ¥128,000', 'Velvet Noir Dress — ¥68,000', 'Power Suit Set — ¥95,000'];
const heroCounter = document.getElementById('heroCounterCurrent');
const heroLabel = document.getElementById('heroLabel');
let heroIndex = 0;
let heroTimer;

function goToHero(index) {
  heroImages[heroIndex].classList.remove('active');
  heroIndex = (index + heroImages.length) % heroImages.length;
  heroImages[heroIndex].classList.add('active');
  if (heroCounter) heroCounter.textContent = String(heroIndex + 1).padStart(2, '0');
  if (heroLabel) heroLabel.textContent = heroLabels[heroIndex] || '';
}

function startHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goToHero(heroIndex + 1), 5000);
}

const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
if (heroPrev) heroPrev.addEventListener('click', () => { goToHero(heroIndex - 1); startHeroTimer(); });
if (heroNext) heroNext.addEventListener('click', () => { goToHero(heroIndex + 1); startHeroTimer(); });
startHeroTimer();

/* --- HORIZONTAL RAIL DRAG + AUTO-SCROLL --- */
const rail = document.getElementById('productsRail');
const railWrap = document.querySelector('.products-rail-wrap');
if (railWrap && rail) {
  // Auto-scroll
  let autoScrollPaused = false;
  let resumeTimer = null;
  const autoSpeed = 0.8; // px per frame

  // Clone cards for seamless loop
  const cards = Array.from(rail.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    rail.appendChild(clone);
  });

  function autoScroll() {
    if (!autoScrollPaused) {
      railWrap.scrollLeft += autoSpeed;
      // When we've scrolled past the original set, reset to start seamlessly
      const halfWidth = rail.scrollWidth / 2;
      if (railWrap.scrollLeft >= halfWidth) {
        railWrap.scrollLeft -= halfWidth;
      }
    }
    requestAnimationFrame(autoScroll);
  }
  requestAnimationFrame(autoScroll);

  const pause = () => {
    clearTimeout(resumeTimer);
    autoScrollPaused = true;
  };
  const resumeSoon = (delay = 1200) => {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { autoScrollPaused = false; }, delay);
  };

  // Pointer Events unify mouse/touch/pen and avoid the synthetic "ghost"
  // mouse events browsers replay after a touch tap, which previously left
  // autoScrollPaused stuck true with no matching resume on touch devices.
  let isDragging = false, startX, scrollLeft;

  railWrap.addEventListener('pointerenter', pause);
  railWrap.addEventListener('pointerleave', () => {
    isDragging = false;
    railWrap.style.cursor = 'grab';
    resumeSoon(0);
  });
  railWrap.addEventListener('pointerdown', e => {
    pause();
    // Manual drag math is only needed for mouse (no native click-drag-to-scroll).
    // Touch/pen already scroll natively and smoothly, so let the browser handle those.
    if (e.pointerType !== 'mouse') return;
    isDragging = true;
    startX = e.clientX - railWrap.offsetLeft;
    scrollLeft = railWrap.scrollLeft;
    railWrap.style.cursor = 'grabbing';
    railWrap.setPointerCapture(e.pointerId);
  });
  railWrap.addEventListener('pointerup', () => {
    isDragging = false;
    railWrap.style.cursor = 'grab';
    resumeSoon();
  });
  railWrap.addEventListener('pointercancel', () => {
    isDragging = false;
    resumeSoon();
  });
  railWrap.addEventListener('pointermove', e => {
    if (!isDragging || e.pointerType !== 'mouse') return;
    const x = e.clientX - railWrap.offsetLeft;
    railWrap.scrollLeft = scrollLeft - (x - startX) * 1.4;
  });
}

/* --- REVEAL ON SCROLL --- */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));

/* --- NUMBER COUNTER --- */
const numberEls = document.querySelectorAll('.number-value[data-target], .stat-number[data-target]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString() + suffix;
      if (current >= target) clearInterval(timer);
    }, 25);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
numberEls.forEach(el => counterObserver.observe(el));

/* --- MODEL BOOKING MODAL --- */
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalModelName = document.getElementById('modalModelName');
const modalModelSpec = document.getElementById('modalModelSpec');
const hiddenModelName = document.getElementById('hiddenModelName');

const imgBase = window.location.pathname.includes('/html/') ? '../img/' : 'img/';
const modelImages = {
  'Aoi Yamamoto':    imgBase + 'model-aoi-yamamoto.jpg',
  'Risa Nakamura':   imgBase + 'model-risa-nakamura.jpg',
  'Hana Suzuki':     imgBase + 'model-hana-suzuki.jpg',
  'Mei Tanaka':      imgBase + 'model-mei-tanaka.jpg',
  'Yuki Matsumoto':  imgBase + 'model-yuki-matsumoto.jpg',
  'Saki Inoue':      imgBase + 'model-saki-inoue.jpg',
  'Nana Ito':        imgBase + 'model-nana-ito.jpg',
  'Mia Kobayashi':   imgBase + 'model-mia-kobayashi.jpg',
};

function openModal(name, spec) {
  if (!modalBackdrop) return;
  if (modalModelName) modalModelName.textContent = name;
  if (modalModelSpec) modalModelSpec.textContent = spec;
  if (hiddenModelName) hiddenModelName.value = name;
  const img = document.getElementById('modalPreviewImg');
  if (img && modelImages[name]) img.src = modelImages[name];
  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (modalBackdrop) modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.model-book-btn, .model-page-book').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name || btn.dataset.book || '';
    const spec = btn.dataset.spec || '';
    openModal(name, spec);
  });
});

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalBackdrop) {
  modalBackdrop.addEventListener('click', e => {
    if (e.target === modalBackdrop) closeModal();
  });
}

/* --- BOOKING FORM SUBMIT --- */
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    closeModal();
    showToast('送信が完了しました。担当者よりご連絡いたします。');
    bookingForm.reset();
  });
}

/* --- CONTACT FORM --- */
window.handleContactSubmit = function(e) {
  e.preventDefault();
  e.target.reset();
  showToast('ご登録ありがとうございます。');
};

/* --- TOAST --- */
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* --- SCROLL TO TOP --- */
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* --- PRODUCT FILTER (products page) --- */
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card[data-cat]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;

    // Step 1: immediately set all cards to invisible start state
    productCards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.style.transition = 'none';
      card.style.opacity = '0';
      card.style.transform = 'translateY(18px)';
      card.style.display = match ? '' : 'none';
    });

    // Step 2: force reflow, then stagger fade-in
    document.querySelector('.products-grid').offsetHeight;

    let idx = 0;
    productCards.forEach(card => {
      if (card.style.display === 'none') return;
      const delay = idx * 60;
      idx++;
      setTimeout(() => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, delay);
    });
  });
});

/* --- ESC KEY --- */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    toggleMenu(false);
  }
});
