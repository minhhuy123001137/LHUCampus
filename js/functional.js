/* ===================================================
   LHU CAMPUS - FUNCTIONAL PAGE SCRIPTS (ACADEMIC HUB)
   Regulations, Course Cart, Live Tuition & GPA Simulator
   =================================================== */

// Global State for Functional Page
let allRegulations = [];
let allCourses = [];
let selectedCourses = new Set();

document.addEventListener('DOMContentLoaded', async () => {
  initTabs();

  let data = null;
  try {
    const res = await fetch('data/campus-data.json');
    if (res.ok) {
      data = await res.json();
    }
  } catch (err) {
    console.warn('Fetch restricted or offline, using CAMPUS_MOCK_DATA fallback.');
  }

  if (!data && window.CAMPUS_MOCK_DATA) {
    data = window.CAMPUS_MOCK_DATA;
  }

  if (data) {
    allRegulations = data.regulations || [];
    allCourses = data.courses || [];

    // Tab 1: Regulations
    renderRegulations(allRegulations);
    initRegulationFilters();

    // Tab 2: Courses & Tuition Calculator
    renderCourses(allCourses);
    initCourseFilters();
    updateRegistrationCart();

    // Tab 3: GPA Calculator
    initGPACalculator();

    // Check URL parameters to activate specific tab
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
      const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabParam}"]`);
      if (targetBtn) targetBtn.click();
    }
  }
});

/* ===================================================
   TAB SWITCHING LOGIC
   =================================================== */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* ===================================================
   TAB 1: REGULATIONS LOOKUP
   =================================================== */
