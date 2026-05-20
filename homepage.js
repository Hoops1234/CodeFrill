// Menu button functionality for media screen
const menuOpenButton = document.getElementById('menu-open-button');
const menuCloseButton = document.getElementById('menu-close-button');
const navMenu = document.querySelector('.nav-menu');

if (menuOpenButton && menuCloseButton && navMenu) {
    menuOpenButton.addEventListener('click', () => {
        document.body.classList.add('show-mobile-menu');
    });

    menuCloseButton.addEventListener('click', () => {
        document.body.classList.remove('show-mobile-menu');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('show-mobile-menu');
    });
});

// Modal functionality
function openModal() {
    console.log('Opening modal...');
    const modal = document.getElementById('coursesModal');
    const body = document.body;

    if (!modal) {
        console.error('Modal element not found!');
        return;
    }

    modal.classList.add('show');
    body.classList.add('modal-open');
    console.log('Modal opened, initializing Swiper...');

    // Initialize Swiper with a simpler, more reliable approach
    initializeSwiper();
}

function initializeSwiper() {
    const modal = document.getElementById('coursesModal');
    if (!modal) {
        console.error('Modal not found!');
        return;
    }

    const swiperContainer = modal.querySelector('.swiper');
    if (!swiperContainer) {
        console.error('Swiper container not found!');
        return;
    }

    // Check if Swiper is loaded
    if (typeof Swiper === 'undefined') {
        console.log('Swiper not loaded yet, retrying in 100ms...');
        setTimeout(initializeSwiper, 100);
        return;
    }

    try {
        // Destroy existing swiper instance if it exists
        if (swiperContainer.swiper) {
            swiperContainer.swiper.destroy();
        }

        const getSlidesPerView = () => {
            const width = window.innerWidth;
            if (width >= 768) return 2;
            return 1;
        };

        const swiper = new Swiper(swiperContainer, {
            loop: true,
            spaceBetween: 20,
            slidesPerView: getSlidesPerView(),
            centeredSlides: true,
            speed: 600,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                    centeredSlides: true
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    centeredSlides: true
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    centeredSlides: false
                }
            },
            on: {
                init: function() {
                    console.log('Swiper initialized successfully with', this.slides.length, 'slides');
                },
                slideChange: function() {
                    console.log('Slide changed to:', this.activeIndex);
                }
            }
        });

        console.log('Swiper instance created successfully');
    } catch (error) {
        console.error('Error initializing Swiper:', error);
    }
}

function closeModal() {
    const modal = document.getElementById('coursesModal');
    const body = document.body;

    modal.classList.remove('show');
    body.classList.remove('modal-open');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeModal');
    const modal = document.getElementById('coursesModal');

    // Close modal when clicking close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside modal content
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});