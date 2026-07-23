

    // Declaration
    void TakeDamage(int Damage);
};
```

Sau đó, ta có thể cung cấp definition ở nơi khác trong code.

Điểm khác biệt duy nhất là khi định nghĩa class function, ta cần cung cấp thêm tên class. Việc này được thực hiện bằng pattern `ClassName::FunctionName`.

Ví dụ, để định nghĩa function `TakeDamage()` cho class `Monster`, ta viết:

```cpp
class Monster {
public:
    int Health{150};

    // Declaration
    void TakeDamage(int Damage);
};

// Definition
void Monster::TakeDamage(int Damage) {
    Health -= Damage;
}
```

Cách viết này có thể trông khá lạ, nhưng vì những lý do sẽ được giải thích sau, rất nhiều code C++ được viết theo cách này. Trong khóa học này, ta sẽ chủ yếu khai báo và định nghĩa function cùng chỗ, nhưng hiện tại chỉ cần ghi nhớ rằng việc tách chúng ra là có thể.

## Summary

Các ý chính trong bài này:

- Giới thiệu class như một nền tảng của lập trình hướng đối tượng.
- Giải thích abstraction là quá trình khái quát hóa các object cụ thể thành những nhóm rộng hơn, giúp code hiệu quả và dễ quản lý hơn.
- Trình bày built-in type trong C++ như `int`, `bool` và `std::string` như các ví dụ về abstraction.
- Trình bày cách tạo user-defined type bằng class, cho phép định nghĩa custom object phù hợp với nhu cầu riêng của project.
- Làm rõ sự khác nhau giữa class và object: class là một nhóm trừu tượng, còn object là một instance của class đó.
- Giới thiệu việc instantiate class để tạo object, và cách dùng member access operator `.` để tương tác với variable và function của object.
- Minh họa cách định nghĩa class member, gồm cả variable và function.
- Giới thiệu class function prototype, cho thấy function có thể được khai báo trong class và định nghĩa ở nơi khác.
