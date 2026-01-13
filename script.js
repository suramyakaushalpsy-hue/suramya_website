const staggerItems = document.querySelectorAll('.reveal-item');

const staggerObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.reveal-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, index * 120);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);

document.querySelectorAll('.when-to-reach-content').forEach(section => {
    staggerObserver.observe(section);
});


// Simple Working JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    
    
    // Animated Counters
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Start counters when in view
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        reveals.forEach(reveal => observer.observe(reveal));
    }
    
    // Back to Top Button
    function initBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Contact Form Submission
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const message = this.querySelector('textarea').value;
                
                // Simple validation
                if (!name || !email || !message) {
                    alert('Please fill in all fields');
                    return;
                }
                
                // Show success message
                alert(`Thank you ${name}! Your message has been sent. We'll respond to you at ${email} within 24-48 hours.`);
                
                // Reset form
                this.reset();
            });
        }
    }
    
    // Add reveal class to elements
    function addRevealClass() {
        const elementsToAnimate = [
            '.hero-content',
            '.hero-image',
            '.about-content > *',
            '.service-card',
            '.testimonial-card',
            '.booking-card',
            '.contact-content > *'
        ];
        
        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.classList.add('reveal');
            });
        });
    }
    
    // Set current year in footer
    function setCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.textContent = currentYear;
        }
    }
    
    // Initialize everything
    function init() {
        addRevealClass();
        initCounters();
        initScrollAnimations();
        initBackToTop();
        initSmoothScrolling();
        initContactForm();
        setCurrentYear();
        
        // Add floating animation to cards
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.5}s`;
        });
        
        // Add hover effects to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Add hover effects to booking options
        const bookingOptions = document.querySelectorAll('.booking-option');
        bookingOptions.forEach(option => {
            option.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            });
            
            option.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
        });
    }
    
    // Start initialization
    init();
});

(function () {
    emailjs.init("Mmb-mS47eUWfTlDiJ"); // <---public key
})();

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // GET VALUES PROPERLY
        const from_name = form.querySelector('input[name="from_name"]').value;
        const from_email = form.querySelector('input[name="from_email"]').value;
        const message = form.querySelector('textarea[name="message"]').value;

        if (!from_name || !from_email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        //  SEND ADMIN EMAIL
        emailjs.send("service_9xycitk", "template_wvmijt5", {
            from_name: from_name,
            from_email: from_email,
            message: message
        })

        // SEND AUTO-REPLY EMAIL
        .then(() => {
            return emailjs.send("service_9xycitk", "template_a2ssmnd", {
                from_name: from_name,
                from_email: from_email,
                message: message
            });
        })

        //SUCCESS
        .then(() => {
            alert("Message sent successfully. We will get back to you soon.");
            form.reset();
        })

        //  ERROR
        .catch(error => {
            console.error("EmailJS Error:", error);
            alert("Something went wrong. Please try again.");
        });
    });
}
