# Làm việc với thành viên kế thừa

Bài này đi sâu vào cách sử dụng được kế thừa phương thức và biến trong C++, gồm lời gọi constructor, sửa biến và hàm che khuất.

Trong các bài trước, ta đã tìm hiểu cách class kế thừa hàm và biến từ lớp cha hoặc lớp cơ sở. Tính năng mạnh mẽ này của lập trình hướng đối tượng cho phép xây dựng dựa trên mã đã có, tăng khả năng tái sử dụng và hiệu quả.

Trong bài này, ta sẽ học cách làm việc hiệu quả với thành viên kế thừa. Ta sẽ khai thác khả năng của chúng đồng thời tránh một số lỗi phổ biến dễ gây rắc rối.

Sau bài này, ta sẽ có nền tảng vững chắc về cách dùng thành viên kế thừa trong chương trình, chuẩn bị cho các chủ đề nâng cao hơn ở phần sau.

## Kế thừa constructor

Trước đây, ta đã thấy cách định nghĩa constructor cho class. Constructor cho phép truyền giá trị khi tạo đối tượng để kiểm soát cách đối tượng được khởi tạo.

Khi làm việc với inheritance, constructor có thêm một số đặc điểm cần lưu ý. Mặc định, constructor không được kế thừa bởi lớp dẫn xuất.

Dưới đây, class `Monster` có constructor nhận ba đối số `int`, nhưng constructor đó không tự động có sẵn trong lớp dẫn xuất `Goblin`:

```cpp
#include <iostream>

class Monster {
public:
    Monster() = default;

    Monster(int x, int y, int z) {
        std::cout << "Three integers\n";
    }
};

class Goblin : public Monster {};

int main() {
    Goblin Bonker{1, 2, 3};
}
```

```text
Error: no overloaded function could convert all the argument types
```

Để class kế thừa constructor của lớp cha, ta dùng cú pháp hơi lạ `using SomeType::SomeType`, trong đó `SomeType` là tên lớp cơ sở:

```cpp
#include <iostream>

class Monster {
public:
    Monster() = default;

    Monster(int x, int y, int z) {
        std::cout << "Three integers\n";
    }
};

class Goblin : public Monster {
public:
    using Monster::Monster;
};

int main() {
    Goblin Bonker{1, 2, 3};
}
```

```text
Three integers
```

Nếu lớp dẫn xuất có constructor với danh sách đối số trùng danh sách đối số của constructor của lớp cơ sở, câu lệnh `using BaseType::BaseType` sẽ ưu tiên phiên bản cụ thể hơn trong lớp dẫn xuất:

```cpp
#include <iostream>

class Monster {
public:
    Monster() = default;

    Monster(int x, int y) {
        std::cout << "Two integers\n";
    }

    Monster(int x, int y, int z) {
        std::cout << "Three integers\n";
    }
};

class Goblin : public Monster {
public:
    // Goblin đã có constructor (int, int, int),
    // nên using chỉ kế thừa constructor (int, int)
    using Monster::Monster;

    Goblin(int x, int y, int z) {
        std::cout << "I'll handle this one\n";
    }
};

int main() {
    // Dùng constructor của Monster
    Goblin Bonker{1, 2};

    // Dùng constructor của Goblin
    Goblin Basher{1, 2, 3};
}
```

```text
Two integers
I'll handle this one
```