function renderRegulations(list) {
  const container = document.getElementById('regulationsList');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
        <i class="fa-solid fa-file-circle-question" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 0.75rem;"></i>
        <h4 style="color: var(--text-primary); margin-bottom: 0.25rem;">Không tìm thấy quy định nào</h4>
        <p style="font-size: 0.875rem; color: var(--text-secondary);">Vui lòng thử tìm kiếm với từ khóa khác (ví dụ: thi lại, học bổng, tín chỉ...)</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(reg => `
    <article class="regulation-card">
      <div class="reg-header">
        <span class="reg-code-badge">${reg.code}</span>
        <span class="badge ${reg.important ? 'badge-danger' : 'badge-primary'}">
          ${reg.important ? '<i class="fa-solid fa-triangle-exclamation"></i> Quan trọng' : reg.categoryName}
        </span>
      </div>
      <h3 class="reg-title">${reg.title}</h3>
      <p class="reg-excerpt">${reg.excerpt}</p>
      <div class="reg-footer">
        <div class="reg-tags">
          ${reg.tags.map(t => `<span class="reg-tag-item">#${t}</span>`).join('')}
        </div>
        <button class="btn btn-sm btn-outline" onclick="openRegulationModal('${reg.id}')">
          <i class="fa-solid fa-book-open"></i> Xem chi tiết & Tóm tắt AI
        </button>
      </div>
    </article>
  `).join('');
}

function initRegulationFilters() {
  const searchInput = document.getElementById('regSearchInput');
  const clearBtn = document.getElementById('regSearchClear');
  const categorySelect = document.getElementById('regCategorySelect');

  const filterAction = () => {
    const query = searchInput.value.toLowerCase().trim();
    const category = categorySelect.value;

    if (query) {
      clearBtn.classList.add('visible');
    } else {
      clearBtn.classList.remove('visible');
    }

    const filtered = allRegulations.filter(item => {
      const matchCat = category === 'all' || item.category === category;
      const matchQuery = !query || 
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });

    renderRegulations(filtered);
  };

  searchInput.addEventListener('input', filterAction);
  categorySelect.addEventListener('change', filterAction);
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    filterAction();
    searchInput.focus();
  });
}

function openRegulationModal(regId) {
  const reg = allRegulations.find(r => r.id === regId);
  if (!reg) return;

  const modal = document.getElementById('regulationModal');
  const modalTitle = document.getElementById('modalRegTitle');
  const modalBody = document.getElementById('modalRegBody');

  modalTitle.textContent = reg.title;
  modalBody.innerHTML = `
    <div style="margin-bottom: 1rem; display: flex; gap: 0.5rem; align-items: center;">
      <span class="badge badge-accent">${reg.code}</span>
      <span class="badge badge-primary">${reg.categoryName}</span>
    </div>
    <div style="white-space: pre-line; line-height: 1.8; margin-bottom: 1.5rem;">
      ${reg.content}
    </div>
    <div id="aiSummaryBox" style="display: none; background: linear-gradient(135deg, rgba(11,59,96,0.08), rgba(255,107,0,0.1)); border: 1px solid var(--accent); border-radius: var(--radius-md); padding: 1.25rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--accent); font-weight: 700; margin-bottom: 0.5rem;">
        <i class="fa-solid fa-wand-magic-sparkles"></i> LHU AI Tóm tắt nhanh:
      </div>
      <p style="font-size: 0.9rem; color: var(--text-primary); line-height: 1.6;">
        💡 <strong>Điểm cốt lõi:</strong> ${reg.excerpt}
      </p>
    </div>
  `;

  // Reset AI summary state
  const aiSummaryBtn = document.getElementById('aiSummarizeBtn');
  if (aiSummaryBtn) {
    aiSummaryBtn.onclick = () => {
      const summaryBox = document.getElementById('aiSummaryBox');
      if (summaryBox) {
        summaryBox.style.display = 'block';
        summaryBox.scrollIntoView({ behavior: 'smooth' });
        LHUCampus.toast('AI Tóm tắt', 'Đã trích xuất thông tin cốt lõi thành công!', 'info');
      }
    };
  }

  modal.classList.add('active');
}

function closeRegulationModal() {
  const modal = document.getElementById('regulationModal');
  if (modal) modal.classList.remove('active');
}

/* ===================================================
   TAB 2: COURSES & LIVE TUITION CALCULATOR
   =================================================== */
function renderCourses(list) {
  const container = document.getElementById('coursesList');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Không tìm thấy học phần phù hợp.</div>`;
    return;
  }

  container.innerHTML = list.map(course => {
    const isSelected = selectedCourses.has(course.id);
    const totalCourseFee = course.credits * course.pricePerCredit;

    return `
      <div class="course-item-card ${isSelected ? 'selected' : ''}" id="course-card-${course.id}">
        <div class="course-info">
          <div class="course-code-title">
            <span class="course-code">${course.code}</span>
            <h4 class="course-name">${course.name}</h4>
            <span class="badge ${course.type === 'Bắt buộc' ? 'badge-primary' : 'badge-accent'}">${course.type}</span>
          </div>
          <div class="course-details">
            <span class="course-detail-item"><i class="fa-solid fa-award"></i> ${course.credits} Tín chỉ</span>
            <span class="course-detail-item"><i class="fa-solid fa-clock"></i> ${course.schedule}</span>
            <span class="course-detail-item"><i class="fa-solid fa-chalkboard-user"></i> ${course.lecturer}</span>
            <span class="course-detail-item"><i class="fa-solid fa-users"></i> Đã ĐK: ${course.slots}</span>
          </div>
        </div>
        <div class="course-action">
          <div class="course-fee">${totalCourseFee.toLocaleString('vi-VN')} đ</div>
          <button class="btn btn-sm ${isSelected ? 'btn-danger' : 'btn-primary'}" onclick="toggleSelectCourse('${course.id}')">
            <i class="fa-solid ${isSelected ? 'fa-minus' : 'fa-plus'}"></i> ${isSelected ? 'Hủy chọn' : 'Chọn môn'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function initCourseFilters() {
  const searchInput = document.getElementById('courseSearchInput');
  const facultySelect = document.getElementById('courseFacultySelect');
  const typeSelect = document.getElementById('courseTypeSelect');

  const filterCourses = () => {
    const query = searchInput.value.toLowerCase().trim();
    const faculty = facultySelect.value;
    const type = typeSelect.value;

    const filtered = allCourses.filter(c => {
      const matchQuery = !query || c.name.toLowerCase().includes(query) || c.code.toLowerCase().includes(query);
      const matchFaculty = faculty === 'all' || c.faculty === faculty;
      const matchType = type === 'all' || c.type === type;
      return matchQuery && matchFaculty && matchType;
    });

    renderCourses(filtered);
  };

  searchInput.addEventListener('input', filterCourses);
  facultySelect.addEventListener('change', filterCourses);
  typeSelect.addEventListener('change', filterCourses);
}

function toggleSelectCourse(courseId) {
  const course = allCourses.find(c => c.id === courseId);
  if (!course) return;

  if (selectedCourses.has(courseId)) {
    selectedCourses.delete(courseId);
    LHUCampus.toast('Đã bỏ chọn', `Đã xóa môn "${course.name}" khỏi danh sách đăng ký.`, 'info');
  } else {
    // Check total credit limit
    let currentCredits = 0;
    selectedCourses.forEach(id => {
      const c = allCourses.find(x => x.id === id);
      if (c) currentCredits += c.credits;
    });

    if (currentCredits + course.credits > 24) {
      LHUCampus.toast('Cảnh báo tín chỉ', 'Bạn không thể đăng ký vượt quá tối đa 24 tín chỉ/học kỳ theo quy định LHU!', 'warning');
      return;
    }

    selectedCourses.add(courseId);
    LHUCampus.toast('Đã thêm môn', `Đã thêm môn "${course.name}" (${course.credits} TC) vào danh sách.`, 'success');
  }

  // Re-render course cards & update sidebar
  renderCourses(allCourses);
  updateRegistrationCart();
}

function updateRegistrationCart() {
  const listContainer = document.getElementById('selectedCoursesList');
  const totalCreditsElem = document.getElementById('cartTotalCredits');
  const totalFeeElem = document.getElementById('cartTotalFee');
  const statusBadge = document.getElementById('cartCreditStatus');
  const submitBtn = document.getElementById('submitRegistrationBtn');

  if (!listContainer || !totalCreditsElem || !totalFeeElem) return;

  let totalCredits = 0;
  let totalFee = 0;
  const items = [];

  selectedCourses.forEach(id => {
    const c = allCourses.find(item => item.id === id);
    if (c) {
      totalCredits += c.credits;
      totalFee += (c.credits * c.pricePerCredit);
      items.push(c);
    }
  });

  totalCreditsElem.textContent = `${totalCredits} TC`;
  totalFeeElem.textContent = `${totalFee.toLocaleString('vi-VN')} đ`;

  // Status check (Min 14, Max 24)
  if (totalCredits === 0) {
    statusBadge.className = 'badge badge-warning';
    statusBadge.innerHTML = 'Chưa chọn môn nào';
    if (submitBtn) submitBtn.disabled = true;
  } else if (totalCredits < 14) {
    statusBadge.className = 'badge badge-warning';
    statusBadge.innerHTML = `Thiếu ${14 - totalCredits} TC để đạt tối thiểu 14 TC`;
    if (submitBtn) submitBtn.disabled = false;
  } else if (totalCredits <= 24) {
    statusBadge.className = 'badge badge-success';
    statusBadge.innerHTML = 'Khối lượng học tập hợp lệ (14 - 24 TC)';
    if (submitBtn) submitBtn.disabled = false;
  } else {
    statusBadge.className = 'badge badge-danger';
    statusBadge.innerHTML = 'Vượt quá 24 TC cho phép';
    if (submitBtn) submitBtn.disabled = true;
  }

  // Render list of selected items
  if (items.length === 0) {
    listContainer.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 1rem;">Chưa có học phần nào được chọn</div>`;
  } else {
    listContainer.innerHTML = items.map(c => `
      <div class="selected-item-row">
        <div>
          <div class="selected-item-name">${c.name}</div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${c.credits} TC • ${(c.credits * c.pricePerCredit).toLocaleString('vi-VN')}đ</span>
        </div>
        <i class="fa-solid fa-trash-can remove-course-btn" title="Xóa môn" onclick="toggleSelectCourse('${c.id}')"></i>
      </div>
    `).join('');
  }
}

function confirmRegistration() {
  if (selectedCourses.size === 0) return;

  let totalCredits = 0;
  selectedCourses.forEach(id => {
    const c = allCourses.find(item => item.id === id);
    if (c) totalCredits += c.credits;
  });

  LHUCampus.toast(
    'Đăng ký thành công!',
    `Đã xác nhận đăng ký ${selectedCourses.size} học phần (${totalCredits} tín chỉ) cho học kỳ mới.`,
    'success',
    5000
  );
}

/* ===================================================
   TAB 3: GPA CALCULATOR & SIMULATION
   =================================================== */
const GRADE_POINTS = {
  'A': { gpa4: 4.0, gpa10: 9.0, label: 'Xuất sắc' },
  'B+': { gpa4: 3.5, gpa10: 8.2, label: 'Giỏi' },
  'B': { gpa4: 3.0, gpa10: 7.5, label: 'Khá' },
  'C+': { gpa4: 2.5, gpa10: 6.7, label: 'TB Khá' },
  'C': { gpa4: 2.0, gpa10: 6.0, label: 'Trung bình' },
  'D+': { gpa4: 1.5, gpa10: 5.2, label: 'TB Yếu' },
  'D': { gpa4: 1.0, gpa10: 4.5, label: 'Yếu' },
  'F': { gpa4: 0.0, gpa10: 2.0, label: 'Kém (Học lại)' }
};

let calculatorSubjects = [
  { id: 1, name: 'Lập trình Web Nâng Cao & Cloud', credits: 3, grade: 'A' },
  { id: 2, name: 'Trí tuệ Nhân tạo & Deep Learning', credits: 4, grade: 'A' },
  { id: 3, name: 'Kiến trúc & Thiết kế Phần mềm', credits: 3, grade: 'B+' },
  { id: 4, name: 'Khởi nghiệp Đổi mới Sáng tạo', credits: 2, grade: 'B+' },
  { id: 5, name: 'Tiếng Anh Giao tiếp Chuyên nghiệp', credits: 3, grade: 'A' }
];

function initGPACalculator() {
  renderGPATable();
  calculateGPA();

  const addRowBtn = document.getElementById('addSubjectRowBtn');
  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => {
      const newId = Date.now();
      calculatorSubjects.push({
        id: newId,
        name: `Học phần mới ${calculatorSubjects.length + 1}`,
        credits: 3,
        grade: 'B'
      });
      renderGPATable();
      calculateGPA();
    });
  }
}

