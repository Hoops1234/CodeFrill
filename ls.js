// LocalStorage Keys
const USERS_KEY = 'codefrill_users';
const CURRENT_USER_KEY = 'codefrill_current_user';
const REMEMBER_ME_KEY = 'codefrill_remember_me';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    checkExistingSession();
    
    // Pre-fill email if remember me was checked
    loadRememberedEmail();
    
    // Add form event listeners
    setupFormListeners();
});

// Check if user has an existing session
function checkExistingSession() {
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUser) {
        // User is already logged in, redirect to homepage
        // Can be uncommented if auto-redirect is desired
        // window.location.href = 'index.html';
    }
}

// Load remembered email
function loadRememberedEmail() {
    const remembered = localStorage.getItem(REMEMBER_ME_KEY);
    if (remembered) {
        const email = localStorage.getItem('codefrill_remembered_email');
        if (email) {
            document.getElementById('loginEmail').value = email;
            document.getElementById('rememberMe').checked = true;
        }
    }
}

// Setup form event listeners
function setupFormListeners() {
    // Login Form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Signup Form
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    
    // Forgot Password Form
    document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
}

// Toggle between login and signup forms
function showForm(formName) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    
    // Hide all forms first
    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
    forgotPasswordForm.classList.remove('active');
    
    // Show selected form
    if (formName === 'login') {
        loginForm.classList.add('active');
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
    } else if (formName === 'signup') {
        signupForm.classList.add('active');
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
    }
}

// Toggle password visibility
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Show forgot password form
function showForgotPassword() {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    
    loginForm.classList.remove('active');
    forgotPasswordForm.classList.add('active');
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
}

// Show terms modal
function showTerms() {
    const modal = document.getElementById('termsModal');
    modal.classList.add('show');
}

// Close terms modal
function closeTerms() {
    const modal = document.getElementById('termsModal');
    modal.classList.remove('show');
}

// Accept terms
function acceptTerms() {
    document.getElementById('termsAccepted').checked = true;
    closeTerms();
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful
        // Store current user
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        
        // Handle remember me
        if (rememberMe) {
            localStorage.setItem(REMEMBER_ME_KEY, 'true');
            localStorage.setItem('codefrill_remembered_email', email);
        } else {
            localStorage.removeItem(REMEMBER_ME_KEY);
            localStorage.removeItem('codefrill_remembered_email');
        }
        
        // Show success message and redirect
        alert('Login successful! Redirecting to homepage...');
        window.location.href = 'index.html';
    } else {
        // Login failed
        alert('Invalid email or password. Please try again.');
    }
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const termsAccepted = document.getElementById('termsAccepted').checked;
    
    // Validate password length
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    
    // Check if terms are accepted
    if (!termsAccepted) {
        alert('Please accept the Terms of Service to continue.');
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        alert('An account with this email already exists. Please login or use a different email.');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    // Add to users array
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Auto-login after signup
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    
    // Show success message and redirect
    alert('Account created successfully! Redirecting to homepage...');
window.location.href = 'index.html';
        }

// Handle Forgot Password
function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgotEmail').value.trim();
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Find user with matching email
    const user = users.find(u => u.email === email);
    
    if (user) {
        // In a real application, you would send an email with reset link
        // For demo purposes, we'll show the password directly
        alert(`Your password is: ${user.password}\n\nIn a production environment, a password reset link would be sent to your email.`);
    } else {
        alert('No account found with this email address.');
    }
}

// Logout function (can be called from other pages)
function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = 'ls.html';
}

// Check if user is authenticated (can be called from other pages)
function isAuthenticated() {
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    return currentUser !== null;
}

// Get current user (can be called from other pages)
function getCurrentUser() {
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    return currentUser ? JSON.parse(currentUser) : null;
}

// Make functions available globally
window.showForm = showForm;
window.togglePassword = togglePassword;
window.showForgotPassword = showForgotPassword;
window.showTerms = showTerms;
window.closeTerms = closeTerms;
window.acceptTerms = acceptTerms;
window.logout = logout;
window.isAuthenticated = isAuthenticated;
window.getCurrentUser = getCurrentUser;
