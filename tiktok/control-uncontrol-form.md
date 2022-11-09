## Controlled vs. uncontrolled components

Trong React, có hai cách để xử lý dữ liệu biểu mẫu trong các `component`.

- Control Form: Xử dụng `state` trong component để xử lý dữ liệu trong `form`
- Uncontrol Form: Để DOM tự xử lý dữ liệu `form` trong component

###CONTROL FORM
CONTROL FORM trong React là những component trong đó data form được xử lý bằng `state`

- Mỗi phần tử của form bao gồm 1 giá trị, dạng nhập (`input`, `textarea`) hoặc dạng lựa chọn (`checkbox`, `select`, ...). Khi giá trị của các thành phần trên thay đổi (kích hoạt bởi các hành động chọn hoặc nhập), dữ liệu cũng sẽ được cập nhật theo

VD:

```php
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function onSubmit() {
    console.log("Name value: " + name);
    console.log("Email value: " + email);
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
```

> Khi người dùng nhập thông tin `name` và `email` vào ô input thì giá trị dữ liệu của name và email cũng sẽ được tự động cập nhật (bởi setName, setEmail) => Control Form

###UNCONTROL FORM

Uncontrol form là những thành phần mà dữ liệu biểu mẫu được xử lý bởi chính DOM. “Không được kiểm soát” đề cập đến thực tế là các thành phần này không được kiểm soát bởi React `state`.

Các giá trị của các phần tử biểu mẫu được kiểm soát và lưu trữ trên DOM theo cách truyền thống. Chúng tôi sẽ phải tham chiếu đến phiên bản của các phần tử biểu mẫu để lấy các giá trị của chúng từ DOM.

```php
function App() {
  function onSubmit() {
    console.log("Name value: " + window.name.value);
    console.log("Email value: " + window.email.value);
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" id="name" required />
      <input type="email" name="email" id="email" required />
      <input type="submit" value="Submit" />
    </form>
  );
}
```

> Component trên là một Component không được kiểm soát vì React không có quyền kiểm soát các giá trị của các phần tử đầu vào của biểu mẫu.

###Sự khác biệt giữa Control Form và Uncontrol Form

- Control Form có thể dự đoán được vì trạng thái của các phần tử biểu mẫu được component xử lý
- Uncontrol Form không thể dự đoán được vì trong `life cycle` của một thành phần, các thành phần biểu mẫu có thể mất tham chiếu và có thể bị thay đổi / ảnh hưởng bởi các nguồn khác
- Dễ dàng xác thực giá trị form bằng Control Form
- Hạn chế của Control Form là số lượng `state` trong một thành phần tăng lên khi nhiều phần tử điều khiển được thêm vào phần tử biểu mẫu.

=> Sử dụng Control Form hoặc Uncontrol Form tùy vào mục đích kiểm soát dữ liệu form