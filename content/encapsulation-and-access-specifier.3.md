## Thành viên public và private

Để diễn đạt mục tiêu thiết kế này bằng thuật ngữ C++, ta muốn một phần class là `public` và một phần là `private`.

Những phần mà ta muốn mã bên ngoài sử dụng sẽ là `public`. Đây là giao diện thân thiện hướng ra bên ngoài.

Những phần mà ta không muốn người khác can thiệp sẽ là `private`.

Trong định nghĩa class trước đó, ta đã có từ khóa `public`:

```cpp
class Monster {
public:
    int Health{150};
};
```

Trong class, mọi thành viên mặc định là `private`. Điều ta làm ở đây là chuyển mọi thứ thành `public`. Bất kỳ mã nào tạo đối tượng từ class đều có thể truy cập và thay đổi mọi thứ trên đối tượng đó.

Hãy cập nhật class bằng cách thêm một vùng `private`, rồi chuyển biến `Health` vào đó:

```cpp
class Monster {
public:

private:
    int Health{150};
};
```

Thành viên private của class vẫn có thể được sửa bởi hàm thuộc chính class đó. Các hàm của class như `TakeDamage()` có thể sửa `Health`, nhưng mã bên ngoài class không còn truy cập được nó.

Lúc này, giao diện công khai trở nên rất đơn giản và ngăn người dùng class lách qua hành vi mà ta dự định:

```cpp
Monster Goblin;
Goblin.TakeDamage(50); // Được phép
Goblin.Health -= 50;   // Không được phép
```

### Nhiều bộ chỉ định truy cập

Class có thể chứa bao nhiêu bộ chỉ định truy cập tùy ý. Biến và hàm nhận mức truy cập của bộ chỉ định gần nhất đứng trước chúng; nếu không có bộ chỉ định nào đứng trước thì mặc định là `private`:

```cpp
class MyClass {
    int VariableA; // private

public:
    int VariableB; // public
    int VariableC; // public

private:
    int VariableD; // private

public:
    int VariableE; // public
};
```

### Kiểm tra kiến thức: Truy cập thành viên của class

Trong ví dụ sau, dòng đầu tiên nào gây lỗi?

```cpp
class Weapon {
public:
    int Damage{50};
};

int main() {
    Weapon IronSword;
    IronSword.Damage;
    IronSword.Damage += 30;
}
```

1. Dòng 8 — ta không thể truy cập `Damage` của vũ khí từ đây.

   Hãy kiểm tra bộ chỉ định truy cập của `Damage` trong class `Weapon`. Mức truy cập quyết định thứ gì có thể được truy cập từ bên ngoài class.

2. Dòng 9 — ta có thể truy cập `Damage` của vũ khí, nhưng không thể thay đổi nó từ đây.

   Hãy nghĩ về ý nghĩa của `public` đối với thành viên của class. Nếu một thành viên là public, điều đó ảnh hưởng thế nào đến khả năng đọc và sửa giá trị của nó?

3. Mã này không có lỗi.

   **Đúng.** Vì mọi thứ trong class đều là `public`, ta được tự do truy cập và thay đổi biến `Damage` từ mã bên ngoài class.

Trong mã dưới đây, dòng đầu tiên nào gây lỗi?

```cpp
class Weapon {
private:
    int Damage{50};
};

int main() {
    Weapon IronSword;
    IronSword.Damage;
    IronSword.Damage += 30;
}
```

1. Dòng 8 — ta không thể truy cập `Damage` của vũ khí từ đây.

   **Đúng.** `Damage` là thành viên private, vì vậy lần truy cập đầu tiên từ bên ngoài class đã không hợp lệ.

2. Dòng 9 — ta có thể truy cập `Damage` của vũ khí, nhưng không thể thay đổi nó từ đây.

   Không đúng. Thành viên private không thể được đọc hoặc sửa trực tiếp từ mã bên ngoài class.

3. Mã này không có lỗi.

   Không đúng. Mã bên ngoài class đang cố truy cập thành viên private.
