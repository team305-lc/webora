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
    var scrollDarkObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      { threshold: 0.35 }
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
    var commitmentObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.4 }
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
