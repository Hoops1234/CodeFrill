const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedMode = localStorage.getItem('darkMode');

// Animation function
function animateIcon(icon, toSun) {
    icon.classList.add('spin-animation');
    setTimeout(() => {
        icon.classList.remove('fa-moon', 'fa-sun');
        icon.classList.add(toSun ? 'fa-sun' : 'fa-moon');
        icon.classList.remove('spin-animation');
    }, 300);
}

// Set initial icon
function setInitialIcon() {
    if (!darkModeIcon) return;
    if (document.body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
    }
}

if (savedMode === 'enabled' || (!savedMode && prefersDark)) {
    document.body.classList.add('dark-mode');
}
setInitialIcon();

if (darkModeToggle && darkModeIcon) {
    darkModeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        animateIcon(darkModeIcon, isDark);
        if(isDark) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
        // Dispatch a custom event to notify other pages or scripts
        window.dispatchEvent(new Event('darkModeToggle'));
    });
}