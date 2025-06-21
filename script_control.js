document.addEventListener("DOMContentLoaded", () => {
  const signInBtn = document.querySelector("#sign-in-btn")
  const signUpBtn = document.querySelector("#sign-up-btn")
  const container = document.querySelector(".container")
  const loginForm = document.getElementById("loginForm")
  const signupForm = document.getElementById("signupForm")
  const loadingOverlay = document.getElementById("loadingOverlay")
  const alertMessage = document.getElementById("alertMessage")
  const alertText = document.getElementById("alertText")
  const alertClose = document.getElementById("alertClose")

  // SheetDB API URL
  const SHEET_API = "https://sheetdb.io/api/v1/dkopl1ckwnots"

  // Toggle between sign in and sign up forms
  signUpBtn.addEventListener("click", () => {
    container.classList.add("sign-up-mode")
    // Add animation to form fields
    animateFormFields(document.querySelector(".sign-up-form"))
  })

  signInBtn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode")
    // Add animation to form fields
    animateFormFields(document.querySelector(".sign-in-form"))
  })

  // Animate form fields when switching between forms
  function animateFormFields(form) {
    const fields = form.querySelectorAll(".input-field")
    fields.forEach((field, index) => {
      field.style.animation = `fadeInUp 0.5s forwards ${index * 0.1}s`
      field.style.opacity = "0"
      field.style.transform = "translateY(20px)"
    })
  }

  // Add CSS animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `
  document.head.appendChild(style)

  // Show loading overlay
  function showLoading() {
    loadingOverlay.classList.add("active")
  }

  // Hide loading overlay
  function hideLoading() {
    loadingOverlay.classList.remove("active")
  }

  // Show alert message
  function showAlert(message, type = "success") {
    alertText.textContent = message
    alertMessage.className = "alert-message show " + type

    // Auto hide after 5 seconds
    setTimeout(() => {
      hideAlert()
    }, 5000)
  }

  // Hide alert message
  function hideAlert() {
    alertMessage.classList.remove("show")
  }

  // Close alert on button click
  alertClose.addEventListener("click", hideAlert)

  // Handle login form submission
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = document.getElementById("loginUsername").value
    const password = document.getElementById("loginPassword").value

    if (!username || !password) {
      showAlert("Please fill in all fields", "error")
      return
    }

    showLoading()

    try {
      // Fetch users from SheetDB API
      const response = await fetch(SHEET_API)
      const users = await response.json()

      // Check if user exists
      const user = users.find((u) => (u.username === username || u.email === username) && u.password === password)

      if (user) {
        showAlert("Login successful! Redirecting...", "success")

        // Redirect to another page after successful login
        setTimeout(() => {
          window.location.href = "control_room.html" // Change 'dashboard.html' to your desired page
        }, 2000)
      } else {
        showAlert("Invalid username or password", "error")
      }
    } catch (error) {
      console.error("Login error:", error)
      showAlert("An error occurred. Please try again later.", "error")
    } finally {
      hideLoading()
    }
  })

  // Handle signup form submission
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = document.getElementById("signupUsername").value
    const email = document.getElementById("signupEmail").value
    const password = document.getElementById("signupPassword").value
    const confirmPassword = document.getElementById("confirmPassword").value

    if (!username || !email || !password || !confirmPassword) {
      showAlert("Please fill in all fields", "error")
      return
    }

    if (password !== confirmPassword) {
      showAlert("Passwords do not match", "error")
      return
    }

    showLoading()

    try {
      // Check if user already exists
      const checkResponse = await fetch(SHEET_API)
      const users = await checkResponse.json()

      const userExists = users.some((u) => u.username === username || u.email === email)

      if (userExists) {
        showAlert("Username or email already exists", "error")
        hideLoading()
        return
      }

      // Add new user to SheetDB
      const addResponse = await fetch(SHEET_API, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })

      if (addResponse.ok) {
        showAlert("Account created successfully! Please sign in.", "success")

        // Clear form fields
        signupForm.reset()

        // Switch to sign in form after successful signup
        setTimeout(() => {
          container.classList.remove("sign-up-mode")
          animateFormFields(document.querySelector(".sign-in-form"))
        }, 2000)
      } else {
        showAlert("Failed to create account. Please try again.", "error")
      }
    } catch (error) {
      console.error("Signup error:", error)
      showAlert("An error occurred. Please try again later.", "error")
    } finally {
      hideLoading()
    }
  })

  // Add input field animations
  const inputFields = document.querySelectorAll(".input-field")
  inputFields.forEach((field) => {
    const input = field.querySelector("input")

    input.addEventListener("focus", () => {
      field.style.transform = "translateY(-5px)"
      field.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
    })

    input.addEventListener("blur", () => {
      field.style.transform = ""
      field.style.boxShadow = ""
    })
  })

  // Create placeholder SVG files for the illustrations
  createPlaceholderSVGs()
})

