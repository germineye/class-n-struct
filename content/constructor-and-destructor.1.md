# Constructor và Destructor

Tìm hiểu các hàm đặc biệt có thể thêm vào class để kiểm soát cách đối tượng được tạo và bị hủy.

Với kiểu có sẵn như `int` và `std::string`, ta đã thấy cách đặt giá trị ban đầu khi tạo đối tượng:

```cpp
int Health{100};
std::string Name{"Roderick"};
```

Trong bài này, ta sẽ áp dụng cách khởi tạo tương tự cho kiểu tự định nghĩa:

```cpp
Monster Goblin{"Basher the Goblin"};
```

Ta mở khóa khả năng này bằng cách thêm constructor vào class.

## Constructor

Constructor trong C++ là một hàm thành viên đặc biệt của class, được thực thi mỗi khi ta tạo đối tượng mới thuộc class đó. Để định nghĩa constructor, ta định nghĩa một hàm thành viên có hai đặc điểm chính:

- Có cùng tên với class.
- Không có kiểu trả về, kể cả `void`.

Ví dụ, constructor của class `Monster` trông như sau:

```cpp
class Monster {
public:
    Monster() {

    }
};
```

### Constructor không public

Ta nên bảo đảm constructor luôn nằm trong vùng `public`.

Trong một số trường hợp hiếm, constructor có thể là `protected` hoặc `private`; khóa nâng cao sẽ giải thích các tình huống này.

Khi gặp lỗi bất ngờ lúc tạo đối tượng, hãy kiểm tra xem constructor có nằm trong vùng `public` hay không để mã đang sử dụng nó có thể truy cập.

Mục đích của constructor là khởi tạo thuộc tính của đối tượng và có thể thiết lập những điều kiện tiên quyết cần thiết để đối tượng hoạt động.

Constructor không nhận đối số được gọi là **constructor mặc định**. Ví dụ trước không có đối số, nên đó là constructor mặc định của kiểu `Monster`.

Loại constructor này được dùng khi ta muốn tạo đối tượng nhưng không cần chỉ định giá trị ban đầu cho thuộc tính.

Như đã thấy, trước đây ta có thể tạo đối tượng mà không truyền đối số bằng câu lệnh như sau:

```cpp
Monster Goblin;
```

Điều này có thể thực hiện vì class mặc định được cung cấp một constructor mặc định cơ bản. Constructor này không xuất hiện trong mã, nhưng nếu trình biên dịch thấy class không có constructor mặc định, nó sẽ âm thầm tạo một constructor cơ bản cho ta.

Tuy nhiên, ta có thể thay constructor do trình biên dịch tạo bằng logic riêng để triển khai bất kỳ hành vi nào chương trình cần.

Hãy xem một ví dụ cơ bản về constructor mặc định:

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

### Quy ước đặt tên biến của class

Trong ví dụ trước, ta thêm chữ `m` vào đầu biến của class, như `mName`. Đây là viết tắt của “thành viên”.

Dùng quy ước đặt tên cho thành viên của class, chẳng hạn thêm tiền tố `m`, có thể hữu ích vì nhiều lý do.

Nó đặc biệt hữu ích khi tạo constructor nhận tham số, vì giúp tránh nhầm lẫn giữa tham số và thành viên của class mà tham số đó dùng để khởi tạo.

Ví dụ, để constructor rõ ràng với bên sử dụng, ta muốn tham số dùng để khởi tạo tên đối tượng được gọi là `Name`.

Nhưng nếu thành viên của class cũng gọi là `Name`, mã có thể trở nên rất khó đọc, đặc biệt trong constructor đang cố gán `Name` của class bằng `Name` từ tham số.

Vì vậy, người ta thường đặt tên nhất quán cho các thành viên nội bộ — chẳng hạn thêm tiền tố `m` cho biến nằm trong vùng `private`.

Một số quy ước thường gặp khác là dùng dấu gạch dưới `_` làm tiền tố, ví dụ `_name`, hoặc hậu tố, ví dụ `Name_`. Tất cả các quy ước này đều phục vụ cùng một mục đích.

## Tham số của constructor

Giống hàm khác, constructor có thể được thiết kế để nhận đối số, rồi dùng các đối số đó bên trong thân constructor.

Thông thường, điều này cho phép lập trình viên truyền trực tiếp giá trị cho thuộc tính của đối tượng. Chẳng hạn, constructor nhận một đối số có thể dùng để thiết lập một thuộc tính cụ thể của class.

Dưới đây, ta tạo constructor nhận một đối số `std::string`, cho phép đặt tên quái vật ngay khi đối tượng được tạo:

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

Tương tự những loại hàm khác, constructor có thể có nhiều tham số, phân cách bằng dấu phẩy.

Khi gọi constructor — bằng cách khai báo đối tượng thuộc kiểu đó — ta cũng phân cách các đối số bằng dấu phẩy:

```cpp
#include <iostream>
#include <string>

class Monster {
public:
    Monster(std::string Name, int Health) {
        mName = Name;
        mHealth = Health;
        std::cout << mName << " Ready for Battle!"
                  << "\nHealth: " << mHealth;
    }

private:
    std::string mName;
    int mHealth;
};

int main() {
    Monster Goblin{"Bonker", 150};
}
```

```text
Bonker Ready for Battle!
Health: 150
```

### Danh sách khởi tạo thành viên

Trong C++, constructor có cú pháp riêng để khởi tạo thành viên biến. Cú pháp này được gọi là **danh sách khởi tạo thành viên** và trông như sau:

```cpp
#include <iostream>
#include <string>

class Monster {
public:
    Monster(std::string Name, int Health)
        : mName{Name}, mHealth{Health} {
        std::cout << mName << " Ready for Battle!"
                  << "\nHealth: " << mHealth;
    }

private:
    std::string mName;
    int mHealth;
};

int main() {
    Monster Goblin{"Bonker", 150};
}
```

Hiện tại, ta sẽ tiếp tục khởi tạo thành viên trong thân constructor. Danh sách khởi tạo thành viên và lợi ích của nó sẽ được giới thiệu đầy đủ trong một bài riêng ở chương sau.
