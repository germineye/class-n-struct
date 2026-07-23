(() => {
  const originalFetch = window.fetch.bind(window);
  const lessonIds = new Set([
    'abstraction-and-class',
    'encapsulation-and-access-specifier',
    'constructor-and-destructor',
    'struct-and-aggregate-initialization',
    'operator-overloading',
    'structured-binding',
    'inheritance',
    'protected-member',
    'member-initializer-list',
    'working-with-inherited-member'
  ]);

  let bundlePromise;

  async function loadBundle() {
    if (!bundlePromise) {
      bundlePromise = Promise.all(
        [1, 2, 3].map(part =>
          originalFetch(`content/lessons-gzip-${part}.b64`).then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
          })
        )
      ).then(async parts => {
        const encoded = parts.join('');
        const compressed = Uint8Array.from(atob(encoded), char => char.charCodeAt(0));
        const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'));
        return JSON.parse(await new Response(stream).text());
      });
    }
    return bundlePromise;
  }

  window.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input.url;
    const match = url.match(/^content\/(.+)\.(\d+)\.md$/);

    if (!match || !lessonIds.has(match[1])) {
      return originalFetch(input, init);
    }

    const [, lessonId, part] = match;
    const bundle = await loadBundle();
    const body = part === '1' ? bundle[lessonId] : '';
    return new Response(body, {
      status: 200,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
    });
  };

  const definitions = {
    abstraction: 'Khái quát hóa các đối tượng cụ thể thành nhóm dựa trên đặc điểm chung.',
    class: 'Khuôn mẫu định nghĩa dữ liệu và hành vi chung cho các đối tượng.',
    struct: 'Kiểu tổng hợp tương tự class nhưng thành viên mặc định là public.',
    constructor: 'Hàm thành viên đặc biệt tự chạy khi đối tượng được tạo.',
    destructor: 'Hàm thành viên đặc biệt tự chạy khi đối tượng bị hủy.',
    encapsulation: 'Gom dữ liệu và hàm liên quan vào đối tượng, đồng thời kiểm soát quyền truy cập.',
    inheritance: 'Cơ chế cho phép class nhận lại thành viên từ lớp cơ sở.',
    polymorphism: 'Khả năng dùng một giao diện chung cho nhiều kiểu có hành vi khác nhau.',
    instance: 'Một đối tượng cụ thể được tạo từ class.',
    instantiation: 'Quá trình tạo một đối tượng cụ thể từ class.',
    public: 'Mức truy cập cho phép mã bên ngoài class truy cập.',
    private: 'Mức truy cập chỉ cho phép chính class truy cập trực tiếp.',
    protected: 'Mức truy cập cho phép class và các lớp dẫn xuất truy cập.',
    getter: 'Hàm public dùng để đọc dữ liệu được che giấu.',
    setter: 'Hàm public dùng để cập nhật dữ liệu theo quy tắc của class.',
    'structured binding': 'Cú pháp C++17 dùng để tách các thành phần của đối tượng thành nhiều biến.',
    'operator overloading': 'Cơ chế định nghĩa cách toán tử hoạt động với kiểu tự định nghĩa.',
    'member initializer list': 'Cú pháp khởi tạo trực tiếp thành viên trước khi thân constructor chạy.'
  };

  function refineLesson(article) {
    if (article.dataset.polished === 'true') return;
    article.dataset.polished = 'true';

    article.querySelectorAll('.takeaway p strong, .takeaway li strong').forEach(strong => {
      strong.replaceWith(...strong.childNodes);
    });

    const seen = new Set();
    article.querySelectorAll('.term').forEach(term => {
      if (term.closest('.takeaway, h1, h2, h3, ol')) {
        term.replaceWith(...term.childNodes);
        return;
      }

      const key = term.textContent.trim().toLowerCase();
      if (seen.has(key)) {
        term.replaceWith(...term.childNodes);
        return;
      }

      seen.add(key);
      if (definitions[key]) term.dataset.definition = definitions[key];
    });
  }

  const slot = document.getElementById('lesson-slot');
  if (!slot) return;

  new MutationObserver(() => {
    const article = slot.querySelector('.lesson');
    if (article) refineLesson(article);
  }).observe(slot, { childList: true, subtree: true });
})();
