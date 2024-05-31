

document.addEventListener('DOMContentLoaded', () => {
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

    document.getElementById('asesoria-online').addEventListener('click', function() {
        document.getElementById('asesoria-o').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('inicio').addEventListener('click', function() {
        document.getElementById('ini').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('logoGym').addEventListener('click', function() {
        document.getElementById('ini').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('sobre-nosotros').addEventListener('click', function() {
        document.getElementById('about-us').scrollIntoView({ behavior: 'smooth' });
    });

    });

    