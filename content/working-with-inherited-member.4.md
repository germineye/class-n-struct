

   Hãy xem shadowing ảnh hưởng thế nào đến variable access. `GetDamage()` nằm trong scope nào và truy cập variable `Damage` nào?

3. Code không hợp lệ và không compile.

   Không đúng. Code compile, nhưng behavior khác với điều có thể kỳ vọng vì hai variable cùng tên tồn tại ở hai scope.

## Shadow Inherited Function

Khi làm việc với inheritance, ta thường muốn thay đổi behavior của một hoặc nhiều inherited function.

Thông thường, việc này được thực hiện bằng cách định nghĩa function có cùng prototype với function đang inherit.

Dưới đây, ta cung cấp implementation riêng cho inherited function `Attack()`, cho phép behavior khác nhau theo subtype:

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

Tương tự variable, đây là một ví dụ khác của shadowing. Function bị shadow vẫn tồn tại trên base class. Tuy nhiên, với function, điều này hiếm khi gây vấn đề nghiêm trọng như với variable.

Ở phần sau, khóa học sẽ giới thiệu **polymorphism**, khái niệm xây dựng trên ý tưởng này để tạo thiết kế cực kỳ flexible và trực quan.

### Kiểm tra kiến thức: Shadow Inherited Function

Xét code sau:

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

1. Integer `10`.

   Hãy xem function trong derived class có thể thay đổi behavior thế nào. Chú ý conditional logic trong `MagicalSword::GetDamage()`.

2. Integer `20`.

   **Đúng.** Conditional logic trong `GetDamage()` của `MagicalSword` nhân đôi damage khi `isEnchanted` là `true`.

3. Code không hợp lệ và không compile.

   Không đúng. Code compile; hãy tập trung vào implementation `GetDamage()` trong class `MagicalSword`.

## Mở rộng Inherited Function

Mở rộng ý tưởng cung cấp replacement implementation cho inherited function, đôi khi ta muốn cách tiếp cận tinh tế hơn.

Ví dụ, inherited function có thể khá phức tạp; dưới đây độ phức tạp được mô phỏng bằng nhiều dòng log:

```cpp
#include <iostream>

class Monster {
public:
    void Attack() {
        std::cout << "\nMonster Attacking";
        std::cout << "\nPlaying Animation";
        std::cout << "\nPlaying Sound";
        std::cout << "\nUpdating UI";
        std::cout << "\nEven More Stuff";
    }
};

class Goblin : public Monster {
public:
    void Attack() {
        // ...?
    }
};

int main() {
    Goblin Bonker;
    Bonker.Attack();
}
```

Ta có thể muốn phiên bản function trong subclass vẫn làm mọi việc đó, chỉ thêm một chút behavior riêng.

Khi shadow inherited function, ta có thể gọi phiên bản inherited bằng tên base class và scope resolution operator `::`.

Cú pháp như sau:

```cpp
#include <iostream>

class Monster {
public:
    void Attack() {
        std::cout << "\nMonster Attacking";
        std::cout << "\nPlaying Animation";
        std::cout << "\nPlaying Sound";
        std::cout << "\nUpdating UI";
        std::cout << "\nEven More Stuff";
    }
};

class Goblin : public Monster {
public:
    void Attack() {
        Monster::Attack();
        std::cout << "\n\nand now some Goblin things";
    }
};
```

```text
Monster Attacking
Playing Animation
Playing Sound
Updating UI
Even More Stuff

and now some Goblin things
```

Ta không bị giới hạn chỉ dùng shadowed function theo cách này. Có thể xử lý chúng như function bình thường — gọi bất kỳ lúc nào và forward hoặc tính toán argument khi cần:

```cpp
void Attack(int Damage) {
    std::cout << "Some initial Goblin things";
    Monster::Attack(Damage);
    std::cout << "Some final Goblin things";
}

void BigAttack(int Damage) {
    if (isBigAttackReady) {
        Monster::Attack(Damage * 2);
        isBigAttackReady = false;
    } else {
        std::cout << "Not Ready!\n";
    }
}
```