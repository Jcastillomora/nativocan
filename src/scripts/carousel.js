// carousel.js - Testimonials carousel

class Carousel {
  constructor(element) {
    this.carousel = element;
    this.track = element.querySelector('[data-carousel-track]');
    this.slides = element.querySelectorAll('[data-carousel-slide]');
    this.prevButton = element.querySelector('[data-carousel-prev]');
    this.nextButton = element.querySelector('[data-carousel-next]');
    this.dots = element.querySelectorAll('[data-carousel-dot]');

    this.currentIndex = 0;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    this.prevButton?.addEventListener('click', () => this.prev());
    this.nextButton?.addEventListener('click', () => this.next());

    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });

    // Auto-play
    this.startAutoPlay();

    // Pause on hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

    // Initial update
    this.updateCarousel();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateCarousel();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateCarousel();
  }

  goTo(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  updateCarousel() {
    const offset = -this.currentIndex * 100;
    if (this.track) {
      this.track.style.transform = `translateX(${offset}%)`;
    }

    // Update dots
    this.dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('bg-primary');
        dot.classList.remove('bg-neutral-300');
      } else {
        dot.classList.remove('bg-primary');
        dot.classList.add('bg-neutral-300');
      }
    });
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.next(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
  const carouselElement = document.querySelector('[data-carousel]');
  if (carouselElement) {
    new Carousel(carouselElement);
  }
});
