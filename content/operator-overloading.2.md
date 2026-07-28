## Nạp chồng toán tử bằng hàm thành viên

Các ví dụ trước triển khai nạp chồng toán tử bằng hàm độc lập bên ngoài class hoặc struct. Chúng đôi khi được gọi là **hàm tự do**.

Tuy nhiên, ta cũng có thể triển khai toán tử dưới dạng hàm thành viên bên trong class hoặc struct liên quan.

Toán tử `+` có thể trông như sau khi dùng cách đó:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;

    Vector3 operator+(Vector3 Other) const {
        return Vector3{
            x + Other.x,
            y + Other.y,
            z + Other.z
        };
    }
};
```

Điểm quan trọng trong khai báo của `operator+` dưới dạng hàm thành viên là nó chỉ có một tham số.

Điều này có thể gây bối rối vì toán tử `+` có hai toán hạng — trái và phải. Khi tạo nó dưới dạng hàm tự do trước đó, ta cần hai tham số:

```cpp
Vector3 operator+(Vector3 a, Vector3 b);
```

Nhưng khi nạp chồng toán tử dưới dạng hàm thành viên, hàm được gọi trong ngữ cảnh của toán hạng trái. Vì vậy, trong biểu thức như `x + Other.x`, `x` truy cập thành viên `x` của toán hạng trái, còn `Other.x` truy cập thành viên `x` của toán hạng phải.

### Kiểm tra kiến thức: Nạp chồng toán tử bằng hàm thành viên

**Làm thế nào để đối tượng `Vector3` có thể nhân với `float` bằng hàm thành viên toán tử nạp chồng?**

```cpp
struct Vector3 {
    float x, y, z;

    // Thêm hàm ở đây
};

Vector3 MyVector{4.0F, 5.0F, 6.0F};
Vector3 BigVector{MyVector * 3.0F};
```

1.

```cpp
struct Vector3 {
    float x, y, z;

    Vector3 operator*(float Other) const {
        return Vector3{
            x * Other,
            y * Other,
            z * Other
        };
    }
};
```

**Đúng.** Toán hạng trái chính là đối tượng gọi hàm thành viên, nên chỉ cần tham số cho toán hạng phải.

2.

```cpp
struct Vector3 {
    float x, y, z;

    Vector3 operator*(Vector3 this, float Other) {
        return Vector3{
            this.x * Other,
            this.y * Other,
            this.z * Other
        };
    }
};
```

Khi nạp chồng toán tử dưới dạng hàm thành viên, toán hạng trái không xuất hiện như một tham số.

3.

```cpp
struct Vector3 {
    float x, y, z;

    Vector3 operator*(float Other) {
        x *= Other;
        y *= Other;
        z *= Other;
    }
};
```

Mã này đang cố sửa toán hạng trái. Điều đó có thể được thực hiện với một số toán tử nếu cần, nhưng hàm khai báo sẽ trả về `Vector3` mà lại không trả về giá trị nào.

## Toán tử một ngôi

Các phần trước đều là ví dụ về **toán tử hai ngôi**. Toán tử hai ngôi có hai toán hạng — trái và phải.

```cpp
// Cộng LeftOperand và RightOperand
LeftOperand + RightOperand;
```

Một số toán tử chỉ nhận một toán hạng; chúng được gọi là **toán tử một ngôi**. `++` là ví dụ về toán tử một ngôi.

```cpp
// Tăng SomeNumber
SomeNumber++;
```

Một số ký hiệu như `-` có thể được dùng dưới dạng một ngôi hoặc hai ngôi. Một ngôi `-` thường dùng để lấy dạng âm của toán hạng, còn hai ngôi `-` dùng để trừ toán hạng phải khỏi toán hạng trái:

```cpp
int Number{5};

-Number;          // Trả về -5
Number - Number; // Trả về 0
```

Ta triển khai một ngôi và toán tử hai ngôi theo cùng một cách. Khác biệt duy nhất là số tham số của hàm:

- Nạp chồng toán tử hai ngôi bằng hàm độc lập: 2 tham số.
- Nạp chồng toán tử hai ngôi bằng hàm thành viên: 1 tham số.
- Nạp chồng toán tử một ngôi bằng hàm độc lập: 1 tham số.
- Nạp chồng toán tử một ngôi bằng hàm thành viên: không có tham số.

Dưới đây, ta nạp chồng một ngôi `-` bằng hàm thành viên:

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

### Kiểm tra kiến thức: Nạp chồng toán tử một ngôi

**Làm thế nào để nạp chồng một ngôi `-` bằng hàm độc lập?**

1.

```cpp
Vector3 operator-() {
    return Vector3{-this.x, -this.y, -this.z};
}
```

Chưa đúng. Khi nạp chồng toán tử một ngôi bằng hàm độc lập, ta nhận toán hạng qua tham số.

2.

```cpp
Vector3 operator-(Vector3) {
    return {-Vector3.x, -Vector3.y, -Vector3.z};
}
```

Ta cần dùng đúng cú pháp tham số của hàm, gồm cả tên tham số.

3.

```cpp
Vector3 operator-(Vector3 a) {
    return Vector3{-a.x, -a.y, -a.z};
}
```

**Đúng.** Hàm toán tử một ngôi độc lập nhận đúng một toán hạng qua tham số.
