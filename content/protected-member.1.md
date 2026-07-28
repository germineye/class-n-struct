# Thành viên protected

Tìm hiểu thành viên protected của class trong C++, gồm cách và thời điểm nên dùng chúng, đặc biệt trong ngữ cảnh của inheritance và thiết kế class.

Trong bài trước về encapsulation, ta đã thấy có thể — và nên — đặt một số biến cùng hàm của class thành `private`.

### Nhắc lại: Encapsulation và Bộ chỉ định truy cập

Encapsulation, bất biến của class và việc kiểm soát quyền truy cập dữ liệu bằng bộ chỉ định `public` cùng `private` giúp che giấu hàm và biến khỏi thế giới bên ngoài. Điều này làm hệ thống dễ thiết kế và dễ sử dụng hơn.

Ví dụ, ta có thể tạo đối tượng cho phép bên ngoài xem health của character nhưng không được thay đổi nó:

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

## Hạn chế truy cập với Inheritance

Một vấn đề thú vị xuất hiện khi dùng inheritance trong ngữ cảnh này. Cụ thể, mã trong lớp dẫn xuất cũng không thể truy cập thành viên private được kế thừa.

Dưới đây, ta có class mới kế thừa từ `Character`, nhưng hàm của class `Healer` không thể truy cập private biến `mHealth`:

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

## Dùng thành viên `protected`

May mắn là ta có một mức truy cập nằm giữa `public` và `private` để giải quyết vấn đề. Mức truy cập này gọi là `protected`.

Thành viên protected không thể được truy cập bởi hàm nằm ngoài hệ phân cấp class, nhưng mã trong lớp con vẫn có thể truy cập.

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

### Kiểm tra kiến thức: Bộ chỉ định truy cập

**Ba bộ chỉ định truy cập của class là gì?**

1. `public`, `inherited` và `void`.

   Tổ hợp này không đúng. Bộ chỉ định truy cập xác định thành viên của class được truy cập thế nào. Hãy nghĩ về ba mức truy cập cơ bản trong class.

2. `public`, `inherited` và `private`.

   Gần đúng, nhưng `inherited` không phải bộ chỉ định truy cập. Hãy nhớ bộ chỉ định nào kiểm soát quyền truy cập từ lớp dẫn xuất.

3. `public`, `protected` và `private`.

   **Đúng.** Đây là ba bộ chỉ định truy cập nền tảng trong C++, mỗi loại có mức truy cập riêng bên trong và bên ngoài hệ phân cấp class.

**Khác biệt giữa `protected` và `private` là gì?**

1. Chúng tương đương — chỉ là hai lựa chọn tạo cùng hành vi.

   Không đúng. Mỗi bộ chỉ định có vai trò riêng trong kiểm soát truy cập. Hãy xem inheritance ảnh hưởng thế nào đến quyền truy cập thành viên của class.

2. Thành viên protected có thể được truy cập từ lớp con; thành viên private chỉ có thể được truy cập từ chính class nơi nó được định nghĩa.

   **Đúng.** `protected` cho phép truy cập trong class và lớp dẫn xuất, còn `private` giới hạn truy cập trong chính class đó.

3. Thành viên private có thể được truy cập từ lớp con; thành viên protected chỉ có thể được truy cập từ class nơi nó được định nghĩa.

   Câu này đảo ngược vai trò của `private` và `protected`. Hãy nhớ bộ chỉ định nào cho phép lớp dẫn xuất truy cập.

4. Thành viên private có thể được đọc từ lớp con; thành viên protected có thể vừa được đọc vừa được sửa từ lớp con.

   Không chính xác. Thành viên private không thể được lớp dẫn xuất truy cập trực tiếp, dù là đọc hay sửa.

## Tóm tắt

Ba mức truy cập trong C++ có thể tóm tắt như sau:

- Thành viên `private` chỉ có thể được truy cập trực tiếp từ chính class đã khai báo nó.
- Thành viên `protected` có thể được truy cập từ chính class và các lớp dẫn xuất.
- Thành viên `public` có thể được truy cập từ mã bên ngoài class.
