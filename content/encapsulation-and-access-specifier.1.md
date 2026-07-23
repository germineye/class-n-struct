# Encapsulation và Access Specifier

Hướng dẫn về encapsulation, class invariant và cách kiểm soát quyền truy cập dữ liệu bằng access specifier `public` và `private`.

Đến đây, ta đã abstraction thành công các object `Monster` thành một class. Nhờ đó code được tổ chức gọn gàng hơn.

Bước tiếp theo cần xem xét là làm thế nào để giữ object của class luôn ở trạng thái hợp lệ.

## Class Invariant

Để class hữu ích, ta thường muốn thiết lập một số quy tắc mà người sử dụng class có thể tin cậy.

Ví dụ, xét một class đơn giản như sau:

```cpp
class Monster {
public:
    int Health{150};
};
```

Giá trị `Health` âm không có ý nghĩa, vì vậy sẽ hữu ích nếu thiết lập điều đó thành một quy tắc mà developer sử dụng class có thể dựa vào.

Một quy tắc như “`Health` của `Monster` không bao giờ âm” đôi khi được gọi là **class invariant**.

### Contract

Trong lập trình, thuật ngữ **contract** thường được dùng cho các dạng cam kết như vậy. Contract đơn giản là một sự bảo đảm về cách một hệ thống ta viết — chẳng hạn function hoặc class — sẽ hoạt động. Contract hợp lý giúp các hệ thống đó dễ sử dụng hơn.

Bản thân class là một dạng contract được compiler thực thi. Ví dụ, nếu một object là `Monster`, object đó được bảo đảm có một variable `int` tên `Health`.

Class invariant là một dạng contract khác — chỉ có điều ta phải tự triển khai và tự document nó.

Nếu ta bảo đảm `Health` không bao giờ âm, code ở những nơi khác trong project sẽ không bao giờ phải xử lý khả năng đó. Điều này giúp class dễ dùng hơn — chẳng hạn không ai cần viết `if` để kiểm tra trường hợp `Health` âm.

Nó cũng giúp code ít lỗi hơn, vì sớm muộn gì cũng sẽ có người quên viết câu lệnh `if` đó.

Ta có thể thử thiết lập invariant “`Health` không bao giờ âm” bằng cách cung cấp function `TakeDamage()` thực thi quy tắc này:

```cpp
class Monster {
public:
    int Health{150};

    void TakeDamage(int Damage) {
        Health -= Damage;
        if (Health < 0) {
            Health = 0;
        }
    }
};
```

Quy tắc này được bảo đảm nếu consumer của class — tức code ở nơi khác trong project đang tương tác với object `Monster` — chỉ dùng function `TakeDamage()`. Nhưng họ có thể bỏ qua quy tắc bằng cách gán trực tiếp cho `Health`, nên ta vẫn chưa xong:

```cpp
#include <iostream>

class Monster {
public:
    int Health{150};
};

int main() {
    Monster Goblin;
    Goblin.Health -= 200;
    std::cout << "Health: " << Goblin.Health << " :(";
}
```

```text
Health: -50 :(
```

## Encapsulation

Trong lập trình, quá trình encapsulation bao gồm:

- Gom dữ liệu và các function thao tác trên dữ liệu đó vào cùng một object.
- Che giấu cách hoạt động bên trong để consumer chỉ có thể tương tác với object theo một cách được kiểm soát.

Ta đã triển khai bước đầu tiên của encapsulation bằng cách gom variable và function vào một class.

Tuy nhiên, ta chưa triển khai bước thứ hai. Consumer vẫn có thể nhìn thấy và sửa toàn bộ phần bên trong object. Như đã thấy, việc thiếu encapsulation khiến ta không thể thực thi class invariant.

Nó cũng làm consumer không rõ phải dùng code như thế nào: “Tôi muốn giảm health của object này — tôi nên dùng `TakeDamage()` hay sửa thẳng `Health`?”

### Kiểm tra kiến thức: Hiểu Encapsulation

**Đâu là một ví dụ về encapsulation?**

1. Đóng gói và nén phần mềm để nó cần ít dung lượng cài đặt hơn.

   Việc này có liên quan đến đóng gói file, nhưng không phải encapsulation trong lập trình. Encapsulation trong C++ là gom dữ liệu với function và kiểm soát quyền truy cập chúng.

2. Che giấu những variable và function mà ta không muốn code bên ngoài sử dụng.

   **Đúng.** Đây là một ví dụ điển hình về encapsulation trong lập trình hướng đối tượng. Nó liên quan đến việc kiểm soát quyền truy cập các thành phần của class.

3. Tổ chức class thành một hệ phân cấp dạng cây.

   Tổ chức class thành hierarchy liên quan nhiều hơn đến inheritance, nội dung sẽ được học ở chương sau. Encapsulation tập trung vào việc gom dữ liệu, function và kiểm soát quyền truy cập.

### Function cũng là Encapsulation

Thực ra ta đã sử dụng một dạng encapsulation. Hãy nghĩ về function: function là cách che giấu — hay encapsulate — một block code bên trong một gói dễ dùng.

Function body có thể phức tạp đến mức cần thiết — nó có thể chứa hàng trăm dòng code và hàng chục lời gọi function lồng nhau.