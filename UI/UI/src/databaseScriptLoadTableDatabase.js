var currentIndex = 0;
var containersList = [
    document.querySelectorAll(".usersContainer"),
    document.querySelectorAll(".orderStatusContainer"),
    document.querySelectorAll(".orderItemsContainer"),
    document.querySelectorAll(".menuItemsContainer")
];

function showTable(index) {
    containersList.forEach(function (containers) {
        containers.forEach(function (container) {
            container.classList.add("hidden-container");
        });
    });

    containersList[index].forEach(function (container) {
        container.classList.remove("hidden-container");
    });
}

var loadButton = document.querySelector(".changeTableDatabasePage");
loadButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % containersList.length;
    showTable(currentIndex);
});
