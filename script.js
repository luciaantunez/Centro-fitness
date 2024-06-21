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

