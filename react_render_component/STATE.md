

##Tìm hiểu qua về State

###State là gì?
Giống như Props, State được dùng để kiểm soát luồng dữ liệu truyền vào component

State giống như một kho lưu trữ dữ liệu cho các component trong ReactJS. Nó chủ yếu được sử dụng để cập nhật component khi người dùng thực hiện một số hành động như nhấp vào nút, nhập một số văn bản, nhấn một số phím, v.v.

Trước khi có **Hook**, state chỉ có ở Class Component.

`React.Component` là lớp cơ sở cho tất cả các lớp component cơ bản khác trong ReactJS. Bất cứ khi nào một lớp kế thừa lớp React.Component, hàm tạo (Constructor) của nó sẽ tự động gán thuộc tính state cho lớp với giá trị ban đầu được gán bằng null. Chúng ta có thể thay đổi nó bằng cách ghi đè hàm tạo (Constructor).

Để cập nhật `state`, phải sử dụng phương thức `setState` và chúng ta không thể gán trực tiếp như thế này `this.state = {'key': 'value'}`.

```php
    class Profile extends React.Component {
      constructor(props){
          super(props)
          this.state = {"show_technologies": false}
          this.see_our_technologies = this.see_our_technologies.bind(this);
      }
      see_our_technologies(){
          this.setState({"show_technologies": true})
      }
      render(){
          console.log(this.state)
          const style = {
              padding: '10px',
              border: '1px solid green',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50%',
              color: '#4db1e8',
              textAlign: 'center',
              fontFamily: 'sans-serif'
          }
          const tech = {
              background: '#4db1e8',
              color: '#fff',
              padding: '5px',
              marginRight: '5px'
          }
          return (
              <div style={style}>
                  <img src={this.props.img_url} height="250px"/>
                  <h1>{this.props.title}</h1>
                  {this.state.show_technologies ?
                      <p>
                          <span style={tech}>Python</span>
                          <span style={tech}>Django</span>
                          <span style={tech}>Django REST</span>
                          <span style={tech}>ReactJS</span>
                          <span style={tech}>Angular</span>
                          <span style={tech}> and More</span>
                      </p>
                      :
                      <button onClick={this.see_our_technologies}>Click to see Our Technologies</button>
                  }
              </div>
          );
      }
}
module.exports = Profile;

```
Sau khi cập nhật component cùng với đoạn mã trên thì Ui người dùng cập nhật thêm một nút button. Khi click vào button chúng ta sẽ thấy một nội dung được hiển thị.

Trong đoạn mã trên chúng ta đã ghi đè hàm tạo (Constructor) và thiết lập giá trị state ban đầu: `show_technologies` bằng `false`. Trong khi rendering ra component React sẽ kiểm tra giá trị `show_technologies` và nếu nó thiết lập giá trị là `false` thì React chỉ render ra nút button. Chúng ta sẽ liên kết sự kiện khi Click vào nút button. Bất cứ khi nào người dùng Click vào nút button state sẽ thay đổi thành: `{"show_technologies": true}` bằng cách sử dụng phương thức `setState`.

Bây giờ, `state` đã được thay đổi, react sẽ render lại component với những thay đổi đó. Bất cứ khi nào `state` được cập nhật trong component, tất cả các component con của nó cũng sẽ render/show lại với những thay đổi mới nhất.