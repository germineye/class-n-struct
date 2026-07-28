## Khai báo và định nghĩa toán tử

Giống mọi hàm thành viên khác, ta có thể khai báo và định nghĩa toán tử ở những vị trí khác nhau nếu muốn:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;

    // Khai báo
    Vector3 operator+(Vector3 Other);
};
```

```cpp
// Định nghĩa
Vector3 Vector3::operator+(Vector3 Other) {
    return Vector3{
        x + Other.x,
        y + Other.y,
        z + Other.z
    };
}
```

### Nối chuỗi toán tử

Trong bài này, ta tập trung vào những toán tử thường được kỳ vọng trả về đối tượng mới, như `+` và `*`. Sau biểu thức như `SomeVector * 2`, ta không mong `SomeVector` bị thay đổi — ta chỉ muốn biểu thức trả về một `Vector` mới khác.

Tuy nhiên, một số toán tử được kỳ vọng thay đổi toán hạng. Ví dụ phổ biến là `++` và `*=`. Nếu dùng biểu thức `SomeVector *= 2`, ta mong `SomeVector` được cập nhật.

Ta cố ý chưa dùng các toán tử này vì cần học thêm một số khái niệm nâng cao trước.

Cụ thể, hiện tại ta chưa học đủ để làm các toán tử đó hoạt động đúng khi được nối chuỗi với nhau, ví dụ:

```cpp
--Position *= 2;
```

Khóa học có một bài nạp chồng toán tử thứ hai ở phần sau, nơi các toán tử nâng cao này được triển khai sau khi ta đã học đủ kiến thức nền.

## Tóm tắt

Trong bài này, ta đã tìm hiểu nạp chồng toán tử — cơ chế giúp kiểu tự định nghĩa sử dụng các toán tử quen thuộc theo cách tự nhiên hơn.

Các ý chính:

- Trong C++, toán tử nạp chồng thực chất là hàm có tên bắt đầu bằng từ khóa `operator`.
- Có thể nạp chồng toán tử bằng hàm tự do hoặc hàm thành viên; cách chọn sẽ quyết định toán hạng nào xuất hiện trong danh sách tham số.
- Toán tử có thể được khai báo và định nghĩa ở những vị trí khác nhau giống mọi hàm khác.
