(() => {
  const validLessons = ["classes", "encapsulation", "constructors", "structs", "operators", "bindings"];
  const lessons = [...document.querySelectorAll(".lesson")];
  const links = [...document.querySelectorAll(".lesson-link")];
  const progressBar = document.getElementById("progress-bar");
  const progressLabel = document.getElementById("progress-label");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuButton = document.querySelector(".menu-button");
  const tooltip = document.getElementById("tooltip");
  let activeTerm = null;

  function applyContentClarifications() {
    const destructorExplanation = document.querySelector(
      "#constructors > section:nth-of-type(6) > p:last-of-type"
    );

    if (destructorExplanation) {
      destructorExplanation.innerHTML =
        "<code>std::string</code> tự giải phóng vùng nhớ dùng để lưu chuỗi khi nó bị hủy. " +
        "<code>std::vector</code> tự hủy từng phần tử rồi giải phóng vùng nhớ của vector. " +
        "Khi một object <code>Monster</code> bị hủy, destructor mặc định do compiler tạo sẽ tự gọi destructor của từng data member, " +
        "nên nếu class chỉ chứa những kiểu tự dọn dẹp như vậy thì không cần viết destructor riêng. " +
        "Chỉ cần tự viết destructor khi class trực tiếp sở hữu một tài nguyên phải giải phóng thủ công, " +
        "chẳng hạn vùng nhớ cấp bằng <code>new</code>, file handle hoặc socket.";
    }

    const aggregateWarning = document.querySelector(
      "#structs > section:nth-of-type(4) .warning"
    );

    if (aggregateWarning) {
      aggregateWarning.innerHTML =
        "<strong>Giá trị được ghép theo vị trí.</strong>" +
        "<p>Trong <code>Vector3 Position{1.9F, 2.6F, 0.3F};</code>, compiler lấy " +
        "<code>1.9F</code> cho member được khai báo đầu tiên, <code>2.6F</code> cho member thứ hai " +
        "và <code>0.3F</code> cho member thứ ba. Compiler không nhìn tên <code>x</code>, <code>y</code>, <code>z</code> để đoán ý nghĩa. " +
        "Nếu đổi thứ tự khai báo từ <code>x, y, z</code> thành <code>z, y, x</code>, chính dòng khởi tạo đó sẽ tạo " +
        "<code>z = 1.9F</code>, <code>y = 2.6F</code>, <code>x = 0.3F</code>.</p>";
    }
  }

  function currentLessonId() {
    const id = window.location.hash.slice(1);
    return validLessons.includes(id) ? id : validLessons[0];
  }

  function showLesson(id, shouldScroll = true) {
    const safeId = validLessons.includes(id) ? id : validLessons[0];
    lessons.forEach((lesson) => {
      const isActive = lesson.id === safeId;
      lesson.hidden = !isActive;
      lesson.classList.toggle("active", isActive);
    });
    links.forEach((link) => {
      const isActive = link.dataset.lesson === safeId;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    const index = validLessons.indexOf(safeId) + 1;
    progressBar.style.width = `${(index / validLessons.length) * 100}%`;
    progressLabel.textContent = `Bài ${index} / ${validLessons.length}`;
    document.title = `${links[index - 1].textContent.trim()} — C++: Class và Struct`;
    closeMenu();
    hideTooltip();

    if (shouldScroll) {
      window.scrollTo({ top: 0, behavior: "auto" });
      document.getElementById("lesson-content").focus({ preventScroll: true });
    }
  }

  function closeMenu() {
    sidebar.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    overlay.hidden = true;
  }

  function toggleMenu() {
    const opening = !sidebar.classList.contains("open");
    sidebar.classList.toggle("open", opening);
    menuButton.setAttribute("aria-expanded", String(opening));
    overlay.hidden = !opening;
  }

  function positionTooltip(term) {
    const rect = term.getBoundingClientRect();
    const margin = 10;
    const tooltipRect = tooltip.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - tooltipRect.width - 12));
    let top = rect.bottom + margin;
    if (top + tooltipRect.height > window.innerHeight - 12) {
      top = rect.top - tooltipRect.height - margin;
    }
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${Math.max(12, top)}px`;
  }

  function showTooltip(term) {
    activeTerm = term;
    tooltip.textContent = term.dataset.definition;
    tooltip.setAttribute("aria-hidden", "false");
    tooltip.classList.add("visible");
    requestAnimationFrame(() => positionTooltip(term));
  }

  function hideTooltip() {
    activeTerm = null;
    tooltip.classList.remove("visible");
    tooltip.setAttribute("aria-hidden", "true");
  }

  links.forEach((link) => {
    link.addEventListener("click", () => showLesson(link.dataset.lesson));
  });

  document.querySelectorAll("[data-next]").forEach((link) => {
    link.addEventListener("click", () => showLesson(link.dataset.next));
  });

  document.querySelectorAll(".term").forEach((term) => {
    term.setAttribute("aria-describedby", "tooltip");
    term.addEventListener("mouseenter", () => showTooltip(term));
    term.addEventListener("mouseleave", hideTooltip);
    term.addEventListener("focus", () => showTooltip(term));
    term.addEventListener("blur", hideTooltip);
    term.addEventListener("click", (event) => {
      event.stopPropagation();
      if (activeTerm === term && tooltip.classList.contains("visible")) hideTooltip();
      else showTooltip(term);
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".term")) hideTooltip();
  });
  window.addEventListener("resize", () => activeTerm && positionTooltip(activeTerm));
  window.addEventListener("scroll", () => activeTerm && positionTooltip(activeTerm), { passive: true });

  document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.closest(".code-block").querySelector("code").innerText;
      const oldText = button.textContent;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Đã chép";
      } catch {
        button.textContent = "Không chép được";
      }
      window.setTimeout(() => { button.textContent = oldText; }, 1400);
    });
  });

  menuButton.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);
  window.addEventListener("hashchange", () => showLesson(currentLessonId()));

  applyContentClarifications();
  showLesson(currentLessonId(), false);
})();
