document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.getElementById("sel");
    const navList = document.querySelector(".nav-list");
    const checkboxes = navList.querySelectorAll("input[type='checkbox']");
    const cardItems = document.querySelectorAll(".card-item");

    // Фильтрация карточек на основе выбранного значения в select
    selectElement.addEventListener("change", (event) => {
        const sortOrder = event.target.value;
        const sortedCards = Array.from(cardItems).sort((a, b) => {
            const priceA = parseInt(a.querySelector(".heading").textContent.replace(/\D/g, ""));
            const priceB = parseInt(b.querySelector(".heading").textContent.replace(/\D/g, ""));
            return sortOrder === "dorogo" ? priceB - priceA : priceA - priceB;
        });

        const contentContainer = document.querySelector(".content");
        contentContainer.innerHTML = ""; // Очистка контейнера
        sortedCards.forEach((card) => contentContainer.appendChild(card)); // Добавление отсортированных карточек
    });

    // Фильтрация карточек на основе выбранных чекбоксов
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const selectedBrands = Array.from(checkboxes)
                .filter((cb) => cb.checked)
                .map((cb) => cb.parentElement.textContent.trim());

            cardItems.forEach((card) => {
                const brandName = card.querySelector(".brand-name .name b").textContent.trim();
                if (selectedBrands.length === 0 || selectedBrands.includes(brandName)) {
                    card.style.display = ""; // Показать карточку
                } else {
                    card.style.display = "none"; // Скрыть карточку
                }
            });
        });
    });

    // Интерактивное поведение выпадающего списка фильтров
    const filterButton = document.querySelector(".button1");
    filterButton.addEventListener("click", () => {
        navList.style.display = navList.style.display === "block" ? "none" : "block";
    });

    // Закрытие фильтров при клике вне списка
    document.addEventListener("click", (event) => {
        if (!filterButton.contains(event.target) && !navList.contains(event.target)) {
            navList.style.display = "none";
        }
    });
});
