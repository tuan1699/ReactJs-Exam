##Hook

1. Chỉ dùng cho function component
2. Conponent đơn giản và dễ hiểu

- Không bị chia logic ra như methods trong lifecycle của Class Component
- Không cần sử dụng `this`

3. Sử dụng Hooks khi nào?

- Dự án mới => Hooks
- Dự án cũ:
  - Component mới => Function component + Hooks
  - Component cũ => Giữ nguyên, có thời gian tối ưu sau
- Logic nghiệp vụ cần sử dụng các tính chất của OOP => Class componet

```php
import {
    useState,
    useEffect,
    useLayoutEffect,
    useRef,
    useCallback,
    useMemo,
    useReducer,
    useContext,
    useImperativeHandle,
    useDebugValue
} from 'react'
```

VD: Chưa dùng hook, chỉ là UI component

```php
function ComponentA() {
    return <h1>Haven't used hook yet</h1>
}
```

VD: Sử dụng hook, hỗ trợ thêm nhiều tính năng

Lưu ý: khi học mỗi hook:

- Tên, ý nghĩa
- Nhận vào đối số là gì
- Trả ra cái gì
- Những cái trả ra hoạt động ntn?

```php
function ComponentB() {
    // useState
    const [state, setState] = useState(initState)

    // useEffect
    useEffect( () => {

    }, [deps])

    // useLayoutEffect
    useLayoutEffect( () => {

    }, [deps])

    // useRef
    const ref = useRef()

    // useCallback
    const fn = useCallback( () => {

    }, [deps])

    // useMemo

    const result  = useMemo( () => {
        // return result memo
    }, [deps])

    // useReducer
    const [state, dispatch] = useReducer(reducer, initialArg, init)

    // useContext
    const value = useContext(Mycontext)

    // useImperetiveHandle
    useImperativeHandle(ref, createHandle, [deps])

    // useDebugValue
    useDebugValue(isOnline ? 'online' : 'Offline')

    return <h1> Hooks</h1>
}
```

### useState

**Ý nghĩa**: Trạng thái dữ liệu
**Dùng khi nào?**
Khi muốn thay đổi dữ liệu thì giao diện tự động cập nhật (render lại theo dữ liệu)
VD: Khi click vào nút tăng thì sẽ tăng lên 1 đơn vị và hiển thị ra màn hình

- useState giúp đơn giản hóa thể hiện trạng thái dữ liệu ra giao diện người dùng, dữ liệu thay đổi gì => giao diện thay đổi đó
  VD: code thuần
  `1` => `2`
  `- get element trong dom gọi innerText, textContent`

  ```php
  function App() {
  let i = 0;

  const decrease = () => {
    i = i - 1;
    console.log(i);
    const span = document.querySelector("span");
    span.innerText = i;
  };

  const increase = () => {
    i = i + 1;
    console.log(i);
    const span = document.querySelector("span");
    span.innerText = i;
  };

  return (
    <div className="App">
      <button onClick={decrease}>prev</button>
      <span>{i}</span>
      <button onClick={increase}>next</button>
    </div>
  );
  }
  export default App;
  ```

khi dùng useState, chỉ cần set `Nguyễn Văn A` thành `Nguyễn Văn B`

**Cách dùng:**

```php
import {useState} from 'react'

function Component() {
  const [state, setState] = useState(initState)

  ...
}
```

_trong đó_:

- initState: Tham số nhận vào, giá trị khởi tạo ban đầu
- [state, setState]: Giá trị được return, bao gồm 1 mảng
  - state: giá trị (ban đầu được gán bằng initState)
  - setState: Hàm để set lại state

VD:

```php
import { useState } from "react";

function App() {
  const [count, setCount] = useState(1);

  const decrease = () => {
    setCount(count - 1);
  };

  const increase = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <button onClick={decrease}>prev</button>
      <span>{count}</span>
      <button onClick={increase}>prev</button>
    </div>
  );
}

export default App;
```

**setState**
Ở ví dụ trên, setState được gán bằng 1 giá trị number cụ thể. Bây giờ, nếu muốn khi click vào nút `increase` sẽ tăng lên 3 lần, nếu code như thế này thì sẽ không được

```php
  const increase = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };
```

=> Kết quả khi increase, giá trị chỉ tăng lên 1 đơn vị, là vì khi render, giá trị count đang được gán lại 3 lần mà không cộng dồn các lần trước đó. Để khắc phục, ta sử dụng callback để setState

```php
  const increase = () => {
    setCount(prevState => prevState + 1);
    setCount(prevState => prevState + 1);
    setCount(prevState => prevState + 1);
  };
```

=> Kết quả khi bấm increase, giá trị sẽ tăng lên 3 đơn vị chỉ trong 1 lần render
**initialState với callback**
Khi muốn truyền kết quả của 1 function vào làm giá trị khởi tạo initialState, initialState sẽ được gán bằng kết quả return của function đó.

```php
import { useState } from "react";

const ordersPrice = [100, 200, 300];

function App() {
  const total = ordersPrice.reduce(
    (total, currentPrice) => total + currentPrice
  );

  console.log(total);

  const [count, setCount] = useState(total);

  const decrease = () => {
    setCount(count - 1);
  };

  const increase = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <button onClick={decrease}>prev</button>
      <span>{count}</span>
      <button onClick={increase}>prev</button>
    </div>
  );
}

export default App;
```

Kết quả khi mỗi lần `increase`, giá trị khởi tạo lại được gán lại 1 lần, điều này không tối ưu cho performance, để khắc phục, ta truyền callback vào làm initial state, giá trị return của callback sẽ được set làm initialState chỉ trong lần đầu tiên

```php
import { useState } from "react";

const ordersPrice = [100, 200, 300];

function App() {
  const [count, setCount] = useState(() => {
    const total = ordersPrice.reduce(
      (total, currentPrice) => total + currentPrice
    );
    console.log(total);
    return total;
  });

  const decrease = () => {
    setCount(count - 1);
  };

  const increase = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <button onClick={decrease}>prev</button>
      <span>{count}</span>
      <button onClick={increase}>prev</button>
    </div>
  );
}

export default App;
```

**Set state là thay thế state bằng giá trị mới**

```php
import { useState } from "react";

function App() {
  const [info, setInfo] = useState({
    name: "Nguyen Van A",
    age: 18,
    address: "Ha Noi, VN",
  });

  const handleUpdate = () => {
    setInfo((prev) => {
      return {
        ...prev,
        bio: "Yeu mau hong",
      };
    });
  };

  return (
    <div className="App">
      <div>{JSON.stringify(info)}</div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default App;
```

**Lưu ý:**

- Component được re-render sau khi `setState`
- Initial state chỉ được dùng cho lần đầu
- Set state với callback
- Initial state với callback
- Set state là thay thế state bằng giá trị mới
