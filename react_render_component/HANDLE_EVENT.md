##Handling Events (xử lý sự kiện) trong ReactJS

Xử lý các sự kiện trong React rất giống với xử lý các sự kiện trên các phần tử DOM. Có một số khác biệt về cú pháp:

- Các sự kiện React được đặt tên bằng `camelCase`, thay vì chữ thường. Ví dụ: `onclick -> onClick`, `onchange -> onChange`

- Với JSX, bạn truyền một hàm để bắt sự kiện, thay vì một chuỗi như HTML thông thường.

Ví dụ với HTML:

```php
<button onclick="changeName()">
  Change Name
</button>
```

Khi làm việc với JSX phải viết như sau:

```php
<button onClick={changeName}>
  Change Name
</button>
```

Một điểm khác biệt nữa là bạn không thể sử dụng `return false` để chặn các hành động mặc định được `prevent default`, trong React bạn cần phải sử dụng `preventDefault()`.
