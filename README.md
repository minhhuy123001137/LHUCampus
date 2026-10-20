# 🎓 LHU Campus - Cổng Thông Tin & Quản Lý Học Vụ Sinh Viên Đại Học Lạc Hồng

> Dự án Web tương tác hiện đại được xây dựng bởi **Kỹ sư Thiết kế Web Frontend**, kết hợp công nghệ **HTML5 Semantic, CSS3 Custom Properties/Grid/Flexbox, JavaScript ES6+**, xử lý dữ liệu động JSON, tích hợp API thời tiết thực tế và **Trợ lý Ảo AI (LHU Copilot)**.

---

## 📌 1. Giới Thiệu Dự Án (Project Overview)
**LHU Campus** là nền tảng số hóa học vụ toàn diện dành cho tân sinh viên và sinh viên Trường Đại học Lạc Hồng (Lạc Hồng University - Đồng Nai). Nền tảng giải quyết trọn vẹn cả yêu cầu Landing Page giới thiệu trường học lẫn **HỆ THỐNG QUẢN LÝ HỌC VỤ (STUDENT PORTAL)** chuyên sâu gồm 5 phân hệ cốt lõi:
1. **Dashboard Cá nhân & Lộ trình Học tập (The Learning Path)**: Biểu đồ GPA Pure CSS & Thanh tiến độ hoàn thành chương trình.
2. **Cổng Đăng ký Môn học Thông minh (Smart Enrollment)**: Thuộc tính `data-*` & Giỏ hàng môn học giới hạn nghiêm ngặt $\le 25$ tín chỉ.
3. **Quản lý Thời khóa biểu & Chuyên cần (Attendance Tracker)**: Lịch học tuần CSS Grid/Flexbox, tương tác điểm danh & cảnh báo vắng $> 20\%$ cấm thi.
4. **Quản lý Đồ án & Tiến độ Báo cáo (Project Milestone)**: Timeline nối bằng CSS Pseudo-elements (`::before`/`::after`), form nộp link URL regex & Đồng hồ đếm ngược (Countdown) đến ngày bảo vệ.
5. **Tra cứu Học phí & Học bổng (Financial Hub)**: Thẻ mức học bổng đạt được (100% Xuất sắc, 75% Giỏi, 50% Khá), bảng kê khai học phí với inputs `checkbox`, `number`, `date` và công thức tính tiền thực đóng trực tiếp.

---

## 🚀 2. Kiến Trúc Cấu Trúc Thư Mục (Project Structure)
```text
LHUCampus/
├── index.html                  # Trang Chủ (Dashboard & Landing Page)
├── functional.html             # Cổng Học Vụ Portal (Chứa 5 Phân Hệ Học Vụ & Quy Chế)
├── profile.html                # Trang Quản Lý Hồ Sơ Sinh Viên & Cài Đặt Ứng Dụng
├── README.md                   # Tài liệu hướng dẫn kỹ thuật chi tiết
├── css/
│   ├── variables.css           # Design Tokens, bảng màu LHU, Dark/Light Mode Variables
│   ├── style.css               # Global Styles, Navbar, Footer, Toast Engine, AI Launcher, Modal
│   ├── dashboard.css           # Bố cục CSS Grid cho Dashboard Cards, Hero Slider, News & Clubs
│   ├── functional.css          # Bố cục cho Tabs, Bộ lọc Search, Giỏ môn học & Bảng tính GPA
│   ├── profile.css             # Bố cục Form HTML5, Trạng thái Regex Validation, Switch Settings
│   └── portal-subsystems.css   # Bố cục 5 Phân hệ Học vụ: Biểu đồ CSS, Timeline, Timetable, Giỏ 25 TC
├── js/
│   ├── data.js                 # Mock Data dự phòng bảo đảm 100% hoạt động cả trên HTTP & File://
│   ├── main.js                 # Quản lý Theme Dark/Light, Mobile Drawer, Toast, Profile Sync, Open Weather API
│   ├── slider.js               # Slider Carousel: Auto-play, Pause-on-hover, Next/Prev, Touch Swipe di động
│   ├── dashboard.js            # Đổ dữ liệu JSON lên KPI cards, News filter chips, Deadlines checkbox
│   ├── functional.js           # Logic Tab, Live Search & Filter quy chế, Giỏ môn học, Máy tính GPA
│   ├── portal.js               # Logic cốt lõi của 5 Phân hệ Học vụ (Bar chart, 25 TC, 20% vắng, Countdown, Học phí)
│   ├── profile.js              # Kiểm tra Form bằng Regex (Email, SĐT VN, MSSV LHU), FileReader Avatar Preview
│   └── ai-chat.js              # Trợ lý AI LHU Copilot, Natural Language Matching, AI Tóm tắt văn bản
└── data/
    └── campus-data.json        # Cơ sở dữ liệu học vụ, quy chế, danh sách môn học, câu lạc bộ LHU
```

