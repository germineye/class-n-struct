# Abstraction và Class

Tìm hiểu cách định nghĩa, khởi tạo và sử dụng class, đồng thời hiểu vì sao class là nền tảng của lập trình hướng đối tượng.

Trong chương trước, chúng ta đã bàn về cách tiếp cận lập trình bằng việc suy nghĩ theo các đối tượng — những thứ tồn tại trong thế giới mà chương trình đang cố mô phỏng.

Ví dụ, nếu đang làm một trò chơi kỳ ảo, chúng ta có thể mô phỏng các đối tượng như quái vật, vũ khí và phép thuật.

Chúng ta đã thấy có hai công cụ cơ bản để mô phỏng một đối tượng:

- Biến, dùng để biểu diễn trạng thái hiện tại của đối tượng.
- Hàm, cho phép đối tượng thực hiện hành động.

```cpp
// Biến
int Health{150};

// Hàm
void TakeDamage(int Damage) {
    Health -= Damage;
}
```

## Abstraction (Trừu tượng hóa)

Trò chơi của chúng ta có thể chứa hàng nghìn đối tượng. Ta không muốn phải định nghĩa hàng chục nghìn biến và hàm để quản lý tất cả chúng.

Thay vào đó, ta muốn viết mã có thể áp dụng cho những tập đối tượng lớn. Chẳng hạn, có thể 100 đối tượng trong trò chơi là quái vật mà người chơi có thể chiến đấu.

Các quái vật trong trò chơi thường có nhiều đặc điểm chung — chẳng hạn đều có biến `Health` và hàm `TakeDamage()`.

Vì vậy, thay vì viết mã riêng cho 100 đối tượng quái vật, ta viết mã dùng chung cho toàn bộ quái vật, để chúng có thể cùng sử dụng.

Quá trình khái quát hóa này — lấy các đối tượng cụ thể rồi nhóm chúng vào những nhóm tổng quát hơn — được gọi là **abstraction**.

### Kiểm tra kiến thức: Abstraction

**Abstraction là gì?**

1. Abstraction là cách xóa đối tượng để giải phóng bộ nhớ mà chúng đang sử dụng.

   Câu trả lời này đang nhầm abstraction với một khái niệm khác. Hãy nhớ rằng abstraction là việc đơn giản hóa một thực tế phức tạp bằng cách xác định các nhóm đối tượng dựa trên đặc điểm chung, chứ không liên quan đến quản lý bộ nhớ.

2. Abstraction là việc phân loại đối tượng thành những kiểu tổng quát hơn, trong đó các đối tượng cùng kiểu chia sẻ một số đặc điểm chung.

   **Đúng.** Abstraction chính là việc tạo ra các nhóm tổng quát cho những đối tượng có đặc điểm tương tự. Sự đơn giản hóa này cho phép ta quản lý và thao tác các nhóm đối tượng hiệu quả hơn trong lập trình.

3. Abstraction là quá trình dùng để tạo một đối tượng mới.

   Câu trả lời này mô tả một khía cạnh khác của lập trình hướng đối tượng. Abstraction thiên về khung khái niệm dùng để nhóm các đối tượng tương tự, thay vì quá trình cụ thể để tạo từng đối tượng riêng lẻ.

## Kiểu có sẵn

Ta đã gặp các ví dụ về abstraction trong những kiểu có sẵn đang sử dụng. Chẳng hạn, `int` là một abstraction.

Trình biên dịch C++ không cần một bộ mã riêng cho từng số nguyên như `3`, `42` hay `53,195`. Thay vào đó, kiểu `int` mô tả chung số nguyên và những phép toán có thể thực hiện trên chúng.

Mọi giá trị kiểu `int` đều dùng chung các phép toán đó — chẳng hạn tăng bằng toán tử `++` hoặc ghi ra màn hình dòng lệnh bằng toán tử `<<`.

Kiểu `int` tạo nên lớp trừu tượng đó. Tương tự, `bool` đại diện cho hai giá trị `true` và `false`, còn `std::string` đại diện cho chuỗi văn bản.
