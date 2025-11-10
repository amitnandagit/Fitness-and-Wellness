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

});