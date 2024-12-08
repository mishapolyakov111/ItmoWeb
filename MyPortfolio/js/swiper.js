document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Swiper
    const swiper = new Swiper('.swiper-container', {
        // Центральный слайд в фокусе
        centeredSlides: true,
        // Количество отображаемых слайдов
        slidesPerView: 1.5,
        spaceBetween: 20,
        // Навигационные кнопки
        navigation: {
            nextEl: '.swiper-button-next', // Кнопка "вперед"
            prevEl: '.swiper-button-prev' // Кнопка "назад"
        },
        // Пагинация
        pagination: {
            el: '.swiper-pagination', // Индикаторы
            clickable: true // Делает их кликабельными
        },
        // Анимация прокрутки
        loop: true, // Бесконечный цикл
        autoplay: {
            delay: 3000, // Задержка между автопрокруткой
            disableOnInteraction: false // Не останавливать при взаимодействии
        }
    });
});
