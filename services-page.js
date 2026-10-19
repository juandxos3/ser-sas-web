(() => {
  'use strict';
  const gallery = document.getElementById('service-gallery');
  if (!gallery) return;
  const slides = Array.from(gallery.querySelectorAll('.slide'));
  const controls = gallery.parentElement.querySelectorAll('[data-gallery-step]');
  const status = document.getElementById('gallery-status');
  if (!slides.length) return;
  let currentSlide = 0;
  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    gallery.style.transform = `translateX(${-currentSlide * 100}%)`;
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', String(i !== currentSlide));
    });
    if (status) status.textContent = `Foto ${currentSlide + 1} de ${slides.length}`;
  }
  showSlide(0);
  controls.forEach(button => {
    button.addEventListener('click', () => {
      showSlide(currentSlide + Number(button.dataset.galleryStep));
    });
    button.hidden = false;
  });
})();
