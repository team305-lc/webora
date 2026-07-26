(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");
  var closeNav = function () {
    navToggle.setAttribute("aria-expanded", "false");
    navMobile.classList.remove("is-open");
  };
  navToggle.addEventListener("click", function () {
    var open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navMobile.classList.toggle("is-open", !open);
  });
  navMobile.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  var hoursTable = document.querySelector(".hours-table");
  if (hoursTable) {
    var todayRow = hoursTable.querySelector('tr[data-day="' + new Date().getDay() + '"]');
    if (todayRow) { todayRow.classList.add("today"); }
  }
})();
