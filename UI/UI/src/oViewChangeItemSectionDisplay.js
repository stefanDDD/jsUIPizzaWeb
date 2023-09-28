var currentIndexSection = 0;
var containersListSection = [
    document.querySelectorAll(".foregroundSelledItemsPizza"),
    document.querySelectorAll(".foregroundSelledItemsPork"),
    document.querySelectorAll(".foregroundSelledItemsPasta"),
    document.querySelectorAll(".foregroundSelledItemsChicken"),
    document.querySelectorAll(".foregroundSelledItemsFish"),
    document.querySelectorAll(".foregroundSelledItemsDrink"),
    document.querySelectorAll(".foregroundSelledItemsSauce"),
    document.querySelectorAll(".foregroundSelledItemsAll")
];

function changeRaportItemsDisplay(index) {
    if (containersListSection[index]) {
        containersListSection.forEach(function (containers, i) {
            containers.forEach(function (container) {
                if (i === index) {
                    container.classList.remove("hidden-container");
                } else {
                    container.classList.add("hidden-container");
                }
            });
        });
    }
}

var loadButtonSection = document.querySelector(".changeItemSection");
loadButtonSection.addEventListener("click", function () {
    currentIndexSection = (currentIndexSection + 1) % containersListSection.length;
    changeRaportItemsDisplay(currentIndexSection);
});
