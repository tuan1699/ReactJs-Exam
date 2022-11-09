## Life CyCle

- Là vòng đời của một sự vật từ khi sinh ra, lớn lên đến khi mất đi.
- Life cycle của `component` trong reactjs là quá trình từ khi tạo ra, thay đổi và hủy bỏ component. Gồm 3 giai đoạn: - Tạo ra (Mounting) - Thay đổi (Updating) - Hủy bỏ (UnMounting)

   <center><img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/923/616999882d4d4.png" ></center>

Nhìn vào diagram ở trên ta sẽ biết được khi Component Mounting(tạo ra) sẽ gọi những hàm nào: (constructor, render, DidMount). Updating(thay đổi) sẽ gọi những hàm nào(render, DidUpdate). Unmounting(hủy bỏ) sẽ gọi hàm WillUnmount.

Một số hàm thường dùng: `Constructor`, `render`, `DidMount`, `WillUnmount`, `DidUpdate`

**Contructor**

- Khi component `mouting`(tạo ra) sẽ đi qua hàm `Constructor`
- Trong `constructor` sẽ khai báo các `state`, các `properties`(thuộc tính) của component.
  Lưu ý: super(props) để gọi hàm khởi tạo của component cha React.Component mà Component con kế thừa.

 <center><img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/923/6169a1d021c76.png" ></center>

```php
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
}
```

**DidMount()**

- Khi component được `Mounting`(tạo ra) sau khi đi qua hàm Constructor và render lần đầu thì sẽ gọi hàm `DidMount()`.
- Thường được dùng để gọi api để lấy dữ liệu, setState để cập nhật state

Như ví dụ ở dưới: gọi api để get nội dung comment và sau đó setState để rerender lại 1 lần nữa. (lúc này đã có nội dung comment lấy từ api)

Lưu ý: hàm `DidMount()` chỉ chạy 1 lần duy nhất khi component được tạo ra.

```php
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }

```

**WillUnMount()**

 <center><img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/923/6169a1f3a7a1a.png" ></center>

- Khi component `unmounting` (hủy bỏ) ta sẽ gọi hàm `WillUnMount()`.
- Khi ta không render component hoặc chuyển trang thì component sẽ bị hủy bỏ để render nội dung mới lên.
- Dùng để hủy timeout, clearInterval. (nếu không hủy bỏ thì sẽ bị chạy hoài liên tục), reset dữ liệu nếu cần thiết.

Lưu ý: hàm `WillUnMount()` chỉ chạy 1 lần duy nhất khi `component `trong vòng đời của component. Tương tự `Mount()` chỉ chạy 1 lần duy nhất. Còn `DidUpdate()` có thể gọi nhiều lần nếu có nhiều update

```php
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

```

**DidUpdate()**

- Được dùng khi component `Updating` (thay đổi ) sẽ gọi hàm `DidUpdate()`
- `DidUpdate()` có thể không được gọi hoặc gọi nhiều lần nếu có update component.(khi có props thay đổi, state thay đổi hoặc bắt buộc update (forceUpdate)
- Khi render sẽ trigger gọi hàm `DidUpdate()`
  Lưu ý: Cẩn thận khi xài DidUpdate() cần quản lý chặt chẽ các thay đổi của props, state. Nếu không cẩn thận thì có khả năng bị render nhiều lần gây chậm chương trình. Thậm chí có trường hợp lặp vô tận do thay đổi state bên trong hàm `DidUpdate()`

   <center><img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/923/6169a1b33ded3.png" ></center>
