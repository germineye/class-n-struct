# Member Initializer List

Bài này giới thiệu member initializer list, tập trung vào lợi ích về performance, readability và cách sử dụng hiệu quả.

Trong các bài trước, ta đã thấy cách khởi tạo member của class bằng giá trị cụ thể bên trong constructor body:

```cpp
class Character {
public:
    Character() {
        mHealth = 100;
    }

private:
    int mHealth;
};
```

### Nhắc lại: Constructor và Destructor

Constructor và destructor là các special function có thể thêm vào class để kiểm soát cách object được tạo và bị hủy.

C++ cung cấp một cú pháp riêng cho mục đích khởi tạo member, gọi là **member initializer list**.

## Định nghĩa Member Initializer List

Ví dụ trước, nơi ta khởi tạo `Health` thành `100` trong constructor, có thể được viết bằng member initializer list như sau:

```cpp
class Character {
public:
    Character() : mHealth{150} {
        // Constructor body nằm ở đây
    }

private:
    int mHealth;
};
```

Ta đặt initializer list giữa tên function và function body, phân cách bằng dấu `:`.

Ta vẫn cung cấp constructor body bên trong cặp dấu `{` và `}` như bình thường. Body có thể để trống như ví dụ trên hoặc chứa bất kỳ code nào cần thiết.

### Kiểm tra kiến thức: Dùng Member Initializer List

**Làm thế nào để cập nhật class sau để dùng member initializer list?**

```cpp
class Weapon {
public:
    Weapon() {
        mDamage = 150;
    }

    int mDamage;
};
```

1.

```cpp
class Weapon {
public:
    Weapon() : mDamage{150};

    int mDamage;
};
```

Ta vẫn cần cung cấp dấu ngoặc nhọn cho function body, ngay cả khi không cần đặt code bên trong.

2.

```cpp
class Weapon {
public:
    Weapon() : mDamage{150} {}

    int mDamage;
};
```

**Đúng.** `mDamage` được khởi tạo trực tiếp trong member initializer list, còn constructor body để trống.

3.

```cpp
class Weapon {
public:
    Weapon(int Damage = 150) {
        mDamage = Damage;
    }

    int mDamage;
};
```

Cách này vẫn dùng constructor body để gán giá trị. Hãy tập trung vào việc khởi tạo trực tiếp member trong initializer list.

## Vì sao dùng Member Initializer List?

Member initializer list có ba lợi ích chính so với code tương đương trong constructor body.

### Performance

Do chi tiết trong cách object được xây dựng, khởi tạo variable trong constructor body chậm hơn một chút so với mức cần thiết.

Khi object được tạo, memory được cấp cho các variable và chúng ban đầu nhận một giá trị mặc định. Điều này diễn ra trước khi constructor body được thực thi. Nếu constructor body sau đó thay đổi giá trị của các variable, chương trình phải quay lại và cập nhật những memory location đó.

Khi chỉ định giá trị ban đầu trong initializer list riêng, compiler có thể nhận biết và tối ưu quá trình thành một bước duy nhất.

### Code Readability

Member initializer list được thiết kế riêng để khởi tạo class member.

Sau khi quen với cú pháp, khi đọc lướt file ta có thể lập tức hiểu phần code đó đang làm gì.

### Đôi khi là bắt buộc

Trong một số trường hợp, dùng member initializer list là bắt buộc để có functionality mong muốn. Ta sẽ thấy một ví dụ trong bài tiếp theo và thêm nhiều ví dụ ở phần sau của khóa học.

## Khởi tạo nhiều Member

Nếu muốn khởi tạo nhiều class variable, ta thêm chúng vào list và phân cách bằng dấu phẩy:

```cpp
class Character {
public:
    Character()
        : mHealth{150}, mLevel{5} {
        // Constructor body nằm ở đây
    }

private:
    int mHealth;
    int mLevel;
};
```

## Dùng Expression trong Member Initializer List

Giống việc khởi tạo variable khác, ta có thể dùng bất kỳ expression nào tạo ra giá trị đúng type. Ví dụ:

C++ không quá nhạy cảm với whitespace, nên ta thường có thể thêm line break và khoảng trắng khi cần để code dễ đọc hơn:

```cpp
int GetLevel() {
    return 5;
}

class Character {
public:
    Character()
        : mHealth{100 + 50},
          mLevel{GetLevel()} {
        // Constructor body nằm ở đây
    }

private:
    int mHealth;
    int mLevel;
};
```

## Dùng Parameter trong Member Initializer List

Tất nhiên, các ví dụ trên hơi thừa. Chúng không thực sự cần initializer list hay constructor; ta có thể viết trực tiếp:

```cpp
class Character {
    int mHealth{100 + 50};
    int mLevel{GetLevel()};
};
```

Điểm mạnh của việc khởi tạo variable từ constructor là ta có thể dùng argument được truyền vào constructor. Dưới đây là yêu cầu tạo hai object `Character`, mỗi request truyền hai argument cho một constructor giả định:

```cpp
Character SmallCharacter{150, 5};
Character BigCharacter{300, 15};
```

Với member initializer list, ta có thể thiết lập constructor để hỗ trợ cú pháp đó như sau:

```cpp
class Character {
public:
    Character(int Health, int Level)
        : mHealth{Health},
          mLevel{Level} {
        // Constructor body nằm ở đây
    }

private:
    int mHealth;
    int mLevel;
};
```

### Kiểm tra kiến thức: Dùng Member Initializer List với Parameter

**Làm thế nào để cập nhật class sau để dùng member initializer list?**

```cpp
class Weapon {
public:
    Weapon(int Damage) {
        mDamage = Damage;
    }

    int mDamage;
};
```

1.

```cpp
class Weapon {
public:
    Weapon(int Damage) : mDamage{Damage} {}

    int mDamage;
};
```

**Đúng.** Class member `mDamage` được khởi tạo trực tiếp bằng parameter `Damage`.

2.

```cpp
class Weapon {
public:
    Weapon(int Damage) : Damage{mDamage} {}

    int mDamage;
};
```

Thứ tự bị đảo ngược. Code này đang cố khởi tạo variable tên `Damage` bằng parameter tên `mDamage`, trong khi cả variable lẫn parameter theo vai trò đó đều không tồn tại.

3.

```cpp
class Weapon {
public:
    Weapon(int mDamage = Damage) {}

    int mDamage;
};
```

Cách này nhầm lẫn parameter với class member. Trong initializer list, ta khởi tạo trực tiếp class member bằng parameter được cung cấp.

4.

```cpp
class Weapon {
public:
    Weapon(int Damage = 150) {
        mDamage = Damage;
    }

    int Damage;
};
```

Cách này không dùng member initializer list mà vẫn gán trong constructor body. Hãy dùng initializer list để đặt class member trực tiếp.

## Summary

Trong bài này, ta đã tìm hiểu member initializer list và cách nó cung cấp phương pháp hiệu quả hơn để khởi tạo class member, cải thiện cả performance lẫn code readability. Các ý chính:

- Member initializer list cho phép khởi tạo trực tiếp class member.
- Nó cải thiện performance bằng cách giảm số operation trong quá trình tạo object.
- Nó làm code rõ ràng hơn vì thể hiện trực tiếp ý định khởi tạo.
- Trong một số trường hợp, member initializer list là bắt buộc để class hoạt động đúng.
- Ta có thể khởi tạo nhiều member, đồng thời dùng expression và constructor parameter trong initializer list.
