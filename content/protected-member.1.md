# Protected Member

Tìm hiểu protected class member trong C++, gồm cách và thời điểm nên dùng chúng, đặc biệt trong context của inheritance và class design.

Trong bài trước về encapsulation, ta đã thấy có thể — và nên — đặt một số variable cùng function của class thành `private`.

### Nhắc lại: Encapsulation và Access Specifier

Encapsulation, class invariant và việc kiểm soát data access bằng specifier `public` cùng `private` giúp che giấu function và variable khỏi thế giới bên ngoài. Điều này làm system dễ thiết kế và dễ sử dụng hơn.

Ví dụ, ta có thể tạo object cho phép bên ngoài xem health của character nhưng không được thay đổi nó:

```cpp
class Character {
public:
    int GetHealth() const {
        return mHealth;
    }

private:
    int mHealth{100};
};
```

## Access Restriction với Inheritance

Một vấn đề thú vị xuất hiện khi dùng inheritance trong context này. Cụ thể, code trong derived class cũng không thể truy cập inherited private member.

Dưới đây, ta có class mới inherit từ `Character`, nhưng function của class `Healer` không thể truy cập private variable `mHealth`:

```cpp
class Character {
public:
    int GetHealth() const {
        return mHealth;
    }

private:
    int mHealth{100};
};

class Healer : public Character {
public:
    void Heal(int Amount) {
        mHealth += Amount;
    }
};
```

```text
error: 'Character::mHealth': cannot access private
member declared in class 'Character'
```

## Dùng `protected` Member

May mắn là ta có một access level nằm giữa `public` và `private` để giải quyết vấn đề. Access level này gọi là `protected`.

Protected member không thể được truy cập bởi function nằm ngoài class hierarchy, nhưng code trong child class vẫn có thể truy cập.

Dưới đây, ta đổi `mHealth` từ `private` thành `protected`:

```cpp
#include <iostream>

class Character {
public:
    int GetHealth() const {
        return mHealth;
    }

protected:
    int mHealth{100};
};

class Healer : public Character {
public:
    void Heal(int Amount) {
        mHealth += Amount;
    }
};

int main() {
    Healer Player;
    std::cout << "Health: " << Player.GetHealth();

    Player.Heal(50);
    std::cout << "\nHealth: " << Player.GetHealth();
}
```

```text
Health: 100
Health: 150
```

### Kiểm tra kiến thức: Access Specifier

**Ba access specifier của class là gì?**

1. `public`, `inherited` và `void`.

   Tổ hợp này không đúng. Access specifier xác định class member được truy cập thế nào. Hãy nghĩ về ba access level cơ bản trong class.

2. `public`, `inherited` và `private`.

   Gần đúng, nhưng `inherited` không phải access specifier. Hãy nhớ specifier nào kiểm soát quyền truy cập từ derived class.

3. `public`, `protected` và `private`.

   **Đúng.** Đây là ba access specifier nền tảng trong C++, mỗi loại có mức accessibility riêng bên trong và bên ngoài class hierarchy.

**Khác biệt giữa `protected` và `private` là gì?**

1. Chúng tương đương — chỉ là hai lựa chọn tạo cùng behavior.

   Không đúng. Mỗi specifier có vai trò riêng trong kiểm soát truy cập. Hãy xem inheritance ảnh hưởng thế nào đến quyền truy cập class member.

2. Protected member có thể được truy cập từ child class; private member chỉ có thể được truy cập từ chính class nơi nó được định nghĩa.

   **Đúng.** `protected` cho phép truy cập trong class và subclass, còn `private` giới hạn truy cập trong chính class đó.

3. Private member có thể được truy cập từ child class; protected member chỉ có thể được truy cập từ class nơi nó được định nghĩa.

   Câu này đảo ngược vai trò của `private` và `protected`. Hãy nhớ specifier nào cho phép derived class truy cập.

4. Private member có thể được đọc từ child class; protected member có thể vừa được đọc vừa được sửa từ child class.

   Không chính xác. Private member không thể được derived class truy cập trực tiếp, dù là đọc hay sửa.

## Summary

Ta đã học đủ ba access level trong C++:

- `private` member chỉ có thể được truy cập bên trong chính class nơi chúng được định nghĩa.
- `protected` member có thể được truy cập bên trong chính class và mọi subclass.
- `public` member có thể được truy cập từ bất kỳ đâu.