---

## 💎 3. Chi Tiết 5 Phân Hệ Quản Lý Học Vụ (Student Portal)

### 2.1.1. Phân hệ: Dashboard Cá nhân & Lộ trình Học tập (The Learning Path)
- **HTML5 Semantic**: Sử dụng `<section>`, `<article>`, `<aside>` để phân tách rành mạch khối biểu đồ lịch sử điểm và khối tiến độ chương trình đào tạo.
- **CSS3 Pure Bar Chart & Progress Bars**:
  - **Biểu đồ cột CSS thuần** (`.css-bar-chart`): Chiều cao cột được tính toán theo tỷ lệ phần trăm thang điểm 4.0 (`height: (GPA / 4.0) * 100%`), có vạch chia grid và tooltip hiển thị GPA hệ 4, GPA hệ 10 khi rê chuột.
  - **Mã màu trạng thái động (Dynamic Status Colors)**:
    - GPA < 2.0: Cảnh báo đỏ (`#ef4444`, nhãn `CẢNH BÁO HỌC VỤ: GPA < 2.0`).
    - GPA 2.0 - 2.49: Cảnh báo vàng/cam (`#f59e0b`, `Trung bình`).
    - GPA 2.5 - 3.19: Xanh dương nhạt (`#0284c7`, `Khá`).
    - GPA 3.2 - 3.59: Xanh đậm hoàng gia (`#0b3b60`, `Giỏi`).
    - GPA $\ge$ 3.6: Vàng ánh kim / Ngọc lục bảo (`#10b981`, `Xuất sắc`).
  - **Thanh tiến độ phân đoạn Pure CSS**: Hiển thị tổng tiến độ chương trình đào tạo (88/135 TC = 65.2%) cùng 3 khối kiến thức: Đại cương (100%), Cơ sở ngành (90%) và Chuyên ngành (35.8%).

### 2.1.2. Phân hệ: Cổng Đăng ký Môn học Thông minh (Smart Enrollment)
- **HTML5 Data Attributes**: Các thẻ môn học (`.course-card-smart`) lưu trữ toàn bộ metadata bằng thuộc tính `data-*`:
  `data-id`, `data-code`, `data-name`, `data-credits`, `data-price`, `data-faculty`, `data-prerequisite`.
- **CSS3 Hover Effects**: Hiệu ứng chuyển động mượt mà khi hover, viền phát sáng nhẹ, responsive co giãn linh hoạt.
- **JavaScript "Giỏ hàng môn học"**:
  - Thêm/Xóa môn học khỏi danh sách chọn với phản hồi tức thời.
  - Tính tổng số tín chỉ theo thời gian thực.
  - **Ngăn chặn nghiêm ngặt nếu tổng tín chỉ vượt quá 25**:
    $$\text{Tổng tín chỉ hiện tại} + \text{Tín chỉ môn mới} > 25$$
    $\rightarrow$ Hệ thống lập tức từ chối thao tác, phát cảnh báo Toast màu đỏ và hiển thị banner cảnh báo vượt quá hạn mức tối đa 25 TC theo Quy chế Đào tạo LHU!

### 2.1.3. Phân hệ: Quản lý Thời khóa biểu & Chuyên cần (Attendance Tracker)
- **HTML5 & CSS3 Timetable**: Dựng lưới lịch học theo tuần từ Thứ 2 đến Thứ 7, sử dụng Flexbox căn chỉnh các ca học (Ca 1 đến Ca 4).
- **Chuyển đổi tuần chuyển động mượt**: Nút "Tuần trước", "Tuần sau" với hiệu ứng CSS transition `.switching`.
- **Tương tác Điểm danh**: Lắng nghe sự kiện click trên từng ca học để xoay vòng trạng thái:
  $$\text{Có mặt (Green Check)} \longrightarrow \text{Vắng mặt (Red Cross)} \longrightarrow \text{Có phép (Yellow Info)}$$