function renderGPATable() {
  const tbody = document.getElementById('gpaTableBody');
  if (!tbody) return;

  tbody.innerHTML = calculatorSubjects.map((sub, index) => `
    <tr id="gpa-row-${sub.id}">
      <td style="text-align: center; color: var(--text-muted);">${index + 1}</td>
      <td>
        <input type="text" class="table-input" value="${sub.name}" onchange="updateSubjectName(${sub.id}, this.value)">
      </td>
      <td style="width: 120px;">
        <select class="table-select" onchange="updateSubjectCredits(${sub.id}, this.value)">
          <option value="1" ${sub.credits === 1 ? 'selected' : ''}>1 TC</option>
          <option value="2" ${sub.credits === 2 ? 'selected' : ''}>2 TC</option>
          <option value="3" ${sub.credits === 3 ? 'selected' : ''}>3 TC</option>
          <option value="4" ${sub.credits === 4 ? 'selected' : ''}>4 TC</option>
          <option value="5" ${sub.credits === 5 ? 'selected' : ''}>5 TC</option>
        </select>
      </td>
      <td style="width: 130px;">
        <select class="table-select" onchange="updateSubjectGrade(${sub.id}, this.value)">
          <option value="A" ${sub.grade === 'A' ? 'selected' : ''}>Điểm A (4.0)</option>
          <option value="B+" ${sub.grade === 'B+' ? 'selected' : ''}>Điểm B+ (3.5)</option>
          <option value="B" ${sub.grade === 'B' ? 'selected' : ''}>Điểm B (3.0)</option>
          <option value="C+" ${sub.grade === 'C+' ? 'selected' : ''}>Điểm C+ (2.5)</option>
          <option value="C" ${sub.grade === 'C' ? 'selected' : ''}>Điểm C (2.0)</option>
          <option value="D+" ${sub.grade === 'D+' ? 'selected' : ''}>Điểm D+ (1.5)</option>
          <option value="D" ${sub.grade === 'D' ? 'selected' : ''}>Điểm D (1.0)</option>
          <option value="F" ${sub.grade === 'F' ? 'selected' : ''}>Điểm F (0.0)</option>
        </select>
      </td>
      <td style="text-align: center; width: 60px;">
        <i class="fa-solid fa-trash-can table-delete-btn" title="Xóa môn" onclick="deleteSubject(${sub.id})"></i>
      </td>
    </tr>
  `).join('');
}

