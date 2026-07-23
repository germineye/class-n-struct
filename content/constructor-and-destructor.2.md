

Khi gọi constructor — bằng cách khai báo object thuộc type đó — ta cũng phân cách các argument bằng dấu phẩy:

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

### Member Initializer List

Trong C++, constructor có cú pháp riêng để khởi tạo member variable. Cú pháp này được gọi là **member initializer list** và trông như sau:

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

Hiện tại, ta sẽ tiếp tục khởi tạo member trong constructor body. Member initializer list và lợi ích của nó sẽ được giới thiệu đầy đủ trong một bài riêng ở chương sau.

## Nhiều Constructor

Class có thể định nghĩa nhiều constructor, cho phép object được tạo bằng nhiều danh sách argument khác nhau.

Dưới đây, consumer của class có thể tạo object bằng cách cung cấp một `std::string` biểu diễn tên quái vật, hoặc cung cấp cả `std::string` và `int` biểu diễn tên cùng giá trị `Health` ban đầu:

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

Giống function khác, constructor có thể có optional parameter. Điều này cho phép một constructor duy nhất hỗ trợ nhiều danh sách argument.

Code trước có thể — và nên — được đơn giản hóa thành:

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

## Ambiguous Constructor Call

Khi định nghĩa nhiều constructor, ta cần bảo đảm chúng không “chồng lấn”. Cụ thể, mỗi khi tạo object, phải chỉ có đúng một constructor hỗ trợ danh sách argument đã cung cấp.

Dưới đây, ta có hai constructor cùng nhận một parameter `int`.

Điều này không hợp lệ vì nếu ai đó instantiate class bằng một argument `int`, compiler không thể biết constructor nào cần được dùng:

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

Khi vi phạm yêu cầu này, ta thường nhận compiler error tại nơi class được định nghĩa:

```text
error: 'Monster::Monster(int)': member function
already defined or declared
```

Trong một số tình huống, định nghĩa class có thể hợp lệ, nhưng ta nhận lỗi khi cố tạo object bằng danh sách argument mà nhiều constructor đều có thể xử lý:

```text
error: 'Monster::Monster': ambiguous call to
overloaded function
```

## Default Constructor

Trước đây, ta đã thấy có thể tạo object từ class mà không cung cấp argument:

```cpp
Monster Basher;
```

Điều này xảy ra vì class ban đầu có sẵn default constructor.