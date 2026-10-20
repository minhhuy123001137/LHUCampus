# 🎓 LHU Campus - Cổng Thông Tin & Quản Lý Học Vụ Sinh Viên Đại Học Lạc Hồng

> Dự án Web tương tác hiện đại được xây dựng bởi **Kỹ sư Thiết kế Web Frontend**, kết hợp công nghệ **HTML5, CSS3, JavaScript ES6+**, xử lý dữ liệu động JSON, tích hợp API thời tiết thực tế và **Trợ lý Ảo AI (LHU Copilot)**.

---

## 📌 1. Giới Thiệu Dự Án (Project Overview)
**LHU Campus** là nền tảng số hóa học vụ toàn diện dành cho tân sinh viên và sinh viên Trường Đại học Lạc Hồng (Lạc Hồng University - Đồng Nai). Website giúp sinh viên:
- **Nắm bắt tổng quan học tập**: Điểm GPA tích lũy, tiến độ tín chỉ, thời khóa biểu sắp diễn ra hôm nay, hạn nộp bài tập.
- **Tra cứu nhanh quy chế học vụ**: Sổ tay sinh viên, quy định đào tạo tín chỉ, quy chế thi - hoãn thi, xử lý điểm F, điều kiện học bổng tài năng, chuẩn đầu ra TOEIC và Tin học MOS.
- **Đăng ký học phần & Tính học phí trực tiếp**: Lựa chọn môn học theo khoa, hệ thống tự động tính tổng số tín chỉ, học phí ước tính thời gian thực và kiểm soát hạn mức 14 - 24 tín chỉ/kỳ.
- **Công cụ mô phỏng GPA 4.0 & Xếp loại tốt nghiệp**: Thêm/xóa môn học động, chuyển đổi thang điểm 10 sang thang 4, phân tích học lực và nhận lời khuyên từ AI Study Advisor.
- **Quản lý hồ sơ & Cài đặt ứng dụng**: Biểu mẫu HTML5 toàn diện với kiểm tra dữ liệu bằng Regex tiếng Việt, lưu trữ `localStorage`, xem trước ảnh đại diện tức thì và đồng bộ thời gian thực trên toàn trang.
- **Trợ lý AI LHU Copilot**: Tích hợp chatbot thông minh hỗ trợ giải đáp quy chế 24/7 và tính năng "AI Tóm tắt nhanh quy định".

---

## 🚀 2. Kiến Trúc Cấu Trúc Thư Mục (Project Structure)
```text
LHUCampus/
├── index.html              # Trang Chủ (Dashboard & Landing Page)
├── functional.html         # Trang Chi Tiết Chức Năng (Tra cứu Quy chế, Đăng ký môn & Tính GPA)
├── profile.html            # Trang Quản lý Hồ Sơ Sinh Viên & Cài Đặt Ứng Dụng
├── README.md               # Tài liệu hướng dẫn kỹ thuật chi tiết
├── css/
│   ├── variables.css       # Design Tokens, bảng màu LHU, Dark/Light Mode Variables
│   ├── style.css           # Global Styles, Navbar, Footer, Toast Engine, AI Launcher, Modal
│   ├── dashboard.css       # Bố cục CSS Grid cho Dashboard Cards, Hero Slider, News & Clubs
│   ├── functional.css      # Bố cục cho Tabs, Bộ lọc Search, Giỏ môn học & Bảng tính GPA
│   └── profile.css         # Bố cục Form HTML5, Trạng thái Regex Validation, Switch Settings
├── js/
│   ├── data.js             # Mock Data dự phòng bảo đảm 100% hoạt động cả trên HTTP & File://
│   ├── main.js             # Quản lý Theme Dark/Light, Mobile Drawer, Toast, Profile Sync, Open Weather API
│   ├── slider.js           # Slider Carousel: Auto-play, Pause-on-hover, Next/Prev, Touch Swipe di động
│   ├── dashboard.js        # Đổ dữ liệu JSON lên KPI cards, News filter chips, Deadlines checkbox
│   ├── functional.js       # Logic Tab, Live Search & Filter quy chế, Giỏ môn học, Máy tính GPA
│   ├── profile.js          # Kiểm tra Form bằng Regex (Email, SĐT VN, MSSV LHU), FileReader Avatar Preview
│   └── ai-chat.js          # Trợ lý AI LHU Copilot, Natural Language Matching, AI Tóm tắt văn bản
└── data/
    └── campus-data.json    # Cơ sở dữ liệu học vụ, quy chế, danh sách môn học, câu lạc bộ LHU
```

---

## 💎 3. Chi Tiết Các Trang Cốt Lõi (Core Pages)

