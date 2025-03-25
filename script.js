document.addEventListener("DOMContentLoaded", function () {
    // --- INICIALIZAR SWIPERS ---
    var analysisSwiper = new Swiper(".analysisSwiper", {
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

    var bimSwiper = new Swiper(".bimSwiper", {
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
    var   automationSwiper = new Swiper(".automationSwiper", {
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
    var   cloudSwiper = new Swiper(".cloudSwiper", {
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
    let fullscreenContainer = document.getElementById("fullscreen-container");
    let fullscreenWrapper = fullscreenContainer.querySelector(".swiper-wrapper");
    let closeFullscreen = document.querySelector(".close-fullscreen");
    let fullscreenSwiper;
    let activeSwiper = null; // Variable para almacenar el Swiper original activo

    // Detectar clic en cualquier imagen dentro de los Swipers
    document.querySelectorAll(".swiper-slide img").forEach((img) => {
        img.addEventListener("click", function () {
            fullscreenWrapper.innerHTML = ""; // Limpiar imágenes previas

            // Obtener el Swiper al que pertenece la imagen
            let currentSwiper = img.closest(".swiper");
            let currentImages = currentSwiper.querySelectorAll(".swiper-slide img");

            // Detener el Swiper original cuando se abra la pantalla completa
            if (currentSwiper.classList.contains("analysisSwiper")) {
                analysisSwiper.autoplay.stop();
                activeSwiper = analysisSwiper;
            } else if (currentSwiper.classList.contains("bimSwiper")) {
                bimSwiper.autoplay.stop();
                activeSwiper = bimSwiper;
            } else if (currentSwiper.classList.contains("automationSwiper")) {
                automationSwiper.autoplay.stop();
                activeSwiper = automationSwiper;
            } else if (currentSwiper.classList.contains("cloudSwiper")) {
                cloudSwiper.autoplay.stop();
                activeSwiper = cloudSwiper;
            }

            // Agregar imágenes al Swiper de pantalla completa
            currentImages.forEach((image) => {
                let slide = document.createElement("div");
                slide.classList.add("swiper-slide");
                let newImg = document.createElement("img");
                newImg.src = image.src;
                slide.appendChild(newImg);
                fullscreenWrapper.appendChild(slide);
            });

            fullscreenContainer.classList.add("active");

            // Si el Swiper de pantalla completa ya existe, lo destruimos para reiniciarlo
            if (fullscreenSwiper) {
                fullscreenSwiper.destroy();
            }

            // Crear una nueva instancia de Swiper en pantalla completa
            fullscreenSwiper = new Swiper(".fullscreen-swiper", {
                slidesPerView: 1,
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

            // Mover Swiper a la imagen seleccionada
            fullscreenSwiper.slideTo([...currentImages].indexOf(img));
        });
    });

    // Cerrar pantalla completa
    closeFullscreen.addEventListener("click", function () {
        fullscreenContainer.classList.remove("active");

        // Reactivar el Swiper original cuando se cierre la pantalla completa
        if (activeSwiper) {
            activeSwiper.autoplay.start();
            activeSwiper = null;
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            fullscreenContainer.classList.remove("active");

            // Reactivar el Swiper original cuando se cierre la pantalla completa
            if (activeSwiper) {
                activeSwiper.autoplay.start();
                activeSwiper = null;
            }
        }
    });

    // Bloquear clic derecho
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });

    // Scroll suave al hacer clic en el menú
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });
});
