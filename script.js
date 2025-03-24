document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500, // 2.5 segundos por imagen
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

    // --- IMAGEN EN PANTALLA COMPLETA ---
    let images = document.querySelectorAll(".swiper-slide img");
    let fullscreenContainer = document.getElementById("fullscreen-container");
    let fullscreenImage = document.getElementById("fullscreen-image");
    let imageIndex = 0;
    let fullscreenImages = Array.from(images);
    let fullscreenInterval;

    // Función para mostrar imagen en pantalla completa
    function showFullscreenImage(index) {
        fullscreenImage.src = fullscreenImages[index].src;
        fullscreenContainer.classList.add("active");
    }

    // Evento click en cada imagen del swiper
    images.forEach((img, index) => {
        img.addEventListener("click", function () {
            imageIndex = index; // Guarda el índice de la imagen actual
            showFullscreenImage(imageIndex);

            // Iniciar el pase automático de imágenes en pantalla completa
            fullscreenInterval = setInterval(() => {
                imageIndex = (imageIndex + 1) % fullscreenImages.length; // Avanzar imagen
                showFullscreenImage(imageIndex);
            }, 2500); // Cambia cada 2.5 segundos
        });
    });

    // Cerrar la imagen en pantalla completa
    fullscreenContainer.addEventListener("click", function () {
        fullscreenContainer.classList.remove("active");
        clearInterval(fullscreenInterval); // Detener pase automático al cerrar
    });

    // Cerrar con tecla ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            fullscreenContainer.classList.remove("active");
            clearInterval(fullscreenInterval);
        }
    });
});
