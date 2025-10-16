// Authentication check
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated
    if (typeof auth !== 'undefined') {
        if (!auth.requireAuth()) {
            return; // Will redirect to login
        }

        // User is authenticated, show welcome message
        const user = auth.getCurrentUser();
        if (user) {
            // Update welcome message with user's name
            const welcomeElement = document.querySelector('h1, .welcome-message, .user-greeting');
            if (welcomeElement) {
                welcomeElement.textContent = `Welcome back, ${user.firstName || user.email}!`;
            }

            // Add logout functionality
            addLogoutButton();
        }
    }
});

// Function to add logout button
function addLogoutButton() {
    // Check if current page is userprofile.html
    const isUserProfilePage = (
        document.title.includes('User Profile') ||
        document.querySelector('.sidebar') !== null ||
        window.location.pathname.includes('userprofile.html')
    );

    // Only add logout button if on user profile page
    if (!isUserProfilePage) {
        return;
    }

    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout';
    logoutBtn.className = 'logout-btn';
    logoutBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 8px 16px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        z-index: 1000;
    `;

    logoutBtn.addEventListener('click', function() {
        if (typeof auth !== 'undefined') {
            auth.logout();
            alert('Logged out successfully!');
            window.location.href = 'login.html';
        }
    });

    document.body.appendChild(logoutBtn);
}

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

        const swiper = new Swiper(swiperContainer, {
            loop: true,
            spaceBetween: 20,
            slidesPerView: 2,
            centeredSlides: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active'
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    centeredSlides: true,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    centeredSlides: false,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    centeredSlides: false,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    centeredSlides: false,
                },
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

// Dark mode toggle functionality
window.addEventListener('darkModeToggle', () => {

});