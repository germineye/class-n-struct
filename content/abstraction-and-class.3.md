## Thành viên của class

Để mỗi đối tượng có thể lưu trạng thái và thực hiện hành động, ta khai báo các biến và hàm tương ứng bên trong class.

Các biến và hàm nằm trong class được gọi chung là **thành viên của class**.

Cú pháp khai báo chúng vẫn giống như trước; điểm khác biệt là biến và hàm được đặt bên trong cặp dấu ngoặc nhọn của class.

Hiện tại, ta cũng nên bảo đảm chúng nằm dưới dòng `public:` trong class:

```cpp
class Monster {
public:
    // Một biến
    int Health{150};

    // Một hàm
    void TakeDamage(int Damage) {
        Health -= Damage;
    }
};
```

### Các cách gọi thành viên của class

Tài liệu C++ có thể dùng nhiều tên khác nhau cho các thành viên của class.

Biến bên trong class đôi khi được gọi bằng các tên như **thành viên dữ liệu**, **trường** hoặc **thuộc tính**.

Hàm thuộc class thường được gọi là **hàm thành viên**; một số tài liệu cũng dùng từ **method**.

Nhìn chung, các thuật ngữ này đều liên quan đến cùng một nhóm ý tưởng và ý nghĩa thường sẽ rõ từ ngữ cảnh.

## Toán tử truy cập thành viên

Sau khi tạo đối tượng từ class, ta sẽ muốn truy cập các biến và hàm mà class cung cấp cho đối tượng đó.

Ta làm việc này bằng **toán tử truy cập thành viên**, tức một dấu chấm đơn giản: `.`.

Ví dụ, truy cập biến `Health` của đối tượng `Monster` trông như sau:

```cpp
Monster Bonker;
Bonker.Health;
```

Gọi hàm trông như sau:

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

Ta có thể dùng biến của class giống như mọi biến khác có cùng kiểu. Ở trên, `Bonker.Health` là một `int`, nên ta có thể dùng nó như bất kỳ `int` nào khác. Ví dụ, ta có thể:

- Truyền nó làm đối số cho một hàm.
- Sao chép giá trị của nó sang biến mới.
- Dùng `++` để tăng nó.
- Dùng `!=` để so sánh nó với một số khác và tạo ra kết quả logic.

### Kiểm tra kiến thức: Truy cập thành viên của class

Giả sử ta có mã sau:

```cpp
class Weapon {
public:
    int Damage{50};
};

Weapon IronSword;
```

**Câu lệnh nào cho phép ta truy cập số nguyên `Damage` của đối tượng?**

1. `Weapon.Damage;`

   Câu lệnh này dùng sai tên class thay vì tên đối tượng. Hãy nghĩ về cách truy cập thuộc tính của một đối tượng đã được tạo.

2. `IronSword.Damage;`

   **Đúng.** Đầu tiên, ta chỉ định đối tượng chứa biến. Trong trường hợp này là đối tượng `IronSword`.

   Tiếp theo, ta dùng toán tử truy cập thành viên `.`.

   Sau đó, ta chỉ định thành viên muốn truy cập. Trong trường hợp này là biến `Damage`.

3. `Damage.IronSword;`

   Cú pháp này bị đảo ngược. Trong C++, tên đối tượng đứng trước, theo sau là toán tử truy cập thành viên `.` rồi đến tên thành viên.
