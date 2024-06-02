const nav = document.getElementById("navbar");

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollPosition = window.scrollY;
window.onscroll = function () {
    var currentScrollPosition = window.scrollY;
    if (prevScrollPosition > currentScrollPosition) {
        nav.style.top = "0";
    } else {
        nav.style.top = "-50px";
    }
    prevScrollPosition = currentScrollPosition;
}



/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
/* function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  } */