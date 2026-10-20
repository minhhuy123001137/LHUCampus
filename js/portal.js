/* ===================================================
   LHU CAMPUS - STUDENT PORTAL SUBSYSTEMS JAVASCRIPT
   Engine for 5 Core Academic Management Subsystems:
   1. The Learning Path
   2. Smart Enrollment (data-* & <=25 credits cart)
   3. Attendance Tracker (Timetable & 20% Absence Alert)
   4. Project Milestone (Timeline, URL Regex & Countdown)
   5. Financial Hub (Tuition Table, Scholarship Cards & Live Formula)
   =================================================== */

// Global state for Portal
let portalData = null;
let selectedEnrollmentCourses = new Map(); // id -> course
let currentWeek = 8;
let currentAttendanceSessions = [];

document.addEventListener('DOMContentLoaded', async () => {
  // Load portal data
  try {
    const res = await fetch('data/campus-data.json');
    if (res.ok) {
      portalData = await res.json();
    }
  } catch (e) {
    console.warn('Fetch offline, using fallback');
  }

  if (!portalData && window.CAMPUS_MOCK_DATA) {
    portalData = window.CAMPUS_MOCK_DATA;
  }

  if (!portalData) return;

  // Initialize Subsystems
  initLearningPath(portalData.learningPath, portalData.studentSummary);
  initSmartEnrollment(portalData.courses);
  initAttendanceTracker(portalData.attendanceData);
  initProjectMilestones(portalData.projectMilestones);
  initFinancialHub(portalData.financialData);
});

/* ===================================================
   2.1.1. DASHBOARD CÁ NHÂN & LỘ TRÌNH HỌC TẬP
   =================================================== */
function initLearningPath(pathData, student) {
  if (!pathData) return;

  // 1. Render Pure CSS Bar Chart for Semester GPAs
  const chartElem = document.getElementById('cssBarChartContainer');
  if (chartElem && pathData.semesters) {
    chartElem.innerHTML = pathData.semesters.map(s => {
      // Calculate height percentage relative to 4.0
      const heightPercent = Math.min(100, (s.gpa4 / 4.0) * 100);
      
      // Determine color class based on GPA
      let colorClass = 'bar-gpa-gold';
      if (s.gpa4 < 2.0) colorClass = 'bar-gpa-danger';
      else if (s.gpa4 < 2.5) colorClass = 'bar-gpa-warning';
      else if (s.gpa4 < 3.2) colorClass = 'bar-gpa-blue';
      else if (s.gpa4 < 3.6) colorClass = 'bar-gpa-blue';

      return `
        <div class="bar-col-wrapper">
          <div class="bar-col ${colorClass}" style="height: ${heightPercent}%;">
            <div class="bar-tooltip">
              ${s.semester}: ${s.gpa4.toFixed(2)} (${s.rank})
            </div>
          </div>
          <span class="bar-label">${s.semester}</span>
        </div>
      `;
    }).join('');
  }

  // 2. Render Pure CSS Progress Bars for Curriculum Completion
  if (pathData.curriculum) {
    const cur = pathData.curriculum;
    const overallFill = document.getElementById('curriculumOverallFill');
    const overallPercent = document.getElementById('curriculumOverallPercent');
    if (overallFill) overallFill.style.width = `${cur.percentComplete}%`;
    if (overallPercent) overallPercent.textContent = `${cur.percentComplete}%`;

    // General, Fundamental, Specialized
    const genPct = (cur.generalCredits.completed / cur.generalCredits.total) * 100;
    const funPct = (cur.fundamentalCredits.completed / cur.fundamentalCredits.total) * 100;
    const specPct = (cur.specializedCredits.completed / cur.specializedCredits.total) * 100;

    setElemWidthAndText('genProgressFill', genPct, 'genProgressText', `${cur.generalCredits.completed}/${cur.generalCredits.total} TC (${genPct.toFixed(0)}%)`);
    setElemWidthAndText('funProgressFill', funPct, 'funProgressText', `${cur.fundamentalCredits.completed}/${cur.fundamentalCredits.total} TC (${funPct.toFixed(0)}%)`);
    setElemWidthAndText('specProgressFill', specPct, 'specProgressText', `${cur.specializedCredits.completed}/${cur.specializedCredits.total} TC (${specPct.toFixed(0)}%)`);
  }

  // 3. Process Array of Grade Data to compute GPA & Dynamic Status Colors
  if (pathData.historicalGrades) {
    let totalCredits = 0;
    let totalScore = 0;

    pathData.historicalGrades.forEach(g => {
      totalCredits += g.credits;
      totalScore += (g.grade4 * g.credits);
    });

    const calculatedGPA = totalCredits > 0 ? (totalScore / totalCredits) : 0;
    const gpaElem = document.getElementById('learningCalculatedGpa');
    const rankElem = document.getElementById('learningGpaRankBadge');

    if (gpaElem) gpaElem.textContent = calculatedGPA.toFixed(2);
    if (rankElem) {
      if (calculatedGPA >= 3.60) {
        rankElem.className = 'gpa-status-badge status-success';
        rankElem.innerHTML = `<i class="fa-solid fa-medal"></i> Xếp loại: Xuất sắc (GPA >= 3.6)`;
      } else if (calculatedGPA >= 3.20) {
        rankElem.className = 'gpa-status-badge status-success';
        rankElem.innerHTML = `<i class="fa-solid fa-award"></i> Xếp loại: Giỏi (GPA >= 3.2)`;
      } else if (calculatedGPA >= 2.50) {
        rankElem.className = 'gpa-status-badge';
        rankElem.style.background = 'var(--primary-soft)';
        rankElem.style.color = 'var(--primary)';
        rankElem.innerHTML = `<i class="fa-solid fa-circle-check"></i> Xếp loại: Khá (GPA >= 2.5)`;
      } else if (calculatedGPA >= 2.00) {
        rankElem.className = 'gpa-status-badge';
        rankElem.style.background = 'var(--warning-soft)';
        rankElem.style.color = 'var(--warning)';
        rankElem.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Xếp loại: Trung bình`;
      } else {
        // Red alert if GPA < 2.0
        rankElem.className = 'gpa-status-badge status-danger';
        rankElem.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> CẢNH BÁO HỌC VỤ: GPA < 2.0!`;
      }
    }
  }
}

