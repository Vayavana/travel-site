// Simple horizontal slider for blog cards
window.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.blog-slider-track');
  const prevBtn = document.querySelector('.blog-slider-btn.prev');
  const nextBtn = document.querySelector('.blog-slider-btn.next');
  let scrollAmount = 0;
  const cardWidth = 340; // Approximate width of a blog card + gap

  nextBtn.addEventListener('click', function() {
    track.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });
  prevBtn.addEventListener('click', function() {
    track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });
});
