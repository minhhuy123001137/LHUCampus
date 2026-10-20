/* ===================================================
   LHU CAMPUS - CLIENT DATA SOURCE (FALLBACK FOR FILE:// PROTOCOL)
   Guarantees 100% operation on both HTTP servers & direct double-click
   =================================================== */

window.CAMPUS_MOCK_DATA = {
  "studentSummary": {
    "name": "Nguyễn Văn An",
    "studentId": "22DTH0124",
    "faculty": "Khoa Công nghệ Thông tin",
    "major": "Kỹ thuật Phần mềm (Software Engineering)",
    "class": "22CT111",
    "academicYear": "Khóa 2022 - 2026",
    "email": "an.nguyen22@lhu.edu.vn",
    "phone": "0912345678",
    "dateOfBirth": "2004-05-18",
    "gender": "Nam",
    "address": "TP. Biên Hòa, Tỉnh Đồng Nai",
    "gpa4": 3.58,
    "gpa10": 8.65,
    "creditsAccumulated": 88,
    "creditsTotal": 135,
    "trainingPoints": 92,
    "academicRanking": "Giỏi",
    "tuitionStatus": "Đã thanh toán (HK1 2026-2027)",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  "upcomingClasses": [
    {
      "id": "c1",
      "subject": "Lập trình Web Nâng Cao & Cloud",
      "code": "IT305",
      "room": "Phòng Lab 402 - Cơ sở 2",
      "time": "07:30 - 11:00 Hôm nay",
      "lecturer": "ThS. Trần Quang Huy",
      "faculty": "CNTT",
      "status": "ongoing"
    },
    {
      "id": "c2",
      "subject": "Trí tuệ Nhân tạo & Deep Learning",
      "code": "IT412",
      "room": "Phòng A301 - Cơ sở 1",
      "time": "13:00 - 16:30 Ngày mai",
      "lecturer": "TS. Hoàng Đức Long",
      "faculty": "CNTT",
      "status": "upcoming"
    },
    {
      "id": "c3",
      "subject": "Kiến trúc & Thiết kế Phần mềm",
      "code": "IT320",
      "room": "Phòng B205 - Cơ sở 2",
      "time": "07:30 - 11:00 Thứ Sáu",
      "lecturer": "ThS. Lê Thị Mai Phương",
      "faculty": "CNTT",
      "status": "upcoming"
    }
  ],
  "deadlines": [
    {
      "id": "d1",
      "title": "Báo cáo Đồ án Frontend LHU Campus",
      "subject": "Lập trình Web Nâng Cao",
      "dueDate": "23:59 Hôm nay",
      "priority": "urgent",
      "progress": 90,
      "badge": "Khẩn cấp"
    },
    {
      "id": "d2",
      "title": "Nộp bài tập Huấn luyện Mô hình ResNet",
      "subject": "Trí tuệ Nhân tạo",
      "dueDate": "23:59 Ngày 24/10/2026",
      "priority": "normal",
      "progress": 65,
      "badge": "Còn 4 ngày"
    },
    {
      "id": "d3",
      "title": "Hạn chót Đăng ký Học phần Đợt 2",
      "subject": "Phòng Đào tạo",
      "dueDate": "17:00 Ngày 28/10/2026",
      "priority": "important",
      "progress": 30,
      "badge": "Học vụ"
    }
  ],
  "announcements": [
    {
      "id": "n1",
      "title": "Thông báo xét cấp Học bổng Tài năng & Khuyến khích Học tập HK1 (2026 - 2027)",
      "category": "Học bổng & Khen thưởng",
      "date": "18/10/2026",
      "author": "Phòng Công tác Sinh viên LHU",
      "summary": "Trường Đại học Lạc Hồng công bố quỹ học bổng trị giá 15 tỷ đồng dành cho sinh viên có thành tích xuất sắc và hoàn cảnh vượt khó trong học kỳ này.",
      "image": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80",
      "views": 2420,
      "isNew": true
    },
    {
      "id": "n2",
      "title": "Đội tuyển LHU Robocon khởi động chiến dịch ABU Robocon 2026",
      "category": "Khoa học & Công nghệ",
      "date": "15/10/2026",
      "author": "Ban Chỉ Đạo Robocon LHU",
      "summary": "Tập hợp các tài năng trẻ từ khoa Cơ điện - Điện tử và Công nghệ Thông tin, đặt mục tiêu giữ vững truyền thống vô địch quốc gia và vươn tầm châu Á.",
      "image": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=700&q=80",
      "views": 3810,
      "isNew": true
    },
    {
      "id": "n3",
      "title": "LHU Job Fair 2026: Kết nối hơn 60 doanh nghiệp hàng đầu trong và ngoài nước",
      "category": "Cơ hội Việc làm",
      "date": "12/10/2026",
      "author": "Trung tâm Hỗ trợ Sinh viên & Quan hệ Doanh nghiệp",
      "summary": "Cung cấp hơn 1.200 vị trí tuyển dụng thực tập sinh và kỹ sư chính thức cho sinh viên khối ngành Kỹ thuật, Kinh tế, Ngôn ngữ và Dược học.",
      "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80",
      "views": 1950,
      "isNew": false
    },
    {
      "id": "n4",
      "title": "Quy chế mới về Chuẩn đầu ra Ngoại ngữ (TOEIC 550+) và Tin học Quốc tế (MOS)",
      "category": "Quy chế Học vụ",
      "date": "08/10/2026",
      "author": "Phòng Đào tạo Đại học Lạc Hồng",
      "summary": "Cập nhật các lộ trình ôn luyện và các trường hợp được miễn chuẩn đầu ra ngoại ngữ cho sinh viên chuẩn bị tốt nghiệp trong năm học.",
      "image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=700&q=80",
      "views": 4120,
      "isNew": false
    }
  ],
  "regulations": [
    {
      "id": "reg-01",
      "category": "dao-tao",
      "categoryName": "Quy chế Đào tạo Tín chỉ",
      "code": "QC-LHU-2024/01",
      "title": "Quy định về đăng ký học phần, rút học phần và tích lũy tín chỉ",
      "excerpt": "Sinh viên chính quy phải đăng ký tối thiểu 14 tín chỉ và tối đa 24 tín chỉ trong học kỳ chính. Được phép rút môn trong 2 tuần đầu kỳ học mà không lưu điểm F.",
      "content": "1. Khối lượng học tập tối thiểu: 14 tín chỉ/kỳ (đối với sinh viên học lực bình thường) và 10 tín chỉ/kỳ (đối với sinh viên bị cảnh báo học vụ).\n2. Rút học phần: Sinh viên nộp đơn online trong vòng 14 ngày kể từ ngày bắt đầu học kỳ, học phần rút không tính vào GPA và hiển thị ký hiệu 'W'.\n3. Học cải thiện: Điểm môn học dưới C có thể đăng ký học lại để nâng điểm GPA, điểm mới cao hơn sẽ thay thế điểm cũ trên bảng điểm tích lũy.",
      "tags": ["Tín chỉ", "Rút học phần", "Học cải thiện", "Khối lượng học tập"],
      "important": true
    },
    {
      "id": "reg-02",
      "category": "thi-cu",
      "categoryName": "Thi cử & Điểm số",
      "code": "QC-LHU-2024/02",
      "title": "Quy chế hoãn thi, thi lại và xử lý điểm F trong kỳ kiểm tra",
      "excerpt": "Điều kiện dự thi kết thúc học phần: Tham gia ít nhất 80% thời lượng môn học. Điểm tổng kết dưới 4.0 (thang điểm 10) bị tính là điểm F và phải học lại.",
      "content": "1. Chuyên cần: Nghỉ quá 20% tổng số tiết không có lý do chính đáng sẽ bị cấm thi kết thúc học phần (nhận điểm 0 thi cuối kỳ).\n2. Hoãn thi: Trường hợp ốm đau hoặc tai nạn đột xuất phải nộp giấy xác nhận bệnh viện cho Phòng Khảo thí trong vòng 03 ngày làm việc để được thi bổ sung ở đợt kế tiếp.\n3. Xếp loại điểm chữ: A (8.5 - 10.0), B+ (8.0 - 8.4), B (7.0 - 7.9), C+ (6.5 - 6.9), C (5.5 - 6.4), D+ (5.0 - 5.4), D (4.0 - 4.9), F (<4.0).",
      "tags": ["Điểm F", "Hoãn thi", "Chuyên cần", "Thang điểm 4"],
      "important": true
    },
    {
      "id": "reg-03",
      "category": "hoc-bong",
      "categoryName": "Học bổng & Tài chính",
      "code": "QC-LHU-2024/03",
      "title": "Tiêu chuẩn xét cấp học bổng khuyến khích học tập và miễn giảm học phí",
      "excerpt": "Học bổng Xuất sắc: GPA >= 3.60 và ĐRL >= 90; Học bổng Giỏi: GPA >= 3.20 và ĐRL >= 80; không có môn học nào bị điểm F trong kỳ xét.",
      "content": "1. Mức học bổng Khuyến khích: Xuất sắc (100% học phí học kỳ), Giỏi (75% học phí học kỳ), Khá (50% học phí học kỳ).\n2. Điều kiện bắt buộc: Đăng ký tối thiểu 15 tín chỉ trong kỳ; không nợ môn học; không vi phạm kỷ luật từ mức khiển trách trở lên.\n3. Học bổng Thủ khoa/Á khoa đầu vào và Doanh nghiệp tài trợ: Được trao định kỳ mỗi đầu năm học theo quyết định của Hội đồng Trường.",
      "tags": ["Học bổng", "Miễn giảm học phí", "GPA 3.6", "Điểm rèn luyện"],
      "important": false
    },
    {
      "id": "reg-04",
      "category": "ren-luyen",
      "categoryName": "Rèn luyện & Kỷ luật",
      "code": "QC-LHU-2024/04",
      "title": "Quy chế đánh giá điểm rèn luyện sinh viên hàng kỳ",
      "excerpt": "Điểm rèn luyện được chấm trên thang điểm 100 theo 5 tiêu chí: Ý thức học tập, Chấp hành nội quy, Hoạt động đoàn hội thể thao, Quan hệ cộng đồng và Khen thưởng.",
      "content": "1. Phân loại rèn luyện: Xuất sắc (90 - 100), Tốt (80 - 89), Khá (65 - 79), Trung bình (50 - 64), Yếu (35 - 49), Kém (<35).\n2. Hậu quả ĐRL Yếu/Kém 2 kỳ liên tiếp: Sẽ bị tạm đình chỉ học tập 1 học kỳ chính.\n3. Quyền lợi: Điểm rèn luyện ảnh hưởng trực tiếp đến việc xét học bổng, xét khen thưởng, lưu trú ký túc xá và công nhận tốt nghiệp.",
      "tags": ["ĐRL", "Kỷ luật", "Hoạt động sinh viên", "Xếp loại"],
      "important": false
    },
    {
      "id": "reg-05",
      "category": "chuan-dau-ra",
      "categoryName": "Chuẩn đầu ra & Tốt nghiệp",
      "code": "QC-LHU-2024/05",
      "title": "Quy định chuẩn đầu ra Tiếng Anh, Tin học và Kỹ năng mềm xét tốt nghiệp",
      "excerpt": "Sinh viên các ngành Kỹ thuật - Kinh tế cần đạt TOEIC 500 - 550 hoặc IELTS tương đương; chứng chỉ Tin học Quốc tế MOS 3 kỹ năng (Word, Excel, PowerPoint).",
      "content": "1. Chuẩn Ngoại ngữ: TOEIC 550+ (Ngành Ngôn ngữ Anh: C1 / IELTS 6.5+; Ngành Kỹ thuật - Kinh tế: TOEIC 500+).\n2. Chuẩn Tin học: Đạt chứng chỉ MOS (Microsoft Office Specialist) điểm tối thiểu 700/1000 cho 3 môn Word, Excel, PPT.\n3. Chứng nhận kỹ năng mềm: Hoàn thành 4 chuyên đề Kỹ năng mềm do Trung tâm Kỹ năng LHU tổ chức trước học kỳ cuối.",
      "tags": ["Chuẩn đầu ra", "TOEIC", "MOS", "Kỹ năng mềm", "Tốt nghiệp"],
      "important": true
    },
    {
      "id": "reg-06",
      "category": "dao-tao",
      "categoryName": "Quy chế Đào tạo Tín chỉ",
      "code": "QC-LHU-2024/06",
      "title": "Cảnh báo học vụ và điều kiện buộc thôi học",
      "excerpt": "Sinh viên có điểm trung bình học kỳ dưới 1.0 (hệ 4) ở kỳ đầu, hoặc dưới 1.2 ở các kỳ tiếp theo sẽ bị cảnh báo học vụ lần 1. Bị 3 lần cảnh báo liên tiếp sẽ bị buộc thôi học.",
      "content": "1. Cảnh báo học vụ lần 1: Sinh viên chỉ được đăng ký tối đa 12 tín chỉ trong học kỳ sau và phải gặp Cố vấn học tập định kỳ.\n2. Cảnh báo học vụ lần 2: Nhà trường gửi văn bản thông báo về gia đình và cử giảng viên hỗ trợ kèm cặp.\n3. Buộc thôi học: Khi bị cảnh báo lần 3 liên tiếp hoặc vượt quá thời gian tối đa được phép học tập tại trường (6 năm cho chương trình cử nhân/kỹ sư 4 năm).",
      "tags": ["Cảnh báo học vụ", "Thôi học", "GPA thấp", "Cố vấn học tập"],
      "important": false
    }
  ],
  "courses": [
    {
      "id": "crs-01",
      "code": "IT305",
      "name": "Lập trình Web Nâng Cao & Cloud",
      "faculty": "CNTT",
      "facultyName": "Khoa Công nghệ Thông tin",
      "credits": 3,
      "type": "Bắt buộc",
      "pricePerCredit": 520000,
      "lecturer": "ThS. Trần Quang Huy",
      "semester": "HK1 (2026-2027)",
      "schedule": "Thứ 2 (Tiết 1-4) - Lab 402 CS2",
      "slots": "45/50",
      "rating": 4.9
    },
    {
      "id": "crs-02",
      "code": "IT412",
      "name": "Trí tuệ Nhân tạo & Deep Learning",
      "faculty": "CNTT",
      "facultyName": "Khoa Công nghệ Thông tin",
      "credits": 4,
      "type": "Chuyên ngành",
      "pricePerCredit": 520000,
      "lecturer": "TS. Hoàng Đức Long",
      "semester": "HK1 (2026-2027)",
      "schedule": "Thứ 3 (Tiết 6-9) - Lab AI CS1",
      "slots": "38/40",
      "rating": 5.0
    },
    {
      "id": "crs-03",
      "code": "IT320",
      "name": "Kiến trúc & Thiết kế Phần mềm",
      "faculty": "CNTT",
      "facultyName": "Khoa Công nghệ Thông tin",
      "credits": 3,
      "type": "Bắt buộc",
      "pricePerCredit": 520000,
      "lecturer": "ThS. Lê Thị Mai Phương",
      "semester": "HK1 (2026-2027)",
      "schedule": "Thứ 5 (Tiết 1-4) - B205 CS2",
      "slots": "48/50",
      "rating": 4.8
    },
    {
      "id": "crs-04",
      "code": "BA201",
      "name": "Khởi nghiệp Đổi mới Sáng tạo",
      "faculty": "KTe",
      "facultyName": "Khoa Quản trị - Kinh tế Quốc tế",
      "credits": 2,
      "type": "Tự chọn",
      "pricePerCredit": 480000,
      "lecturer": "TS. Nguyễn Minh Hải",
      "semester": "HK1 (2026-2027)",
      "schedule": "Thứ 6 (Tiết 7-9) - Hội trường CS1",
      "slots": "70/80",
      "rating": 4.7
    },
    {
      "id": "crs-05",
      "code": "ME210",
      "name": "Lập trình Điều khiển Robot Công nghiệp",
      "faculty": "CoDien",
      "facultyName": "Khoa Cơ điện - Điện tử",
      "credits": 4,
      "type": "Chuyên ngành",
      "pricePerCredit": 550000,
      "lecturer": "PGS.TS. Phạm Văn Toàn",
      "semester": "HK1 (2026-2027)",
      "schedule": "Thứ 4 (Tiết 1-5) - Xưởng Robocon CS2",
      "slots": "28/30",
      "rating": 4.95
    },
    {
      "id": "crs-06",
      "code": "PH302",
      "name": "Dược lý học Lâm sàng 1",
      "faculty": "Duoc",
      "facultyName": "Khoa Dược",
      "credits": 3,
      "type": "Bắt buộc",
      "pricePerCredit": 600000,
      "lecturer": "DS.CKII. Vũ Thị Thanh",
      "semester": "HK1 (2026-2027)",
      "schedule": "Thứ 7 (Tiết 2-5) - CS Dược Long Bình",
      "slots": "40/45",
      "rating": 4.85
    },
    {
      "id": "crs-07",
      "code": "EN203",
      "name": "Tiếng Anh Giao tiếp & Thuyết trình Chuyên nghiệp",
      "faculty": "NgonNgu",
      "facultyName": "Khoa Ngôn ngữ & Văn hóa",
      "credits": 3,
      "type": "Bắt buộc",
      "pricePerCredit": 480000,
      "lecturer": "ThS. Michael Anderson",
      "semester": "HK1 (2026-2027)",
      "schedule": "Thứ 3 (Tiết 1-4) - C401 CS1",
      "slots": "32/35",
      "rating": 4.9
    },
    {
      "id": "crs-08",
      "code": "IT450",
      "name": "An toàn & Bảo mật Hệ thống Thông tin",
      "faculty": "CNTT",
      "facultyName": "Khoa Công nghệ Thông tin",
      "credits": 3,
      "type": "Chuyên ngành",
      "pricePerCredit": 520000,
      "lecturer": "ThS. Đặng Hữu Thành",
      "semester": "HK1 (2026-2027)",
      "schedule": "Thứ 7 (Tiết 6-9) - Lab Mạng CS2",
      "slots": "35/40",
      "rating": 4.75
    }
  ],
  "clubs": [
    {
      "id": "clb-01",
      "name": "CLB Robocon Lạc Hồng (LHU Robotics)",
      "category": "Công nghệ & Kỹ thuật",
      "founded": 2005,
      "members": 120,
      "tagline": "Cái nôi của 9 lần vô địch ABU Robocon châu Á - Thái Bình Dương",
      "description": "Nơi các sinh viên đam mê cơ khí, mạch điện tử, lập trình nhúng và tự động hóa cùng chế tạo robot thi đấu các giải đỉnh cao toàn quốc và quốc tế.",
      "image": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
      "leader": "Trần Anh Quân (K21 Cơ điện tử)",
      "meeting": "18h00 Thứ 3 & Thứ 7 hàng tuần tại Xưởng Robocon CS2",
      "tags": ["Robotics", "IoT", "Cơ điện", "Lập trình C/C++"]
    },
    {
      "id": "clb-02",
      "name": "LHU IT Club & DevZone",
      "category": "Công nghệ Thông tin",
      "founded": 2012,
      "members": 210,
      "tagline": "Kết nối đam mê Lập trình, AI & An toàn thông tin",
      "description": "Tổ chức các buổi workshop chia sẻ công nghệ mới (Web, AI, Cloud, Mobile App), hackathon nội bộ và hỗ trợ sinh viên luyện thi ICPC, OLP Tin học sinh viên.",
      "image": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
      "leader": "Lê Thị Bích Hạnh (K22 CNTT)",
      "meeting": "19h00 Thứ 5 (Online/Lab 402 CS2)",
      "tags": ["Web Dev", "Python", "Hackathon", "AI"]
    },
    {
      "id": "clb-03",
      "name": "LHU English Club (LEC)",
      "category": "Ngôn ngữ & Giao lưu",
      "founded": 2010,
      "members": 180,
      "tagline": "Speak with Confidence - Connect to the World",
      "description": "Không gian luyện nói tiếng Anh tương tác 100%, câu lạc bộ sách, luyện thi chứng chỉ TOEIC/IELTS cùng các giảng viên bản ngữ và các bạn sinh viên quốc tế.",
      "image": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
      "leader": "Nguyễn Hoàng Nam (K22 Ngôn ngữ Anh)",
      "meeting": "08h30 Chủ nhật hàng tuần tại Sân cơ sở 1",
      "tags": ["English", "Debate", "TOEIC", "Public Speaking"]
    }
  ],
  "faqAI": [
    {
      "keywords": ["học bổng", "điều kiện học bổng", "tiền học bổng", "xét học bổng"],
      "question": "Điều kiện để nhận học bổng khuyến khích học tập tại LHU là gì?",
      "answer": "Để được xét học bổng khuyến khích LHU, bạn cần: \n1) Đăng ký tối thiểu 15 tín chỉ trong kỳ chính.\n2) Không có môn nào bị điểm F.\n3) Xếp loại học tập từ Giỏi trở lên (GPA >= 3.20/4.0) và Điểm rèn luyện từ 80 trở lên (Loại Tốt).\n* Xuất sắc (GPA >= 3.60, ĐRL >= 90): 100% học phí kỳ tới.\n* Giỏi (GPA >= 3.20, ĐRL >= 80): 75% học phí kỳ tới."
    },
    {
      "keywords": ["điểm rèn luyện", "drl", "cách tính drl", "chấm drl"],
      "question": "Điểm rèn luyện được chấm như thế nào và có quan trọng không?",
      "answer": "Điểm rèn luyện (ĐRL) được chấm trên thang 100 điểm với 5 tiêu chí: Ý thức học tập (tối đa 20đ), Nội quy - Quy chế (tối đa 25đ), Hoạt động Đoàn - Hội - Thể thao (tối đa 20đ), Quan hệ công dân - Phục vụ cộng đồng (tối đa 25đ), và Khen thưởng thành tích (tối đa 10đ).\nĐRL ảnh hưởng trực tiếp đến xét Học bổng, Bằng tốt nghiệp và danh hiệu Sinh viên 5 Tốt."
    },
    {
      "keywords": ["rút môn", "rút học phần", "hủy môn", "bỏ môn"],
      "question": "Làm thế nào để rút bớt học phần đã đăng ký?",
      "answer": "Sinh viên được phép rút học phần trong vòng 14 ngày (2 tuần) đầu tiên kể từ khi học kỳ bắt đầu. Thao tác trên cổng sinh viên trực tuyến mục 'Đăng ký học phần > Rút môn'. Học phần rút sẽ mang điểm 'W' và không tính vào điểm trung bình tích lũy."
    },
    {
      "keywords": ["chuẩn đầu ra", "toeic", "mos", "tin học", "ngoại ngữ"],
      "question": "Chuẩn đầu ra Ngoại ngữ và Tin học khi tốt nghiệp LHU?",
      "answer": "Quy định tốt nghiệp LHU yêu cầu: \n1) Chuẩn Ngoại ngữ: Chứng chỉ Quốc tế TOEIC 500+ (khối Kỹ thuật & Kinh tế) hoặc IELTS 5.5+.\n2) Chuẩn Tin học: Đạt chứng chỉ MOS 3 môn (Word, Excel, PowerPoint) từ 700/1000 điểm trở lên.\n3) Chứng chỉ 4 chuyên đề Kỹ năng mềm bắt buộc."
    },
    {
      "keywords": ["gpa", "tính điểm gpa", "thang điểm 4", "thang điểm 10"],
      "question": "Cách quy đổi điểm từ thang 10 sang thang 4 tại LHU?",
      "answer": "Quy đổi chuẩn: \n* Điểm A (8.5 - 10.0) = 4.0\n* Điểm B+ (8.0 - 8.4) = 3.5\n* Điểm B (7.0 - 7.9) = 3.0\n* Điểm C+ (6.5 - 6.9) = 2.5\n* Điểm C (5.5 - 6.4) = 2.0\n* Điểm D+ (5.0 - 5.4) = 1.5\n* Điểm D (4.0 - 4.9) = 1.0\n* Điểm F (< 4.0) = 0.0 (Học lại).\nGPA được tính bằng: Tổng (Điểm hệ 4 x Số tín chỉ) / Tổng số tín chỉ."
    },
    {
      "keywords": ["robocon", "clb robocon", "tham gia robocon", "chế tạo robot"],
      "question": "Muốn tham gia Đội tuyển LHU Robocon cần chuẩn bị những gì?",
      "answer": "Đại học Lạc Hồng chào đón tất cả tân sinh viên đam mê công nghệ tham gia CLB Robocon LHU! Bạn có thể chọn 1 trong 3 mảng: Cơ khí thiết kế 3D, Mạch điện tử & Cảm biến, hoặc Lập trình điều khiển nhúng (C/C++, ROS, AI). Tuyển thành viên vào đầu mỗi năm học tại Xưởng Robocon Cơ sở 2."
    }
  ]
};
