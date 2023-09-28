$.getScript('./jquery.min.js', function () {
    $(function () {
        let myChart; // Declare a variable to store the chart instance

        function fetchDataAndRefreshChart() {
            // Check if a chart instance exists and destroy it
            if (myChart) {
                myChart.destroy();
            }

            $.get('http://localhost:5501/api/graphDisplayedOrders', function (deliveredData) {
                $.get('http://localhost:5501/api/graphDisplayedOrdersCanceled', function (canceledData) {
                    const allLabels = [...deliveredData, ...canceledData].map(item => new Date(item.order_timestamp));

                    const deliveredValues = deliveredData.map(item => parseInt(item.total));
                    const canceledValues = canceledData.map(item => parseInt(item.total));

                    const ctx = document.getElementById('ordersChart').getContext('2d');

                    myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: allLabels,
                            datasets: [
                                {
                                    label: "Delivered Orders",
                                    data: deliveredValues,
                                    fill: 'start',
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    borderWidth: 1,
                                },
                                {
                                    label: "Canceled Orders",
                                    data: canceledValues,
                                    fill: 'start',
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1,
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    type: 'time',
                                    time: {
                                        unit: 'day'
                                    },
                                    title: {
                                        display: true,
                                        text: 'Date'
                                    },
                                    grid: {
                                        display: false,
                                        color: "rgba(0, 0, 0, 0)",
                                    },
                                    ticks: {
                                        source: 'auto',
                                    },
                                    min: Math.min(...allLabels),
                                    max: Math.max(...allLabels),
                                },
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: "Orders"
                                    },
                                    ticks: {
                                        stepSize: 1,
                                        beginAtZero: true,
                                    },
                                    grid: {
                                        display: false,
                                        color: "rgba(0, 0, 0, 0)",
                                    }
                                },
                            }
                        }
                    });
                });
            });
        }

        fetchDataAndRefreshChart();
    });
});
