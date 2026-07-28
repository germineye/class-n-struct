# Encapsulation và Bộ chỉ định truy cập

Hướng dẫn về encapsulation, bất biến của class và cách kiểm soát quyền truy cập dữ liệu bằng bộ chỉ định truy cập `public` và `private`.

Đến đây, ta đã abstraction thành công các đối tượng `Monster` thành một class. Nhờ đó mã được tổ chức gọn gàng hơn.

Vấn đề tiếp theo là làm sao bảo đảm mọi đối tượng được tạo từ class luôn ở trạng thái hợp lệ.

## Bất biến của class

Để class hữu ích, ta thường muốn thiết lập một số quy tắc mà người sử dụng class có thể tin cậy.

Ví dụ, xét một class đơn giản như sau:

```cpp
class Monster {
public:
    int Health{150};
};
```

Giá trị `Health` âm không có ý nghĩa, vì vậy sẽ hữu ích nếu thiết lập điều đó thành một quy tắc mà lập trình viên sử dụng class có thể dựa vào.

Một quy tắc như “`Health` của `Monster` không bao giờ âm” đôi khi được gọi là **bất biến của class**.

### Cam kết

Trong lập trình, thuật ngữ **cam kết** thường được dùng cho các dạng cam kết như vậy. Cam kết đơn giản là một sự bảo đảm về cách một hệ thống ta viết — chẳng hạn hàm hoặc class — sẽ hoạt động. Cam kết hợp lý giúp các hệ thống đó dễ sử dụng hơn.

Bản thân class là một dạng cam kết được trình biên dịch thực thi. Ví dụ, nếu một đối tượng là `Monster`, đối tượng đó được bảo đảm có một biến `int` tên `Health`.

Bất biến của class là một dạng cam kết khác — chỉ có điều ta phải tự triển khai và tự ghi lại trong tài liệu nó.

Nếu ta bảo đảm `Health` không bao giờ âm, mã ở những nơi khác trong dự án sẽ không bao giờ phải xử lý khả năng đó. Điều này giúp class dễ dùng hơn — chẳng hạn không ai cần viết `if` để kiểm tra trường hợp `Health` âm.

Nó cũng giúp mã ít lỗi hơn, vì sớm muộn gì cũng sẽ có người quên viết câu lệnh `if` đó.

Ta có thể thử thiết lập bất biến “`Health` không bao giờ âm” bằng cách cung cấp hàm `TakeDamage()` thực thi quy tắc này:

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

Quy tắc này được bảo đảm nếu bên sử dụng của class — tức mã ở nơi khác trong dự án đang tương tác với đối tượng `Monster` — chỉ dùng hàm `TakeDamage()`. Nhưng họ có thể bỏ qua quy tắc bằng cách gán trực tiếp cho `Health`, nên ta vẫn chưa xong:

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
