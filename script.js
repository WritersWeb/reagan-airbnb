
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-menu-open');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Room filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');
    const roomCategories = document.querySelectorAll('.room-category');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter rooms
                if (filter === 'all') {
                    // Show all categories and rooms
                    roomCategories.forEach(category => {
                        category.style.display = 'block';
                    });
                    roomCards.forEach(card => {
                        card.style.display = 'block';
                    });
                } else {
                    // Hide all categories first
                    roomCategories.forEach(category => {
                        category.style.display = 'none';
                    });
                    
                    // Show only the selected category
                    const targetCategory = document.getElementById(filter + '-section');
                    if (targetCategory) {
                        targetCategory.style.display = 'block';
                    }
                    
                    // Show only rooms from selected category
                    roomCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // Book room functionality
    const bookButtons = document.querySelectorAll('.book-btn');
    
    if (bookButtons.length > 0) {
        bookButtons.forEach(button => {
            button.addEventListener('click', function() {
                const roomName = this.getAttribute('data-room');
                const roomPrice = this.getAttribute('data-price');
                
                const message = `Hi! I'd like to book ${roomName} - Ksh ${roomPrice}/night. Please provide availability and booking details.`;
                const whatsappUrl = `https://wa.me/254746106501?text=${encodeURIComponent(message)}`;
                
                window.open(whatsappUrl, '_blank');
            });
        });
    }

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const checkIn = formData.get('checkIn');
            const checkOut = formData.get('checkOut');
            const roomType = formData.get('roomType');
            const guests = formData.get('guests');
            const message = formData.get('message');
            
            // Create WhatsApp message
            let whatsappMessage = `*New Booking Inquiry*\n\n`;
            whatsappMessage += `*Name:* ${name}\n`;
            if (email) whatsappMessage += `*Email:* ${email}\n`;
            whatsappMessage += `*Phone:* ${phone}\n`;
            if (checkIn) whatsappMessage += `*Check-in:* ${checkIn}\n`;
            if (checkOut) whatsappMessage += `*Check-out:* ${checkOut}\n`;
            if (roomType) whatsappMessage += `*Room Category:* ${roomType}\n`;
            if (guests) whatsappMessage += `*Guests:* ${guests}\n`;
            whatsappMessage += `*Message:* ${message}`;
            
            const whatsappUrl = `https://wa.me/254746106501?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            this.reset();
            
            // Show success message (optional)
            alert('Your message has been prepared for WhatsApp. Please send it to complete your inquiry.');
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading states for external links
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="tel:"], a[href^="mailto:"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.classList.add('loading');
            
            setTimeout(() => {
                this.classList.remove('loading');
            }, 2000);
        });
    });

    // Set minimum date for check-in and check-out inputs
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput && checkOutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkInInput.setAttribute('min', today);
        
        checkInInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const nextDay = new Date(selectedDate);
            nextDay.setDate(selectedDate.getDate() + 1);
            
            checkOutInput.setAttribute('min', nextDay.toISOString().split('T')[0]);
        });
    }

    // Form validation
    const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
    
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#d1d5db';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#10b981';
            }
        });
    });

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0 && !value.startsWith('254') && !value.startsWith('0')) {
                value = '254' + value;
            }
            
            this.value = value;
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.room-card, .feature-card, .offering-card, .contact-method, .info-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .room-card, .offering-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});


