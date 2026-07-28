# Danh sách khởi tạo thành viên

Bài này giới thiệu danh sách khởi tạo thành viên, tập trung vào lợi ích về hiệu năng, độ dễ đọc và cách sử dụng hiệu quả.

Trong các bài trước, ta đã thấy cách khởi tạo thành viên của class bằng giá trị cụ thể bên trong thân constructor:

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

Constructor và destructor là các hàm đặc biệt có thể thêm vào class để kiểm soát cách đối tượng được tạo và bị hủy.

C++ cung cấp một cú pháp riêng cho mục đích khởi tạo thành viên, gọi là **danh sách khởi tạo thành viên**.

## Định nghĩa danh sách khởi tạo thành viên

Ví dụ trước, nơi ta khởi tạo `Health` thành `100` trong constructor, có thể được viết bằng danh sách khởi tạo thành viên như sau:

```cpp
class Character {
public:
    Character() : mHealth{150} {
        // Thân constructor nằm ở đây
    }

private:
    int mHealth;
};
```

Ta đặt danh sách khởi tạo giữa tên hàm và thân hàm, phân cách bằng dấu `:`.

Thân constructor vẫn nằm trong cặp dấu `{` và `}` như bình thường. Phần này có thể để trống như ví dụ trên hoặc chứa mã bổ sung khi cần.

### Kiểm tra kiến thức: Dùng danh sách khởi tạo thành viên

**Làm thế nào để cập nhật class sau để dùng danh sách khởi tạo thành viên?**

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

Ta vẫn cần cung cấp dấu ngoặc nhọn cho thân hàm, ngay cả khi không cần đặt mã bên trong.

2.

```cpp
class Weapon {
public:
    Weapon() : mDamage{150} {}

    int mDamage;
};
```

**Đúng.** `mDamage` được khởi tạo trực tiếp trong danh sách khởi tạo thành viên, còn thân constructor để trống.

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

Cách này vẫn dùng thân constructor để gán giá trị. Hãy tập trung vào việc khởi tạo trực tiếp thành viên trong danh sách khởi tạo.

## Vì sao dùng danh sách khởi tạo thành viên?

Danh sách khởi tạo thành viên có ba lợi ích chính so với mã tương đương trong thân constructor.

### Hiệu năng

Do chi tiết trong cách đối tượng được xây dựng, khởi tạo biến trong thân constructor chậm hơn một chút so với mức cần thiết.

Khi đối tượng được tạo, bộ nhớ được cấp cho các biến và chúng ban đầu nhận một giá trị mặc định. Điều này diễn ra trước khi thân constructor được thực thi. Nếu thân constructor sau đó thay đổi giá trị của các biến, chương trình phải quay lại và cập nhật những vị trí bộ nhớ đó.

Khi chỉ định giá trị ban đầu trong danh sách khởi tạo riêng, trình biên dịch có thể nhận biết và tối ưu quá trình thành một bước duy nhất.

### Độ dễ đọc của mã

Danh sách khởi tạo thành viên được thiết kế riêng để khởi tạo thành viên của class.

Sau khi quen với cú pháp, khi đọc lướt tệp ta có thể lập tức hiểu phần mã đó đang làm gì.

### Đôi khi là bắt buộc

Trong một số trường hợp, dùng danh sách khởi tạo thành viên là bắt buộc để có chức năng mong muốn. Ta sẽ thấy một ví dụ trong bài tiếp theo và thêm nhiều ví dụ ở phần sau của khóa học.

## Khởi tạo nhiều thành viên

Nếu muốn khởi tạo nhiều biến của class, ta thêm chúng vào danh sách và phân cách bằng dấu phẩy:

```cpp
class Character {
public:
    Character()
        : mHealth{150}, mLevel{5} {
        // Thân constructor nằm ở đây
    }

private:
    int mHealth;
    int mLevel;
};
```

## Dùng biểu thức trong danh sách khởi tạo thành viên

Giống việc khởi tạo biến khác, ta có thể dùng bất kỳ biểu thức nào tạo ra giá trị đúng kiểu. Ví dụ:

C++ khá linh hoạt về khoảng trắng, nên ta có thể xuống dòng và căn lề để mã dễ đọc hơn:

```cpp
int GetLevel() {
    return 5;
}

class Character {
public:
    Character()
        : mHealth{100 + 50},
          mLevel{GetLevel()} {
        // Thân constructor nằm ở đây
    }

private:
    int mHealth;
    int mLevel;
};
```

## Dùng tham số trong danh sách khởi tạo thành viên

Tất nhiên, các ví dụ trên hơi thừa. Chúng không thực sự cần danh sách khởi tạo hay constructor; ta có thể viết trực tiếp:

```cpp
class Character {
    int mHealth{100 + 50};
    int mLevel{GetLevel()};
};
```

Danh sách khởi tạo có thể sử dụng trực tiếp các đối số của constructor. Ví dụ dưới đây tạo hai đối tượng `Character`; mỗi lần gọi đều truyền hai đối số vào cùng một constructor:

```cpp
Character SmallCharacter{150, 5};
Character BigCharacter{300, 15};
```

Với danh sách khởi tạo thành viên, ta có thể thiết lập constructor để hỗ trợ cú pháp đó như sau:

```cpp
class Character {
public:
    Character(int Health, int Level)
        : mHealth{Health},
          mLevel{Level} {
        // Thân constructor nằm ở đây
    }

private:
    int mHealth;
    int mLevel;
};
```

### Kiểm tra kiến thức: Dùng danh sách khởi tạo thành viên với tham số

**Làm thế nào để cập nhật class sau để dùng danh sách khởi tạo thành viên?**

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

**Đúng.** Thành viên của class `mDamage` được khởi tạo trực tiếp bằng tham số `Damage`.

2.

```cpp
class Weapon {
public:
    Weapon(int Damage) : Damage{mDamage} {}

    int mDamage;
};
```

Thứ tự bị đảo ngược. Mã này đang cố khởi tạo biến tên `Damage` bằng tham số tên `mDamage`, trong khi cả biến lẫn tham số theo vai trò đó đều không tồn tại.

3.

```cpp
class Weapon {
public:
    Weapon(int mDamage = Damage) {}

    int mDamage;
};
```

Cách này nhầm lẫn tham số với thành viên của class. Trong danh sách khởi tạo, ta khởi tạo trực tiếp thành viên của class bằng tham số được cung cấp.

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

Cách này không dùng danh sách khởi tạo thành viên mà vẫn gán trong thân constructor. Hãy dùng danh sách khởi tạo để đặt thành viên của class trực tiếp.

## Tóm tắt

Trong bài này, ta đã tìm hiểu danh sách khởi tạo thành viên — cách khởi tạo trực tiếp các thành viên trước khi thân constructor chạy. Cách viết này thường rõ ràng và hiệu quả hơn. Các ý chính:

- Danh sách khởi tạo thành viên cho phép khởi tạo trực tiếp thành viên của class.
- Nó tránh việc khởi tạo rồi gán lại, nhờ đó có thể giảm công việc không cần thiết.
- Nó làm mã rõ ràng hơn vì thể hiện trực tiếp ý định khởi tạo.
- Trong một số trường hợp, danh sách khởi tạo thành viên là bắt buộc để class hoạt động đúng.
- Ta có thể khởi tạo nhiều thành viên, đồng thời dùng biểu thức và tham số của constructor trong danh sách khởi tạo.