### 3.1. Trang Chủ (Dashboard / Landing Page - `index.html`)
- **Hero Image Carousel**:
  - Tự động chuyển slide sau 5.5s, hỗ trợ vuốt chạm trên màn hình cảm ứng di động (Touch Gestures).
  - Nút điều hướng trước/sau và chấm chỉ số phân trang tương tác.
- **Welcome & Daily AI Strip**:
  - Lời chào cá nhân hóa theo tên sinh viên, gợi ý bài tập và lịch học cấp bách trong ngày.
- **Bố cục Thẻ Tóm Tắt (CSS Grid 4 Cột Responsive)**:
  - **GPA Hiện Tại**: Điển 3.58/4.00, thanh tiến trình trực quan, nhãn học lực "Giỏi".
  - **Tín Chỉ Tích Lũy**: 88/135 tín chỉ (65.2%), cảnh báo tín chỉ còn lại.
  - **Môn Học Sắp Tới**: Lập trình Web Nâng Cao & Cloud (Lab 402 - Cơ sở 2), giờ học, giảng viên.
  - **Hạn Nộp Bài Tập Gần Nhất**: Đồ án Web Frontend LHU (Hôm nay 23:59), nút check hoàn thành tương tác có thông báo Toast.
- **Bàn Làm Việc Sinh Viên (Quick Shortcuts)**:
  - 6 phím tắt chuyển nhanh đến các phân hệ học vụ quan trọng.
- **Tin Tức & Thông Báo LHU**:
  - Đổ dữ liệu tự động từ JSON, tích hợp thanh Filter Chips lọc danh mục theo thời gian thực (Học bổng, Khoa học công nghệ, Việc làm, Quy chế).
- **Hệ Sinh Thái Câu Lạc Bộ LHU**:
  - Vinh danh CLB Robocon Lạc Hồng (9 lần vô địch ABU Robocon châu Á), IT Club DevZone, CLB Tiếng Anh (LEC)... Nút "Tham gia" gửi yêu cầu ngay lập tức.

### 3.2. Trang Chi Tiết Chức Năng (Functional Page - `functional.html`)
Bao gồm 3 phân hệ trọng tâm:
1. **Phân hệ Tra cứu Quy chế Học vụ**:
   - Ô tìm kiếm trực tiếp (Search Live) theo tiêu đề, nội dung tóm tắt và thẻ tag (`#Điểm F`, `#Rút học phần`, `#TOEIC`, `#Học bổng`...).
   - Lọc phân loại danh mục quy chế (Đào tạo tín chỉ, Thi cử, Học phí & Học bổng, Điểm rèn luyện, Chuẩn đầu ra).
   - Hộp thoại Modal xem chi tiết văn bản đính kèm tính năng **"AI Tóm tắt nhanh quy định"**.
2. **Phân hệ Đăng ký Môn & Máy tính Học phí Trực tiếp (Real-time Tuition Cart)**:
   - Danh sách môn học đa khoa (CNTT, Cơ điện tử Robocon, Dược, Kinh tế, Ngôn ngữ).
   - Bộ lọc theo Khoa và loại học phần (Bắt buộc, Chuyên ngành, Tự chọn).
   - **Giỏ đăng ký thông minh**: Tính toán ngay lập tức **Tổng tín chỉ** và **Tổng học phí ước tính (VNĐ)**, tự động kiểm tra giới hạn khối lượng học tập (14 - 24 tín chỉ/kỳ).
3. **Phân hệ Công cụ Tính điểm GPA & Dự đoán Tốt nghiệp**:
   - Bảng nhập liệu động: Thêm/xóa hàng môn học tùy ý.
   - Chọn số tín chỉ (1 - 5) và điểm chữ (A, B+, B, C+, C, D+, D, F).
   - Tính toán thời gian thực:
     $$\text{GPA Hệ 4} = \frac{\sum (\text{Điểm Hệ 4} \times \text{Số TC})}{\sum \text{Số TC}}$$
     - Tự động hiển thị GPA hệ 4, GPA hệ 10, Xếp loại tốt nghiệp (Xuất sắc, Giỏi, Khá, Trung bình, Yếu) và lời khuyên nâng hạng bằng từ AI Study Advisor.

### 3.3. Trang Quản Lý Hồ Sơ & Cấu Hình (Profile & Settings Page - `profile.html`)
- **Banner Sinh Viên Trực Quan**:
  - Hiển thị Avatar, Họ tên, Mã SV, Khoa, GPA và Điểm rèn luyện.
  - Cho phép chọn file ảnh từ máy tính (`FileReader`) để thay đổi avatar và cập nhật ngay lên toàn bộ hệ thống (kể cả thanh Header).
