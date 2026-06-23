/**
 * Отправка форм (заявка + отзыв) в Web3Forms через fetch,
 * без перезагрузки страницы. Показывает статус, чистит форму при успехе.
 */
const forms = document.querySelectorAll<HTMLFormElement>("form.w3form");

forms.forEach((form) => {
  const status = form.querySelector<HTMLElement>(".form-status");
  const button = form.querySelector<HTMLButtonElement>("button[type=submit]");
  const label = form.querySelector<HTMLElement>("[data-label]");
  const labelText = label?.textContent ?? "";

  // Живой фильтр телефона: не даём вводить буквы и прочий мусор —
  // разрешены только цифры, пробел, + ( ) -. Дублирует серверо-независимую
  // проверку pattern, но блокирует символы прямо при вводе.
  form.querySelectorAll<HTMLInputElement>('input[type="tel"]').forEach((tel) => {
    tel.addEventListener("input", () => {
      const cleaned = tel.value.replace(/[^\d\s+().-]/g, "");
      if (cleaned !== tel.value) tel.value = cleaned;
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!status || !button) return;

    button.disabled = true;
    status.classList.remove("hidden");
    status.textContent = status.dataset.sending ?? "Sending…";
    status.style.color = "";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        status.textContent = status.dataset.ok ?? "Sent!";
        status.style.color = "#7d8a6f";
        form.reset();
      } else {
        throw new Error(data.message ?? "error");
      }
    } catch {
      status.textContent = status.dataset.err ?? "Error";
      status.style.color = "#c0563b";
    } finally {
      button.disabled = false;
      if (label) label.textContent = labelText;
    }
  });
});
