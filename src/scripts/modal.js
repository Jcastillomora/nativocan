// modal.js - Lightbox gallery functionality

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('[data-modal]');
  const modalImage = modal?.querySelector('[data-modal-image]');
  const closeButton = modal?.querySelector('[data-modal-close]');
  const prevButton = modal?.querySelector('[data-modal-prev]');
  const nextButton = modal?.querySelector('[data-modal-next]');
  const galleryImages = document.querySelectorAll('[data-gallery-image]');

  let currentImageIndex = 0;
  const images = Array.from(galleryImages);

  function openModal(index) {
    currentImageIndex = index;
    updateModalImage();
    modal?.classList.remove('opacity-0', 'pointer-events-none');
    document.body.classList.add('overflow-hidden');
  }

  function closeModal() {
    modal?.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden');
  }

  function updateModalImage() {
    if (modalImage && images[currentImageIndex]) {
      const imageData = images[currentImageIndex].dataset;
      // For now, just update with placeholder
      // In production, use real image src
      modalImage.textContent = `Image ${currentImageIndex + 1}`;
    }
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateModalImage();
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateModalImage();
  }

  // Open modal on gallery image click
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
  });

  // Close modal
  closeButton?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Navigation
  prevButton?.addEventListener('click', prevImage);
  nextButton?.addEventListener('click', nextImage);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('pointer-events-none')) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  });
});
