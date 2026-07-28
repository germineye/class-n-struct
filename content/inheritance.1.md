# Inheritance

Trong bài này, ta khám phá inheritance trong C++, học cách tạo và quản lý hệ phân cấp class để mã gọn và có tổ chức hơn.

Trong chương trước, ta đã thấy cách tạo kiểu tự định nghĩa để thiết kế mã phù hợp với dự án cụ thể đang làm.

Ví dụ, nếu làm trò chơi nơi người chơi chiến đấu với goblin, ta có thể tạo class `Goblin` chứa toàn bộ mã riêng của goblin:

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

Khi bắt đầu triển khai hệ thống phức tạp hơn bằng class, ta nhanh chóng gặp một vấn đề.

## Vì sao cần Inheritance?

Trò chơi có thể cần một số đối tượng đơn giản rải trong môi trường, chẳng hạn đá.

Đá không phức tạp như goblin. Chúng không cần `Attack()` hay `DropLoot()` — chúng chỉ cần `Render()` chính mình lên màn hình:

```cpp
class Rock {
public:
    void Render() {}
};
```

Ta gặp một vấn đề nhỏ: cả hai class đều có phương thức `Render()`. Thực tế, vì đang làm trò chơi, rất nhiều kiểu sẽ cần phương thức này.

Với kiến thức hiện tại, chưa có cách tốt để xử lý. Một số lựa chọn có thể là:

### Lựa chọn 1: Để cả hai Class đều có `Render()`

Đặt cùng một đoạn mã ở nhiều nơi rất phiền — nó làm dự án phức tạp. Vì nhiều kiểu trong trò chơi sẽ cần hàm này, vấn đề càng tệ hơn khi ta thêm kiểu mới.

### Lựa chọn 2: Tổng quát hóa Class `Goblin`

Một lựa chọn khác là biến class `Goblin` thành class tổng quát hơn, chẳng hạn đổi tên thành `GameObject`, rồi nhét vào đó mọi chức năng mà bất kỳ đối tượng nào có thể cần.

Cách này giảm mã trùng lặp nhưng tạo ra class cực kỳ phức tạp. Nó cũng làm giảm hiệu năng — hàm của class như `Attack()` cần biến của class như `int Damage` để hoạt động. Nếu mọi hòn đá trong trò chơi đều phải mang theo các biến mà chúng không bao giờ dùng, đó là sự lãng phí tài nguyên.

Để giải quyết vấn đề, ta cần khả năng định nghĩa nhiều tầng abstraction. Đó chính là thứ inheritance cung cấp.

## Thiết kế bằng Inheritance

Inheritance cho phép tổ chức class thành hệ phân cấp. Một class có thể kế thừa hàm và biến từ lớp cha của nó.

Ví dụ, hãy tưởng tượng một class chỉ cung cấp cho đối tượng khả năng tồn tại trong thế giới trò chơi và render lên màn hình. Ta gọi nó là class `Actor`.

Tiếp theo, tạo class cho goblin. Goblin cũng cần khả năng render, nhưng với inheritance, ta không còn phải viết lại chức năng đó. `Actor` đã có sẵn khả năng này.

Goblin chỉ là một kiểu cụ thể hơn của `Actor`, vì vậy class `Goblin` có thể kế thừa toàn bộ khả năng của class `Actor`.

Lúc này, class `Goblin` có hàm `Render()` mà không cần thêm mã. Nó chỉ kế thừa hàm đó từ lớp cha `Actor`.

### Lớp cha, lớp con, lớp dẫn xuất và lớp cơ sở

Cấu trúc hệ phân cấp kiểu này rất phổ biến trong lập trình. Có nhiều thuật ngữ mô tả vị trí của một thứ trong hệ phân cấp.

Các từ liên quan đến quan hệ gia đình thường được dùng như **lớp cha**, **lớp con**, **lớp tổ tiên**, **lớp hậu duệ** và nhiều từ khác. Ví dụ:

- `Actor` là lớp cha hoặc lớp tổ tiên của `Goblin`.
- `Goblin` là lớp con hoặc lớp hậu duệ của `Actor`.

Các thuật ngữ phổ biến khác gồm **lớp dẫn xuất**, **lớp cơ sở** và **lớp dẫn xuất**. Ví dụ:

