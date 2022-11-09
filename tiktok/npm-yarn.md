##npm
Có 2 cách cài đặt thư viện npm

**Project Scope - Phạm vi cài đặt trong Project**

Cài đặt vào dependencies

```php
npm install react react-dom
```

_shorthand_

```php
npm i react react-dom
```

Cài đặt vào devDependencies

```php
npm install --save-dev react react-dom
```

_shorthand_

```php
npm i -D react react-dom
```

Xóa thư viện khỏi dự án

```php
npm uninstall react react-dom
```

**Global Scope - Phạm vi cài đặt trong máy tính**

- Sử dụng khi dự án không phụ thuộc vào thư viện (không import thư viện)
- Sử dụng khi thư viện cho phép thực thi dòng lệnh (vd: create app)\
- Sẽ cài đặt vào thư mục User trong máy tính

_Cú pháp_

```php
npm i --global create-react-app
```

_shorthand_

```php
npm i -g create-react-app
```

khi cài đặt trong global, có thể sử dụng câu lệnh sau đây để xem hướng dẫn (file bin)

```php
create-react-app --help
```

Xóa thư viện khỏi dự án

```php
npm uninstall -f create-react-app
```


```php
npm uninstall -g create-react-app
```

##npx
Khi cài Nodejs, đã được cài kèm cùng npm
- Để hỗ trợ các thư viện cung cấp file bin (VD: create-react-app)

**Cài dự án thông qua npx bằng Git**
```php
npx create-react-app tiktok
```

```php
cd tiktok
```

```php
npm start
```

CRA Folder Structure

`manifest.json` file khai báo thônng tin web cho trình duyệt (trường hợp WPA)

`robot.txt` hướng công cụ tìm kiếm nên tìm vào địa chỉ nào? địa chỉ nào không nên tìm

`gitignore` Khai báo thư mục, file cụ thể được phần mềm git bỏ qua khi commmit trên sever
VD: /node_modules - dung lượng rất lớn

- Khi triển khai trang web lên người dùng cuối (dùng yarn-build) thì sẽ sinh ra file build - để deploy cho khách hàng

`reportWebVitals` - gửi báo cáo, phân tích hiệu năng => tối ưu trải nghiệm người dùng

