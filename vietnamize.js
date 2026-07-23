(() => {
  const phrases = [
    ['application programming interface', 'giao diện lập trình ứng dụng'],
    ['member initializer list', 'danh sách khởi tạo thành viên'],
    ['aggregate initialization', 'khởi tạo tổng hợp'],
    ['member access operator', 'toán tử truy cập thành viên'],
    ['scope resolution operator', 'toán tử phân giải phạm vi'],
    ['special member function', 'hàm thành viên đặc biệt'],
    ['class function prototype', 'nguyên mẫu hàm của class'],
    ['function prototype', 'nguyên mẫu hàm'],
    ['constructor body', 'thân constructor'],
    ['function body', 'thân hàm'],
    ['constructor call', 'lời gọi constructor'],
    ['argument list', 'danh sách đối số'],
    ['public interface', 'giao diện công khai'],
    ['standalone function', 'hàm độc lập'],
    ['free function', 'hàm tự do'],
    ['binary operator', 'toán tử hai ngôi'],
    ['unary operator', 'toán tử một ngôi'],
    ['left operand', 'toán hạng trái'],
    ['right operand', 'toán hạng phải'],
    ['derived class', 'lớp dẫn xuất'],
    ['base class', 'lớp cơ sở'],
    ['child class', 'lớp con'],
    ['parent class', 'lớp cha'],
    ['class hierarchy', 'hệ phân cấp class'],
    ['inherited constructor', 'constructor kế thừa'],
    ['inherited member', 'thành viên kế thừa'],
    ['inherited function', 'hàm kế thừa'],
    ['inherited variable', 'biến kế thừa'],
    ['user-defined type', 'kiểu tự định nghĩa'],
    ['built-in type', 'kiểu có sẵn'],
    ['custom type', 'kiểu tùy chỉnh'],
    ['data type', 'kiểu dữ liệu'],
    ['data member', 'thành viên dữ liệu'],
    ['member function', 'hàm thành viên'],
    ['class member', 'thành viên của class'],
    ['class variable', 'biến của class'],
    ['class function', 'hàm của class'],
    ['access specifier', 'bộ chỉ định truy cập'],
    ['access level', 'mức truy cập'],
    ['access restriction', 'hạn chế truy cập'],
    ['pass by reference', 'truyền tham chiếu'],
    ['pass by value', 'truyền giá trị'],
    ['programming language', 'ngôn ngữ lập trình'],
    ['language standard', 'chuẩn ngôn ngữ'],
    ['code readability', 'độ dễ đọc của mã'],
    ['naming convention', 'quy ước đặt tên'],
    ['memory location', 'vị trí bộ nhớ'],
    ['operator overloading', 'nạp chồng toán tử'],
    ['object composition', 'kết hợp đối tượng'],
    ['class invariant', 'bất biến của class'],
    ['conditional logic', 'logic điều kiện'],
    ['game engine', 'công cụ phát triển trò chơi'],
    ['forward declaration', 'khai báo trước'],
    ['functionality', 'chức năng'],
    ['implementation', 'cách triển khai'],
    ['performance', 'hiệu năng'],
    ['behavior', 'hành vi'],
    ['capability', 'khả năng'],
    ['toolchain', 'bộ công cụ'],
    ['ecosystem', 'hệ sinh thái'],
    ['consumer', 'bên sử dụng'],
    ['developer', 'lập trình viên'],
    ['project', 'dự án'],
    ['system', 'hệ thống'],
    ['interface', 'giao diện'],
    ['property', 'thuộc tính'],
    ['feature', 'tính năng'],
    ['context', 'ngữ cảnh'],
    ['contract', 'cam kết'],
    ['refactoring', 'tái cấu trúc'],
    ['output', 'đầu ra'],
    ['input', 'đầu vào'],
    ['keyword', 'từ khóa'],
    ['expression', 'biểu thức'],
    ['statement', 'câu lệnh'],
    ['parameter', 'tham số'],
    ['argument', 'đối số'],
    ['variable', 'biến'],
    ['function', 'hàm'],
    ['member', 'thành viên'],
    ['object', 'đối tượng'],
    ['type', 'kiểu'],
    ['operator', 'toán tử'],
    ['scope', 'phạm vi'],
    ['compiler', 'trình biên dịch'],
    ['compile', 'biên dịch'],
    ['method', 'phương thức'],
    ['visibility', 'khả năng truy cập'],
    ['memory', 'bộ nhớ'],
    ['resource', 'tài nguyên'],
    ['integer', 'số nguyên'],
    ['boolean', 'logic'],
    ['coordinate', 'tọa độ'],
    ['container', 'vùng chứa'],
    ['direction', 'hướng'],
    ['flexibility', 'tính linh hoạt'],
    ['optional', 'tùy chọn'],
    ['summary', 'tóm tắt']
  ];

  const exact = new Map([
    ['Encapsulation và Access Specifier', 'Encapsulation và Bộ chỉ định truy cập'],
    ['Struct và Aggregate Initialization', 'Struct và Khởi tạo tổng hợp'],
    ['Operator Overloading', 'Nạp chồng toán tử'],
    ['Protected Member', 'Thành viên protected'],
    ['Member Initializer List', 'Danh sách khởi tạo thành viên'],
    ['Làm việc với Inherited Member', 'Làm việc với thành viên kế thừa'],
    ['Class Function Prototype', 'Nguyên mẫu hàm của class'],
    ['Ambiguous Constructor Call', 'Lời gọi constructor mơ hồ'],
    ['Parent, Child, Subclass và Base Class', 'Lớp cha, lớp con, lớp dẫn xuất và lớp cơ sở'],
    ['C++ Language Standard', 'Chuẩn ngôn ngữ C++'],
    ['Variable được ghép theo Position, không theo Name', 'Biến được ghép theo vị trí, không theo tên'],
    ['Inherit Constructor', 'Kế thừa constructor'],
    ['Gọi Inherited Constructor', 'Gọi constructor kế thừa'],
    ['Shadow Inherited Variable', 'Che khuất biến kế thừa'],
    ['Shadow Inherited Function', 'Che khuất hàm kế thừa'],
    ['Mở rộng Inherited Function', 'Mở rộng hàm kế thừa']
  ]);

  const processedText = new WeakSet();
  const processedElements = new WeakSet();

  function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function replaceWord(text, from, to) {
    const pattern = new RegExp(`(?<![\\w-])${escapeRegex(from)}(?![\\w-])`, 'gi');
    return text.replace(pattern, match => {
      if (match[0] === match[0].toUpperCase()) {
        return to[0].toUpperCase() + to.slice(1);
      }
      return to;
    });
  }

  function translate(text) {
    let output = text;
    for (const [from, to] of exact) output = output.split(from).join(to);
    for (const [from, to] of phrases) output = replaceWord(output, from, to);
    return output
      .replaceAll('Private thành viên', 'Thành viên private')
      .replaceAll('Public thành viên', 'Thành viên public')
      .replaceAll('Protected thành viên', 'Thành viên protected')
      .replaceAll('private thành viên', 'thành viên private')
      .replaceAll('public thành viên', 'thành viên public')
      .replaceAll('protected thành viên', 'thành viên protected')
      .replaceAll('Unreal công cụ phát triển trò chơi', 'Unreal Engine');
  }

  function shouldSkip(node) {
    const parent = node.parentElement;
    return !parent || Boolean(parent.closest('pre, code, script, style, textarea'));
  }

  function processTextNode(node) {
    if (processedText.has(node) || shouldSkip(node)) return;
    processedText.add(node);
    node.data = translate(node.data);
  }

  function processElement(element) {
    if (!(element instanceof Element) || processedElements.has(element)) return;
    processedElements.add(element);

    if (element.dataset.definition) {
      element.dataset.definition = translate(element.dataset.definition);
    }
    if (element.hasAttribute('alt')) {
      element.setAttribute('alt', translate(element.getAttribute('alt')));
    }
    if (element.hasAttribute('aria-label')) {
      element.setAttribute('aria-label', translate(element.getAttribute('aria-label')));
    }
  }

  function process(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      processTextNode(root);
      return;
    }
    if (!(root instanceof Element) && root !== document) return;

    if (root instanceof Element) processElement(root);

    const textWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (textWalker.nextNode()) processTextNode(textWalker.currentNode);

    const elements = root.querySelectorAll?.('[data-definition], [alt], [aria-label]') || [];
    elements.forEach(processElement);
  }

  function updateTitle() {
    document.title = translate(document.title);
  }

  const observer = new MutationObserver(records => {
    for (const record of records) {
      record.addedNodes.forEach(process);
    }
    updateTitle();
  });

  process(document);
  updateTitle();
  observer.observe(document.body, { childList: true, subtree: true });
  addEventListener('hashchange', () => queueMicrotask(updateTitle));
})();