function setElemWidthAndText(fillId, pct, textId, text) {
  const fill = document.getElementById(fillId);
  const txt = document.getElementById(textId);
  if (fill) fill.style.width = `${pct}%`;
  if (txt) txt.textContent = text;
}

/* ===================================================
   2.1.2. CỔNG ĐĂNG KÝ MÔN HỌC THÔNG MINH (DATA-* & <= 25 TC)
   =================================================== */
function initSmartEnrollment(courses) {
  const container = document.getElementById('smartCoursesContainer');
  if (!container || !courses) return;

  // Render course cards with HTML5 data-* attributes
  renderSmartCourses(courses);

  // Search & Filter event listeners
  const searchInput = document.getElementById('enrollSearchInput');
  const facultySelect = document.getElementById('enrollFacultySelect');

  const filterCourses = () => {
    const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const fac = facultySelect ? facultySelect.value : 'all';

    const cards = container.querySelectorAll('.course-card-smart');
    cards.forEach(card => {
      const cName = (card.getAttribute('data-name') || '').toLowerCase();
      const cCode = (card.getAttribute('data-code') || '').toLowerCase();
      const cFaculty = card.getAttribute('data-faculty') || '';

      const matchQ = !q || cName.includes(q) || cCode.includes(q);
      const matchF = fac === 'all' || cFaculty === fac;

      if (matchQ && matchF) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  if (searchInput) searchInput.addEventListener('input', filterCourses);
  if (facultySelect) facultySelect.addEventListener('change', filterCourses);
}

function renderSmartCourses(courses) {
  const container = document.getElementById('smartCoursesContainer');
  if (!container) return;

  container.innerHTML = courses.map(c => {
    const isSelected = selectedEnrollmentCourses.has(c.id);
    const totalPrice = c.credits * c.pricePerCredit;

    return `
      <article class="course-card-smart ${isSelected ? 'is-selected' : ''}"
        data-id="${c.id}"
        data-code="${c.code}"
        data-name="${c.name}"
        data-credits="${c.credits}"
        data-price="${totalPrice}"
        data-faculty="${c.faculty}"
        data-prerequisite="${c.prerequisite || 'Không'}"
      >
        <div class="course-card-top">
          <div>
            <span class="badge badge-primary" style="font-family: monospace;">${c.code}</span>
            <h4 style="font-size: 1rem; font-weight: 700; margin-top: 0.25rem; color: var(--text-primary);">${c.name}</h4>
          </div>
          <span class="badge badge-accent">${c.credits} Tín chỉ</span>
        </div>

        <div class="course-card-tags">
          <span style="font-size: 0.775rem; color: var(--text-secondary);"><i class="fa-solid fa-chalkboard-user"></i> ${c.lecturer}</span>
          <span style="font-size: 0.775rem; color: var(--text-secondary);"><i class="fa-solid fa-clock"></i> ${c.schedule}</span>
          <span style="font-size: 0.775rem; color: var(--text-secondary);"><i class="fa-solid fa-link"></i> Tiên quyết: <strong>${c.prerequisite || 'Không có'}</strong></span>
        </div>

        <div class="course-card-footer">
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Đơn giá tín chỉ</div>
            <strong style="color: var(--primary); font-size: 0.95rem;">${totalPrice.toLocaleString('vi-VN')} đ</strong>
          </div>
          <button class="btn btn-sm ${isSelected ? 'btn-danger' : 'btn-primary'}" onclick="handleEnrollToggle('${c.id}')">
            <i class="fa-solid ${isSelected ? 'fa-minus' : 'fa-plus'}"></i> ${isSelected ? 'Hủy môn' : 'Thêm môn'}
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function handleEnrollToggle(courseId) {
  const card = document.querySelector(`.course-card-smart[data-id="${courseId}"]`);
  if (!card) return;

  const code = card.getAttribute('data-code');
  const name = card.getAttribute('data-name');
  const credits = parseInt(card.getAttribute('data-credits'), 10);
  const price = parseInt(card.getAttribute('data-price'), 10);

  if (selectedEnrollmentCourses.has(courseId)) {
    // Remove from cart
    selectedEnrollmentCourses.delete(courseId);
    card.classList.remove('is-selected');
    card.querySelector('button').className = 'btn btn-sm btn-primary';
    card.querySelector('button').innerHTML = '<i class="fa-solid fa-plus"></i> Thêm môn';
    LHUCampus.toast('Đã bỏ chọn', `Đã xóa học phần "${name}" khỏi giỏ đăng ký.`, 'info');
  } else {
    // Calculate current total credits
    let currentTotalCredits = 0;
    selectedEnrollmentCourses.forEach(c => { currentTotalCredits += c.credits; });

    // STRICT CHECK: PREVENT IF TOTAL CREDITS EXCEED 25!
    if (currentTotalCredits + credits > 25) {
      // Alert user and STOP
      LHUCampus.toast(
        'CẢNH BÁO TÍN CHỈ!',
        `Không thể đăng ký thêm! Tổng số tín chỉ sẽ là ${currentTotalCredits + credits} TC, vượt quá giới hạn tối đa 25 tín chỉ theo Quy chế Đào tạo LHU.`,
        'danger',
        6000
      );

      const alertBanner = document.getElementById('enrollmentAlertBanner');
      if (alertBanner) {
        alertBanner.className = 'enrollment-alert-banner alert-exceeded';
        alertBanner.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="font-size: 1.25rem;"></i> <div><strong>NGĂN CHẶN ĐĂNG KÝ:</strong> Bạn đã chọn ${currentTotalCredits} TC. Môn "${name}" (${credits} TC) sẽ làm vượt quá hạn mức tối đa 25 TC!</div>`;
      }
      return;
    }

    // Add to cart
    selectedEnrollmentCourses.set(courseId, { id: courseId, code, name, credits, price });
    card.classList.add('is-selected');
    card.querySelector('button').className = 'btn btn-sm btn-danger';
    card.querySelector('button').innerHTML = '<i class="fa-solid fa-minus"></i> Hủy môn';
    LHUCampus.toast('Đã thêm môn học', `Đã thêm "${name}" (${credits} TC) vào danh sách.`, 'success');
  }

  // Update Cart Table & Totals
  updateEnrollmentCartView();
}

function updateEnrollmentCartView() {
  const tbody = document.getElementById('enrollCartTbody');
  const totalCreditsElem = document.getElementById('enrollCartTotalCredits');
  const totalPriceElem = document.getElementById('enrollCartTotalPrice');
  const alertBanner = document.getElementById('enrollmentAlertBanner');

  let totalCredits = 0;
  let totalPrice = 0;
  const items = Array.from(selectedEnrollmentCourses.values());

  items.forEach(item => {
    totalCredits += item.credits;
    totalPrice += item.price;
  });

  if (totalCreditsElem) totalCreditsElem.textContent = `${totalCredits} / 25 TC`;
  if (totalPriceElem) totalPriceElem.textContent = `${totalPrice.toLocaleString('vi-VN')} đ`;

  // Update Alert Banner
  if (alertBanner) {
    if (totalCredits === 0) {
      alertBanner.className = 'enrollment-alert-banner';
      alertBanner.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>Khối lượng đăng ký hợp lệ: <strong>14 đến 25 tín chỉ</strong> trong học kỳ chính.</span>`;
    } else if (totalCredits < 14) {
      alertBanner.className = 'enrollment-alert-banner';
      alertBanner.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>Bạn đang chọn <strong>${totalCredits} TC</strong>. Cần đăng ký thêm ít nhất <strong>${14 - totalCredits} TC</strong> để đạt mức tối thiểu 14 TC.</span>`;
    } else if (totalCredits <= 25) {
      alertBanner.className = 'enrollment-alert-banner';
      alertBanner.style.borderColor = 'var(--success)';
      alertBanner.style.background = 'var(--success-soft)';
      alertBanner.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--success);"></i> <span>Khối lượng học tập hợp lệ: <strong>${totalCredits} tín chỉ</strong> (Tối đa cho phép: 25 TC).</span>`;
    }
  }

  // Render Table Rows
  if (tbody) {
    if (items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Chưa có môn học nào trong giỏ đăng ký</td></tr>`;
    } else {
      tbody.innerHTML = items.map((c, i) => `
        <tr>
          <td style="text-align: center;">${i + 1}</td>
          <td><strong>${c.code}</strong> - ${c.name}</td>
          <td style="text-align: center;"><span class="badge badge-primary">${c.credits} TC</span></td>
          <td style="text-align: right;">${c.price.toLocaleString('vi-VN')} đ</td>
          <td style="text-align: center;">
            <i class="fa-solid fa-trash-can" style="color: var(--danger); cursor: pointer;" onclick="handleEnrollToggle('${c.id}')" title="Xóa môn"></i>
          </td>
        </tr>
      `).join('');
    }
  }
}

function confirmSmartRegistration() {
  const items = Array.from(selectedEnrollmentCourses.values());
  if (items.length === 0) {
    LHUCampus.toast('Giỏ môn học trống', 'Vui lòng chọn ít nhất 1 học phần để đăng ký.', 'warning');
    return;
  }

  let totalCredits = 0;
  items.forEach(i => { totalCredits += i.credits; });

  if (totalCredits < 14) {
    LHUCampus.toast('Cảnh báo tải học vụ', `Bạn đã đăng ký ${totalCredits} tín chỉ. Theo quy chế, số tín chỉ tối thiểu là 14 TC.`, 'warning');
  }

  LHUCampus.toast(
    'Đăng ký môn học thành công!',
    `Đã xác nhận đăng ký thành công ${items.length} môn học (${totalCredits} tín chỉ) vào hệ thống Đào tạo LHU!`,
    'success',
    5000
  );
}

/* ===================================================
   2.1.3. QUẢN LÝ THỜI KHÓA BIỂU & CHUYÊN CẦN
   =================================================== */
function initAttendanceTracker(attData) {
  if (!attData) return;

  currentAttendanceSessions = attData.timetable || [];
  renderTimetableGrid();
  updateAttendanceStats(attData);

  // Week switcher buttons
  const prevBtn = document.getElementById('prevWeekBtn');
  const nextBtn = document.getElementById('nextWeekBtn');
  const weekLabel = document.getElementById('currentWeekDisplay');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentWeek > 1) {
        currentWeek--;
        animateWeekSwitch(weekLabel);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentWeek < 15) {
        currentWeek++;
        animateWeekSwitch(weekLabel);
      }
    });
  }
}

function animateWeekSwitch(labelElem) {
  const timetableWrapper = document.querySelector('.timetable-wrapper');
  if (timetableWrapper) timetableWrapper.classList.add('switching');

  setTimeout(() => {
    if (labelElem) labelElem.textContent = `Tuần ${currentWeek} (Học kỳ 1)`;
    renderTimetableGrid();
    if (timetableWrapper) timetableWrapper.classList.remove('switching');
  }, 200);
}

function renderTimetableGrid() {
  const container = document.getElementById('timetableGridContainer');
  if (!container || !currentAttendanceSessions) return;

  container.innerHTML = currentAttendanceSessions.map((dayData, dIndex) => `
    <div class="day-column">
      <div class="day-column-header">
        <div class="day-title">${dayData.day}</div>
        <div class="day-subdate">${dayData.date}</div>
      </div>

      ${dayData.sessions.map((sess, sIndex) => {
        let statusClass = 'status-present';
        let icon = 'fa-solid fa-check';
        if (sess.status === 'absent') {
          statusClass = 'status-absent';
          icon = 'fa-solid fa-xmark';
        } else if (sess.status === 'excused') {
          statusClass = 'status-excused';
          icon = 'fa-solid fa-info';
        }

        return `
          <div class="session-box" onclick="toggleSessionAttendance(${dIndex}, ${sIndex})" title="Bấm để chuyển trạng thái điểm danh">
            <span class="session-period">${sess.period}</span>
            <div class="session-name">${sess.subject}</div>
            <div class="session-location"><i class="fa-solid fa-location-dot"></i> ${sess.room}</div>
            <span class="attendance-toggle-pill ${statusClass}">
              <i class="${icon}"></i> ${sess.badge}
            </span>
          </div>
        `;
      }).join('')}
    </div>
  `).join('');
}

function toggleSessionAttendance(dayIndex, sessIndex) {
  const sess = currentAttendanceSessions[dayIndex].sessions[sessIndex];
  if (!sess) return;

  // Cycle: present -> absent -> excused -> present
  if (sess.status === 'present') {
    sess.status = 'absent';
    sess.badge = 'Vắng mặt';
  } else if (sess.status === 'absent') {
    sess.status = 'excused';
    sess.badge = 'Có phép';
  } else {
    sess.status = 'present';
    sess.badge = 'Có mặt';
  }

  renderTimetableGrid();
  recalculateAttendanceRate();
}

function recalculateAttendanceRate() {
  let total = 0;
  let presentCount = 0;
  let absentCount = 0;

  currentAttendanceSessions.forEach(d => {
    d.sessions.forEach(s => {
      total++;
      if (s.status === 'present') presentCount++;
      if (s.status === 'absent') absentCount++;
    });
  });

  const rate = total > 0 ? (presentCount / total) * 100 : 100;
  const absenceRate = total > 0 ? (absentCount / total) * 100 : 0;

  const rateElem = document.getElementById('attRateDisplay');
  const alertBanner = document.getElementById('absenceWarningBanner');

  if (rateElem) rateElem.textContent = `${rate.toFixed(1)}%`;

  // CHECK: If absences exceed 20%, show PROMINENT ALERT!
  if (alertBanner) {
    if (absenceRate >= 20) {
      alertBanner.style.display = 'flex';
      LHUCampus.toast(
        'CẢNH BÁO CHUYÊN CẦN!',
        `Bạn đã vắng ${absenceRate.toFixed(1)}% số buổi học (vượt quá mức 20% cho phép). Nguy cơ bị CẤM THI theo Quy chế LHU!`,
        'danger',
        7000
      );
    } else {
      alertBanner.style.display = 'none';
    }
  }
}

function updateAttendanceStats(attData) {
  const subjectsContainer = document.getElementById('attendanceSubjectsSummary');
  if (!subjectsContainer || !attData.subjects) return;

  subjectsContainer.innerHTML = attData.subjects.map(s => {
    const absencePercent = (s.absentSessions / s.totalSessions) * 100;
    const isExceeded = absencePercent >= 20;

    return `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0; border-bottom: 1px solid var(--border-color);">
        <div>
          <div style="font-weight: 700; font-size: 0.875rem;">${s.name} (${s.code})</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Đã học: ${s.conductedSessions}/${s.totalSessions} buổi • Vắng: <strong>${s.absentSessions} buổi</strong></div>
        </div>
        <div>
          <span class="badge ${isExceeded ? 'badge-danger' : 'badge-success'}">
            ${isExceeded ? '⚠️ Vắng >= 20%' : `${(100 - absencePercent).toFixed(0)}% Chuyên cần`}
          </span>
        </div>
      </div>
    `;
  }).join('');
}

/* ===================================================
   2.1.4. QUẢN LÝ ĐỒ ÁN & TIẾN ĐỘ BÁO CÁO (TIMELINE & COUNTDOWN)
   =================================================== */
function initProjectMilestones(projectData) {
  if (!projectData) return;

  renderTimeline(projectData.milestones);
  startCountdown(projectData.finalDefenseDate);

  // Form submission for project links
  const form = document.getElementById('projectSubmitForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const milestoneSelect = document.getElementById('selectMilestone');
      const urlInput = document.getElementById('inputProjectUrl');
      const feedbackElem = document.getElementById('projectUrlFeedback');

      const urlVal = urlInput.value.trim();
      // Regex URL validation
      const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

      if (!urlRegex.test(urlVal)) {
        urlInput.classList.add('is-invalid');
        if (feedbackElem) feedbackElem.textContent = 'Vui lòng nhập đường dẫn URL hợp lệ (ví dụ: https://github.com/...)';
        return;
      }

      urlInput.classList.remove('is-invalid');
      urlInput.classList.add('is-valid');

      // Update milestone
      const msId = milestoneSelect.value;
      const targetMilestone = projectData.milestones.find(m => m.id === msId);
      if (targetMilestone) {
        targetMilestone.status = 'submitted';
        targetMilestone.statusText = 'Đã nộp';
        targetMilestone.submittedUrl = urlVal;
        targetMilestone.submittedAt = 'Hôm nay lúc ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        renderTimeline(projectData.milestones);
      }

      LHUCampus.toast(
        'Nộp bài thành công!',
        `Đã ghi nhận đường dẫn báo cáo cho mốc "${targetMilestone ? targetMilestone.title : ''}".`,
        'success'
      );

      form.reset();
    });
  }
}

function renderTimeline(milestones) {
  const container = document.getElementById('milestoneTimelineContainer');
  if (!container || !milestones) return;

  container.innerHTML = milestones.map(ms => {
    let statusClass = 'is-pending';
    let badgeHtml = '<span class="badge badge-warning">Chưa nộp</span>';

    if (ms.status === 'submitted') {
      statusClass = 'is-done';
      badgeHtml = '<span class="badge badge-success"><i class="fa-solid fa-check"></i> Đã nộp</span>';
    } else if (ms.status === 'overdue') {
      statusClass = 'is-overdue';
      badgeHtml = '<span class="badge badge-danger">Trễ hạn</span>';
    }

    return `
      <article class="timeline-step-item ${statusClass}">
        <div class="step-header">
          <h4 class="step-title">${ms.title}</h4>
          ${badgeHtml}
        </div>
        <div class="step-desc">
          <i class="fa-regular fa-calendar" style="color: var(--accent);"></i> Hạn chót: <strong>${ms.deadline}</strong>
          ${ms.grade ? ` • Điểm đánh giá: <strong style="color: var(--success);">${ms.grade}</strong>` : ''}
        </div>
        ${ms.submittedUrl ? `
          <div class="step-submission-box">
            <span><i class="fa-solid fa-link"></i> Link: <a href="${ms.submittedUrl}" target="_blank" style="color: var(--primary); text-decoration: underline;">${ms.submittedUrl}</a></span>
            <span style="color: var(--text-muted); font-size: 0.75rem;">Nộp lúc: ${ms.submittedAt}</span>
          </div>
        ` : `
          <div style="font-size: 0.8rem; color: var(--text-muted);">
            <i class="fa-solid fa-hourglass-start"></i> Đang mở cổng nộp báo cáo. Hãy chuẩn bị tệp tài liệu trước hạn chót.
          </div>
        `}
      </article>
    `;
  }).join('');
}

function startCountdown(targetDateStr) {
  const daysElem = document.getElementById('countdownDays');
  const hoursElem = document.getElementById('countdownHours');
  const minutesElem = document.getElementById('countdownMinutes');
  const secondsElem = document.getElementById('countdownSeconds');

  if (!daysElem || !targetDateStr) return;

  const targetDate = new Date(targetDateStr).getTime();

  const update = () => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysElem.textContent = '00';
      hoursElem.textContent = '00';
      minutesElem.textContent = '00';
      secondsElem.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysElem.textContent = String(d).padStart(2, '0');
    hoursElem.textContent = String(h).padStart(2, '0');
    minutesElem.textContent = String(m).padStart(2, '0');
    secondsElem.textContent = String(s).padStart(2, '0');
  };

  update();
  setInterval(update, 1000);
}

/* ===================================================
   2.1.5. TRA CỨU HỌC PHÍ & HỌC BỔNG (FINANCIAL HUB)
   =================================================== */
function initFinancialHub(finData) {
  if (!finData) return;

  // Render Invoice Table
  const tbody = document.getElementById('tuitionInvoiceTbody');
  if (tbody && finData.invoicedCourses) {
    tbody.innerHTML = finData.invoicedCourses.map(c => `
      <tr>
        <td style="text-align: center;">
          <input type="checkbox" class="course-fee-checkbox" data-id="${c.id}" data-fee="${c.total}" checked>
        </td>
        <td><strong>${c.code}</strong></td>
        <td>${c.name}</td>
        <td style="text-align: center;"><input type="number" class="table-input" value="${c.credits}" readonly style="width: 60px; text-align: center;"></td>
        <td style="text-align: right;">${c.unitPrice.toLocaleString('vi-VN')} đ</td>
        <td style="text-align: right; font-weight: 700; color: var(--primary);">${c.total.toLocaleString('vi-VN')} đ</td>
      </tr>
    `).join('');
  }

  // Attach change event listener to each checkbox for instant recalculation
  const checkboxes = document.querySelectorAll('.course-fee-checkbox');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      calculateFinancialTotals(finData);
    });
  });

  // Calculate initially
  calculateFinancialTotals(finData);
}

function calculateFinancialTotals(finData) {
  const checkboxes = document.querySelectorAll('.course-fee-checkbox');
  let grossTotal = 0;

  checkboxes.forEach(cb => {
    if (cb.checked) {
      grossTotal += parseInt(cb.getAttribute('data-fee'), 10);
    }
  });

  // Scholarship rate (Default 75% for Giỏi)
  const discountRate = finData && finData.currentScholarship ? (finData.currentScholarship.discountPercent / 100) : 0.75;
  const scholarshipDiscount = Math.round(grossTotal * discountRate);
  const netPayable = Math.max(0, grossTotal - scholarshipDiscount);

  // Update DOM
  const grossElem = document.getElementById('finGrossTotal');
  const discountElem = document.getElementById('finScholarshipDiscount');
  const netElem = document.getElementById('finNetPayable');

  if (grossElem) grossElem.textContent = `${grossTotal.toLocaleString('vi-VN')} đ`;
  if (discountElem) discountElem.textContent = `- ${scholarshipDiscount.toLocaleString('vi-VN')} đ (Giảm ${(discountRate * 100)}%)`;
  if (netElem) netElem.textContent = `${netPayable.toLocaleString('vi-VN')} đ`;
}

function processPaymentSimulation() {
  const netElem = document.getElementById('finNetPayable');
  const amount = netElem ? netElem.textContent : '0 đ';

  LHUCampus.toast(
    'Thanh toán học phí thành công!',
    `Giao dịch thanh toán trực tuyến số tiền ${amount} đã được xác nhận qua cổng VNPay/LHU Banking!`,
    'success',
    5000
  );
}
