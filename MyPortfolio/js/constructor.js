(function () {
    const form = document.getElementById("table-form");
    const tableContainer = document.getElementById("table-container");
    const loadSettingsButton = document.getElementById("load-settings");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const days = document.getElementById("days").value;
        const lessons = document.getElementById("lessons").value;
        const language = document.getElementById("language").value;

        localStorage.setItem("tableSettings", JSON.stringify({ days, lessons, language }));

        generateTable(days, lessons, language);
    });

    loadSettingsButton.addEventListener("click", function () {
        const savedSettings = localStorage.getItem("tableSettings");
        if (savedSettings) {
            const { days, lessons, language } = JSON.parse(savedSettings);
            document.getElementById("days").value = days;
            document.getElementById("lessons").value = lessons;
            document.getElementById("language").value = language;

            generateTable(days, lessons, language);
        } else {
            alert("Сохраненные параметры не найдены.");
        }
    });

    function generateTable(days, lessons, language) {
        tableContainer.innerHTML = "";

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `<th>${language === "ru" ? "День" : "Day"}</th>`;
        for (let i = 1; i <= lessons; i++) {
            const th = document.createElement("th");
            th.textContent = `${language === "ru" ? "Урок" : "Lesson"} ${i}`;
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);

        for (let i = 1; i <= days; i++) {
            const row = document.createElement("tr");
            const dayCell = document.createElement("td");
            dayCell.textContent = `${language === "ru" ? "День" : "Day"} ${i}`;
            row.appendChild(dayCell);

            for (let j = 1; j <= lessons; j++) {
                const cell = document.createElement("td");
                cell.textContent = "-";
                row.appendChild(cell);
            }

            tbody.appendChild(row);
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);
    }
})();