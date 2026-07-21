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

  function replaceConstructorsLesson() {
    const article = document.getElementById("constructors");
    if (!article) return;

    article.innerHTML = `
      <header class="lesson-header">
        <p class="lesson-number">BÀI 03</p>
        <h1 id="constructors-title"><span class="term" data-definition="Hàm thành viên đặc biệt tự chạy khi một object được tạo." tabindex="0">Constructor</span> và <span class="term" data-definition="Hàm thành viên đặc biệt tự chạy khi một object bị hủy." tabindex="0">Destructor</span></h1>
        <p class="lead">Constructor cho phép truyền giá trị ngay khi tạo object. Destructor tự chạy khi object bị hủy.</p>
      </header>

      <section>
        <h2>1. Constructor là gì?</h2>
        <p>Với kiểu có sẵn, ta có thể đặt giá trị ngay lúc khai báo:</p>
        <div class="code-block">
          <div class="code-toolbar"><span>cpp</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>int Health{100};
std::string Name{"Roderick"};</code></pre>
        </div>
        <p>Constructor cho phép class tự định nghĩa cách khởi tạo tương tự:</p>
        <div class="code-block">
          <div class="code-toolbar"><span>cpp</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>Monster Goblin{"Basher the Goblin"};</code></pre>
        </div>
        <p>Một constructor có hai đặc điểm:</p>
        <ul class="key-list">
          <li>Có cùng tên với class.</li>
          <li>Không có return type, kể cả <code>void</code>.</li>
        </ul>
        <div class="code-block">
          <div class="code-toolbar"><span>cpp</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>#include &lt;iostream&gt;

class Monster {
public:
    Monster() {
        std::cout &lt;&lt; "Ready for Battle!";
    }
};

int main() {
    Monster Goblin;
}</code></pre>
        </div>
        <p>Khi dòng <code>Monster Goblin;</code> chạy, constructor <code>Monster()</code> tự động được gọi. Trong phạm vi bài này, constructor nên nằm trong vùng <code>public</code> để code bên ngoài có thể tạo object.</p>
      </section>

      <section>
        <h2>2. Constructor parameter</h2>
        <p>Constructor nhận parameter giống function thông thường. Giá trị truyền vào thường được dùng để đặt data member của object.</p>
        <div class="code-block">
          <div class="code-toolbar"><span>cpp</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class Monster {
public:
    Monster(std::string Name) {
        mName = Name;
        std::cout &lt;&lt; mName &lt;&lt; " Ready for Battle!";
    }

private:
    std::string mName;
};

int main() {
    Monster Goblin{"Bonker"};
}</code></pre>
        </div>
        <p><code>"Bonker"</code> được truyền vào parameter <code>Name</code>, rồi gán cho data member <code>mName</code>.</p>
        <div class="notice">Tiền tố <code>m</code> trong <code>mName</code> là một naming convention thường dùng để phân biệt member của class với parameter. Đây chỉ là quy ước đặt tên, không phải cú pháp bắt buộc của C++.</div>
        <p>Constructor có thể nhận nhiều parameter:</p>
        <div class="code-block">
          <div class="code-toolbar"><span>cpp</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>class Monster {
public:
    Monster(std::string Name, int Health) {
        mName = Name;
        mHealth = Health;
    }

private:
    std::string mName;
    int mHealth;
};

Monster Goblin{"Bonker", 150};</code></pre>
        </div>
      </section>

      <section>
        <h2>3. Member initializer list</h2>
        <p>C++ có cú pháp riêng để khởi tạo data member, gọi là <span class="term" data-definition="Danh sách khởi tạo member nằm sau dấu hai chấm của constructor." tabindex="0">member initializer list</span>:</p>
        <div class="code-block">
          <div class="code-toolbar"><span>cpp</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>Monster(std::string Name, int Health)
    : mName{Name}, mHealth{Health} {
}</code></pre>
        </div>
        <p><code>mName{Name}</code> khởi tạo <code>mName</code> từ parameter <code>Name</code>; <code>mHealth{Health}</code> làm tương tự với <code>mHealth</code>. Bài gốc chỉ giới thiệu cú pháp này ở đây; lợi ích và quy tắc chi tiết được để cho bài nâng cao sau.</p>
      </section>

      <section>
        <h2>4. Nhiều constructor và default argument</h2>
        <p>Một class có thể có nhiều constructor, miễn là danh sách parameter của chúng khác nhau.</p>
        <div class="code-block">
          <div class="code-toolbar"><span>cpp</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>class Monster {
public:
    Monster(std::string Name) {
        mName = Name;
        mHealth = 150;
    }

    Monster(std::string Name, int Health) {
        mName = Name;
        mHealth = Health;
    }

private:
    std::string mName;
    int mHealth;
};

Monster Bonker{"Bonker"};
Monster Basher{"Basher", 250};</code></pre>
        </div>
        <p>Hai constructor trên có thể được rút gọn thành một constructor có <span class="term" data-definition="Giá trị được dùng khi lời gọi không truyền argument tương ứng." tabindex="0">default argument</span>:</p>
        <div class="code-block">
          <div class="code-toolbar"><span>cpp</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>Monster(std::string Name, int Health = 150) {
    mName = Name;
    mHealth = Health;
}</code></pre>
        </div>
        <ul class="key-list">
          <li><code>Monster{"Bonker"}</code> dùng <code>Health = 150</code>.</li>
          <li><code>Monster{"Basher", 250}</code> dùng giá trị <code>250</code> được truyền vào.</li>
        </ul>
      </section>

      <section>
        <h2>5. Tránh constructor bị ambiguous</h2>
        <p>Mỗi lời gọi tạo object phải chỉ khớp với một constructor. Hai constructor dưới đây không hợp lệ vì cả hai đều có cùng chữ ký <code>Monster(int)</code>:</p>
        <div class="code-block">
          <div class="code-toolbar"><span>cpp</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>class Monster {
public:
    Monster(int Level) {}
    Monster(int Health) {}
};</code></pre>
        </div>
        <p>Tên parameter <code>Level</code> và <code>Health</code> không giúp compiler phân biệt. Compiler chỉ nhìn số lượng và type của parameter.</p>
      </section>

      <section>
        <h2>6. Default constructor</h2>
        <p><span class="term" data-definition="Constructor có thể được gọi mà không truyền argument." tabindex="0">Default constructor</span> là constructor không cần argument.</p>
        <p>Nếu class không khai báo constructor nào, compiler thường tự tạo một default constructor cơ bản. Nhưng khi ta khai báo custom constructor, default constructor tự sinh đó không còn được cung cấp.</p>
        <div class="code-block">
          <div class="code-toolbar"><span>cpp</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>class Monster {
public:
    Monster() = default;

    Monster(std::string Name, int Health = 150) {
        mName = Name;
        mHealth = Health;
    }

private:
    std::string mName;
    int mHealth;
};

Monster UnknownMonster;
Monster Goblin{"Bonker"};</code></pre>
        </div>
        <p><code>= default</code> yêu cầu compiler cung cấp lại default constructor.</p>
      </section>

      <section>
        <h2>7. Tách declaration và definition</h2>
        <p>Constructor cũng có thể được khai báo trong class rồi định nghĩa bên ngoài bằng <code>::</code>:</p>
        <div class="code-block">
          <div class="code-toolbar"><span>cpp</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>class Monster {
public:
    Monster(int Health);

private:
    int mHealth{150};
};

Monster::Monster(int Health) {
    mHealth = Health;
}</code></pre>
        </div>
      </section>

      <section>
        <h2>8. Destructor</h2>
        <p>Destructor là một special member function tự động được gọi khi object bị hủy. Tên destructor là tên class có thêm dấu <code>~</code> ở đầu.</p>
        <div class="code-block">
          <div class="code-toolbar"><span>cpp</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>#include &lt;iostream&gt;

class Monster {
public:
    Monster() {
        std::cout &lt;&lt; "Monster Created\n";
    }

    ~Monster() {
        std::cout &lt;&lt; "Monster Destroyed\n";
    }
};

void SomeFunction() {
    Monster Goblin;
} // Goblin bị hủy khi function kết thúc

int main() {
    std::cout &lt;&lt; "Hello World\n";
    SomeFunction();
    std::cout &lt;&lt; "Goodbye!";
}</code></pre>
        </div>
        <div class="code-block">
          <div class="code-toolbar"><span>output</span><button class="copy-button" type="button">Sao chép</button></div>
<pre><code>Hello World
Monster Created
Monster Destroyed
Goodbye!</code></pre>
        </div>
        <p>Trong ví dụ này, <code>Goblin</code> được tạo bên trong <code>SomeFunction()</code> và tự động bị hủy khi function kết thúc. Bài này chỉ cần ghi nhớ thời điểm destructor được gọi; quản lý tài nguyên sẽ quan trọng hơn ở các phần nâng cao.</p>
      </section>

      <aside class="takeaway"><strong>Tóm lại</strong><p>Constructor chạy khi object được tạo và có thể nhận argument. Destructor chạy khi object bị hủy. Một lời gọi constructor phải khớp duy nhất một overload.</p></aside>
      <nav class="lesson-nav"><a href="#encapsulation" data-next="encapsulation">← Bài trước</a><a href="#structs" data-next="structs">Bài tiếp: Struct →</a></nav>
    `;
  }

  replaceConstructorsLesson();

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

  showLesson(currentLessonId(), false);
})();
