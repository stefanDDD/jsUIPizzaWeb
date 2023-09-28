var currentIndex = 0;
var containersList = [
    document.querySelectorAll(".totalIncomeDaily"),
    document.querySelectorAll(".totalIncomeWeekly"),
    document.querySelectorAll(".totalIncomeMonthly"),
    document.querySelectorAll(".totalIncomeYearly"),
];

function changeRaport(index) {
    if (containersList[index]) {
        containersList.forEach(function (containers) {
            containers.forEach(function (container) {
                container.classList.add("hidden-container");
            });
        });

        containersList[index].forEach(function (container) {
            container.classList.remove("hidden-container");
        });
    } else {
    }
}

var loadButton = document.querySelector(".changeDateType");
loadButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % containersList.length;
    changeRaport(currentIndex);
});
