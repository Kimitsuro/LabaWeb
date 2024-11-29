document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.getElementById("sel");
    const navList = document.querySelector(".nav-list");
    const checkboxes = navList.querySelectorAll("input[type='checkbox']");
    const cardItems = document.querySelectorAll(".card-item");

    // ���������� �������� �� ������ ���������� �������� � select
    selectElement.addEventListener("change", (event) => {
        const sortOrder = event.target.value;
        const sortedCards = Array.from(cardItems).sort((a, b) => {
            const priceA = parseInt(a.querySelector(".heading").textContent.replace(/\D/g, ""));
            const priceB = parseInt(b.querySelector(".heading").textContent.replace(/\D/g, ""));
            return sortOrder === "dorogo" ? priceB - priceA : priceA - priceB;
        });

        const contentContainer = document.querySelector(".content");
        contentContainer.innerHTML = ""; // ������� ����������
        sortedCards.forEach((card) => contentContainer.appendChild(card)); // ���������� ��������������� ��������
    });

    // ���������� �������� �� ������ ��������� ���������
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const selectedBrands = Array.from(checkboxes)
                .filter((cb) => cb.checked)
                .map((cb) => cb.parentElement.textContent.trim());

            cardItems.forEach((card) => {
                const brandName = card.querySelector(".brand-name .name b").textContent.trim();
                if (selectedBrands.length === 0 || selectedBrands.includes(brandName)) {
                    card.style.display = ""; // �������� ��������
                } else {
                    card.style.display = "none"; // ������ ��������
                }
            });
        });
    });

    // ������������� ��������� ����������� ������ ��������
    const filterButton = document.querySelector(".button1");
    filterButton.addEventListener("click", () => {
        navList.style.display = navList.style.display === "block" ? "none" : "block";
    });

    // �������� �������� ��� ����� ��� ������
    document.addEventListener("click", (event) => {
        if (!filterButton.contains(event.target) && !navList.contains(event.target)) {
            navList.style.display = "none";
        }
    });
});
