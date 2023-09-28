var currentIndexDashboard = 0;
var containersListDashboard = [
    document.querySelectorAll(".dashboardStatsMonthly"),
    document.querySelectorAll(".dashboardStatsDaily"),
    document.querySelectorAll(".dashboardStatsWeekly"),
    document.querySelectorAll(".dashboardStatsYearly")
];

function changeRaportDashboard(index) {
    if (containersListDashboard[index]) {
        containersListDashboard.forEach(function (containers) {
            containers.forEach(function (container) {
                container.style.display = "none"; 
            });
        });

        containersListDashboard[index].forEach(function (container) {
            container.style.display = "block";
        });

        currentIndexDashboard = index;
    } else {
    }
}

var loadButtonDashboardRight = document.querySelector(".changeDashboardRight");
loadButtonDashboardRight.addEventListener("click", function () {
    currentIndexDashboard = (currentIndexDashboard + 1) % containersListDashboard.length;
    changeRaportDashboard(currentIndexDashboard);
});

var loadButtonDashboardLeft = document.querySelector(".changeDashboardLeft");
loadButtonDashboardLeft.addEventListener("click", function () {
    currentIndexDashboard = (currentIndexDashboard - 1 + containersListDashboard.length) % containersListDashboard.length;
    changeRaportDashboard(currentIndexDashboard);
});
