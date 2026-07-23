

```cpp
class Monster {
public:
    // Một variable
    int Health{150};

    // Một function
    void TakeDamage(int Damage) {
        Health -= Damage;
    }
};
```

### Thuật ngữ Class Member

Có nhiều thuật ngữ khác nhau được dùng để nói về class member.

Variable bên trong class đôi khi được gọi bằng các tên như **data member**, **field** hoặc **property**.

Tương tự, function gắn với class đôi khi được gọi là **method** hoặc **member function**.

Nhìn chung, các thuật ngữ này đều liên quan đến cùng một nhóm ý tưởng và ý nghĩa thường sẽ rõ từ ngữ cảnh.

## Member Access Operator

Sau khi tạo object từ class, ta sẽ muốn truy cập các variable và function mà class cung cấp cho object đó.

Ta làm việc này bằng **member access operator**, tức một dấu chấm đơn giản: `.`.

Ví dụ, truy cập variable `Health` của object `Monster` trông như sau:

```cpp
Monster Bonker;
Bonker.Health;
```

Gọi function trông như sau:

```cpp
Monster Bonker;
Bonker.TakeDamage(25);
```

Dưới đây là một chương trình đơn giản minh họa các khái niệm này:

```cpp
#include <iostream>

class Monster {
public:
    int Health{150};

    void TakeDamage(int Damage) {
        Health -= Damage;
    }
};

int main() {
    Monster Bonker;
    std::cout << "Bonker Health: " << Bonker.Health;
    Bonker.TakeDamage(25);
    std::cout << "\nBonker Health: " << Bonker.Health;
}
```

```text
Bonker Health: 150
Bonker Health: 125
```

Ta có thể dùng class variable giống như mọi variable khác có cùng type. Ở trên, `Bonker.Health` là một `int`, nên ta có thể dùng nó như bất kỳ `int` nào khác. Ví dụ, ta có thể:

- Truyền nó làm argument cho một function.
- Copy giá trị của nó sang variable mới.
- Dùng `++` để tăng nó.
- Dùng `!=` để so sánh nó với một số khác và tạo ra kết quả boolean.

### Kiểm tra kiến thức: Truy cập Class Member

Giả sử ta có code sau:

```cpp
class Weapon {
public:
    int Damage{50};
};

Weapon IronSword;
```

**Statement nào cho phép ta truy cập integer `Damage` của object?**

1. `Weapon.Damage;`

   Statement này dùng sai tên class thay vì tên object. Hãy nghĩ về cách truy cập property của một object đã được tạo.

2. `IronSword.Damage;`

   **Đúng.** Đầu tiên, ta chỉ định object chứa variable. Trong trường hợp này là object `IronSword`.

   Tiếp theo, ta dùng member access operator `.`.

   Sau đó, ta chỉ định member muốn truy cập. Trong trường hợp này là variable `Damage`.

3. `Damage.IronSword;`

   Cú pháp này bị đảo ngược. Trong C++, tên object đứng trước, theo sau là member access operator `.` rồi đến tên member.

## Lưu ý về Class Variable

Một điểm thường gây nhầm lẫn ở giai đoạn này là chính xác thì việc mọi instance của class có cùng một tập variable mang ý nghĩa gì.

Trong định nghĩa class, khi khai báo variable theo cách đã minh họa, ta đang nói rằng mọi object của class sẽ có một variable với cùng tên, type và giá trị ban đầu.

Ví dụ, class `Monster` quy định các instance của nó sẽ có variable integer tên `Health`, bắt đầu với giá trị `100`. Tuy nhiên, cho đến khi ta instantiate class để tạo object, chưa có variable như vậy thực sự tồn tại.

Khi ta tạo các object từ class — `Bonker` và `Basher` trong ví dụ sau — mỗi object nhận một bản sao riêng của variable `Health`.

`Health` của từng object sau đó có thể được cập nhật độc lập mà không ảnh hưởng đến bất kỳ instance `Monster` nào khác:

```cpp
#include <iostream>

class Monster {
public:
    int Health{100};
};

int main() {
    Monster Bonker;
    Monster Basher;
    std::cout << "Bonker's Initial Health: " << Bonker.Health;
    std::cout << "\nBasher's Initial Health: " << Basher.Health;

    Bonker.Health = 50;
    std::cout << "\nBonker's Health is now: " << Bonker.Health;
    std::cout << "\nBasher's Health is still: " << Basher.Health;
}
```

```text
Bonker's Initial Health: 100
Basher's Initial Health: 100
Bonker's Health is now: 50
Basher's Health is still: 100
```

## Class Function Prototype

Trong chương trước về forward declaration, ta đã giới thiệu cách một function có thể được khai báo và định nghĩa ở những vị trí khác nhau trong code.

Ta cũng có thể áp dụng kỹ thuật này cho class function khi cần. Bên trong định nghĩa class, ta cung cấp prototype cho class function:

```cpp
class Monster {
public:
    int Health{150};