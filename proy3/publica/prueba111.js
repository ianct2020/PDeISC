document.addEventListener("DOMContentLoaded", function () {
    // Control del menú
    const menuToggle = document.querySelector(".menu-toggle");
    const menuClose = document.querySelector(".menu-close");
    const body = document.body;

    menuToggle.addEventListener("click", () => {
        body.classList.toggle("menu-open");
    });

    menuClose.addEventListener("click", () => {
        body.classList.remove("menu-open");
    });

    // Simulación de precios para BTC, ETH y LTC
    document.getElementById("btc-price").textContent = "$29,000";
    document.getElementById("eth-price").textContent = "$1,900";
    document.getElementById("ltc-price").textContent = "$180";

    // Función para mostrar botón de "volver arriba"
    window.onscroll = function () {
        const backToTopButton = document.getElementById("volver-arriba");
        if (window.scrollY > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    };

    // Volver arriba cuando se hace clic en el botón
    document.getElementById("volver-arriba").onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Animación de encabezados al hacer scroll
    function revealOnScroll() {
        const fadeElements = document.querySelectorAll(".fade-in");
        fadeElements.forEach((element) => {
            const position = element.getBoundingClientRect().top;
            if (position < window.innerHeight - 100) {
                element.classList.add("visible");
            }
        });
    }

    // Agregar evento de scroll para revelar elementos
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // Manejo de la sección de FAQs
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach((question) => {
        question.addEventListener("click", function () {
            const currentlyActive = document.querySelector(".faq-answer.visible");
            if (currentlyActive && currentlyActive !== this.nextElementSibling) {
                currentlyActive.classList.remove("visible");
            }

            const answer = this.nextElementSibling;
            if (answer.classList.contains("visible")) {
                answer.classList.remove("visible");
            } else {
                answer.classList.add("visible");
            }
        });
    });

    // Manejo de los paneles expandibles
    document.querySelectorAll('.grid-item').forEach(panel => {
        const closeButton = panel.querySelector(".close-panel");

        // Expandir panel al hacer clic
        panel.addEventListener('click', () => {
            if (!panel.classList.contains('expanded')) {
                document.querySelectorAll('.grid-item.expanded').forEach(openPanel => {
                    openPanel.classList.remove('expanded');
                });
                panel.classList.add('expanded');
            }
        });

        // Cerrar panel al hacer clic en el botón de cierre
        closeButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que se dispare el evento del panel
            panel.classList.remove('expanded');
        });
    });
});
