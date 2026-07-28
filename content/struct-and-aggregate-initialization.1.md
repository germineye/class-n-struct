# Struct và Khởi tạo tổng hợp

Khám phá vai trò của struct, điểm khác nhau giữa struct và class, cùng cách khởi tạo struct mà không cần tự định nghĩa constructor.

Trong một số ví dụ về class, ta từng đề cập rằng đối tượng nên có thuộc tính như `WorldPosition` — vị trí hiện tại của character trong thế giới.

Trong môi trường 3D, vị trí này được biểu diễn bằng ba số riêng biệt, hay ba tọa độ, thường gọi là `x`, `y` và `z`.

Ta có thể lưu chúng thành ba biến riêng. Tuy nhiên, thông thường tốt hơn nhiều nếu gom các tọa độ này lại để chúng có thể được sử dụng và truyền đi như một đối tượng duy nhất. Điều đó có nghĩa ta cần tạo một kiểu dữ liệu tùy chỉnh mới.

## Tạo Struct

Ta đã biết cách định nghĩa kiểu dữ liệu mới bằng class, nhưng còn một lựa chọn khác gọi là **cấu trúc**, viết tắt là **struct**:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;
};
```

### `Vector3` là gì?

**Vector** là một thuật ngữ từ toán học — đơn giản là một vùng chứa lưu một tập biến có liên quan, thường là các con số.

Vector là cách phổ biến nhất để biểu diễn vị trí và hướng trong một không gian. Vì vậy, kiểu tùy chỉnh `Vector3` — đôi khi viết tắt là `Vec3` — thường là một trong những kiểu nền tảng nhất của chương trình mô phỏng môi trường vật lý.

Số `3` trong tên kiểu cho biết đây là vector ba chiều, dùng để lưu vị trí trong môi trường 3D.

Kiến thức và cách ứng dụng vector sẽ được mở rộng trong nhiều bài ở phần còn lại của khóa học.

### Kiểm tra kiến thức: Định nghĩa Struct

**Ta có thể tạo một struct biểu diễn khả năng chiến đấu như thế nào?**

1.

```cpp
auto Ability {
    int MinDamage;
    int MaxDamage;
    float CritChance;
};
```

Cú pháp này chưa đúng. Hãy nhớ từ khóa chính dùng để định nghĩa cấu trúc trong C++.

2.

```cpp
struct Ability {
    int MinDamage;
    int MaxDamage;
    float CritChance;
};
```

**Đúng.** Từ khóa `struct` dùng để định nghĩa một cấu trúc mới.

3.

```cpp
typedef Ability {
    int MinDamage;
    int MaxDamage;
    float CritChance;
};
```

Cú pháp này không dùng để định nghĩa cấu trúc. `typedef` có mục đích khác trong C++ và sẽ được học sau. Hãy nhớ từ khóa cụ thể dùng để định nghĩa kiểu dữ liệu mới như ví dụ này.

## Struct và Class — khác biệt kỹ thuật

Có thể bố đang nghĩ bài toán này cũng giải quyết được bằng class. Điều đó hoàn toàn đúng — `Vector3` hoàn toàn có thể là một class.

Trong C++, struct và class gần như giống hệt nhau. Khác biệt duy nhất là mặc định thành viên của class là `private`, còn thành viên của struct là `public`.

```cpp
class Player {
    // Thành viên này là private:
    int Level;

public:
    // Muốn public thì phải chỉ rõ:
    int Health;
};

