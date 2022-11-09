##Data Binding - Liên kết dữ liệu
Liên kết dữ liệu là sự ràng buộc của trường giao diện người dùng với mô hình dữ liệu. Có 2 cách tiếp cận với ràng buộc dữ liệu là `one way data flow` và `two way data binding`

## One way data flow (Ràng buộc dữ liệu 1 chiều)

Dữ liệu được truyền 1 chiều từ mô hình dữ liệu ra giao diện hoặc ngược lại
VD: Bất cứ điều gì xảy ra trên giao diện người dùng sẽ kích hoạt 1 sự kiện đến mô hình để cập nhật dữ liệu. Lúc này, dữ liệu đi theo 1 flow duy nhất

```php
function App() {
  const [name, setName] = useState("");

  console.log(name);

  return (
    <div className="container">
      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setName("Dang Van A")}>Change</button>
    </div>
  );
}
```

=> Lúc này, khi gõ nội dung vào ô input, `name` sẽ được thay đổi theo nội dung người dùng nhập vào. Tuy nhiên, khi `click` vào button `Change`, lúc này `name` đã được thay đổi thành "Dang Van A" nhưng value của ô input lại không được cập nhật thành giá trị của `name`

> Thay đổi giao diện => dữ liệu thay đổi nhưng thay đổi dữ liệu thì giao diện lại không cập nhật => Dữ liệu đi theo 1 flow duy nhất => `One way data flow`

##Two way binding (liên kết dữ liệu 2 chiều)

Ràng buộc dữ liệu 2 chiều có nghĩa là mọi thay đổi liên quan đến dữ liệu sẽ được thay đổi trên giao diện người dùng và mọi thay đổi trên giao diện người dùng cũng sẽ làm thay đổi dữ liệu

Muốn biến ví dụ trên thành `two way binding` thì làm như sau:

```php
function App() {
  const [name, setName] = useState("");

  console.log(name);

  return (
    <div className="container">

      <input
       value={name}
       onChange={(e) => setName(e.target.value)}
      />

      <button onClick={() => setName("Dang Van A")}>Change</button>
    </div>
  );
}
```

> Khi nhập nội dung vào ô input => `name` được set bằng value của input. Khi click `Change`, name được set thành "Dang Van A", value của input cũng được cập nhật bằng name => `two way binding`

## Ứng dụng two way binding khi làm việc với form

**Lấy value từ input**

```php
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log({
      name,
      email,
    });
  };

  return (
    <div className="container">
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

```

**Lấy value từ input:radio**

```php
const courses = [
  {
    id: 1,
    name: "HTML,CSS",
  },
  {
    id: 2,
    name: "JavaScript",
  },
  {
    id: 3,
    name: "ReactJS",
  },
];

function App() {
  const [checked, setChecked] = useState();

  return (
    <div className="container">
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <input
              type="radio"
              checked={checked === course.id}
              onChange={() => setChecked(course.id)}
            />
            {course.name}
          </div>
        );
      })}
    </div>
  );
}
```

**Lấy value từ input:checkbox**

```php
function App() {
  const [checked, setChecked] = useState([]);

  console.log(checked)

  const handleCheck = (id) => {
    setChecked((prev) => {
      const isChecked = checked.includes(id);
      if (isChecked) {
        return checked.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="container">
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <input
              type="checkbox"
              checked={checked.includes(course.id)}
              onChange={() => handleCheck(course.id)}
            />
            {course.name}
          </div>
        );
      })}
    </div>
  );
}
```
