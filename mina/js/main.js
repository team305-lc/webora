document.addEventListener("DOMContentLoaded", () => {
  const BIRTHDATE = new Date(2000, 10, 13); // 2000年11月13日
  const ageNodes = document.querySelectorAll(".age-num");
  if (ageNodes.length) {
    const today = new Date();
    let age = today.getFullYear() - BIRTHDATE.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > BIRTHDATE.getMonth() ||
      (today.getMonth() === BIRTHDATE.getMonth() && today.getDate() >= BIRTHDATE.getDate());
    if (!hasHadBirthdayThisYear) age--;
    ageNodes.forEach((el) => {
      el.textContent = age;
    });
  }

  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      siteNav.classList.toggle("open");
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        siteNav.classList.remove("open");
      });
    });
  }

  const header = document.getElementById("header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const revealTargets = document.querySelectorAll(".glass-card, .hobby-card");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }
});
