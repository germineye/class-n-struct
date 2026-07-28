## Che khuất hàm kế thừa

Khi làm việc với inheritance, ta thường muốn thay đổi hành vi của một hoặc nhiều hàm kế thừa.

Thông thường, việc này được thực hiện bằng cách định nghĩa hàm có cùng nguyên mẫu với hàm đang kế thừa.

Dưới đây, lớp dẫn xuất định nghĩa lại hàm `Attack()` để mỗi kiểu con có hành vi riêng:

```cpp
#include <iostream>

class Monster {
public:
    void Attack() {
        std::cout << "Monster Attacking";
    }
};

class Goblin : public Monster {
public:
    void Attack() {
        std::cout << "Goblin Attacking";
    }
};

int main() {
    Goblin Bonker;
    Bonker.Attack();
}
```

```text
Goblin Attacking
```

Tương tự biến, đây là một ví dụ khác của che khuất. Hàm bị che khuất vẫn tồn tại trên lớp cơ sở. Tuy nhiên, với hàm, điều này hiếm khi gây vấn đề nghiêm trọng như với biến.

Ở phần sau, khóa học sẽ giới thiệu **polymorphism**, khái niệm phát triển từ ý tưởng này để tạo ra thiết kế linh hoạt và trực quan hơn.

### Kiểm tra kiến thức: Che khuất hàm kế thừa

Xét mã sau:

```cpp
class Weapon {
public:
    int GetDamage() const {
        return Damage;
    }

protected:
    int Damage{10};
};

class MagicalSword : public Weapon {
public:
    int GetDamage() const {
        return isEnchanted ? Damage * 2 : Damage;
    }

protected:
    bool isEnchanted{true};
};

int main() {
    MagicalSword SwordOfLight;
    int WeaponDamage{SwordOfLight.GetDamage()};
}
```

**Giá trị của `WeaponDamage` là gì?**

1. Số nguyên `10`.

   Hãy xem hàm trong lớp dẫn xuất có thể thay đổi hành vi thế nào. Chú ý logic điều kiện trong `MagicalSword::GetDamage()`.

2. Số nguyên `20`.

   **Đúng.** Logic điều kiện trong `GetDamage()` của `MagicalSword` nhân đôi damage khi `isEnchanted` là `true`.

3. Mã không hợp lệ nên biên dịch thất bại.

   Không đúng. Mã vẫn biên dịch; hãy xem kỹ phần định nghĩa `GetDamage()` trong class `MagicalSword`.
