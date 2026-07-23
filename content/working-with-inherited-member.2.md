

Nếu inherited type không có default constructor và ta không chỉ định alternative nào, ta sẽ không thể tạo object bằng derived class.

Để kiểm soát inherited constructor được gọi, ta truyền argument trong expression `Monster{}` ở member initializer list.

Compiler dùng các argument này để quyết định constructor nào được gọi, giống như khi construct object ở mọi context khác.

Dưới đây, ta xóa default constructor của `Monster` và thay bằng constructor nhận một `int`.

Sau đó, trong member initializer list của default constructor `Goblin`, ta truyền `int` đó:

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

Đương nhiên, ta có thể dùng expression trong quá trình này, gồm cả parameter. Trong ví dụ sau, ta xóa default constructor của `Goblin` và thay bằng constructor nhận một `int`.

Sau đó, ta forward `int` đó đến constructor `Monster` từ member initializer list:

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

Cuối cùng, hãy xem ví dụ phức tạp hơn một chút. Constructor `Goblin` được cập nhật để nhận hai integer.

Argument đầu tiên được forward đến constructor `Monster` để đặt inherited member `mHealth`.

Argument thứ hai dùng để đặt `mDamage`, một variable riêng của type `Goblin`:

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

### Kiểm tra kiến thức: Inherited Constructor

Xét code sau:

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

**Khi tạo object `Sword`, giá trị của variable `mDamage` là gì?**

1. `mDamage` không được khởi tạo nên có giá trị mặc định `0`.

   Chưa đúng. Hãy xem member initializer list trong constructor `Sword` để tìm giá trị được truyền đến constructor `Weapon`.

2. Integer `20`.

   **Đúng.** Constructor `Sword` gọi rõ constructor `Weapon` với giá trị `20` trong member initializer list.

3. Code không hợp lệ vì `mDamage` là private nên không thể truy cập từ class `Sword`.

   Trong trường hợp này, class `Sword` gọi public constructor của `Weapon`. Constructor `Weapon` có thể truy cập variable của chính `Weapon`, kể cả khi chúng là `private`.

## Cập nhật Inherited Variable

Đôi khi ta muốn thay đổi giá trị của inherited variable nhưng không có inherited constructor cho phép đặt trực tiếp giá trị ban đầu.