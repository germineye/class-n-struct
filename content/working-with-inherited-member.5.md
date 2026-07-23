

### Dùng `Super` trong Unreal Engine

Trong một số programming language khác, khả năng tham chiếu parent class — đôi khi gọi là superclass — được cung cấp qua keyword `Super` hoặc `super`:

```cpp
class Goblin : public Monster {
public:
    void Attack() {
        // Cú pháp này sẽ gọi Monster::Attack()
        Super::Attack();
        std::cout << "\n\nand now some Goblin things";
    }
};
```

C++ standard không có capability này theo mặc định, nhưng đôi khi ecosystem bổ sung nó. Ví dụ, keyword `Super` có sẵn khi làm project C++ trong Unreal Engine.

Lợi ích là nếu reparent class `Goblin` sang base class khác hoặc đổi tên class `Monster`, ta không cần cập nhật mọi function để dùng tên mới.

```cpp
// Đã đổi tên "Monster" thành "Character"
class Goblin : public Character {
public:
    void Attack() {
        // Không cần sửa dòng này; giờ nó sẽ gọi
        // Character::Attack()
        Super::Attack();
        std::cout << "\n\nand now some Goblin things";
    }
};
```

### Kiểm tra kiến thức: Mở rộng Inherited Function

Xét code sau:

```cpp
class Monster {
public:
    void SetDamage(int Damage) {
        mDamage = Damage;
    }

    int GetDamage() const {
        return mDamage;
    }

private:
    int mDamage;
};

class Goblin : public Monster {
public:
    void SetDamage(int Damage) {
        Monster::SetDamage(
            isEnraged ? Damage * 2 : Damage
        );
    }

private:
    bool isEnraged{true};
};

int main() {
    Goblin Bonker;
    Bonker.SetDamage(15);
    int GoblinDamage{Bonker.GetDamage()};
}
```

**Giá trị của `GoblinDamage` là gì?**

1. Integer `15`.

   Hãy xem việc mở rộng inherited function có thể thay đổi behavior thế nào. `SetDamage()` trong `Goblin` thay thế behavior của inherited `SetDamage()` cho lời gọi thông qua object `Goblin`.

2. Integer `30`.

   **Đúng.** Method `SetDamage()` của `Goblin` nhân đôi damage khi `isEnraged` là `true`, rồi gọi `Monster::SetDamage()` với giá trị `30`.

3. Code không hợp lệ và không compile.

   Không đúng. Code compile thành công. Hãy tập trung vào logic trong `Goblin::SetDamage()`.

## Summary

Trong bài này, ta đã tìm hiểu chi tiết cách dùng inherited member trong C++. Ta học cách gọi inherited constructor từ member initializer list của derived constructor để thiết lập derived object đúng và hiệu quả. Các ý chính:

- Hiểu thứ tự và quá trình gọi base class constructor trong derived class.
- Học cách sửa inherited variable trong derived class và tầm quan trọng của visibility — `public` hoặc `protected`.
- Nhận biết và tránh lỗi phổ biến như variable shadowing, thứ có thể tạo bug khó hiểu.
- Tìm hiểu cách shadow và mở rộng inherited function để cung cấp behavior chuyên biệt hơn trong derived class.
