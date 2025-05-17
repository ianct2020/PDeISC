// public/script_navbar_sidenav.js
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menuBtn');
    const sidenav = document.getElementById('sidenav');
    const pageBody = document.body;
    const overlay = document.getElementById('overlaySidenav');
    const themeSwitch = document.getElementById('themeSwitch'); // Switch para modo oscuro

    function openSidenav() {
        if (sidenav) sidenav.classList.add('open');
        // if (pageBody) pageBody.classList.add('sidenav-open'); // No es necesario si el sidenav está encima
        if (overlay) overlay.classList.add('active');
    }

    function closeSidenav() {
        if (sidenav) sidenav.classList.remove('open');
        // if (pageBody) pageBody.classList.remove('sidenav-open'); // No es necesario
        if (overlay) overlay.classList.remove('active');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            if (sidenav && sidenav.classList.contains('open')) {
                closeSidenav();
            } else {
                openSidenav();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidenav);
    }

    // Activar link actual en Sidenav
    const currentPathFile = window.location.pathname.split("/").pop() || 'index1.html'; // Default a index1.html si es raíz
    const sidenavLinks = document.querySelectorAll('.sidenav-links li a');
    sidenavLinks.forEach(link => {
        const linkFile = link.getAttribute('href').split("/").pop();
        if (linkFile === currentPathFile) {
            link.classList.add('active-sidenav-link');
        } else {
            link.classList.remove('active-sidenav-link');
        }
    });

    // Lógica para el Modo Oscuro
    if (themeSwitch) {
        // Cargar preferencia del tema desde localStorage
        if (localStorage.getItem('theme') === 'dark') {
            pageBody.classList.add('dark-mode');
            themeSwitch.checked = true;
        } else {
            pageBody.classList.remove('dark-mode'); // Asegurar modo claro si no hay preferencia o es 'light'
            themeSwitch.checked = false;
        }

        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                pageBody.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                pageBody.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});