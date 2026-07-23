# Operator Overloading

Bài này giới thiệu operator overloading, một khái niệm nền tảng giúp code trực quan và dễ đọc hơn bằng cách tùy chỉnh operator cho user-defined type.

Trong bài trước, ta tạo một struct `Vector3` đơn giản để lưu ba số, có thể dùng để biểu diễn các khái niệm như position trong thế giới 3D:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;
};
```

Sẽ rất tiện nếu ta có thể dùng các operator như `+` và `+=` với custom type mới, tương tự cách dùng chúng với built-in type như `int` và `float`.

Ví dụ, ta muốn có thể viết:

```cpp
Vector3 CurrentPosition{1.0F, 2.0F, 3.0F};
Vector3 Movement{4.0F, 5.0F, 6.0F};

// Tạo object mới bằng operator +
Vector3 NewPosition{CurrentPosition + Movement};
```

Sau khi chạy code trên, ta muốn `NewPosition` là một `Vector3` có các giá trị `5.0`, `7.0` và `9.0`.

Để làm được việc này, ta cần overload operator.

## Operator là Function

Trong C++, operator đơn giản là function có tên cụ thể, danh sách parameter cụ thể và được gọi bằng một cú pháp hơi khác.

Khi viết `1 + 2`, compiler sẽ cố gọi một function có các đặc điểm sau:

- Có tên `operator+`.
- Nhận một `int` làm argument đầu tiên.
- Nhận một `int` làm argument thứ hai.

Theo đó, function prototype cho phép hai object `Vector3` dùng operator `+` có thể là:

```cpp
void operator+(Vector3 a, Vector3 b);
```

Ta có quyền định nghĩa operator thực hiện điều gì và trả về gì. Khi thấy `+`, ta tự nhiên kỳ vọng operator cộng hai operand rồi trả về kết quả.

Vì vậy, hãy cập nhật return type và function body để làm điều đó:

```cpp
Vector3 operator+(Vector3 a, Vector3 b) {
    return Vector3{
        a.x + b.x,
        a.y + b.y,
        a.z + b.z
    };
}
```

Sau khi có function này, ta có thể dễ dàng cộng các object `Vector3`:

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

### Pass by Reference

Operator hiện hoạt động đúng, nhưng ta có thể thực hiện một thay đổi nhỏ để cải thiện performance.

Với implementation hiện tại, operand được copy vào function body, tạo ra một chi phí performance không cần thiết.

Người đã quen với programming language khác có thể nhận ra behavior này là **pass by value**, cách C++ dùng mặc định.

Chủ đề này sẽ được giới thiệu trong một bài riêng sau, nên không cần lo nếu hiện tại nó chưa rõ. Với người đã quen hơn, ta có thể chuyển parameter sang pass by reference bằng cách thêm dấu `&` vào type trong danh sách parameter:

```cpp
Vector3 operator+(const Vector3& a, const Vector3& b) {
    return Vector3{
        a.x + b.x,
        a.y + b.y,
        a.z + b.z
    };
}
```

## Thứ tự Operand quan trọng

C++ không xem expression `A * B` tương đương với `B * A`.

Điều này ảnh hưởng đến operator overloading. Ví dụ, nếu muốn cho `Vector3` khả năng nhân với `int`, thông thường ta cần triển khai hai phiên bản.

Ta cần một phiên bản có `int` là left operand để hỗ trợ expression như `2 * MyVector`:

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

Và cần phiên bản thứ hai có `int` là right operand để hỗ trợ expression như `MyVector * 2`. Function body trong ví dụ này giống hệt; ta chỉ đổi thứ tự parameter:

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

Trong tình huống mà thứ tự parameter không làm thay đổi output, ta có thể triển khai một function dựa trên function còn lại.

Ví dụ, nếu ai đó gọi phiên bản `Vector3 * int`, function chỉ cần gọi implementation `int * Vector3` bằng cách đảo thứ tự operand:

```cpp
// num * vec
Vector3 operator*(int num, Vector3 vec) {
    return Vector3{
        vec.x * num,
        vec.y * num,
        vec.z * num
    };
}