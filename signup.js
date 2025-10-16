const termsLabel = document.getElementById("termsLabel");
const termsCheckbox = document.getElementById("termsCheckbox");
const termsModal = document.getElementById("termsModal");
const acceptBtn = document.getElementById("acceptBtn");

const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const showModal = () => {
  // Show modal
  termsModal.style.display = "flex";
  acceptBtn.disabled = true;
  acceptBtn.classList.add("disabled-btn");
  acceptBtn.textContent = "Accept (scroll to enable)";

  const modalContent = termsModal.querySelector('.modal-content');
  const handleScroll = () => {
    if (isElementInViewport(acceptBtn)) {
      acceptBtn.disabled = false;
      acceptBtn.classList.remove("disabled-btn");
      acceptBtn.textContent = "Accept";
      modalContent.removeEventListener('scroll', handleScroll);
    }
  };

  modalContent.addEventListener('scroll', handleScroll);
};

termsLabel.addEventListener("click", showModal);

termsCheckbox.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the checkbox from being checked
  showModal();
});

// Accept and enable checkbox
acceptBtn.addEventListener("click", () => {
  termsCheckbox.checked = true;
  termsModal.style.display = "none";
});

// Close modal on outside click
window.addEventListener("click", function(e) {
  if (e.target === termsModal) {
    termsModal.style.display = "none";
  }
});

// Function to capitalize first letter
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to show error
function showError(id, message) {
  document.getElementById(id).textContent = message;
}

// Function to hide error
function hideError(id) {
  document.getElementById(id).textContent = '';
}

// Function to check for repeating letters (consecutive identical characters)
function hasRepeatingLetters(str) {
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      return true;
    }
  }
  return false;
}

// Signup logic
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Hide all errors first
  hideError("firstNameError");
  hideError("secondNameError");
  hideError("middleNameError");
  hideError("lastNameError");
  hideError("signupEmailError");
  hideError("signupPasswordError");
  hideError("termsError");

  let hasError = false;

  const firstName = document.getElementById("firstName").value.trim();
  const secondName = document.getElementById("secondName").value.trim();
  const middleName = document.getElementById("middleName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  
  if (!lastName) {
    showError("lastNameError", "Last Name is required.");
    hasError = true;
  } else if (hasRepeatingLetters(lastName)) {
    showError("lastNameError", "Repeating letters are not allowed.");
    hasError = true;
  }
  if (secondName && hasRepeatingLetters(secondName)) {
    showError("secondNameError", "Repeating letters are not allowed.");
    hasError = true;
  }
  if (middleName && hasRepeatingLetters(middleName)) {
    showError("middleNameError", "Repeating letters are not allowed.");
    hasError = true;
  }
  if (!email) {
    showError("signupEmailError", "Email is required.");
    hasError = true;
  } else if (email.length < 6) {
    showError("signupEmailError", "Email must be at least 6 characters long.");
    hasError = true;
  } else if (!email.toLowerCase().endsWith("@gmail.com")) {
    showError("signupEmailError", "Only Gmail addresses are allowed.");
    hasError = true;
  }
  if (!password) {
    showError("signupPasswordError", "Password is required.");
    hasError = true;
  } else if (password.length < 8) {
    showError("signupPasswordError", "Password must be at least 8 characters long.");
    hasError = true;
  }
  if (!termsCheckbox.checked) {
    showError("termsError", "You must accept the Terms and Conditions.");
    hasError = true;
  }

  if (hasError) return;

  // Capitalize
  const capitalizedFirstName = capitalize(firstName);
  const capitalizedSecondName = capitalize(secondName);
  const capitalizedMiddleName = capitalize(middleName);
  const capitalizedLastName = capitalize(lastName);
  const capitalizedEmail = capitalize(email);

  const userData = {
    firstName: capitalizedFirstName,
    secondName: capitalizedSecondName,
    middleName: capitalizedMiddleName,
    lastName: capitalizedLastName,
    email: capitalizedEmail,
    password
  };

  localStorage.setItem("user", JSON.stringify(userData));

  alert("Signup successful!");
  window.location.href = "index.html";
});

// Auto-capitalize first letter of firstname on input
document.getElementById("firstName").addEventListener("input", function() {
  const start = this.selectionStart;
  const end = this.selectionEnd;
  this.value = capitalize(this.value);
  this.setSelectionRange(start, end);
});

// Auto-capitalize first letter of second name on input
document.getElementById("secondName").addEventListener("input", function() {
  const start = this.selectionStart;
  const end = this.selectionEnd;
  this.value = capitalize(this.value);
  this.setSelectionRange(start, end);
});

// Auto-capitalize first letter of middle name on input
document.getElementById("middleName").addEventListener("input", function() {
  const start = this.selectionStart;
  const end = this.selectionEnd;
  this.value = capitalize(this.value);
  this.setSelectionRange(start, end);
});

// Auto-capitalize first letter of last name on input
document.getElementById("lastName").addEventListener("input", function() {
  const start = this.selectionStart;
  const end = this.selectionEnd;
  this.value = capitalize(this.value);
  this.setSelectionRange(start, end);
});

// Auto-capitalize first letter of email on input
document.getElementById("signupEmail").addEventListener("input", function() {
  const start = this.selectionStart;
  const end = this.selectionEnd;
  this.value = capitalize(this.value);
  this.setSelectionRange(start, end);
});