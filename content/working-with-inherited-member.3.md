

Trong trường hợp đó, ta có thể để base constructor hoàn tất rồi thay đổi giá trị từ derived constructor. Như mọi khi, để truy cập inherited variable, variable đó phải là `public` hoặc `protected` trong base class.

Dưới đây, object `Monster` được default construct với `Health` bằng `100`. Nhưng nếu đang tạo `Goblin`, constructor của type đó cập nhật giá trị thành `150`:

```cpp
#include <iostream>

class Monster {
public:
    int Health{100};
};

class Goblin : public Monster {
public:
    Goblin() {
        Health = 150;
    }
};

int main() {
    Goblin Bonker;
    std::cout << "Health: " << Bonker.Health;
}
```

```text
Health: 150
```

### Thứ tự Constructor Call

Ví dụ trên có thể hoạt động nhờ thứ tự constructor được gọi trong inheritance. Cụ thể, base constructor được gọi trước.

Điều đó có nghĩa khi constructor của derived class chạy, phần base đã hoàn tất. Mọi inherited variable đã được thiết lập và sẵn sàng để sử dụng.

Ta có thể quan sát sequence này bằng debugger hoặc xem output của chương trình sau:

```cpp
#include <iostream>

class Actor {
public:
    Actor() {
        std::cout << "Actor Constructor\n";
    }
};

class Monster : public Actor {
public:
    Monster() {
        std::cout << "Monster Constructor\n";
    }
};

class Goblin : public Monster {
public:
    Goblin() {
        std::cout << "Goblin Constructor\n";
    }
};

int main() {
    Goblin Bonker;
}
```

```text
Actor Constructor
Monster Constructor
Goblin Constructor
```

### Lỗi phổ biến: Shadow Inherited Variable

Một cách phổ biến mà người mới thử dùng để cập nhật inherited variable là đơn giản khai báo một variable cùng tên và type trong derived class:

```cpp
#include <iostream>

class Monster {
public:
    int Health{100};
};

class Goblin : public Monster {
public:
    int Health{150};
};

int main() {
    Goblin Bonker;
    std::cout << "Health: " << Bonker.Health;
}
```

Trong một số trường hợp như ví dụ trên, cách này thậm chí trông có vẻ hoạt động:

```text
Health: 150
```

Nhưng điều thực sự xảy ra là ta có hai variable cùng tên `Health` — một trong scope của `Monster`, một trong scope của `Goblin`.

Điều này rất giống khái niệm shadowed variable đã giới thiệu trong bài về scope.

Ta có thể thấy cách làm này hỏng khi class phức tạp hơn một chút. Dưới đây, `Health` được chuyển vào vùng `private` và class `Monster` có getter mà `Goblin` inherit:

```cpp
#include <iostream>

class Monster {
public:
    int GetHealth() const {
        return Health;
    }

private:
    int Health{100};
};

class Goblin : public Monster {
    int Health{150};
};

int main() {
    Goblin Bonker;
    std::cout << "Health: " << Bonker.GetHealth();
}
```

Bây giờ ta thấy giá trị `Health` được lấy từ class `Monster`, không phải class `Goblin`:

```text
Health: 100
```

Lý do là ta gọi `GetHealth()`, function được định nghĩa trong scope của `Monster`. Trong scope đó, `Health` chỉ variable có giá trị `100`.

### Kiểm tra kiến thức: Inherited Variable

Xét chương trình sau:

```cpp
class Weapon {
public:
    int GetDamage() const {
        return Damage;
    }

protected:
    int Damage{10};
};

class Sword : public Weapon {
public:
    Sword() {
        Damage *= 2;
    }
};

int main() {
    Sword IronSword;
    int WeaponDamage{IronSword.GetDamage()};
}
```

**Giá trị của `WeaponDamage` là gì?**

1. Integer `10`.

   Không đúng. Constructor `Sword` có thể truy cập protected member `Damage` và nhân nó với `2`.

2. Integer `20`.

   **Đúng.** `Damage` bắt đầu bằng `10`, rồi constructor `Sword` cập nhật thành `20`.

3. Code không hợp lệ và không compile.

   Không đúng. `Damage` là `protected`, nên derived class `Sword` được phép truy cập.

Xét chương trình sau:

```cpp
class Weapon {
public:
    int GetDamage() const {
        return Damage;
    }

    int Damage{10};
};

class Spear : public Weapon {
public:
    int Damage;
};

int main() {
    Spear IronSpear;
    IronSpear.Damage = 20;
    int WeaponDamage{IronSpear.GetDamage()};
}
```

**Giá trị của `WeaponDamage` là gì?**

1. Integer `10`.

   **Đúng.** Dù đã đặt `Damage` của `Spear` thành `20`, function `GetDamage()` được định nghĩa trong scope của `Weapon`, nên nó truy cập một variable khác: `Weapon::Damage`, vẫn bằng `10`.

2. Integer `20`.