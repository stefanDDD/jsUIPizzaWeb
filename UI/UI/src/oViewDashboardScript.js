$.getScript('./jquery.min.js', function () {
    $(function () {
        function displayTotalOrdersCalculateMonth() {
            $.get('http://localhost:5501/api/totalOrdersM', function (ordersData) {
                $('.totalOrdersMCalculate').text(ordersData[0].total_orders_current_month);

                if (ordersData[0].total_orders_current_month === null) {
                    $('.totalOrdersMCalculate').text(0);
                }
                const percentageIncrease = ordersData[0].percentage_increase;
                const percentageElement = $('.totalOrdersMPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastMonthTxt = " from last month";


                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }

        function displayTotalItemsCalculateMonth() {
            $.get('http://localhost:5501/api/totalItemsM', function (itemsData) {
                $('.totalItemsMCalculate').text(itemsData[0].total_items_current_month);
                if (itemsData[0].total_items_current_month === null) {
                    $('.totalItemsMCalculate').text(0);
                }
                const percentageIncrease = itemsData[0].percentage_increase;
                const percentageElement = $('.totalItemsMPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastMonthTxt = " from last month";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }


        function displayTotalIncomeCalculateMonth() {
            $.get('http://localhost:5501/api/totalIncomeM', function (incomeData) {
                $('.totalIncomeMCalculate').text("RON " + formatNumber(incomeData[0].total_income_current_month));
                if (incomeData[0].total_income_current_month === null) {
                    $('.totalIncomeMCalculate').html("RON " + formatNumber(0));
                }
                const percentageIncrease = incomeData[0].percentage_increase;
                const percentageElement = $('.totalIncomeMPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastMonthTxt = " from last month";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }


        function displayTotalCanceledOrdersCalculateMonth() {
            $.get('http://localhost:5501/api/totalCanceledOrdersM', function (canceledData) {
                $('.totalCanceledOrdersMCalculate').text(canceledData[0].total_canceled_current_month);
                if (canceledData[0].total_canceled_current_month === null) {
                    $('.totalCanceledOrdersMCalculate').text(0);
                }
                const percentageIncrease = canceledData[0].percentage_increase;
                const percentageElement = $('.totalCanceledOrdersMPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastMonthTxt = " from last month";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }
        function formatNumber(number) {
            if (number === undefined || number === null) {
                return '0.00';
            }
            return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        function displayTotalRawMaterialsCalculateMonth() {
            var $totalSpendMCalculate = $('.totalSpendMCalculate');
            $.get('http://localhost:5501/api/totalMaterialsM')
                .done(function (materialsData) {
                    $totalSpendMCalculate.text("RON " + formatNumber(materialsData));
                    const percentageElement = $('.totalSpendMPercentage');
                    const fromLastMonthTxt = " from last month";
                        percentageElement.css('color', 'black');
                        percentageElement.html("0.0%" + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }


        function displayTotalUsersCalculateMonth() {
            $.get('http://localhost:5501/api/totalUsersM', function (usersData) {
                $('.totalCustomersMCalculate').text(usersData[0].total_users_current_month);
                if (usersData[0].total_users_current_month === null) {
                    $('.totalCustomersMCalculate').text(0);
                }
                const percentageIncrease = usersData[0].percentage_increase;
                const percentageElement = $('.totalCustomersMPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastMonthTxt = " from last month";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastMonthTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }

        function displayTotalOrdersCalculateDay() {
            $.get('http://localhost:5501/api/totalOrdersD', function (ordersDataD) {
                $('.totalOrdersDCalculate').text(ordersDataD[0].total_orders_current_day);

                if (ordersDataD[0].total_orders_current_day === null) {
                    $('.totalOrdersDCalculate').text(0);
                }
                const percentageIncrease = ordersDataD[0].percentage_increase;
                const percentageElement = $('.totalOrdersDPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastDayTxt = " from last day";


                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }

        function displayTotalItemsCalculateDay() {
            $.get('http://localhost:5501/api/totalItemsD', function (itemsDataD) {
                $('.totalItemsDCalculate').text(itemsDataD[0].total_items_current_day);
                if (itemsDataD[0].total_items_current_day === null) {
                    $('.totalItemsDCalculate').text(0);
                }
                const percentageIncrease = itemsDataD[0].percentage_increase;
                const percentageElement = $('.totalItemsDPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastDayTxt = " from last day";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }


        function displayTotalIncomeCalculateDay() {
            $.get('http://localhost:5501/api/totalIncomeD', function (incomeDataD) {
                $('.totalIncomeDCalculate').text("RON " + formatNumber(incomeDataD[0].total_income_current_day));
                if (incomeDataD[0].total_income_current_day === null) {
                    $('.totalIncomeDCalculate').html("RON " + formatNumber(0));
                }
                const percentageIncrease = incomeDataD[0].percentage_increase;
                const percentageElement = $('.totalIncomeDPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastDayTxt = " from last day";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }


        function displayTotalCanceledOrdersCalculateDay() {
            $.get('http://localhost:5501/api/totalCanceledOrdersD', function (canceledDataD) {
                $('.totalCanceledOrdersDCalculate').text(canceledDataD[0].total_canceled_current_day);
                if (canceledDataD[0].total_canceled_current_day === null) {
                    $('.totalCanceledOrdersDCalculate').text(0);
                }
                const percentageIncrease = canceledDataD[0].percentage_increase;
                const percentageElement = $('.totalCanceledOrdersDPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastDayTxt = " from last day";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }
        function displayTotalRawMaterialsCalculateDay() {
            var $totalSpendDCalculate = $('.totalSpendDCalculate');
            $.get('http://localhost:5501/api/totalMaterialsD')
                .done(function (materialsDataD) {
                    $totalSpendDCalculate.text("RON " + formatNumber(materialsDataD));
                    const percentageElement = $('.totalSpendDPercentage');
                    const fromLastDayTxt = " from last day";
                    percentageElement.css('color', 'black');
                    percentageElement.html("0.0%" + '<span class="black-text">' + fromLastDayTxt + '</span>');
                })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }


        function displayTotalUsersCalculateDay() {
            $.get('http://localhost:5501/api/totalUsersD', function (usersDataD) {
                $('.totalCustomersDCalculate').text(usersDataD[0].total_users_current_day);
                if (usersDataD[0].total_users_current_day === null) {
                    $('.totalCustomersDCalculate').text(0);
                }
                const percentageIncrease = usersDataD[0].percentage_increase;
                const percentageElement = $('.totalCustomersDPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastDayTxt = " from last day";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastDayTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }

        function displayTotalOrdersCalculateWeek() {
            $.get('http://localhost:5501/api/totalOrdersW', function (ordersDataW) {
                $('.totalOrdersWCalculate').text(ordersDataW[0].total_orders_current_week);

                if (ordersDataW[0].total_orders_current_week === null) {
                    $('.totalOrdersWCalculate').text(0);
                }
                const percentageIncrease = ordersDataW[0].percentage_increase;
                const percentageElement = $('.totalOrdersWPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastWeekTxt = " from last week";


                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }

        function displayTotalItemsCalculateWeek() {
            $.get('http://localhost:5501/api/totalItemsW', function (itemsDataW) {
                $('.totalItemsWCalculate').text(itemsDataW[0].total_items_current_week);
                if (itemsDataW[0].total_items_current_week === null) {
                    $('.totalItemsWCalculate').text(0);
                }
                const percentageIncrease = itemsDataW[0].percentage_increase;
                const percentageElement = $('.totalItemsWPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastWeekTxt = " from last week";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }


        function displayTotalIncomeCalculateWeek() {
            $.get('http://localhost:5501/api/totalIncomeW', function (incomeDataW) {
                $('.totalIncomeWCalculate').text("RON " + formatNumber(incomeDataW[0].total_income_current_week));
                if (incomeDataW[0].total_income_current_week === null) {
                    $('.totalIncomeWCalculate').html("RON " + formatNumber(0));
                }
                const percentageIncrease = incomeDataW[0].percentage_increase;
                const percentageElement = $('.totalIncomeWPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastWeekTxt = " from last week";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }


        function displayTotalCanceledOrdersCalculateWeek() {
            $.get('http://localhost:5501/api/totalCanceledOrdersW', function (canceledDataW) {
                $('.totalCanceledOrdersWCalculate').text(canceledDataW[0].total_canceled_current_week);
                if (canceledDataW[0].total_canceled_current_week === null) {
                    $('.totalCanceledOrdersWCalculate').text(0);
                }
                const percentageIncrease = canceledDataW[0].percentage_increase;
                const percentageElement = $('.totalCanceledOrdersWPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastWeekTxt = " from last week";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }
        function displayTotalRawMaterialsCalculateWeek() {
            var $totalSpendWCalculate = $('.totalSpendWCalculate');
            $.get('http://localhost:5501/api/totalMaterialsW')
                .done(function (materialsDataW) {
                    $totalSpendWCalculate.text("RON " + formatNumber(materialsDataW));
                    const percentageElement = $('.totalSpendWPercentage');
                    const fromLastWeekTxt = " from last week";
                    percentageElement.css('color', 'black');
                    percentageElement.html("0.0%" + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }


        function displayTotalUsersCalculateWeek() {
            $.get('http://localhost:5501/api/totalUsersW', function (usersDataW) {
                $('.totalCustomersWCalculate').text(usersDataW[0].total_users_current_week);
                if (usersDataW[0].total_users_current_week === null) {
                    $('.totalCustomersWCalculate').text(0);
                }
                const percentageIncrease = usersDataW[0].percentage_increase;
                const percentageElement = $('.totalCustomersWPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastWeekTxt = " from last week";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastWeekTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }






        function displayTotalOrdersCalculateYear() {
            $.get('http://localhost:5501/api/totalOrdersY', function (ordersDataY) {
                $('.totalOrdersYCalculate').text(ordersDataY[0].total_orders_current_year);

                if (ordersDataY[0].total_orders_current_year === null) {
                    $('.totalOrdersYCalculate').text(0);
                }
                const percentageIncrease = ordersDataY[0].percentage_increase;
                const percentageElement = $('.totalOrdersYPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastYearTxt = " from last year";


                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }

        function displayTotalItemsCalculateYear() {
            $.get('http://localhost:5501/api/totalItemsY', function (itemsDataY) {
                $('.totalItemsYCalculate').text(itemsDataY[0].total_items_current_year);
                if (itemsDataY[0].total_items_current_year === null) {
                    $('.totalItemsYCalculate').text(0);
                }
                const percentageIncrease = itemsDataY[0].percentage_increase;
                const percentageElement = $('.totalItemsYPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastYearTxt = " from last year";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }


        function displayTotalIncomeCalculateYear() {
            $.get('http://localhost:5501/api/totalIncomeY', function (incomeDataY) {
                $('.totalIncomeYCalculate').text("RON " + formatNumber(incomeDataY[0].total_income_current_year));
                if (incomeDataY[0].total_income_current_year === null) {
                    $('.totalIncomeYCalculate').html("RON " + formatNumber(0));
                }
                const percentageIncrease = incomeDataY[0].percentage_increase;
                const percentageElement = $('.totalIncomeYPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastYearTxt = " from last year";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }


        function displayTotalCanceledOrdersCalculateYear() {
            $.get('http://localhost:5501/api/totalCanceledOrdersY', function (canceledDataY) {
                $('.totalCanceledOrdersYCalculate').text(canceledDataY[0].total_canceled_current_year);
                if (canceledDataY[0].total_canceled_current_year === null) {
                    $('.totalCanceledOrdersYCalculate').text(0);
                }
                const percentageIncrease = canceledDataY[0].percentage_increase;
                const percentageElement = $('.totalCanceledOrdersYPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastYearTxt = " from last year";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }
        function displayTotalRawMaterialsCalculateYear() {
            var $totalSpendYCalculate = $('.totalSpendYCalculate');
            $.get('http://localhost:5501/api/totalMaterialsY')
                .done(function (materialsDataY) {
                    $totalSpendYCalculate.text("RON " + formatNumber(materialsDataY));
                    const percentageElement = $('.totalSpendYPercentage');
                    const fromLastYearTxt = " from last year";
                    percentageElement.css('color', 'black');
                    percentageElement.html("0.0%" + '<span class="black-text">' + fromLastYearTxt + '</span>');
                })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }


        function displayTotalUsersCalculateYear() {
            $.get('http://localhost:5501/api/totalUsersY', function (usersDataY) {
                $('.totalCustomersYCalculate').text(usersDataY[0].total_users_current_year);
                if (usersDataY[0].total_users_current_year === null) {
                    $('.totalCustomersYCalculate').text(0);
                }
                const percentageIncrease = usersDataY[0].percentage_increase;
                const percentageElement = $('.totalCustomersYPercentage');

                const formattedPercentage = Math.abs(percentageIncrease).toFixed(1) + '%';
                const fromLastYearTxt = " from last year";
                if (percentageIncrease < 0) {
                    percentageElement.css('color', 'red');
                    percentageElement.html('<span class="arrow-down"></span>' + formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                } else if (percentageIncrease > 0) {
                    percentageElement.css('color', 'green');
                    percentageElement.html('<span class="arrow-up"></span>' + formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                } else {
                    percentageElement.css('color', 'black');
                    percentageElement.html(formattedPercentage + '<span class="black-text">' + fromLastYearTxt + '</span>');
                }
            })
                .fail(function (error) {
                    console.error('Error fetching data:', error);
                });
        }

        displayTotalOrdersCalculateMonth();
        setInterval(displayTotalOrdersCalculateMonth, 1000);
        displayTotalItemsCalculateMonth();
        setInterval(displayTotalItemsCalculateMonth, 1000);
        displayTotalIncomeCalculateMonth();
        setInterval(displayTotalIncomeCalculateMonth, 1000);
        displayTotalCanceledOrdersCalculateMonth();
        setInterval(displayTotalCanceledOrdersCalculateMonth, 1000);
        displayTotalRawMaterialsCalculateMonth();
        setInterval(displayTotalRawMaterialsCalculateMonth, 1000);
        displayTotalUsersCalculateMonth();
        setInterval(displayTotalUsersCalculateMonth, 1000);
        displayTotalOrdersCalculateDay();
        setInterval(displayTotalOrdersCalculateDay, 1000);
        displayTotalItemsCalculateDay();
        setInterval(displayTotalItemsCalculateDay, 1000);
        displayTotalIncomeCalculateDay();
        setInterval(displayTotalIncomeCalculateDay, 1000);
        displayTotalCanceledOrdersCalculateDay();
        setInterval(displayTotalCanceledOrdersCalculateDay, 1000);
        displayTotalRawMaterialsCalculateDay();
        setInterval(displayTotalRawMaterialsCalculateDay, 1000);
        displayTotalUsersCalculateDay();
        setInterval(displayTotalUsersCalculateDay, 1000);
        displayTotalOrdersCalculateWeek();
        setInterval(displayTotalOrdersCalculateWeek, 1000);
        displayTotalItemsCalculateWeek();
        setInterval(displayTotalItemsCalculateWeek, 1000);
        displayTotalIncomeCalculateWeek();
        setInterval(displayTotalIncomeCalculateWeek, 1000);
        displayTotalCanceledOrdersCalculateWeek();
        setInterval(displayTotalCanceledOrdersCalculateWeek, 1000);
        displayTotalRawMaterialsCalculateWeek();
        setInterval(displayTotalRawMaterialsCalculateWeek, 1000);
        displayTotalUsersCalculateWeek();
        setInterval(displayTotalUsersCalculateWeek, 1000);
        displayTotalOrdersCalculateYear();
        setInterval(displayTotalOrdersCalculateYear, 1000);
        displayTotalItemsCalculateYear();
        setInterval(displayTotalItemsCalculateYear, 1000);
        displayTotalIncomeCalculateYear();
        setInterval(displayTotalIncomeCalculateYear, 1000);
        displayTotalCanceledOrdersCalculateYear();
        setInterval(displayTotalCanceledOrdersCalculateYear, 1000);
        displayTotalRawMaterialsCalculateYear();
        setInterval(displayTotalRawMaterialsCalculateYear, 1000);
        displayTotalUsersCalculateYear();
        setInterval(displayTotalUsersCalculateYear, 1000);
    });
});
