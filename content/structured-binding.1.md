# Structured Binding

Bài này giới thiệu structured binding, một công cụ tiện lợi để tách dữ liệu cấu trúc đơn giản.

Giả sử ta có một đối tượng chứa một tập đối tượng khác, chẳng hạn đối tượng của struct `Vector3` từ các bài trước:

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

Ta thường muốn lấy toàn bộ thành viên của đối tượng ra thành các biến độc lập để tiếp tục thao tác:

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

Người đã có kinh nghiệm với ngôn ngữ lập trình khác có thể quen với khái niệm này. Trong JavaScript, kỹ thuật tương đương gọi là **destructuring**; trong C# gọi là **deconstructing**; còn trong Python gọi là **unpacking**.

## Chuẩn ngôn ngữ C++

C++ phát triển theo thời gian bằng việc bổ sung tính năng mới. Hiện tại, các bản cập nhật thường xuất hiện mỗi ba năm và được gọi không chính thức bằng những tên như C++17, C++20 và C++23.

Điều quan trọng với ta là phải bảo đảm tính năng muốn sử dụng có sẵn trong chuẩn ngôn ngữ đang dùng.

Ví dụ, structured binding được thêm vào C++17. Vì vậy, nếu muốn dùng tính năng này, ta cần bảo đảm bộ công cụ đang dùng C++17 hoặc mới hơn.

Điều này đặc biệt quan trọng với người dùng Visual Studio vì tại thời điểm bài gốc được viết, Visual Studio dùng C++14 theo mặc định. Phiên bản đó hiện đã khá cũ, nên ta nên cấu hình dự án sang một chuẩn mới hơn.

Trong Visual Studio, mở **Property Pages** từ menu **View**, chọn mục **General**, rồi đặt **C++ Language Standard** thành C++20 hoặc mới hơn.

Để tự biên dịch các ví dụ trong khóa học, chuẩn C++ phải ít nhất là C++17. Đôi lúc khóa học sẽ đề cập khả năng được thêm trong C++20 hoặc mới hơn; khi đó yêu cầu cao hơn sẽ được nói rõ.

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

Đầu tiên, ta dùng từ khóa `auto`, yêu cầu trình biên dịch tự xác định kiểu của từng biến mới.

Lưu ý rằng ở đây bắt buộc phải dùng `auto`, ngay cả khi mọi biến đều có cùng kiểu.

Sau `auto`, ta mở một cặp dấu ngoặc vuông `[` và `]`. Bên trong chúng, ta chỉ định tên muốn dùng cho từng biến được tạo.

Cuối cùng, ta chỉ định đối tượng nguồn. Có thể viết phần khởi tạo theo một trong các dạng sau:

```cpp
auto [a, b, c]{SomeVector};
auto [d, e, f](SomeVector);
auto [g, h, i] = SomeVector;
```

### Biến được ghép theo vị trí, không theo tên

Tên biến được tạo bởi structured binding không cần trùng với tên biến trong đối tượng gốc.

Các biến mới được ghép với biến bên trong đối tượng nguồn theo **vị trí**, không theo tên.

Mã sau đặt `a`, `b` và `c` lần lượt nhận kiểu cùng giá trị của thành viên thứ nhất, thứ hai và thứ ba trong `SourceObject`:

```cpp
auto [a, b, c]{SourceObject};
```

Các thành viên được gọi là gì trong định nghĩa struct hoặc class không quan trọng; structured binding vẫn cho cùng kết quả.

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
    // Truy cập biến của MyCharacter
}
```

1. `auto [Name, Level, Health] = MyCharacter;`

   **Đúng.** Structured binding cho phép tách trực tiếp các thành viên public của `MyCharacter` vào biến `Name`, `Level` và `Health`.

2. `(Name, Level, Health) = MyCharacter;`

   Chưa đúng. Hãy xem từ khóa `auto` được dùng thế nào trong structured binding.

3. `auto MyCharacter[Name, Level, Health];`

   Gần đúng, nhưng đây không phải cú pháp structured binding trong C++. Cú pháp bắt đầu bằng `auto`, sau đó là một cặp dấu ngoặc vuông.

4. `auto (Name, Level, Health) = MyCharacter;`

   Gần đúng, nhưng structured binding trong C++ dùng dấu ngoặc vuông sau từ khóa `auto`, không dùng dấu ngoặc tròn.

## Giới hạn của Structured Binding

Tương tự khởi tạo tổng hợp, structured binding chủ yếu hữu ích với kiểu dữ liệu đơn giản như struct `Vector3`.

Khi kiểu trở nên phức tạp hơn, structured binding có một số giới hạn. Trước hết, ta phải tách mọi biến của đối tượng, kể cả khi chỉ cần một phần trong số đó.

Một hệ quả khác là nếu kiểu có thành viên dữ liệu private, ta không thể truy cập tất cả chúng, nên hoàn toàn không thể dùng structured binding mặc định.

Trong các trường hợp đó, ta phải quay lại cách truyền thống như truy cập từng biến riêng lẻ hoặc cung cấp hàm thành viên hỗ trợ cách truy cập mong muốn.

### Nạp chồng Structured Binding

Dù cách triển khai mặc định của structured binding khá cơ bản và hạn chế, một lợi ích lớn của việc tính năng này tồn tại là ta có thể nạp chồng nó.

Điều đó cho phép định nghĩa chính xác structured binding hoạt động thế nào với kiểu tùy chỉnh, qua đó vượt qua các giới hạn trên và tạo nhiều tính linh hoạt hơn.

Tuy nhiên, việc triển khai yêu cầu hiểu C++ sâu hơn phạm vi bài này. Khóa nâng cao có một bài riêng về nạp chồng structured binding cho kiểu tùy chỉnh.

## Tóm tắt

Trong bài này, ta đã tìm hiểu structured binding — cú pháp tách các thành viên của một đối tượng thành nhiều biến riêng. Các ý chính:

- Structured binding giúp tách các thành viên của kiểu đơn giản bằng cú pháp ngắn gọn, dễ đọc.
- Từ khóa `auto` là bắt buộc, cho phép trình biên dịch suy luận kiểu của các biến được tách.
- Với cơ chế mặc định, danh sách biến phải khớp với toàn bộ thành viên `public` của đối tượng.
- Nếu kiểu chứa thành viên `private`, structured binding mặc định sẽ không sử dụng được.
- Với kiến thức nâng cao hơn, ta có thể nạp chồng structured binding cho kiểu tùy chỉnh để có thêm tính linh hoạt.
