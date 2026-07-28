# Nạp chồng toán tử

Bài này giới thiệu nạp chồng toán tử, một khái niệm nền tảng giúp mã trực quan và dễ đọc hơn bằng cách tùy chỉnh toán tử cho kiểu tự định nghĩa.

Trong bài trước, ta tạo một struct `Vector3` đơn giản để lưu ba số, có thể dùng để biểu diễn các khái niệm như vị trí trong thế giới 3D:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;
};
```

Sẽ rất tiện nếu ta có thể dùng các toán tử như `+` và `+=` với kiểu tùy chỉnh mới, tương tự cách dùng chúng với kiểu có sẵn như `int` và `float`.

Ví dụ, ta muốn có thể viết:

```cpp
Vector3 CurrentPosition{1.0F, 2.0F, 3.0F};
Vector3 Movement{4.0F, 5.0F, 6.0F};

// Tạo đối tượng mới bằng toán tử +
Vector3 NewPosition{CurrentPosition + Movement};
```

Sau khi chạy mã trên, ta muốn `NewPosition` là một `Vector3` có các giá trị `5.0`, `7.0` và `9.0`.

Để làm được việc này, ta cần nạp chồng toán tử.

## Toán tử là hàm

Trong C++, toán tử đơn giản là hàm có tên cụ thể, danh sách tham số cụ thể và được gọi bằng một cú pháp hơi khác.

Khi viết `1 + 2`, trình biên dịch sẽ cố gọi một hàm có các đặc điểm sau:

- Có tên `operator+`.
- Nhận một `int` làm đối số đầu tiên.
- Nhận một `int` làm đối số thứ hai.

Theo đó, nguyên mẫu hàm cho phép hai đối tượng `Vector3` dùng toán tử `+` có thể là:

```cpp
void operator+(Vector3 a, Vector3 b);
```

Ta có quyền định nghĩa toán tử thực hiện điều gì và trả về gì. Khi thấy `+`, ta tự nhiên kỳ vọng toán tử cộng hai toán hạng rồi trả về kết quả.

Vì vậy, hãy cập nhật kiểu trả về và thân hàm để làm điều đó:

```cpp
Vector3 operator+(Vector3 a, Vector3 b) {
    return Vector3{
        a.x + b.x,
        a.y + b.y,
        a.z + b.z
    };
}
```

Sau khi có hàm này, ta có thể dễ dàng cộng các đối tượng `Vector3`:

```cpp
#include <iostream>

struct Vector3 {
    float x;
    float y;
    float z;
};

Vector3 operator+(Vector3 a, Vector3 b) {
    return Vector3{
        a.x + b.x,
        a.y + b.y,
        a.z + b.z
    };
}

int main() {
    Vector3 CurrentPosition{1.0F, 2.0F, 3.0F};
    Vector3 Movement{4.0F, 5.0F, 6.0F};
    Vector3 NewPosition{
        CurrentPosition + Movement
    };

    std::cout
        << "x = " << NewPosition.x
        << ", y = " << NewPosition.y
        << ", z = " << NewPosition.z;
}
```

```text
x = 5, y = 7, z = 9
```

### Truyền tham chiếu

Toán tử hiện hoạt động đúng, nhưng ta có thể thực hiện một thay đổi nhỏ để cải thiện hiệu năng.

Với cách triển khai hiện tại, toán hạng được sao chép vào thân hàm, tạo ra một chi phí hiệu năng không cần thiết.

Người đã quen với ngôn ngữ lập trình khác có thể nhận ra hành vi này là **truyền giá trị**, cách C++ dùng mặc định.

Chủ đề này sẽ được giới thiệu trong một bài riêng sau, nên không cần lo nếu hiện tại nó chưa rõ. Với người đã quen hơn, ta có thể chuyển tham số sang truyền tham chiếu bằng cách thêm dấu `&` vào kiểu trong danh sách tham số:

```cpp
Vector3 operator+(const Vector3& a, const Vector3& b) {
    return Vector3{
        a.x + b.x,
        a.y + b.y,
        a.z + b.z
    };
}
```

## Thứ tự toán hạng rất quan trọng

C++ không xem biểu thức `A * B` tương đương với `B * A`.

Điều này ảnh hưởng đến nạp chồng toán tử. Ví dụ, nếu muốn cho `Vector3` khả năng nhân với `int`, thông thường ta cần triển khai hai phiên bản.

Ta cần một phiên bản có `int` là toán hạng trái để hỗ trợ biểu thức như `2 * MyVector`:

```cpp
// num * vec
Vector3 operator*(int num, Vector3 vec) {
    return Vector3{
        vec.x * num,
        vec.y * num,
        vec.z * num
    };
}
```

Và cần phiên bản thứ hai có `int` là toán hạng phải để hỗ trợ biểu thức như `MyVector * 2`. Thân hàm trong ví dụ này giống hệt; ta chỉ đổi thứ tự tham số:

```cpp
// vec * num
Vector3 operator*(Vector3 vec, int num) {
    return Vector3{
        vec.x * num,
        vec.y * num,
        vec.z * num
    };
}
```

Trong tình huống mà thứ tự tham số không làm thay đổi đầu ra, ta có thể triển khai một hàm dựa trên hàm còn lại.

Ví dụ, nếu ai đó gọi phiên bản `Vector3 * int`, hàm chỉ cần gọi cách triển khai `int * Vector3` bằng cách đảo thứ tự toán hạng:

```cpp
// num * vec
Vector3 operator*(int num, Vector3 vec) {
    return Vector3{
        vec.x * num,
        vec.y * num,
        vec.z * num
    };
}

