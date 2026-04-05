document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu Subsystem
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = hamburgerBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Add to Cart / Popup System
    const addToCartBtn = document.getElementById('addToCartBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const continueShoppingBtn = document.getElementById('continueShopping');

    if (addToCartBtn && cartOverlay) {
        addToCartBtn.addEventListener('click', () => {
            cartOverlay.classList.add('active');
            // Disable body scroll when modal is open
            document.body.style.overflow = 'hidden';
        });
    }

    // Function to close modal
    const closeModal = () => {
        if(cartOverlay) {
            cartOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scroll
        }
    };

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeModal);
    }
    
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', closeModal);
    }

    // Close when clicking outside the popup
    if (cartOverlay) {
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) {
                closeModal();
            }
        });
    }

    // Optional: Navbar background changes on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.5rem 0';
                navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)';
            } else {
                navbar.style.padding = '1rem 0';
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)';
            }
        });
    }
});
