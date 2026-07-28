## Getter

Sau khi tái cấu trúc class trước đó và chuyển `Health` vào vùng `private`, ta đã thực thi thành công bất biến của class. Mã bên ngoài không bao giờ có thể đặt `Health` của `Monster` thành giá trị âm.

Tuy nhiên, ta cũng gián tiếp thêm nhiều hạn chế hơn. Mã bên ngoài class giờ không còn biết quái vật có bao nhiêu `Health`:

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

Cách thông thường để cho phép mã bên ngoài truy cập thành viên private là cung cấp một hàm đơn giản trong vùng public của class.

Một hàm như vậy đôi khi được gọi là **getter**. Một số ngôn ngữ lập trình có cú pháp riêng cho việc này, nhưng C++ giữ nó đơn giản: ta chỉ tạo một hàm bình thường.

```cpp
#include <iostream>

class Monster {
public:
    int GetHealth() const {
        return Health;
    }

private:
    int Health{150};
};

int main() {
    Monster Goblin;
    std::cout << "Health: " << Goblin.GetHealth();
}
```

```text
Health: 150
```

Điều này cho phép mã bên ngoài xem `Health` hiện tại thông qua public hàm `GetHealth()`. Tuy nhiên, mã đó không thể sửa `Health`, vì bản thân biến vẫn là `private`.

### Kiểm tra kiến thức: Thêm Getter

Dòng 7 trong ví dụ dưới đây gây lỗi vì `Damage` là thành viên private. Ta nên sửa class như thế nào để dòng 7 có thể đọc `Damage` của vũ khí nhưng không được thay đổi nó?

```cpp
class Weapon {
private:
    int Damage{50};
};

Weapon IronSword;
IronSword.Damage;
```

1. Đổi dòng 2 từ `private:` thành `public:`.

   Thay đổi này sẽ cho phép cả đọc lẫn sửa `Damage`. Hãy tìm một giải pháp cho phép đọc giá trị mà không cho mã bên ngoài sửa trực tiếp.

2. Đổi dòng 2 từ `private:` thành `protected:`.

   Bộ chỉ định truy cập `protected` có những trường hợp sử dụng riêng sẽ được học ở chương sau. Nó không giải quyết đầy đủ yêu cầu cho phép đọc `Damage` nhưng không cho mã bên ngoài sửa trực tiếp.

3. Thêm một public hàm trả về `Damage`, rồi cập nhật dòng 7 để dùng hàm đó.

   **Đúng.** Getter là cách phù hợp để cấp quyền đọc một thành viên private mà không cho phép mã bên ngoài sửa trực tiếp thành viên đó.

## Setter

Setter có mục đích tương tự getter, nhưng đúng như tên gọi, chúng là các hàm cho phép bên ngoài cập nhật biến trên đối tượng.

Khác biệt giữa việc cung cấp setter và đơn giản biến biến gốc thành public là setter là một hàm, nên ta có thể kiểm soát quá trình cập nhật.

Ta có thể cung cấp setter cho biến `Health`, nhưng triển khai nó theo cách vẫn giữ bất biến rằng `Health` không bao giờ âm:

```cpp
#include <iostream>

class Monster {
public:
    int GetHealth() const {
        return Health;
    }

    void SetHealth(int IncomingHealth) {
        if (IncomingHealth < 0) {
            Health = 0;
        } else {
            Health = IncomingHealth;
        }
    }

private:
    int Health{150};
};

int main() {
    Monster Goblin;
    std::cout << "Health: " << Goblin.GetHealth();
    Goblin.SetHealth(-50);
    std::cout << "\nHealth: " << Goblin.GetHealth();
}
```

```text
Health: 150
Health: 0
```

### Tái cấu trúc

Sau khi thêm hàm `SetHealth()`, ta có thể đơn giản hóa logic của `TakeDamage()`:

```cpp
void TakeDamage(int Damage) {
    // Trước đây:
    Health -= Damage;
    if (Health < 0) {
        Health = 0;
    }

    // Sau khi tái cấu trúc:
    SetHealth(Health - Damage);
}
```

Những thay đổi không làm hành vi của chương trình thay đổi nhưng giúp mã dễ hiểu hơn hoặc bền vững hơn trước thay đổi trong tương lai thường được gọi là **tái cấu trúc**.

### Giao diện lập trình ứng dụng — API

Nhắc lại: cách một phần của chương trình — như hàm hoặc class — cho phép mã bên ngoài tương tác với nó được gọi là **giao diện lập trình ứng dụng**, viết tắt là **API**.

API của hàm gồm tên hàm, các kiểu dữ liệu mà nó chấp nhận làm đối số và kiểu dữ liệu mà nó trả về. API của class gồm tên class và các thành viên public.

Ta muốn class và hàm thân thiện với mã sử dụng chúng, nghĩa là API của chúng phải được thiết kế tốt. Encapsulation che giấu những thứ mã bên ngoài không cần quan tâm, và là phần quan trọng để tạo API tốt.

## Tóm tắt

Trong bài này, ta đã tìm hiểu encapsulation và cách triển khai nó trong C++ bằng bộ chỉ định truy cập. Các ý chính gồm:

- **Bất biến của class:** Thiết lập các quy tắc về hành vi của class mà người dùng có thể tin cậy, chẳng hạn bảo đảm health của `Monster` không bao giờ âm.
- **Encapsulation trong C++:** Quá trình gom dữ liệu và hàm trong class, đồng thời kiểm soát cách chúng được truy cập và thay đổi.
- **Bộ chỉ định truy cập `public` và `private`:** Dùng từ khóa `public` và `private` để kiểm soát quyền truy cập thành viên của class. Thành viên public có thể được truy cập từ bên ngoài class; thành viên private thì không.
- **Triển khai bất biến của class:** Minh họa bằng hàm `TakeDamage()` trong class `Monster`, bảo đảm health không xuống dưới 0.
- **Getter và setter:** Hàm cho phép truy cập thành viên private một cách có kiểm soát. Getter trả về giá trị thành viên private, còn setter cho phép sửa nó dưới những điều kiện nhất định.
