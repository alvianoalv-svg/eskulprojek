/\* =========================================================
\
&#x20;  main.js — Portal Ekstrakurikuler SMKN 1 Sudimoro
\
&#x20;  \========================================================= \*/
\
(() => {
\
&#x20; "use strict";
\

\
&#x20; const $ = (selector, scope = document) => scope.querySelector(selector);
\
&#x20; const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
\

\
&#x20; document.addEventListener("DOMContentLoaded", () => {
\
&#x20;   initPreloader();
\
&#x20;   initTheme();
\
&#x20;   initNavbar();
\
&#x20;   initMobileMenu();
\
&#x20;   initTyping();
\
&#x20;   initAOS();
\
&#x20;   initGallery();
\
&#x20;   initTilt();
\
&#x20;   initBackTop();
\
&#x20;   initYear();
\
&#x20;   initFormValidation();
\
&#x20;   initSocialLinks();
\
&#x20;   initButtons();
\
&#x20; });
\

\
&#x20; function initPreloader() {
\
&#x20;   const preloader = $(".preloader");
\
&#x20;   if (!preloader) return;
\
&#x20;   window\.addEventListener("load", () => {
\
&#x20;     setTimeout(() => preloader.classList.add("hide"), 250);
\
&#x20;   });
\
&#x20;   setTimeout(() => preloader.classList.add("hide"), 1800);
\
&#x20; }
\

\
&#x20; function initTheme() {
\
&#x20;   const saved = localStorage.getItem("smkn1-theme");
\
&#x20;   if (saved === "dark" || saved === "light") {
\
&#x20;     document.documentElement.dataset.theme = saved;
\
&#x20;   } else {
\
&#x20;     document.documentElement.dataset.theme =
\
&#x20;       window\.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
\
&#x20;   }
\

\
&#x20;   const buttons = $$(".theme-toggle");
\
&#x20;   const syncIcon = () => {
\
&#x20;     const isDark = document.documentElement.dataset.theme === "dark";
\
&#x20;     buttons.forEach(btn => {
\
&#x20;       btn.innerHTML = isDark
\
&#x20;         ? '\<i class="fa-solid fa-sun">\</i>'
\
&#x20;         : '\<i class="fa-solid fa-moon">\</i>';
\
&#x20;       btn.setAttribute("aria-label", isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap");
\
&#x20;     });
\
&#x20;   };
\

\
&#x20;   buttons.forEach(btn => btn.addEventListener("click", () => {
\
&#x20;     const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
\
&#x20;     document.documentElement.dataset.theme = next;
\
&#x20;     localStorage.setItem("smkn1-theme", next);
\
&#x20;     syncIcon();
\
&#x20;   }));
\
&#x20;   syncIcon();
\
&#x20; }
\

\
&#x20; function initNavbar() {
\
&#x20;   const nav = $(".navbar");
\
&#x20;   const back = $(".backtop");
\
&#x20;   const update = () => {
\
&#x20;     const scrolled = window\.scrollY > 24;
\
&#x20;     nav?.classList.toggle("scrolled", scrolled);
\
&#x20;     back?.classList.toggle("show", window\.scrollY > 480);
\
&#x20;   };
\
&#x20;   update();
\
&#x20;   window\.addEventListener("scroll", update, { passive: true });
\

\
&#x20;   const currentPath = location.pathname.replace(/\\\\/g, "/");
\
&#x20;   $$(".nav-links a").forEach(link => {
\
&#x20;     if ((link.getAttribute("href") || "").includes("#")) return;
\
&#x20;     try {
\
&#x20;       const linkPath = new URL(link.href, location.href).pathname.replace(/\\\\/g, "/");
\
&#x20;       if (linkPath === currentPath) link.classList.add("active");
\
&#x20;     } catch {}
\
&#x20;   });
\
&#x20; }
\

\
&#x20; function initMobileMenu() {
\
&#x20;   const toggle = $(".menu-toggle");
\
&#x20;   const links = $(".nav-links");
\
&#x20;   if (!toggle || !links) return;
\
&#x20;   toggle.addEventListener("click", () => {
\
&#x20;     const isOpen = links.classList.toggle("open");
\
&#x20;     toggle.setAttribute("aria-expanded", String(isOpen));
\
&#x20;     toggle.innerHTML = isOpen
\
&#x20;       ? '\<i class="fa-solid fa-xmark">\</i>'
\
&#x20;       : '\<i class="fa-solid fa-bars">\</i>';
\
&#x20;   });
\
&#x20;   $$(".nav-links a").forEach(a => a.addEventListener("click", () => {
\
&#x20;     links.classList.remove("open");
\
&#x20;     toggle.setAttribute("aria-expanded", "false");
\
&#x20;     toggle.innerHTML = '\<i class="fa-solid fa-bars">\</i>';
\
&#x20;   }));
\
&#x20; }
\

\
&#x20; function initTyping() {
\
&#x20;   const el = $(".typing-text");
\
&#x20;   if (!el) return;
\
&#x20;   let phrases = [];
\
&#x20;   try { phrases = JSON.parse(el.dataset.phrases || "[]"); } catch {}
\
&#x20;   if (!phrases.length) phrases = ["Berani Berkarya", "Tumbuh Bersama", "Aktif dan Inspiratif"];
\
&#x20;   let phrase = 0, char = 0, deleting = false;
\

\
&#x20;   const tick = () => {
\
&#x20;     const current = phrases[phrase];
\
&#x20;     el.textContent = current.slice(0, char);
\

\
&#x20;     if (!deleting && char < current.length) {
\
&#x20;       char++;
\
&#x20;       setTimeout(tick, 75);
\
&#x20;     } else if (!deleting && char >= current.length) {
\
&#x20;       deleting = true;
\
&#x20;       setTimeout(tick, 1500);
\
&#x20;     } else if (deleting && char > 0) {
\
&#x20;       char--;
\
&#x20;       setTimeout(tick, 38);
\
&#x20;     } else {
\
&#x20;       deleting = false;
\
&#x20;       phrase = (phrase + 1) % phrases.length;
\
&#x20;       setTimeout(tick, 450);
\
&#x20;     }
\
&#x20;   };
\
&#x20;   tick();
\
&#x20; }
\

\
&#x20; function initAOS() {
\
&#x20;   if (window\.AOS) {
\
&#x20;     AOS.init({
\
&#x20;       duration: 800,
\
&#x20;       easing: "ease-out-cubic",
\
&#x20;       once: true,
\
&#x20;       offset: 70,
\
&#x20;       disable: window\.matchMedia("(prefers-reduced-motion: reduce)").matches
\
&#x20;     });
\
&#x20;   }
\
&#x20; }
\

\
&#x20; function initGallery() {
\
&#x20;   const box = $(".lightbox");
\
&#x20;   const img = $(".lightbox-image");
\
&#x20;   const caption = $(".lightbox-caption");
\
&#x20;   const closeBtn = $(".lightbox-close");
\
&#x20;   if (!box || !img) return;
\

\
&#x20;   const open = item => {
\
&#x20;     const itemImg = $("img", item);
\
&#x20;     img.src = itemImg.currentSrc || itemImg.src;
\
&#x20;     img.alt = itemImg.alt || "";
\
&#x20;     if (caption) caption.textContent = item.dataset.caption || itemImg.alt || "";
\
&#x20;     box.classList.add("open");
\
&#x20;     document.body.classList.add("modal-open");
\
&#x20;   };
\
&#x20;   const close = () => {
\
&#x20;     box.classList.remove("open");
\
&#x20;     document.body.classList.remove("modal-open");
\
&#x20;   };
\

\
&#x20;   $$(".gallery-item").forEach(item => item.addEventListener("click", () => open(item)));
\
&#x20;   closeBtn?.addEventListener("click", close);
\
&#x20;   box.addEventListener("click", e => { if (e.target === box) close(); });
\
&#x20;   document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
\
&#x20; }
\

\
&#x20; function initTilt() {
\
&#x20;   $$(".gallery-item").forEach(card => {
\
&#x20;     card.addEventListener("pointermove", e => {
\
&#x20;       if (window\.innerWidth < 800) return;
\
&#x20;       const r = card.getBoundingClientRect();
\
&#x20;       const x = (e.clientX - r.left) / r.width - 0.5;
\
&#x20;       const y = (e.clientY - r.top) / r.height - 0.5;
\
&#x20;       card.style.transform = \`perspective(800px) rotateX(${(-y \* 5).toFixed(2)}deg) rotateY(${(x \* 5).toFixed(2)}deg) translateY(-4px)\`;
\
&#x20;     });
\
&#x20;     card.addEventListener("pointerleave", () => card.style.transform = "");
\
&#x20;   });
\
&#x20; }
\

\
&#x20; function initBackTop() {
\
&#x20;   const back = $(".backtop");
\
&#x20;   if (!back) return;
\
&#x20;   back.addEventListener("click", () => window\.scrollTo({ top: 0, behavior: "smooth" }));
\
&#x20; }
\

\
&#x20; function initYear() {
\
&#x20;   $$(".current-year").forEach(el => el.textContent = new Date().getFullYear());
\
&#x20; }
\

\
&#x20; function fieldStatus(field, valid, message = "") {
\
&#x20;   field.classList.toggle("valid", valid);
\
&#x20;   field.classList.toggle("invalid", !valid);
\
&#x20;   const msg = $(".field-msg", field);
\
&#x20;   if (msg) msg.textContent = valid ? "" : message;
\
&#x20; }
\

\
&#x20; function initFormValidation() {
\
&#x20;   const form = $("#registrationForm");
\
&#x20;   if (!form) return;
\
&#x20;   const modal = $("#successModal");
\
&#x20;   const closeModal = $(".modal-close", modal);
\
&#x20;   const successName = $(".success-name", modal);
\

\
&#x20;   const rules = {
\
&#x20;     nama: v => v.trim().length >= 3,
\
&#x20;     nis: v => /^[0-9]{3,20}$/.test(v.trim()),
\
&#x20;     kelas: v => v !== "",
\
&#x20;     organisasi: v => v !== "",
\
&#x20;     email: v => /^[^\s@]+@[^\s@]+\\.[^\s@]+$/.test(v.trim()),
\
&#x20;     whatsapp: v => /^[0-9+\\-\s]{9,18}$/.test(v.trim()),
\
&#x20;     alasan: v => v.trim().length >= 10
\
&#x20;   };
\

\
&#x20;   const messages = {
\
&#x20;     nama: "Nama minimal 3 karakter.",
\
&#x20;     nis: "NIS harus berupa angka.",
\
&#x20;     kelas: "Silakan pilih kelas.",
\
&#x20;     organisasi: "Silakan pilih ekstrakurikuler.",
\
&#x20;     email: "Masukkan email yang valid.",
\
&#x20;     whatsapp: "Masukkan nomor WhatsApp yang valid.",
\
&#x20;     alasan: "Tulis minimal 10 karakter."
\
&#x20;   };
\

\
&#x20;   Object.keys(rules).forEach(id => {
\
&#x20;     const input = document.getElementById(id);
\
&#x20;     if (!input) return;
\
&#x20;     const validate = () => {
\
&#x20;       const ok = rules[id]\(input.value);
\
&#x20;       fieldStatus(input.closest(".field"), ok, messages[id]);
\
&#x20;       return ok;
\
&#x20;     };
\
&#x20;     input.addEventListener("input", validate);
\
&#x20;     input.addEventListener("change", validate);
\
&#x20;     input.addEventListener("blur", validate);
\
&#x20;   });
\

\
&#x20;   form.addEventListener("submit", e => {
\
&#x20;     e.preventDefault();
\
&#x20;     let ok = true;
\
&#x20;     Object.keys(rules).forEach(id => {
\
&#x20;       const input = document.getElementById(id);
\
&#x20;       if (input && !rules[id]\(input.value)) {
\
&#x20;         fieldStatus(input.closest(".field"), false, messages[id]);
\
&#x20;         ok = false;
\
&#x20;       }
\
&#x20;     });
\
&#x20;     if (!ok) {
\
&#x20;       showToast("Periksa kolom yang masih merah.");
\
&#x20;       return;
\
&#x20;     }
\

\
&#x20;     const btn = $(".submit-btn", form);
\
&#x20;     if (btn) {
\
&#x20;       btn.disabled = true;
\
&#x20;       btn.dataset.old = btn.innerHTML;
\
&#x20;       btn.innerHTML = '\<i class="fa-solid fa-spinner fa-spin">\</i> Memproses...';
\
&#x20;     }
\

\
&#x20;     setTimeout(() => {
\
&#x20;       const name = $("#nama")?.value.trim() || "Siswa";
\
&#x20;       const entry = {
\
&#x20;         nama: name,
\
&#x20;         nis: $("#nis")?.value.trim() || "",
\
&#x20;         kelas: $("#kelas")?.value || "",
\
&#x20;         organisasi: $("#organisasi")?.value || "",
\
&#x20;         email: $("#email")?.value.trim() || "",
\
&#x20;         whatsapp: $("#whatsapp")?.value.trim() || "",
\
&#x20;         alasan: $("#alasan")?.value.trim() || "",
\
&#x20;         waktu: new Date().toISOString()
\
&#x20;       };
\

\
&#x20;       const old = JSON.parse(localStorage.getItem("smkn1-registrations") || "[]");
\
&#x20;       old.push(entry);
\
&#x20;       localStorage.setItem("smkn1-registrations", JSON.stringify(old));
\

\
&#x20;       if (successName) successName.textContent = name;
\
&#x20;       modal?.classList.add("open");
\
&#x20;       document.body.classList.add("modal-open");
\
&#x20;       form.reset();
\
&#x20;       $$(".field", form).forEach(f => f.classList.remove("valid","invalid"));
\
&#x20;       if (btn) {
\
&#x20;         btn.disabled = false;
\
&#x20;         btn.innerHTML = btn.dataset.old || '\<i class="fa-solid fa-paper-plane">\</i> Kirim Pendaftaran';
\
&#x20;       }
\
&#x20;     }, 900);
\
&#x20;   });
\

\
&#x20;   const close = () => {
\
&#x20;     modal?.classList.remove("open");
\
&#x20;     document.body.classList.remove("modal-open");
\
&#x20;   };
\
&#x20;   closeModal?.addEventListener("click", close);
\
&#x20;   modal?.addEventListener("click", e => { if (e.target === modal) close(); });
\
&#x20;   document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
\
&#x20; }
\

\
&#x20; function initSocialLinks() {
\
&#x20;   const socials = {
\
&#x20;     tirtawening: "https\://instagram.com/tirtawening_scout",
\
&#x20;     osis: "https\://instagram.com/osissmkneratu.id",
\
&#x20;     pmr: "https\://instagram.com/pmrwirakanesiro"
\
&#x20;   };
\
&#x20;   $$("[data-social]").forEach(a => {
\
&#x20;     const key = a.dataset.social;
\
&#x20;     if (socials[key]) a.href = socials[key];
\
&#x20;   });
\

\
&#x20;   // GANTI angka berikut dengan nomor WhatsApp admin sekolah:
\
&#x20;   // format internasional tanpa tanda + dan tanpa spasi.
\
&#x20;   const WHATSAPP_ADMIN = "6281234567890";
\
&#x20;   const waUrl = \`https\://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent("Halo Admin Portal Ekskul SMKN 1 Sudimoro, saya ingin bertanya tentang pendaftaran ekstrakurikuler.")}\`;
\
&#x20;   $$("[data-whatsapp]").forEach(a => a.href = waUrl);
\
&#x20; }
\

\
&#x20; function initButtons() {
\
&#x20;   $$("[data-scroll]").forEach(btn => {
\
&#x20;     btn.addEventListener("click", e => {
\
&#x20;       const target = $(btn.dataset.scroll);
\
&#x20;       if (target) {
\
&#x20;         e.preventDefault();
\
&#x20;         target.scrollIntoView({ behavior: "smooth" });
\
&#x20;       }
\
&#x20;     });
\
&#x20;   });
\

\
&#x20;   $$(".js-share").forEach(btn => {
\
&#x20;     btn.addEventListener("click", async () => {
\
&#x20;       const data = { title: document.title, text: "Portal Ekstrakurikuler SMKN 1 Sudimoro", url: location.href };
\
&#x20;       if (navigator.share) {
\
&#x20;         try { await navigator.share(data); } catch {}
\
&#x20;       } else {
\
&#x20;         await navigator.clipboard?.writeText(location.href);
\
&#x20;         showToast("Link halaman disalin.");
\
&#x20;       }
\
&#x20;     });
\
&#x20;   });
\
&#x20; }
\

\
&#x20; function showToast(message) {
\
&#x20;   let toast = $(".toast");
\
&#x20;   if (!toast) {
\
&#x20;     toast = document.createElement("div");
\
&#x20;     toast.className = "toast";
\
&#x20;     document.body.appendChild(toast);
\
&#x20;   }
\
&#x20;   toast.textContent = message;
\
&#x20;   toast.classList.add("show");
\
&#x20;   clearTimeout(window.\_\_toastTimer);
\
&#x20;   window.\_\_toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
\
&#x20; }
\
})();
