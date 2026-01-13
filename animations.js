// Advanced Animations Controller
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.initParticles();
        this.initScrollAnimations();
        this.initGSAPAnimations();
        this.initParallax();
        this.initLazyLoad();
        this.initCounters();
        this.initTypingAnimation();
    }

    // Particle Background
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#4a6fa5'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#4a6fa5',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 200,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Special animations for specific elements
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                    
                    if (entry.target.classList.contains('portfolio-item')) {
                        this.animatePortfolioItem(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with reveal class
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        
        // Observe specific elements
        document.querySelectorAll('.stat-number, .portfolio-item, .approach-card, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    // GSAP Animations
    initGSAPAnimations() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            // Register ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);

            // Hero section animations
            gsap.from('.hero-title', {
                duration: 1.5,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });

            gsap.from('.hero-subtitle', {
                duration: 1.5,
                y: 30,
                opacity: 0,
                delay: 0.5,
                ease: 'power3.out'
            });

            gsap.from('.hero-cta', {
                duration: 1,
                y: 30,
                opacity: 0,
                delay: 1,
                ease: 'power3.out'
            });

            gsap.from('.image-frame', {
                duration: 1.5,
                scale: 0.8,
                opacity: 0,
                rotationY: -30,
                ease: 'power3.out',
                delay: 0.5
            });

            gsap.from('.float-card', {
                duration: 1,
                scale: 0,
                opacity: 0,
                stagger: 0.2,
                delay: 1.5,
                ease: 'back.out(1.7)'
            });

            // Floating cards continuous animation
            gsap.to('.float-card', {
                y: -20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                stagger: 0.5
            });

            // Section title animations
            gsap.utils.toArray('.section-title').forEach(title => {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    ease: 'power3.out'
                });
            });

            // Timeline animations
            gsap.utils.toArray('.timeline-item').forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    duration: 1,
                    x: i % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    delay: i * 0.2,
                    ease: 'power3.out'
                });
            });

            // Parallax effect for hero background
            gsap.to('.hero-bg-gradient', {
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: 100,
                ease: 'none'
            });
        }
    }

    // Parallax Effects
    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }

    // Lazy Load with animation
    initLazyLoad() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    
                    // Add fade in animation
                    gsap.from(img, {
                        duration: 0.8,
                        opacity: 0,
                        scale: 0.9,
                        ease: 'power2.out'
                    });
                    
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Animated Counters
    initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const startTime = Date.now();
        
        const updateCounter = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            
            if (elapsed < duration) {
                const progress = elapsed / duration;
                const current = Math.floor(progress * target);
                counter.textContent = current.toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    }

    // Typing Animation
    initTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (!typingElement) return;

        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                observer.unobserve(typingElement);
            }
        });
        
        observer.observe(typingElement);
    }

    // Portfolio Item Animation
    animatePortfolioItem(item) {
        gsap.from(item, {
            duration: 1,
            y: 50,
            opacity: 0,
            scale: 0.9,
            ease: 'back.out(1.7)'
        });
    }

    // Wave Animation for Portfolio Items
    initWaveAnimation() {
        const waves = document.querySelectorAll('.portfolio-wave');
        
        waves.forEach(wave => {
            wave.style.background = `
                linear-gradient(
                    90deg,
                    transparent,
                    rgba(74, 111, 165, 0.2),
                    transparent
                )
            `;
            wave.style.backgroundSize = '200% 100%';
            
            gsap.to(wave, {
                backgroundPositionX: '200%',
                duration: 3,
                repeat: -1,
                ease: 'none'
            });
        });
    }

    // Hologram Effect
    initHologramEffect() {
        const holograms = document.querySelectorAll('[data-hover="true"]');
        
        holograms.forEach(hologram => {
            hologram.addEventListener('mouseenter', () => {
                gsap.to(hologram, {
                    duration: 0.5,
                    rotationY: 10,
                    rotationX: 5,
                    scale: 1.05,
                    ease: 'power2.out'
                });
            });
            
            hologram.addEventListener('mouseleave', () => {
                gsap.to(hologram, {
                    duration: 0.5,
                    rotationY: 0,
                    rotationX: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Mouse Trail Effect
    initMouseTrail() {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        document.body.appendChild(trail);
        
        const dots = [];
        const dotCount = 12;
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'trail-dot';
            trail.appendChild(dot);
            dots.push({
                el: dot,
                x: 0,
                y: 0,
                delay: i * 0.05
            });
        }
        
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const updateTrail = () => {
            dots.forEach((dot, i) => {
                const targetX = mouseX - 5;
                const targetY = mouseY - 5;
                
                dot.x += (targetX - dot.x) * 0.2;
                dot.y += (targetY - dot.y) * 0.2;
                
                gsap.to(dot.el, {
                    x: dot.x,
                    y: dot.y,
                    duration: 0.3,
                    delay: dot.delay,
                    ease: 'power2.out'
                });
                
                const scale = 1 - (i / dotCount) * 0.8;
                const opacity = 1 - (i / dotCount);
                
                dot.el.style.transform = `scale(${scale})`;
                dot.el.style.opacity = opacity;
            });
            
            requestAnimationFrame(updateTrail);
        };
        
        updateTrail();
    }
}

// Initialize Animation Controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animationController = new AnimationController();
});