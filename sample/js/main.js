/* =================================================================
   サンプル整体院 ── 共通スクリプト
   （通常このファイルを編集する必要はありません。
     内容の変更は js/config.js で行ってください）
   ================================================================= */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};

  /* オブジェクトのパス文字列（例 "company.tel"）から値を取り出す */
  function pick(path) {
    return path.split(".").reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, CFG);
  }

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* config.js の画像パス（img/...）を、html/ フォルダ内のページからも読めるようにする */
  var ASSET_PREFIX = /\/html\/[^\/]*$/.test(location.pathname) ? "../" : "";
  function asset(p) { return /^(https?:)?\/\//.test(p) ? p : ASSET_PREFIX + p; }

  function telHref(num) {
    return "tel:" + String(num || "").replace(/[^0-9+]/g, "");
  }

  function stars(n) {
    n = Math.max(0, Math.min(5, parseInt(n, 10) || 0));
    return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
  }

  document.addEventListener("DOMContentLoaded", function () {

    /* ---------- 1. テキストの差し込み ---------- */
    document.querySelectorAll("[data-cfg]").forEach(function (el) {
      var val = pick(el.getAttribute("data-cfg"));
      if (val != null && val !== "") el.textContent = val;
    });

    /* 電話リンク（<a data-cfg-tel>） */
    document.querySelectorAll("[data-cfg-tel]").forEach(function (el) {
      var num = pick("company.tel");
      if (!num) return;
      el.setAttribute("href", telHref(num));
      if (!el.textContent.trim()) el.textContent = num;
    });

    /* メールリンク（<a data-cfg-mail>） */
    document.querySelectorAll("[data-cfg-mail]").forEach(function (el) {
      var mail = pick("company.email");
      if (!mail) return;
      el.setAttribute("href", "mailto:" + mail);
      if (!el.textContent.trim()) el.textContent = mail;
    });

    /* 地図リンク（<a data-cfg-map>） */
    document.querySelectorAll("[data-cfg-map]").forEach(function (el) {
      var link = pick("company.mapLink");
      if (link) el.setAttribute("href", link);
    });

    /* 現在の年（コピーライト表記） */
    document.querySelectorAll(".js-year").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    /* ---------- 2. SNS リンク（未設定なら非表示） ---------- */
    (function sns() {
      var map = {
        "js-sns-line": pick("company.lineUrl"),
        "js-sns-instagram": pick("company.instagramUrl"),
      };
      Object.keys(map).forEach(function (cls) {
        document.querySelectorAll("." + cls).forEach(function (el) {
          if (map[cls]) {
            el.setAttribute("href", map[cls]);
          } else {
            el.hidden = true;
          }
        });
      });
    })();

    /* ---------- 3. 地図の埋め込み ---------- */
    var mapBox = document.querySelector("[data-map-embed]");
    if (mapBox) {
      var src = pick("company.mapEmbed");
      if (src) {
        var iframe = document.createElement("iframe");
        iframe.src = src;
        iframe.className = "map-embed";
        iframe.loading = "lazy";
        iframe.title = (pick("company.name") || "") + " の地図";
        iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
        iframe.setAttribute("allowfullscreen", "");
        mapBox.appendChild(iframe);
      }
    }

    /* ---------- 4. メニュー・料金 ---------- */
    /* clickable: true にすると、メニュー名クリックで詳細モーダルが開く */
    function menuItemHtml(m, i, clickable) {
      var name = clickable
        ? '<button type="button" class="menu-item__name-btn" data-menu-open="' + i + '" aria-haspopup="dialog">' +
            esc(m.name) +
            '<span class="menu-item__more">詳しく見る</span>' +
          "</button>"
        : esc(m.name);
      return (
        '<div class="menu-item' + (m.image ? " menu-item--photo" : "") + '"' +
          (clickable ? ' data-menu-index="' + i + '"' : "") + '>' +
          (m.image ? '<div class="menu-item__img"><img src="' + esc(asset(m.image)) + '" alt="' + esc(m.name) + '" loading="lazy"></div>' : "") +
          '<p class="menu-item__name">' + name + "</p>" +
          '<p class="menu-item__price">' + esc(m.price) +
            ' <span class="tax">(税込)</span></p>' +
          '<p class="menu-item__meta">' +
            (m.duration ? '<span class="menu-item__duration">' + esc(m.duration) + "</span>" : "") +
            esc(m.desc) +
          "</p>" +
        "</div>"
      );
    }

    /* メニュー・料金ページなど：全件表示＋クリックで詳細モーダル */
    var menuBoxes = document.querySelectorAll("[data-menu-list]");
    if (menuBoxes.length && Array.isArray(CFG.menu)) {
      var menuHtml = CFG.menu.map(function (m, i) { return menuItemHtml(m, i, true); }).join("");
      menuBoxes.forEach(function (box) { box.innerHTML = menuHtml; });
    }

    /* トップページの抜粋：上から指定件数だけ、詳細リンクなしで表示 */
    var menuTopBox = document.querySelector("[data-menu-top]");
    if (menuTopBox && Array.isArray(CFG.menu)) {
      var menuTopN = parseInt(menuTopBox.getAttribute("data-menu-top"), 10) || 3;
      menuTopBox.innerHTML = CFG.menu.slice(0, menuTopN).map(function (m, i) {
        return menuItemHtml(m, i, false);
      }).join("");
    }

    /* ---------- 4-1. メニュー詳細モーダル ---------- */
    if (menuBoxes.length && Array.isArray(CFG.menu) && CFG.menu.length) {
      var modal = document.createElement("div");
      modal.className = "menu-modal";
      modal.setAttribute("hidden", "");
      modal.innerHTML =
        '<div class="menu-modal__overlay" data-menu-close></div>' +
        '<div class="menu-modal__dialog" role="dialog" aria-modal="true" tabindex="-1">' +
          '<button type="button" class="menu-modal__close" data-menu-close aria-label="閉じる">&times;</button>' +
          '<div class="menu-modal__media"><img alt=""></div>' +
          '<div class="menu-modal__body">' +
            '<p class="menu-modal__price"></p>' +
            '<h3 class="menu-modal__name"></h3>' +
            '<div class="menu-modal__detail"></div>' +
            '<div class="menu-modal__points"></div>' +
            '<a class="btn btn--primary menu-modal__cta">このメニューで予約・お問い合わせ</a>' +
          "</div>" +
        "</div>";
      document.body.appendChild(modal);

      var mDialog = modal.querySelector(".menu-modal__dialog");
      var mImg = modal.querySelector(".menu-modal__media img");
      var mPrice = modal.querySelector(".menu-modal__price");
      var mName = modal.querySelector(".menu-modal__name");
      var mDetail = modal.querySelector(".menu-modal__detail");
      var mPoints = modal.querySelector(".menu-modal__points");
      var mCta = modal.querySelector(".menu-modal__cta");
      var lastFocused = null;

      function contactUrl() {
        return /\/html\/[^\/]*$/.test(location.pathname) ? "contact.html" : "html/contact.html";
      }
      mCta.setAttribute("href", contactUrl());

      function openMenuModal(i) {
        var m = CFG.menu[i];
        if (!m) return;
        lastFocused = document.activeElement;
        if (m.image) {
          mImg.src = asset(m.image);
          mImg.alt = m.name || "";
          mImg.style.objectPosition = m.imagePosition || "";
          mImg.closest(".menu-modal__media").hidden = false;
        } else {
          mImg.closest(".menu-modal__media").hidden = true;
        }
        mPrice.innerHTML = esc(m.price) + ' <span class="tax">(税込)</span>' +
          (m.duration ? ' <span class="menu-item__duration">' + esc(m.duration) + "</span>" : "");
        mName.textContent = m.name || "";
        var detailText = m.detail || m.desc || "";
        mDetail.innerHTML = detailText.split(/\n\s*\n/).map(function (p) {
          return "<p>" + esc(p).replace(/\n/g, "<br>") + "</p>";
        }).join("");
        if (Array.isArray(m.points) && m.points.length) {
          mPoints.innerHTML = "<h4>こんな方におすすめ</h4><ul>" +
            m.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") +
            "</ul>";
          mPoints.hidden = false;
        } else {
          mPoints.hidden = true;
        }
        modal.removeAttribute("hidden");
        document.body.classList.add("menu-modal-open");
        requestAnimationFrame(function () { modal.classList.add("is-open"); });
        mDialog.focus();
      }

      function closeMenuModal() {
        modal.classList.remove("is-open");
        document.body.classList.remove("menu-modal-open");
        setTimeout(function () { modal.setAttribute("hidden", ""); }, 200);
        if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
      }

      document.addEventListener("click", function (e) {
        var openBtn = e.target.closest("[data-menu-open]");
        if (openBtn) {
          openMenuModal(parseInt(openBtn.getAttribute("data-menu-open"), 10));
          return;
        }
        if (e.target.closest("[data-menu-close]")) closeMenuModal();
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("is-open")) closeMenuModal();
      });
    }

    var noteBox = document.querySelector("[data-menu-notes]");
    if (noteBox && Array.isArray(CFG.menuNotes)) {
      noteBox.innerHTML = CFG.menuNotes.map(function (n) {
        return "<li>・" + esc(n) + "</li>";
      }).join("");
    }

    /* ---------- 5. お知らせ ---------- */
    function renderNews(box, limit) {
      if (!box || !Array.isArray(CFG.news)) return;
      var items = limit ? CFG.news.slice(0, limit) : CFG.news;
      box.innerHTML = items.map(function (n) {
        return (
          '<div class="news-row">' +
            '<span class="news-row__date">' + esc(n.date) + "</span>" +
            '<span class="news-row__cat">' + esc(n.category) + "</span>" +
            '<div class="news-row__title">' + esc(n.title) +
              (n.body ? "<p>" + esc(n.body) + "</p>" : "") +
            "</div>" +
          "</div>"
        );
      }).join("");
    }
    renderNews(document.querySelector("[data-news-list]"), 0);
    renderNews(document.querySelector("[data-news-top]"), 3);

    /* ---------- 6. お客様の声 ---------- */
    function renderVoices(box, limit) {
      if (!box || !Array.isArray(CFG.voices)) return;
      var items = limit ? CFG.voices.slice(0, limit) : CFG.voices;
      box.innerHTML = items.map(function (v) {
        return (
          '<figure class="voice">' +
            (v.image ? '<img class="voice__photo" src="' + esc(asset(v.image)) + '" alt="' + esc(v.name) + '" width="72" height="72" loading="lazy">' : "") +
            '<div class="voice__main">' +
            '<div class="voice__stars" aria-label="評価 ' + (parseInt(v.stars, 10) || 0) + ' / 5">' +
              stars(v.stars) + "</div>" +
            '<blockquote class="voice__text">' + esc(v.text) + "</blockquote>" +
            '<figcaption class="voice__meta">' +
              "<strong>" + esc(v.name) + "</strong>" +
              (v.purpose ? " ／ ご相談内容：" + esc(v.purpose) : "") +
            "</figcaption>" +
            "</div>" +
          "</figure>"
        );
      }).join("");
    }
    renderVoices(document.querySelector("[data-voice-list]"), 0);
    renderVoices(document.querySelector("[data-voice-top]"), 4);

    /* ---------- 7. よくある質問 ---------- */
    var faqBox = document.querySelector("[data-faq-list]");
    if (faqBox && Array.isArray(CFG.faq)) {
      faqBox.innerHTML = CFG.faq.map(function (f) {
        return (
          "<details>" +
            "<summary>" + esc(f.q) + "</summary>" +
            '<div class="faq__body">' + esc(f.a) + "</div>" +
          "</details>"
        );
      }).join("");
    }

    /* ---------- 7-1. ファーストビュー画像のローテーション ---------- */
    var slideBox = document.querySelector("[data-hero-slides]");
    if (slideBox && Array.isArray(CFG.heroSlides) && CFG.heroSlides.length) {
      slideBox.innerHTML = CFG.heroSlides.map(function (s, i) {
        return '<img class="hero__slide' + (i === 0 ? " is-active" : "") + '" src="' + esc(asset(s.src)) +
          '" alt="' + esc(s.alt || "") + '"' + (s.position ? ' style="object-position:' + esc(s.position) + '"' : "") + (i === 0 ? "" : ' loading="lazy"') + ">";
      }).join("");
      var slides = slideBox.querySelectorAll(".hero__slide");
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (slides.length > 1 && !reduce) {
        var cur = 0;
        setInterval(function () {
          if (document.hidden) return;
          slides[cur].classList.remove("is-active");
          cur = (cur + 1) % slides.length;
          slides[cur].classList.add("is-active");
        }, CFG.heroInterval || 5500);
      }
    }

    /* ---------- 7-2. 院内ギャラリー（右から左へ流れる画像） ---------- */
    var galleryBox = document.querySelector("[data-gallery-marquee]");
    if (galleryBox && Array.isArray(CFG.gallery) && CFG.gallery.length) {
      /* 1セットが画面より短いと途切れるため、最低8枚になるまで繰り返す */
      var reps = Math.max(1, Math.ceil(8 / CFG.gallery.length));
      var slide = "";
      for (var r = 0; r < reps; r++) {
        slide += CFG.gallery.map(function (g) {
          return '<figure class="marquee__item">' +
            '<img src="' + esc(asset(g.src)) + '" alt="' + esc(g.alt || "") + '" loading="lazy">' +
            "</figure>";
        }).join("");
      }
      var track = document.createElement("div");
      track.className = "marquee__track";
      /* 同じ並びを2セット並べることで、途切れのない無限ループにする */
      track.innerHTML = slide + slide;
      galleryBox.appendChild(track);
    }

    /* ---------- 8. ハンバーガーメニュー ---------- */
    var MENU_BP = 1000;
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("global-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open && window.innerWidth <= MENU_BP ? "hidden" : "";
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a") && nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth > MENU_BP) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      });
    }

    /* ---------- 9. スクロール時のふわっと表示 ---------- */
    var faders = document.querySelectorAll(".fade-in");
    if (faders.length && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      faders.forEach(function (el) { io.observe(el); });
    } else {
      faders.forEach(function (el) { el.classList.add("is-visible"); });
    }

    /* ---------- 10. お問い合わせフォーム（送信先が未設定のときの案内） ---------- */
    var form = document.querySelector("[data-contact-form]");
    if (form) {
      form.addEventListener("submit", function (e) {
        if (form.getAttribute("action") &&
            form.getAttribute("action").indexOf("設定してください") === -1 &&
            form.getAttribute("action") !== "#") {
          return; /* 正しい送信先が設定済みならそのまま送信 */
        }
        e.preventDefault();
        var msg = document.querySelector("[data-form-message]");
        if (msg) {
          msg.hidden = false;
          msg.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    }
  });
})();
