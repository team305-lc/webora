document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Header scroll state ---------- */
  var header = document.querySelector(".header");
  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  var menuToggle = document.querySelector(".menu-toggle");
  var navSp = document.querySelector(".nav-sp");
  if (menuToggle && navSp) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("is-active");
      navSp.classList.toggle("is-active");
    });
    navSp.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menuToggle.classList.remove("is-active");
        navSp.classList.remove("is-active");
      });
    });
  }

  /* ---------- Parallax background sections ----------
     the hero background stays fixed in place (no motion).
     Only sections marked with .js-parallax shift as the page scrolls.
     The image sits in a normal 100vh sticky frame (kept a natural
     size, not stretched to cover the whole scroll section). It rests
     at its true top (matching the CSS "top: 0" baseline) the moment
     the section is reached, then pans upward across the full
     scroll-through duration, revealing lower parts of the photo. */
  var parallaxBgs = document.querySelectorAll(".js-parallax");
  var PARALLAX_SLACK = 240;
  function updateParallax() {
    parallaxBgs.forEach(function (bg) {
      var wrap = bg.closest(".philosophy-wrap");
      if (!wrap) return;
      var rect = wrap.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      var scrollable = rect.height - window.innerHeight;
      var offset;
      if (scrollable <= 0) {
        offset = 0;
      } else {
        var progress = -rect.top / scrollable;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        offset = -progress * PARALLAX_SLACK;
      }
      bg.style.transform = "translate3d(0," + offset + "px,0)";
    });
  }
  updateParallax();
  window.addEventListener("scroll", updateParallax, { passive: true });

  /* ---------- Menu scroll end alignment ----------
     the last item starts out well below the trigger band, so giving
     it enough trailing space to climb all the way up to the image's
     top edge adds a long stretch of scroll with no new content --
     that dead stretch is what reads as "scrolling too far". Instead
     of forcing it up to the ~20% line, it only needs to reach
     MENU_SWAP_REST_FRACTION -- which must stay inside the (widened,
     see below) swap trigger band so the image still swaps in time. */
  var MENU_SWAP_REST_FRACTION = 0.32;
  var menuScrollText = document.querySelector(".menu-scroll-text");
  var menuScrollGrid = document.querySelector(".menu-scroll-grid");
  var menuTags = document.querySelectorAll(".menu-scroll-block .tag");
  function adjustMenuScrollEnd() {
    if (!menuScrollText || !menuScrollGrid || !menuTags.length) return;
    if (window.innerWidth <= 900) {
      menuScrollText.style.paddingBottom = "";
      return;
    }
    var lastTag = menuTags[menuTags.length - 1];
    menuScrollText.style.paddingBottom = "0px";
    var gridRect = menuScrollGrid.getBoundingClientRect();
    var tagRect = lastTag.getBoundingClientRect();
    var tagRelTop = tagRect.top - gridRect.top;
    var baseGridHeight = menuScrollGrid.offsetHeight;
    var viewportHeight = window.innerHeight;
    var restTarget = viewportHeight * MENU_SWAP_REST_FRACTION;
    var neededPadding = tagRelTop - restTarget + viewportHeight - baseGridHeight;
    menuScrollText.style.paddingBottom = Math.max(0, neededPadding) + "px";
  }
  adjustMenuScrollEnd();
  window.addEventListener("resize", adjustMenuScrollEnd);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(adjustMenuScrollEnd);
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Menu sticky image swap ----------
     the sticky image swaps to a menu item's own photo as soon as
     that item's number (01/02/03) reaches a band starting at the
     image's top edge ("top: 18vh", see .menu-scroll-media-sticky).
     The last item uses a separate, taller band (18%-60% instead of
     18%-22%): it starts out much further down the page than 01/02,
     so letting it swap -- and rest -- lower on screen keeps its
     scroll-in short instead of needing a long empty tail just to
     drag it all the way up to where 01/02 swap. Splitting this into
     two observers keeps 01/02's already-tuned timing untouched. */
  var menuImg = document.querySelector(".menu-scroll-img");
  var menuBadgeCap = document.querySelector(".menu-scroll-badge .cap");
  var menuAllTags = document.querySelectorAll(".menu-scroll-block .tag");
  var menuDots = document.querySelectorAll(".menu-scroll-dot");
  if (menuAllTags.length && menuImg) {
    var menuAllBlocks = document.querySelectorAll(".menu-scroll-block");
    var lastBlock = menuAllBlocks[menuAllBlocks.length - 1];
    var menuActiveIndex = 0;

    function applyMenuBlock(block) {
      var nextSrc = block.dataset.image;
      if (nextSrc && menuImg.getAttribute("src") !== nextSrc) {
        menuImg.style.opacity = 0;
        setTimeout(function () {
          menuImg.setAttribute("src", nextSrc);
          menuImg.style.objectFit = block.dataset.fit || "cover";
          menuImg.style.objectPosition = block.dataset.position || "center";
          menuImg.style.opacity = 1;
        }, 250);
      }
      if (menuBadgeCap) {
        menuBadgeCap.textContent = block.dataset.badge;
      }
      if (menuDots.length) {
        var blockIndex = Array.prototype.indexOf.call(menuAllBlocks, block);
        menuDots.forEach(function (dot, i) {
          dot.classList.toggle("is-active", i === blockIndex);
        });
      }
    }

    function handleMenuSwapEntries(entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var block = entry.target.closest(".menu-scroll-block");
        if (!block) return;
        menuActiveIndex = Array.prototype.indexOf.call(menuAllBlocks, block);
        applyMenuBlock(block);
      });
    }

    var menuIo = new IntersectionObserver(handleMenuSwapEntries, {
      threshold: 0,
      rootMargin: "-24% 0px -72% 0px",
    });
    var menuIoLast = new IntersectionObserver(handleMenuSwapEntries, {
      threshold: 0,
      rootMargin: "-24% 0px -60% 0px",
    });

    menuAllTags.forEach(function (el) {
      var block = el.closest(".menu-scroll-block");
      if (block === lastBlock) {
        menuIoLast.observe(el);
      } else {
        menuIo.observe(el);
      }
    });

    /* ---------- Menu image swipe (mobile) ----------
       on mobile the sticky trick doesn't apply (the image just sits
       above the stacked text), so scrolling never shows the swap.
       A left/right swipe directly on the photo cycles through the
       same three menu items instead. */
    var menuFrame = document.querySelector(".menu-scroll-media-frame");
    if (menuFrame) {
      var menuTouchStartX = 0;
      var menuTouchStartY = 0;
      var menuTouchTracking = false;
      var menuTouchIsHorizontal = null;

      menuFrame.addEventListener(
        "touchstart",
        function (e) {
          if (e.touches.length !== 1) return;
          menuTouchStartX = e.touches[0].clientX;
          menuTouchStartY = e.touches[0].clientY;
          menuTouchTracking = true;
          menuTouchIsHorizontal = null;
        },
        { passive: true }
      );

      /* Once a drag reads as mostly horizontal, block the browser's own
         pan/scroll so swiping the photo doesn't drag the whole page
         sideways. Vertical drags are left alone so page scrolling still
         works normally when it starts over the image. */
      menuFrame.addEventListener(
        "touchmove",
        function (e) {
          if (!menuTouchTracking || e.touches.length !== 1) return;
          var deltaX = e.touches[0].clientX - menuTouchStartX;
          var deltaY = e.touches[0].clientY - menuTouchStartY;
          if (menuTouchIsHorizontal === null && (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6)) {
            menuTouchIsHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
          }
          if (menuTouchIsHorizontal) {
            e.preventDefault();
          }
        },
        { passive: false }
      );

      menuFrame.addEventListener(
        "touchend",
        function (e) {
          if (!menuTouchTracking) return;
          menuTouchTracking = false;
          var touch = e.changedTouches[0];
          var deltaX = touch.clientX - menuTouchStartX;
          var deltaY = touch.clientY - menuTouchStartY;
          if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;
          var count = menuAllBlocks.length;
          if (deltaX < 0) {
            menuActiveIndex = (menuActiveIndex + 1) % count;
          } else {
            menuActiveIndex = (menuActiveIndex - 1 + count) % count;
          }
          applyMenuBlock(menuAllBlocks[menuActiveIndex]);
        },
        { passive: true }
      );
    }
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item").forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("is-open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });
});
