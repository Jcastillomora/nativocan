// scroll-reveal.js - Intersection Observer animations

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and elements with data-reveal
  document.querySelectorAll('[data-reveal]').forEach(el => {
    observer.observe(el);
  });

  // Stagger animation for cards
  document.querySelectorAll('[data-stagger-container]').forEach(container => {
    const items = container.querySelectorAll('[data-stagger-item]');
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 100}ms`;
      // Add data-reveal to items for intersection observer
      item.setAttribute('data-reveal', '');
      observer.observe(item);
    });
  });

  // Lazy load background images
  const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bgUrl = entry.target.dataset.bgImage;
        if (bgUrl) {
          entry.target.style.backgroundImage = `url(${bgUrl})`;
        }
        bgObserver.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('[data-bg-image]').forEach(el => {
    bgObserver.observe(el);
  });
});
