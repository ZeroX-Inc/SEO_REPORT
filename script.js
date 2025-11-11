// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animations
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                animateCounter(counter);
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Counter Animation
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    const numberElement = element.querySelector('.stat-number, .stat-big-number');
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number based on value
        if (target >= 1000) {
            numberElement.textContent = Math.floor(current) + '+';
        } else if (target < 10) {
            numberElement.textContent = current.toFixed(2);
        } else {
            numberElement.textContent = Math.floor(current);
        }
    }, 16);
}

// Chart.js - Growth Chart
window.addEventListener('load', () => {
    const growthCtx = document.getElementById('growthChart');
    if (growthCtx) {
        new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025'],
                datasets: [{
                    label: 'Accepted Students',
                    data: [62, 77, 111, 169, 164],
                    borderColor: '#eb0029',
                    backgroundColor: 'rgba(235, 0, 41, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: '#eb0029',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#000000',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + ' students';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 40,
                        max: 220,
                        ticks: {
                            stepSize: 40,
                            color: '#4d4d4d',
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: '#e5e7e7',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#4d4d4d',
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Gauge Charts for Student Experience
    createGaugeChart('satisfactionGauge', 4.75, 5, '4.75/5');
    createGaugeChart('recommendGauge', 9.52, 10, '9.52/10');
    createGaugeChart('npsGauge', 87, 100, '87%');
});

// Create Gauge Chart
function createGaugeChart(elementId, value, max, label) {
    const ctx = document.getElementById(elementId);
    if (!ctx) return;
    
    const percentage = (value / max) * 100;
    const angle = (percentage / 100) * 180;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [value, max - value],
                backgroundColor: ['#eb0029', '#e5e7e7'],
                borderWidth: 0,
                circumference: 180,
                rotation: 270
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        },
        plugins: [{
            id: 'gaugeText',
            afterDraw: (chart) => {
                const { ctx, chartArea: { width, height } } = chart;
                ctx.save();
                
                const centerX = width / 2;
                const centerY = height / 1.2;
                
                ctx.font = 'bold 32px "Founders Grotesk"';
                ctx.fillStyle = '#eb0029';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, centerX, centerY);
                
                ctx.restore();
            }
        }]
    });
}

// Smooth scroll for anchor links
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

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add hover effects for interactive elements
document.querySelectorAll('.stat-card, .partner-logo, .event-card, .testimonial-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Console message
console.log('%c🚀 SEO Tech Developer 2025 Impact Report', 'font-size: 20px; font-weight: bold; color: #eb0029;');
console.log('%cBuilding Tomorrow\'s Tech Workforce', 'font-size: 14px; color: #4d4d4d;');


// new added script content
/* ========================================
   PROGRAM OVERVIEW SECTION - JAVASCRIPT ONLY
   ======================================== */

// Intersection Observer for scroll animations
const observeProgramOverview = () => {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger card animations
                const cards = entry.target.querySelectorAll('.info-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 300);
                });
            }
        });
    }, observerOptions);

    // Observe the program overview section
    const section = document.querySelector('.program-overview');
    if (section) {
        observer.observe(section);
    }
};

// Parallax effect for decorative circles
const parallaxCircles = () => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const section = document.querySelector('.program-overview');
        
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Check if section is in viewport
            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const circleLeft = section.querySelector('.circle-left');
                const circleRight = section.querySelector('.circle-right');
                
                if (circleLeft) {
                    const speed = (scrolled - sectionTop) * 0.3;
                    circleLeft.style.transform = `translateY(${speed}px) rotate(${speed * 0.1}deg)`;
                }
                
                if (circleRight) {
                    const speed = (scrolled - sectionTop) * 0.2;
                    circleRight.style.transform = `translateY(${-speed}px) rotate(${-speed * 0.1}deg)`;
                }
            }
        }
    });
};

// Animate curve drawing on scroll
const animateCurve = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const curveLine = entry.target.querySelector('.curve-line');
                if (curveLine) {
                    curveLine.style.animation = 'drawCurve 2s ease 0.3s forwards';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const curveContainer = document.querySelector('.curve-container');
    if (curveContainer) {
        observer.observe(curveContainer);
    }
};

// Card hover effects with enhanced interactivity
const enhanceCardInteractions = () => {
    const cards = document.querySelectorAll('.info-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Subtle scale effect on hover
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
};

// Smooth scroll to section
const smoothScrollToOverview = () => {
    const scrollTriggers = document.querySelectorAll('a[href="#program-overview"]');
    
    scrollTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.querySelector('.program-overview');
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    observeProgramOverview();
    parallaxCircles();
    animateCurve();
    enhanceCardInteractions();
    smoothScrollToOverview();
});

// Performance optimization: Use requestAnimationFrame for smooth animations
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Smooth scroll-based animations go here
            ticking = false;
        });
        ticking = true;
    }
});

/* ========================================
   SOLUTION SECTION - JAVASCRIPT ONLY
   ======================================== */

// Intersection Observer for scroll animations
const observeSolutionSection = () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger card animations sequentially
                const cards = entry.target.querySelectorAll('.solution-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    const section = document.querySelector('.solution-section');
    if (section) {
        observer.observe(section);
    }
};

