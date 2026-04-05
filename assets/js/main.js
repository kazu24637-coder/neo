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

    // 3. Sandbox Payment Gateway Simulator Logic
    const checkoutBtn = document.getElementById('checkoutBtn');
    const paymentOverlay = document.getElementById('paymentOverlay');
    const closePaymentBtn = document.getElementById('closePaymentBtn');
    const dummyPaymentForm = document.getElementById('dummyPaymentForm');
    const paymentFormContainer = document.getElementById('paymentFormContainer');
    const paymentSuccess = document.getElementById('paymentSuccess');

    if (checkoutBtn && paymentOverlay) {
        checkoutBtn.addEventListener('click', () => {
            // Close cart modal
            if(cartOverlay) cartOverlay.classList.remove('active');
            
            // Open Payment Modal
            paymentOverlay.classList.add('active');
            // Ensure form is visible (if reopened)
            if(paymentFormContainer) paymentFormContainer.style.display = 'block';
            if(paymentSuccess) paymentSuccess.style.display = 'none';
        });
    }

    if (closePaymentBtn && paymentOverlay) {
        closePaymentBtn.addEventListener('click', () => {
            paymentOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMode"]');
    const cardDetailsSection = document.getElementById('cardDetailsSection');
    const codDetailsSection = document.getElementById('codDetailsSection');
    const upiDetailsSection = document.getElementById('upiDetailsSection');
    const submitBtnText = document.getElementById('submitBtnText');
    const submitBtnIcon = document.getElementById('submitBtnIcon');

    if (paymentMethodRadios.length > 0) {
        paymentMethodRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                // Update labels styling
                document.querySelectorAll('.payment-method-label').forEach(label => {
                    label.style.border = '2px solid #cbd5e1';
                    label.style.background = '#fff';
                    label.querySelector('i').style.color = 'var(--clr-slate-text)';
                    label.querySelector('span').style.color = 'var(--clr-slate-text)';
                });

                const activeLabel = e.target.parentElement;
                activeLabel.style.border = '2px solid var(--clr-orange-primary)';
                activeLabel.style.background = 'var(--clr-orange-light)';
                activeLabel.querySelector('i').style.color = 'var(--clr-orange-primary)';
                activeLabel.querySelector('span').style.color = 'var(--clr-navy-dark)';

                // Toggle sections and button text
                if (e.target.value === 'cod') {
                    cardDetailsSection.style.display = 'none';
                    if (upiDetailsSection) upiDetailsSection.style.display = 'none';
                    codDetailsSection.style.display = 'block';
                    submitBtnText.innerText = 'Place Order (COD)';
                    submitBtnIcon.className = 'fas fa-truck';
                    
                    cardDetailsSection.querySelectorAll('input').forEach(input => input.removeAttribute('required'));
                    if (upiDetailsSection) upiDetailsSection.querySelectorAll('input').forEach(input => input.removeAttribute('required'));
                } else if (e.target.value === 'upi') {
                    cardDetailsSection.style.display = 'none';
                    codDetailsSection.style.display = 'none';
                    if (upiDetailsSection) {
                        upiDetailsSection.style.display = 'block';
                        upiDetailsSection.querySelectorAll('input').forEach(input => input.setAttribute('required', 'true'));
                    }
                    submitBtnText.innerText = 'Pay ₹249 via UPI';
                    submitBtnIcon.className = 'fas fa-shield-halved';
                    
                    cardDetailsSection.querySelectorAll('input').forEach(input => input.removeAttribute('required'));
                } else {
                    codDetailsSection.style.display = 'none';
                    if (upiDetailsSection) {
                        upiDetailsSection.style.display = 'none';
                        upiDetailsSection.querySelectorAll('input').forEach(input => input.removeAttribute('required'));
                    }
                    cardDetailsSection.style.display = 'block';
                    submitBtnText.innerText = 'Pay ₹249';
                    submitBtnIcon.className = 'fas fa-lock';
                    
                    cardDetailsSection.querySelectorAll('input').forEach(input => input.setAttribute('required', 'true'));
                }
            });
        });
    }

    if (dummyPaymentForm) {
        dummyPaymentForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Simulate processing 
            const submitBtn = dummyPaymentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const paymentMode = document.querySelector('input[name="paymentMode"]:checked').value;
            
            if(paymentMode === 'cod') {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Placing Order...';
            } else if(paymentMode === 'upi') {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Requesting UPI...';
            } else {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
            }
            
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Fake API delay for realistic effect
            setTimeout(() => {
                paymentFormContainer.style.display = 'none';
                paymentSuccess.style.display = 'block';
                
                if (paymentMode === 'cod') {
                    paymentSuccess.querySelector('h2').innerText = 'Order Confirmed!';
                    paymentSuccess.querySelector('p').innerText = 'You chose Cash on Delivery. Order #FNC-8429 placed successfully.';
                } else if (paymentMode === 'upi') {
                    paymentSuccess.querySelector('h2').innerText = 'UPI Payment Successful!';
                    paymentSuccess.querySelector('p').innerText = 'Order #FNC-8429 placed successfully.';
                } else {
                    paymentSuccess.querySelector('h2').innerText = 'Payment Successful!';
                    paymentSuccess.querySelector('p').innerText = 'Order #FNC-8429 placed successfully.';
                }
                
                // Reset button for future
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                dummyPaymentForm.reset();
                
                // Reset to card view by default
                document.querySelector('input[value="card"]').click();
            }, 1000);
        });
    }

    // Close payment modal when clicking outside
    if (paymentOverlay) {
        paymentOverlay.addEventListener('click', (e) => {
            if (e.target === paymentOverlay) {
                paymentOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
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
