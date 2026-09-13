/**
 * Кнопки «Крок назад / Крок вперед» для редактора Tina.
 *
 * Tina сама умеет только Reset (сбросить всё). Здесь мы запоминаем снимки
 * значений каждой формы и откатываем их по одному. Набор текста группируется:
 * всё, что введено без паузы ~0.6 с, — один шаг.
 *
 * ВНИМАНИЕ: кнопки встраиваются в DOM админки рядом с Reset/Save. Это не
 * официальный API Tina — после обновления tinacms проверь, что кнопки на месте.
 */

type Values = Record<string, unknown>;

interface TinaForm {
  id: string;
  values?: Values;
  finalForm: {
    batch(fn: () => void): void;
    change(name: string, value: unknown): void;
  };
  subscribe(cb: (state: { values: Values }) => void, sub: { values: true }): () => void;
}

interface Cms {
  state?: { forms?: { tinaForm: TinaForm }[] };
}

interface Step {
  form: TinaForm;
  before: Values;
  after: Values;
}

const GROUP_MS = 600;
const MAX_STEPS = 100;

const clone = (v: Values): Values => JSON.parse(JSON.stringify(v ?? {}));
const same = (a: Values, b: Values) => JSON.stringify(a) === JSON.stringify(b);

export function setupUndoRedo(cms: Cms) {
  if (typeof window === "undefined") return;
  // Tina может вызвать cmsCallback несколько раз — ставим кнопки один раз.
  const w = window as Window & { __undoRedoCms?: Cms };
  if (w.__undoRedoCms) {
    w.__undoRedoCms = cms; // берём самый свежий экземпляр cms
    return;
  }
  w.__undoRedoCms = cms;
  const forms = () => w.__undoRedoCms?.state?.forms ?? [];

  const undoStack: Step[] = [];
  const redoStack: Step[] = [];
  const tracked = new Set<string>();
  /** Последнее «зафиксированное» состояние формы — от него считаем следующий шаг. */
  const committed = new Map<string, Values>();
  const pending = new Map<string, ReturnType<typeof setTimeout>>();
  let applying = false;

  const flush = (form: TinaForm) => {
    const timer = pending.get(form.id);
    if (timer) clearTimeout(timer);
    pending.delete(form.id);
    const before = committed.get(form.id);
    const after = clone(form.values ?? {});
    if (!before || same(before, after)) return;
    undoStack.push({ form, before, after });
    if (undoStack.length > MAX_STEPS) undoStack.shift();
    redoStack.length = 0;
    committed.set(form.id, after);
    render();
  };

  const flushAll = () => {
    for (const { tinaForm } of forms()) {
      if (pending.has(tinaForm.id)) flush(tinaForm);
    }
  };

  const track = (form: TinaForm) => {
    // Форма ещё грузится — подхватим на следующем тике, иначе загрузка станет «шагом».
    if (tracked.has(form.id) || !form.values) return;
    tracked.add(form.id);
    committed.set(form.id, clone(form.values ?? {}));
    let first = true;
    form.subscribe(
      () => {
        // final-form вызывает подписчика сразу при подписке — это не правка
        if (first) {
          first = false;
          return;
        }
        if (applying) return;
        const timer = pending.get(form.id);
        if (timer) clearTimeout(timer);
        pending.set(form.id, setTimeout(() => flush(form), GROUP_MS));
        render();
      },
      { values: true }
    );
  };

  const apply = (form: TinaForm, values: Values) => {
    applying = true;
    try {
      const current = form.values ?? {};
      const keys = new Set([...Object.keys(current), ...Object.keys(values)]);
      form.finalForm.batch(() => {
        for (const key of keys) form.finalForm.change(key, clone({ v: values[key] }).v);
      });
      committed.set(form.id, clone(values));
    } finally {
      // subscribe вызывается синхронно, но на всякий случай снимаем флаг после тика
      setTimeout(() => (applying = false), 0);
    }
  };

  const undo = () => {
    flushAll();
    const step = undoStack.pop();
    if (!step) return;
    apply(step.form, step.before);
    redoStack.push(step);
    render();
  };

  const redo = () => {
    flushAll();
    const step = redoStack.pop();
    if (!step) return;
    apply(step.form, step.after);
    undoStack.push(step);
    render();
  };

  // --- UI ---------------------------------------------------------------------

  const makeButton = (label: string, title: string, onClick: () => void) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.title = title;
    b.setAttribute("aria-label", title);
    b.style.cssText =
      "min-width:36px;height:36px;padding:0 10px;border-radius:9999px;border:1px solid #d1d5db;" +
      "background:#fff;color:#374151;font-size:18px;line-height:1;cursor:pointer;";
    b.addEventListener("click", onClick);
    return b;
  };

  const bar = document.createElement("div");
  bar.dataset.undoRedo = "";
  bar.style.cssText = "display:flex;gap:6px;margin-right:auto;";
  const undoBtn = makeButton("↶", "Крок назад (Ctrl+Z)", undo);
  const redoBtn = makeButton("↷", "Крок вперед (Ctrl+Shift+Z)", redo);
  bar.append(undoBtn, redoBtn);

  function render() {
    const canUndo = undoStack.length > 0 || pending.size > 0;
    const canRedo = redoStack.length > 0;
    for (const [btn, on] of [
      [undoBtn, canUndo],
      [redoBtn, canRedo],
    ] as const) {
      btn.disabled = !on;
      btn.style.opacity = on ? "1" : "0.4";
      btn.style.cursor = on ? "pointer" : "default";
    }
  }

  /** Кладём кнопки в тот же ряд, где Reset и Save. React может перерисовать ряд — возвращаем. */
  const mount = () => {
    const save = [...document.querySelectorAll("button")].find(
      (b) => b.textContent?.trim() === "Save"
    );
    const row = save?.parentElement;
    if (row && bar.parentElement !== row) row.prepend(bar);
  };

  // Горячие клавиши — только вне полей ввода, чтобы внутри поля работал обычный Ctrl+Z.
  document.addEventListener("keydown", (e) => {
    if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z") return;
    const el = document.activeElement;
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;
    if ((el as HTMLElement | null)?.isContentEditable) return;
    e.preventDefault();
    if (e.shiftKey) redo();
    else undo();
  });

  // Формы в Tina появляются динамически — просто периодически подхватываем новые.
  setInterval(() => {
    for (const { tinaForm } of forms()) track(tinaForm);
    mount();
  }, 500);
  render();
}
