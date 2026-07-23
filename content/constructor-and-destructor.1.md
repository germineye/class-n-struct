# Constructor và Destructor

Tìm hiểu các special function có thể thêm vào class để kiểm soát cách object được tạo và bị hủy.

Với built-in type như `int` và `std::string`, ta đã thấy cách đặt giá trị ban đầu khi tạo object:

```cpp
int Health{100};
std::string Name{"Roderick"};
```

Trong bài này, ta cũng sẽ học cách cung cấp khả năng tương tự cho user-defined type:

```cpp
Monster Goblin{"Basher the Goblin"};
```

Ta mở khóa khả năng này bằng cách thêm constructor vào class.

## Constructor

Constructor trong C++ là một special member function của class, được thực thi mỗi khi ta tạo object mới thuộc class đó. Để định nghĩa constructor, ta định nghĩa một member function có hai đặc điểm chính:

- Có cùng tên với class.
- Không có return type, kể cả `void`.

Ví dụ, constructor của class `Monster` trông như sau:

```cpp
class Monster {
public:
    Monster() {

    }
};
```

### Constructor không Public

Ta nên bảo đảm constructor luôn nằm trong vùng `public`.

Có một số trường hợp ta muốn constructor là `protected` hoặc `private`, nhưng đó là những use case hiếm sẽ được đề cập trong khóa nâng cao.

Khi gặp lỗi bất ngờ lúc tạo object, hãy kiểm tra xem constructor có nằm trong vùng `public` hay không để code đang sử dụng nó có thể truy cập.

Mục đích của constructor là khởi tạo property của object và có thể thiết lập những điều kiện tiên quyết cần thiết để object hoạt động.

Constructor không nhận argument được gọi là **default constructor**. Ví dụ trước không có argument, nên đó là default constructor của type `Monster`.

Loại constructor này được dùng khi ta muốn tạo object nhưng không cần chỉ định giá trị ban đầu cho property.

Như đã thấy, trước đây ta có thể tạo object mà không truyền argument bằng statement như sau:

```cpp
Monster Goblin;
```

Điều này có thể thực hiện vì class mặc định được cung cấp một default constructor cơ bản. Constructor này không xuất hiện trong code, nhưng nếu compiler thấy class không có default constructor, nó sẽ âm thầm tạo một constructor cơ bản cho ta.

Tuy nhiên, ta có thể thay constructor do compiler tạo bằng logic riêng để triển khai bất kỳ behavior nào chương trình cần.

Hãy xem một ví dụ cơ bản về default constructor:

```cpp
#include <iostream>
#include <string>

class Monster {
public:
    Monster() {
        std::cout << "Ready for Battle!";
    }

private:
    std::string mName;
};

int main() {
    Monster Goblin;
}
```

```text
Ready for Battle!
```

### Quy ước đặt tên Class Variable

Trong ví dụ trước, ta thêm chữ `m` vào đầu class variable, như `mName`. Đây là viết tắt của “member”.

Dùng naming convention cho class member, chẳng hạn thêm tiền tố `m`, có thể hữu ích vì nhiều lý do.

Nó đặc biệt hữu ích khi tạo constructor nhận parameter, vì giúp tránh nhầm lẫn giữa parameter và class member mà parameter đó dùng để khởi tạo.

Ví dụ, để constructor rõ ràng với consumer, ta muốn parameter dùng để khởi tạo tên object được gọi là `Name`.

Nhưng nếu class member cũng gọi là `Name`, code có thể trở nên rất khó đọc, đặc biệt trong constructor đang cố gán `Name` của class bằng `Name` từ parameter.

Vì vậy, việc áp dụng một naming convention nhất quán cho private internal member — chẳng hạn thêm tiền tố `m` — khá phổ biến.

Một số convention thường gặp khác là dùng dấu gạch dưới `_` làm tiền tố, ví dụ `_name`, hoặc hậu tố, ví dụ `Name_`. Tất cả các convention này đều phục vụ cùng một mục đích.

## Constructor Parameter

Giống function khác, constructor có thể được thiết kế để nhận argument, rồi dùng các argument đó bên trong constructor body.

Thông thường, điều này cho phép developer truyền trực tiếp giá trị cho property của object. Chẳng hạn, constructor nhận một argument có thể dùng để thiết lập một property cụ thể của class.

Dưới đây, ta tạo constructor nhận một argument `std::string`, cho phép đặt tên quái vật ngay khi object được tạo:

```cpp
#include <iostream>
#include <string>

class Monster {
public:
    Monster(std::string Name) {
        mName = Name;
        std::cout << mName << " Ready for Battle!";
    }

private:
    std::string mName;
};

int main() {
    Monster Goblin{"Bonker"};
}
```

```text
Bonker Ready for Battle!
```

Tương tự những loại function khác, constructor có thể có nhiều parameter, phân cách bằng dấu phẩy.