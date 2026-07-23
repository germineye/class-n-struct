# Làm việc với Inherited Member

Bài này đi sâu vào cách sử dụng inherited method và variable trong C++, gồm constructor call, sửa variable và function shadowing.

Trong các bài trước, ta đã tìm hiểu cách class inherit function và variable từ parent hoặc base class. Feature mạnh mẽ này của lập trình hướng đối tượng cho phép xây dựng dựa trên code đã có, tăng khả năng tái sử dụng và hiệu quả.

Trong bài này, ta sẽ học cách làm việc hiệu quả với inherited member. Ta sẽ khai thác khả năng của chúng đồng thời tránh một số lỗi phổ biến dễ gây rắc rối.

Sau bài này, ta sẽ có nền tảng vững chắc về cách dùng inherited member trong chương trình, chuẩn bị cho các chủ đề nâng cao hơn ở phần sau.

## Inherit Constructor

Trước đây, ta đã thấy cách định nghĩa constructor cho class. Constructor cho phép truyền giá trị khi tạo object để kiểm soát cách object được khởi tạo.

Khi làm việc với inheritance, constructor có thêm một số đặc điểm cần lưu ý. Mặc định, constructor không được inherit bởi derived class.

Dưới đây, class `Monster` có constructor nhận ba argument `int`, nhưng constructor đó không tự động có sẵn trong derived class `Goblin`:

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

Để class inherit constructor của parent, ta dùng cú pháp hơi lạ `using SomeType::SomeType`, trong đó `SomeType` là tên base class:

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

Nếu derived class có constructor với danh sách argument trùng danh sách argument của base constructor, instruction `using BaseType::BaseType` sẽ ưu tiên phiên bản cụ thể hơn trong derived class:

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
    // nên using chỉ inherit constructor (int, int)
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

## Gọi Inherited Constructor

Mọi thứ phức tạp hơn một chút khi base class có variable cần khởi tạo. Constructor của derived class cũng cần khởi tạo variable thuộc base class.

Cách đơn giản nhất là gọi constructor nằm trong class mà ta inherit. Nếu không can thiệp, default constructor sẽ được dùng xuyên suốt toàn bộ inheritance hierarchy:

```cpp
#include <iostream>

class Monster {
public:
    Monster() {
        std::cout << "Default Constructing Monster";
    }
};

class Goblin : public Monster {
public:
    Goblin() {
        std::cout << "\nDefault Constructing Goblin";
    }
};

int main() {
    Goblin Bonker;
}
```

```text
Default Constructing Monster
Default Constructing Goblin
```

Bên trong bất kỳ constructor nào của derived class, ta có thể chỉ định rõ base constructor muốn dùng.

Nơi duy nhất có thể gọi inherited constructor là member initializer list. Chương trình sau tái tạo behavior trước, nhưng constructor `Goblin` giờ gọi rõ default constructor của `Monster`:

```cpp
#include <iostream>

class Monster {
public:
    Monster() {
        std::cout << "Default Constructing Monster";
    }
};

class Goblin : public Monster {
public:
    Goblin() : Monster{} {
        std::cout << "\nDefault Constructing Goblin";
    }
};

int main() {
    Goblin Bonker;
}
```

```text
Default Constructing Monster
Default Constructing Goblin
```