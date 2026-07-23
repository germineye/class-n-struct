# Inheritance

Trong bài này, ta khám phá inheritance trong C++, học cách tạo và quản lý class hierarchy để code gọn và có tổ chức hơn.

Trong chương trước, ta đã thấy cách tạo user-defined type để thiết kế code phù hợp với project cụ thể đang làm.

Ví dụ, nếu làm game nơi người chơi chiến đấu với goblin, ta có thể tạo class `Goblin` chứa toàn bộ code riêng của goblin:

```cpp
class Goblin {
public:
    void Render() {}
    void Move() {}
    void Attack() {}
    void DropLoot() {}
    void Enrage() {}
};
```

Khi bắt đầu triển khai system phức tạp hơn bằng class, ta nhanh chóng gặp một vấn đề.

## Vì sao cần Inheritance?

Game có thể cần một số object đơn giản rải trong môi trường, chẳng hạn đá.

Đá không phức tạp như goblin. Chúng không cần `Attack()` hay `DropLoot()` — chúng chỉ cần `Render()` chính mình lên màn hình:

```cpp
class Rock {
public:
    void Render() {}
};
```

Ta gặp một vấn đề nhỏ: cả hai class đều có method `Render()`. Thực tế, vì đang làm game, rất nhiều type sẽ cần method này.

Với kiến thức hiện tại, chưa có cách tốt để xử lý. Một số lựa chọn có thể là:

### Lựa chọn 1: Để cả hai Class đều có `Render()`

Đặt cùng một đoạn code ở nhiều nơi rất phiền — nó làm project phức tạp. Vì nhiều type trong game sẽ cần function này, vấn đề càng tệ hơn khi ta thêm type mới.

### Lựa chọn 2: Tổng quát hóa Class `Goblin`

Một lựa chọn khác là biến class `Goblin` thành class tổng quát hơn, chẳng hạn đổi tên thành `GameObject`, rồi nhét vào đó mọi functionality mà bất kỳ object nào có thể cần.

Cách này giảm code trùng lặp nhưng tạo ra class cực kỳ phức tạp. Nó cũng làm giảm performance — class function như `Attack()` cần class variable như `int Damage` để hoạt động. Nếu mọi hòn đá trong game đều phải mang theo các variable mà chúng không bao giờ dùng, đó là sự lãng phí resource.

Để giải quyết vấn đề, ta cần khả năng định nghĩa nhiều tầng abstraction. Đó chính là thứ inheritance cung cấp.

## Thiết kế bằng Inheritance

Inheritance cho phép tổ chức class thành hierarchy. Một class có thể inherit function và variable từ parent của nó.

Ví dụ, hãy tưởng tượng một class chỉ cung cấp cho object khả năng tồn tại trong thế giới game và render lên màn hình. Ta gọi nó là class `Actor`.

Tiếp theo, tạo class cho goblin. Goblin cũng cần khả năng render, nhưng với inheritance, ta không còn phải viết lại functionality đó. `Actor` đã có sẵn khả năng này.

Goblin chỉ là một type cụ thể hơn của `Actor`, vì vậy class `Goblin` có thể inherit toàn bộ khả năng của class `Actor`.

Lúc này, class `Goblin` có function `Render()` mà không cần thêm code. Nó chỉ inherit function đó từ parent class `Actor`.

### Parent, Child, Subclass và Base Class

Cấu trúc hierarchy kiểu này rất phổ biến trong lập trình. Có nhiều thuật ngữ mô tả vị trí của một thứ trong hierarchy.

Các từ liên quan đến quan hệ gia đình thường được dùng như **parent**, **child**, **ancestor**, **descendant** và nhiều từ khác. Ví dụ:

- `Actor` là parent hoặc ancestor của `Goblin`.
- `Goblin` là child hoặc descendant của `Actor`.

Các thuật ngữ phổ biến khác gồm **subclass**, **base class** và **derived class**. Ví dụ:

- `Goblin` là subclass của `Actor`.
- `Goblin` derives from `Actor`.
- `Actor` là base class của `Goblin`.