// vec * num
Vector3 operator*(Vector3 vec, int num) {
    return num * vec;
}
```

### Phép toán giao hoán

Phép toán mà thứ tự toán hạng không quan trọng được gọi là **giao hoán** — có tính giao hoán.

Phép cộng số nguyên là giao hoán vì `x + y` và `y + x` tương đương. Việc đổi chỗ toán hạng không thay đổi kết quả.

Phép trừ không giao hoán, vì `x - y` và `y - x` không nhất thiết cho cùng kết quả.

### Kiểm tra kiến thức: Nạp chồng toán tử

**Nguyên mẫu hàm nào cần thiết để hai đối tượng `Vector3` có thể được trừ bằng toán tử `-`, trả về một `Vector3` mới?**

```cpp
Vector3 CurrentPosition{1.0F, 2.0F, 3.0F};
Vector3 Reverse{4.0F, 5.0F, 6.0F};

Vector3 NewPosition{CurrentPosition - Reverse};
```

1. `Vector3 -(Vector3 a, Vector3 b)`

   Hãy xem lại cú pháp định nghĩa toán tử trong C++. Tên toán tử cần có tiền tố `operator`.

2. `operator-(Vector3 a, Vector3 b)`

   Hãy nhớ chỉ định kiểu trả về để cho biết phép toán tạo ra thứ gì.

3. `Vector3 operator-(Vector3 a, Vector3 b)`

   **Đúng.** Nguyên mẫu này khớp định dạng mong đợi của nạp chồng toán tử.

**Hàm nào cho phép một `Vector3` được nhân với `int` bằng toán tử `*`?**

```cpp
Vector3 CurrentPosition{1.0F, 2.0F, 3.0F};
Vector3 NewPosition{CurrentPosition * 5};
```

1.

```cpp
Vector3 operator*(Vector3 a, int b) {
    return Vector3{
        a.x * b,
        a.y * b,
        a.z * b
    };
}
```

**Đúng.** Hàm này định nghĩa chính xác toán tử nhân `Vector3` với `int` theo thứ tự trong biểu thức.

2.

```cpp
Vector3 operator*(Vector3 a, Vector3 b) {
    return Vector3{
        a.x * b,
        a.y * b,
        a.z * b
    };
}
```

Hãy nhìn kỹ kiểu của toán hạng trong phép toán. Toán hạng thứ hai có khớp ví dụ không?

3.

```cpp
Vector3 operator*(int a, Vector3 b) {
    return Vector3{
        b.x * a,
        b.y * a,
        b.z * a
    };
}
```

Thứ tự đối số quan trọng. `CurrentPosition * 5` sẽ gọi hàm nhận `Vector3` làm đối số đầu tiên và `int` làm đối số thứ hai.
