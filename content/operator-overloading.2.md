

// vec * num
Vector3 operator*(Vector3 vec, int num) {
    return num * vec;
}
```

### Commutative Operation

Operation mà thứ tự operand không quan trọng được gọi là **commutative** — có tính giao hoán.

Phép cộng số nguyên là commutative vì `x + y` và `y + x` tương đương. Việc đổi chỗ operand không thay đổi kết quả.

Phép trừ không commutative, vì `x - y` và `y - x` không nhất thiết cho cùng kết quả.

### Kiểm tra kiến thức: Operator Overloading

**Function prototype nào cần thiết để hai object `Vector3` có thể được trừ bằng operator `-`, trả về một `Vector3` mới?**

```cpp
Vector3 CurrentPosition{1.0F, 2.0F, 3.0F};
Vector3 Reverse{4.0F, 5.0F, 6.0F};

Vector3 NewPosition{CurrentPosition - Reverse};
```

1. `Vector3 -(Vector3 a, Vector3 b)`

   Hãy xem lại cú pháp định nghĩa operator trong C++. Tên operator cần có prefix `operator`.

2. `operator-(Vector3 a, Vector3 b)`

   Hãy nhớ chỉ định return type để cho biết operation tạo ra thứ gì.

3. `Vector3 operator-(Vector3 a, Vector3 b)`

   **Đúng.** Prototype này khớp format mong đợi của operator overloading.

**Function nào cho phép một `Vector3` được nhân với `int` bằng operator `*`?**

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

**Đúng.** Function này định nghĩa chính xác operator nhân `Vector3` với `int` theo thứ tự trong expression.

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

Hãy nhìn kỹ type của operand trong operation. Operand thứ hai có khớp ví dụ không?

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

Thứ tự argument quan trọng. `CurrentPosition * 5` sẽ gọi function nhận `Vector3` làm argument đầu tiên và `int` làm argument thứ hai.

## Overload Operator bằng Member Function

Các ví dụ trước triển khai operator overloading bằng standalone function bên ngoài class hoặc struct. Chúng đôi khi được gọi là **free function**.

Tuy nhiên, ta cũng có thể triển khai operator dưới dạng member function bên trong class hoặc struct liên quan.

Operator `+` có thể trông như sau khi dùng cách đó:

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

Điểm quan trọng trong declaration của `operator+` dưới dạng member function là nó chỉ có một parameter.

Điều này có thể gây bối rối vì operator `+` có hai operand — trái và phải. Khi tạo nó dưới dạng free function trước đó, ta cần hai parameter:

```cpp
Vector3 operator+(Vector3 a, Vector3 b);
```

Nhưng khi overload operator dưới dạng member function, function được gọi trong context của left operand. Vì vậy, trong expression như `x + Other.x`, `x` truy cập member `x` của left operand, còn `Other.x` truy cập member `x` của right operand.

### Kiểm tra kiến thức: Operator Overloading bằng Member Function

**Làm thế nào để object `Vector3` có thể nhân với `float` bằng member function operator overload?**

```cpp
struct Vector3 {
    float x, y, z;

    // Thêm function ở đây
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

**Đúng.** Left operand chính là object gọi member function, nên chỉ cần parameter cho right operand.

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

Khi overload operator dưới dạng member function, left operand không xuất hiện như một parameter.

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