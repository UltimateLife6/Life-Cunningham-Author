// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletterForm');
const popupForm = document.querySelector('.popup-form');

function handleNewsletterSubmit(form, event) {
  event.preventDefault();
  const email = form.querySelector('input[type="email"]').value;

  // Validate email before submitting
  if (!validateEmail(email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Subscribing...';
  submitBtn.disabled = true;

  // Submit to EmailOctopus
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showNotification('Thank you for subscribing! Welcome to the adventure.', 'success');
      form.reset();
      
      // Close popup if it's open
      const popup = document.getElementById('newsletterPopup');
      if (popup && popup.style.display === 'flex') {
        popup.style.display = 'none';
      }
      
      // Track subscription
      trackNewsletterSubscription('form');
    } else {
      throw new Error(data.message || 'Subscription failed');
    }
  })
  .catch(error => {
    console.error('Newsletter subscription error:', error);
    showNotification('Sorry, there was an error subscribing. Please try again.', 'error');
  })
  .finally(() => {
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => handleNewsletterSubmit(newsletterForm, e));
}

if (popupForm) {
  popupForm.addEventListener('submit', (e) => handleNewsletterSubmit(popupForm, e));
}

// Newsletter Popup
const newsletterPopup = document.getElementById('newsletterPopup');
const popupClose = document.getElementById('popupClose');

// Show popup after 30 seconds or when user tries to leave
let popupShown = false;

function showNewsletterPopup() {
  if (!popupShown && newsletterPopup) {
    newsletterPopup.style.display = 'flex';
    popupShown = true;
  }
}

// Show popup on exit intent
document.addEventListener('mouseleave', (e) => {
  if (e.clientY <= 0 && !popupShown) {
    setTimeout(showNewsletterPopup, 1000);
  }
});

// Show popup after 30 seconds
setTimeout(showNewsletterPopup, 30000);

// Close popup
if (popupClose) {
  popupClose.addEventListener('click', () => {
    newsletterPopup.style.display = 'none';
  });
}

// Close popup when clicking outside
if (newsletterPopup) {
  newsletterPopup.addEventListener('click', (e) => {
    if (e.target === newsletterPopup) {
      newsletterPopup.style.display = 'none';
    }
  });
}

// Notification System
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2d5a3d' : '#1a1f3a'};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.book-feature, .newsletter-content, .social-item');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Book cover hover effects
document.addEventListener('DOMContentLoaded', () => {
  const bookCovers = document.querySelectorAll('.book-cover, .feature-cover');
  bookCovers.forEach(cover => {
    cover.addEventListener('mouseenter', () => {
      cover.style.transform = 'scale(1.05) rotateY(-5deg)';
    });

    cover.addEventListener('mouseleave', () => {
      cover.style.transform = 'scale(1) rotateY(-15deg)';
    });
  });
});

// Form validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Add email validation to all newsletter forms
document.addEventListener('DOMContentLoaded', () => {
  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
      const email = input.value;
      if (email && !validateEmail(email)) {
        input.style.borderColor = '#dc3545';
        showNotification('Please enter a valid email address.', 'error');
      } else {
        input.style.borderColor = '#2d5a3d';
      }
    });
  });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Close popup with Escape key
  if (e.key === 'Escape' && newsletterPopup && newsletterPopup.style.display === 'flex') {
    newsletterPopup.style.display = 'none';
  }

  // Close mobile menu with Escape key
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Analytics tracking (placeholder for Google Analytics)
function trackEvent(category, action, label = null) {
  // Replace with your actual analytics implementation
  console.log('Analytics Event:', { category, action, label });
}

// Track newsletter subscriptions
function trackNewsletterSubscription(source) {
  trackEvent('Newsletter', 'Subscribe', source);
}

// Track book link clicks
document.addEventListener('DOMContentLoaded', () => {
  const bookLinks = document.querySelectorAll('a[href*="amazon"], a[href*="barnesandnoble"]');
  bookLinks.forEach(link => {
    link.addEventListener('click', () => {
      const retailer = link.href.includes('amazon') ? 'Amazon' : 'Barnes & Noble';
      trackEvent('Book Sales', 'Click', retailer);
    });
  });
});