Cấu trúc cây này cung cấp một khả năng mạnh cho class. Ta vẫn có các class chuyên biệt, nhưng chúng không cần sao chép những function tổng quát được dùng chung.

Thay vào đó, chúng chỉ cần inherit các function và variable đó từ ancestor.

### Kiểm tra kiến thức: Inheritance

**Inheritance là gì?**

1. Inheritance là cách lưu nhiều object tương tự vào cùng một memory location.

   Hãy nhớ rằng inheritance không nói về memory location mà nói về quan hệ giữa các class. Hãy nghĩ về cách class chia sẻ attribute và behavior.

2. Inheritance là cách kết hợp nhiều object khác nhau để tạo entity phức tạp hơn.

   Có thể quản lý độ phức tạp theo cách này, nhưng kỹ thuật đó gọi là **object composition**, không phải inheritance.

   Inheritance tập trung vào quan hệ giữa class và cách một class nhận property từ class khác.

3. Inheritance là cách tổ chức class thành hierarchy để child class có thể inherit functionality từ ancestor.

   **Đúng.** Inheritance cho phép tạo hierarchy nơi child class nhận property và method từ parent class, giúp tái sử dụng và tổ chức code.

## Triển khai Inheritance

Hãy tạo class `Actor` và class `Goblin` inherit từ `Actor`. Ta thêm cú pháp vào định nghĩa class `Goblin` như sau:

```cpp
class Actor {
public:
    void Render() {}
};

class Goblin : public Actor {
public:
    void Move() {}
    void Attack() {}
    void DropLoot() {}
    void Enrage() {}
};
```

### Public và Private Inheritance

Giống function và variable, bản thân inheritance có thể là `public` hoặc `private`. Mặc định, inheritance của class là `private`. Trong ví dụ trên, ta đặt nó thành `public`.

Mức inheritance về cơ bản đặt visibility tối đa của các function được inherit.

Đặt inheritance thành `public` không ghi đè access restriction trong base class. Nếu một member là `private` trong `Actor`, nó vẫn không thể được truy cập trực tiếp từ `Goblin`.

Trong thực tế, public inheritance hữu ích và phổ biến hơn rất nhiều. Nếu compiler từ chối cho gọi một public inherited function, hãy kiểm tra xem bản thân inheritance có phải `public` hay không.

Bây giờ, khi tạo object từ class `Goblin`, object đó vừa là `Goblin` vừa là `Actor`, nên có thể dùng function của cả hai:

```cpp
Goblin Bonker;

// Có vì Bonker là Goblin
Bonker.Attack();

// Có vì Bonker cũng là Actor
Bonker.Render();
```

Với class hierarchy này, mọi object `Goblin` vốn dĩ cũng là object `Actor`. Chiều ngược lại không nhất thiết đúng — một `Actor` không nhất thiết là `Goblin`.

Nó có thể chỉ là `Actor` thông thường hoặc là subclass khác của `Actor`.

```cpp
Actor Rock;

// Có vì Rock là Actor
Rock.Render();

// Không được vì Rock không phải Goblin
// Rock.Attack();
```

### Kiểm tra kiến thức: Quan hệ Inheritance

Xét code sau:

```cpp
class Item {};

class Weapon : public Item {};

int main() {
    Weapon IronSword;
}
```

**`IronSword` là gì?**

1. Object là `Weapon` nhưng không phải `Item`.

   Hãy nhớ rằng trong inheritance, instance của subclass cũng là instance của parent class. Hãy áp dụng điều đó cho `Weapon` và `Item`.

2. Object là `Item` nhưng không phải `Weapon`.

   Hãy nghĩ về quan hệ parent–child. Việc tạo instance của child class có đồng nghĩa nó cũng là instance của parent class hay không?

3. Object vừa là `Weapon` vừa là `Item`.

   **Đúng.** Khi dùng class `Weapon` để tạo object, object đó có type `Weapon` như bình thường.

   Tuy nhiên, hierarchy xác định rằng `Weapon` inherits từ `Item`. Vì vậy mọi object type `Weapon` cũng là một `Item`.

