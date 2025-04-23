document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        body.classList.toggle('menu-open');
    });

    menuClose.addEventListener('click', () => {
        body.classList.remove('menu-open');
    });
});
