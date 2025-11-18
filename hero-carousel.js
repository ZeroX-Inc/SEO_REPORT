// Hero Carousel Auto-Scroll Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let autoScrollInterval;

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');

        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-scroll every 5 seconds
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 5000);
    }

    // Stop auto-scroll
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            // Restart auto-scroll after manual interaction
            stopAutoScroll();
            startAutoScroll();
        });
    });

    // Pause auto-scroll on hover
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', stopAutoScroll);
        heroCarousel.addEventListener('mouseleave', startAutoScroll);
    }

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const activeSlide = document.querySelector('.carousel-slide.active .slide-image');
        const heroContent = document.querySelector('.hero-content-wrapper');

        if (activeSlide) {
            activeSlide.style.transform = `scale(1.1) translateY(${scrolled * 0.5}px)`;
        }

        if (heroContent) {
            const opacity = 1 - (scrolled / (window.innerHeight * 0.6));
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
        }
    });

    // Start auto-scroll on page load
    startAutoScroll();

    console.log('Hero carousel initialized with auto-scroll');
});
