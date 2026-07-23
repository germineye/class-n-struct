# Structured Binding

Bài này giới thiệu structured binding, một công cụ tiện lợi để unpack data structure đơn giản.

Giả sử ta có một object chứa một tập object khác, chẳng hạn instance của struct `Vector3` từ các bài trước:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;
};

int main() {
    Vector3 SomeVector{1.0F, 2.0F, 3.0F};
}
```

Ta thường muốn lấy toàn bộ member của object ra thành các variable độc lập để tiếp tục thao tác:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;
};

int main() {
    Vector3 SomeVector{1.0F, 2.0F, 3.0F};
    float a{SomeVector.x};
    float b{SomeVector.y};
    float c{SomeVector.z};
}
```

C++ cung cấp một cách viết tắt tiện lợi cho việc này, gọi là **structured binding**.

### Destructuring, Deconstructing và Unpacking

Người đã có kinh nghiệm với programming language khác có thể quen với khái niệm này. Trong JavaScript, kỹ thuật tương đương gọi là **destructuring**; trong C# gọi là **deconstructing**; còn trong Python gọi là **unpacking**.

## C++ Language Standard

C++ phát triển theo thời gian bằng việc bổ sung feature mới. Hiện tại, các bản cập nhật thường xuất hiện mỗi ba năm và được gọi không chính thức bằng những tên như C++17, C++20 và C++23.

Điều quan trọng với ta là phải bảo đảm feature muốn sử dụng có sẵn trong language standard đang dùng.

Ví dụ, structured binding được thêm vào C++17. Vì vậy, nếu muốn dùng feature này, ta cần bảo đảm toolchain đang dùng C++17 hoặc mới hơn.

Điều này đặc biệt quan trọng với người dùng Visual Studio vì tại thời điểm bài gốc được viết, Visual Studio dùng C++14 theo mặc định. Phiên bản đó hiện đã khá cũ, nên ta nên cấu hình project sang một standard mới hơn.

Có thể thực hiện bằng cách mở cửa sổ **Property Pages** — từ menu **View** trên thanh trên cùng — rồi đặt **C++ Language Standard** trong phần **General**. Khuyến nghị dùng C++20 hoặc mới hơn.

Để tự compile các ví dụ trong khóa học, C++ standard phải ít nhất là C++17. Đôi lúc khóa học sẽ đề cập capability được thêm trong C++20 hoặc mới hơn; khi đó yêu cầu cao hơn sẽ được nói rõ.

## Dùng Structured Binding

Sau khi xác nhận đang dùng C++17 hoặc mới hơn, ta có thể dùng structured binding với cú pháp sau:

```cpp
#include <iostream>

struct Vector3 {
    float x;
    float y;
    float z;
};

int main() {
    Vector3 SomeVector{1.0F, 2.0F, 3.0F};
    auto [a, b, c]{SomeVector};

    std::cout << "a = " << a
              << ", b = " << b
              << ", c = " << c;
}
```

```text
a = 1, b = 2, c = 3
```

Phân tích cú pháp này:

Đầu tiên, ta dùng keyword `auto`, yêu cầu compiler tự xác định type của từng variable mới.

Lưu ý rằng ở đây bắt buộc phải dùng `auto`, ngay cả khi mọi variable đều có cùng type.

Sau `auto`, ta mở một cặp dấu ngoặc vuông `[` và `]`. Bên trong chúng, ta chỉ định tên muốn dùng cho từng variable được tạo.

Cuối cùng, ta cung cấp object dùng để khởi tạo các variable. Có thể dùng bất kỳ initialization syntax nào sau đây:

```cpp
auto [a, b, c]{SomeVector};
auto [d, e, f](SomeVector);
auto [g, h, i] = SomeVector;
```

### Variable được ghép theo Position, không theo Name

Tên variable được tạo bởi structured binding không cần trùng với tên variable trong object gốc.

Các variable mới được ghép với variable bên trong source object theo **position**, không theo name.

Code sau đặt `a`, `b` và `c` lần lượt nhận type cùng giá trị của member thứ nhất, thứ hai và thứ ba trong `SourceObject`:

```cpp
auto [a, b, c]{SourceObject};
```

Các member được gọi là gì trong định nghĩa struct hoặc class không quan trọng; structured binding vẫn cho cùng kết quả.

### Kiểm tra kiến thức: Structured Binding

Trong chương trình sau, làm thế nào để truy cập các giá trị `Name`, `Level` và `Health` của `MyCharacter` bằng structured binding?

```cpp
#include <iostream>
#include <string>

class Character {
public:
    std::string Name{"Goblin Warrior"};
    int Level{5};
    int Health{100};
};

int main() {
    Character MyCharacter;
    // Truy cập variable của MyCharacter
}
```

1. `auto [Name, Level, Health] = MyCharacter;`

   **Đúng.** Structured binding cho phép unpack trực tiếp các public member của `MyCharacter` vào variable `Name`, `Level` và `Health`.

2. `(Name, Level, Health) = MyCharacter;`

   Chưa đúng. Hãy xem keyword `auto` được dùng thế nào trong structured binding.

3. `auto MyCharacter[Name, Level, Health];`

   Gần đúng, nhưng đây không phải cú pháp structured binding trong C++. Cú pháp bắt đầu bằng `auto`, sau đó là một cặp dấu ngoặc vuông.

4. `auto (Name, Level, Health) = MyCharacter;`

   Gần đúng, nhưng structured binding trong C++ dùng dấu ngoặc vuông sau keyword `auto`, không dùng dấu ngoặc tròn.

## Giới hạn của Structured Binding

Tương tự aggregate initialization, structured binding chủ yếu hữu ích với data type đơn giản như struct `Vector3`.

Khi type trở nên phức tạp hơn, structured binding có một số giới hạn. Trước hết, ta phải unpack mọi variable của object, kể cả khi chỉ cần một phần trong số đó.

Một hệ quả khác là nếu type có private data member, ta không thể truy cập tất cả chúng, nên hoàn toàn không thể dùng structured binding mặc định.

Trong các trường hợp đó, ta phải quay lại cách truyền thống như truy cập từng variable riêng lẻ hoặc cung cấp member function hỗ trợ access pattern mong muốn.

### Overload Structured Binding

Dù implementation mặc định của structured binding khá cơ bản và hạn chế, một lợi ích lớn của việc feature này tồn tại là ta có thể overload nó.

Điều đó cho phép định nghĩa chính xác structured binding hoạt động thế nào với custom type, qua đó vượt qua các giới hạn trên và tạo nhiều flexibility hơn.

Tuy nhiên, việc triển khai yêu cầu hiểu C++ sâu hơn phạm vi bài này. Khóa nâng cao có một bài riêng về overload structured binding cho custom type.

## Summary

Trong bài này, ta đã tìm hiểu structured binding trong C++. Các ý chính:

- Structured binding cung cấp cách ngắn gọn, dễ đọc để unpack member từ type đơn giản.
- Keyword `auto` là bắt buộc, cho phép compiler suy luận type của các variable được unpack.
- Khi dùng structured binding mặc định, ta phải unpack mọi public member.
- Nếu type có bất kỳ private member nào, ta không thể dùng structured binding mặc định.
- Với kiến thức nâng cao hơn, ta có thể overload structured binding cho custom type để có thêm flexibility.
