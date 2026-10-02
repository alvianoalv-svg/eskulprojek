/* =========================================================
   main.js — Portal Ekstrakurikuler SMKN 1 Sudimoro
   ========================================================= */
(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    initTheme();
    initNavbar();
    initMobileMenu();
    initTyping();
    initAOS();
    initGallery();
    initTilt();
    initBackTop();
    initYear();
    initFormValidation();
    initSocialLinks();
    initButtons();
  });

  function initPreloader() {
    const preloader = $(".preloader");
    if (!preloader) return;
    window.addEventListener("load", () => {
      setTimeout(() => preloader.classList.add("hide"), 250);
    });
    setTimeout(() => preloader.classList.add("hide"), 1800);
  }

  function initTheme() {
    const saved = localStorage.getItem("smkn1-theme");
    if (saved === "dark" || saved === "light") {
      document.documentElement.dataset.theme = saved;
    } else {
      document.documentElement.dataset.theme =
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    const buttons = $$(".theme-toggle");
    const syncIcon = () => {
      const isDark = document.documentElement.dataset.theme === "dark";
      buttons.forEach(btn => {
        btn.innerHTML = isDark
          ? '<i class="fa-solid fa-sun"></i>'
          : '<i class="fa-solid fa-moon"></i>';
        btn.setAttribute("aria-label", isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap");
      });
    };

    buttons.forEach(btn => btn.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("smkn1-theme", next);
      syncIcon();
    }));
    syncIcon();
  }

  function initNavbar() {
    const nav = $(".navbar");
    const back = $(".backtop");
    const update = () => {
      const scrolled = window.scrollY > 24;
      nav?.classList.toggle("scrolled", scrolled);
      back?.classList.toggle("show", window.scrollY > 480);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });

    const currentPath = location.pathname.replace(/\\/g, "/");
    $$(".nav-links a").forEach(link => {
      if ((link.getAttribute("href") || "").includes("#")) return;
      try {
        const linkPath = new URL(link.href, location.href).pathname.replace(/\\/g, "/");
        if (linkPath === currentPath) link.classList.add("active");
      } catch {}
    });
  }

  function initMobileMenu() {
    const toggle = $(".menu-toggle");
    const links = $(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
    $$(".nav-links a").forEach(a => a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }));
  }

  function initTyping() {
    const el = $(".typing-text");
    if (!el) return;
    let phrases = [];
    try { phrases = JSON.parse(el.dataset.phrases || "[]"); } catch {}
    if (!phrases.length) phrases = ["Berani Berkarya", "Tumbuh Bersama", "Aktif dan Inspiratif"];
    let phrase = 0, char = 0, deleting = false;

    const tick = () => {
      const current = phrases[phrase];
      el.textContent = current.slice(0, char);

      if (!deleting && char < current.length) {
        char++;
        setTimeout(tick, 75);
      } else if (!deleting && char >= current.length) {
        deleting = true;
        setTimeout(tick, 1500);
      } else if (deleting && char > 0) {
        char--;
        setTimeout(tick, 38);
      } else {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        setTimeout(tick, 450);
      }
    };
    tick();
  }

  function initAOS() {
    if (window.AOS) {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 70,
        disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      });
    }
  }

  function initGallery() {
    const box = $(".lightbox");
    const img = $(".lightbox-image");
    const caption = $(".lightbox-caption");
    const closeBtn = $(".lightbox-close");
    if (!box || !img) return;

    const open = item => {
      const itemImg = $("img", item);
      img.src = itemImg.currentSrc || itemImg.src;
      img.alt = itemImg.alt || "";
      if (caption) caption.textContent = item.dataset.caption || itemImg.alt || "";
      box.classList.add("open");
      document.body.classList.add("modal-open");
    };
    const close = () => {
      box.classList.remove("open");
      document.body.classList.remove("modal-open");
    };

    $$(".gallery-item").forEach(item => item.addEventListener("click", () => open(item)));
    closeBtn?.addEventListener("click", close);
    box.addEventListener("click", e => { if (e.target === box) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  function initTilt() {
    $$(".gallery-item").forEach(card => {
      card.addEventListener("pointermove", e => {
        if (window.innerWidth < 800) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => card.style.transform = "");
    });
  }

  function initBackTop() {
    const back = $(".backtop");
    if (!back) return;
    back.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function initYear() {
    $$(".current-year").forEach(el => el.textContent = new Date().getFullYear());
  }

  function fieldStatus(field, valid, message = "") {
    field.classList.toggle("valid", valid);
    field.classList.toggle("invalid", !valid);
    const msg = $(".field-msg", field);
    if (msg) msg.textContent = valid ? "" : message;
  }

  function initFormValidation() {
    const form = $("#registrationForm");
    if (!form) return;
    const modal = $("#successModal");
    const closeModal = $(".modal-close", modal);
    const successName = $(".success-name", modal);

    const rules = {
      nama: v => v.trim().length >= 3,
      nis: v => /^[0-9]{3,20}$/.test(v.trim()),
      kelas: v => v !== "",
      organisasi: v => v !== "",
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      whatsapp: v => /^[0-9+\-\s]{9,18}$/.test(v.trim()),
      alasan: v => v.trim().length >= 10
    };

    const messages = {
      nama: "Nama minimal 3 karakter.",
      nis: "NIS harus berupa angka.",
      kelas: "Silakan pilih kelas.",
      organisasi: "Silakan pilih ekstrakurikuler.",
      email: "Masukkan email yang valid.",
      whatsapp: "Masukkan nomor WhatsApp yang valid.",
      alasan: "Tulis minimal 10 karakter."
    };

    Object.keys(rules).forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      const validate = () => {
        const ok = rules[id](input.value);
        fieldStatus(input.closest(".field"), ok, messages[id]);
        return ok;
      };
      input.addEventListener("input", validate);
      input.addEventListener("change", validate);
      input.addEventListener("blur", validate);
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      let ok = true;
      Object.keys(rules).forEach(id => {
        const input = document.getElementById(id);
        if (input && !rules[id](input.value)) {
          fieldStatus(input.closest(".field"), false, messages[id]);
          ok = false;
        }
      });
      if (!ok) {
        showToast("Periksa kolom yang masih merah.");
        return;
      }

      const btn = $(".submit-btn", form);
      if (btn) {
        btn.disabled = true;
        btn.dataset.old = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
      }

      setTimeout(() => {
        const name = $("#nama")?.value.trim() || "Siswa";
        const entry = {
          nama: name,
          nis: $("#nis")?.value.trim() || "",
          kelas: $("#kelas")?.value || "",
          organisasi: $("#organisasi")?.value || "",
          email: $("#email")?.value.trim() || "",
          whatsapp: $("#whatsapp")?.value.trim() || "",
          alasan: $("#alasan")?.value.trim() || "",
          waktu: new Date().toISOString()
        };

        const old = JSON.parse(localStorage.getItem("smkn1-registrations") || "[]");
        old.push(entry);
        localStorage.setItem("smkn1-registrations", JSON.stringify(old));

        if (successName) successName.textContent = name;
        modal?.classList.add("open");
        document.body.classList.add("modal-open");
        form.reset();
        $$(".field", form).forEach(f => f.classList.remove("valid","invalid"));
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = btn.dataset.old || '<i class="fa-solid fa-paper-plane"></i> Kirim Pendaftaran';
        }
      }, 900);
    });

    const close = () => {
      modal?.classList.remove("open");
      document.body.classList.remove("modal-open");
    };
    closeModal?.addEventListener("click", close);
    modal?.addEventListener("click", e => { if (e.target === modal) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  function initSocialLinks() {
    const socials = {
      tirtawening: "https://instagram.com/tirtawening_scout",
      osis: "https://instagram.com/osissmkneratu.id",
      pmr: "https://instagram.com/pmrwirakanesiro"
    };
    $$("[data-social]").forEach(a => {
      const key = a.dataset.social;
      if (socials[key]) a.href = socials[key];
    });

    // GANTI angka berikut dengan nomor WhatsApp admin sekolah:
    // format internasional tanpa tanda + dan tanpa spasi.
    const WHATSAPP_ADMIN = "6281234567890";
    const waUrl = `https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent("Halo Admin Portal Ekskul SMKN 1 Sudimoro, saya ingin bertanya tentang pendaftaran ekstrakurikuler.")}`;
    $$("[data-whatsapp]").forEach(a => a.href = waUrl);
  }

  function initButtons() {
    $$("[data-scroll]").forEach(btn => {
      btn.addEventListener("click", e => {
        const target = $(btn.dataset.scroll);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    $$(".js-share").forEach(btn => {
      btn.addEventListener("click", async () => {
        const data = { title: document.title, text: "Portal Ekstrakurikuler SMKN 1 Sudimoro", url: location.href };
        if (navigator.share) {
          try { await navigator.share(data); } catch {}
        } else {
          await navigator.clipboard?.writeText(location.href);
          showToast("Link halaman disalin.");
        }
      });
    });
  }

  function showToast(message) {
    let toast = $(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }
})();
