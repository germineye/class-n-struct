

Tuy nhiên, sau khi ta định nghĩa custom constructor, default constructor tự sinh sẽ bị xóa.

Nếu muốn cho phép object được tạo mà không có argument, ta có thể tự triển khai lại default constructor bằng cách cung cấp constructor không nhận argument:

```cpp
class Monster {
public:
    // Default constructor
    Monster() {
        // ...
    }

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
```

Nếu không cần implementation riêng, ta có thể dùng cú pháp `= default` để khôi phục default constructor ban đầu:

```cpp
class Monster {
public:
    Monster() = default;

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
```

## Constructor Prototype

Tương tự function khác, ta có thể khai báo và định nghĩa constructor ở các vị trí khác nhau. Cú pháp giống hệt nội dung đã học trong bài trước:

```cpp
class Monster {
public:
    // Prototype
    Monster(int Health);

private:
    int mHealth{150};
};

// Definition
Monster::Monster(int Health) {
    mHealth = Health;
}
```

## Destructor

Destructor là một special member function khác của class và bổ sung cho constructor.

Nó được tự động gọi khi object bị hủy.

Cú pháp của destructor tương tự constructor nhưng có thêm dấu ngã `~` ở đầu. Ví dụ đơn giản:

```cpp
class Monster {
public:
    // Destructor
    ~Monster() {
        // ...
    }
};
```

Thời điểm object bị hủy và vòng đời object nói chung sẽ trở nên quan trọng hơn khi ta đi vào các chủ đề nâng cao.

Hiện tại, chỉ cần ghi nhớ rằng một trường hợp object bị hủy là khi scope nơi nó được tạo kết thúc.

Ví dụ dưới đây tạo `Goblin` bên trong function, rồi object tự động bị hủy khi function kết thúc:

```cpp
#include <iostream>

class Monster {
public:
    // Constructor
    Monster() {
        std::cout << "Monster Created\n";
    }

    // Destructor
    ~Monster() {
        std::cout << "Monster Destroyed\n";
    }
};

void SomeFunction() {
    Monster Goblin;
}

int main() {
    std::cout << "Hello World\n";
    SomeFunction();
    std::cout << "Goodbye!";
}
```

```text
Hello World
Monster Created
Monster Destroyed
Goodbye!
```

### Kiểm tra kiến thức: Constructor và Destructor

Giả sử ta có class sau:

```cpp
class Robot {
public:
    Robot(std::string Model, int Year = 2024) {
        mModel = Model;
        mYear = Year;
    }

private:
    std::string mModel;
    int mYear;
};
```

**Kết quả của statement `Robot MyRobot("RX100");` là gì?**

1. Object `MyRobot` được tạo với `mModel` bằng `"RX100"`, còn `mYear` chưa được khởi tạo.

   Gần đúng, nhưng `mYear` không bị bỏ chưa khởi tạo. Constructor cung cấp giá trị mặc định `2024` cho `Year`.

2. Xảy ra compilation error vì thiếu parameter.

   Không đúng. Constructor `Robot` có thể xử lý trường hợp chỉ cung cấp một parameter nhờ giá trị mặc định của `Year`.

3. Object `MyRobot` được tạo với `mModel` bằng `"RX100"` và `mYear` bằng `2024`.

   **Đúng.** Constructor `Robot` cung cấp giá trị mặc định `2024` cho parameter `Year`. Vì vậy khi `MyRobot` được tạo chỉ với model `"RX100"`, `mYear` tự động nhận giá trị `2024`.

Cho class sau:

```cpp
class Creature {
public:
    Creature(std::string Name) {
        mName = Name;
    }

    Creature() {
        mName = "Unknown";
    }

private:
    std::string mName;
};
```

**Điều gì xảy ra nếu tạo object `Creature` mà không truyền argument?**

1. Xảy ra compilation error vì thiếu argument.

   Không đúng. Class `Creature` có định nghĩa default constructor, vì vậy object có thể được tạo mà không truyền argument.

2. Một object `Creature` được tạo với tên `"Unknown"`.

   **Đúng.** Default constructor đặt `mName` thành `"Unknown"`, nên việc tạo object không có argument sẽ gọi constructor này.

3. Object được tạo với tên chưa được khởi tạo.

   Không đúng. Default constructor khởi tạo rõ ràng `mName` bằng `"Unknown"`.

**Điều gì xảy ra khi định nghĩa custom constructor trong class nhưng không định nghĩa rõ default constructor?**