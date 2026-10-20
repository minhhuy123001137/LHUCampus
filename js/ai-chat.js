/* ===================================================
   LHU COPILOT - AI ASSISTANT FOR LAC HONG UNIVERSITY
   Intelligent Academic Advisor & Regulation Expert
   =================================================== */

class LHUCopilot {
  constructor() {
    this.launcher = document.querySelector('.ai-launcher');
    this.chatWindow = document.querySelector('.ai-chat-window');
    this.closeBtn = document.querySelector('.ai-chat-close');
    this.body = document.querySelector('.ai-chat-body');
    this.input = document.querySelector('.ai-chat-input');
    this.sendBtn = document.querySelector('.ai-chat-send');
    this.faqData = [];

    this.init();
  }

  async init() {
    if (!this.launcher || !this.chatWindow) return;

    // Load FAQ database from campus-data.json or fallback
    try {
      const res = await fetch('data/campus-data.json');
      if (res.ok) {
        const data = await res.json();
        this.faqData = data.faqAI || [];
      }
    } catch (e) {
      console.warn('Could not fetch AI FAQ data, using fallback knowledge base');
    }

    if ((!this.faqData || this.faqData.length === 0) && window.CAMPUS_MOCK_DATA) {
      this.faqData = window.CAMPUS_MOCK_DATA.faqAI || [];
    }

    // Toggle Chat Window
    this.launcher.addEventListener('click', () => this.toggleChat());
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeChat());
    }

    // Send Message events
    if (this.sendBtn && this.input) {
      this.sendBtn.addEventListener('click', () => this.handleSend());
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleSend();
        }
      });
    }

    // Suggested Chips click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('ai-chip')) {
        const query = e.target.getAttribute('data-query') || e.target.textContent;
        this.askQuery(query);
      }
    });
  }

  toggleChat() {
    this.chatWindow.classList.toggle('active');
    if (this.chatWindow.classList.contains('active')) {
      if (this.input) this.input.focus();
    }
  }

  openChat(initialQuery = null) {
    this.chatWindow.classList.add('active');
    if (initialQuery) {
      this.askQuery(initialQuery);
    }
    if (this.input) this.input.focus();
  }

  closeChat() {
    this.chatWindow.classList.remove('active');
  }

  handleSend() {
    const text = this.input.value.trim();
    if (!text) return;

    this.appendMessage(text, 'user');
    this.input.value = '';

    this.showTypingIndicator();
    setTimeout(() => {
      this.removeTypingIndicator();
      const reply = this.generateSmartResponse(text);
      this.appendMessage(reply, 'bot');
    }, 700);
  }

  askQuery(queryText) {
    this.appendMessage(queryText, 'user');
    this.showTypingIndicator();
    setTimeout(() => {
      this.removeTypingIndicator();
      const reply = this.generateSmartResponse(queryText);
      this.appendMessage(reply, 'bot');
    }, 600);
  }

  generateSmartResponse(userText) {
    const lower = userText.toLowerCase().trim();

    // 1. Search in campus FAQ data
    if (this.faqData && this.faqData.length > 0) {
      for (const item of this.faqData) {
        const matches = item.keywords.some(kw => lower.includes(kw.toLowerCase()));
        if (matches) {
          return item.answer;
        }
      }
    }

    // 2. Keyword fallback matching
    if (lower.includes('chào') || lower.includes('hello') || lower.includes('hi')) {
      return `Xin chào bạn! Mình là LHU Copilot - Trợ lý ảo AI của Trường Đại học Lạc Hồng. Mình có thể giải đáp các thắc mắc về Quy chế đào tạo tín chỉ, Học bổng, Điểm rèn luyện, Câu lạc bộ hoặc hướng dẫn tính điểm GPA. Bạn cần mình giúp gì nào?`;
    }

    if (lower.includes('học phí') || lower.includes('tiền học')) {
      return `Học phí tại Trường Đại học Lạc Hồng được tính theo số tín chỉ đăng ký thực tế trong kỳ (dao động từ 480.000đ - 600.000đ/tín chỉ tùy theo khối ngành Kỹ thuật, Kinh tế, hay Dược học). Bạn có thể vào tab "Đăng ký môn & Học phí" tại Trang Chức Năng để ước tính chính xác nhé!`;
    }

    if (lower.includes('thi lại') || lower.includes('học lại') || lower.includes('điểm f')) {
      return `Theo quy chế đào tạo LHU: Sinh viên có điểm tổng kết môn học dưới 4.0 (thang 10) bị điểm F và bắt buộc phải đăng ký học lại khi môn học được mở ở các học kỳ sau. Nếu điểm tổng kết từ D (4.0 - 4.9) trở lên, bạn được phép học cải thiện để nâng GPA.`;
    }

    if (lower.includes('robocon') || lower.includes('chế tạo robot')) {
      return `Đại học Lạc Hồng là cái nôi Robocon hàng đầu Việt Nam với 9 lần vô địch ABU Robocon Châu Á - Thái Bình Dương! CLB Robocon LHU luôn mở cửa đón tân sinh viên mọi chuyên ngành. Bạn có thể sinh hoạt tại Xưởng Robocon Cơ sở 2 để tham gia nghiên cứu và chế tạo thực tế.`;
    }

    if (lower.includes('gpa') || lower.includes('tính điểm')) {
      return `Điểm GPA được tính bằng tích lũy: Tổng (Điểm môn x Số tín chỉ) / Tổng tín chỉ. Thang 4.0: Giỏi từ 3.20 - 3.59, Xuất sắc từ 3.60 trở lên. Bạn hãy mở tab "Công cụ Tính GPA" trong Trang chức năng để mô phỏng điểm số nhé!`;
    }

    // Default intelligent response
    return `Cảm ơn bạn đã đặt câu hỏi: "${userText}".\n\nHệ thống AI của LHU đã ghi nhận. Theo dữ liệu quy chế học vụ năm học 2026-2027 của Đại học Lạc Hồng, bạn có thể tra cứu nhanh tại Trang chức năng hoặc liên hệ trực tiếp Phòng Đào tạo (Hotline: 0251.3952.144) để được hướng dẫn chi tiết nhất!`;
  }

  showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'ai-typing';
    typing.id = 'aiTypingIndicator';
    typing.innerHTML = `<span></span><span></span><span></span>`;
    this.body.appendChild(typing);
    this.body.scrollTop = this.body.scrollHeight;
  }

  removeTypingIndicator() {
    const typing = document.getElementById('aiTypingIndicator');
    if (typing) typing.remove();
  }

  appendMessage(text, sender = 'bot') {
    const msg = document.createElement('div');
    msg.className = `ai-msg ${sender}`;

    const avatarIcon = sender === 'bot' 
      ? '<i class="fa-solid fa-robot"></i>' 
      : '<i class="fa-solid fa-user"></i>';

    msg.innerHTML = `
      <div class="ai-msg-avatar">${avatarIcon}</div>
      <div class="ai-msg-bubble">${text}</div>
    `;

    this.body.appendChild(msg);
    this.body.scrollTop = this.body.scrollHeight;
  }
}

// Auto init when document is ready
document.addEventListener('DOMContentLoaded', () => {
  window.lhuCopilot = new LHUCopilot();
});
