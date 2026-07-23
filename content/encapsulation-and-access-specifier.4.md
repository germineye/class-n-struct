

- **Class invariant:** Thiết lập các quy tắc về behavior của class mà người dùng có thể tin cậy, chẳng hạn bảo đảm health của `Monster` không bao giờ âm.
- **Encapsulation trong C++:** Quá trình gom dữ liệu và function trong class, đồng thời kiểm soát cách chúng được truy cập và thay đổi.
- **Access specifier `public` và `private`:** Dùng keyword `public` và `private` để kiểm soát quyền truy cập class member. Public member có thể được truy cập từ bên ngoài class; private member thì không.
- **Triển khai class invariant:** Minh họa bằng function `TakeDamage()` trong class `Monster`, bảo đảm health không xuống dưới 0.
- **Getter và setter:** Function cho phép truy cập private member một cách có kiểm soát. Getter trả về giá trị private member, còn setter cho phép sửa nó dưới những điều kiện nhất định.
