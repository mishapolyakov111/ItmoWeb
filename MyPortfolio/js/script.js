(function () {
    function setActiveMenuItem() {
        const menuItems = document.querySelectorAll('.nav__item a');
        const currentPath = window.location.pathname;

        menuItems.forEach(item => {
            if (item.pathname === currentPath) {
                item.classList.add('active');
            }
        });
    }

    function showLoadTime() {
        const loadTime = window.performance.now();
        const footer = document.querySelector('footer');

        const loadTimeElement = document.createElement('p');
        loadTimeElement.textContent = `Время загрузки страницы: ${loadTime.toFixed(2)} мс`;
        footer.appendChild(loadTimeElement);
    }

    window.addEventListener('load', () => {
        setActiveMenuItem();
        showLoadTime();
    });
})();