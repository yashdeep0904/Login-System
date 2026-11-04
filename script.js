document.addEventListener("DOMContentLoaded", () => {
    // Sections
    const loginSection = document.getElementById("login-section");
    const signupSection = document.getElementById("signup-section");
    const logoutSection = document.getElementById("logout-section");
    
    // Forms & Inputs
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const emailInput = document.getElementById("email");
    const emailIcon = document.getElementById("email-icon");
    const emailFeedback = document.getElementById("email-feedback");
    const passwordInput = document.getElementById("password");
    
    // Toggles & Buttons
    const togglePasswordBtn = document.getElementById("toggle-password");
    const strengthText = document.getElementById("strength-text");
    const strengthBar = document.getElementById("strength-bar");
    const rememberMeCheck = document.getElementById("remember-me");
    const logoutBtn = document.getElementById("logout-btn");
    const goToSignup = document.getElementById("go-to-signup");
    const goToLogin = document.getElementById("go-to-login");
    const dashboardUsername = document.getElementById("dashboard-username");

    // Email Regex Pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check Session Persistence on load
    if (localStorage.getItem("blueTechSession") === "active") {
        dashboardUsername.textContent = `Welcome, ${localStorage.getItem("blueTechUser") || "User"}`;
        showSection(logoutSection);
    }

    // Toggle Form Views
    goToSignup.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(signupSection);
    });

    goToLogin.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(loginSection);
    });

    // Email Validation (Login)
    emailInput.addEventListener("input", (e) => {
        const val = e.target.value;
        if (val.length === 0) {
            emailIcon.textContent = "";
            emailFeedback.textContent = "";
        } else if (emailRegex.test(val)) {
            emailIcon.textContent = "✓";
            emailIcon.style.color = "var(--success-color)";
            emailFeedback.textContent = "Valid email";
            emailFeedback.style.color = "var(--success-color)";
        } else {
            emailIcon.textContent = "✗";
            emailIcon.style.color = "var(--danger-color)";
            emailFeedback.textContent = "Invalid email format";
            emailFeedback.style.color = "var(--danger-color)";
        }
    });

    // Password Visibility Toggle (Login)
    togglePasswordBtn.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        togglePasswordBtn.textContent = type === "password" ? "👁️" : "🙈";
    });

    // Password Strength Meter (Login)
    passwordInput.addEventListener("input", (e) => {
        const val = e.target.value;
        let strength = 0;

        if (val.length >= 8) strength += 1;
        if (/[A-Z]/.test(val)) strength += 1;
        if (/[0-9]/.test(val)) strength += 1;
        if (/[^A-Za-z0-9]/.test(val)) strength += 1;

        updateStrengthUI(strength, val.length);
    });

    function updateStrengthUI(score, length) {
        if (length === 0) {
            strengthBar.style.width = "0%";
            strengthText.textContent = "None";
            strengthText.style.color = "var(--text-secondary)";
            return;
        }

        switch (score) {
            case 1:
            case 2:
                strengthBar.style.width = "33%";
                strengthBar.style.backgroundColor = "var(--danger-color)";
                strengthText.textContent = "Weak";
                strengthText.style.color = "var(--danger-color)";
                break;
            case 3:
                strengthBar.style.width = "66%";
                strengthBar.style.backgroundColor = "var(--warning-color)";
                strengthText.textContent = "Medium";
                strengthText.style.color = "var(--warning-color)";
                break;
            case 4:
                strengthBar.style.width = "100%";
                strengthBar.style.backgroundColor = "var(--success-color)";
                strengthText.textContent = "Strong";
                strengthText.style.color = "var(--success-color)";
                break;
            default:
                strengthBar.style.width = "10%";
                strengthBar.style.backgroundColor = "var(--danger-color)";
                strengthText.textContent = "Too Short";
                strengthText.style.color = "var(--danger-color)";
        }
    }

    // Sign Up Form Submit
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const pass = document.getElementById("signup-password").value;
        const confirmPass = document.getElementById("confirm-password").value;

        if (pass !== confirmPass) {
            alert("Passwords do not match!");
            return;
        }

        if (pass.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        // Fetch existing users from local storage
        let users = JSON.parse(localStorage.getItem("blueTechUsers") || "{}");

        if (users[email]) {
            alert("An account with this email already exists. Please log in.");
            return;
        }

        // Save new user account
        users[email] = { name: name, password: pass };
        localStorage.setItem("blueTechUsers", JSON.stringify(users));

        // Auto-login after creation
        localStorage.setItem("blueTechSession", "active");
        localStorage.setItem("blueTechUser", name.split(" ")[0]); 
        dashboardUsername.textContent = `Welcome, ${name.split(" ")[0]}`;
        
        signupForm.reset();
        showSection(logoutSection);
    });

    // Login Form Submit
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const enteredEmail = emailInput.value;
        const enteredPass = passwordInput.value;

        if (!emailRegex.test(enteredEmail)) {
            alert("Please enter a valid email format.");
            return;
        }

        // Fetch registered users
        let users = JSON.parse(localStorage.getItem("blueTechUsers") || "{}");

        // Verify account existence and password
        if (!users[enteredEmail]) {
            alert("No account found with this email. Please create an account first.");
            return;
        }

        if (users[enteredEmail].password !== enteredPass) {
            alert("Incorrect password. Please try again.");
            return;
        }
        
        // Successful Login
        const userName = users[enteredEmail].name.split(" ")[0];
        
        if (rememberMeCheck.checked) {
            localStorage.setItem("blueTechSession", "active");
            localStorage.setItem("blueTechUser", userName);
        } else {
            sessionStorage.setItem("blueTechSession", "active");
            sessionStorage.setItem("blueTechUser", userName);
        }
        
        dashboardUsername.textContent = `Welcome, ${userName}`;
        showSection(logoutSection);
    });

    // Logout Action
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("blueTechSession");
        sessionStorage.removeItem("blueTechSession");
        
        loginForm.reset();
        emailIcon.textContent = "";
        emailFeedback.textContent = "";
        strengthBar.style.width = "0%";
        strengthText.textContent = "None";
        strengthText.style.color = "var(--text-secondary)";
        
        showSection(loginSection);
    });

    // Utility function to handle section visibility
    function showSection(sectionToShow) {
        loginSection.classList.add("hidden");
        signupSection.classList.add("hidden");
        logoutSection.classList.add("hidden");
        
        sectionToShow.classList.remove("hidden");
    }
});