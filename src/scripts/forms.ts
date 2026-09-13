/**
 * Отправка формы записи в Web3Forms через fetch, без перезагрузки страницы.
 * Показывает статус, чистит форму при успехе.
 *
 * Обработчики висят на document (делегирование): в редакторе Tina секция
 * контактов перерисовывается целиком, и обработчики на самой форме бы терялись.
 */
const inEditor = window.self !== window.top;

// Живой фильтр телефона: не даём вводить буквы и прочий мусор —
// разрешены только цифры, пробел, + ( ) -. Дублирует серверо-независимую
// проверку pattern, но блокирует символы прямо при вводе.
document.addEventListener("input", (e) => {
  const tel = e.target;
  if (!(tel instanceof HTMLInputElement) || tel.type !== "tel" || !tel.closest("form.w3form")) return;
  const cleaned = tel.value.replace(/[^\d\s+().-]/g, "");
  if (cleaned !== tel.value) tel.value = cleaned;
});

document.addEventListener("submit", async (e) => {
  const form = e.target;
  if (!(form instanceof HTMLFormElement) || !form.matches("form.w3form")) return;
  e.preventDefault();

  const status = form.querySelector<HTMLElement>(".form-status");
  const button = form.querySelector<HTMLButtonElement>("button[type=submit]");
  if (!status || !button) return;

  // В редакторе не шлём настоящие заявки заказчице на почту.
  if (inEditor) {
    status.classList.remove("hidden");
    status.textContent = "Preview mode — the form is not sent.";
    return;
  }

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
  }
});
