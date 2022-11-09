## Mount & unMount

- Mounted: Lắp vào
- Unmounted: Tháo ra

> Thời điềm đưa 1 Component vào sử dụng

## useEffect

Dùng khi muốn thực hiện các side Effects (Khi có 1 tác động xảy ra, sẽ làm cho dữ liệu của chương trình bị thay đổi)

useEffect có thể làm được những gì:

- Update DOM
- Call API
- Listen DOM events
  - Scroll
  - Resize
- Cleanup
  - Remove listener/ Unsubcribe
  - Clear timer

Cú pháp:

```php
useEffect(callback, [deps])
```

Trong đó:

- Callback: bắt buộc - hàm thực hiện các size Effect
- `[deps]`: dependencies - không bắt buộc

> Có 3 trường hợp cần chú ý:
>
> 1. useEffect(callback)
> 2. useEffect(callback, [])
> 3. useEffect(callback, [deps])

VD1: Update DOM

- Chú ý: Call back luôn được gọi sau khi component mounted

```php
function Content() {
  React.useEffect(() => {
    console.log("Mounted");
  });

  return <h1>Hi anh em</h1>;
}

const App = () => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="section">
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Content />}
    </div>
  );
};
```

### useEffect(callback)

**Tính chất:**

- Callback được gọi mỗi khi component mounted
- Callback được gọi mỗi khi component re-render

> Dùng để update DOM
> Không dùng để call API, vì mỗi lần setState, component sẽ bị re-render => call API liên tục

### useEffect(callback, [])

**Tính chất:**

- Callback chỉ được gọi lại 1 lần

### useEffect(callback, [depens])

**Tính chất:**

- Callback được gọi khi [depens] thay đổi

VD: Thay đổi API khi click

```php
const tabs = ["posts", "photos", "todos"];

const Content = () => {
  const [posts, setPost] = useState([]);
  const [type, setType] = useState("posts");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((json) => setPost(json));
  }, [type]);

  return (
    <div className="post-list">
      {tabs.map((tab) => (
        <button onClick={() => setType(tab)} key={tab}>
          {tab}
        </button>
      ))}
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </div>
  );
};

function App() {
  const [mount, setMount] = useState(false);

  return (
    <div className="container">
      <button onClick={() => setMount(!mount)}>Toggle</button>
      {mount && <Content />}
    </div>
  );
}
```

**useEffect with DOM events**
