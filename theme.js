const colorThemes = {
    default: {
        name: 'Default',
        primary: '#A7BFA4',
        dark: '#2E2E2E',
        white: '#F5F5F3'
    },
    blue: {
        name: 'Ocean Blue',
        primary: '#64b5f6',
        dark: '#0d47a1',
        white: '#bbdefb'
    },
    purple: {
        name: 'Royal Purple',
        primary: '#ce93d8',
        dark: '#4a148c',
        white: '#f3e5f5'
    },
    green: {
        name: 'Forest Green',
        primary: '#81c784',
        dark: '#1b5e20',
        white: '#e8f5e9'
    },
    orange: {
        name: 'Sunset Orange',
        primary: '#ffb74d',
        dark: '#e65100',
        white: '#fff3e0'
    },
    pink: {
        name: 'Rose Pink',
        primary: '#f48fb1',
        dark: '#880e4f',
        white: '#fce4ec'
    },
    teal: {
        name: 'Teal',
        primary: '#4db6ac',
        dark: '#004d40',
        white: '#e0f2f1'
    },
    red: {
        name: 'Crimson Red',
        primary: '#ef5350',
        dark: '#b71c1c',
        white: '#ffcdd2'
    },
    yellow: {
        name: 'Golden Yellow',
        primary: '#ffd54f',
        dark: '#f57f17',
        white: '#fff9c4'
    },
    indigo: {
        name: 'Indigo',
        primary: '#7986cb',
        dark: '#1a237e',
        white: '#c5cae9'
    },
    cyan: {
        name: 'Cyan',
        primary: '#4dd0e1',
        dark: '#006064',
        white: '#b2ebf2'
    },
    amber: {
        name: 'Amber',
        primary: '#ffca28',
        dark: '#ff6f00',
        white: '#ffecb3'
    },
    lime: {
        name: 'Lime',
        primary: '#aed581',
        dark: '#33691e',
        white: '#f1f8e9'
    },
    brown: {
        name: 'Coffee Brown',
        primary: '#a1887f',
        dark: '#3e2723',
        white: '#d7ccc8'
    },
    grey: {
        name: 'Steel Grey',
        primary: '#90a4ae',
        dark: '#263238',
        white: '#cfd8dc'
    },
    deepPurple: {
        name: 'Deep Purple',
        primary: '#b39ddb',
        dark: '#311b92',
        white: '#ede7f6'
    },
    lightBlue: {
        name: 'Light Blue',
        primary: '#81d4fa',
        dark: '#0277bd',
        white: '#e1f5fe'
    }
};

function applyColorTheme(themeName) {
    const theme = colorThemes[themeName] || colorThemes.default;
    
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--dark-color', theme.dark);
    document.documentElement.style.setProperty('--white-color', theme.white);
    
    localStorage.setItem('color-theme', themeName);
    localStorage.setItem('site-theme', themeName);
    
    window.dispatchEvent(new CustomEvent('colorThemeChange', { detail: { theme: themeName } }));
}

function initColorTheme() {
    const savedTheme = localStorage.getItem('color-theme') || 'default';
    applyColorTheme(savedTheme);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColorTheme);
} else {
    initColorTheme();
}

window.addEventListener('storage', function(e) {
    if (e.key === 'color-theme') {
        applyColorTheme(e.newValue || 'default');
    }
});

setInterval(function() {
    const currentTheme = localStorage.getItem('color-theme');
    const savedTheme = localStorage.getItem('color-theme');
    if (currentTheme !== savedTheme) {
        applyColorTheme(savedTheme);
    }
}, 1000);