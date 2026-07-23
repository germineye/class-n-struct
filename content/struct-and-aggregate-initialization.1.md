# Struct và Aggregate Initialization

Khám phá vai trò của struct, điểm khác nhau giữa struct và class, cùng cách khởi tạo struct mà không cần tự định nghĩa constructor.

Trong một số ví dụ về class, ta từng đề cập rằng object nên có property như `WorldPosition` — vị trí hiện tại của character trong thế giới.

Trong môi trường 3D, vị trí này được biểu diễn bằng ba số riêng biệt, hay ba coordinate, thường gọi là `x`, `y` và `z`.

Ta có thể lưu chúng thành ba variable riêng. Tuy nhiên, thông thường tốt hơn nhiều nếu gom các coordinate này lại để chúng có thể được sử dụng và truyền đi như một object duy nhất. Điều đó có nghĩa ta cần tạo một custom data type mới.

## Tạo Struct

Ta đã biết cách định nghĩa data type mới bằng class, nhưng còn một lựa chọn khác gọi là **structure**, viết tắt là **struct**:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;
};
```

### `Vector3` là gì?

**Vector** là một thuật ngữ từ toán học — đơn giản là một container lưu một tập variable có liên quan, thường là các con số.

Vector là cách phổ biến nhất để biểu diễn position và direction trong một không gian. Vì vậy, custom type `Vector3` — đôi khi viết tắt là `Vec3` — thường là một trong những type nền tảng nhất của chương trình mô phỏng môi trường vật lý.

Số `3` trong tên type cho biết đây là vector ba chiều, dùng để lưu position trong môi trường 3D.

Kiến thức và cách ứng dụng vector sẽ được mở rộng trong nhiều bài ở phần còn lại của khóa học.

### Kiểm tra kiến thức: Định nghĩa Struct

**Ta có thể tạo một struct biểu diễn combat ability như thế nào?**

1.

```cpp
auto Ability {
    int MinDamage;
    int MaxDamage;
    float CritChance;
};
```

Cú pháp này chưa đúng. Hãy nhớ keyword chính dùng để định nghĩa structure trong C++.

2.

```cpp
struct Ability {
    int MinDamage;
    int MaxDamage;
    float CritChance;
};
```

**Đúng.** Keyword `struct` dùng để định nghĩa một structure mới.

3.

```cpp
typedef Ability {
    int MinDamage;
    int MaxDamage;
    float CritChance;
};
```

Cú pháp này không dùng để định nghĩa structure. `typedef` có mục đích khác trong C++ và sẽ được học sau. Hãy nhớ keyword cụ thể dùng để định nghĩa data type mới như ví dụ này.

## Struct và Class — khác biệt kỹ thuật

Có thể bố đang nghĩ bài toán này cũng giải quyết được bằng class. Điều đó hoàn toàn đúng — `Vector3` hoàn toàn có thể là một class.

Trong C++, struct và class gần như giống hệt nhau. Khác biệt duy nhất là mặc định member của class là `private`, còn member của struct là `public`.

```cpp
class Player {
    // Member này là private:
    int Level;

public:
    // Muốn public thì phải chỉ rõ:
    int Health;
};

