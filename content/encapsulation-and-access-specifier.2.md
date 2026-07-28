## Encapsulation

Trong lập trình, quá trình encapsulation bao gồm:

- Gom dữ liệu và các hàm thao tác trên dữ liệu đó vào cùng một đối tượng.
- Che giấu cách hoạt động bên trong để bên sử dụng chỉ có thể tương tác với đối tượng theo một cách được kiểm soát.

Ta đã triển khai bước đầu tiên của encapsulation bằng cách gom biến và hàm vào một class.

Tuy nhiên, ta chưa triển khai bước thứ hai. Bên sử dụng vẫn có thể nhìn thấy và sửa toàn bộ phần bên trong đối tượng. Như đã thấy, việc thiếu encapsulation khiến ta không thể thực thi bất biến của class.

Nó cũng làm bên sử dụng không rõ phải dùng mã như thế nào: “Tôi muốn giảm health của đối tượng này — tôi nên dùng `TakeDamage()` hay sửa thẳng `Health`?”

### Kiểm tra kiến thức: Hiểu Encapsulation

**Đâu là một ví dụ về encapsulation?**

1. Đóng gói và nén phần mềm để nó cần ít dung lượng cài đặt hơn.

   Việc này có liên quan đến đóng gói tệp, nhưng không phải encapsulation trong lập trình. Encapsulation trong C++ là gom dữ liệu với hàm và kiểm soát quyền truy cập chúng.

2. Che giấu những biến và hàm mà ta không muốn mã bên ngoài sử dụng.

   **Đúng.** Đây là một ví dụ điển hình về encapsulation trong lập trình hướng đối tượng. Nó liên quan đến việc kiểm soát quyền truy cập các thành phần của class.

3. Tổ chức class thành một hệ phân cấp dạng cây.

   Tổ chức class thành hệ phân cấp liên quan nhiều hơn đến inheritance, nội dung sẽ được học ở chương sau. Encapsulation tập trung vào việc gom dữ liệu, hàm và kiểm soát quyền truy cập.

### Hàm cũng là Encapsulation

Thực ra ta đã sử dụng một dạng encapsulation. Hãy nghĩ về hàm: hàm là cách che giấu — hay đóng gói — một khối mã bên trong một gói dễ dùng.

Thân hàm có thể phức tạp đến mức cần thiết — nó có thể chứa hàng trăm dòng mã và hàng chục lời gọi hàm lồng nhau.

Tuy nhiên, với lập trình viên sử dụng hàm, toàn bộ phần đó được che giấu. Họ chỉ cần viết một dòng để gọi hàm và tin rằng nó sẽ hoạt động.

Ta có mục tiêu tương tự khi thiết kế class — làm cho class thân thiện và dễ sử dụng nhất có thể, ngay cả khi đằng sau nó có rất nhiều độ phức tạp.
