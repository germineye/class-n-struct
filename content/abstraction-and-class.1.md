# Abstraction và Class

Tìm hiểu cách định nghĩa, khởi tạo và sử dụng class, đồng thời hiểu vì sao class là nền tảng của lập trình hướng đối tượng.

Trong chương trước, chúng ta đã bàn về cách tiếp cận lập trình bằng việc suy nghĩ theo các object — những thứ tồn tại trong thế giới mà chương trình đang cố mô phỏng.

Ví dụ, nếu đang làm một game fantasy, chúng ta có thể mô phỏng các object như quái vật, vũ khí và phép thuật.

Chúng ta đã thấy có hai công cụ cơ bản để mô phỏng một object:

- Variable, dùng để biểu diễn trạng thái hiện tại của object.
- Function, cho phép object thực hiện hành động.

```cpp
// Variable
int Health{150};

// Function
void TakeDamage(int Damage) {
    Health -= Damage;
}
```

## Abstraction

Game của chúng ta có thể chứa hàng nghìn object. Ta không muốn phải định nghĩa hàng chục nghìn variable và function để quản lý tất cả chúng.

Thay vào đó, ta muốn viết code có thể áp dụng cho những tập object lớn. Chẳng hạn, có thể 100 object trong game là quái vật mà người chơi có thể chiến đấu.

Tất cả object quái vật trong game có khả năng chia sẻ nhiều đặc điểm giống nhau — ví dụ, chúng đều có variable `Health` và đều có function `TakeDamage()`.

Vì vậy, thay vì viết code riêng cho 100 object quái vật, ta viết code dùng chung cho toàn bộ quái vật, để chúng có thể cùng sử dụng.

Quá trình khái quát hóa này — lấy các object cụ thể rồi nhóm chúng vào những nhóm tổng quát hơn — được gọi là **abstraction**.

### Kiểm tra kiến thức: Abstraction

**Abstraction là gì?**

1. Abstraction là cách xóa object để giải phóng phần memory mà chúng đang sử dụng.

   Câu trả lời này đang nhầm abstraction với một khái niệm khác. Hãy nhớ rằng abstraction là việc đơn giản hóa một thực tế phức tạp bằng cách xác định các nhóm object dựa trên đặc điểm chung, chứ không liên quan đến quản lý memory.

2. Abstraction là việc phân loại object thành những type tổng quát hơn, trong đó các object cùng type chia sẻ một số đặc điểm chung.

   **Đúng.** Abstraction chính là việc tạo ra các nhóm tổng quát cho những object có đặc điểm tương tự. Sự đơn giản hóa này cho phép ta quản lý và thao tác các nhóm object hiệu quả hơn trong lập trình.

3. Abstraction là quá trình dùng để tạo một object mới.

   Câu trả lời này mô tả một khía cạnh khác của lập trình hướng đối tượng. Abstraction thiên về khung khái niệm dùng để nhóm các object tương tự, thay vì quá trình cụ thể để tạo từng object riêng lẻ.

## Built-in Type

Ta đã gặp các ví dụ về abstraction trong những built-in type đang sử dụng. Chẳng hạn, `int` là một abstraction.

Compiler C++ không cần định nghĩa code riêng cho từng số nguyên cụ thể như `3`, `42` hay `53,195`. Thay vào đó, chúng tạo ra khái niệm trừu tượng về một số nguyên và những việc mà số nguyên có thể làm.

Mọi object số nguyên sau đó đều chia sẻ các khả năng đó — chẳng hạn có thể tăng bằng operator `++`, hoặc ghi ra terminal bằng operator `<<`.

Data type `int` chính là thứ cung cấp abstraction đó. Tương tự, `bool` tạo abstraction cho giá trị `true` và `false`, còn `std::string` tạo abstraction cho các đoạn text.

## User-defined Type

Cũng như C++ cung cấp một số built-in type hữu ích cho nhiều chương trình:

```cpp
int Level;
bool isAlive;
std::string Name;
```

C++ cũng cho phép chúng ta tạo **user-defined type**. Đây là những type mà ta tự thiết lập để khái quát hóa các nhóm object sẽ tồn tại trong project cụ thể của mình:

```cpp
Monster Goblin;
Weapon IronSword;
Spell Fireball;
```

Class là cách chính để định nghĩa một custom type. Để tạo một user-defined type như `Monster`, ta tạo một class như sau:

```cpp
#include <iostream>

class Monster {
public:
    // Code của class nằm ở đây
};

int main() {
    // Bây giờ ta có thể tạo Monster
    Monster Goblin;
}
```

Ý nghĩa của dòng `public:` sẽ được giải thích ở phần sau của chương này. Hiện tại, chỉ cần bảo đảm nó xuất hiện ở đầu class.

Lưu ý rằng định nghĩa class phải kết thúc bằng dấu chấm phẩy. Quên dấu chấm phẩy ở đây là lỗi rất phổ biến, và thông báo lỗi do compiler tạo ra không phải lúc nào cũng rõ ràng:

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