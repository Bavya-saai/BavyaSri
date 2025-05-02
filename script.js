document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll Animation
    const sections = document.querySelectorAll('.section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    //contact section
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();
      
        const form = e.target;
        const data = new FormData(form);
      
        fetch(form.action, {
          method: form.method,
          body: data,
        })
          .then(response => {
            if (response.ok) {
              showResult("Thank you! for contacting me. I will get back to you soon 😊😊😊...", true);
              form.reset();
            } else {
              throw new Error("Submission failed");
            }
          })
          .catch(() => {
            showResult("Oops! Something went wrong. Please try again.", false);
          });
      });
      
      function showResult(message, success) {
        const resultDiv = document.getElementById("result");
        const icon = success ? "✅" : "❌";
        resultDiv.innerHTML = `${icon} ${message}`;
        resultDiv.className = success ? "success" : "error";
        resultDiv.style.display = "block";  // Make it visible
      
        // Set the animation class to trigger fadeInOut
        resultDiv.style.animation = "fadeInOut 4s ease-in-out forwards";
      
        // Optionally, reset the display after animation
        setTimeout(() => {
          resultDiv.style.display = "none"; // Hide after animation
          resultDiv.className = "";  // Reset class
        }, 5000); // Match the animation duration
      }

    // Initialize animations for hero section
    setTimeout(() => {
        const hero = document.querySelector('#hero');
        hero.style.opacity = '1';
    }, 100);
});