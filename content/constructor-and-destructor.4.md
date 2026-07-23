

1. Class tự động sinh default constructor.

   Không đúng. Khi custom constructor được định nghĩa, default constructor tự sinh không còn được cung cấp. Nếu cần default constructor, ta phải định nghĩa nó rõ ràng.

2. Class không tự động sinh default constructor.

   **Đúng.** Khi định nghĩa custom constructor, implicit default constructor không còn được cung cấp. Nếu cần constructor không argument, ta phải tự định nghĩa.

3. Compiler lập tức tạo compiler error.

   Không đúng. Compiler không báo lỗi chỉ vì default constructor không được định nghĩa. Lỗi chỉ xuất hiện khi ta cố instantiate class mà không cung cấp các argument cần thiết cho constructor hiện có.

Xét class sau:

```cpp
class Weapon {
public:
    Weapon(int Durability) {
        mDurability = Durability;
    }

    Weapon(int Weight) {
        mWeight = Weight;
    }

private:
    int mDurability;
    int mWeight;
};
```

**Điều gì xảy ra với statement `Weapon IronSword{500};`?**

1. Object `IronSword` được tạo với `mDurability` bằng `500`.

   Không đúng. Vấn đề thực sự là constructor bị trùng chữ ký, không phải việc gán sai property.

2. Object `IronSword` được tạo với `mWeight` bằng `500`.

   Không đúng. Vấn đề không nằm ở phép gán mà nằm ở sự mơ hồ của constructor call.

3. Xảy ra compilation error vì constructor call bị ambiguous.

   **Đúng.** Statement này gây compilation error vì hai constructor đều có signature `Weapon(int)`.

**Destructor là gì?**

1. Function được gọi để cấp phát memory cho object.

   Không đúng. Destructor không dùng để cấp phát memory. Nó là special member function được gọi khi object bị hủy.

2. Special member function tự động được gọi khi object ra khỏi scope hoặc bị xóa.

   **Đúng.** Destructor được tự động gọi khi lifetime của object kết thúc, do object ra khỏi scope hoặc bị xóa rõ ràng.

3. Method khởi tạo property của object khi object được tạo.

   Không đúng. Đây là nhiệm vụ của constructor. Destructor hoạt động ở đầu còn lại của vòng đời object.

## Summary

Các khái niệm chính trong bài:

- **Constructor và destructor:** Constructor là special function của class được gọi khi object được tạo. Nó có thể khởi tạo object với giá trị và behavior cụ thể. Destructor được gọi khi object bị hủy.
- **Default constructor và custom constructor:** Cách default constructor hoạt động và cách tạo custom constructor cho nhu cầu cụ thể.
- **Naming convention cho class variable:** Lý do nên áp dụng convention cho class member, chẳng hạn thêm tiền tố `m` vào member variable như `mName`.
- **Constructor parameter:** Constructor có thể nhận parameter để khởi tạo object bằng giá trị cụ thể.
- **Nhiều constructor:** Class có thể có nhiều constructor để hỗ trợ cách tạo object linh hoạt.
- **Tránh ambiguous constructor call:** Các constructor không được có danh sách parameter gây mơ hồ, nếu không compiler sẽ báo lỗi.
- **Triển khai và khôi phục default constructor:** Có thể tự tạo default constructor hoặc khôi phục constructor mặc định bằng `= default`.
- **Giới thiệu destructor:** Destructor được gọi khi object bị hủy và đóng vai trò quan trọng trong quản lý resource.
