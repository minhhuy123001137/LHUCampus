/* ===================================================
   LHU CAMPUS - DASHBOARD & LANDING PAGE LOGIC
   Loads dynamic JSON data, handles filters & interactions
   =================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  let data = null;
  try {
    const res = await fetch('data/campus-data.json');
    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.warn('Fetch local JSON restricted or offline, using CAMPUS_MOCK_DATA fallback.');
  }

  // Fallback to embedded mock data if fetch didn't return
  if (!data && window.CAMPUS_MOCK_DATA) {
    data = window.CAMPUS_MOCK_DATA;
  }

  if (!data) {
    console.error('No campus data available.');
    return;
  }

  // 1. Render Dashboard Summary KPI Widgets
  renderStudentSummary(data.studentSummary);

  // 2. Render Upcoming Class & Deadlines
  renderUpcomingClasses(data.upcomingClasses);
  renderDeadlines(data.deadlines);

  // 3. Render Announcements with Filters
  renderAnnouncements(data.announcements);
  setupNewsFilters(data.announcements);

  // 4. Render Student Clubs
  renderClubs(data.clubs);
});

// Render Student KPI Widgets
function renderStudentSummary(student) {
  if (!student) return;

  // Sync to local storage if not already there
  if (!localStorage.getItem('lhu_student_profile')) {
    localStorage.setItem('lhu_student_profile', JSON.stringify(student));
  }

  // GPA Card
  const gpaNum = document.getElementById('statGpa');
  const gpaRank = document.getElementById('statGpaRank');
  const gpaFill = document.getElementById('gpaProgressFill');
  if (gpaNum) gpaNum.textContent = student.gpa4.toFixed(2);
  if (gpaRank) gpaRank.textContent = `Học lực: ${student.academicRanking}`;
  if (gpaFill) {
    const pct = (student.gpa4 / 4.0) * 100;
    setTimeout(() => { gpaFill.style.width = `${pct}%`; }, 200);
  }

  // Credits Card
  const creditsNum = document.getElementById('statCredits');
  const creditsTotal = document.getElementById('statCreditsTotal');
  const creditsFill = document.getElementById('creditsProgressFill');
  if (creditsNum) creditsNum.textContent = student.creditsAccumulated;
  if (creditsTotal) creditsTotal.textContent = `/ ${student.creditsTotal} TC`;
  if (creditsFill) {
    const pct = (student.creditsAccumulated / student.creditsTotal) * 100;
    setTimeout(() => { creditsFill.style.width = `${pct}%`; }, 200);
  }

  // Training Points Card
  const trainingNum = document.getElementById('statTrainingPoints');
  const trainingRank = document.getElementById('statTrainingRank');
  if (trainingNum) trainingNum.textContent = student.trainingPoints;
  if (trainingRank) trainingRank.textContent = student.trainingPoints >= 90 ? 'Xuất sắc' : 'Tốt';

  // Welcome banner elements
  const welcomeName = document.getElementById('welcomeStudentName');
  const welcomeMajor = document.getElementById('welcomeStudentMajor');
  const welcomeAvatar = document.getElementById('welcomeStudentAvatar');

  if (welcomeName) welcomeName.textContent = student.name;
  if (welcomeMajor) welcomeMajor.textContent = `${student.major} • Khóa ${student.academicYear}`;
  if (welcomeAvatar) {
    const parts = (student.name || 'An').trim().split(/\s+/);
    const initial = parts[parts.length - 1].charAt(0).toUpperCase();
    welcomeAvatar.textContent = initial;
    welcomeAvatar.classList.add('avatar-letter');
  }
}

// Render Next Upcoming Class
function renderUpcomingClasses(classes) {
  const container = document.getElementById('upcomingClassWidget');
  if (!container || !classes || classes.length === 0) return;

  const nextClass = classes[0];
  container.innerHTML = `
    <div class="class-snippet">
      <div class="class-title">${nextClass.subject} (${nextClass.code})</div>
      <div class="class-meta">
        <span><i class="fa-solid fa-clock"></i> ${nextClass.time}</span>
        <span><i class="fa-solid fa-location-dot"></i> ${nextClass.room}</span>
        <span><i class="fa-solid fa-chalkboard-user"></i> ${nextClass.lecturer}</span>
      </div>
    </div>
  `;
}

// Render Deadlines with Interactive Checkbox
function renderDeadlines(deadlines) {
  const container = document.getElementById('deadlinesWidget');
  if (!container || !deadlines || deadlines.length === 0) return;

  const urgentDeadline = deadlines[0];
  container.innerHTML = `
    <div class="deadline-snippet">
      <div class="deadline-title">${urgentDeadline.title}</div>
      <div style="font-size: 0.8rem; color: var(--text-muted);">${urgentDeadline.subject}</div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.35rem;">
        <span class="deadline-time-badge"><i class="fa-solid fa-hourglass-half"></i> ${urgentDeadline.dueDate}</span>
        <button class="btn btn-sm btn-secondary" onclick="markTaskDone(this, '${urgentDeadline.title}')">
          <i class="fa-solid fa-check"></i> Hoàn thành
        </button>
      </div>
    </div>
  `;
}

function markTaskDone(btn, taskTitle) {
  btn.classList.remove('btn-secondary');
  btn.classList.add('btn-primary');
  btn.innerHTML = `<i class="fa-solid fa-check-double"></i> Đã nộp`;
  btn.disabled = true;

  LHUCampus.toast(
    'Hoàn thành bài tập!',
    `Bạn đã đánh dấu "${taskTitle}" hoàn thành xuất sắc!`,
    'success'
  );
}

// Render Announcements List
function renderAnnouncements(list) {
  const container = document.getElementById('newsGrid');
  if (!container) return;

  if (!list || list.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">Không tìm thấy thông báo phù hợp.</div>`;
    return;
  }

  container.innerHTML = list.map(item => `
    <article class="news-card">
      <div class="news-image-wrap">
        <img src="${item.image}" alt="${item.title}" class="news-img" loading="lazy">
        <span class="news-category-badge">${item.category}</span>
      </div>
      <div class="news-body">
        <div class="news-meta">
          <span><i class="fa-regular fa-calendar"></i> ${item.date}</span>
          <span><i class="fa-regular fa-eye"></i> ${item.views.toLocaleString()}</span>
        </div>
        <h3 class="news-card-title">${item.title}</h3>
        <p class="news-summary">${item.summary}</p>
        <div class="news-footer">
          <span style="font-size: 0.75rem; color: var(--text-muted);">${item.author}</span>
          <a href="functional.html" class="news-readmore">Chi tiết <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>
    </article>
  `).join('');
}

// Setup News Category Filter Chips
function setupNewsFilters(allNews) {
  const filterChips = document.querySelectorAll('.news-filter-bar .filter-chip');
  if (!filterChips.length) return;

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterVal = chip.getAttribute('data-filter');
      if (filterVal === 'all') {
        renderAnnouncements(allNews);
      } else {
        const filtered = allNews.filter(n => n.category.toLowerCase().includes(filterVal.toLowerCase()));
        renderAnnouncements(filtered);
      }
    });
  });
}

// Render Clubs Grid
function renderClubs(clubs) {
  const container = document.getElementById('clubsGrid');
  if (!container || !clubs) return;

  container.innerHTML = clubs.slice(0, 3).map(club => `
    <div class="club-card">
      <div class="club-banner">
        <img src="${club.image}" alt="${club.name}" class="club-img" loading="lazy">
        <span class="club-category-pill">${club.category}</span>
      </div>
      <div class="club-body">
        <h3 class="club-name">${club.name}</h3>
        <div class="club-tagline">"${club.tagline}"</div>
        <p class="club-desc">${club.description}</p>
        <div class="club-tags">
          ${club.tags.map(t => `<span class="club-tag">#${t}</span>`).join('')}
        </div>
        <div class="club-footer">
          <div class="club-members">
            <i class="fa-solid fa-users"></i> ${club.members}+ thành viên
          </div>
          <button class="btn btn-sm btn-accent" onclick="joinClub('${club.name}')">
            <i class="fa-solid fa-user-plus"></i> Tham gia
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function joinClub(clubName) {
  LHUCampus.toast(
    'Đăng ký Câu lạc bộ',
    `Đã gửi đơn đăng ký tham gia "${clubName}" tới Ban chủ nhiệm CLB!`,
    'success'
  );
}
