document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const desktopMenu = document.getElementById('desktop-menu');
    const dropdownToggles = document.querySelectorAll('.has-dropdown .nav-dropdown-toggle');
    const navItems = document.querySelectorAll('.nav-item');

    const isDesktop = () => window.innerWidth > 992;
    
    // 1. Mobile Menu (Hamburger) Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            desktopMenu.classList.toggle('active');
            
            // Close all dropdowns when the main menu is closed
            if (!desktopMenu.classList.contains('active')) {
                navItems.forEach(item => item.classList.remove('open'));
            }
        });
    }

    // 2. Dropdown Functionality (Click/Hover)
    const handleDropdownInteraction = (e) => {
        const parentItem = e.currentTarget.closest('.nav-item');
        
        // Use click logic universally
        e.preventDefault();
        
        // Close other open dropdowns
        navItems.forEach(item => {
            if (item !== parentItem) {
                item.classList.remove('open');
            }
        });

        // Toggle the current dropdown
        parentItem.classList.toggle('open');
    };

    dropdownToggles.forEach(toggle => {
        // Add click listener for universal interaction
        toggle.addEventListener('click', handleDropdownInteraction);
    });

    // 3. Desktop Hover and Click Cleanup
    const setupDesktopHover = () => {
        navItems.forEach(item => {
            // Remove previous listeners to avoid duplicates
            item.onmouseenter = null;
            item.onmouseleave = null;

            if (isDesktop()) {
                // Set up hover listeners for desktop
                item.onmouseenter = () => item.classList.add('open');
                item.onmouseleave = () => item.classList.remove('open');
            } else {
                // Ensure dropdowns are closed when resizing to mobile
                item.classList.remove('open');
            }
        });
    };
    
    // --- 4. Typing Animation ---
    var typerElement = document.querySelector("span[words]");
    if (typerElement) {
        var wordsToType = typerElement.getAttribute("words").split(','), 
            typingSpeed = (parseInt(typerElement.getAttribute('typing-speed')) || 70), 
            typingDelay = (parseInt(typerElement.getAttribute('typing-delay')) || 700);
        
        var currentWordIndex = 0, currentCharacterIndex = 0; 

        function type(){
            var wordToType = wordsToType[currentWordIndex % wordsToType.length].trim();

            if(currentCharacterIndex < wordToType.length){
                typerElement.innerHTML += wordToType[currentCharacterIndex++];
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(erase, typingDelay);
            }
        }
        
        function erase(){
            var wordToType = wordsToType[currentWordIndex % wordsToType.length].trim(); 
            if(currentCharacterIndex > 0){
                // Corrected erasure logic
                typerElement.innerHTML = wordToType.substr(0, --currentCharacterIndex); 
                setTimeout(erase, typingSpeed);
            } else {
                currentWordIndex++; 
                setTimeout(type, typingDelay);
            }
        }

        // Start the typing animation
        setTimeout(type, 500); // Small initial delay
    }

    // Initial setup and re-run on resize
    setupDesktopHover();
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupDesktopHover, 250);
    });

    // 5. Close Dropdowns when clicking outside (Desktop)
    document.addEventListener('click', (e) => {
        const isMenuClick = e.target.closest('.nav-menu-desktop');
        const isToggleClick = e.target.closest('.menu-button');
        
        if (isDesktop() && !isMenuClick && !isToggleClick) {
            navItems.forEach(item => {
                item.classList.remove('open');
            });
        }
    });

    // --- 6. FAQ Section Script ---
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
      const btn = item.querySelector(".faq-question");

      btn.addEventListener("click", () => {
        // close other items
        faqItems.forEach(i => {
          if (i !== item) {
            i.classList.remove("active");
            i.querySelector(".icon").textContent = "+";
          }
        });

        // toggle current item
        item.classList.toggle("active");

        const icon = item.querySelector(".icon");
        icon.textContent = item.classList.contains("active") ? "–" : "+";
      });
    });

    // --- 7. Testimonial Slider Script (Your existing code) ---
    const track = document.querySelector('.slider-track');
    const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const nextButton = document.getElementById('next-slide');
    const prevButton = document.getElementById('prev-slide');
    const slideCount = slides.length;
    let currentSlide = 0;

    // Function to update the slider position
    const updateSlider = () => {
        if (track) {
            const offset = currentSlide * -100;
            track.style.transform = `translateX(${offset}%)`;
        }
    };

    if (nextButton && prevButton) {
        // Next slide logic
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slideCount; // Loop back to 0
            updateSlider();
        });

        // Previous slide logic
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount; // Loop back to the last slide
            updateSlider();
        });

        // Initialize the slider position
        updateSlider(); 
    }
    
// --- 8. Hero Image Slider Functionality (FADE EFFECT) ---
    const heroSliderContainer = document.querySelector('.hero-slider-mockup');
    if (heroSliderContainer) {
        // Find all image elements within the container
        const heroSlides = heroSliderContainer.querySelectorAll('img');
        const totalSlides = heroSlides.length;
        let currentHeroSlideIndex = 0;
        const slideInterval = 2000; // 5 seconds interval

        if (totalSlides > 1) {
            
            // Function to update which slide is visible
            const updateHeroSlider = () => {
                // 1. Remove 'active' class from all slides
                heroSlides.forEach(slide => {
                    slide.classList.remove('active');
                });

                // 2. Add 'active' class to the current slide to trigger the fade in via CSS
                heroSlides[currentHeroSlideIndex].classList.add('active'); 

                // 3. Increment the index for the next cycle, looping back to 0
                currentHeroSlideIndex = (currentHeroSlideIndex + 1) % totalSlides;
            };

            // Start the slider
            updateHeroSlider(); // Show the first slide immediately
            // Set an interval to change the slide periodically
            setInterval(updateHeroSlider, slideInterval);
        }
    }
    // Initialize Swiper for testimonials
        const testimonialSwiper = new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                }
            }
        });

    
});