struct Ability {
    // Thành viên này là public:
    int Damage;

private:
    // Struct vẫn có thể có vùng không public
    // ...
};
```

Ngoài điểm đó, không có khác biệt kỹ thuật đáng kể — ta tạo và dùng struct giống như class. Struct có thể có hàm, constructor, destructor và mọi thứ khác mà class có.

Mọi điều đã học — và sẽ học sau này — về class cũng áp dụng cho struct.

## Struct và Class — khác biệt về ý nghĩa sử dụng

Dù struct và class gần như giống hệt về mặt kỹ thuật, cộng đồng C++ vẫn gán cho chúng những ý nghĩa sử dụng khác nhau.

Quan điểm phổ biến là struct dùng để tạo kiểu đơn giản hơn, còn class dùng để tạo kiểu mạnh và phức tạp hơn.

Hướng dẫn phong cách của Google đưa ra khuyến nghị sau, và nhiều lập trình viên hoặc công ty cũng có quan điểm tương tự:

> Struct nên dùng cho đối tượng thụ động, chủ yếu mang dữ liệu và không có chức năng nào ngoài việc truy cập hoặc gán thành viên dữ liệu.

Mọi trường nên là `public` và được truy cập trực tiếp thay vì thông qua getter hoặc setter.

Phương thức không nên cung cấp hành vi phức tạp, mà chỉ nên phục vụ việc thiết lập dữ liệu, ví dụ constructor, `Initialize()` hoặc `Reset()`.

Nếu cần nhiều chức năng hơn, class phù hợp hơn. Khi phân vân, hãy dùng class.

Khác biệt giữa class và struct cũng có thể trở nên quan trọng hơn một chút khi làm việc trong hệ sinh thái khác, chẳng hạn công cụ phát triển trò chơi.

Ví dụ, trong Unreal Engine, struct có những giới hạn kỹ thuật thực sự, qua đó gần như ép lập trình viên tuân theo quy ước “struct dành cho thứ đơn giản”.

### Kiểm tra kiến thức: Struct và Class

**Khác biệt chính giữa struct và class là gì?**

1. Không có khác biệt nào.

   Chưa chính xác. Struct và class rất giống nhau trong C++, nhưng có một khác biệt quan trọng về bộ chỉ định truy cập mặc định.

2. Class mạnh hơn, còn struct nhẹ hơn.

   Đây là một hiểu lầm phổ biến. Hãy tập trung vào khía cạnh kỹ thuật, đặc biệt là quyền truy cập thành viên theo mặc định.

3. Thành viên của class mặc định là `private`; thành viên của struct mặc định là `public`.

   **Đúng.** Đây là khác biệt nền tảng giữa struct và class trong C++.

4. Có thể tạo đối tượng từ class, còn struct hoàn toàn “static”.

   Không đúng. Ta có thể tạo đối tượng từ cả struct lẫn class. Khác biệt chính nằm ở bộ chỉ định truy cập mặc định của thành viên.

## Khởi tạo tổng hợp

**Khởi tạo tổng hợp** là một tính năng giúp đơn giản hóa quá trình khởi tạo đối tượng đơn giản.

Nó cho phép khởi tạo trực tiếp thành viên của struct hoặc class mà không cần định nghĩa constructor rõ ràng. Xét struct `Vector3` trước đó:

```cpp
struct Vector3 {
    float x;
    float y;
    float z;
};
```

Trong tình huống thông thường, ta có thể cần định nghĩa constructor để khởi tạo các giá trị này. Tuy nhiên, với khởi tạo tổng hợp, ta có thể gán trực tiếp giá trị cho `x`, `y` và `z` khi tạo `Vector3`:

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

Trong ví dụ này, `Position` là một đối tượng kiểu `Vector3`; ba thành viên `x`, `y` và `z` lần lượt nhận giá trị `1.9`, `2.6` và `0.3`.

Khởi tạo tổng hợp không phải lúc nào cũng khả dụng. Nội dung này được trình bày chi tiết trong khóa nâng cao, nhưng ý tưởng cơ bản là chỉ những kiểu đơn giản mới có thể được tạo theo cách này. Nếu áp dụng quy ước dùng struct cho kiểu đơn giản, khởi tạo tổng hợp vì vậy thường được dùng với struct.

Nếu tạo kiểu phức tạp hơn, chẳng hạn kiểu có private biến, khởi tạo tổng hợp sẽ không còn khả dụng. Ta cần tự thêm constructor, và nhiều khả năng cũng sẽ khai báo kiểu phức tạp đó là class thay vì struct.

## Tóm tắt

Trong bài này, ta đã so sánh struct với class cả về cú pháp lẫn cách sử dụng. Các ý chính:

- Struct là lựa chọn đơn giản để gom dữ liệu liên quan vào cùng một kiểu.
- Thành viên của struct mặc định là `public`, còn thành viên của class mặc định là `private`. Đây là khác biệt kỹ thuật duy nhất giữa chúng.
- Struct thường dùng cho đối tượng thụ động mang dữ liệu, không có hành vi hay chức năng phức tạp.
- Khởi tạo tổng hợp cho phép gán giá trị trực tiếp và gọn gàng cho thành viên của struct, giúp mã ngắn và rõ hơn.
- Khái niệm vector, cụ thể là `Vector3`, được giới thiệu như một kiểu nền tảng trong ứng dụng đồ họa và là ví dụ thực tế về cách dùng struct.
