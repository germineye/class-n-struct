

```cpp
#include <iostream>

class Monster {
public:
    int GetHealth() const {
        return Health;
    }

private:
    int Health{150};
};

int main() {
    Monster Goblin;
    std::cout << "Health: " << Goblin.GetHealth();
}
```

```text
Health: 150
```

Điều này cho phép code bên ngoài xem `Health` hiện tại thông qua public function `GetHealth()`. Tuy nhiên, code đó không thể sửa `Health`, vì bản thân variable vẫn là `private`.

### Kiểm tra kiến thức: Thêm Getter

Dòng 7 trong ví dụ dưới đây gây lỗi vì `Damage` là private member. Ta nên sửa class như thế nào để dòng 7 có thể đọc `Damage` của weapon nhưng không được thay đổi nó?

```cpp
class Weapon {
private:
    int Damage{50};
};

Weapon IronSword;
IronSword.Damage;
```

1. Đổi dòng 2 từ `private:` thành `public:`.

   Thay đổi này sẽ cho phép cả đọc lẫn sửa `Damage`. Hãy tìm một giải pháp cho phép đọc giá trị mà không cho code bên ngoài sửa trực tiếp.

2. Đổi dòng 2 từ `private:` thành `protected:`.

   Access specifier `protected` có những trường hợp sử dụng riêng sẽ được học ở chương sau. Nó không giải quyết đầy đủ yêu cầu cho phép đọc `Damage` nhưng không cho code bên ngoài sửa trực tiếp.

3. Thêm một public function trả về `Damage`, rồi cập nhật dòng 7 để dùng function đó.

   **Đúng.** Getter là cách phù hợp để cấp quyền đọc một private member mà không cho phép code bên ngoài sửa trực tiếp member đó.

## Setter

Setter có mục đích tương tự getter, nhưng đúng như tên gọi, chúng là các function cho phép bên ngoài cập nhật variable trên object.

Khác biệt giữa việc cung cấp setter và đơn giản biến variable gốc thành public là setter là một function, nên ta có thể kiểm soát quá trình cập nhật.

Ta có thể cung cấp setter cho variable `Health`, nhưng triển khai nó theo cách vẫn giữ invariant rằng `Health` không bao giờ âm:

```cpp
#include <iostream>

class Monster {
public:
    int GetHealth() const {
        return Health;
    }

    void SetHealth(int IncomingHealth) {
        if (IncomingHealth < 0) {
            Health = 0;
        } else {
            Health = IncomingHealth;
        }
    }

private:
    int Health{150};
};

int main() {
    Monster Goblin;
    std::cout << "Health: " << Goblin.GetHealth();
    Goblin.SetHealth(-50);
    std::cout << "\nHealth: " << Goblin.GetHealth();
}
```

```text
Health: 150
Health: 0
```

### Refactoring

Sau khi thêm function `SetHealth()`, ta có thể đơn giản hóa logic của `TakeDamage()`:

```cpp
void TakeDamage(int Damage) {
    // Trước đây:
    Health -= Damage;
    if (Health < 0) {
        Health = 0;
    }

    // Sau khi refactor:
    SetHealth(Health - Damage);
}
```

Những thay đổi không làm behavior của chương trình thay đổi nhưng giúp code dễ hiểu hơn hoặc bền vững hơn trước thay đổi trong tương lai thường được gọi là **refactoring**.

### Application Programming Interface — API

Nhắc lại: cách một phần của chương trình — như function hoặc class — cho phép code bên ngoài tương tác với nó được gọi là **application programming interface**, viết tắt là **API**.

API của function gồm tên function, các data type mà nó chấp nhận làm argument và data type mà nó trả về. API của class gồm tên class và các public member.

Ta muốn class và function thân thiện với code sử dụng chúng, nghĩa là API của chúng phải được thiết kế tốt. Encapsulation che giấu những thứ code bên ngoài không cần quan tâm, và là phần quan trọng để tạo API tốt.

## Summary

Trong bài này, ta đã tìm hiểu encapsulation và cách triển khai nó trong C++ bằng access specifier. Các ý chính gồm: