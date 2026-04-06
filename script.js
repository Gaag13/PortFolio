/* ============================================
   PORTAFOLIO PROFESIONAL - GIANCARLO ARCINIEGAS
   JavaScript Mejorado con Mejores Prácticas
   ============================================ */

// ============================================
// 1. VARIABLES GLOBALES
// ============================================

let swipers = {
    analysis: null,
    bim: null,
    automation: null,
    cloud: null,
    fullscreen: null
};

let activeSwiperName = null;
let fullscreenContainer = null;
let fullscreenWrapper = null;
let closeFullscreenBtn = null;

// ============================================
// 2. INICIALIZACIÓN PRINCIPAL
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Iniciando Portafolio Profesional...");
    
    // Inicializar componentes
    initializeSwipers();
    initializeMobileMenu();
    initializeFullscreenViewer();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeHeaderScroll();
    initializePerformanceOptimizations();
    
    console.log("✅ Portafolio iniciado correctamente");
});

// ============================================
// 3. INICIALIZACIÓN DE SWIPERS
// ============================================

function initializeSwipers() {
    console.log("📸 Inicializando carruseles Swiper...");
    
    const swiperConfig = {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        a11y: {
            prevSlideMessage: 'Imagen anterior',
            nextSlideMessage: 'Imagen siguiente',
            firstSlideMessage: 'Esta es la primera imagen',
            lastSlideMessage: 'Esta es la última imagen'
        }
    };

    // Inicializar cada Swiper si existe en el DOM
    if (document.querySelector(".analysisSwiper")) {
        swipers.analysis = new Swiper(".analysisSwiper", swiperConfig);
        console.log("✓ Analysis Swiper inicializado");
    }

    if (document.querySelector(".bimSwiper")) {
        swipers.bim = new Swiper(".bimSwiper", swiperConfig);
        console.log("✓ BIM Swiper inicializado");
    }

    if (document.querySelector(".automationSwiper")) {
        swipers.automation = new Swiper(".automationSwiper", swiperConfig);
        console.log("✓ Automation Swiper inicializado");
    }

    if (document.querySelector(".cloudSwiper")) {
        swipers.cloud = new Swiper(".cloudSwiper", swiperConfig);
        console.log("✓ Cloud Swiper inicializado");
    }
}

// ============================================
// 4. MENÚ MÓVIL
// ============================================

function initializeMobileMenu() {
    console.log("📱 Inicializando menú móvil...");
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav ul');
    
    if (!menuToggle || !nav) {
        console.log("⚠️ Elementos del menú móvil no encontrados");
        return;
    }

    // Toggle del menú
    menuToggle.addEventListener('click', function() {
        const isActive = nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        
        // Prevenir scroll cuando el menú está abierto
        document.body.style.overflow = isActive ? 'hidden' : '';
        
        console.log(`📱 Menú móvil ${isActive ? 'abierto' : 'cerrado'}`);
    });

    // Cerrar menú al hacer click en un link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            console.log("📱 Menú cerrado tras click en link");
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(event) {
        if (!event.target.closest('header') && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    console.log("✅ Menú móvil inicializado");
}

// ============================================
// 5. VISUALIZADOR FULLSCREEN
// ============================================

function initializeFullscreenViewer() {
    console.log("🖼️ Inicializando visualizador fullscreen...");
    
    fullscreenContainer = document.getElementById("fullscreen-container");
    fullscreenWrapper = fullscreenContainer?.querySelector(".swiper-wrapper");
    closeFullscreenBtn = document.querySelector(".close-fullscreen");

    if (!fullscreenContainer || !fullscreenWrapper || !closeFullscreenBtn) {
        console.log("⚠️ Elementos de fullscreen no encontrados");
        return;
    }

    // Detectar clicks en imágenes dentro de Swipers
    document.querySelectorAll(".swiper-slide img.zoom-image").forEach((img) => {
        img.addEventListener("click", function() {
            openFullscreenGallery(this);
        });
        
        // Hacer imágenes accesibles con teclado
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'Ampliar imagen');
        
        // Permitir apertura con Enter/Space
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openFullscreenGallery(this);
            }
        });
    });

    // Cerrar con botón
    closeFullscreenBtn.addEventListener("click", closeFullscreen);

    // Cerrar con tecla ESC
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && fullscreenContainer.classList.contains("active")) {
            closeFullscreen();
        }
    });

    // Cerrar al hacer click en el fondo
    fullscreenContainer.addEventListener("click", function(event) {
        if (event.target === fullscreenContainer) {
            closeFullscreen();
        }
    });

    console.log("✅ Visualizador fullscreen inicializado");
}

