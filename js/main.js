/* ===================================================
   LHU CAMPUS - CORE SCRIPTS & GLOBAL SYSTEM
   Theme, Navigation, Toast Notifications, Profile Sync
   =================================================== */

// Global App Namespace
const LHUCampus = {
  // Theme Management
  initTheme() {
    const savedTheme = localStorage.getItem('lhu_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcons(savedTheme);

    const themeToggles = document.querySelectorAll('.theme-toggle-btn, #themeToggleSwitch');
    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('lhu_theme', nextTheme);
        this.updateThemeIcons(nextTheme);

        if (toggle.type === 'checkbox') {
          toggle.checked = (nextTheme === 'dark');
        }

        LHUCampus.toast(
          'Chế độ giao diện',
          `Đã chuyển sang giao diện ${nextTheme === 'dark' ? 'Ban Đêm (Dark Mode)' : 'Ban Ngày (Light Mode)'}`,
          'info'
        );
      });
    });

    // Checkbox in settings if present
    const settingsSwitch = document.getElementById('themeToggleSwitch');
    if (settingsSwitch) {
      settingsSwitch.checked = (savedTheme === 'dark');
    }
  },

  updateThemeIcons(theme) {
    const icons = document.querySelectorAll('.theme-toggle-btn i');
    icons.forEach(icon => {
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
      } else {
        icon.className = 'fa-solid fa-moon';
      }
    });
  },

  // Mobile Navigation Drawer
  initMobileNav() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.mobile-drawer-overlay');
    const closeBtn = document.querySelector('.drawer-close-btn');

    if (!mobileToggle || !drawer || !overlay) return;

    const openDrawer = () => {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
  },

  // Toast Notification Engine
  toast(title, message, type = 'success', duration = 3500) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconMap = {
      success: 'fa-solid fa-circle-check',
      warning: 'fa-solid fa-triangle-exclamation',
      danger: 'fa-solid fa-circle-xmark',
      info: 'fa-solid fa-circle-info'
    };

    toast.innerHTML = `
      <i class="${iconMap[type] || iconMap.info} toast-icon"></i>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <i class="fa-solid fa-xmark toast-close"></i>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    const removeToast = () => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    };

    closeBtn.addEventListener('click', removeToast);
    container.appendChild(toast);

    if (duration > 0) {
      setTimeout(removeToast, duration);
    }
  },

  // Profile Data Sync Across Header & Pages
  syncProfileData() {
    const savedData = localStorage.getItem('lhu_student_profile');
    if (!savedData) return;

    try {
      const student = JSON.parse(savedData);
      // Update navbar user pill
      const navAvatar = document.querySelector('.nav-user-avatar');
      const navName = document.querySelector('.nav-user-name');
      if (navAvatar && student.avatar) navAvatar.src = student.avatar;
      if (navName && student.name) navName.textContent = student.name;

      // Update welcome banner on dashboard if present
      const welcomeName = document.getElementById('welcomeStudentName');
      const welcomeAvatar = document.getElementById('welcomeStudentAvatar');
      if (welcomeName && student.name) welcomeName.textContent = student.name;
      if (welcomeAvatar && student.avatar) welcomeAvatar.src = student.avatar;
    } catch (e) {
      console.warn('Could not sync profile data:', e);
    }
  },

  // Fetch Open API Weather for Bien Hoa (Campus location)
  async initWeatherWidget() {
    const weatherElem = document.getElementById('weatherStatus');
    if (!weatherElem) return;

    try {
      // Free open-meteo API for Bien Hoa, Dong Nai (lat: 10.9574, lon: 106.8427)
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=10.9574&longitude=106.8427&current_weather=true');
      if (res.ok) {
        const data = await res.json();
        const temp = Math.round(data.current_weather.temperature);
        weatherElem.innerHTML = `<i class="fa-solid fa-sun-cloud" style="color: #ff9800;"></i> Biên Hòa, Đồng Nai: ${temp}°C`;
      } else {
        throw new Error('API offline');
      }
    } catch (err) {
      // Fallback display
      weatherElem.innerHTML = `<i class="fa-solid fa-cloud-sun" style="color: #ff9800;"></i> Biên Hòa, Đồng Nai: 29°C`;
    }
  },

  // Active Navbar Indicator
  initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-drawer-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
};

// Auto initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  LHUCampus.initTheme();
  LHUCampus.initMobileNav();
  LHUCampus.syncProfileData();
  LHUCampus.initWeatherWidget();
  LHUCampus.initActiveNav();

  // Scroll navbar styling
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
});
