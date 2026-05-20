// Authentication Manager
class AuthManager {
    constructor() {
        this.AUTH_KEY = 'isAuthenticated';
        this.USER_KEY = 'user';
    }

    // Check if user is authenticated
    isAuthenticated() {
        return localStorage.getItem(this.AUTH_KEY) === 'true';
    }

    // Get current user data
    getCurrentUser() {
        const userData = localStorage.getItem(this.USER_KEY);
        return userData ? JSON.parse(userData) : null;
    }

    // Login user
    login(userData) {
        localStorage.setItem(this.AUTH_KEY, 'true');
        localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
    }

    // Logout user
    logout() {
        localStorage.removeItem(this.AUTH_KEY);
        localStorage.removeItem(this.USER_KEY);
        // Clear session storage as well
        sessionStorage.clear();
    }

    // Check authentication and redirect if needed
    requireAuth(redirectTo = 'login.html') {
        if (!this.isAuthenticated()) {
            window.location.href = redirectTo;
            return false;
        }
        return true;
    }
}

// Create global auth instance
const auth = new AuthManager();