// Performance monitoring
window.addEventListener('load', () => {
  // Track page load time
  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
  console.log(`Page loaded in ${loadTime}ms`);

  // Track Core Web Vitals
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.value}`);
      }
    });
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  }
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all FAQ items
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Here you would typically send to your backend
      // For now, we'll simulate a successful submission
      showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');

      // Clear the form
      contactForm.reset();
    });
  }
});

// Blog Category Filtering
document.addEventListener('DOMContentLoaded', () => {
  const categoryBtns = document.querySelectorAll('.category-btn');
  const blogPosts = document.querySelectorAll('.blog-post');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Update active button
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter posts
      blogPosts.forEach(post => {
        const postCategory = post.getAttribute('data-category');

        if (category === 'all' || postCategory === category) {
          post.style.display = 'block';
          post.style.opacity = '0';
          setTimeout(() => {
            post.style.opacity = '1';
          }, 50);
        } else {
          post.style.display = 'none';
        }
      });
    });
  });
});

// Load More Posts Functionality
document.addEventListener('DOMContentLoaded', () => {
  const loadMoreBtn = document.querySelector('.load-more-btn');

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      // Here you would typically load more posts from your backend
      // For now, we'll simulate loading more posts
      showNotification('Loading more posts...', 'info');

      // Simulate loading delay
      setTimeout(() => {
        showNotification('More posts loaded!', 'success');
      }, 2000);
    });
  }
});

// Interactive Quiz Functionality
document.addEventListener('DOMContentLoaded', () => {
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizQuestion = document.getElementById('quizQuestion');
  const quizResults = document.getElementById('quizResults');
  const scoreElement = document.getElementById('score');
  const scoreMessage = document.getElementById('scoreMessage');
  const retakeBtn = document.getElementById('retakeQuiz');

  let currentQuestion = 0;
  let score = 0;

  const questions = [
    {
      question: "What is the name of Elara's home village?",
      options: ["Oakvale Village", "Crystal City", "Shadow Town", "Mystic Grove"],
      correct: 0
    },
    {
      question: "What type of magic does Elara practice?",
      options: ["Fire Magic", "Spirit Casting", "Water Magic", "Earth Magic"],
      correct: 1
    },
    {
      question: "Who is Elara's loyal warrior friend?",
      options: ["Lyra", "Kael", "Marcus", "Aria"],
      correct: 1
    },
    {
      question: "What threatens Elara's village in Winters' War?",
      options: ["Dragon Attack", "Shadow Weavers", "Ice Storm", "Plague"],
      correct: 1
    },
    {
      question: "Where does Lyra work as a scholar?",
      options: ["Oakvale Library", "Crystal Library", "Royal Archives", "Mystic Tower"],
      correct: 1
    }
  ];

  function loadQuestion() {
    if (currentQuestion < questions.length) {
      const q = questions[currentQuestion];
      document.querySelector('.question-text').textContent = q.question;
      document.querySelector('h3').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

      quizOptions.forEach((option, index) => {
        option.textContent = q.options[index];
        option.dataset.correct = index === q.correct;
        option.classList.remove('correct', 'incorrect');
      });
    } else {
      showResults();
    }
  }

  function showResults() {
    const percentage = (score / questions.length) * 100;

    scoreElement.textContent = score;

    if (percentage === 100) {
      scoreMessage.textContent = "Perfect! You're a true Spirit Caster expert!";
      scoreMessage.className = 'score-message perfect';
    } else if (percentage >= 80) {
      scoreMessage.textContent = "Great job! You know the Spirit Caster world well!";
      scoreMessage.className = 'score-message good';
    } else if (percentage >= 60) {
      scoreMessage.textContent = "Good effort! Keep reading to learn more!";
      scoreMessage.className = 'score-message good';
    } else {
      scoreMessage.textContent = "Time to re-read Winters' War!";
      scoreMessage.className = 'score-message needs-work';
    }

    quizQuestion.style.display = 'none';
    quizResults.style.display = 'block';
  }

  quizOptions.forEach(option => {
    option.addEventListener('click', () => {
      const isCorrect = option.dataset.correct === 'true';

      if (isCorrect) {
        option.classList.add('correct');
        score++;
      } else {
        option.classList.add('incorrect');
      }

      // Disable all options after selection
      quizOptions.forEach(opt => opt.style.pointerEvents = 'none');

      // Move to next question after delay
      setTimeout(() => {
        currentQuestion++;
        quizOptions.forEach(opt => {
          opt.classList.remove('correct', 'incorrect');
          opt.style.pointerEvents = 'auto';
        });
        loadQuestion();
      }, 1500);
    });
  });

  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      currentQuestion = 0;
      score = 0;
      quizQuestion.style.display = 'block';
      quizResults.style.display = 'none';
      loadQuestion();
    });
  }

  // Initialize quiz
  loadQuestion();
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
} 