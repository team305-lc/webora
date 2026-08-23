(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  var scrollDarkSections = document.querySelectorAll(".section--scrolldark");
  if (scrollDarkSections.length && "IntersectionObserver" in window) {
    // A percentage threshold (e.g. 0.35) is unreliable here: on mobile these
    // sections stack tall and can exceed the viewport height, so that share
    // of the section is never simultaneously visible and the class never
    // toggles. Instead watch a thin band across the vertical center of the
    // viewport (via rootMargin) — independent of the section's own height.
    var scrollDarkObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );
    scrollDarkSections.forEach(function (section) {
      scrollDarkObserver.observe(section);
    });
  }

  var MARQUEE_LAPS = 5;

  document.querySelectorAll(".examples-track").forEach(function (track) {
    var originals = Array.prototype.slice.call(track.children);
    for (var lap = 1; lap < MARQUEE_LAPS; lap++) {
      originals.forEach(function (node) {
        var clone = node.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
    }
  });

  var commitmentItems = document.querySelectorAll(".commitment-item");
  if (commitmentItems.length && "IntersectionObserver" in window) {
    // Fire once per item and stop observing. Toggling the class on every
    // enter/exit let the ratio flicker back and forth around the threshold
    // (especially with a tall, stacked mobile layout), which kept restarting
    // the spin animation mid-rotation and made it look choppy.
    var commitmentObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Force a reflow before adding the class so mobile Safari
            // reliably commits the pre-animation state (opacity: 0,
            // rotateY(0deg)) as a rendered frame first. Without this, the
            // animation can get skipped on some WebKit builds -- the element
            // just jumps straight to its post-animation state once the class
            // lands, which looks like the image appearing late with no
            // rotation at all. Aimatch's card reveal uses the same trick.
            void entry.target.offsetWidth;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "-20% 0px -20% 0px" }
    );
    commitmentItems.forEach(function (item) {
      commitmentObserver.observe(item);
    });
  }

  var contactForm = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      formStatus.classList.add("is-visible");
      formStatus.scrollIntoView({ behavior: "smooth", block: "center" });
      contactForm.reset();
    });
  }
})();
