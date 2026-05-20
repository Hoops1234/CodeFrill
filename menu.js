document.addEventListener('DOMContentLoaded', function() {
    const menuOpenButton = document.getElementById('menu-open-button');
    const menuCloseButton = document.getElementById('menu-close-button');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (menuOpenButton && navMenu) {
        menuOpenButton.addEventListener('click', function() {
            navMenu.classList.add('active');
            if (menuCloseButton) {
                menuCloseButton.classList.add('active');
            }
            body.classList.add('menu-open');
        });
    }

    if (menuCloseButton && navMenu) {
        menuCloseButton.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuCloseButton.classList.remove('active');
            body.classList.remove('menu-open');
        });
    }

    // Close menu when clicking on a nav link (for mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuCloseButton) {
                    menuCloseButton.classList.remove('active');
                }
                body.classList.remove('menu-open');
            }
        });
    });
});