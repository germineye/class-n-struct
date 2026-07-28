## Destructor

Destructor là một hàm thành viên đặc biệt khác của class và bổ sung cho constructor.

Nó được tự động gọi khi đối tượng bị hủy.

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

Thời điểm đối tượng bị hủy và vòng đời đối tượng nói chung sẽ trở nên quan trọng hơn khi ta đi vào các chủ đề nâng cao.

Hiện tại, chỉ cần ghi nhớ rằng một trường hợp đối tượng bị hủy là khi phạm vi nơi nó được tạo kết thúc.

Ví dụ dưới đây tạo `Goblin` bên trong hàm, rồi đối tượng tự động bị hủy khi hàm kết thúc:

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

**Kết quả của câu lệnh `Robot MyRobot("RX100");` là gì?**

1. Đối tượng `MyRobot` được tạo với `mModel` bằng `"RX100"`, còn `mYear` chưa được khởi tạo.

   Gần đúng, nhưng `mYear` không bị bỏ chưa khởi tạo. Constructor cung cấp giá trị mặc định `2024` cho `Year`.

2. Xảy ra lỗi biên dịch vì thiếu tham số.

   Không đúng. Constructor `Robot` có thể xử lý trường hợp chỉ cung cấp một tham số nhờ giá trị mặc định của `Year`.

3. Đối tượng `MyRobot` được tạo với `mModel` bằng `"RX100"` và `mYear` bằng `2024`.

   **Đúng.** Constructor `Robot` cung cấp giá trị mặc định `2024` cho tham số `Year`. Vì vậy khi `MyRobot` được tạo chỉ với model `"RX100"`, `mYear` tự động nhận giá trị `2024`.

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

**Điều gì xảy ra nếu tạo đối tượng `Creature` mà không truyền đối số?**

1. Xảy ra lỗi biên dịch vì thiếu đối số.

   Không đúng. Class `Creature` có định nghĩa constructor mặc định, vì vậy đối tượng có thể được tạo mà không truyền đối số.

2. Một đối tượng `Creature` được tạo với tên `"Unknown"`.

   **Đúng.** Constructor mặc định đặt `mName` thành `"Unknown"`, nên việc tạo đối tượng không có đối số sẽ gọi constructor này.

3. Đối tượng được tạo với tên chưa được khởi tạo.

   Không đúng. Constructor mặc định khởi tạo rõ ràng `mName` bằng `"Unknown"`.

**Điều gì xảy ra khi định nghĩa constructor tùy chỉnh trong class nhưng không định nghĩa rõ constructor mặc định?**

1. Class tự động sinh constructor mặc định.

   Không đúng. Khi constructor tùy chỉnh được định nghĩa, constructor mặc định tự sinh không còn được cung cấp. Nếu cần constructor mặc định, ta phải định nghĩa nó rõ ràng.

2. Class không tự động sinh constructor mặc định.

   **Đúng.** Khi class có constructor tùy chỉnh, trình biên dịch không còn tự tạo constructor mặc định. Nếu vẫn cần constructor không đối số, ta phải tự định nghĩa nó.

3. Trình biên dịch lập tức báo lỗi.

   Không đúng. Trình biên dịch không báo lỗi chỉ vì constructor mặc định không được định nghĩa. Lỗi chỉ xuất hiện khi ta cố tạo đối tượng từ class mà không cung cấp các đối số cần thiết cho constructor hiện có.

Xét class sau:

```cpp
class Weapon {
public:
    Weapon(int Durability) {
        mDurability = Durability;
    }

    Weapon(int Weight) {
        mWeight = Weight;
    }

private:
    int mDurability;
    int mWeight;
};
```

**Điều gì xảy ra với câu lệnh `Weapon IronSword{500};`?**

1. Đối tượng `IronSword` được tạo với `mDurability` bằng `500`.

   Không đúng. Vấn đề thực sự là constructor bị trùng chữ ký, không phải việc gán sai thuộc tính.

2. Đối tượng `IronSword` được tạo với `mWeight` bằng `500`.

   Không đúng. Vấn đề không nằm ở phép gán mà nằm ở sự mơ hồ của lời gọi constructor.

3. Xảy ra lỗi biên dịch vì lời gọi constructor bị mơ hồ.

   **Đúng.** Câu lệnh này gây lỗi biên dịch vì hai constructor đều có chữ ký `Weapon(int)`.

**Destructor là gì?**

1. Hàm được gọi để cấp phát bộ nhớ cho đối tượng.

   Không đúng. Destructor không dùng để cấp phát bộ nhớ. Nó là hàm thành viên đặc biệt được gọi khi đối tượng bị hủy.

2. Hàm thành viên đặc biệt tự động được gọi khi đối tượng ra khỏi phạm vi hoặc bị xóa.

   **Đúng.** Destructor tự động chạy khi vòng đời của đối tượng kết thúc — chẳng hạn khi đối tượng ra khỏi phạm vi hoặc bị xóa tường minh.

3. Phương thức khởi tạo thuộc tính của đối tượng khi đối tượng được tạo.

   Không đúng. Đây là nhiệm vụ của constructor. Destructor hoạt động ở đầu còn lại của vòng đời đối tượng.

## Tóm tắt

Các khái niệm chính trong bài:

- **Constructor và destructor:** Constructor là hàm đặc biệt của class được gọi khi đối tượng được tạo. Nó có thể khởi tạo đối tượng với giá trị và hành vi cụ thể. Destructor được gọi khi đối tượng bị hủy.
- **Constructor mặc định và constructor tùy chỉnh:** Cách constructor mặc định hoạt động và cách tạo constructor tùy chỉnh cho nhu cầu cụ thể.
- **Quy ước đặt tên biến thành viên:** Một quy ước như tiền tố `m` trong `mName` giúp phân biệt biến thành viên với tham số và biến cục bộ.
- **Constructor có tham số:** Constructor có thể nhận dữ liệu đầu vào để thiết lập giá trị ban đầu cho đối tượng.
- **Nhiều constructor:** Class có thể có nhiều constructor để hỗ trợ cách tạo đối tượng linh hoạt.
- **Tránh lời gọi constructor mơ hồ:** Các constructor phải có danh sách tham số đủ khác nhau để trình biên dịch xác định đúng phiên bản cần gọi.
- **Constructor mặc định:** Có thể tự định nghĩa hoặc yêu cầu trình biên dịch tạo lại bằng cú pháp `= default`.
- **Destructor:** Tự động chạy khi đối tượng bị hủy và thường được dùng để giải phóng tài nguyên.
