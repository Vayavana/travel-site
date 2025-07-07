document.getElementById('itineraryForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = document.getElementById('itineraryForm');
  const formData = new FormData(form);

  try {
    const response = await fetch('/submit', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Itinerary submitted successfully!');
      form.reset();
    } else {
      alert('Failed to submit itinerary.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred.');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Carousel code
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function(e) { e.stopPropagation(); prevSlide(); });
    nextBtn.addEventListener('click', function(e) { e.stopPropagation(); nextSlide(); });
  }

  setInterval(nextSlide, 5000);

  // Destinations dropdown (nav)
  const navDropdown = document.querySelector('.dropdown');
  const navDropBtn = navDropdown.querySelector('.dropbtn');
  const navDropContent = navDropdown.querySelector('.dropdown-content');

  document.addEventListener('click', function(e) {
    if (!navDropdown.contains(e.target)) {
      navDropContent.style.display = 'none';
      navDropBtn.classList.remove('active');
    }
  });
  navDropContent.addEventListener('click', function(e) {
    e.stopPropagation();
    // If a destination chip is clicked, let the browser handle navigation
    const chip = e.target.closest('a.chip');
    if (chip) {
      const href = chip.getAttribute('href');
      if (href && !href.startsWith('#')) {
        // Only handle .html links, let browser handle # links
        if (href.endsWith('.html')) {
          window.location = chip.href;
        } else if (href.startsWith('#')) {
          // Let browser scroll to section
          window.location.hash = href;
        }
        return;
      }
    }
  });

  // Itinerary reveal logic
  document.querySelectorAll('.package-card .cta').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      // Hide all itineraries first
      document.querySelectorAll('.itinerary-card').forEach(function(card) {
        card.style.display = 'none';
      });
      // Show the relevant itinerary
      var href = btn.getAttribute('href');
      if (href && href.startsWith('#')) {
        var target = document.querySelector(href);
        if (target) {
          target.style.display = 'block';
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

  // Blog slider navigation for index page
  const track = document.getElementById('blogSliderTrack');
  const prevBtnBlog = document.querySelector('.blog-slider-btn.prev');
  const nextBtnBlog = document.querySelector('.blog-slider-btn.next');
  if (track && prevBtnBlog && nextBtnBlog) {
    const card = track.querySelector('.blog-card');
    const cardWidth = card ? card.offsetWidth + 24 : 340; // 24px gap

    nextBtnBlog.addEventListener('click', function() {
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
    prevBtnBlog.addEventListener('click', function() {
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }
});