- `Goblin` là lớp dẫn xuất của `Actor`.
- `Goblin` kế thừa từ `Actor`.
- `Actor` là lớp cơ sở của `Goblin`.

Cấu trúc cây này cung cấp một khả năng mạnh cho class. Ta vẫn có các class chuyên biệt, nhưng chúng không cần sao chép những hàm tổng quát được dùng chung.

Thay vào đó, chúng chỉ cần kế thừa các hàm và biến đó từ lớp tổ tiên.

### Kiểm tra kiến thức: Inheritance

**Inheritance là gì?**

1. Inheritance là cách lưu nhiều đối tượng tương tự vào cùng một vị trí bộ nhớ.

   Hãy nhớ rằng inheritance mô tả quan hệ giữa các class, không phải cách chúng nằm trong bộ nhớ. Hãy xem dữ liệu và hành vi được chia sẻ giữa các class như thế nào.

2. Inheritance là cách ghép nhiều đối tượng khác nhau thành một thực thể phức tạp hơn.

   Có thể quản lý độ phức tạp theo cách này, nhưng kỹ thuật đó gọi là **kết hợp đối tượng**, không phải inheritance.

   Inheritance tập trung vào quan hệ giữa class và cách một class nhận thuộc tính từ class khác.

3. Inheritance là cách tổ chức class thành hệ phân cấp để lớp con có thể kế thừa chức năng từ lớp tổ tiên.

   **Đúng.** Inheritance cho phép tạo hệ phân cấp nơi lớp con nhận thuộc tính và phương thức từ lớp cha, giúp tái sử dụng và tổ chức mã.

## Triển khai Inheritance

Hãy tạo class `Actor` và class `Goblin` kế thừa từ `Actor`. Ta thêm cú pháp vào định nghĩa class `Goblin` như sau:

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

Giống hàm và biến, bản thân inheritance có thể là `public` hoặc `private`. Mặc định, inheritance của class là `private`. Trong ví dụ trên, ta đặt nó thành `public`.

Mức inheritance về cơ bản đặt khả năng truy cập tối đa của các hàm được kế thừa.

Đặt inheritance thành `public` không ghi đè hạn chế truy cập trong lớp cơ sở. Nếu một thành viên là `private` trong `Actor`, nó vẫn không thể được truy cập trực tiếp từ `Goblin`.

Trong thực tế, public inheritance hữu ích và phổ biến hơn rất nhiều. Nếu trình biên dịch từ chối cho gọi một public hàm kế thừa, hãy kiểm tra xem bản thân inheritance có phải `public` hay không.

Bây giờ, khi tạo đối tượng từ class `Goblin`, đối tượng đó vừa là `Goblin` vừa là `Actor`, nên có thể dùng hàm của cả hai:

```cpp
Goblin Bonker;

// Có vì Bonker là Goblin
Bonker.Attack();

// Có vì Bonker cũng là Actor
Bonker.Render();
```

Với hệ phân cấp class này, mọi đối tượng `Goblin` vốn dĩ cũng là đối tượng `Actor`. Chiều ngược lại không nhất thiết đúng — một `Actor` không nhất thiết là `Goblin`.

Nó có thể chỉ là `Actor` thông thường hoặc là lớp dẫn xuất khác của `Actor`.

```cpp
Actor Rock;

// Có vì Rock là Actor
Rock.Render();

// Không được vì Rock không phải Goblin
// Rock.Attack();
```

### Kiểm tra kiến thức: Quan hệ Inheritance

Xét mã sau:

```cpp
class Item {};

class Weapon : public Item {};

int main() {
    Weapon IronSword;
}
```

**`IronSword` là gì?**

1. Đối tượng là `Weapon` nhưng không phải `Item`.

   Hãy nhớ rằng trong inheritance, đối tượng của lớp dẫn xuất cũng là đối tượng của lớp cha. Hãy áp dụng điều đó cho `Weapon` và `Item`.

2. Đối tượng là `Item` nhưng không phải `Weapon`.

   Hãy nghĩ về quan hệ lớp cha–lớp con. Việc tạo đối tượng của lớp con có đồng nghĩa nó cũng là đối tượng của lớp cha hay không?

