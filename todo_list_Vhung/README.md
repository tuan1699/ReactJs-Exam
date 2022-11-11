## useRef

**Ý nghĩa**: Reference

- Sử dụng để lưu trữ 1 tham chiếu
- Trích xuất đến các thành phần DOM

**Cú pháp:**

```js
const countRef = useRef(0);
```

trong đó:

- countRef: tên biến
- 0: giá trị khởi tạo
  => Sau khi khởi tạo, countRef sẽ là 1 Obj có key current mang giá trị bằng giá trị khởi tạo
  `{current: 0}`

**Sự khác nhau giữa 1 Obj tạo bởi useRef và 1 Obj thuần**
VD: Obj thuần

```js
const obj = {
  current: 0,
};
```

demo:

```js
const App = () => {
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef(0);
  const obj = {
    current: 0,
  };

  const handleClick = () => {
    setCount(count + 1);
    countRef.current = countRef.current + 1;
    obj.current = obj.current + 1;
  };

  console.log({
    count,
    countRef,
    obj,
  });

  return <button onClick={handleClick}>Click</button>;
};
```
Obj thuần: Khi component được re-render thì obj sẽ được gán lại, do đó, obj.current luôn luôn bằng 0

countRef: Chỉ nhận giá trị khởi tạo ban đầu là 0, khi bị re-render, giá trị khởi tạo sẽ không được gán lại nữa, mà countRef sẽ trả về obj trước đó

**Sự giống và khác nhau giữa useState và useRef**
- Giống:
  - Đều khởi tạo giá trị ban đầu chỉ trong lần render đầu tiên
- Khác:
  - useState: re-render component khi setState
  - useRef: Không re-render component khi gán lại giá trị cho current