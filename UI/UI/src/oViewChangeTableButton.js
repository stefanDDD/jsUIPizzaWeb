var currentIndexDatabase = 0;
var containersListDatabase = [
    document.querySelectorAll(".rawMaterials-container"),
    document.querySelectorAll(".order-status-container"),
    document.querySelectorAll(".order-items-container"),
];

if (containersListDatabase.some(containers => !containers)) {
    console.error("Some containers are undefined.");
} else {
    function showTable(index) {
        if (index < 0 || index >= containersListDatabase.length) {
            console.error("Invalid index: " + index);
            return;
        }

        containersListDatabase.forEach(function (containers, i) {
            containers.forEach(function (container) {
                container.classList.add("hidden-container-db");
            });
        });

        containersListDatabase[index].forEach(function (container) {
            container.classList.remove("hidden-container-db");
        });
    }

    var loadButtonDatabase = document.querySelector(".changeTableDatabase");
    if (loadButtonDatabase) {
        loadButtonDatabase.addEventListener("click", function () {
            currentIndexDatabase = (currentIndexDatabase + 1) % containersListDatabase.length;
            showTable(currentIndexDatabase);
        });
    } else {
        console.error("Button not found.");
    }
}
