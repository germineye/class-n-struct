## Nhiều constructor

Class có thể định nghĩa nhiều constructor, cho phép đối tượng được tạo bằng nhiều danh sách đối số khác nhau.

Dưới đây, bên sử dụng của class có thể tạo đối tượng bằng cách cung cấp một `std::string` biểu diễn tên quái vật, hoặc cung cấp cả `std::string` và `int` biểu diễn tên cùng giá trị `Health` ban đầu:

```cpp
#include <iostream>
#include <string>

class Monster {
public:
    Monster(std::string Name) {
        mName = Name;
        mHealth = 150;
        std::cout << mName << " Ready for Battle!"
                  << "\nHealth: " << mHealth;
    }

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
    Monster Bonker{"Bonker"};
    std::cout << '\n';
    Monster Basher{"Basher", 250};
}
```

```text
Bonker Ready for Battle!
Health: 150
Basher Ready for Battle!
Health: 250
```

Giống các hàm khác, constructor có thể dùng tham số mặc định. Nhờ đó, một constructor duy nhất có thể chấp nhận nhiều danh sách đối số.

Mã trước có thể — và nên — được đơn giản hóa thành:

```cpp
#include <iostream>
#include <string>

class Monster {
public:
    Monster(std::string Name, int Health = 150) {
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
    Monster Bonker{"Bonker"};
    std::cout << '\n';
    Monster Basher{"Basher", 250};
}
```

```text
Bonker Ready for Battle!
Health: 150
Basher Ready for Battle!
Health: 250
```

## Lời gọi constructor mơ hồ

Khi định nghĩa nhiều constructor, ta cần bảo đảm chúng không “chồng lấn”. Cụ thể, mỗi khi tạo đối tượng, phải chỉ có đúng một constructor hỗ trợ danh sách đối số đã cung cấp.

Dưới đây, ta có hai constructor cùng nhận một tham số `int`.

Điều này không hợp lệ vì nếu ai đó tạo đối tượng từ class bằng một đối số `int`, trình biên dịch không thể biết constructor nào cần được dùng:

```cpp
class Monster {
public:
    Monster(int Level) {
        mLevel = Level;
    }

    Monster(int Health) {
        mHealth = Health;
    }

private:
    int mLevel;
    int mHealth;
};

int main() {
    // Dùng constructor nào?
    Monster Bonker{10};
}
```

Nếu các constructor chồng lấn, trình biên dịch thường báo lỗi ngay tại định nghĩa class:

```text
error: 'Monster::Monster(int)': member function
already defined or declared
```

Trong một số tình huống, định nghĩa class có thể hợp lệ, nhưng ta nhận lỗi khi cố tạo đối tượng bằng danh sách đối số mà nhiều constructor đều có thể xử lý:

```text
error: 'Monster::Monster': ambiguous call to
overloaded function
```
