// Simple client-side routing
function initializeRouting() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        handleRoute(window.location.pathname);
    });

    // Handle initial page load
    handleRoute(window.location.pathname);
}

function handleRoute(path) {
    switch(path) {
        case '/form-success':
            showFormSuccessPage();
            break;
        default:
            showMainPage();
            break;
    }
}

function showMainPage() {
    // Show all main sections
    const sections = ['home', 'about', 'rooms', 'contact'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
        }
    });
    
    // Hide form success page if it exists
    const successPage = document.getElementById('form-success-page');
    if (successPage) {
        successPage.style.display = 'none';
    }
}

function showFormSuccessPage() {
    // Hide all main sections
    const sections = ['home', 'about', 'rooms', 'contact'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
        }
    });
    
    // Show or create form success page
    let successPage = document.getElementById('form-success-page');
    if (!successPage) {
        createFormSuccessPage();
    } else {
        successPage.style.display = 'block';
    }
    
    // Track conversion with Google Tag Manager
    trackConversion();
}

function createFormSuccessPage() {
    const successPage = document.createElement('section');
    successPage.id = 'form-success-page';
    successPage.className = 'form-success-page';
    successPage.innerHTML = `
        <div class="container">
            <div class="success-content">
                <div class="success-icon">✅</div>
                <h1>Booking Request Sent Successfully!</h1>
                <p>Thank you for choosing Hotel Bhavani Udupi. Your booking request has been sent via WhatsApp.</p>
                <p>We will contact you shortly to confirm your reservation.</p>
                <div class="success-actions">
                    <button onclick="navigateToHome()" class="back-btn">Back to Home</button>
                    <a href="tel:08202526980" class="call-btn">Call Us Now</a>
                </div>
            </div>
        </div>
    `;
    
    // Add CSS for success page
    const style = document.createElement('style');
    style.textContent = `
        .form-success-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 2rem 0;
        }
        
        .success-content {
            text-align: center;
            max-width: 600px;
            padding: 3rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .success-icon {
            font-size: 4rem;
            margin-bottom: 2rem;
        }
        
        .success-content h1 {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            color: #d4af37;
        }
        
        .success-content p {
            font-size: 1.2rem;
            line-height: 1.6;
            margin-bottom: 1rem;
            opacity: 0.9;
        }
        
        .success-actions {
            margin-top: 3rem;
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .back-btn, .call-btn {
            padding: 15px 30px;
            border: none;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .back-btn {
            background: linear-gradient(45deg, #d4af37, #f1c40f);
            color: white;
        }
        
        .call-btn {
            background: linear-gradient(45deg, #27ae60, #2ecc71);
            color: white;
        }
        
        .back-btn:hover, .call-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        @media (max-width: 768px) {
            .success-content h1 {
                font-size: 2rem;
            }
            
            .success-actions {
                flex-direction: column;
                align-items: center;
            }
            
            .back-btn, .call-btn {
                width: 100%;
                max-width: 250px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(successPage);
}

function navigateToHome() {
    history.pushState(null, '', '/');
    handleRoute('/');
}

function navigateToFormSuccess() {
    history.pushState(null, '', '/form-success');
    handleRoute('/form-success');
}

function trackConversion() {
    // Track conversion with Google Tag Manager
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'form_submission',
            'event_category': 'engagement',
            'event_label': 'hotel_booking_form',
            'value': 1
        });
    }
    
    // Track conversion with gtag (if using Google Analytics directly)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
            'value': 1.0,
            'currency': 'INR'
        });
    }
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
const checkinInput = document.querySelector('input[name="checkin"]');
const checkoutInput = document.querySelector('input[name="checkout"]');

if (checkinInput) {
    checkinInput.setAttribute('min', today);
}

// Set minimum checkout date based on checkin
if (checkinInput && checkoutInput) {
    checkinInput.addEventListener('change', function() {
        const checkinDate = new Date(this.value);
        checkinDate.setDate(checkinDate.getDate() + 1);
        const minCheckout = checkinDate.toISOString().split('T')[0];
        checkoutInput.setAttribute('min', minCheckout);
    });
}

// WhatsApp functionality
function openWhatsApp(roomType = '', price = '') {
    const phoneNumber = '917259468825'; // Replace with your actual WhatsApp number
    let message = `Hello Hotel Bhavani Udupi!

I would like to make a booking inquiry.`;

    if (roomType && price) {
        message += `

Room Type: ${roomType}
Price: ₹${price}/night

Please confirm availability and provide booking details.`;
    } else {
        message += `

Please provide information about room availability and booking process.`;
    }

    message += `

Thank you!`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Book room function
function bookRoom(roomType, price) {
    openWhatsApp(roomType, price);
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    // Initialize routing
    initializeRouting();
    
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const roomType = formData.get('roomType');
            const checkin = formData.get('checkin');
            const checkout = formData.get('checkout');
            const message = formData.get('message');

            if (name && email && phone && roomType && checkin && checkout) {
                const phoneNumber = '917259468825'; // Replace with your actual WhatsApp number
                
                const bookingMessage = `Hotel Bhavani Udupi - Booking Request

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
🏨 Room Type: ${roomType}
📅 Check-in: ${checkin}
📅 Check-out: ${checkout}
💬 Message: ${message || 'None'}

Please confirm availability and booking details.

Thank you!`;

                const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(bookingMessage)}`;
                window.open(whatsappURL, '_blank');
                
                // Navigate to success page
                navigateToFormSuccess();
                
                // Reset form
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});

