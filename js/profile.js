/* ===================================================
   LHU CAMPUS - PROFILE & SETTINGS JAVASCRIPT
   HTML5 Form Validation, Regex, Avatar Preview & LocalStorage
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  loadProfileData();
  setupValidation();
  setupAvatarUpload();
  setupRangeSlider();
  setupSettingsToggles();
});

// Regex Patterns
const REGEX_PATTERNS = {
  // Vietnamese Full Name: at least 2 words, letters only
  name: /^[\p{L}\s'.-]{4,50}$/u,
  // LHU Student ID (e.g. 22DTH0124 or 23CT111...)
  studentId: /^2[0-9][A-Za-z]{2,4}[0-9]{3,5}$/,
  // Standard Email or University Email (@lhu.edu.vn)
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  // Vietnam Phone Number (10 digits starting with 03, 05, 07, 08, 09)
  phone: /^(0)(3|5|7|8|9)[0-9]{8}$/,
};

// Load saved profile data into form inputs
function loadProfileData() {
  const savedData = localStorage.getItem('lhu_student_profile');
  let student = null;

  if (savedData) {
    try {
      student = JSON.parse(savedData);
    } catch (e) {
      console.warn('Could not parse student profile');
    }
  }

  // Fallback defaults if no localStorage exists yet
  if (!student) {
    student = {
      name: "Nguyễn Văn An",
      studentId: "22DTH0124",
      faculty: "Khoa Công nghệ Thông tin",
      major: "Kỹ thuật Phần mềm (Software Engineering)",
      class: "22CT111",
      email: "an.nguyen22@lhu.edu.vn",
      phone: "0912345678",
      dateOfBirth: "2004-05-18",
      gender: "Nam",
      address: "TP. Biên Hòa, Tỉnh Đồng Nai",
      gpa4: 3.58,
      gpaTarget: 3.8,
      bio: "Sinh viên năm 3 đam mê phát triển web hiện đại, cloud architecture và trí tuệ nhân tạo. Mục tiêu đạt học bổng sinh viên giỏi LHU và tham gia đội tuyển NCKH.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    };
    localStorage.setItem('lhu_student_profile', JSON.stringify(student));
  }

  // Populate Header Banner
  updateBannerDisplay(student);

  // Populate Form Fields
  setInputValue('inputFullName', student.name);
  setInputValue('inputStudentId', student.studentId);
  setInputValue('inputEmail', student.email);
  setInputValue('inputPhone', student.phone);
  setInputValue('inputBirthDate', student.dateOfBirth);
  setInputValue('inputAddress', student.address);
  setInputValue('inputFaculty', student.faculty);
  setInputValue('inputMajor', student.major);
  setInputValue('inputClass', student.class);
  setInputValue('inputBio', student.bio);

  // Radio button for Gender
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  genderRadios.forEach(radio => {
    if (radio.value === student.gender) radio.checked = true;
  });

  // Target GPA Range
  const rangeInput = document.getElementById('inputGpaTarget');
  const rangeDisplay = document.getElementById('gpaTargetDisplay');
  if (rangeInput && rangeDisplay) {
    const val = student.gpaTarget || 3.8;
    rangeInput.value = val;
    rangeDisplay.textContent = `${parseFloat(val).toFixed(1)} / 4.0`;
  }
}

function setInputValue(elemId, value) {
  const elem = document.getElementById(elemId);
  if (elem && value !== undefined) {
    elem.value = value;
  }
}

function updateBannerDisplay(student) {
  const bannerName = document.getElementById('bannerStudentName');
  const bannerId = document.getElementById('bannerStudentId');
  const bannerFaculty = document.getElementById('bannerFaculty');
  const bannerAvatar = document.getElementById('bannerAvatarImg');

  if (bannerName) bannerName.textContent = student.name;
  if (bannerId) bannerId.textContent = `MSSV: ${student.studentId}`;
  if (bannerFaculty) bannerFaculty.textContent = student.faculty;
  if (bannerAvatar && student.avatar) bannerAvatar.src = student.avatar;

  // Also update Global navbar
  const navAvatar = document.querySelector('.nav-user-avatar');
  const navName = document.querySelector('.nav-user-name');
  if (navAvatar && student.avatar) navAvatar.src = student.avatar;
  if (navName && student.name) navName.textContent = student.name;
}

// Setup Form Validation
function setupValidation() {
  const form = document.getElementById('studentProfileForm');
  if (!form) return;

  const fields = [
    { id: 'inputFullName', regex: REGEX_PATTERNS.name, msg: 'Họ và tên phải có ít nhất 2 từ và chỉ chứa chữ cái.' },
    { id: 'inputStudentId', regex: REGEX_PATTERNS.studentId, msg: 'Mã SV LHU không đúng định dạng (Ví dụ: 22DTH0124).' },
    { id: 'inputEmail', regex: REGEX_PATTERNS.email, msg: 'Địa chỉ email không hợp lệ (Ví dụ: sinhvien@lhu.edu.vn).' },
    { id: 'inputPhone', regex: REGEX_PATTERNS.phone, msg: 'Số điện thoại VN không đúng (10 số, bắt đầu bằng 03, 05, 07, 08, 09).' },
    { id: 'inputAddress', minLen: 5, msg: 'Địa chỉ nơi ở phải có ít nhất 5 ký tự.' }
  ];

  // Attach live input & blur validation
  fields.forEach(f => {
    const input = document.getElementById(f.id);
    if (!input) return;

    const validateField = () => {
      const val = input.value.trim();
      let isValid = false;

      if (f.regex) {
        isValid = f.regex.test(val);
      } else if (f.minLen) {
        isValid = val.length >= f.minLen;
      }

      if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
      }

      return isValid;
    };

    input.addEventListener('input', validateField);
    input.addEventListener('blur', validateField);
  });

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    let firstInvalidElem = null;

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      if (!input) return;

      const val = input.value.trim();
      let isValid = false;

      if (f.regex) {
        isValid = f.regex.test(val);
      } else if (f.minLen) {
        isValid = val.length >= f.minLen;
      }

      if (!isValid) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        allValid = false;
        if (!firstInvalidElem) firstInvalidElem = input;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    });

    if (!allValid) {
      if (firstInvalidElem) firstInvalidElem.focus();
      LHUCampus.toast(
        'Lỗi biểu mẫu',
        'Vui lòng kiểm tra lại các trường thông tin có màu đỏ theo đúng định dạng!',
        'danger'
      );
      return;
    }

    // Retrieve previous student profile or defaults
    const prevData = JSON.parse(localStorage.getItem('lhu_student_profile') || '{}');

    // Collect updated values
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    const rangeInput = document.getElementById('inputGpaTarget');

    const updatedProfile = {
      ...prevData,
      name: document.getElementById('inputFullName').value.trim(),
      studentId: document.getElementById('inputStudentId').value.trim().toUpperCase(),
      email: document.getElementById('inputEmail').value.trim().toLowerCase(),
      phone: document.getElementById('inputPhone').value.trim(),
      dateOfBirth: document.getElementById('inputBirthDate').value,
      address: document.getElementById('inputAddress').value.trim(),
      faculty: document.getElementById('inputFaculty').value,
      major: document.getElementById('inputMajor').value,
      class: document.getElementById('inputClass').value.trim(),
      bio: document.getElementById('inputBio').value.trim(),
      gender: selectedGender ? selectedGender.value : 'Nam',
      gpaTarget: rangeInput ? parseFloat(rangeInput.value) : 3.8
    };

    // Save to LocalStorage
    localStorage.setItem('lhu_student_profile', JSON.stringify(updatedProfile));

    // Instant DOM update
    updateBannerDisplay(updatedProfile);

    // Toast notification
    LHUCampus.toast(
      'Cập nhật thành công!',
      'Hồ sơ sinh viên đã được lưu và cập nhật ngay lập tức trên toàn hệ thống LHU Campus.',
      'success',
      4500
    );
  });
}

// Setup Avatar Upload with Instant FileReader Preview
function setupAvatarUpload() {
  const fileInput = document.getElementById('avatarFileInput');
  const bannerImg = document.getElementById('bannerAvatarImg');
  const navAvatar = document.querySelector('.nav-user-avatar');

  if (!fileInput) return;

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      LHUCampus.toast('Tệp không hợp lệ', 'Vui lòng chọn tệp hình ảnh (.jpg, .png, .jpeg)', 'warning');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      LHUCampus.toast('Kích thước quá lớn', 'Kích thước ảnh không được vượt quá 3MB', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Img = event.target.result;
      if (bannerImg) bannerImg.src = base64Img;
      if (navAvatar) navAvatar.src = base64Img;

      // Save to localStorage
      const profile = JSON.parse(localStorage.getItem('lhu_student_profile') || '{}');
      profile.avatar = base64Img;
      localStorage.setItem('lhu_student_profile', JSON.stringify(profile));

      LHUCampus.toast('Đổi ảnh đại diện', 'Ảnh đại diện mới đã được cập nhật thành công!', 'success');
    };
    reader.readAsDataURL(file);
  });
}

// Target GPA Range Slider
function setupRangeSlider() {
  const range = document.getElementById('inputGpaTarget');
  const display = document.getElementById('gpaTargetDisplay');

  if (!range || !display) return;

  range.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value).toFixed(1);
    display.textContent = `${val} / 4.0`;
  });
}

// Setup Application Settings Toggles
function setupSettingsToggles() {
  const notifEmail = document.getElementById('toggleNotifEmail');
  const notifSms = document.getElementById('toggleNotifSms');
  const twoFactor = document.getElementById('toggleTwoFactor');

  const addToggleToast = (elem, settingName) => {
    if (!elem) return;
    elem.addEventListener('change', () => {
      LHUCampus.toast(
        'Cài đặt ứng dụng',
        `${settingName}: đã ${elem.checked ? 'BẬT' : 'TẮT'}`,
        'info'
      );
    });
  };

  addToggleToast(notifEmail, 'Nhận thông báo qua Email');
  addToggleToast(notifSms, 'Nhận SMS cảnh báo học vụ');
  addToggleToast(twoFactor, 'Bảo mật 2 lớp (2FA)');
}
