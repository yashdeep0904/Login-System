Authentication System

A modern, Cyber/Blue Tech themed authentication interface featuring a fully functional frontend login, sign-up, and logout flow. This project simulates a backend database by securely utilizing the browser's localStorage to register users, validate credentials, and maintain session state.

🚀 Features

Dynamic UI Toggling: Seamlessly switch between the "Create Account", "Sign In", and "Dashboard/Logout" interfaces without reloading the page.

Account Registration: Users can create an account. The system validates that passwords match and meet minimum length requirements. User data is stored locally.

Secure Login Validation:

Verifies if the entered email exists in the local "database".

Authenticates the password against the stored credentials.

Real-time Email Validation: Uses Regex to provide instant visual feedback (✓ or ✗) on whether the entered email format is valid.

Password Strength Meter: Calculates password strength in real-time based on length, capitalization, numbers, and special characters, visually updating a progress bar.

Password Visibility Toggle: Allows users to reveal or hide their password input using an eye icon.

Session Persistence: Features a "Remember User Session" checkbox. If checked, the session survives browser restarts (using localStorage). If unchecked, the session expires when the tab is closed (using sessionStorage).

📁 File Structure

The project is cleanly separated into three core web technologies:

index.html - Contains the semantic structure for the Sign Up, Login, and Dashboard sections.

style.css - Contains all the styling, CSS variables, and glassmorphism/neon-glow effects for the "Blue Tech" aesthetic.

script.js - Contains the DOM manipulation, form validation logic, password strength algorithms, and localStorage mock-database handling.

🛠️ Technologies Used

HTML5

CSS3 (Flexbox, CSS Variables, Custom UI styling)

Vanilla JavaScript (ES6)

💻 How to Run

Download or clone the repository containing the three files (index.html, style.css, script.js).

Ensure all three files are located in the same directory.

Open index.html in any modern web browser (Chrome, Firefox, Safari, Edge).

Usage Flow:

Click "Create an account" at the bottom of the login form.

Fill out your details to register. The system will automatically log you in upon successful creation.

Click "Log Out Securely".

Try logging in with the credentials you just created. Try entering a wrong password or unregistered email to see the error handling in action!

⚠️ Note on Security

This project is designed for UI/UX demonstration and frontend logic practice. Because it uses the browser's localStorage to save user credentials (including plain-text passwords), it should never be used for real-world production authentication without a proper secure backend (like Node.js, Python, PHP) and database (like PostgreSQL, MongoDB) handling password hashing (e.g., bcrypt) and secure JWT/Session cookies.