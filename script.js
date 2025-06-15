// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
  }
})

// Mobile menu toggle
const menuBtn = document.querySelector(".menu-btn")
const navMenu = document.querySelector(".nav-menu")

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })
}

// Reservation form handling
const reservationForm = document.getElementById("reservationForm")
if (reservationForm) {
  reservationForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const roomType = formData.get("roomType")
    const checkin = formData.get("checkin")
    const checkout = formData.get("checkout")

    if (name && email && phone && roomType && checkin && checkout) {
      // Create WhatsApp message
      const message = `Hotel Bhavani Udupi - New Reservation Request

Name: ${name}
Email: ${email}
Phone: ${phone}
Room Type: ${roomType}
Check-in: ${checkin}
Check-out: ${checkout}

Please confirm availability and pricing.`

      // Replace with your actual WhatsApp number
      const whatsappNumber = "91XXXXXXXXXX"
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

      // Open WhatsApp
      window.open(whatsappURL, "_blank")

      alert(`Thank you ${name}! Your reservation request has been sent via WhatsApp.`)
      this.reset()
    } else {
      alert("Please fill in all required fields.")
    }
  })
}

// Book Now button functionality
document.querySelectorAll(".book-now-btn, .room-book-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#contact").scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Set minimum date to today
const today = new Date().toISOString().split("T")[0]
const checkinInput = document.querySelector('input[name="checkin"]')
const checkoutInput = document.querySelector('input[name="checkout"]')

if (checkinInput) {
  checkinInput.setAttribute("min", today)
}

// Set minimum checkout date based on checkin
if (checkinInput && checkoutInput) {
  checkinInput.addEventListener("change", function () {
    const checkinDate = new Date(this.value)
    checkinDate.setDate(checkinDate.getDate() + 1)
    const minCheckout = checkinDate.toISOString().split("T")[0]
    checkoutInput.setAttribute("min", minCheckout)
  })
}

// Animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".room-card, .amenity-item, .feature").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})
