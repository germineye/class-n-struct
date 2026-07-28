## Mở rộng hàm kế thừa

Đôi khi ta không muốn thay thế hoàn toàn hàm kế thừa mà chỉ muốn bổ sung thêm một phần hành vi.

Một hàm kế thừa có thể thực hiện khá nhiều công việc; ví dụ dưới đây mô phỏng điều đó bằng nhiều dòng thông báo:

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

Khi đó, hàm trong lớp dẫn xuất vẫn thực hiện công việc của lớp cơ sở rồi mới bổ sung phần riêng của nó.

Khi che khuất hàm kế thừa, ta có thể gọi phiên bản được kế thừa bằng tên lớp cơ sở và toán tử phân giải phạm vi `::`.

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

Ta không bị giới hạn chỉ dùng bị che khuất hàm theo cách này. Có thể xử lý chúng như hàm bình thường — gọi bất kỳ lúc nào và chuyển tiếp hoặc tính toán đối số khi cần:

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

### Dùng `Super` trong Unreal Engine

Trong một số ngôn ngữ lập trình khác, khả năng tham chiếu lớp cha — đôi khi gọi là lớp cơ sở — được cung cấp qua từ khóa `Super` hoặc `super`:

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

Chuẩn C++ không cung cấp sẵn khả năng này, nhưng một số hệ sinh thái tự bổ sung. Ví dụ, từ khóa `Super` có sẵn khi làm dự án C++ trong Unreal Engine.

Lợi ích là nếu đổi lớp cha của class `Goblin` sang lớp cơ sở khác hoặc đổi tên class `Monster`, ta không cần cập nhật mọi hàm để dùng tên mới.

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

### Kiểm tra kiến thức: Mở rộng hàm kế thừa

Xét mã sau:

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

1. Số nguyên `15`.

   Hãy xem việc mở rộng hàm kế thừa có thể thay đổi hành vi thế nào. `SetDamage()` trong `Goblin` thay thế hành vi của được kế thừa `SetDamage()` cho lời gọi thông qua đối tượng `Goblin`.

2. Số nguyên `30`.

   **Đúng.** Phương thức `SetDamage()` của `Goblin` nhân đôi damage khi `isEnraged` là `true`, rồi gọi `Monster::SetDamage()` với giá trị `30`.

3. Mã không hợp lệ nên biên dịch thất bại.

   Không đúng. Mã biên dịch thành công; hãy xem cách `Goblin::SetDamage()` xử lý giá trị được truyền vào.

## Tóm tắt

Trong bài này, ta đã tìm hiểu cách làm việc với thành viên kế thừa. Trọng tâm là gọi constructor của lớp cơ sở từ danh sách khởi tạo của lớp dẫn xuất, đồng thời tránh các lỗi do che khuất tên. Các ý chính:

- Hiểu thứ tự chạy của constructor lớp cơ sở và constructor lớp dẫn xuất.
- Học cách sửa biến kế thừa trong lớp dẫn xuất và tầm quan trọng của khả năng truy cập — `public` hoặc `protected`.
- Nhận biết hiện tượng biến bị che khuất, vì nó có thể dẫn đến những lỗi rất khó phát hiện.
- Tìm hiểu cách che khuất và mở rộng hàm kế thừa để cung cấp hành vi chuyên biệt hơn trong lớp dẫn xuất.
