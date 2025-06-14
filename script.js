// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
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

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Reservation form handling
document.getElementById("reservationForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const roomType = formData.get("roomType")
  const checkin = formData.get("checkin")
  const checkout = formData.get("checkout")
  const guests = formData.get("guests")
  const requests = formData.get("requests")

  // Simple validation
  if (name && email && phone && roomType && checkin && checkout && guests) {
    // Create WhatsApp message
    const message = `Hotel Bhavani Udupi - New Reservation Request

Name: ${name}
Email: ${email}
Phone: ${phone}
Room Type: ${roomType}
Check-in: ${checkin}
Check-out: ${checkout}
Guests: ${guests}
Special Requests: ${requests || "None"}

Please confirm availability and pricing.`

    // WhatsApp link (replace with your actual WhatsApp number)
    const whatsappNumber = "91XXXXXXXXXX" // Replace with your number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp
    window.open(whatsappURL, "_blank")

    // Show success message
    alert(
      `Thank you ${name}! Your reservation request has been sent via WhatsApp. We will contact you shortly to confirm your booking.`,
    )

    // Reset form
    this.reset()
  } else {
    alert("Please fill in all required fields.")
  }
})

// Book Now button functionality
document.querySelectorAll(".book-now-btn, .room-book-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Scroll to contact form
    document.querySelector("#contact").scrollIntoView({
      behavior: "smooth",
    })

    // Focus on the first input field
    setTimeout(() => {
      document.querySelector(".reservation-form input").focus()
    }, 1000)
  })
})

// Search functionality
document.querySelector(".search-btn").addEventListener("click", () => {
  const searchTerm = prompt("Search for rooms, amenities, or services:")
  if (searchTerm) {
    const content = document.body.innerText.toLowerCase()
    if (content.includes(searchTerm.toLowerCase())) {
      alert(`Found "${searchTerm}" on the page!`)
      // Highlight the search term (basic implementation)
      window.find(searchTerm)
    } else {
      alert(`No results found for "${searchTerm}"`)
    }
  }
})

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

// Set minimum date for check-in to today
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