// Create placeholder SVG files since we don't have actual illustrations
function createPlaceholderSVGs() {
  // Create img directory if it doesn't exist
  const imgDir = document.createElement("div")
  imgDir.id = "img-directory"
  imgDir.style.display = "none"
  document.body.appendChild(imgDir)

  // Login illustration
  const loginSvg = document.createElement("div")
  loginSvg.innerHTML = `
        <svg id="login-svg" xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
            <style>
                .st0{fill:#4481EB;}
                .st1{fill:#04BEFE;}
                .st2{opacity:0.1;}
                .st3{fill:#FFFFFF;}
            </style>
            <circle class="st0" cx="250" cy="250" r="200"/>
            <path class="st1" d="M170,150c30-20,80-30,130-10c50,20,90,80,90,140c0,60-40,120-100,140c-60,20-140,0-180-60 c-40-60-40-160,0-180C150,160,140,170,170,150z" />
            <g class="st2">
                <circle cx="250" cy="180" r="40"/>
                <path d="M200,250c0-30,20-50,50-50s50,20,50,50v30c0,0-20,40-50,40s-50-40-50-40V250z"/>
                <rect x="200" y="280" width="100" height="70" rx="10"/>
            </g>
            <circle class="st3" cx="250" cy="170" r="30"/>
            <path class="st3" d="M210,230c0-20,18-40,40-40s40,20,40,40v20c0,0-15,30-40,30s-40-30-40-30V230z"/>
            <rect class="st3" x="210" y="250" width="80" height="60" rx="8"/>
        </svg>
    `
  imgDir.appendChild(loginSvg)

  // Register illustration
  const registerSvg = document.createElement("div")
  registerSvg.innerHTML = `
        <svg id="register-svg" xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
            <style>
                .st0{fill:#4481EB;}
                .st1{fill:#04BEFE;}
                .st2{opacity:0.1;}
                .st3{fill:#FFFFFF;}
            </style>
            <circle class="st1" cx="250" cy="250" r="200"/>
            <path class="st0" d="M330,150c-30-20-80-30-130-10c-50,20-90,80-90,140c0,60,40,120,100,140c60,20,140,0,180-60 c40-60,40-160,0-180C350,160,360,170,330,150z" />
            <g class="st2">
                <rect x="150" y="150" width="200" height="200" rx="10"/>
                <line x1="150" y1="190" x2="350" y2="190" stroke="#000" stroke-width="2"/>
                <circle cx="170" cy="170" r="10"/>
                <circle cx="200" cy="170" r="10"/>
                <circle cx="230" cy="170" r="10"/>
                <rect x="180" y="220" width="140" height="20" rx="5"/>
                <rect x="180" y="260" width="140" height="20" rx="5"/>
                <rect x="180" y="300" width="140" height="20" rx="5"/>
            </g>
            <rect class="st3" x="160" y="140" width="180" height="180" rx="8"/>
            <line x1="160" y1="175" x2="340" y2="175" stroke="#FFFFFF" stroke-width="2"/>
            <circle class="st0" cx="175" cy="158" r="8"/>
            <circle class="st0" cx="200" cy="158" r="8"/>
            <circle class="st0" cx="225" cy="158" r="8"/>
            <rect class="st0" x="190" y="200" width="120" height="15" rx="4"/>
            <rect class="st0" x="190" y="235" width="120" height="15" rx="4"/>
            <rect class="st0" x="190" y="270" width="120" height="15" rx="4"/>
        </svg>
    `
  imgDir.appendChild(registerSvg)

  // Set the SVG as source for the images
  document.querySelectorAll(".image").forEach((img, index) => {
    if (index === 0) {
      img.src = "data:image/svg+xml;base64," + btoa(document.getElementById("login-svg").outerHTML)
    } else {
      img.src = "data:image/svg+xml;base64," + btoa(document.getElementById("register-svg").outerHTML)
    }
  })
}
