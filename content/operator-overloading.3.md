

Code này đang cố sửa left operand. Điều đó có thể được thực hiện với một số operator nếu cần, nhưng function khai báo sẽ trả về `Vector3` mà lại không return giá trị nào.

## Unary Operator

Các phần trước đều là ví dụ về **binary operator**. Binary operator có hai operand — trái và phải.

```cpp
// Cộng LeftOperand và RightOperand
LeftOperand + RightOperand;
```

Một số operator chỉ nhận một operand; chúng được gọi là **unary operator**. `++` là ví dụ về unary operator.

```cpp
// Tăng SomeNumber
SomeNumber++;
```

Một số symbol như `-` có thể được dùng dưới dạng unary hoặc binary. Unary `-` thường dùng để lấy dạng âm của operand, còn binary `-` dùng để trừ right operand khỏi left operand:

```cpp
int Number{5};

-Number;          // Trả về -5
Number - Number; // Trả về 0
```

Ta triển khai unary và binary operator theo cùng một cách. Khác biệt duy nhất là số parameter của function:

- Overload binary operator bằng standalone function: 2 parameter.
- Overload binary operator bằng member function: 1 parameter.
- Overload unary operator bằng standalone function: 1 parameter.
- Overload unary operator bằng member function: không có parameter.

Dưới đây, ta overload unary `-` bằng member function:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;

    Vector3 operator-() const {
        return Vector3{-x, -y, -z};
    }
};
```

### Kiểm tra kiến thức: Overload Unary Operator

**Làm thế nào để overload unary `-` bằng standalone function?**

1.

```cpp
Vector3 operator-() {
    return Vector3{-this.x, -this.y, -this.z};
}
```

Chưa đúng. Khi overload unary operator bằng standalone function, ta nhận operand qua parameter.

2.

```cpp
Vector3 operator-(Vector3) {
    return {-Vector3.x, -Vector3.y, -Vector3.z};
}
```

Ta cần dùng đúng cú pháp parameter của function, gồm cả tên parameter.

3.

```cpp
Vector3 operator-(Vector3 a) {
    return Vector3{-a.x, -a.y, -a.z};
}
```

**Đúng.** Standalone unary operator nhận đúng một operand qua parameter.

## Operator Prototype và Definition

Giống mọi member function khác, ta có thể khai báo và định nghĩa operator ở những vị trí khác nhau nếu muốn:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;

    // Declaration
    Vector3 operator+(Vector3 Other);
};
```

```cpp
// Definition
Vector3 Vector3::operator+(Vector3 Other) {
    return Vector3{
        x + Other.x,
        y + Other.y,
        z + Other.z
    };
}
```

### Chaining Operator

Trong bài này, ta tập trung vào những operator thường được kỳ vọng trả về object mới, như `+` và `*`. Sau expression như `SomeVector * 2`, ta không mong `SomeVector` bị thay đổi — ta chỉ muốn expression trả về một `Vector` mới khác.

Tuy nhiên, một số operator được kỳ vọng thay đổi operand. Ví dụ phổ biến là `++` và `*=`. Nếu dùng expression `SomeVector *= 2`, ta mong `SomeVector` được cập nhật.

Ta cố ý chưa dùng các operator này vì cần học thêm một số khái niệm nâng cao trước.

Cụ thể, hiện tại ta chưa học đủ để làm các operator đó hoạt động đúng khi được chain với nhau, ví dụ:

```cpp
--Position *= 2;
```

Khóa học có một bài operator overloading thứ hai ở phần sau, nơi các operator nâng cao này được triển khai sau khi ta đã học đủ prerequisite.

## Summary

Trong bài này, ta đã giới thiệu operator overloading, cho phép mở rộng khả năng của user-defined type và tương tác với chúng theo cách biểu đạt tự nhiên hơn.

Các ý chính:

- Operator trong C++ được triển khai như function bình thường với naming convention dùng keyword `operator`.
- Operator overload có thể được triển khai bằng free function hoặc member function; lựa chọn này ảnh hưởng đến danh sách parameter của function.
- Operator có thể được khai báo và định nghĩa ở những vị trí khác nhau giống mọi function khác.