function updateSubjectName(id, val) {
  const sub = calculatorSubjects.find(s => s.id === id);
  if (sub) sub.name = val;
}

function updateSubjectCredits(id, val) {
  const sub = calculatorSubjects.find(s => s.id === id);
  if (sub) {
    sub.credits = parseInt(val, 10);
    calculateGPA();
  }
}

function updateSubjectGrade(id, val) {
  const sub = calculatorSubjects.find(s => s.id === id);
  if (sub) {
    sub.grade = val;
    calculateGPA();
  }
}

function deleteSubject(id) {
  if (calculatorSubjects.length <= 1) {
    LHUCampus.toast('Không thể xóa', 'Cần giữ ít nhất 1 môn học để tính điểm.', 'warning');
    return;
  }
  calculatorSubjects = calculatorSubjects.filter(s => s.id !== id);
  renderGPATable();
  calculateGPA();
}

function calculateGPA() {
  let totalCredits = 0;
  let totalPoints4 = 0;
  let totalPoints10 = 0;
  let hasF = false;

  calculatorSubjects.forEach(sub => {
    const cred = sub.credits;
    const gradeInfo = GRADE_POINTS[sub.grade] || GRADE_POINTS['C'];

    totalCredits += cred;
    totalPoints4 += (gradeInfo.gpa4 * cred);
    totalPoints10 += (gradeInfo.gpa10 * cred);

    if (sub.grade === 'F') hasF = true;
  });

  const finalGpa4 = totalCredits > 0 ? (totalPoints4 / totalCredits) : 0;
  const finalGpa10 = totalCredits > 0 ? (totalPoints10 / totalCredits) : 0;

  // Xếp loại học lực
  let rank = 'Yếu';
  let badgeClass = 'badge-danger';
  let advice = '';

  if (finalGpa4 >= 3.60) {
    rank = 'Xuất sắc';
    badgeClass = 'badge-success';
    advice = '🎉 Tuyệt vời! Bạn đang nằm trong nhóm sinh viên Xuất sắc nhất LHU, đủ điều kiện nhận Học bổng Tài năng 100% học phí!';
  } else if (finalGpa4 >= 3.20) {
    rank = 'Giỏi';
    badgeClass = 'badge-primary';
    const creditsNeeded = Math.ceil((3.60 * totalCredits - totalPoints4) / (4.0 - 3.60));
    advice = `🌟 Rất tốt! Bạn đạt danh hiệu Sinh viên Giỏi. Chỉ cần đạt thêm khoảng ${Math.max(1, creditsNeeded)} tín chỉ điểm A ở kỳ sau để nâng bằng lên hạng Xuất sắc!`;
  } else if (finalGpa4 >= 2.50) {
    rank = 'Khá';
    badgeClass = 'badge-info';
    advice = '👍 Kết quả học lực Khá vững vàng. Hãy tập trung cải thiện các môn chuyên ngành 3-4 tín chỉ để bứt phá lên GPA Giỏi (>= 3.20).';
  } else if (finalGpa4 >= 2.00) {
    rank = 'Trung bình';
    badgeClass = 'badge-warning';
    advice = '⚠️ Bạn cần cẩn trọng để không bị rơi vào mức cảnh báo học vụ. Hãy tham khảo lịch hỗ trợ học tập của Cố vấn học tập khoa CNTT LHU nhé!';
  } else {
    rank = 'Yếu / Cảnh báo';
    badgeClass = 'badge-danger';
    advice = '🚨 Cảnh báo học vụ: GPA dưới 2.0! Bạn nên đăng ký học cải thiện ngay các môn điểm D và F để bảo toàn tiến độ đào tạo.';
  }

  // Update DOM elements
  const gpa4Elem = document.getElementById('calcGpa4');
  const gpa10Elem = document.getElementById('calcGpa10');
  const totalCreditsElem = document.getElementById('calcTotalCredits');
  const rankBadgeElem = document.getElementById('calcRankBadge');
  const adviceElem = document.getElementById('calcAiAdviceText');

  if (gpa4Elem) gpa4Elem.textContent = finalGpa4.toFixed(2);
  if (gpa10Elem) gpa10Elem.textContent = finalGpa10.toFixed(2);
  if (totalCreditsElem) totalCreditsElem.textContent = `${totalCredits} TC`;
  if (rankBadgeElem) {
    rankBadgeElem.textContent = `Xếp loại: ${rank}`;
    rankBadgeElem.className = `badge ${badgeClass} gpa-rank-badge`;
  }
  if (adviceElem) adviceElem.textContent = advice;
}