struct Ability {
    // Member này là public:
    int Damage;

private:
    // Struct vẫn có thể có vùng không public
    // ...
};
```

Ngoài điểm đó, không có khác biệt kỹ thuật đáng kể — ta tạo và dùng struct giống như class. Struct có thể có function, constructor, destructor và mọi thứ khác mà class có.

Mọi điều đã học — và sẽ học sau này — về class cũng áp dụng cho struct.

## Struct và Class — khác biệt về ý nghĩa sử dụng

Dù struct và class gần như giống hệt về mặt kỹ thuật, cộng đồng C++ vẫn gán cho chúng những ý nghĩa sử dụng khác nhau.

Quan điểm phổ biến là struct dùng để tạo type đơn giản hơn, còn class dùng để tạo type mạnh và phức tạp hơn.

Style guide của Google đưa ra khuyến nghị sau, và nhiều developer hoặc company cũng có quan điểm tương tự:

> Struct nên dùng cho object thụ động, chủ yếu mang dữ liệu và không có functionality nào ngoài việc truy cập hoặc gán data member.

Mọi field nên là `public` và được truy cập trực tiếp thay vì thông qua getter hoặc setter.

Method không nên cung cấp behavior phức tạp, mà chỉ nên phục vụ việc thiết lập dữ liệu, ví dụ constructor, `Initialize()` hoặc `Reset()`.

Nếu cần nhiều functionality hơn, class phù hợp hơn. Khi phân vân, hãy dùng class.

Khác biệt giữa class và struct cũng có thể trở nên quan trọng hơn một chút khi làm việc trong ecosystem khác, chẳng hạn game engine.

Ví dụ, trong Unreal Engine, struct có những giới hạn kỹ thuật thực sự, qua đó gần như ép developer tuân theo convention “struct dành cho thứ đơn giản”.

### Kiểm tra kiến thức: Struct và Class

**Khác biệt chính giữa struct và class là gì?**

1. Không có khác biệt nào.

   Chưa chính xác. Struct và class rất giống nhau trong C++, nhưng có một khác biệt quan trọng về access specifier mặc định.

2. Class mạnh hơn, còn struct nhẹ hơn.

   Đây là một hiểu lầm phổ biến. Hãy tập trung vào khía cạnh kỹ thuật, đặc biệt là quyền truy cập member theo mặc định.

3. Member của class mặc định là `private`; member của struct mặc định là `public`.

   **Đúng.** Đây là khác biệt nền tảng giữa struct và class trong C++.

4. Có thể tạo object từ class, còn struct hoàn toàn “static”.

   Không đúng. Ta có thể tạo instance từ cả struct lẫn class. Khác biệt chính nằm ở access specifier mặc định của member.

## Aggregate Initialization

**Aggregate initialization** là một feature giúp đơn giản hóa quá trình khởi tạo object đơn giản.

Nó cho phép khởi tạo trực tiếp member của struct hoặc class mà không cần định nghĩa constructor rõ ràng. Xét struct `Vector3` trước đó:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;
};
```

Trong tình huống thông thường, ta có thể cần định nghĩa constructor để khởi tạo các giá trị này. Tuy nhiên, với aggregate initialization, ta có thể gán trực tiếp giá trị cho `x`, `y` và `z` khi tạo `Vector3`:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;
};

int main() {
    Vector3 Position{1.9F, 2.6F, 0.3F};
}
```

Trong ví dụ này, `Position` là một instance của `Vector3`, với `x`, `y` và `z` lần lượt được khởi tạo bằng `1.9`, `2.6` và `0.3`.

Aggregate initialization không phải lúc nào cũng khả dụng. Nội dung này được trình bày chi tiết trong khóa nâng cao, nhưng ý tưởng cơ bản là chỉ những type đơn giản mới có thể được instantiate theo cách này. Nếu áp dụng convention dùng struct cho type đơn giản, aggregate initialization vì vậy thường được dùng với struct.

Nếu tạo type phức tạp hơn, chẳng hạn type có private variable, aggregate initialization sẽ không còn khả dụng. Ta cần tự thêm constructor, và nhiều khả năng cũng sẽ khai báo type phức tạp đó là class thay vì struct.

## Summary

Trong bài này, ta đã tìm hiểu struct trong C++ cùng khác biệt kỹ thuật và khác biệt về ý nghĩa sử dụng so với class. Các ý chính:

- Struct là lựa chọn đơn giản để gom dữ liệu liên quan vào cùng một type.
- Member của struct mặc định là `public`, còn member của class mặc định là `private`. Đây là khác biệt kỹ thuật duy nhất giữa chúng.
- Struct thường dùng cho object thụ động mang dữ liệu, không có behavior hay functionality phức tạp.
- Aggregate initialization cho phép gán giá trị trực tiếp và gọn gàng cho member của struct, giúp code ngắn và rõ hơn.
- Khái niệm vector, cụ thể là `Vector3`, được giới thiệu như một type nền tảng trong ứng dụng đồ họa và là ví dụ thực tế về cách dùng struct.
