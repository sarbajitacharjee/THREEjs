// GSAP Animation
const sections = document.querySelectorAll('.section');

sections.forEach((section, index) => {
    gsap.fromTo(section, 
        { y: 50, opacity: 0 }, 
        { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            delay: index * 0.5 
        });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
