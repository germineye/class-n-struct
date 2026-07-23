

**Đúng.** Đây là cú pháp chính xác để định nghĩa class trong C++. Keyword `class` đứng trước tên class.

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

## Class và Object

Ở thời điểm này thường có một chút nhầm lẫn về sự khác nhau giữa object và class. Sự khác biệt sẽ trở nên rõ hơn khi ta bắt đầu tạo class và object trong các bài sau, nhưng hãy bàn ngắn gọn tại đây.

Định nghĩa tiếng Anh của *class* là: một nhóm những thứ có chung một thuộc tính hoặc đặc điểm nào đó.

Trong lập trình, từ này cũng mang ý nghĩa như vậy. Class định nghĩa một nhóm trừu tượng gồm những thứ tương tự nhau theo một cách nào đó. Những thứ nằm trong nhóm đó chính là object.

Xét ví dụ sau:

```cpp
Monster Bonker;
Monster Basher;
```

Ở đây, `Monster` là một class. Nó không phải một con quái vật cụ thể — nó là ý tưởng trừu tượng về việc một quái vật là gì. Nó bao gồm mô tả về những variable và function mà mọi quái vật đều có.

Class cũng cung cấp khả năng tạo object mới thuộc class đó. Ở trên, ta dùng khả năng này để tạo hai quái vật cụ thể. `Bonker` và `Basher` đều là object.

### Instance và Instantiation

Vì class được dùng để tạo object, khi giải thích khái niệm này người ta thường hình dung class như một bản thiết kế. Class là bản thiết kế để tạo một type object cụ thể. Nhiều object có thể được tạo từ cùng một bản thiết kế.

Việc tạo object từ class đôi khi được gọi là **instantiating the class**. Những object được tạo ra đôi khi được gọi là **instance**.

Ở ví dụ trên, ta instantiate class `Monster` để tạo `Bonker` và `Basher`.

`Bonker` và `Basher` là các instance của class `Monster`.

### Kiểm tra kiến thức: Instantiating Class

**Class là gì?**

1. Một nhóm object mà từ đó ta có thể tạo instance mới thuộc type object đó.

   **Đúng.** Class trong lập trình giống như một bản thiết kế. Nó định nghĩa một nhóm object, và ta dùng nó để tạo các instance — tức object — thuộc type đó.

2. Một tập hợp object — ví dụ 100 `Goblin` đang được lưu trong memory là một class.

   Hãy nhớ rằng class là bản thiết kế cho object, không phải tập hợp các object đó. Hãy nghĩ xem thứ gì định nghĩa property và behavior của từng object riêng lẻ.

3. Một thực thể cụ thể tồn tại trong phần mềm, chẳng hạn một quái vật có các variable để cập nhật và các function để gọi.

   Mô tả này phù hợp với object hơn là class. Object là một instance cụ thể được tạo dựa trên class. Hãy phân biệt template tổng quát — class — với các instance riêng lẻ — object.

**Statement nào cho phép ta tạo một object `Weapon` mới từ class sau?**

```cpp
class Weapon {
public:

};
```

1. `Weapon;`

   Câu trả lời này thiếu một phần quan trọng của instantiation. Trong C++, khi instantiate class, ta cần chỉ định tên variable để tạo object.

   Hãy nghĩ về cách khai báo variable của type cơ bản như `int` hoặc `std::string`, rồi áp dụng ý tưởng đó cho class này.

2. `Weapon { "IronSword" }`

   Cú pháp này trông giống một phép initialization nhưng không đúng để instantiate class trong trường hợp cơ bản. Hãy nhớ rằng để tạo object, ta cần tên class theo sau bởi tên object.

   Dấu ngoặc nhọn `{}` không thường được dùng theo cách này khi instantiate một object cơ bản.

3. `Weapon IronSword;`

   **Đúng.** Đây là cách chính xác để instantiate object trong C++. Ta viết tên class `Weapon`, tiếp theo là tên object `IronSword`, rồi kết thúc bằng dấu chấm phẩy.

   Statement này tạo một object thuộc class `Weapon` có tên `IronSword`.

## Class Member

Để object của class có khả năng lưu trạng thái và thực hiện hành động, ta cần định nghĩa các variable và function đó như một phần của class.

Variable và function thuộc về một class đôi khi được gọi chung là **class member**.

Cú pháp dùng cho class member giống hệt cú pháp đã quen thuộc ở chương trước. Ta chỉ cần đặt variable và function bên trong dấu ngoặc nhọn của định nghĩa class.

Hiện tại, ta cũng nên bảo đảm chúng nằm dưới dòng `public:` trong class: