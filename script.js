/* ==========================================
DR. REZA
MAIN JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

```
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

    });


    /* Tutup menu ketika link diklik */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

        });

    });

}


/* ==========================================
   UPDATE COPYRIGHT YEAR
   ========================================== */

const yearElements =
    document.querySelectorAll(".current-year");

const currentYear =
    new Date().getFullYear();

yearElements.forEach(function (element) {

    element.textContent = currentYear;

});


/* ==========================================
   IMAGE ERROR HANDLER
   ========================================== */

const images =
    document.querySelectorAll("img");

images.forEach(function (image) {

    image.addEventListener("error", function () {

        console.warn(
            "Gambar tidak ditemukan:",
            image.src
        );

    });

});
```

});
