// Get buttons and modals
const loginButton = document.getElementById("loginbutton");
const signupButton = document.getElementById("signupbutton");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const switchToSignup = document.getElementById("switchtosignup");
const switchToLogin = document.getElementById("switchtologin");

// Simulated database (localStorage)
let users = JSON.parse(localStorage.getItem("users")) || {};

// Function to toggle modals correctly
function showModal(modal) {
    modal.style.display = "flex"; // Show
}
function hideModal(modal) {
    modal.style.display = "none"; // Hide
}

// Function to display messages
function displayMessage(element, message, color) {
    element.textContent = message;
    element.style.color = color;
    element.style.display = "block";

    // Hide message after 5 seconds
    setTimeout(() => {
        element.textContent = "";
        element.style.display = "none";
    }, 5000);
}

// Show Login Modal
loginButton.addEventListener("click", () => showModal(loginModal));

// Show Signup Modal
signupButton.addEventListener("click", () => showModal(signupModal));

// Switch to Signup Modal
switchToSignup.addEventListener("click", (event) => {
    event.preventDefault();
    hideModal(loginModal);
    showModal(signupModal);
});

// Switch to Login Modal
switchToLogin.addEventListener("click", (event) => {
    event.preventDefault();
    hideModal(signupModal);
    showModal(loginModal);
});

// Close modals using the close button
document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
        const modalId = this.getAttribute("data-modal");
        hideModal(document.getElementById(modalId));
    });
});

// Handle Signup Form Submission
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const signupMessage = document.getElementById("signupMessage");

    // Validation
    if (password !== confirmPassword) {
        displayMessage(signupMessage, "Passwords do not match!", "red");
        return;
    }

    if (users[email]) {
        displayMessage(signupMessage, "Email is already registered! Try logging in.", "red");
        return;
    }

    // Store user data
    users[email] = { firstName, lastName, password };
    localStorage.setItem("users", JSON.stringify(users));

    displayMessage(signupMessage, "Signup successful! You can now log in.", "green");

    setTimeout(() => {
        hideModal(signupModal);
        showModal(loginModal);
    }, 3000);
});

// Handle Login Form Submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const loginMessage = document.getElementById("loginMessage");

    if (!users[email]) {
        displayMessage(loginMessage, "Email not registered. Please sign up first.", "red");
        return;
    }

    if (users[email].password !== password) {
        displayMessage(loginMessage, "Incorrect password. Try again.", "red");
        return;
    }

    displayMessage(loginMessage, "Login successful!", "green");

    setTimeout(() => {
        hideModal(loginModal);
        alert(`Welcome, ${users[email].firstName}!`);
    }, 1000);
});
