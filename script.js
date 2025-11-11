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
                    data: [54, 77, 110, 170, 199],
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