4. `IronSword` là hai object — một `Weapon` và một `Item`.

   Inheritance không tạo hai object tách biệt. Nó tạo một object duy nhất mang đặc điểm của cả derived class và base class.

Xét code sau:

```cpp
class Item {};

class Weapon : public Item {};

int main() {
    Item WoodenBarrel;
}
```

**`WoodenBarrel` là gì?**

1. Không thể tạo object từ class `Item` vì nó là base class; phải dùng child class cụ thể.

   Không đúng. Vẫn có thể tạo object trực tiếp từ base class nếu class đó không bị thiết kế theo cách cấm việc này.

2. Object là `Item` nhưng không phải `Weapon`.

   **Đúng.** Việc mọi `Weapon` đều là `Item` không có nghĩa mọi `Item` đều là `Weapon`.

   Nếu tạo object bằng class `Item`, object đó là `Item` và cũng thuộc mọi parent class của `Item`, nhưng nó không phải `Weapon` hay child class khác của `Item`.

3. Object vừa là `Weapon` vừa là `Item`.

   Hãy xem lại chiều của quan hệ inheritance. Child class inherits từ parent class, nhưng chiều ngược lại không tự động đúng.

4. Object không phải `Item` cũng không phải `Weapon`.

   Tạo object bằng constructor của class sẽ tạo object thuộc class đó. Ở đây object được tạo từ `Item`.

## Nhiều tầng Inheritance

Hãy thêm một loại object mới vào game: dragon. Nếu định nghĩa nó theo cách cũ, ta có thể nhận ra một vấn đề.

Class `Dragon` và `Goblin` đều có function `Move()`, `Attack()` và `DropLoot()`. Đây là quá nhiều code trùng lặp.

Với kiến thức inheritance, ta có thể cải thiện thiết kế bằng cách chuyển code dùng chung vào một class mới, rồi cho cả `Goblin` và `Dragon` inherit từ class đó. Hãy gọi class mới là `Character`.

Bây giờ ta có nhiều tầng inheritance. Với cấu trúc này, bất kỳ `Goblin` hoặc `Dragon` nào được tạo cũng thuộc ba class và inherit khả năng từ tất cả chúng:

```cpp
class Actor {
public:
    void Render() {}
};

class Character : public Actor {
public:
    void Move() {}
    void Attack() {}
    void DropLoot() {}
};

class Goblin : public Character {
public:
    void Enrage() {}
};

class Dragon : public Character {
public:
    void Fly() {}
};

int main() {
    Dragon Dave;

    // Dave là Actor
    Dave.Render();

    // Đồng thời là Character
    Dave.Attack();

    // Và là Dragon
    Dave.Fly();
}
```

## Ngăn Inheritance bằng `final`

Đôi khi ta tạo class không được thiết kế để có child class. Để thể hiện rõ ý định đó và yêu cầu compiler thực thi, ta thêm specifier `final` vào class heading:

```cpp
class Demon final {};

// Kết hợp final với base class
class Vampire final : public Character {};
```

Nếu ai đó cố inherit từ final class, compiler sẽ chặn:

```cpp
class Warrior : public Vampire {};
```

```text
Cannot inherit from 'Vampire' as it has been declared as 'final'
```

## Summary

Trong bài này, ta đã khám phá inheritance trong C++ và cách nó cho phép tạo class hierarchy, nơi child class inherit property cùng behavior từ parent class.

Điều này vừa giúp tổ chức code thành cấu trúc dễ hiểu hơn, vừa giảm trùng lặp. Ta đã:

- Học nền tảng của inheritance và cách nó tổ chức class thành hierarchy.
- Tìm hiểu public và private inheritance, cùng cách access level ảnh hưởng đến inherited member.
- Triển khai inheritance trong C++ qua ví dụ `Goblin` và `Actor`.
- Dùng keyword `final` để ngăn một class bị inherit thêm.
- Xem ví dụ nhiều tầng inheritance, nơi class có thể inherit từ một derived class khác.
