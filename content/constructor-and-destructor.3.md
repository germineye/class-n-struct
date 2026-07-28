## Constructor mặc định

Trước đây, ta đã thấy có thể tạo đối tượng từ class mà không cung cấp đối số:

```cpp
Monster Basher;
```

Điều này xảy ra vì class ban đầu có sẵn constructor mặc định.

Tuy nhiên, sau khi ta định nghĩa constructor tùy chỉnh, constructor mặc định tự sinh sẽ bị xóa.

Nếu muốn cho phép đối tượng được tạo mà không có đối số, ta có thể tự triển khai lại constructor mặc định bằng cách cung cấp constructor không nhận đối số:

```cpp
class Monster {
public:
    // Constructor mặc định
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

Nếu không cần cách triển khai riêng, ta có thể dùng cú pháp `= default` để khôi phục constructor mặc định ban đầu:

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

## Nguyên mẫu constructor

Tương tự hàm khác, ta có thể khai báo và định nghĩa constructor ở các vị trí khác nhau. Cú pháp giống hệt nội dung đã học trong bài trước:

```cpp
class Monster {
public:
    // Nguyên mẫu
    Monster(int Health);

private:
    int mHealth{150};
};

// Định nghĩa
Monster::Monster(int Health) {
    mHealth = Health;
}
```
