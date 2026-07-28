## Lưu ý về biến của class

Một điểm dễ gây nhầm lẫn là câu “mọi đối tượng có cùng một tập biến” thực sự có nghĩa gì.

Khi một biến được khai báo trong class, mỗi đối tượng tạo từ class sẽ có bản sao riêng của biến đó, với cùng tên, cùng kiểu và cùng giá trị ban đầu.

Ví dụ, class `Monster` quy định các đối tượng của nó sẽ có biến số nguyên tên `Health`, bắt đầu với giá trị `100`. Tuy nhiên, cho đến khi ta tạo đối tượng từ class, chưa có biến như vậy thực sự tồn tại.

Khi ta tạo các đối tượng từ class — `Bonker` và `Basher` trong ví dụ sau — mỗi đối tượng nhận một bản sao riêng của biến `Health`.

`Health` của từng đối tượng sau đó có thể được cập nhật độc lập mà không ảnh hưởng đến bất kỳ đối tượng `Monster` nào khác:

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

## Nguyên mẫu hàm thành viên

Trong chương trước về khai báo trước, ta đã giới thiệu cách một hàm có thể được khai báo và định nghĩa ở những vị trí khác nhau trong mã.

Ta cũng có thể áp dụng kỹ thuật này cho hàm của class khi cần. Bên trong định nghĩa class, ta cung cấp nguyên mẫu cho hàm của class:

```cpp
class Monster {
public:
    int Health{150};

    // Khai báo
    void TakeDamage(int Damage);
};
```

Sau đó, ta có thể cung cấp định nghĩa ở nơi khác trong mã.

Điểm khác biệt là khi định nghĩa hàm bên ngoài class, ta phải ghi rõ class sở hữu hàm đó theo cú pháp `ClassName::FunctionName`.

Ví dụ, để định nghĩa hàm `TakeDamage()` cho class `Monster`, ta viết:

```cpp
class Monster {
public:
    int Health{150};

    // Khai báo
    void TakeDamage(int Damage);
};

// Định nghĩa
void Monster::TakeDamage(int Damage) {
    Health -= Damage;
}
```

Cách viết này có thể trông khá lạ, nhưng vì những lý do sẽ được giải thích sau, rất nhiều mã C++ được viết theo cách này. Trong khóa học này, ta sẽ chủ yếu khai báo và định nghĩa hàm cùng chỗ, nhưng hiện tại chỉ cần ghi nhớ rằng việc tách chúng ra là có thể.

## Tóm tắt

Các ý chính trong bài này:

- Giới thiệu class như một nền tảng của lập trình hướng đối tượng.
- Giải thích abstraction là quá trình khái quát hóa các đối tượng cụ thể thành những nhóm rộng hơn, giúp mã hiệu quả và dễ quản lý hơn.
- Trình bày kiểu có sẵn trong C++ như `int`, `bool` và `std::string` như các ví dụ về abstraction.
- Trình bày cách dùng class để tạo kiểu riêng cho các đối tượng trong dự án.
- Phân biệt class với đối tượng: class là khuôn mẫu chung, còn đối tượng là một thể hiện cụ thể được tạo từ khuôn mẫu đó.
- Giới thiệu việc tạo đối tượng từ class, và cách dùng toán tử truy cập thành viên `.` để tương tác với biến và hàm của đối tượng.
- Minh họa cách định nghĩa thành viên của class, gồm cả biến và hàm.
- Giới thiệu nguyên mẫu hàm thành viên: hàm có thể được khai báo trong class nhưng định nghĩa ở vị trí khác.
