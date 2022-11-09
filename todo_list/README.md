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
