```javascript
form.addEventListener("submit", async e => {
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
  const name = $("#nama")?.value.trim() || "Siswa";

  // URL Google Apps Script kamu
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwIP3DQDoHwTa6cKzgU5llBoO5aIWpVu-zGnx8EaJBJaZViZVWpY-HYYvVhKrkkHDv2Og/exec";

  if (btn) {
    btn.disabled = true;
    btn.dataset.old = btn.innerHTML;
    btn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
  }

  try {
    const data = new URLSearchParams({
      nama: $("#nama")?.value.trim() || "",
      nis: $("#nis")?.value.trim() || "",
      kelas: $("#kelas")?.value || "",
      organisasi: $("#organisasi")?.value || "",
      email: $("#email")?.value.trim() || "",
      whatsapp: $("#whatsapp")?.value.trim() || "",
      alasan: $("#alasan")?.value.trim() || "",
      waktu: new Date().toISOString()
    });

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: data
    });

    // Simpan salinan lokal juga
    const entry = Object.fromEntries(data.entries());
    const old = JSON.parse(
      localStorage.getItem("smkn1-registrations") || "[]"
    );

    old.push(entry);
    localStorage.setItem(
      "smkn1-registrations",
      JSON.stringify(old)
    );

    if (successName) successName.textContent = name;

    modal?.classList.add("open");
    document.body.classList.add("modal-open");

    form.reset();
    $$(".field", form).forEach(field =>
      field.classList.remove("valid", "invalid")
    );

  } catch (error) {
    console.error("Gagal mengirim pendaftaran:", error);
    showToast("Gagal mengirim. Periksa koneksi internet.");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML =
        btn.dataset.old ||
        '<i class="fa-solid fa-paper-plane"></i> Kirim Pendaftaran';
    }
  }
});
```
