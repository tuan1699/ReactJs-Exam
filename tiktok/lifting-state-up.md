## Chia sẻ trạng thái chung giữa nhiều Component

Nếu 1 Component muốn dùng chung state với Component khác, ta có thể chuyển State lên Component cha gần nhất. Thay vì đồng bộ state giữa các component khác nhau, ta sẽ truyền State từ trên xuống

VD: Xây dựng một ứng dụng tính nhiệt độ. Nó sẽ cho người dùng biết nước có sôi ở nhiệt độ cho trước hay không.

- Chúng ta sẽ bắt đầu với một component `BoilingVerdict`. Nhiệt độ `celsius` được truyền vào component này như là một prop, nó cũng sẽ hiển thị thông báo nếu như nhiệt độ đủ làm sôi nước hay không:

```php
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

- Tiếp theo, chúng ta sẽ tạo ra một component khác là `Calculator`. Nó sẽ có một `<input>` để người dùng nhập dữ liệu, và giữ giá trị đó trong `this.state.temperature`.
  Thêm vào đó, nó sẽ tạo ra component `BoilingVerdict` với giá trị hiện tại của input.

```php
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

**Thêm input thứ hai**
Yêu cầu mới là bên cạnh input cho Celsius, chúng ta cần cung cấp thêm một input cho Fahrenheit, và chúng phải đồng bộ hoá.

Chúng ta có thể bắt đầu bằng việc tách một component `TemperatureInput` ra từ `Calculator`. Nó sẽ được truyền vào một prop mới tên là `scale` mang một trong hai giá trị là `"c"` hoặc `"f"`:

```php
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Bây giờ chúng ta có thể thay đổi để `Calculator` có thể tạo ra hai input riêng biệt cho nhiệt độ:

```php
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

Bây giờ, chúng ta đã có hai input, nhưng khi bạn nhập giá trị nhiệt độ vào một trong hai input, input còn lại không được cập nhật. Điều này chưa thoả mãn yêu cầu là hai input đồng bộ hoá.

Chúng ta cũng chưa thể hiển thị `BoilingVerdict` từ `Calculator`. `Calculator` không biết giá trị nhiệt độ hiện thời bởi vì nó bị ẩn đi bên trong component `TemperatureInput`.

**Viết các hàm để chuyển đổi**
Đầu tiên chúng ta sẽ viết hai hàm để chuyển đổi từ Celsius sang Fahrenheit và ngược lại:

```php
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

Có hai hàm để chuyển đổi nhiệt độ. Chúng ta sẽ viết thêm một hàm khác nhận các tham số truyền vào là một chuỗi `temperature` và một hàm chuyển đổi, sau đó nó sẽ trả lại một chuỗi. Chúng ta sẽ sử dụng nó để tính toán giá của của một input dựa trên input còn lại.

Nó sẽ trả lại một chuỗi rỗng nếu như tham số `temperature` không hợp lệ, và nó sẽ làm tròn kết quả với ba chữ số thập phân.

```php
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

```

**Chuyển State lên trên**
Hiện tại, hai component `TemperatureInput` lưu trữ giá trị của chúng một cách riêng rẽ trong state cục bộ:

```php
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...
```

Tuy nhiên, chúng ta muốn hai input này được đồng bộ hoá. Khi chúng ta cập nhật nhiệt độ cho Celsius input, Fahrenheit input cũng phải được cập nhật nhiệt độ sau khi đã chuyển đổi và ngược lại.

Trong React, chia sẻ state được thực hiện bằng cách chuyển nó lên component cha gần nhất cần state này. Việc này được gọi là “chuyển state lên trên”. Chúng ta sẽ xoá state cục bộ từ `TemperatureInput` và chuyển nó tới `Calculator`.

Nếu Calculator nắm giữ state chia sẻ, nó sẽ trở thành “nguồn dữ liệu tin cậy” về nhiệt độ hiện tại cho cả hai input. Nó có thể cung cấp cho cả hai những giá trị phù hợp cho chúng. Vì các prop của cả hai component `TemperatureInput` đều đến từ cùng một component cha `Calculator`, nên chúng luôn luôn được đồng bộ hoá.

Hãy xem nó hoạt động thế nào qua từng bước.

Đầu tiên, chúng ta sẽ thay thế `this.state.temperature` với `this.props.temperature` trong component `TemperatureInput`. Hiện thời, hãy giả định rằng `this.props.temperature` đã tồn tại, mặc dù sau này nó sẽ truyền xuống từ component `Calculator`.

Chúng ta biết rằng props không thể thay đổi. Lúc trước, khi `temperature` ở trong state cục bộ, component `TemperatureInput` chỉ cần gọi `this.setState()` để thay đổi nó. Tuy nhiên, khi temperature được truyền vào từ component cha như là một prop, thì `TemperatureInput` không có quyền kiểm soát nó nữa.

Trong React, điều này được giải quyết bằng cách tạo ra một component “kiểm soát”. Cũng tương tự như DOM `<input>` chấp nhận thuộc tính `value` và `onChange`, thì tuỳ chỉnh `TemperatureInput` có thể chấp nhận cả `temperature` và `onTemperatureChange` props từ component cha `Calculator`.

Bây giờ, khi `TemperatureInput` muốn cập nhật nhiệt độ, nó gọi `this.props.onTemperatureChange`:

```php
  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
  }
