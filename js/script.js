document.addEventListener("DOMContentLoaded", () => {

  /* ---- header scroll state ---- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- mobile nav toggle ---- */
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        nav.classList.remove("open");
      });
    });
  }

  /* ---- generate twinkling stars ---- */
  document.querySelectorAll(".stars").forEach((container) => {
    const count = 60;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement("span");
      star.className = "star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
      const size = (Math.random() * 1.6 + 1).toFixed(1);
      star.style.width = size + "px";
      star.style.height = size + "px";
      fragment.appendChild(star);
    }
    container.appendChild(fragment);
  });

  /* ---- scroll reveal ---- */
  const animatedEls = document.querySelectorAll("[data-animate]");
  if ("IntersectionObserver" in window) {
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
    animatedEls.forEach((el) => observer.observe(el));
  } else {
    animatedEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ---- request form: submit straight through to the Webora Google Form ---- */
  const form = document.getElementById("requestForm");
  const successPanel = document.getElementById("formSuccess");
  if (form && successPanel) {
    const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSdxUFkpD2PlWuRv-FYXbDCwIAzQHo5LSJNHbzBBnc8VLKxb-A/formResponse";
    const ENTRY = {
      name: "entry.1919308361",
      email: "entry.1874592689",
      service: "entry.382928516",
      serviceOther: "entry.382928516.other_option_response",
      budget: "entry.1969688026",
      deadlineYear: "entry.1520928296_year",
      deadlineMonth: "entry.1520928296_month",
      deadlineDay: "entry.1520928296_day",
      videoChat: "entry.2091505868",
      detail: "entry.2014809105",
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const services = Array.from(form.querySelectorAll('input[name="service"]:checked')).map((el) => el.value);
      let valid = form.checkValidity();
      if (services.length === 0) valid = false;

      if (!valid) {
        form.reportValidity();
        return;
      }

      const params = new URLSearchParams();
      params.append(ENTRY.name, form.name.value.trim());
      params.append(ENTRY.email, form.email.value.trim());
      services.forEach((s) => {
        if (s === "その他") {
          params.append(ENTRY.service, "__other_option__");
          params.append(ENTRY.serviceOther, "その他");
        } else {
          params.append(ENTRY.service, s);
        }
      });
      params.append(ENTRY.budget, form.budget.value);
      if (form.deadline.value) {
        const [year, month, day] = form.deadline.value.split("-");
        params.append(ENTRY.deadlineYear, year);
        params.append(ENTRY.deadlineMonth, String(Number(month)));
        params.append(ENTRY.deadlineDay, String(Number(day)));
      }
      if (form.videoChat.value) params.append(ENTRY.videoChat, form.videoChat.value);
      params.append(ENTRY.detail, form.detail.value.trim());

      fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: params,
      }).catch(() => {});

      form.hidden = true;
      successPanel.hidden = false;
      successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
});
