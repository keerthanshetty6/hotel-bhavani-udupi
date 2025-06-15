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
        document.getElementById('reservationForm').addEventListener('submit', function(e) {
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
                
                // Show success message
                alert(`${name}, you will now be redirected to WhatsApp to send your reservation request. Please make sure to send the message to complete your booking request.`);
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
