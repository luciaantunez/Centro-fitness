var nav = document.getElementById("navbar");


/* FUNCION PARA RESPONSIVE NAVBAR */
function responsiveNavbar() {
    if (nav.className === "topnav") {
        nav.className += " responsive";
    } else {
        nav.className = "topnav";
    }
  }


/* FUNCION NAVBAR APARECE Y DESAPARECE CON SCROLL */
var prevScrollPosition = window.scrollY;

window.onscroll = function () {
    var currentScrollPosition = window.scrollY;
    if (prevScrollPosition > currentScrollPosition) {
        nav.style.top = "0";
    } else {
        nav.style.top = "-50px";
    }
    prevScrollPosition = currentScrollPosition;
};



/* FUNCIONes SECCIÓN TESTIMONIOS */
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

// Mostrar el primer testimonio
showTestimonial(currentTestimonial);

document.querySelector('.fa-chevron-left').addEventListener('click', () => {
    changeTestimonial(-1);
});

document.querySelector('.fa-chevron-right').addEventListener('click', () => {
    changeTestimonial(1);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'flex' : 'none';
        dots[i].classList.toggle('active', i === index);
    });
}

function changeTestimonial(direction) {
    currentTestimonial = (currentTestimonial + direction + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Función para cambiar la imagen al hacer clic en pantallas pequeñas
function toggleImage(container) {
    const beforeImage = container.querySelector('.before');
    const afterImage = container.querySelector('.after');
    const isAfterVisible = afterImage.style.opacity == 1;

    beforeImage.style.opacity = isAfterVisible ? 1 : 0;
    afterImage.style.opacity = isAfterVisible ? 0 : 1;
}

    