

/* FUNCIONES SECCIÓN TESTIMONIOS */
document.addEventListener('DOMContentLoaded', function() {
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const intervalTime = 5000; // TIEMPO EN MILISEGUNDOS (5000ms = 5s)
    let autoSlide;
    const autoImageChangeTime = 3000; // TIEMPO PARA CAMBIAR LA IMAGEN DENTRO DE UN TESTIMONIO
  
    // MOSTRAR EL PRIMER TESTIMONIO
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
  
    // FUNCION PARA MOSTRAR UN TESTIMONIO ESPECÍFICO
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'flex' : 'none';
            dots[i].classList.toggle('active', i === index);
        });
    }
  
    // FUNCION PARA CAMBIAR EL TESTIMONIO
    function changeTestimonial(direction) {
        currentTestimonial = (currentTestimonial + direction + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
  
    // FUNCION PARA CAMBIAR LA IMAGEN AL HACER CLIC EN PANTALLAS PEQUEÑAS
    window.toggleImage = function(container) {
        const beforeImage = container.querySelector('.before');
        const afterImage = container.querySelector('.after');
        const isAfterVisible = afterImage.style.opacity == 1;
  
        beforeImage.style.opacity = isAfterVisible ? 1 : 0;
        afterImage.style.opacity = isAfterVisible ? 0 : 1;
    };
  
    // FUNCION PARA CAMBIAR AUTOMÁTICAMENTE LAS IMÁGENES DE CADA TESTIMONIO
    function autoChangeImages() {
        testimonials.forEach(testimonial => {
            const imageContainer = testimonial.querySelector('.image-container');
            toggleImage(imageContainer);
        });
    }
  
    // FUNCION PARA INICIAR EL CAMBIO AUTOMÁTICO DE IMÁGENES
    function startAutoImageChange() {
        setInterval(autoChangeImages, autoImageChangeTime);
    }
  
    // INICIALIZA EL CAMBIO AUTOMÁTICO DE IMÁGENES
    startAutoImageChange();
});