function openFullscreenGallery(clickedImage) {
    console.log("🖼️ Abriendo galería fullscreen...");
    
    // Limpiar contenido previo
    fullscreenWrapper.innerHTML = "";

    // Obtener el Swiper al que pertenece la imagen
    const currentSwiper = clickedImage.closest(".swiper");
    const currentImages = currentSwiper.querySelectorAll(".swiper-slide img");
    const clickedIndex = Array.from(currentImages).indexOf(clickedImage);

    // Identificar y pausar el Swiper activo
    identifyAndPauseActiveSwiper(currentSwiper);

    // Agregar todas las imágenes al Swiper fullscreen
    currentImages.forEach((image) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        
        const newImg = document.createElement("img");
        newImg.src = image.src;
        newImg.alt = image.alt || "Imagen ampliada";
        newImg.loading = "eager"; // Cargar inmediatamente en fullscreen
        
        slide.appendChild(newImg);
        fullscreenWrapper.appendChild(slide);
    });

    // Mostrar el contenedor
    fullscreenContainer.classList.add("active");
    document.body.style.overflow = "hidden";

    // Destruir Swiper previo si existe
    if (swipers.fullscreen) {
        swipers.fullscreen.destroy(true, true);
    }

    // Crear nuevo Swiper fullscreen
    swipers.fullscreen = new Swiper(".fullscreen-swiper", {
        slidesPerView: 1,
        loop: true,
        initialSlide: clickedIndex,
        navigation: {
            nextEl: ".fullscreen-swiper .swiper-button-next",
            prevEl: ".fullscreen-swiper .swiper-button-prev",
        },
        pagination: {
            el: ".fullscreen-swiper .swiper-pagination",
            type: "fraction",
        },
        keyboard: {
            enabled: true
        },
        zoom: {
            maxRatio: 3,
            minRatio: 1
        }
    });

    console.log(`✅ Galería fullscreen abierta en imagen ${clickedIndex + 1}`);
}

function identifyAndPauseActiveSwiper(currentSwiper) {
    // Detener el Swiper activo
    const swiperClasses = ['analysisSwiper', 'bimSwiper', 'automationSwiper', 'cloudSwiper'];
    
    swiperClasses.forEach(className => {
        if (currentSwiper.classList.contains(className)) {
            const swiperKey = className.replace('Swiper', '').toLowerCase();
            if (swipers[swiperKey]?.autoplay) {
                swipers[swiperKey].autoplay.stop();
                activeSwiperName = swiperKey;
                console.log(`⏸️ Swiper ${swiperKey} pausado`);
            }
        }
    });
}

function closeFullscreen() {
    console.log("🖼️ Cerrando visualizador fullscreen...");
    
    fullscreenContainer.classList.remove("active");
    document.body.style.overflow = "";

    // Reanudar el Swiper que estaba activo
    if (activeSwiperName && swipers[activeSwiperName]?.autoplay) {
        swipers[activeSwiperName].autoplay.start();
        console.log(`▶️ Swiper ${activeSwiperName} reanudado`);
        activeSwiperName = null;
    }

    // Destruir el Swiper fullscreen después de un pequeño delay
    setTimeout(() => {
        if (swipers.fullscreen) {
            swipers.fullscreen.destroy(true, true);
            swipers.fullscreen = null;
        }
    }, 300);

    console.log("✅ Visualizador fullscreen cerrado");
}

// ============================================
// 6. SCROLL SUAVE
// ============================================

function initializeSmoothScroll() {
    console.log("🎯 Inicializando scroll suave...");
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Ignorar links que solo son "#"
            if (href === '#') return;
            
            event.preventDefault();
            
            const targetId = href;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Altura del header fijo
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar focus para accesibilidad
                targetSection.setAttribute('tabindex', '-1');
                targetSection.focus();
                
                console.log(`🎯 Navegando a: ${targetId}`);
            }
        });
    });

    console.log("✅ Scroll suave inicializado");
}

// ============================================
// 7. ANIMACIONES AL HACER SCROLL
// ============================================

function initializeScrollAnimations() {
    console.log("✨ Inicializando animaciones on scroll...");
    
    // Configuración del Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir clase de animación
                entry.target.classList.add('animate-in');
                
                // Dejar de observar una vez animado
                observer.unobserve(entry.target);
                
                console.log(`✨ Animado: ${entry.target.className}`);
            }
        });
    }, observerOptions);

    // Observar elementos que deben animarse
    const elementsToAnimate = document.querySelectorAll(
        '.expertise-card, .project-card, .project, .skill-category, .stat-item, .contact-item'
    );

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });

    console.log(`✅ ${elementsToAnimate.length} elementos configurados para animación`);
}

