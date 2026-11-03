// main.js - Core functionality
// Smooth scroll, mobile menu, sticky header

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });

  // Sticky header shadow on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('shadow-lg');
    } else {
      header?.classList.remove('shadow-lg');
    }
  });

  // Mobile menu toggle
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuOverlay = document.querySelector('[data-menu-overlay]');

  function toggleMobileMenu() {
    mobileMenu?.classList.toggle('translate-x-full');
    menuOverlay?.classList.toggle('opacity-0');
    menuOverlay?.classList.toggle('pointer-events-none');
    document.body.classList.toggle('overflow-hidden');
  }

  function closeMobileMenu() {
    mobileMenu?.classList.add('translate-x-full');
    menuOverlay?.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden');
  }

  menuButton?.addEventListener('click', toggleMobileMenu);
  menuOverlay?.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking nav links
  document.querySelectorAll('[data-mobile-menu] a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
});
