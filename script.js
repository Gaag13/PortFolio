document.addEventListener("DOMContentLoaded", function () {
    // --- CARRUSEL PRINCIPAL ---
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // --- PANTALLA COMPLETA ---
    let images = document.querySelectorAll(".swiper-slide img");
    let fullscreenContainer = document.getElementById("fullscreen-container");
    let closeFullscreen = document.querySelector(".close-fullscreen");
    let fullscreenSwiper;

    // Mostrar imágenes en pantalla completa
    images.forEach((img, index) => {
        img.addEventListener("click", function () {
            fullscreenContainer.classList.add("active");

            if (!fullscreenSwiper) {
                fullscreenSwiper = new Swiper(".fullscreen-swiper", {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    loop: true,                    
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                });
            }

            fullscreenSwiper.slideTo(index);
        });
    });

    // Cerrar pantalla completa
    closeFullscreen.addEventListener("click", function () {
        fullscreenContainer.classList.remove("active");
    });

    // Cerrar con tecla ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            fullscreenContainer.classList.remove("active");
        }
    });
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault(); // Bloquea el menú del clic derecho
    });
    
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault(); // Evita el salto brusco
            const targetId = this.getAttribute('href'); // Obtiene el ID de la sección destino
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 60, // Ajusta la posición para que no tape el menú
                behavior: 'smooth' // Activa el scroll suave
            });
        });
    });
    
    
});
