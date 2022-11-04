##Key trong ReactJS

###Key là gì? Có tác dụng như thế nào
**key** là một props quan trọng khi render các mảng dữ liệu
**key** giúp React xác định xem những component nào đã được thay đổi, được thêm, hay bị xóa. React sẽ update lại các thay đổi này và hiển thị trên UI.

Có thể hiểu rằng **key** trong react dùng để định danh cho mỗi element trong mảng

### Ví dụ:

Tạo một list các course và không gắn key cho element

```php
const courseItems = courses.map((course) =>
  <li>{course.name}</li>
);
```

_Kết quả sẽ được như sau_

```php
<li>Khoá học Javascript</li>
<li>Khóa học HTML</li>
```

_Khi thêm một course vào cuối mảng, ta có:_

```php
<li>Khoá học Javascript</li> //cũ
<li>Khóa học HTML</li> // cũ
<li>Khóa học CSS</li> // mới
```

React sẽ thực hiện so sánh ở lần render trước đó(2 khóa học) với lần render tiếp theo(3 khóa học), nó sẽ nhận ra phần tử đầu tiên và phần tử thứ 2 ở cả 2 lần render là giống nhau, và phần tử thứ 3 được thêm mới, vì thế nó sẽ hiển thị trên UI cho chúng ta phần tử 3. Khóa học CSS, 2 phần tử thứ nhất và thứ 2 sẽ không cần update

_Khi thêm một course vào đầu mảng, ta có:_

```php
// list cũ
<li>Khoá học Javascript</li>
<li>Khóa học HTML</li>

// list mới
<li>Khóa học CSS</li>
<li>Khoá học Javascript</li>
<li>Khóa học HTML</li>
```

React sẽ so sánh lần lượt element đầu tiên của lần render trước đó, với element đầu tiên của lần render tiếp theo, và tương tự cho các phần tử kế tiếp. Nếu nhận thấy có điểm khác nó sẽ update lên UI.

Nếu tiếp tục quá trình trên thì tất cả các element sẽ bị update. Vì chúng đã bị thay đổi thứ tự so với lần render trước đó. React sẽ không thể biết được element nào thay đổi, element nào giữ nguyên.

#### "key" được tạo ra để khắc phục điều trên

Tiến hành gán **key** cho các element:

```php
const courseItems = courses.map((course, index) =>
  <li key={index}>
    {course.name}
  </li>
);
```

_Kết quả sẽ hiển thị như sau:_

```php
<li key={0}>Khoá học Javascript</li>
<li key={1}>Khóa học HTML</li>
```

Giả sử mình sửa `khóa học HTML` thành `khóa học HTML/CSS` và thay đổi thứ tự element thì lúc này, dựa vào key, React sẽ biết được element nào đã thay đổi:

```php
<li key={1}>Khóa học HTML/CSS</li>
<li key={0}>Khoá học Javascript</li>
```

React sẽ phát hiện ra element `<li key={1}>Khóa học HTML/CSS</li>` thay đổi nội dung và update nó trên UI, các element khác không thay đổi nội dung mà chỉ thay đổi thứ tự của chúng.

> Khi sử dụng key là index, sẽ xảy ra một vấn đề đó là nếu ta thêm, xóa phần tử thì key của các element sẽ bị thay đổi do index lúc này thay đổi. Điều này sẽ dẫn đến việc các element không thay đổi nội dung sẽ bị update lại

Để giải quyết vấn đề này chúng ta có thể sử dụng một unique id để làm key cho mỗi element. Với cách làm này khi bạn thay đổi vị trí element hay update element thì dựa vào key, React sẽ biết element nào nên update.