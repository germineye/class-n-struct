(() => {
  const lessonIds = [
    "abstraction-and-class",
    "encapsulation-and-access-specifier",
    "constructor-and-destructor",
    "struct-and-aggregate-initialization",
    "operator-overloading",
    "structured-binding",
    "inheritance",
    "protected-member",
    "member-initializer-list",
    "working-with-inherited-member"
  ];
  const legacyHashes = {
    classes: lessonIds[0], encapsulation: lessonIds[1], constructors: lessonIds[2],
    structs: lessonIds[3], operators: lessonIds[4], bindings: lessonIds[5]
  };
  const lessons = [...document.querySelectorAll(".lesson")];
  const links = [...document.querySelectorAll(".lesson-link")];
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuButton = document.querySelector(".menu-button");
  const tooltip = document.getElementById("tooltip");
  const previous = document.getElementById("previous-lesson");
  const next = document.getElementById("next-lesson");
  const progressLabel = document.getElementById("progress-label");
  const progressBar = document.getElementById("progress-bar");
  let activeTerm = null;

  function resolveHash() {
    const raw = location.hash.slice(1);
    if (legacyHashes[raw]) {
      history.replaceState(null, "", `#${legacyHashes[raw]}`);
      return legacyHashes[raw];
    }
    return lessonIds.includes(raw) ? raw : lessonIds[0];
  }
  function closeMenu() {
    sidebar.classList.remove("open"); overlay.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
  }
  function showLesson(id) {
    const index = lessonIds.indexOf(id);
    lessons.forEach(x => { const on = x.id === id; x.hidden = !on; x.classList.toggle("active", on); });
    links.forEach(x => x.classList.toggle("active", x.dataset.lesson === id));
    progressLabel.textContent = `Bài ${index + 1} / ${lessonIds.length}`;
    progressBar.style.width = `${((index + 1) / lessonIds.length) * 100}%`;
    previous.hidden = index === 0;
    next.hidden = index === lessonIds.length - 1;
    if (index > 0) previous.href = `#${lessonIds[index - 1]}`;
    if (index < lessonIds.length - 1) next.href = `#${lessonIds[index + 1]}`;
    closeMenu(); hideTooltip(); window.scrollTo({ top: 0, behavior: "auto" });
  }
  function positionTooltip(term) {
    const r = term.getBoundingClientRect();
    const pad = 12;
    let left = Math.min(r.left, innerWidth - tooltip.offsetWidth - pad);
    left = Math.max(pad, left);
    let top = r.bottom + 10;
    if (top + tooltip.offsetHeight > innerHeight - pad) top = r.top - tooltip.offsetHeight - 10;
    tooltip.style.left = `${left}px`; tooltip.style.top = `${Math.max(pad, top)}px`;
  }
  function showTooltip(term) {
    activeTerm = term; tooltip.textContent = term.dataset.definition || "";
    tooltip.classList.add("visible"); tooltip.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => positionTooltip(term));
  }
  function hideTooltip() {
    activeTerm = null; tooltip.classList.remove("visible"); tooltip.setAttribute("aria-hidden", "true");
  }
  document.addEventListener("click", async event => {
    const copy = event.target.closest(".copy-button");
    if (copy) {
      const text = copy.closest(".code-block").querySelector("code").innerText;
      try { await navigator.clipboard.writeText(text); copy.textContent = "Đã chép"; }
      catch { copy.textContent = "Không thể chép"; }
      setTimeout(() => copy.textContent = "Sao chép", 1200); return;
    }
    const term = event.target.closest(".term");
    if (term) { activeTerm === term ? hideTooltip() : showTooltip(term); return; }
    if (!event.target.closest(".tooltip")) hideTooltip();
  });
  document.addEventListener("mouseover", e => { const term = e.target.closest(".term"); if (term && matchMedia("(hover:hover)").matches) showTooltip(term); });
  document.addEventListener("mouseout", e => { if (e.target.closest(".term") && matchMedia("(hover:hover)").matches) hideTooltip(); });
  document.addEventListener("focusin", e => { const term = e.target.closest(".term"); if (term) showTooltip(term); });
  document.addEventListener("focusout", e => { if (e.target.closest(".term")) hideTooltip(); });
  addEventListener("resize", () => { if (activeTerm) positionTooltip(activeTerm); if (innerWidth > 900) closeMenu(); });
  addEventListener("scroll", () => { if (activeTerm) hideTooltip(); }, { passive: true });
  addEventListener("hashchange", () => showLesson(resolveHash()));
  menuButton.addEventListener("click", () => {
    const open = !sidebar.classList.contains("open"); sidebar.classList.toggle("open", open);
    overlay.hidden = !open; menuButton.setAttribute("aria-expanded", String(open));
  });
  overlay.addEventListener("click", closeMenu);
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeMenu(); hideTooltip(); } });
  showLesson(resolveHash());
})();