// Parallax effect for decorative blobs
const parallaxBlobs = () => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const section = document.querySelector('.solution-section');
        
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Check if section is in viewport
            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const blobLeft = section.querySelector('.blob-left');
                const blobRight = section.querySelector('.blob-right');
                
                if (blobLeft) {
                    const speed = (scrolled - sectionTop) * 0.2;
                    blobLeft.style.transform = `translate(${speed}px, ${speed * 0.5}px)`;
                }
                
                if (blobRight) {
                    const speed = (scrolled - sectionTop) * 0.15;
                    blobRight.style.transform = `translate(${-speed}px, ${speed * 0.3}px)`;
                }
            }
        }
    });
};

// Enhanced card hover interactions
const enhanceSolutionCards = () => {
    const cards = document.querySelectorAll('.solution-card');
    
    cards.forEach(card => {
        // Mouse move effect - subtle tilt
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
        
        // Icon animation on card hover
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.animation = 'iconBounce 0.6s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
};

// Add icon bounce animation dynamically
const addIconAnimation = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes iconBounce {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.1) rotate(5deg); }
            50% { transform: scale(1.15) rotate(-5deg); }
            75% { transform: scale(1.1) rotate(3deg); }
        }
    `;
    document.head.appendChild(style);
};

// Animate SVG icons on scroll into view
const animateSVGIcons = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const svg = entry.target.querySelector('.icon-svg');
                if (svg) {
                    // Add fade and scale animation
                    svg.style.opacity = '0';
                    svg.style.transform = 'scale(0.5)';
                    
                    setTimeout(() => {
                        svg.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        svg.style.opacity = '1';
                        svg.style.transform = 'scale(1)';
                    }, 100);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.card-icon').forEach(icon => {
        observer.observe(icon);
    });
};

// Counter animation for stats (if you add numbers later)
const animateCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
};

// Smooth scroll to solution section
const smoothScrollToSolution = () => {
    const scrollTriggers = document.querySelectorAll('a[href="#solution"]');
    
    scrollTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const section = document.querySelector('.solution-section');
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    observeSolutionSection();
    parallaxBlobs();
    enhanceSolutionCards();
    addIconAnimation();
    animateSVGIcons();
    smoothScrollToSolution();
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations are handled in parallaxBlobs
    });
});

// Add resize listener for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate positions if needed
        const isMobile = window.innerWidth < 768;
        const cards = document.querySelectorAll('.solution-card');
        
        cards.forEach(card => {
            if (isMobile) {
                card.style.transform = '';
            }
        });
    }, 250);
});
// Impacts Section - Interactive Animations & Gauges

document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe impact cards
    document.querySelectorAll('.impact-card').forEach(card => {
        observer.observe(card);
    });

    // Observe survey cards
    document.querySelectorAll('.survey-card').forEach(card => {
        observer.observe(card);
    });

    // Initialize gauges when they become visible
    const gaugeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeGauges();
                gaugeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const studentExperience = document.querySelector('.student-experience');
    if (studentExperience) {
        gaugeObserver.observe(studentExperience);
    }
});

// Gauge Chart Initialization
function initializeGauges() {
    const gaugeConfig = {
        type: 'doughnut',
        options: {
            circumference: 180,
            rotation: -90,
            cutout: '75%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            animation: {
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutCubic'
            }
        }
    };

    // Satisfaction Gauge (4.75/5)
    const satisfactionCtx = document.getElementById('satisfactionGauge');
    if (satisfactionCtx) {
        new Chart(satisfactionCtx, {
            ...gaugeConfig,
            data: {
                datasets: [{
                    data: [4.75, 0.25],
                    backgroundColor: [
                        createGradient(satisfactionCtx, '#eb0029', '#ff4d6d'),
                        '#e5e7e7'
                    ],
                    borderWidth: 0
                }]
            }
        });
    }

    // Recommendation Gauge (9.52/10)
    const recommendCtx = document.getElementById('recommendGauge');
    if (recommendCtx) {
        new Chart(recommendCtx, {
            ...gaugeConfig,
            data: {
                datasets: [{
                    data: [9.52, 0.48],
                    backgroundColor: [
                        createGradient(recommendCtx, '#115a7f', '#4d9fd1'),
                        '#e5e7e7'
                    ],
                    borderWidth: 0
                }]
            }
        });
    }

    // NPS Gauge (87%)
    const npsCtx = document.getElementById('npsGauge');
    if (npsCtx) {
        new Chart(npsCtx, {
            ...gaugeConfig,
            data: {
                datasets: [{
                    data: [87, 13],
                    backgroundColor: [
                        createGradient(npsCtx, '#eb0029', '#115a7f'),
                        '#e5e7e7'
                    ],
                    borderWidth: 0
                }]
            }
        });
    }
}

// Create gradient for gauge
function createGradient(ctx, color1, color2) {
    const canvas = ctx.canvas;
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const impactsSection = document.querySelector('.impacts-section');
    if (!impactsSection) return;

    const rect = impactsSection.getBoundingClientRect();
    const scrolled = window.pageYOffset;
    
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = -(scrolled * 0.3);
        impactsSection.style.backgroundPosition = `center ${yPos}px`;
    }
});



