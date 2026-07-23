(() => {
  const replacements = [
    ['special member functions', 'các hàm thành viên đặc biệt'],
    ['member initializer lists', 'các danh sách khởi tạo thành viên'],
    ['aggregate initializations', 'các phép khởi tạo tổng hợp'],
    ['function prototypes', 'các nguyên mẫu hàm'],
    ['constructor calls', 'các lời gọi constructor'],
    ['standalone functions', 'các hàm độc lập'],
    ['free functions', 'các hàm tự do'],
    ['binary operators', 'các toán tử hai ngôi'],
    ['unary operators', 'các toán tử một ngôi'],
    ['derived classes', 'các lớp dẫn xuất'],
    ['base classes', 'các lớp cơ sở'],
    ['child classes', 'các lớp con'],
    ['parent classes', 'các lớp cha'],
    ['class hierarchies', 'các hệ phân cấp class'],
    ['inherited constructors', 'các constructor kế thừa'],
    ['inherited members', 'các thành viên kế thừa'],
    ['inherited functions', 'các hàm kế thừa'],
    ['inherited variables', 'các biến kế thừa'],
    ['user-defined types', 'các kiểu tự định nghĩa'],
    ['built-in types', 'các kiểu có sẵn'],
    ['custom types', 'các kiểu tùy chỉnh'],
    ['data types', 'các kiểu dữ liệu'],
    ['data members', 'các thành viên dữ liệu'],
    ['member functions', 'các hàm thành viên'],
    ['class members', 'các thành viên của class'],
    ['class variables', 'các biến của class'],
    ['class functions', 'các hàm của class'],
    ['access specifiers', 'các bộ chỉ định truy cập'],
    ['access levels', 'các mức truy cập'],
    ['programming languages', 'các ngôn ngữ lập trình'],
    ['language standards', 'các chuẩn ngôn ngữ'],
    ['naming conventions', 'các quy ước đặt tên'],
    ['memory locations', 'các vị trí bộ nhớ'],
    ['functionalities', 'các chức năng'],
    ['implementations', 'các cách triển khai'],
    ['behaviors', 'các hành vi'],
    ['capabilities', 'các khả năng'],
    ['toolchains', 'các bộ công cụ'],
    ['ecosystems', 'các hệ sinh thái'],
    ['consumers', 'các bên sử dụng'],
    ['developers', 'các lập trình viên'],
    ['projects', 'các dự án'],
    ['systems', 'các hệ thống'],
    ['interfaces', 'các giao diện'],
    ['properties', 'các thuộc tính'],
    ['features', 'các tính năng'],
    ['contexts', 'các ngữ cảnh'],
    ['contracts', 'các cam kết'],
    ['outputs', 'các đầu ra'],
    ['inputs', 'các đầu vào'],
    ['keywords', 'các từ khóa'],
    ['expressions', 'các biểu thức'],
    ['statements', 'các câu lệnh'],
    ['parameters', 'các tham số'],
    ['arguments', 'các đối số'],
    ['variables', 'các biến'],
    ['functions', 'các hàm'],
    ['members', 'các thành viên'],
    ['objects', 'các đối tượng'],
    ['types', 'các kiểu'],
    ['operators', 'các toán tử'],
    ['scopes', 'các phạm vi'],
    ['compilers', 'các trình biên dịch'],
    ['methods', 'các phương thức'],
    ['resources', 'các tài nguyên'],
    ['integers', 'các số nguyên'],
    ['coordinates', 'các tọa độ'],
    ['containers', 'các vùng chứa']
  ];

  const seen = new WeakSet();

  function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function translate(text) {
    let output = text;
    for (const [from, to] of replacements) {
      output = output.replace(
        new RegExp(`(?<![\\w-])${escapeRegex(from)}(?![\\w-])`, 'gi'),
        match => match[0] === match[0].toUpperCase()
          ? to[0].toUpperCase() + to.slice(1)
          : to
      );
    }
    return output;
  }

  function process(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      if (seen.has(root) || root.parentElement?.closest('pre, code, script, style, textarea')) return;
      seen.add(root);
      root.data = translate(root.data);
      return;
    }
    if (!(root instanceof Element) && root !== document) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) process(walker.currentNode);
  }

  process(document);
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(process));
  }).observe(document.body, { childList: true, subtree: true });
})();
