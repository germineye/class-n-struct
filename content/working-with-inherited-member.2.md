## Gọi constructor kế thừa

Mọi thứ phức tạp hơn một chút khi lớp cơ sở có biến cần khởi tạo. Constructor của lớp dẫn xuất cũng cần khởi tạo biến thuộc lớp cơ sở.

Cách đơn giản nhất là để constructor của lớp cơ sở tự chạy. Nếu ta không chỉ định gì thêm, mỗi lớp trong chuỗi kế thừa sẽ gọi constructor mặc định của lớp cơ sở trực tiếp:

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

Bên trong bất kỳ constructor nào của lớp dẫn xuất, ta có thể chỉ định rõ constructor của lớp cơ sở muốn dùng.

Constructor của lớp cơ sở chỉ có thể được chọn trong danh sách khởi tạo thành viên. Ví dụ sau cho kết quả như trước, nhưng constructor `Goblin` đã gọi tường minh constructor mặc định của `Monster`:

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

Nếu lớp cơ sở không có constructor mặc định và lớp dẫn xuất không chỉ định một constructor khác, đối tượng của lớp dẫn xuất sẽ không thể được tạo.

Để kiểm soát constructor kế thừa được gọi, ta truyền đối số trong biểu thức `Monster{}` ở danh sách khởi tạo thành viên.

Trình biên dịch dùng các đối số này để quyết định constructor nào được gọi, giống như khi khởi tạo đối tượng ở mọi ngữ cảnh khác.

Dưới đây, ta xóa constructor mặc định của `Monster` và thay bằng constructor nhận một `int`.

Sau đó, trong danh sách khởi tạo thành viên của constructor mặc định `Goblin`, ta truyền `int` đó:

```cpp
#include <iostream>

class Monster {
public:
    Monster(int Health) : mHealth{Health} {
        std::cout << "Constructing Monster with an int";
    }

    int GetHealth() const {
        return mHealth;
    }

private:
    int mHealth{100};
};

class Goblin : public Monster {
public:
    Goblin() : Monster{150} {
        std::cout << "\nDefault Constructing Goblin";
    }
};

int main() {
    Goblin Bonker;
    std::cout << "\nHealth: " << Bonker.GetHealth();
}
```

```text
Constructing Monster with an int
Default Constructing Goblin
Health: 150
```

Đương nhiên, ta có thể dùng biểu thức trong quá trình này, gồm cả tham số. Trong ví dụ sau, ta xóa constructor mặc định của `Goblin` và thay bằng constructor nhận một `int`.

Sau đó, ta chuyển tiếp `int` đó đến constructor `Monster` từ danh sách khởi tạo thành viên:

```cpp
#include <iostream>

class Monster {
public:
    Monster(int Health) : mHealth{Health} {
        std::cout << "Constructing Monster with an int";
    }

    int GetHealth() const {
        return mHealth;
    }

private:
    int mHealth{100};
};

class Goblin : public Monster {
public:
    Goblin(int Health) : Monster{Health} {
        std::cout << "\nConstructing Goblin with an int";
    }
};

int main() {
    Goblin Bonker{200};
    std::cout << "\nHealth: " << Bonker.GetHealth();
}
```

```text
Constructing Monster with an int
Constructing Goblin with an int
Health: 200
```

Cuối cùng, hãy xem ví dụ phức tạp hơn một chút. Constructor `Goblin` được cập nhật để nhận hai số nguyên.

Đối số đầu tiên được chuyển tiếp đến constructor `Monster` để đặt thành viên kế thừa `mHealth`.

Đối số thứ hai dùng để đặt `mDamage`, một biến riêng của kiểu `Goblin`:

```cpp
#include <iostream>

class Monster {
public:
    Monster(int Health) : mHealth{Health} {
        std::cout << "Constructing Monster with an int";
    }

    int GetHealth() const {
        return mHealth;
    }

private:
    int mHealth{100};
};

class Goblin : public Monster {
public:
    Goblin(int Health, int Damage)
        : Monster{Health}, mDamage{Damage} {
        std::cout << "\nConstructing Goblin with two ints";
    }

    int GetDamage() const {
        return mDamage;
    }

private:
    int mDamage;
};

int main() {
    Goblin Bonker{200, 15};
    std::cout << "\nHealth: " << Bonker.GetHealth()
              << "\nDamage: " << Bonker.GetDamage();
}
```

```text
Constructing Monster with an int
Constructing Goblin with two ints
Health: 200
Damage: 15
```

### Kiểm tra kiến thức: Constructor kế thừa

Xét mã sau:

```cpp
class Weapon {
public:
    Weapon(int Damage) : mDamage{Damage} {}

private:
    int mDamage;
};

class Sword : public Weapon {
public:
    Sword() : Weapon{20} {}
};
```

**Khi tạo đối tượng `Sword`, giá trị của biến `mDamage` là gì?**

1. `mDamage` không được khởi tạo nên có giá trị mặc định `0`.

   Chưa đúng. Hãy xem danh sách khởi tạo thành viên trong constructor `Sword` để tìm giá trị được truyền đến constructor `Weapon`.

2. Số nguyên `20`.

   **Đúng.** Trong danh sách khởi tạo thành viên, constructor `Sword` gọi tường minh constructor `Weapon` với giá trị `20`.

3. Mã không hợp lệ vì `mDamage` là private nên không thể truy cập từ class `Sword`.

   Trong trường hợp này, `Sword` gọi constructor `public` của `Weapon`. Bản thân constructor `Weapon` vẫn được phép truy cập các biến `private` của class đó.
