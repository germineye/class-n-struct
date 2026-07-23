

Tuy nhiên, với developer sử dụng function, toàn bộ phần đó được che giấu. Họ chỉ cần viết một dòng để gọi function và tin rằng nó sẽ hoạt động.

Ta có mục tiêu tương tự khi thiết kế class — làm cho class thân thiện và dễ sử dụng nhất có thể, ngay cả khi đằng sau nó có rất nhiều độ phức tạp.

## Public và Private Class Member

Để diễn đạt mục tiêu thiết kế này bằng thuật ngữ C++, ta muốn một phần class là `public` và một phần là `private`.

Những phần mà ta muốn code bên ngoài sử dụng sẽ là `public`. Đây là interface thân thiện hướng ra bên ngoài.

Những phần mà ta không muốn người khác can thiệp sẽ là `private`.

Trong định nghĩa class trước đó, ta đã có keyword `public`:

```cpp
class Monster {
public:
    int Health{150};
};
```

Trong class, mọi member mặc định là `private`. Điều ta làm ở đây là chuyển mọi thứ thành `public`. Bất kỳ code nào tạo object từ class đều có thể truy cập và thay đổi mọi thứ trên object đó.

Hãy cập nhật class bằng cách thêm một vùng `private`, rồi chuyển variable `Health` vào đó:

```cpp
class Monster {
public:

private:
    int Health{150};
};
```

Private member của class vẫn có thể được sửa bởi function thuộc chính class đó. Các class function như `TakeDamage()` có thể sửa `Health`, nhưng code bên ngoài class không còn truy cập được nó.

Lúc này, public interface trở nên rất đơn giản và ngăn người dùng class lách qua behavior mà ta dự định:

```cpp
Monster Goblin;
Goblin.TakeDamage(50); // Được phép
Goblin.Health -= 50;   // Không được phép
```

### Nhiều Access Specifier

Class có thể chứa bao nhiêu access specifier tùy ý. Variable và function nhận access level của specifier gần nhất đứng trước chúng; nếu không có specifier nào đứng trước thì mặc định là `private`:

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

### Kiểm tra kiến thức: Truy cập Class Member

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

1. Dòng 8 — ta không thể truy cập `Damage` của weapon từ đây.

   Hãy kiểm tra access specifier của `Damage` trong class `Weapon`. Access level quyết định thứ gì có thể được truy cập từ bên ngoài class.

2. Dòng 9 — ta có thể truy cập `Damage` của weapon, nhưng không thể thay đổi nó từ đây.

   Hãy nghĩ về ý nghĩa của `public` đối với class member. Nếu một member là public, điều đó ảnh hưởng thế nào đến khả năng đọc và sửa giá trị của nó?

3. Code này không có lỗi.

   **Đúng.** Vì mọi thứ trong class đều là `public`, ta được tự do truy cập và thay đổi variable `Damage` từ code bên ngoài class.

Trong code dưới đây, dòng đầu tiên nào gây lỗi?

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

1. Dòng 8 — ta không thể truy cập `Damage` của weapon từ đây.

   **Đúng.** `Damage` là private member, vì vậy lần truy cập đầu tiên từ bên ngoài class đã không hợp lệ.

2. Dòng 9 — ta có thể truy cập `Damage` của weapon, nhưng không thể thay đổi nó từ đây.

   Không đúng. Private member không thể được đọc hoặc sửa trực tiếp từ code bên ngoài class.

3. Code này không có lỗi.

   Không đúng. Code bên ngoài class đang cố truy cập private member.

## Getter

Sau khi refactor class trước đó và chuyển `Health` vào vùng `private`, ta đã thực thi thành công class invariant. Code bên ngoài không bao giờ có thể đặt `Health` của `Monster` thành giá trị âm.

Tuy nhiên, ta cũng gián tiếp thêm nhiều hạn chế hơn. Code bên ngoài class giờ không còn biết quái vật có bao nhiêu `Health`:

```cpp
#include <iostream>

int main() {
    Monster Goblin;
    std::cout << "Health: " << Goblin.Health;
}
```

```text
error: 'Monster::Health': cannot access private member declared in class 'Monster'
```

Cách thông thường để cho phép code bên ngoài truy cập private member là cung cấp một function đơn giản trong vùng public của class.

Một function như vậy đôi khi được gọi là **getter**. Một số programming language có cú pháp riêng cho việc này, nhưng C++ giữ nó đơn giản: ta chỉ tạo một function bình thường.