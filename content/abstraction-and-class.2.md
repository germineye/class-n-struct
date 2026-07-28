## Kiểu tự định nghĩa

Cũng như C++ cung cấp một số kiểu có sẵn hữu ích cho nhiều chương trình:

```cpp
int Level;
bool isAlive;
std::string Name;
```

C++ cũng cho phép chúng ta tạo **kiểu tự định nghĩa**. Đây là những kiểu mà ta tự thiết lập để khái quát hóa các nhóm đối tượng sẽ tồn tại trong dự án cụ thể của mình:

```cpp
Monster Goblin;
Weapon IronSword;
Spell Fireball;
```

Class là cách chính để định nghĩa một kiểu tùy chỉnh. Để tạo một kiểu tự định nghĩa như `Monster`, ta tạo một class như sau:

```cpp
#include <iostream>

class Monster {
public:
    // Mã của class nằm ở đây
};

int main() {
    // Bây giờ ta có thể tạo Monster
    Monster Goblin;
}
```

Ý nghĩa của dòng `public:` sẽ được giải thích ở phần sau của chương này. Hiện tại, chỉ cần bảo đảm nó xuất hiện ở đầu class.

Lưu ý rằng định nghĩa class phải kết thúc bằng dấu chấm phẩy. Quên dấu chấm phẩy ở đây là lỗi rất phổ biến, và thông báo lỗi do trình biên dịch tạo ra không phải lúc nào cũng rõ ràng:

```cpp
class Monster {
public:

}; // Nhớ dấu chấm phẩy
```

### Kiểm tra kiến thức: Tạo Class

**Làm thế nào để định nghĩa một class có tên `Weapon` trong C++?**

1.

```cpp
class Weapon {
public:
};
```

**Đúng.** Đây là cú pháp chính xác để định nghĩa class trong C++. Từ khóa `class` đứng trước tên class.

2.

```cpp
class Weapon() {
public:
};
```

Câu trả lời này dùng dấu ngoặc tròn, nhưng dấu ngoặc tròn không được dùng trong cú pháp định nghĩa class của C++. Tên class phải được theo sau bởi dấu ngoặc nhọn, không phải dấu ngoặc tròn.

3.

```cpp
class Weapon (
public:
);
```

Việc dùng dấu ngoặc tròn trong câu trả lời này là không đúng. Cú pháp định nghĩa class trong C++ dùng dấu ngoặc nhọn `{}` để bao quanh thân class.

## Class và Đối tượng

Ở thời điểm này thường có một chút nhầm lẫn về sự khác nhau giữa đối tượng và class. Sự khác biệt sẽ trở nên rõ hơn khi ta bắt đầu tạo class và đối tượng trong các bài sau, nhưng hãy bàn ngắn gọn tại đây.

Định nghĩa tiếng Anh của *class* là: một nhóm những thứ có chung một thuộc tính hoặc đặc điểm nào đó.

Trong lập trình, từ này cũng mang ý nghĩa như vậy. Class định nghĩa một nhóm trừu tượng gồm những thứ tương tự nhau theo một cách nào đó. Những thứ nằm trong nhóm đó chính là đối tượng.

Xét ví dụ sau:

```cpp
Monster Bonker;
Monster Basher;
```

Ở đây, `Monster` là một class. Nó không phải một con quái vật cụ thể — nó là ý tưởng trừu tượng về việc một quái vật là gì. Nó bao gồm mô tả về những biến và hàm mà mọi quái vật đều có.

Từ class đó, ta có thể tạo ra các đối tượng cụ thể. Trong ví dụ trên, `Bonker` và `Basher` là hai quái vật được tạo từ class `Monster`.

### Thể hiện và khởi tạo thể hiện

Vì class được dùng để tạo đối tượng, khi giải thích khái niệm này người ta thường hình dung class như một bản thiết kế. Class là bản thiết kế để tạo một kiểu đối tượng cụ thể. Nhiều đối tượng có thể được tạo từ cùng một bản thiết kế.

Việc tạo đối tượng từ class được gọi là quá trình **khởi tạo thể hiện** (instantiation). Mỗi đối tượng được tạo ra là một **thể hiện** (instance) cụ thể của class.

Ở ví dụ trên, ta tạo hai đối tượng `Bonker` và `Basher` từ class `Monster`.

`Bonker` và `Basher` đều là instance của class `Monster`.

### Kiểm tra kiến thức: Tạo đối tượng từ class

**Class là gì?**

1. Một nhóm đối tượng mà từ đó ta có thể tạo đối tượng mới thuộc kiểu đối tượng đó.

   **Đúng.** Class trong lập trình giống như một bản thiết kế. Nó định nghĩa một nhóm đối tượng, và ta dùng nó để tạo các đối tượng — tức đối tượng — thuộc kiểu đó.

2. Một tập hợp đối tượng — ví dụ 100 `Goblin` đang được lưu trong bộ nhớ là một class.

   Hãy nhớ rằng class là bản thiết kế cho đối tượng, không phải tập hợp các đối tượng đó. Hãy nghĩ xem thứ gì định nghĩa thuộc tính và hành vi của từng đối tượng riêng lẻ.

3. Một thực thể cụ thể tồn tại trong phần mềm, chẳng hạn một quái vật có các biến để cập nhật và các hàm để gọi.

   Mô tả này phù hợp với đối tượng hơn là class. Class là khuôn mẫu chung; mỗi đối tượng là một thể hiện cụ thể được tạo từ khuôn mẫu đó.

**Câu lệnh nào cho phép ta tạo một đối tượng `Weapon` mới từ class sau?**

```cpp
class Weapon {
public:

};
```

1. `Weapon;`

   Câu trả lời này thiếu một phần quan trọng của quá trình tạo đối tượng. Trong C++, khi tạo đối tượng từ class, ta cần chỉ định tên biến để tạo đối tượng.

   Hãy nghĩ về cách khai báo biến của kiểu cơ bản như `int` hoặc `std::string`, rồi áp dụng ý tưởng đó cho class này.

2. `Weapon { "IronSword" }`

   Cú pháp này trông giống một phép khởi tạo nhưng không đúng để tạo đối tượng từ class trong trường hợp cơ bản. Hãy nhớ rằng để tạo đối tượng, ta cần tên class theo sau bởi tên đối tượng.

   Dấu ngoặc nhọn `{}` không thường được dùng theo cách này khi tạo một đối tượng cơ bản.

3. `Weapon IronSword;`

   **Đúng.** Đây là cách chính xác để tạo đối tượng trong C++. Ta viết tên class `Weapon`, tiếp theo là tên đối tượng `IronSword`, rồi kết thúc bằng dấu chấm phẩy.

   Câu lệnh này tạo một đối tượng thuộc class `Weapon` có tên `IronSword`.