// ============================================
// 8. HEADER SCROLL EFFECT
// ============================================

function initializeHeaderScroll() {
    console.log("📜 Inicializando efectos de header...");
    
    const header = document.querySelector('header');
    
    if (!header) {
        console.log("⚠️ Header no encontrado");
        return;
    }
    
    let lastScrollTop = 0;
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Añadir/quitar clase 'scrolled' basado en la posición
                if (scrollTop > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                ticking = false;
            });
            
            ticking = true;
        }
    });

    console.log("✅ Efectos de header inicializados");
}

// ============================================
// 9. OPTIMIZACIONES DE PERFORMANCE
// ============================================

function initializePerformanceOptimizations() {
    console.log("⚡ Aplicando optimizaciones de performance...");
    
    // Lazy loading para iframes de YouTube
    const youtubeIframes = document.querySelectorAll('iframe[src*="youtube"]');
    
    youtubeIframes.forEach(iframe => {
        // Si el navegador no soporta loading="lazy", usar Intersection Observer
        if ('loading' in HTMLIFrameElement.prototype) {
            iframe.loading = 'lazy';
        } else {
            const iframeObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const src = iframe.getAttribute('data-src');
                        if (src) {
                            iframe.src = src;
                        }
                        observer.unobserve(iframe);
                    }
                });
            });
            
            // Mover src a data-src si existe
            if (iframe.src) {
                iframe.setAttribute('data-src', iframe.src);
                iframe.removeAttribute('src');
            }
            
            iframeObserver.observe(iframe);
        }
    });

    console.log(`⚡ ${youtubeIframes.length} iframes optimizados`);
    
    // Prefetch de imágenes importantes
    prefetchImportantImages();
    
    console.log("✅ Optimizaciones de performance aplicadas");
}

function prefetchImportantImages() {
    // Prefetch de primeras imágenes de cada galería
    const firstImages = document.querySelectorAll('.swiper-slide:first-child img');
    
    firstImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = img.src;
        document.head.appendChild(link);
    });
    
    console.log(`⚡ ${firstImages.length} imágenes prefetched`);
}

// ============================================
// 10. UTILIDADES
// ============================================

// Debounce function para optimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para limitar frecuencia de ejecución
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// 11. ANALYTICS Y TRACKING (Opcional)
// ============================================

function trackEvent(category, action, label) {
    // Si Google Analytics está configurado
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
        console.log(`📊 Evento tracked: ${category} - ${action} - ${label}`);
    }
}

// Trackear clicks en proyectos
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function() {
        const projectName = this.closest('.project-card')?.querySelector('h3')?.textContent || 'Unknown';
        trackEvent('Projects', 'Click', projectName);
    });
});

// Trackear clicks en WhatsApp
document.querySelectorAll('.whatsapp-button, .whatsapp-float').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('Contact', 'WhatsApp Click', 'Floating Button');
    });
});

// ============================================
// 12. MANEJO DE ERRORES
// ============================================

window.addEventListener('error', function(event) {
    console.error('❌ Error detectado:', event.error);
    // Aquí podrías enviar el error a un servicio de logging
});

// ============================================
// 13. ESTADO DE CARGA
// ============================================

window.addEventListener('load', function() {
    console.log('✅ Página completamente cargada');
    
    // Remover cualquier loader si existe
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('hidden');
    }
    
    // Trackear tiempo de carga
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⏱️ Tiempo de carga: ${pageLoadTime}ms`);
        
        trackEvent('Performance', 'Page Load Time', pageLoadTime);
    }
});

// ============================================
// 14. SERVICE WORKER (PWA - Opcional)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Descomentar cuando tengas un service-worker.js
        /*
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('✅ Service Worker registrado:', registration);
            })
            .catch(error => {
                console.log('❌ Error al registrar Service Worker:', error);
            });
        */
    });
}

// ============================================
// 15. MODO DEBUG (Desarrollo)
// ============================================

const DEBUG_MODE = false; // Cambiar a false en producción

if (DEBUG_MODE) {
    console.log("🐛 MODO DEBUG ACTIVADO");
    
    // Mostrar información del navegador
    console.log("🌐 Navegador:", navigator.userAgent);
    console.log("📱 Viewport:", `${window.innerWidth}x${window.innerHeight}`);
    console.log("🔌 Online:", navigator.onLine);
    
    // Mostrar todos los Swipers inicializados
    console.log("📸 Swipers activos:", Object.keys(swipers).filter(key => swipers[key] !== null));
}

// ============================================
// FIN DEL SCRIPT
// ============================================

console.log("🎉 Script completamente cargado y ejecutado");