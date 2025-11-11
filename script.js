document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const desktopMenu = document.getElementById('desktop-menu');
    const dropdownToggles = document.querySelectorAll('.has-dropdown .nav-dropdown-toggle');
    const navItems = document.querySelectorAll('.nav-item');

    const isDesktop = () => window.innerWidth > 992;
    
    // --- 1. Mobile Menu (Hamburger) Toggle ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            desktopMenu.classList.toggle('active');
            
            // Close all dropdowns when the main menu is closed
            if (!desktopMenu.classList.contains('active')) {
                navItems.forEach(item => item.classList.remove('open'));
            }
        });
    }

    // --- 2. Dropdown Functionality (Click/Hover) ---
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

    // --- 3. Desktop Hover and Click Cleanup ---
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
    
    var wordsToType = document.querySelector("span[words]").getAttribute("words").split(','), 
            typer =  document.querySelector("span[words]"), 
            typingSpeed = (parseInt(typer.getAttribute('typing-speed')) || 70), 
            typingDelay = (parseInt(typer.getAttribute('typing-delay')) || 700);
    
    var currentWordIndex = 0, currentCharacterIndex = 0; 

    function type(){

        var wordToType = wordsToType[currentWordIndex%wordsToType.length];

        if(currentCharacterIndex < wordToType.length){
            typer.innerHTML += wordToType[currentCharacterIndex++];
            setTimeout(type, typingSpeed);
        }else{

            setTimeout(erase, typingDelay);
        }

    }
    function erase(){
        var wordToType = wordsToType[currentWordIndex%wordsToType.length]; 
        if(currentCharacterIndex >0){
            typer.innerHTML = wordToType.substr(0, --currentCharacterIndex -1);
            setTimeout(erase, typingSpeed);
        }else{

            currentWordIndex++; 
            setTimeout(type, typingDelay);
        }

    }

    window.onload = function(){
        type(); 
    }
    
    // Initial setup and re-run on resize
    setupDesktopHover();
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupDesktopHover, 250);
    });

    // --- 4. Close Dropdowns when clicking outside (Desktop) ---
    document.addEventListener('click', (e) => {
        const isMenuClick = e.target.closest('.nav-menu-desktop');
        const isToggleClick = e.target.closest('.menu-button');
        
        if (isDesktop() && !isMenuClick && !isToggleClick) {
            navItems.forEach(item => {
                item.classList.remove('open');
            });
        }
    });

    // faq section script
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

        const track = document.querySelector('.slider-track');
        const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
        const nextButton = document.getElementById('next-slide');
        const prevButton = document.getElementById('prev-slide');
        const slideCount = slides.length;
        let currentSlide = 0;

        // Function to update the slider position
        const updateSlider = () => {
            // Calculate the distance to move (currentSlide * -100% of the container width)
            const offset = currentSlide * -100;
            track.style.transform = `translateX(${offset}%)`;
        };

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
});