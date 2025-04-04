// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const navItems = document.querySelectorAll('.nav-item');

// Mobile Navigation
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a nav item
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});

// Dark Mode Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Change icon based on mode
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  const icon = themeToggle.querySelector('i');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

// Project Filtering
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    
    // Filter projects
    projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Form Validation
function validateForm() {
  let isValid = true;
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');
  
  // Clear previous error messages
  document.querySelectorAll('.error-message').forEach(el => {
    el.textContent = '';
  });
  
  // Validate name
  if (name.value.trim() === '') {
    document.querySelector(`#name + .error-message`).textContent = 'Name is required';
    isValid = false;
  }
  
  // Validate email
  if (email.value.trim() === '') {
    document.querySelector(`#email + .error-message`).textContent = 'Email is required';
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    document.querySelector(`#email + .error-message`).textContent = 'Please enter a valid email';
    isValid = false;
  }
  
  // Validate subject
  if (subject.value.trim() === '') {
    document.querySelector(`#subject + .error-message`).textContent = 'Subject is required';
    isValid = false;
  }
  
  // Validate message
  if (message.value.trim() === '') {
    document.querySelector(`#message + .error-message`).textContent = 'Message is required';
    isValid = false;
  }
  
  return isValid;
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// LocalStorage helper functions
function saveMessageToLocalStorage(message) {
  // Get existing messages or initialize empty array
  const existingMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
  
  // Add new message to array
  existingMessages.push(message);
  
  // Save back to localStorage
  localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
}

function getAllMessages() {
  return JSON.parse(localStorage.getItem('contactMessages')) || [];
}

// Contact Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
      timestamp: new Date().toISOString(),
      id: Date.now().toString() // Generate unique ID for the message
    };
    
    try {
      // Save to localStorage
      saveMessageToLocalStorage(formData);
      
      // Show success message
      formStatus.textContent = 'Message sent successfully!';
      formStatus.className = 'form-status success';
      contactForm.reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 5000);
      
      console.log('Saved messages:', getAllMessages());
    } catch (error) {
      formStatus.textContent = 'Error saving message. Please try again later.';
      formStatus.className = 'form-status error';
      console.error('Error:', error);
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Get header height for offset
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll to top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.className = 'scroll-top-btn';
scrollBtn.style.position = 'fixed';
scrollBtn.style.bottom = '20px';
scrollBtn.style.right = '20px';
scrollBtn.style.zIndex = '999';
scrollBtn.style.width = '40px';
scrollBtn.style.height = '40px';
scrollBtn.style.borderRadius = '50%';
scrollBtn.style.backgroundColor = 'var(--primary-color)';
scrollBtn.style.color = 'var(--text-light)';
scrollBtn.style.border = 'none';
scrollBtn.style.cursor = 'pointer';
scrollBtn.style.display = 'none';
scrollBtn.style.justifyContent = 'center';
scrollBtn.style.alignItems = 'center';
scrollBtn.style.transition = 'var(--transition)';
document.body.appendChild(scrollBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollBtn.style.display = 'flex';
  } else {
    scrollBtn.style.display = 'none';
  }
});

// Scroll to top when button is clicked
scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.classList.remove('active');
        if (navItem.getAttribute('href') === `#${sectionId}`) {
          navItem.classList.add('active');
        }
      });
    }
  });
});

// Animate skill bars on scroll
const skillSection = document.querySelector('.skills');
const skillLevels = document.querySelectorAll('.skill-level');

if (skillSection) {
  window.addEventListener('scroll', () => {
    if (isInViewport(skillSection)) {
      skillLevels.forEach(level => {
        level.style.width = level.style.width || '0%';
      });
    }
  });
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Initialize AOS (if available)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
});

// Add CSS for the scroll-top button to make it visible when dark mode is active
const style = document.createElement('style');
style.textContent = `
  .dark-mode .scroll-top-btn {
    background-color: var(--primary-color);
    color: var(--text-dark);
  }
  
  .scroll-top-btn:hover {
    transform: translateY(-3px);
  }
  
  .nav-item.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);