- **Tính toán tỷ lệ chuyên cần & Cảnh báo vắng $> 20\%$**:
  $$\text{Tỷ lệ vắng} = \frac{\text{Số buổi vắng}}{\text{Tổng số buổi}} \times 100\%$$
  Nếu tỷ lệ vắng vượt quá 20%, hệ thống lập tức hiển thị **Banner Cảnh Báo Chuyên Cần Khẩn Cấp** thông báo sinh viên có nguy cơ bị **CẤM THI KẾT THÚC HỌC PHẦN** theo quy chế LHU.

### 2.1.4. Phân hệ: Quản lý Đồ án & Tiến độ Báo cáo (Project Milestone)
- **HTML5 Cấu trúc lồng nhau (Nested Timeline)**: `<div class="timeline-vertical">` $\rightarrow$ `<article class="timeline-step-item">`.
- **CSS3 Pseudo-elements (`::before`, `::after`)**:
  - `::before`: Vẽ đường nối dọc gradient chuyển tiếp qua tất cả các mốc deadline.
  - `::after`: Vẽ điểm checkpoint hình tròn với viền box-shadow phát sáng.
  - **Badge trạng thái**: "Đã nộp" (Xanh lá), "Chưa nộp" (Vàng/Cam), "Trễ hạn" (Đỏ).
- **Đồng hồ đếm ngược thời gian thực (Countdown Timer)**:
  - Cập nhật mỗi giây (`setInterval`) hiển thị Ngày, Giờ, Phút, Giây còn lại đến ngày bảo vệ trước Hội đồng Khoa CNTT (08:00 AM Ngày 15/11/2026).
- **Form nộp link báo cáo đồ án**:
  - Kiểm tra định dạng URL bằng biểu thức chính quy (Regex URL).
  - Tự động chuyển đổi badge mốc báo cáo thành "Đã nộp" kèm mốc thời gian sau khi submit hợp lệ.

### 2.1.5. Phân hệ: Tra cứu Học phí & Học bổng (Financial Hub)
- **HTML5 Input Types**: Sử dụng `checkbox` (chọn môn cần đóng tiền), `number` (số tín chỉ, đơn giá), `date` (hạn đóng tiền).
- **CSS3 Thẻ Học Bổng (Scholarship Cards)**: Hiển thị 3 mức học bổng (Xuất sắc 100%, Giỏi 75%, Khá 50%), tự động làm nổi bật mức mà sinh viên đang đạt được (Sinh viên Nguyễn Văn An đạt học bổng Giỏi 75% với GPA 3.58 và ĐRL 92đ).
- **JavaScript Công Thức Tính Học Phí Trực Tiếp**:
  $$\text{Số tiền thực đóng} = \text{Tổng học phí các môn được tick} - \text{Miễn giảm học bổng (75\%)}$$
  Sự kiện `change` trên từng checkbox môn học cập nhật ngay lập tức thành tiền và số tiền thực tế cần thanh toán mà không cần tải lại trang.

---

## 🤖 4. Trợ Lý AI LHU Copilot (AI Integration)
- **Floating Chatbot Widget**: Luôn sẵn sàng trên mọi trang web với cơ chế đối thoại tự nhiên.
- **Hỗ trợ giải đáp chuyên sâu 5 phân hệ**:
  - Quy định vắng quá 20% tiết học bị cấm thi.
  - Giới hạn tín chỉ đăng ký học kỳ chính (14 - 25 TC).
  - Tiêu chuẩn xét cấp học bổng khuyến khích (GPA $\ge 3.20$, ĐRL $\ge 80$).
  - Quy trình nộp link đồ án và chuẩn đầu ra TOEIC 500+ / MOS.

---

## 📱 5. Kiểm Thử & Tương Thích
- Chạy trực tiếp qua tệp `index.html` hoặc `functional.html` bằng cách nhấp đúp chuột trên Windows (nhờ tệp dự phòng `js/data.js` vượt qua giới hạn CORS của giao thức `file:///`).
- Hỗ trợ hoàn hảo mọi trình duyệt hiện đại (Chrome, Edge, Firefox, Safari).

---
© 2026 **LHU Campus** - Hoàn thành bởi Kỹ sư Thiết kế Web Frontend.
