/* ===================================================
   LHU CAMPUS - HERO SLIDER CAROUSEL MODULE
   Touch-friendly, Auto-play, Pause-on-hover
   =================================================== */

class LHUSlider {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.wrapper = this.container.querySelector('.slider-wrapper');
    this.slides = this.container.querySelectorAll('.slide');
    this.prevBtn = this.container.querySelector('.slider-btn.prev');
    this.nextBtn = this.container.querySelector('.slider-btn.next');
    this.dotsContainer = this.container.querySelector('.slider-dots');

    this.currentIndex = 0;
    this.slideCount = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5500;
    this.isPaused = false;

    // Touch variables
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    if (this.slideCount <= 1) return;

    // Render pagination dots
    this.renderDots();

    // Event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prev();
        this.resetAutoPlay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.next();
        this.resetAutoPlay();
      });
    }

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.pause());
    this.container.addEventListener('mouseleave', () => this.resume());

    // Touch Swipe Support
    this.container.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    // Start auto-play
    this.startAutoPlay();
    this.updateSlidePosition();
  }

  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.slideCount; i++) {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Đi đến slide ${i + 1}`);
      dot.addEventListener('click', () => {
        this.goTo(i);
        this.resetAutoPlay();
      });
      this.dotsContainer.appendChild(dot);
    }
  }

  updateSlidePosition() {
    if (!this.wrapper) return;
    this.wrapper.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    // Update dots
    const dots = this.container.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slideCount;
    this.updateSlidePosition();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
    this.updateSlidePosition();
  }

  goTo(index) {
    this.currentIndex = index;
    this.updateSlidePosition();
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
      this.resetAutoPlay();
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.autoPlayDelay);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }
}

// Auto init on page load
document.addEventListener('DOMContentLoaded', () => {
  new LHUSlider('.slider-container');
});
