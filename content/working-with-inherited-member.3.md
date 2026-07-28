## Cập nhật biến kế thừa

Đôi khi ta muốn thay đổi giá trị của biến kế thừa nhưng không có constructor kế thừa cho phép đặt trực tiếp giá trị ban đầu.

Trong trường hợp đó, ta có thể để constructor của lớp cơ sở hoàn tất rồi thay đổi giá trị từ constructor của lớp dẫn xuất. Như mọi khi, để truy cập biến kế thừa, biến đó phải là `public` hoặc `protected` trong lớp cơ sở.

Trong ví dụ dưới đây, phần `Monster` được khởi tạo trước với `Health` bằng `100`; sau đó constructor của `Goblin` đổi giá trị này thành `150`:

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

### Thứ tự gọi constructor

Ví dụ trên có thể hoạt động nhờ thứ tự constructor được gọi trong inheritance. Cụ thể, constructor của lớp cơ sở được gọi trước.

Điều đó có nghĩa khi constructor của lớp dẫn xuất chạy, phần lớp cơ sở đã hoàn tất. Mọi biến kế thừa đã được thiết lập và sẵn sàng để sử dụng.

Ta có thể quan sát thứ tự này bằng trình gỡ lỗi hoặc đơn giản là xem đầu ra của chương trình sau:

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

### Lỗi phổ biến: Che khuất biến kế thừa

Một cách phổ biến mà người mới thử dùng để cập nhật biến kế thừa là đơn giản khai báo một biến cùng tên và kiểu trong lớp dẫn xuất:

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

Nhưng điều thực sự xảy ra là ta có hai biến cùng tên `Health` — một trong phạm vi của `Monster`, một trong phạm vi của `Goblin`.

Điều này rất giống khái niệm bị che khuất biến đã giới thiệu trong bài về phạm vi.

Ta có thể thấy cách làm này hỏng khi class phức tạp hơn một chút. Dưới đây, `Health` được chuyển vào vùng `private` và class `Monster` có getter mà `Goblin` kế thừa:

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

Nguyên nhân là `GetHealth()` được định nghĩa trong phạm vi của `Monster`, nên tên `Health` bên trong hàm trỏ đến `Monster::Health`, biến vẫn giữ giá trị `100`.

### Kiểm tra kiến thức: Biến kế thừa

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

1. Số nguyên `10`.

   Không đúng. Constructor `Sword` có thể truy cập thành viên protected `Damage` và nhân nó với `2`.

2. Số nguyên `20`.

   **Đúng.** `Damage` bắt đầu bằng `10`, rồi constructor `Sword` cập nhật thành `20`.

3. Mã không hợp lệ nên biên dịch thất bại.

   Không đúng. `Damage` là `protected`, nên lớp dẫn xuất `Sword` được phép truy cập.

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

1. Số nguyên `10`.

   **Đúng.** Dù đã đặt `Damage` của `Spear` thành `20`, hàm `GetDamage()` được định nghĩa trong phạm vi của `Weapon`, nên nó truy cập một biến khác: `Weapon::Damage`, vẫn bằng `10`.

2. Số nguyên `20`.

   Hãy xem che khuất ảnh hưởng thế nào đến biến truy cập. `GetDamage()` nằm trong phạm vi nào và truy cập biến `Damage` nào?

3. Mã không hợp lệ nên biên dịch thất bại.

   Không đúng. Mã vẫn biên dịch, nhưng kết quả dễ gây nhầm lẫn vì có hai biến cùng tên ở hai phạm vi khác nhau.
