// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// DOM Elements
const themeButton = document.getElementById('theme-button');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillBars = document.querySelectorAll('.skill-bar span');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contact-form');
const notification = document.getElementById('notification');
const workItems = document.querySelectorAll('.work-item');
const filterButtons = document.querySelectorAll('.filter-btn');
const testimonials = document.querySelectorAll('.testimonial');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const statValues = document.querySelectorAll('.stat-value');

// Particles.js Configuration
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#4e9eff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#4e9eff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 1 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Update icon
  const icon = themeButton.querySelector('i');
  icon.classList.toggle('bx-sun', isDarkMode);
  icon.classList.toggle('bx-moon', !isDarkMode);
}

// Check for saved theme preference or respect OS preference
if (localStorage.getItem('darkMode') === 'true' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('darkMode'))) {
  document.body.classList.add('dark-mode');
  const icon = themeButton.querySelector('i');
  icon.classList.add('bx-sun');
  icon.classList.remove('bx-moon');
}

themeButton.addEventListener('click', toggleDarkMode);

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const isExpanded = navMenu.classList.contains('active');
  navToggle.setAttribute('aria-expanded', isExpanded);
  
  // Update icon
  const icon = navToggle.querySelector('i');
  icon.classList.toggle('bx-x', isExpanded);
  icon.classList.toggle('bx-menu', !isExpanded);
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('bx-x');
    icon.classList.add('bx-menu');
  });
});

// Active navigation link based on scroll position
function setActiveNavLink() {
  const scrollPosition = window.scrollY;
  
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (
      section.offsetTop - 100 <= scrollPosition &&
      section.offsetTop + section.offsetHeight > scrollPosition
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', setActiveNavLink);

// Back to top button
function toggleBackToTop() {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

window.addEventListener('scroll', toggleBackToTop);

backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animate skill bars when in viewport
function animateSkillBars() {
  skillBars.forEach(bar => {
    const barPosition = bar.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (barPosition < screenPosition) {
      bar.style.width = bar.getAttribute('data-width');
    }
  });
}

window.addEventListener('scroll', animateSkillBars);

// Animate stats counter
function animateStats() {
  statValues.forEach(stat => {
    const statPosition = stat.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (statPosition < screenPosition && !stat.classList.contains('animated')) {
      const target = parseInt(stat.getAttribute('data-count'));
      let count = 0;
      const duration = 2000; // in milliseconds
      const increment = target / (duration / 16);
      
      const updateCount = () => {
        if (count < target) {
          count += increment;
          stat.textContent = Math.round(count);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
          stat.classList.add('animated');
        }
      };
      
      updateCount();
    }
  });
}

window.addEventListener('scroll', animateStats);

// Work filter functionality
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    workItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Testimonial slider
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach(testimonial => testimonial.classList.remove('active'));
  testimonialDots.forEach(dot => dot.classList.remove('active'));
  
  testimonials[index].classList.add('active');
  testimonialDots[index].classList.add('active');
  currentTestimonial = index;
}

testimonialDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.getAttribute('data-index'));
    showTestimonial(index);
  });
});

// Auto-rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // In a real application, you would send the form data to a server here
  // This is just a simulation of a successful submission
  
  // Show success notification
  notification.classList.add('visible', 'success');
  notification.querySelector('.notification-text').textContent = 'Your message has been sent successfully!';
  
  // Reset form
  contactForm.reset();
  
  // Hide notification after 5 seconds
  setTimeout(() => {
    notification.classList.remove('visible');
  }, 5000);
});

// Initialize animations on page load
window.addEventListener('load', () => {
  setActiveNavLink();
  toggleBackToTop();
  animateSkillBars();
  animateStats();
  
  // Make work items visible with staggered animation
  workItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('visible');
    }, index * 200);
  });
});

