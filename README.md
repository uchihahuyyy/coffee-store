
# ☕ Coffee Store - Node.js Fullstack Project

Dự án website bán cà phê hoàn thiện được xây dựng với kiến trúc **Node.js, Express và MongoDB**. Website hỗ trợ đầy đủ các tính năng từ quản lý sản phẩm, giỏ hàng đến thanh toán và bảo mật tài khoản.

---

## 🚀 Tính năng nổi bật

* 🔐 **Bảo mật & Xác thực:** Đăng ký/Đăng nhập với JWT, hỗ trợ Google/Facebook OAuth. Đặc biệt tích hợp **2FA (Xác thực 2 lớp)** qua Speakeasy.
* 🛒 **Thương mại điện tử:** Quản lý danh mục sản phẩm, giỏ hàng thông minh, xem chi tiết sản phẩm.
* 💳 **Thanh toán đa kênh:** Tích hợp Stripe và các cổng thanh toán phổ biến tại Việt Nam (Zalo Pay, VNPay).
* 📧 **Tương tác người dùng:** Gửi email xác nhận đơn hàng, đặt lại mật khẩu và đánh giá sản phẩm (Reviews).
* 🛡️ **Phân quyền hệ thống:** Phân chia quyền hạn người dùng và cấu hình Database Read-only cho mục đích Demo.

---

## 🛠 Công nghệ sử dụng

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud)
* **View Engine:** EJS
* **Security:** Passport.js, JWT, bcrypt, Speakeasy
* **Frontend:** CSS3 (Custom Coffee Theme), JavaScript thuần

---

## 📋 Hướng dẫn cài đặt

Để chạy dự án này trên máy cục bộ, bạn thực hiện theo các bước sau:

### 1. Clone dự án
```bash
git clone https://github.com/uchihahuyyy/coffee-store.git
```

### 2. Cài đặt các thư viện cần thiết
```bash
npm install
```

### 3. Cấu hình môi trường (Quan trọng)
* Tạo file `.env` tại thư mục gốc.
* Bạn có thể copy nội dung từ file `.env.example` vào file `.env`.
* **Chế độ xem nhanh (Demo):** File `.env.example` đã chứa sẵn link kết nối Database `khach_xem` (Quyền chỉ đọc). Bạn chỉ cần đổi tên file là có thể chạy ngay mà không cần cấu hình thêm.

### 4. Khởi chạy ứng dụng
```bash
node app.js
```

### 5. Truy cập
Mở trình duyệt và truy cập: `http://localhost:3030`

> **Lưu ý:** Nếu bạn muốn thử nghiệm tính năng Đăng ký/Đặt hàng (yêu cầu quyền Ghi), vui lòng thay đổi `MONGO_URI` trong file `.env` bằng tài khoản MongoDB cá nhân của bạn.
```
