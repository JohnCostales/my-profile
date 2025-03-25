document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Text Animation for "I am a ..."
    const textAnimation = function() {
        const text = document.querySelector('.sec-text');
        const textLoad = () => {
            setTimeout(() => {
                text.textContent = "Full Stack Developer";
            }, 0);
            setTimeout(() => {
                text.textContent = "UI/UX Designer";
            }, 4000);
            setTimeout(() => {
                text.textContent = "Tech Enthusiast";
            }, 8000);
        }
        textLoad();
        setInterval(textLoad, 12000);
    }
    
    textAnimation();
    
    // Cursor Trail Animation
    const cursorTrail = document.querySelector('.cursor-trail');
    
    document.addEventListener('mousemove', e => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('click', () => {
        cursorTrail.style.width = '30px';
        cursorTrail.style.height = '30px';
        
        setTimeout(() => {
            cursorTrail.style.width = '10px';
            cursorTrail.style.height = '10px';
        }, 300);
    });
    
    // Scroll Animation for Skill Bars
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                const progress = entry.target.querySelector('.skill-progress');
                progress.style.width = progress.style.getPropertyValue('--percent');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillItems.forEach(item => {
        item.style.opacity = 0;
        observer.observe(item);
    });
    
    // Form Animation
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input') || group.querySelector('textarea');
        const highlight = group.querySelector('.input-highlight');
        
        input.addEventListener('focus', () => {
            highlight.style.width = '100%';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                highlight.style.width = '0';
            }
        });
    });
    
// Form Submission
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form elements with null checks
        const nameInput = form.querySelector('input[name="name"]');
        const emailInput = form.querySelector('input[name="email"]');
        const messageInput = form.querySelector('textarea[name="message"]');
        
        // Check if all form fields exist
        if (!nameInput || !emailInput || !messageInput) {
            console.error('Form fields not found:', {
                nameExists: !!nameInput,
                emailExists: !!emailInput,
                messageExists: !!messageInput
            });
            alert('Form is not properly set up. Please try again later.');
            return;
        }
        
        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn) {
            console.error('Submit button not found');
            alert('Cannot submit form. Please try again later.');
            return;
        }
        
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Send email using EmailJS
        emailjs.send('service_10dz5be', 'template_0ld8vnk', {
            from_name: name,
            reply_to: email,
            message: message
        })
        .then(function() {
            submitBtn.textContent = 'Message Sent!';
            form.reset();
            showSnackbar('Your message has been sent successfully!', 'success');
            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch(function(error) {
            console.error('Email error:', error);
            submitBtn.textContent = 'Error! Try Again';
            showSnackbar('Failed to send message. Please try again.', 'error');
            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, 3000);
        });
    });
}
    // Snackbar
    // Updated showSnackbar function

function showSnackbar(message, type) {
    const snackbar = document.getElementById('snackbar');
    
    // Clear any existing classes and timeouts
    snackbar.className = '';
    
    // Add padding for the icon
    snackbar.style.paddingLeft = '45px';
    
    // Set the message and type
    snackbar.textContent = message;
    snackbar.classList.add(type);
    
    // Trigger animation and show the snackbar
    setTimeout(() => {
        snackbar.classList.add('show');
    }, 10);
    
    // After 3 seconds, hide the snackbar with a wobble effect
    setTimeout(function() {
        snackbar.style.transform = 'translateY(0) scale(1) rotate(-1deg)';
        
        setTimeout(() => {
            snackbar.style.transform = 'translateY(0) scale(1) rotate(1deg)';
            
            setTimeout(() => {
                snackbar.style.transform = 'translateY(100px) scale(0.8) rotate(0deg)';
                snackbar.style.opacity = '0';
                
                // Reset after animation completes
                setTimeout(() => {
                    snackbar.classList.remove('show');
                    snackbar.style.transform = '';
                    snackbar.style.opacity = '';
                }, 500);
            }, 100);
        }, 100);
    }, 2800);
}

    // Sections Animation on Scroll
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});