3. Đối tượng vừa là `Weapon` vừa là `Item`.

   **Đúng.** Khi dùng class `Weapon` để tạo đối tượng, đối tượng đó có kiểu `Weapon` như bình thường.

   Tuy nhiên, hệ phân cấp xác định rằng `Weapon` kế thừa từ `Item`. Vì vậy mọi đối tượng kiểu `Weapon` cũng là một `Item`.

4. `IronSword` là hai đối tượng — một `Weapon` và một `Item`.

   Inheritance không tạo hai đối tượng tách biệt. Nó tạo một đối tượng duy nhất mang đặc điểm của cả lớp dẫn xuất và lớp cơ sở.

Xét mã sau:

```cpp
class Item {};

class Weapon : public Item {};

int main() {
    Item WoodenBarrel;
}
```

**`WoodenBarrel` là gì?**

1. Không thể tạo đối tượng từ class `Item` vì nó là lớp cơ sở; phải dùng lớp con cụ thể.

   Không đúng. Vẫn có thể tạo đối tượng trực tiếp từ lớp cơ sở nếu class đó không bị thiết kế theo cách cấm việc này.

2. Đối tượng là `Item` nhưng không phải `Weapon`.

   **Đúng.** Việc mọi `Weapon` đều là `Item` không có nghĩa mọi `Item` đều là `Weapon`.

   Nếu tạo đối tượng bằng class `Item`, đối tượng đó là `Item` và cũng thuộc mọi lớp cha của `Item`, nhưng nó không phải `Weapon` hay lớp con khác của `Item`.

3. Đối tượng vừa là `Weapon` vừa là `Item`.

   Hãy xem lại chiều của quan hệ inheritance. Lớp con kế thừa từ lớp cha, nhưng chiều ngược lại không tự động đúng.

4. Đối tượng không phải `Item` cũng không phải `Weapon`.

   Tạo đối tượng bằng constructor của class sẽ tạo đối tượng thuộc class đó. Ở đây đối tượng được tạo từ `Item`.

## Nhiều tầng Inheritance

Hãy thêm một loại đối tượng mới vào trò chơi: dragon. Nếu định nghĩa nó theo cách cũ, ta có thể nhận ra một vấn đề.

Class `Dragon` và `Goblin` đều có hàm `Move()`, `Attack()` và `DropLoot()`. Đây là quá nhiều mã trùng lặp.

Với kiến thức inheritance, ta có thể cải thiện thiết kế bằng cách chuyển mã dùng chung vào một class mới, rồi cho cả `Goblin` và `Dragon` kế thừa từ class đó. Hãy gọi class mới là `Character`.

Bây giờ ta có nhiều tầng inheritance. Với cấu trúc này, bất kỳ `Goblin` hoặc `Dragon` nào được tạo cũng thuộc ba class và kế thừa khả năng từ tất cả chúng:

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

Đôi khi một class không được thiết kế để có lớp con. Ta có thể thể hiện rõ ý định này bằng cách thêm từ khóa `final` vào phần khai báo class:

```cpp
class Demon final {};

// Kết hợp final với lớp cơ sở
class Vampire final : public Character {};
```

Nếu ai đó cố kế thừa từ final class, trình biên dịch sẽ chặn:

```cpp
class Warrior : public Vampire {};
```

```text
Cannot inherit from 'Vampire' as it has been declared as 'final'
```

## Tóm tắt

Trong bài này, ta đã tìm hiểu inheritance trong C++: cách tổ chức class thành hệ phân cấp, trong đó lớp con nhận lại dữ liệu và hành vi từ lớp cha.

Điều này vừa giúp tổ chức mã thành cấu trúc dễ hiểu hơn, vừa giảm trùng lặp. Ta đã:

- Hiểu inheritance và cách nó tổ chức các class thành một hệ phân cấp.
- Tìm hiểu public và private inheritance, cùng cách mức truy cập ảnh hưởng đến thành viên kế thừa.
- Triển khai inheritance trong C++ qua ví dụ `Goblin` và `Actor`.
- Dùng từ khóa `final` để ngăn một class bị kế thừa thêm.
- Xem inheritance nhiều tầng, trong đó một class kế thừa từ class vốn đã là lớp dẫn xuất.
