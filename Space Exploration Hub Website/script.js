document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements
  const navbarToggle = document.getElementById('navbar-toggle');
  const navbarLinks = document.querySelector('.navbar-links');
  const navLinks = document.querySelectorAll('.navbar-links a');
  const searchInput = document.getElementById('navbar-search-input');
  const searchBtn = document.getElementById('search-btn');
  const missionFilter = document.getElementById('mission-filter');
  const missionCards = document.querySelectorAll('.card');
  const contactForm = document.querySelector('.contact-form');
  const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
  const rsvpBtns = document.querySelectorAll('.rsvp-btn');
  const readMoreLinks = document.querySelectorAll('.read-more');

  // Hamburger Menu Toggle
  if (navbarToggle && navbarLinks) {
    navbarToggle.addEventListener('click', () => {
      navbarToggle.classList.toggle('active');
      navbarLinks.classList.toggle('active');
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navbarToggle.classList.remove('active');
      navbarLinks.classList.remove('active');
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Search Functionality
  let searchTimeout;
  function performSearch(query) {
    if (!query.trim()) return;

    document.querySelectorAll('.card, .news-card, .gallery-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query.toLowerCase()) ? 'block' : 'none';
    });

    const visibleItems = document.querySelectorAll('.card[style*="block"], .news-card[style*="block"], .gallery-item[style*="block"]');
    if (visibleItems.length > 0) {
      document.getElementById('missions').scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => performSearch(searchInput.value));
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => performSearch(searchInput.value), 300);
    });
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch(searchInput.value);
    });
  }

  // Scroll Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section, .card, .news-card, .event-card, .gallery-item, .education-card').forEach(item => {
    observer.observe(item);
  });

  // Mission Filter
  if (missionFilter) {
    missionFilter.addEventListener('change', () => {
      const filterValue = missionFilter.value;
      missionCards.forEach((card, index) => {
        card.style.display = (filterValue === 'all' || card.dataset.category === filterValue) ? 'block' : 'none';
        if (card.style.display === 'block') {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 100);
        }
      });
    });
  }

  // Load More Galleries
  window.loadMoreGalleries = () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid.children.length >= 8) {
      alert('No more galleries to load!');
      return;
    }
    const lastItem = galleryGrid.lastElementChild.cloneNode(true);
    lastItem.querySelector('h3').textContent = `Bonus Gallery ${galleryGrid.children.length + 1}`;
    galleryGrid.appendChild(lastItem);
    observer.observe(lastItem);
  };

  // Load More News
  window.loadMoreNews = () => {
    const newsGrid = document.querySelector('.news-grid');
    if (newsGrid.children.length >= 8) {
      alert('No more news to load!');
      return;
    }
    const lastNews = newsGrid.lastElementChild.cloneNode(true);
    lastNews.querySelector('h3').textContent = `Bonus News ${newsGrid.children.length + 1}`;
    newsGrid.appendChild(lastNews);
    observer.observe(lastNews);
  };

  // Contact Form
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('input[type="text"]').value.trim();
      const email = contactForm.querySelector('input[type="email"]').value.trim();
      const message = contactForm.querySelector('textarea').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }

      alert('Message sent successfully!');
      contactForm.reset();
    });
  }

  // Learn More, RSVP, and Read More
  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      showModal(card.querySelector('h3').textContent, card.querySelector('p').textContent);
    });
  });

  rsvpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const eventTitle = btn.closest('.event-card').querySelector('h3').textContent;
      alert(`RSVP for "${eventTitle}" - Registration coming soon!`);
    });
  });

  readMoreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const newsCard = link.closest('.news-card');
      showModal(newsCard.querySelector('h3').textContent, newsCard.querySelector('p:not(.news-date)').textContent);
    });
  });

  // Modal
  function showModal(title, content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); 
      display: flex; align-items: center; justify-content: center; z-index: 1000;
    `;
    modal.innerHTML = `
      <div style="background: #1c1e22; padding: 30px; border-radius: 12px; max-width: 500px; text-align: center; color: #fff;">
        <h2 style="color: #1f8ef1; margin-bottom: 15px;">${title}</h2>
        <p style="color: #ccc; margin-bottom: 20px;">${content}</p>
        <button style="padding: 10px 20px; background: #1f8ef1; border: none; color: #fff; border-radius: 6px; cursor: pointer;">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('button').addEventListener('click', () => modal.remove());
  }

  window.jumpToMissions = () => {
    document.getElementById('missions').scrollIntoView({ behavior: 'smooth' });
  };

  window.scrollToNews = () => {
    document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
  };
});