```

> **Chú ý**: Tên của `temperature` hoặc `onTemperatureChange` prop không mang một ý nghĩa đặc biệt nào trong những component tuỳ chỉnh này. Chúng ta có thể gọi chúng bằng những cái tên khác, theo một cách phổ biến hơn, như đặt tên chúng là value và onChange.

Prop `onTemperatureChange` sẽ được truyền vào cùng với prop `temperature` bởi component cha `Calculator`. Khi prop thay đổi, nó sẽ sửa lại chính state cục bộ của nó, vì thế sẽ tạo lại cả hai input với các giá trị mới. Chúng ta sẽ cùng xem component `Calculator` được triển khai lại sau đây.

Trước khi tìm hiểu những thay đổi trong `Calculator`, hãy cùng điểm lại những thay đổi trong component `TemperatureInput`. Chúng ta đã xoá đi state cục bộ, và sử dụng `this.props.temperature` thay vì `this.state.temperature`. Khi chúng ta muốn thay đổi, việc gọi hàm `this.setState()` được thay bằng hàm `this.props.onTemperatureChange()` từ component cha `Calculator`:

```php
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Bây giờ hãy cùng chuyển sang component `Calculator`.

Chúng ta sẽ lưu trữ giá trị hiện thời của `temperature` và `scale` từ input vào trong state cục bộ của nó. Đây là state mà chúng ta muốn chuyển lên từ những input, và nó sẽ được sử dụng như là “nguồn dữ liệu tin cậy” cho cả hai. Nó là đại diện tối thiểu cho tất cả những dữ liệu chúng ta cần biết để tạo ra cả hai input.

Ví dụ, nếu chúng ta nhập 37 vào trong Celsius input, state của component `Calculator` sẽ là:

```php
{
  temperature: '37',
  scale: 'c'
}
```

Chúng ta có thể lưu trữ giá trị của cả hai input nhưng điều này là không cần thiết. Chúng ta chỉ cần lưu lại giá trị của input được thay đổi gần nhất, và đơn vị của nó. Chúng ta có thể tính ra giá trị của input còn lại dựa trên giá trị của `temperature` và `scale` hiện tại.

Các giá trị input sẽ được đồng bộ hoá bởi nó được tính toán từ cùng một state:

```php
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

Bây giờ, bạn có thể thay đổi bất kì input nào, thì `this.state.temperature` và `this.state.scale` trong component Calculator sẽ được cập nhật. Giá trị của một input sẽ được giữ nguyên, như giá trị người dùng đã nhập vào, và giá trị của input còn lại sẽ được tính toán dựa trên giá trị đó.

Hãy cùng điểm lại điều gì sẽ xảy ra khi bạn thay đổi giá trị của một input:

- React gọi hàm `onChange` trên cây DOM `<input>`. Trong trường hợp này, nó là hàm `handleChange` trong component `TemperatureInput`.
- Hàm `handleChange` trong component `TemperatureInput` gọi `this.props.onTemperatureChange()` với kết quả mới nhất. Các thuộc tính (props) của nó, bao gồm `onTemperatureChange`, được cung cấp bởi component cha, Calculator.
- Khi ở lần render trước, `Calculator` đã chỉ định rằng hàm `onTemperatureChange` của `Celsius TemperatureInput` là phương thức `handleCelsiusChange` của Calculator.Vì thế một trong hay phương thức này của `Calculator` được gọi phụ thuộc vào dữ liệu đầu vào mà chúng ta cung cấp.
- Bên trong những phương thức này, component `Calculator` sẽ yêu cầu React để render lại (re-render) chính nó bằng cách gọi `this.setState()` với giá trị đầu vào mới và giá trị scale hiện tại mà chúng ta vừa mới thay đổi.
- React gọi phương thức `render` của component `Calculator` để xem giao diện (UI) sẽ trông như thế nào. Những giá trị đầu vào của cả hai sẽ được tính toán lại dựa trên nhiệt độ hiện tại và tỉ lệ active tương ứng. Việc chuyển đổi nhiệt độ được thực hiện tại đây.
- React gọi phương thức `render` của component `BoilingVerdict`, truyền nhiệt độ (temperature) vào Celsius như thuộc tính (props) của nó.
- React DOM cập nhật DOM với boiling verdict và để khớp với những giá trị đầu vào mong muốn. Giá trị đầu vào chúng ta đã thay đổi nhận giá trị hiện tại của nó, và giá trị đầu vào khác được cập nhật đến nhiệt độ (temperature) sau khi chuyển đổi.
  Tất cả những cập nhật đi qua cùng một lộ trình nên các input sẽ luôn được đồng bộ hoá.
