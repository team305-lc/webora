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
  const errorPanel = document.getElementById("formError");
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

    const checkboxGroup = form.querySelector(".checkbox-group");
    const fieldErrors = {
      name: document.getElementById("nameError"),
      email: document.getElementById("emailError"),
      service: document.getElementById("serviceError"),
      budget: document.getElementById("budgetError"),
      detail: document.getElementById("detailError"),
    };

    const MAX_LENGTH = { name: 100, email: 255, detail: 2000 };
    const counters = {
      name: document.getElementById("nameCounter"),
      email: document.getElementById("emailCounter"),
      detail: document.getElementById("detailCounter"),
    };
    Object.keys(counters).forEach((field) => {
      const updateCounter = () => {
        const length = form[field].value.length;
        const max = MAX_LENGTH[field];
        counters[field].textContent = `${length} / ${max}`;
        counters[field].classList.toggle("at-limit", length >= max);
      };
      form[field].addEventListener("input", updateCounter);
      updateCounter();
    });

    const clearFieldError = (field) => {
      fieldErrors[field].textContent = "";
      if (field === "service") {
        checkboxGroup.classList.remove("invalid");
      } else {
        form[field].classList.remove("invalid");
      }
    };
    const setFieldError = (field, message) => {
      fieldErrors[field].textContent = message;
      if (field === "service") {
        checkboxGroup.classList.add("invalid");
      } else {
        form[field].classList.add("invalid");
      }
    };

    ["name", "email", "budget", "detail"].forEach((field) => {
      form[field].addEventListener("input", () => clearFieldError(field));
    });
    form.querySelectorAll('input[name="service"]').forEach((el) => {
      el.addEventListener("change", () => clearFieldError("service"));
    });

    const validateForm = () => {
      let valid = true;

      const name = form.name.value.trim();
      if (!name) {
        setFieldError("name", "お名前・会社名を入力してください。");
        valid = false;
      } else if (name.length > MAX_LENGTH.name) {
        setFieldError("name", `お名前・会社名は${MAX_LENGTH.name}文字以内で入力してください。`);
        valid = false;
      } else {
        clearFieldError("name");
      }

      const email = form.email.value.trim();
      if (!email) {
        setFieldError("email", "メールアドレスを入力してください。");
        valid = false;
      } else if (form.email.validity.typeMismatch) {
        setFieldError("email", "メールアドレスの形式が正しくありません。");
        valid = false;
      } else if (email.length > MAX_LENGTH.email) {
        setFieldError("email", `メールアドレスは${MAX_LENGTH.email}文字以内で入力してください。`);
        valid = false;
      } else {
        clearFieldError("email");
      }

      const services = Array.from(form.querySelectorAll('input[name="service"]:checked'));
      if (services.length === 0) {
        setFieldError("service", "ご依頼内容を1つ以上選択してください。");
        valid = false;
      } else {
        clearFieldError("service");
      }

      if (!form.budget.value) {
        setFieldError("budget", "ご予算を選択してください。");
        valid = false;
      } else {
        clearFieldError("budget");
      }

      const detail = form.detail.value.trim();
      if (detail.length > MAX_LENGTH.detail) {
        setFieldError("detail", `詳細・ご要望は${MAX_LENGTH.detail}文字以内で入力してください。`);
        valid = false;
      } else {
        clearFieldError("detail");
      }

      return valid;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!validateForm()) {
        const firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      const services = Array.from(form.querySelectorAll('input[name="service"]:checked')).map((el) => el.value);
      errorPanel.hidden = true;

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

      const submitBtn = form.querySelector(".btn-submit");
      submitBtn.disabled = true;

      fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: params,
      })
        .then(() => {
          form.hidden = true;
          errorPanel.hidden = true;
          successPanel.hidden = false;
          successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
        })
        .catch(() => {
          submitBtn.disabled = false;
          errorPanel.hidden = false;
          errorPanel.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });
  }
});