- **Biểu Mẫu HTML5 Toàn Diện (Validation với Regex chuẩn Việt Nam)**:
  - **Họ và tên**: Tối thiểu 2 từ, chỉ chứa chữ cái tiếng Việt.
  - **Mã số sinh viên (MSSV)**: Bắt đầu bằng khóa `2x`, ví dụ `22DTH0124`.
  - **Email LHU**: Kiểm tra định dạng email tiêu chuẩn sinh viên (`@lhu.edu.vn`).
  - **Số điện thoại**: 10 chữ số chuẩn đầu số viễn thông Việt Nam (03, 05, 07, 08, 09).
  - **Ngày sinh**: Định dạng Date Picker chuẩn.
  - **Giới tính**: Radio Button.
  - **Khoa & Chuyên ngành**: Dropdown Select.
  - **Mục tiêu GPA**: Range Slider điều chỉnh trực tiếp từ 2.0 đến 4.0 với số liệu hiển thị thời gian thực.
  - **Đăng ký nhận thông báo**: Checkbox inputs.
  - **Giới thiệu bản thân**: Textarea.
- **Phản hồi lỗi tức thì**: Trạng thái `.is-valid` (viền xanh + icon tick) và `.is-invalid` (viền đỏ + thông báo lỗi).
- **Lưu trữ `localStorage`**: Khi nhấn nút "Lưu Thay Đổi", dữ liệu lập tức được lưu vào trình duyệt và cập nhật ngay lên Header/Navbar của cả 3 trang.
- **Cài đặt Hệ thống**: Công tắc Switch bật/tắt Dark Mode, 2FA bảo mật 2 lớp, thông báo SMS/Email.

---

## 🤖 4. Điểm Nhấn Tích Hợp AI (AI Integration Highlights)
1. **LHU Copilot - Trợ lý AI Học Vụ 24/7**:
   - Widget nổi ở góc màn hình có thể kích hoạt trên bất kỳ trang nào.
   - Cơ chế Natural Language Keyword Matching phân tích câu hỏi của sinh viên về quy chế đào tạo, học bổng, điểm rèn luyện, chuẩn đầu ra TOEIC và CLB Robocon.
   - Hiệu ứng mô phỏng suy nghĩ (Typing indicator animation) tạo trải nghiệm trò chuyện tương tác tự nhiên.
2. **AI Tóm Tắt Nhanh Văn Bản (AI Summarizer)**:
   - Trong cửa sổ xem chi tiết quy chế học vụ, nút "AI Tóm Tắt Nhanh" trích xuất tức thì các điểm cốt lõi ngắn gọn giúp tân sinh viên nắm bắt quy định chỉ trong 5 giây.
3. **AI Lời Khuyên Học Tập (AI Study Advisor)**:
   - Trong công cụ tính điểm GPA, AI tự động phân tích điểm số hiện tại và tính toán số tín chỉ điểm A cần đạt ở kỳ tiếp theo để nâng bằng lên hạng Giỏi hoặc Xuất sắc.
4. **Tối ưu hóa Mã Nguồn & Hiển Thị Bằng AI**:
   - Toàn bộ cấu trúc mã nguồn được phân tách mô-đun sạch sẽ, tối ưu hóa kích thước DOM, Semantic HTML5 cho SEO/Accessibility (ARIA labels) và trải nghiệm người dùng cao cấp.

---

## 🛠️ 5. Hướng Dẫn Sử Dụng & Khởi Chạy (How to Run)
Không cần cài đặt Node.js hay môi trường backend phức tạp:
1. **Cách 1: Chạy trực tiếp**:
   - Nhấp đúp chuột vào tệp `index.html` để mở trong trình duyệt Chrome, Edge, Cốc Cốc, Firefox hoặc Safari.
2. **Cách 2: Chạy qua Live Server (Khuyên Dùng)**:
   - Mở thư mục `LHUCampus` trong VS Code.
   - Nhấp chuột phải vào `index.html` và chọn **Open with Live Server** (cổng `http://127.0.0.1:5500`).

---

## 📱 6. Khả Năng Tương Thích Thiết Bị (Responsive Design)
- **Desktop & Laptop**: Màn hình siêu nét (> 1200px), hiển thị lưới CSS Grid 4 cột đầy đủ.
- **Tablet / iPad**: Màn hình 768px - 1024px, co giãn linh hoạt 2 cột.
- **Mobile (Điện thoại thông minh)**: Màn hình < 768px, tự động chuyển đổi sang menu trượt (Mobile Drawer), bảng và thanh trượt tối ưu cho thao tác vuốt ngón tay (Touch Gestures).

---

© 2026 **LHU Campus** - Dự án hoàn thiện bởi Kỹ sư Thiết kế Web theo yêu cầu kỹ thuật chuẩn của Đại học Lạc Hồng.
