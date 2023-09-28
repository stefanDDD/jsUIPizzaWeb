$.getScript('./jquery.min.js', function () {
    $(function () {
        var previousData = null;
        var timeoutId = null;
        function formatNumber(number) {
            if (number === undefined || number === null) {
                return '0.00';
            }
            return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        function formatNumberOrd(number) {
            if (number === undefined || number === null) {
                return '0';
            }
            return Math.round(number).toLocaleString('en-US');
        }
        function displayTotalIncome() {
            $.get('http://127.0.0.1:5501/api/totalMoneySelector', function (data) {
                var totalMoneyVar = formatNumber(data);
                var totalElement = $('.totalMoney');
                totalElement.text("RON " + totalMoneyVar);
                $('.totalMoney').css('background-color', 'rgb(240, 237, 237)');
                $('.totalMoney').css('borderRadius', '8px');

                if (previousData !== null && data !== previousData) {
                    if (data > previousData) {
                        $('.totalMoney').css('background-color', 'rgb(177, 236, 190)');
                    } else if (data < previousData) {
                        $('.totalMoney').css('background-color', 'rgb(211, 129, 129)');
                    } else {
                        $('.totalMoney').css('background-color', 'rgb(240, 237, 237)');
                    }
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(function () {
                        $('.totalMoney').css('background-color', ''); 
                    }, 3000);
                }
                previousData = data;
            });
        }
        var previousDataDaily = null;
        var timeoutIdDaily = null;
        var previousDataOrdDaily = null;
        var timeoutIdOrdDaily = null;
        var previousDataItmDaily = null;
        var timeoutIdItmDaily = null;
        var previousDataPizzasDaily = null;
        var timeoutIdPizzasDaily = null;
        var previousDataPorkDaily = null;
        var timeoutIdPorkDaily = null;
        var previousDataPastaDaily = null;
        var timeoutIdPastaDaily = null;
        var previousDataChickenDaily = null;
        var timeoutIdChickenDaily = null;
        var previousDataFishDaily = null;
        var timeoutIdFishDaily = null;
        var previousDataDrinksDaily = null;
        var timeoutIdDrinksDaily = null;
        var previousDataSauceDaily = null;
        var timeoutIdSauceDaily = null;
        var previousDataHomePizzaDaily = null;
        var timeoutIdHomePizzaDaily = null;
        var previousData4StaggioniDaily = null;
        var timeoutId4StaggioniDaily = null;
        var previousDataDiavolaDaily = null;
        var timeoutIdDiavolaDaily = null;
        function displayTotalDaily() {
            $.get('http://127.0.0.1:5501/api/totalMoneyDaily', function (data) {
                var totalMoneyDaily = formatNumber(data.totalMoneyDaily);
                var totalElement = $('.dailyIncomeSpan1');
                var dailyTargetIncome = 200;
                var dailyTargetIncomeFormat = formatNumber(dailyTargetIncome);
                totalElement.text("RON " + totalMoneyDaily + ' / ' + 'RON ' + dailyTargetIncomeFormat);
                $('.dailyIncomeSpan1').css('background-color', 'white');
                $('.dailyIncomeSpan1').css('borderRadius', '8px');
                const checkbox = document.querySelector('.custom-checkboxDaily1');

                if (data.totalMoneyDaily >= dailyTargetIncome) {
                    if (checkbox) {
                        checkbox.classList.remove('error');
                        checkbox.classList.add('success');
                        checkbox.textContent = '✓';
                    }
                } else if (data.totalMoneyDaily < dailyTargetIncome) {
                    if (checkbox) {
                        checkbox.classList.remove('success');
                        checkbox.classList.add('error');
                        checkbox.textContent = 'X';
                    }
                }

                if (previousDataDaily !== null && data.totalMoneyDaily !== previousDataDaily) {
                    if (data.totalMoneyDaily > previousDataDaily) {
                        $('.dailyIncomeSpan1').css('background-color', 'rgb(177, 236, 190)');
                    } else if (data.totalMoneyDaily < previousDataDaily) {
                        $('.dailyIncomeSpan1').css('background-color', 'rgb(211, 129, 129)');
                    } else {
                        $('.dailyIncomeSpan1').css('background-color', 'white');
                    }
                    clearTimeout(timeoutIdDaily);
                    timeoutIdDaily = setTimeout(function () {
                        $('.dailyIncomeSpan1').css('background-color', '');
                    }, 3000);
                }
                previousDataDaily = data.totalMoneyDaily;

                var totalOrdersDaily = formatNumberOrd(data.totalOrdersDaily);
                var totalOrdElement = $('.dailyIncomeSpan2');
                var dailyTargetOrders = 15;
                totalOrdElement.text(totalOrdersDaily + ' / ' + dailyTargetOrders);
                $('.dailyIncomeSpan2').css('background-color', 'white');
                $('.dailyIncomeSpan2').css('borderRadius', '8px');
                const checkbox1 = document.querySelector('.custom-checkboxDaily2');

                if (data.totalOrdersDaily >= dailyTargetOrders) {
                    if (checkbox1) {
                        checkbox1.classList.remove('error');
                        checkbox1.classList.add('success');
                        checkbox1.textContent = '✓';
                    }
                } else if (data.totalOrdersDaily < dailyTargetOrders) {
                    if (checkbox1) {
                        checkbox1.classList.remove('success');
                        checkbox1.classList.add('error');
                        checkbox1.textContent = 'X';
                    }
                }
                if (previousDataOrdDaily !== null && data.totalOrdersDaily !== previousDataOrdDaily) {
                    clearTimeout(timeoutIdOrdDaily);
                    timeoutIdOrdDaily = setTimeout(function () {
                        $('.dailyIncomeSpan2').css('background-color', '');
                    }, 3000);
                }
                previousDataOrdDaily = data.totalOrdersDaily;
            });
            $.get('http://127.0.0.1:5501/api/totalSelledItemsDaily', function (dataDaily) {
                var totalItemsDaily = formatNumberOrd(dataDaily);
                var totalItmElement = $('.dailyIncomeSpan3');
                var dailyTargetItems = 30;
                totalItmElement.text(totalItemsDaily + ' / ' + dailyTargetItems);
                $('.dailyIncomeSpan3').css('background-color', 'white');
                $('.dailyIncomeSpan3').css('borderRadius', '8px');
                const checkbox2 = document.querySelector('.custom-checkboxDaily3');

                if (dataDaily >= dailyTargetItems) {
                    if (checkbox2) {
                        checkbox2.classList.remove('error');
                        checkbox2.classList.add('success');
                        checkbox2.textContent = '✓';
                    }
                } else if (dataDaily < dailyTargetItems) {
                    if (checkbox2) {
                        checkbox2.classList.remove('success');
                        checkbox2.classList.add('error');
                        checkbox2.textContent = 'X';
                    }
                }
                if (previousDataItmDaily !== null && dataDaily !== previousDataItmDaily) {
                    clearTimeout(timeoutIdItmDaily);
                    timeoutIdItmDaily = setTimeout(function () {
                        $('.dailyIncomeSpan3').css('background-color', '');
                    }, 3000);
                }
                previousDataItmDaily = dataDaily;
            });
            $.get('http://127.0.0.1:5501/api/totalPizzasDaily', function (pizzasDaily) {
                var totalPizzasDaily = formatNumberOrd(pizzasDaily);
                var totalPizzasElement = $('.dailyIncomeSpan4');
                var dailyTargetPizzas = 15;
                totalPizzasElement.text(totalPizzasDaily + ' / ' + dailyTargetPizzas);
                $('.dailyIncomeSpan4').css('background-color', 'white');
                $('.dailyIncomeSpan4').css('borderRadius', '8px');
                const checkbox3 = document.querySelector('.custom-checkboxDaily4');

                if (pizzasDaily >= dailyTargetPizzas) {
                    if (checkbox3) {
                        checkbox3.classList.remove('error');
                        checkbox3.classList.add('success');
                        checkbox3.textContent = '✓';
                    }
                } else if (pizzasDaily < dailyTargetPizzas) {
                    if (checkbox3) {
                        checkbox3.classList.remove('success');
                        checkbox3.classList.add('error');
                        checkbox3.textContent = 'X';
                    }
                }
                if (previousDataPizzasDaily !== null && pizzasDaily !== previousDataPizzasDaily) {
                    clearTimeout(timeoutIdPizzasDaily);
                    timeoutIdPizzasDaily = setTimeout(function () {
                        $('.dailyIncomeSpan4').css('background-color', '');
                    }, 3000);
                }
                previousDataPizzasDaily = pizzasDaily;
            });

            $.get('http://127.0.0.1:5501/api/totalPorkDaily', function (porkDaily) {
                var totalPorkDaily = formatNumberOrd(porkDaily);
                var totalPorkElement = $('.dailyIncomeSpan5');
                var dailyTargetPork = 5;
                totalPorkElement.text(totalPorkDaily + ' / ' + dailyTargetPork);
                $('.dailyIncomeSpan5').css('background-color', 'white');
                $('.dailyIncomeSpan5').css('borderRadius', '8px');
                const checkbox4 = document.querySelector('.custom-checkboxDaily5');

                if (porkDaily >= dailyTargetPork) {
                    if (checkbox4) {
                        checkbox4.classList.remove('error');
                        checkbox4.classList.add('success');
                        checkbox4.textContent = '✓';
                    }
                } else if (porkDaily < dailyTargetPork) {
                    if (checkbox4) {
                        checkbox4.classList.remove('success');
                        checkbox4.classList.add('error');
                        checkbox4.textContent = 'X';
                    }
                }
                if (previousDataPorkDaily !== null && porkDaily !== previousDataPorkDaily) {
                    clearTimeout(timeoutIdPorkDaily);
                    timeoutIdPorkDaily = setTimeout(function () {
                        $('.dailyIncomeSpan5').css('background-color', '');
                    }, 3000);
                }
                previousDataPorkDaily = porkDaily;
            });
        
            $.get('http://127.0.0.1:5501/api/totalPastaDaily', function (pastaDaily) {
                var totalPastaDaily = formatNumberOrd(pastaDaily);
                var totalPastaElement = $('.dailyIncomeSpan6');
                var dailyTargetPasta = 5;
                totalPastaElement.text(totalPastaDaily + ' / ' + dailyTargetPasta);
                $('.dailyIncomeSpan6').css('background-color', 'white');
                $('.dailyIncomeSpan6').css('borderRadius', '8px');
                const checkbox5 = document.querySelector('.custom-checkboxDaily6');

                if (pastaDaily >= dailyTargetPasta) {
                    if (checkbox5) {
                        checkbox5.classList.remove('error');
                        checkbox5.classList.add('success');
                        checkbox5.textContent = '✓';
                    }
                } else if (pastaDaily < dailyTargetPasta) {
                    if (checkbox5) {
                        checkbox5.classList.remove('success');
                        checkbox5.classList.add('error');
                        checkbox5.textContent = 'X';
                    }
                }
                if (previousDataPastaDaily !== null && pastaDaily !== previousDataPastaDaily) {
                    clearTimeout(timeoutIdPastaDaily);
                    timeoutIdPastaDaily = setTimeout(function () {
                        $('.dailyIncomeSpan6').css('background-color', '');
                    }, 3000);
                }
                previousDataPastaDaily = pastaDaily;
            });

            $.get('http://127.0.0.1:5501/api/totalChickenDaily', function (chickenDaily) {
                var totalChickenDaily = formatNumberOrd(chickenDaily);
                var totalChickenElement = $('.dailyIncomeSpan7');
                var dailyTargetChicken = 5;
                totalChickenElement.text(totalChickenDaily + ' / ' + dailyTargetChicken);
                $('.dailyIncomeSpan7').css('background-color', 'white');
                $('.dailyIncomeSpan7').css('borderRadius', '8px');
                const checkbox6 = document.querySelector('.custom-checkboxDaily7');

                if (chickenDaily >= dailyTargetChicken) {
                    if (checkbox6) {
                        checkbox6.classList.remove('error');
                        checkbox6.classList.add('success');
                        checkbox6.textContent = '✓';
                    }
                } else if (chickenDaily < dailyTargetChicken) {
                    if (checkbox6) {
                        checkbox6.classList.remove('success');
                        checkbox6.classList.add('error');
                        checkbox6.textContent = 'X';
                    }
                }
                if (previousDataChickenDaily !== null && chickenDaily !== previousDataChickenDaily) {
                    clearTimeout(timeoutIdChickenDaily);
                    timeoutIdChickenDaily = setTimeout(function () {
                        $('.dailyIncomeSpan7').css('background-color', '');
                    }, 3000);
                }
                previousDataChickenDaily = chickenDaily;
            });

            $.get('http://127.0.0.1:5501/api/totalFishDaily', function (fishDaily) {
                var totalFishDaily = formatNumberOrd(fishDaily);
                var totalFishElement = $('.dailyIncomeSpan8');
                var dailyTargetFish = 5;
                totalFishElement.text(totalFishDaily + ' / ' + dailyTargetFish);
                $('.dailyIncomeSpan8').css('background-color', 'white');
                $('.dailyIncomeSpan8').css('borderRadius', '8px');
                const checkbox7 = document.querySelector('.custom-checkboxDaily8');

                if (fishDaily >= dailyTargetFish) {
                    if (checkbox7) {
                        checkbox7.classList.remove('error');
                        checkbox7.classList.add('success');
                        checkbox7.textContent = '✓';
                    }
                } else if (fishDaily < dailyTargetFish) {
                    if (checkbox7) {
                        checkbox7.classList.remove('success');
                        checkbox7.classList.add('error');
                        checkbox7.textContent = 'X';
                    }
                }
                if (previousDataFishDaily !== null && fishDaily !== previousDataFishDaily) {
                    clearTimeout(timeoutIdFishDaily);
                    timeoutIdFishDaily = setTimeout(function () {
                        $('.dailyIncomeSpan8').css('background-color', '');
                    }, 3000);
                }
                previousDataFishDaily = fishDaily;
            });

            $.get('http://127.0.0.1:5501/api/totalDrinksDaily', function (drinksDaily) {
                var totalDrinksDaily = formatNumberOrd(drinksDaily);
                var totalDrinksElement = $('.dailyIncomeSpan9');
                var dailyTargetDrinks = 30;
                totalDrinksElement.text(totalDrinksDaily + ' / ' + dailyTargetDrinks);
                $('.dailyIncomeSpan9').css('background-color', 'white');
                $('.dailyIncomeSpan9').css('borderRadius', '8px');
                const checkbox8 = document.querySelector('.custom-checkboxDaily9');

                if (drinksDaily >= dailyTargetDrinks) {
                    if (checkbox8) {
                        checkbox8.classList.remove('error');
                        checkbox8.classList.add('success');
                        checkbox8.textContent = '✓';
                    }
                } else if (drinksDaily < dailyTargetDrinks) {
                    if (checkbox8) {
                        checkbox8.classList.remove('success');
                        checkbox8.classList.add('error');
                        checkbox8.textContent = 'X';
                    }
                }
                if (previousDataDrinksDaily !== null && drinksDaily !== previousDataDrinksDaily) {
                    clearTimeout(timeoutIdDrinksDaily);
                    timeoutIdDrinksDaily = setTimeout(function () {
                        $('.dailyIncomeSpan9').css('background-color', '');
                    }, 3000);
                }
                previousDataDrinksDaily = drinksDaily;
            });

            $.get('http://127.0.0.1:5501/api/totalSauceDaily', function (sauceDaily) {
                var totalSauceDaily = formatNumberOrd(sauceDaily);
                var totalSauceElement = $('.dailyIncomeSpan10');
                var dailyTargetSauce = 60;
                totalSauceElement.text(totalSauceDaily + ' / ' + dailyTargetSauce);
                $('.dailyIncomeSpan10').css('background-color', 'white');
                $('.dailyIncomeSpan10').css('borderRadius', '8px');
                const checkbox9 = document.querySelector('.custom-checkboxDaily10');

                if (sauceDaily >= dailyTargetSauce) {
                    if (checkbox9) {
                        checkbox9.classList.remove('error');
                        checkbox9.classList.add('success');
                        checkbox9.textContent = '✓';
                    }
                } else if (sauceDaily < dailyTargetSauce) {
                    if (checkbox9) {
                        checkbox9.classList.remove('success');
                        checkbox9.classList.add('error');
                        checkbox9.textContent = 'X';
                    }
                }
                if (previousDataSauceDaily !== null && sauceDaily !== previousDataSauceDaily) {
                    clearTimeout(timeoutIdSauceDaily);
                    timeoutIdSauceDaily = setTimeout(function () {
                        $('.dailyIncomeSpan10').css('background-color', '');
                    }, 3000);
                }
                previousDataSauceDaily = sauceDaily;
            });


            $.get('http://127.0.0.1:5501/api/totalHomePizzaDaily', function (homePizzaDaily) {
                var totalHomePizzaDaily = formatNumberOrd(homePizzaDaily);
                var totalHomePizzaElement = $('.dailyIncomeSpan11');
                var dailyTargetHomePizza = 5;
                totalHomePizzaElement.text(totalHomePizzaDaily + ' / ' + dailyTargetHomePizza);
                $('.dailyIncomeSpan11').css('background-color', 'white');
                $('.dailyIncomeSpan11').css('borderRadius', '8px');
                const checkbox10 = document.querySelector('.custom-checkboxDaily11');

                if (homePizzaDaily >= dailyTargetHomePizza) {
                    if (checkbox10) {
                        checkbox10.classList.remove('error');
                        checkbox10.classList.add('success');
                        checkbox10.textContent = '✓';
                    }
                } else if (homePizzaDaily < dailyTargetHomePizza) {
                    if (checkbox10) {
                        checkbox10.classList.remove('success');
                        checkbox10.classList.add('error');
                        checkbox10.textContent = 'X';
                    }
                }
                if (previousDataHomePizzaDaily !== null && homePizzaDaily !== previousDataHomePizzaDaily) {
                    clearTimeout(timeoutIdHomePizzaDaily);
                    timeoutIdHomePizzaDaily = setTimeout(function () {
                        $('.dailyIncomeSpan11').css('background-color', '');
                    }, 3000);
                }
                previousDataHomePizzaDaily = homePizzaDaily;
            });

            $.get('http://127.0.0.1:5501/api/total4StaggioniDaily', function (staggioniDaily) {
                var total4StaggioniDaily = formatNumberOrd(staggioniDaily);
                var total4StaggioniElement = $('.dailyIncomeSpan12');
                var dailyTarget4Staggioni = 5;
                total4StaggioniElement.text(total4StaggioniDaily + ' / ' + dailyTarget4Staggioni);
                $('.dailyIncomeSpan12').css('background-color', 'white');
                $('.dailyIncomeSpan12').css('borderRadius', '8px');
                const checkbox11 = document.querySelector('.custom-checkboxDaily12');

                if (staggioniDaily >= dailyTarget4Staggioni) {
                    if (checkbox11) {
                        checkbox11.classList.remove('error');
                        checkbox11.classList.add('success');
                        checkbox11.textContent = '✓';
                    }
                } else if (staggioniDaily < dailyTarget4Staggioni) {
                    if (checkbox11) {
                        checkbox11.classList.remove('success');
                        checkbox11.classList.add('error');
                        checkbox11.textContent = 'X';
                    }
                }
                if (previousData4StaggioniDaily !== null && staggioniDaily !== previousData4StaggioniDaily) {
                    clearTimeout(timeoutId4StaggioniDaily);
                    timeoutId4StaggioniDaily = setTimeout(function () {
                        $('.dailyIncomeSpan12').css('background-color', '');
                    }, 3000);
                }
                previousData4StaggioniDaily = staggioniDaily;
            });
            $.get('http://127.0.0.1:5501/api/totalDiavolaDaily', function (diavolaDaily) {
                var totalDiavolaDaily = formatNumberOrd(diavolaDaily);
                var totalDiavolaElement = $('.dailyIncomeSpan13');
                var dailyTargetDiavola = 5;
                totalDiavolaElement.text(totalDiavolaDaily + ' / ' + dailyTargetDiavola);
                $('.dailyIncomeSpan13').css('background-color', 'white');
                $('.dailyIncomeSpan13').css('borderRadius', '8px');
                const checkbox12 = document.querySelector('.custom-checkboxDaily13');

                if (diavolaDaily >= dailyTargetDiavola) {
                    if (checkbox12) {
                        checkbox12.classList.remove('error');
                        checkbox12.classList.add('success');
                        checkbox12.textContent = '✓';
                    }
                } else if (diavolaDaily < dailyTargetDiavola) {
                    if (checkbox12) {
                        checkbox12.classList.remove('success');
                        checkbox12.classList.add('error');
                        checkbox12.textContent = 'X';
                    }
                }
                if (previousDataDiavolaDaily !== null && diavolaDaily !== previousDataDiavolaDaily) {
                    clearTimeout(timeoutIdDiavolaDaily);
                    timeoutIdDiavolaDaily = setTimeout(function () {
                        $('.dailyIncomeSpan13').css('background-color', '');
                    }, 3000);
                }
                previousDataDiavolaDaily = diavolaDaily;
            });
        }
        var previousDataWeekly = null;
        var timeoutIdWeekly = null;
        var previousDataOrdWeekly = null;
        var timeoutIdOrdWeekly = null;
        var previousDataItmWeekly = null;
        var timeoutIdItmWeekly = null;
        var previousDataPizzasWeekly = null;
        var timeoutIdPizzasWeekly = null;
        var previousDataPorkWeekly = null;
        var timeoutIdPorkWeekly = null;
        var previousDataPastaWeekly = null;
        var timeoutIdPastaWeekly = null;
        var previousDataChickenWeekly = null;
        var timeoutIdChickenWeekly = null;
        var previousDataFishWeekly = null;
        var timeoutIdFishWeekly = null;
        var previousDataDrinksWeekly = null;
        var timeoutIdDrinksWeekly = null;
        var previousDataSauceWeekly = null;
        var timeoutIdSauceWeekly = null;
        var previousDataHomePizzaWeekly = null;
        var timeoutIdHomePizzaWeekly = null;
        var previousData4StaggioniWeekly = null;
        var timeoutId4StaggioniWeekly = null;
        var previousDataDiavolaWeekly = null;
        var timeoutIdDiavolaWeekly = null;
        function displayTotalWeekly() {
            $.get('http://127.0.0.1:5501/api/totalMoneyWeekly', function (data) {
                var totalMoneyWeekly = formatNumber(data.totalMoneyWeekly);
                var totalElement = $('.weeklyIncomeSpan1');
                var weeklyTargetIncome = 1500;
                var weeklyTargetIncomeFormat = formatNumber(weeklyTargetIncome);
                totalElement.text("RON " + totalMoneyWeekly + ' / ' + 'RON ' + weeklyTargetIncomeFormat);
                $('.weeklyIncomeSpan1').css('background-color', 'white');
                $('.weeklyIncomeSpan1').css('borderRadius', '8px');
                const checkbox = document.querySelector('.custom-checkboxWeekly1');

                if (data.totalMoneyWeekly >= weeklyTargetIncome) {
                    if (checkbox) {
                        checkbox.classList.remove('error');
                        checkbox.classList.add('success');
                        checkbox.textContent = '✓';
                    }
                } else if (data.totalMoneyWeekly < weeklyTargetIncome) {
                    if (checkbox) {
                        checkbox.classList.remove('success');
                        checkbox.classList.add('error');
                        checkbox.textContent = 'X';
                    }
                }

                if (previousDataWeekly !== null && data.totalMoneyWeekly !== previousDataWeekly) {
                    if (data.totalMoneyWeekly > previousDataWeekly) {
                        $('.weeklyIncomeSpan1').css('background-color', 'rgb(177, 236, 190)');
                    } else if (data.totalMoneyWeekly < previousDataWeekly) {
                        $('.weeklyIncomeSpan1').css('background-color', 'rgb(211, 129, 129)');
                    } else {
                        $('.weeklyIncomeSpan1').css('background-color', 'white');
                    }
                    clearTimeout(timeoutIdWeekly);
                    timeoutIdWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan1').css('background-color', '');
                    }, 3000);
                }
                previousDataWeekly = data.totalMoneyWeekly;

                var totalOrdersWeekly = formatNumberOrd(data.totalOrdersWeekly);
                var totalOrdElement = $('.weeklyIncomeSpan2');
                var weeklyTargetOrders = 100;
                totalOrdElement.text(totalOrdersWeekly + ' / ' + weeklyTargetOrders);
                $('.weeklyIncomeSpan2').css('background-color', 'white');
                $('.weeklyIncomeSpan2').css('borderRadius', '8px');
                const checkbox1 = document.querySelector('.custom-checkboxWeekly2');

                if (data.totalOrdersWeekly >= weeklyTargetOrders) {
                    if (checkbox1) {
                        checkbox1.classList.remove('error');
                        checkbox1.classList.add('success');
                        checkbox1.textContent = '✓';
                    }
                } else if (data.totalOrdersWeekly < weeklyTargetOrders) {
                    if (checkbox1) {
                        checkbox1.classList.remove('success');
                        checkbox1.classList.add('error');
                        checkbox1.textContent = 'X';
                    }
                }
                if (previousDataOrdWeekly !== null && data.totalOrdersWeekly !== previousDataOrdWeekly) {
                    clearTimeout(timeoutIdOrdWeekly);
                    timeoutIdOrdWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan2').css('background-color', '');
                    }, 3000);
                }
                previousDataOrdWeekly = data.totalOrdersWeekly;
            });
            $.get('http://127.0.0.1:5501/api/totalSelledItemsWeekly', function (dataWeekly) {
                var totalItemsWeekly = formatNumberOrd(dataWeekly);
                var totalItmElement = $('.weeklyIncomeSpan3');
                var weeklyTargetItems = 210;
                totalItmElement.text(totalItemsWeekly + ' / ' + weeklyTargetItems);
                $('.weeklyIncomeSpan3').css('background-color', 'white');
                $('.weeklyIncomeSpan3').css('borderRadius', '8px');
                const checkbox2 = document.querySelector('.custom-checkboxWeekly3');
                if (dataWeekly >= weeklyTargetItems) {
                    if (checkbox2) {
                        checkbox2.classList.remove('error');
                        checkbox2.classList.add('success');
                        checkbox2.textContent = '✓';
                    }
                } else if (dataWeekly < weeklyTargetItems) {
                    if (checkbox2) {
                        checkbox2.classList.remove('success');
                        checkbox2.classList.add('error');
                        checkbox2.textContent = 'X';
                    }
                }
                if (previousDataItmWeekly !== null && dataWeekly !== previousDataItmWeekly) {
                    clearTimeout(timeoutIdItmWeekly);
                    timeoutIdItmWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan3').css('background-color', '');
                    }, 3000);
                }
                previousDataItmWeekly = dataWeekly;
            });
            $.get('http://127.0.0.1:5501/api/totalPizzasWeekly', function (pizzasWeekly) {
                var totalPizzasWeekly = formatNumberOrd(pizzasWeekly);
                var totalPizzasElement = $('.weeklyIncomeSpan4');
                var weeklyTargetPizzas = 100;
                totalPizzasElement.text(totalPizzasWeekly + ' / ' + weeklyTargetPizzas);
                $('.weeklyIncomeSpan4').css('background-color', 'white');
                $('.weeklyIncomeSpan4').css('borderRadius', '8px');
                const checkbox3 = document.querySelector('.custom-checkboxWeekly4');

                if (pizzasWeekly >= weeklyTargetPizzas) {
                    if (checkbox3) {
                        checkbox3.classList.remove('error');
                        checkbox3.classList.add('success');
                        checkbox3.textContent = '✓';
                    }
                } else if (pizzasWeekly < weeklyTargetPizzas) {
                    if (checkbox3) {
                        checkbox3.classList.remove('success');
                        checkbox3.classList.add('error');
                        checkbox3.textContent = 'X';
                    }
                }
                if (previousDataPizzasWeekly !== null && pizzasWeekly !== previousDataPizzasWeekly) {
                    clearTimeout(timeoutIdPizzasWeekly);
                    timeoutIdPizzasWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan4').css('background-color', '');
                    }, 3000);
                }
                previousDataPizzasWeekly = pizzasWeekly;
            });

            $.get('http://127.0.0.1:5501/api/totalPorkWeekly', function (porkWeekly) {
                var totalPorkWeekly = formatNumberOrd(porkWeekly);
                var totalPorkElement = $('.weeklyIncomeSpan5');
                var weeklyTargetPork = 30;
                totalPorkElement.text(totalPorkWeekly + ' / ' + weeklyTargetPork);
                $('.weeklyIncomeSpan5').css('background-color', 'white');
                $('.weeklyIncomeSpan5').css('borderRadius', '8px');
                const checkbox4 = document.querySelector('.custom-checkboxWeekly5');

                if (porkWeekly >= weeklyTargetPork) {
                    if (checkbox4) {
                        checkbox4.classList.remove('error');
                        checkbox4.classList.add('success');
                        checkbox4.textContent = '✓';
                    }
                } else if (porkWeekly < weeklyTargetPork) {
                    if (checkbox4) {
                        checkbox4.classList.remove('success');
                        checkbox4.classList.add('error');
                        checkbox4.textContent = 'X';
                    }
                }
                if (previousDataPorkWeekly !== null && porkWeekly !== previousDataPorkWeekly) {
                    clearTimeout(timeoutIdPorkWeekly);
                    timeoutIdPorkWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan5').css('background-color', '');
                    }, 3000);
                }
                previousDataPorkWeekly = porkWeekly;
            });

            $.get('http://127.0.0.1:5501/api/totalPastaWeekly', function (pastaWeekly) {
                var totalPastaWeekly = formatNumberOrd(pastaWeekly);
                var totalPastaElement = $('.weeklyIncomeSpan6');
                var weeklyTargetPasta = 30;
                totalPastaElement.text(totalPastaWeekly + ' / ' + weeklyTargetPasta);
                $('.weeklyIncomeSpan6').css('background-color', 'white');
                $('.weeklyIncomeSpan6').css('borderRadius', '8px');
                const checkbox5 = document.querySelector('.custom-checkboxWeekly6');

                if (pastaWeekly >= weeklyTargetPasta) {
                    if (checkbox5) {
                        checkbox5.classList.remove('error');
                        checkbox5.classList.add('success');
                        checkbox5.textContent = '✓';
                    }
                } else if (pastaWeekly < weeklyTargetPasta) {
                    if (checkbox5) {
                        checkbox5.classList.remove('success');
                        checkbox5.classList.add('error');
                        checkbox5.textContent = 'X';
                    }
                }
                if (previousDataPastaWeekly !== null && pastaWeekly !== previousDataPastaWeekly) {
                    clearTimeout(timeoutIdPastaWeekly);
                    timeoutIdPastaWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan6').css('background-color', '');
                    }, 3000);
                }
                previousDataPastaWeekly = pastaWeekly;
            });

            $.get('http://127.0.0.1:5501/api/totalChickenWeekly', function (chickenWeekly) {
                var totalChickenWeekly = formatNumberOrd(chickenWeekly);
                var totalChickenElement = $('.weeklyIncomeSpan7');
                var weeklyTargetChicken = 30;
                totalChickenElement.text(totalChickenWeekly + ' / ' + weeklyTargetChicken);
                $('.weeklyIncomeSpan7').css('background-color', 'white');
                $('.weeklyIncomeSpan7').css('borderRadius', '8px');
                const checkbox6 = document.querySelector('.custom-checkboxWeekly7');

                if (chickenWeekly >= weeklyTargetChicken) {
                    if (checkbox6) {
                        checkbox6.classList.remove('error');
                        checkbox6.classList.add('success');
                        checkbox6.textContent = '✓';
                    }
                } else if (chickenWeekly < weeklyTargetChicken) {
                    if (checkbox6) {
                        checkbox6.classList.remove('success');
                        checkbox6.classList.add('error');
                        checkbox6.textContent = 'X';
                    }
                }
                if (previousDataChickenWeekly !== null && chickenWeekly !== previousDataChickenWeekly) {
                    clearTimeout(timeoutIdChickenWeekly);
                    timeoutIdChickenWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan7').css('background-color', '');
                    }, 3000);
                }
                previousDataChickenWeekly = chickenWeekly;
            });

            $.get('http://127.0.0.1:5501/api/totalFishWeekly', function (fishWeekly) {
                var totalFishWeekly = formatNumberOrd(fishWeekly);
                var totalFishElement = $('.weeklyIncomeSpan8');
                var weeklyTargetFish = 30;
                totalFishElement.text(totalFishWeekly + ' / ' + weeklyTargetFish);
                $('.weeklyIncomeSpan8').css('background-color', 'white');
                $('.weeklyIncomeSpan8').css('borderRadius', '8px');
                const checkbox7 = document.querySelector('.custom-checkboxWeekly8');

                if (fishWeekly >= weeklyTargetFish) {
                    if (checkbox7) {
                        checkbox7.classList.remove('error');
                        checkbox7.classList.add('success');
                        checkbox7.textContent = '✓';
                    }
                } else if (fishWeekly < weeklyTargetFish) {
                    if (checkbox7) {
                        checkbox7.classList.remove('success');
                        checkbox7.classList.add('error');
                        checkbox7.textContent = 'X';
                    }
                }
                if (previousDataFishWeekly !== null && fishWeekly !== previousDataFishWeekly) {
                    clearTimeout(timeoutIdFishWeekly);
                    timeoutIdFishWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan8').css('background-color', '');
                    }, 3000);
                }
                previousDataFishWeekly = fishWeekly;
            });

            $.get('http://127.0.0.1:5501/api/totalDrinksWeekly', function (drinksWeekly) {
                var totalDrinksWeekly = formatNumberOrd(drinksWeekly);
                var totalDrinksElement = $('.weeklyIncomeSpan9');
                var weeklyTargetDrinks = 210;
                totalDrinksElement.text(totalDrinksWeekly + ' / ' + weeklyTargetDrinks);
                $('.weeklyIncomeSpan9').css('background-color', 'white');
                $('.weeklyIncomeSpan9').css('borderRadius', '8px');
                const checkbox8 = document.querySelector('.custom-checkboxWeekly9');

                if (drinksWeekly >= weeklyTargetDrinks) {
                    if (checkbox8) {
                        checkbox8.classList.remove('error');
                        checkbox8.classList.add('success');
                        checkbox8.textContent = '✓';
                    }
                } else if (drinksWeekly < weeklyTargetDrinks) {
                    if (checkbox8) {
                        checkbox8.classList.remove('success');
                        checkbox8.classList.add('error');
                        checkbox8.textContent = 'X';
                    }
                }
                if (previousDataDrinksWeekly !== null && drinksWeekly !== previousDataDrinksWeekly) {
                    clearTimeout(timeoutIdDrinksWeekly);
                    timeoutIdDrinksWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan9').css('background-color', '');
                    }, 3000);
                }
                previousDataDrinksWeekly = drinksWeekly;
            });

            $.get('http://127.0.0.1:5501/api/totalSauceWeekly', function (sauceWeekly) {
                var totalSauceWeekly = formatNumberOrd(sauceWeekly);
                var totalSauceElement = $('.weeklyIncomeSpan10');
                var weeklyTargetSauce = 420;
                totalSauceElement.text(totalSauceWeekly + ' / ' + weeklyTargetSauce);
                $('.weeklyIncomeSpan10').css('background-color', 'white');
                $('.weeklyIncomeSpan10').css('borderRadius', '8px');
                const checkbox9 = document.querySelector('.custom-checkboxWeekly10');

                if (sauceWeekly >= weeklyTargetSauce) {
                    if (checkbox9) {
                        checkbox9.classList.remove('error');
                        checkbox9.classList.add('success');
                        checkbox9.textContent = '✓';
                    }
                } else if (sauceWeekly < weeklyTargetSauce) {
                    if (checkbox9) {
                        checkbox9.classList.remove('success');
                        checkbox9.classList.add('error');
                        checkbox9.textContent = 'X';
                    }
                }
                if (previousDataSauceWeekly !== null && sauceWeekly !== previousDataSauceWeekly) {
                    clearTimeout(timeoutIdSauceWeekly);
                    timeoutIdSauceWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan10').css('background-color', '');
                    }, 3000);
                }
                previousDataSauceWeekly = sauceWeekly;
            });


            $.get('http://127.0.0.1:5501/api/totalHomePizzaWeekly', function (homePizzaWeekly) {
                var totalHomePizzaWeekly = formatNumberOrd(homePizzaWeekly);
                var totalHomePizzaElement = $('.weeklyIncomeSpan11');
                var weeklyTargetHomePizza = 30;
                totalHomePizzaElement.text(totalHomePizzaWeekly + ' / ' + weeklyTargetHomePizza);
                $('.weeklyIncomeSpan11').css('background-color', 'white');
                $('.weeklyIncomeSpan11').css('borderRadius', '8px');
                const checkbox10 = document.querySelector('.custom-checkboxWeekly11');

                if (homePizzaWeekly >= weeklyTargetHomePizza) {
                    if (checkbox10) {
                        checkbox10.classList.remove('error');
                        checkbox10.classList.add('success');
                        checkbox10.textContent = '✓';
                    }
                } else if (homePizzaWeekly < weeklyTargetHomePizza) {
                    if (checkbox10) {
                        checkbox10.classList.remove('success');
                        checkbox10.classList.add('error');
                        checkbox10.textContent = 'X';
                    }
                }
                if (previousDataHomePizzaWeekly !== null && homePizzaWeekly !== previousDataHomePizzaWeekly) {
                    clearTimeout(timeoutIdHomePizzaWeekly);
                    timeoutIdHomePizzaWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan11').css('background-color', '');
                    }, 3000);
                }
                previousDataHomePizzaWeekly = homePizzaWeekly;
            });

            $.get('http://127.0.0.1:5501/api/total4StaggioniWeekly', function (staggioniWeekly) {
                var total4StaggioniWeekly = formatNumberOrd(staggioniWeekly);
                var total4StaggioniElement = $('.weeklyIncomeSpan12');
                var weeklyTarget4Staggioni = 30;
                total4StaggioniElement.text(total4StaggioniWeekly + ' / ' + weeklyTarget4Staggioni);
                $('.weeklyIncomeSpan12').css('background-color', 'white');
                $('.weeklyIncomeSpan12').css('borderRadius', '8px');
                const checkbox11 = document.querySelector('.custom-checkboxWeekly12');

                if (staggioniWeekly >= weeklyTarget4Staggioni) {
                    if (checkbox11) {
                        checkbox11.classList.remove('error');
                        checkbox11.classList.add('success');
                        checkbox11.textContent = '✓';
                    }
                } else if (staggioniWeekly < weeklyTarget4Staggioni) {
                    if (checkbox11) {
                        checkbox11.classList.remove('success');
                        checkbox11.classList.add('error');
                        checkbox11.textContent = 'X';
                    }
                }
                if (previousData4StaggioniWeekly !== null && staggioniWeekly !== previousData4StaggioniWeekly) {
                    clearTimeout(timeoutId4StaggioniWeekly);
                    timeoutId4StaggioniWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan12').css('background-color', '');
                    }, 3000);
                }
                previousData4StaggioniWeekly = staggioniWeekly;
            });

            $.get('http://127.0.0.1:5501/api/totalDiavolaWeekly', function (diavolaWeekly) {
                var totalDiavolaWeekly = formatNumberOrd(diavolaWeekly);
                var totalDiavolaElement = $('.weeklyIncomeSpan13');
                var weeklyTargetDiavola = 30;
                totalDiavolaElement.text(totalDiavolaWeekly + ' / ' + weeklyTargetDiavola);
                $('.weeklyIncomeSpan13').css('background-color', 'white');
                $('.weeklyIncomeSpan13').css('borderRadius', '8px');
                const checkbox12 = document.querySelector('.custom-checkboxWeekly13');

                if (diavolaWeekly >= weeklyTargetDiavola) {
                    if (checkbox12) {
                        checkbox12.classList.remove('error');
                        checkbox12.classList.add('success');
                        checkbox12.textContent = '✓';
                    }
                } else if (diavolaWeekly < weeklyTargetDiavola) {
                    if (checkbox12) {
                        checkbox12.classList.remove('success');
                        checkbox12.classList.add('error');
                        checkbox12.textContent = 'X';
                    }
                }
                if (previousDataDiavolaWeekly !== null && diavolaWeekly !== previousDataDiavolaWeekly) {
                    clearTimeout(timeoutIdDiavolaWeekly);
                    timeoutIdDiavolaWeekly = setTimeout(function () {
                        $('.weeklyIncomeSpan13').css('background-color', '');
                    }, 3000);
                }
                previousDataDiavolaWeekly = diavolaWeekly;
            });
        }

        var previousDataMonthly = null;
        var timeoutIdMonthly = null;
        var previousDataOrdMonthly = null;
        var timeoutIdOrdMonthly = null;
        var previousDataItmMonthly = null;
        var timeoutIdItmMonthly = null;
        var previousDataPizzasMonthly = null;
        var timeoutIdPizzasMonthly = null;
        var previousDataPorkMonthly = null;
        var timeoutIdPorkMonthly = null;
        var previousDataPastaMonthly = null;
        var timeoutIdPastaMonthly = null;
        var previousDataChickenMonthly = null;
        var timeoutIdChickenMonthly = null;
        var previousDataFishMonthly = null;
        var timeoutIdFishMonthly = null;
        var previousDataDrinksMonthly = null;
        var timeoutIdDrinksMonthly = null;
        var previousDataSauceMonthly = null;
        var timeoutIdSauceMonthly = null;
        var previousDataHomePizzaMonthly = null;
        var timeoutIdHomePizzaMonthly = null;
        var previousData4StaggioniMonthly = null;
        var timeoutId4StaggioniMonthly = null;
        var previousDataDiavolaMonthly = null;
        var timeoutIdDiavolaMonthly = null;
        function displayTotalMonthly() {
            $.get('http://127.0.0.1:5501/api/totalMoneyMonthly', function (data) {
                var totalMoneyMonthly = formatNumber(data.totalMoneyMonthly);
                var totalElement = $('.monthlyIncomeSpan1');
                var monthlyTargetIncome = 4000;
                var monthlyTargetIncomeFormat = formatNumber(monthlyTargetIncome);
                totalElement.text("RON " + totalMoneyMonthly + ' / ' + 'RON ' + monthlyTargetIncomeFormat);
                $('.monthlyIncomeSpan1').css('background-color', 'white');
                $('.monthlyIncomeSpan1').css('borderRadius', '8px');
                const checkbox = document.querySelector('.custom-checkboxMonthly1');

                if (data.totalMoneyMonthly >= monthlyTargetIncome) {
                    if (checkbox) {
                        checkbox.classList.remove('error');
                        checkbox.classList.add('success');
                        checkbox.textContent = '✓';
                    }
                } else if (data.totalMoneyMonthly < monthlyTargetIncome) {
                    if (checkbox) {
                        checkbox.classList.remove('success');
                        checkbox.classList.add('error');
                        checkbox.textContent = 'X';
                    }
                }

                if (previousDataMonthly !== null && data.totalMoneyMonthly !== previousDataMonthly) {
                    if (data.totalMoneyMonthly > previousDataMonthly) {
                        $('.monthlyIncomeSpan1').css('background-color', 'rgb(177, 236, 190)');
                    } else if (data.totalMoneyMonthly < previousDataMonthly) {
                        $('.monthlyIncomeSpan1').css('background-color', 'rgb(211, 129, 129)');
                    } else {
                        $('.monthlyIncomeSpan1').css('background-color', 'white');
                    }
                    clearTimeout(timeoutIdMonthly);
                    timeoutIdMonthly = setTimeout(function () {
                        $('.montlyIncomeSpan1').css('background-color', '');
                    }, 3000);
                }
                previousDataMonthly = data.totalMoneyMonthly;

                var totalOrdersMonthly = formatNumberOrd(data.totalOrdersMonthly);
                var totalOrdElement = $('.monthlyIncomeSpan2');
                var monthlyTargetOrders = 350;
                totalOrdElement.text(totalOrdersMonthly + ' / ' + monthlyTargetOrders);
                $('.monthlyIncomeSpan2').css('background-color', 'white');
                $('.monthlyIncomeSpan2').css('borderRadius', '8px');
                const checkbox1 = document.querySelector('.custom-checkboxMonthly2');

                if (data.totalOrdersMonthly >= monthlyTargetOrders) {
                    if (checkbox1) {
                        checkbox1.classList.remove('error');
                        checkbox1.classList.add('success');
                        checkbox1.textContent = '✓';
                    }
                } else if (data.totalOrdersMonthly < monthlyTargetOrders) {
                    if (checkbox1) {
                        checkbox1.classList.remove('success');
                        checkbox1.classList.add('error');
                        checkbox1.textContent = 'X';
                    }
                }
                if (previousDataOrdMonthly !== null && data.totalOrdersMonthly !== previousDataOrdMonthly) {
                    clearTimeout(timeoutIdOrdMonthly);
                    timeoutIdOrdMonthly = setTimeout(function () {
                        $('.montlyIncomeSpan2').css('background-color', '');
                    }, 3000);
                }
                previousDataOrdMonthly = data.totalOrdersMonthly;
            });

            $.get('http://127.0.0.1:5501/api/totalSelledItemsMonthly', function (dataMonthly) {
                var totalItemsMonthly = formatNumberOrd(dataMonthly);
                var totalItmElement = $('.monthlyIncomeSpan3');
                var monthlyTargetItems = 900;
                totalItmElement.text(totalItemsMonthly + ' / ' + monthlyTargetItems);
                $('.monthlyIncomeSpan3').css('background-color', 'white');
                $('.monthlyIncomeSpan3').css('borderRadius', '8px');
                const checkbox2 = document.querySelector('.custom-checkboxMonthly3');

                if (dataMonthly >= monthlyTargetItems) {
                    if (checkbox2) {
                        checkbox2.classList.remove('error');
                        checkbox2.classList.add('success');
                        checkbox2.textContent = '✓';
                    }
                } else if (dataMonthly < monthlyTargetItems) {
                    if (checkbox2) {
                        checkbox2.classList.remove('success');
                        checkbox2.classList.add('error');
                        checkbox2.textContent = 'X';
                    }
                }
                if (previousDataItmMonthly !== null && dataMonthly !== previousDataItmMonthly) {
                    clearTimeout(timeoutIdItmMonthly);
                    timeoutIdItmMonthly = setTimeout(function () {
                        $('.monthlyIncomeSpan3').css('background-color', '');
                    }, 3000);
                }
                previousDataItmMonthly = dataMonthly;
            });
            $.get('http://127.0.0.1:5501/api/totalPizzasMonthly', function (pizzasMonthly) {
                var totalPizzasMonthly = formatNumberOrd(pizzasMonthly);
                var totalPizzasElement = $('.monthlyIncomeSpan4');
                var monthlyTargetPizzas = 400;
                totalPizzasElement.text(totalPizzasMonthly + ' / ' + monthlyTargetPizzas);
                $('.monthlyIncomeSpan4').css('background-color', 'white');
                $('.monthlyIncomeSpan4').css('borderRadius', '8px');
                const checkbox3 = document.querySelector('.custom-checkboxMonthly4');

                if (pizzasMonthly >= monthlyTargetPizzas) {
                    if (checkbox3) {
                        checkbox3.classList.remove('error');
                        checkbox3.classList.add('success');
                        checkbox3.textContent = '✓';
                    }
                } else if (pizzasMonthly < monthlyTargetPizzas) {
                    if (checkbox3) {
                        checkbox3.classList.remove('success');
                        checkbox3.classList.add('error');
                        checkbox3.textContent = 'X';
                    }
                }
                if (previousDataPizzasMonthly !== null && pizzasMonthly !== previousDataPizzasMonthly) {
                    clearTimeout(timeoutIdPizzasMonthly);
                    timeoutIdPizzasMonthly = setTimeout(function () {
                        $('.monthlyIncomeSpan4').css('background-color', '');
                    }, 3000);
                }
                previousDataPizzasMonthly = pizzasMonthly;
            });
            $.get('http://127.0.0.1:5501/api/totalPorkMonthly', function (porkMonthly) {
                var totalPorkMonthly = formatNumberOrd(porkMonthly);
                var totalPorkElement = $('.monthlyIncomeSpan5');
                var monthlyTargetPork = 120;
                totalPorkElement.text(totalPorkMonthly + ' / ' + monthlyTargetPork);
                $('.monthlyIncomeSpan5').css('background-color', 'white');
                $('.monthlyIncomeSpan5').css('borderRadius', '8px');
                const checkbox4 = document.querySelector('.custom-checkboxMonthly5');

                if (porkMonthly >= monthlyTargetPork) {
                    if (checkbox4) {
                        checkbox4.classList.remove('error');
                        checkbox4.classList.add('success');
                        checkbox4.textContent = '✓';
                    }
                } else if (porkMonthly < monthlyTargetPork) {
                    if (checkbox4) {
                        checkbox4.classList.remove('success');
                        checkbox4.classList.add('error');
                        checkbox4.textContent = 'X';
                    }
                }
                if (previousDataPorkMonthly !== null && porkMonthly !== previousDataPorkMonthly) {
                    clearTimeout(timeoutIdPorkMonthly);
                    timeoutIdPorkMonthly = setTimeout(function () {
                        $('.monthlyIncomeSpan5').css('background-color', '');
                    }, 3000);
                }
                previousDataPorkMonthly = porkMonthly;
            });

            $.get('http://127.0.0.1:5501/api/totalPastaMonthly', function (pastaMonthly) {
                var totalPastaMonthly = formatNumberOrd(pastaMonthly);
                var totalPastaElement = $('.monthlyIncomeSpan6');
                var monthlyTargetPasta = 120;
                totalPastaElement.text(totalPastaMonthly + ' / ' + monthlyTargetPasta);
                $('.monthlyIncomeSpan6').css('background-color', 'white');
                $('.monthlyIncomeSpan6').css('borderRadius', '8px');
                const checkbox5 = document.querySelector('.custom-checkboxMonthly6');

                if (pastaMonthly >= monthlyTargetPasta) {
                    if (checkbox5) {
                        checkbox5.classList.remove('error');
                        checkbox5.classList.add('success');
                        checkbox5.textContent = '✓';
                    }
                } else if (pastaMonthly < monthlyTargetPasta) {
                    if (checkbox5) {
                        checkbox5.classList.remove('success');
                        checkbox5.classList.add('error');
                        checkbox5.textContent = 'X';
                    }
                }
                if (previousDataPastaMonthly !== null && pastaMonthly !== previousDataPastaMonthly) {
                    clearTimeout(timeoutIdPastaMonthly);
                    timeoutIdPastaMonthly = setTimeout(function () {
                        $('.monthlyIncomeSpan6').css('background-color', '');
                    }, 3000);
                }
                previousDataPastaMonthly = pastaMonthly;
            });

            $.get('http://127.0.0.1:5501/api/totalChickenMonthly', function (chickenMonthly) {
                var totalChickenMonthly = formatNumberOrd(chickenMonthly);
                var totalChickenElement = $('.monthlyIncomeSpan7');
                var monthlyTargetChicken = 120;
                totalChickenElement.text(totalChickenMonthly + ' / ' + monthlyTargetChicken);
                $('.monthlyIncomeSpan7').css('background-color', 'white');
                $('.monthlyIncomeSpan7').css('borderRadius', '8px');
                const checkbox6 = document.querySelector('.custom-checkboxMonthly7');

                if (chickenMonthly >= monthlyTargetChicken) {
                    if (checkbox6) {
                        checkbox6.classList.remove('error');
                        checkbox6.classList.add('success');
                        checkbox6.textContent = '✓';
                    }
                } else if (chickenMonthly < monthlyTargetChicken) {
                    if (checkbox6) {
                        checkbox6.classList.remove('success');
                        checkbox6.classList.add('error');
                        checkbox6.textContent = 'X';
                    }
                }
                if (previousDataChickenMonthly !== null && chickenMonthly !== previousDataChickenMonthly) {
                    clearTimeout(timeoutIdChickenMonthly);
                    timeoutIdChickenMonthly = setTimeout(function () {
                        $('.monthlyIncomeSpan7').css('background-color', '');
                    }, 3000);
                }
                previousDataChickenMonthly = chickenMonthly;
            });

            $.get('http://127.0.0.1:5501/api/totalFishMonthly', function (fishMonthly) {
                var totalFishMonthly = formatNumberOrd(fishMonthly);
                var totalFishElement = $('.monthlyIncomeSpan8');
                var monthlyTargetFish = 120;
                totalFishElement.text(totalFishMonthly + ' / ' + monthlyTargetFish);
                $('.monthlyIncomeSpan8').css('background-color', 'white');
                $('.monthlyIncomeSpan8').css('borderRadius', '8px');
                const checkbox7 = document.querySelector('.custom-checkboxMonthly8');

                if (fishMonthly >= monthlyTargetFish) {
                    if (checkbox7) {
                        checkbox7.classList.remove('error');
                        checkbox7.classList.add('success');
                        checkbox7.textContent = '✓';
                    }
                } else if (fishMonthly < monthlyTargetFish) {
                    if (checkbox7) {
                        checkbox7.classList.remove('success');
                        checkbox7.classList.add('error');
                        checkbox7.textContent = 'X';
                    }
                }
                if (previousDataFishMonthly !== null && fishMonthly !== previousDataFishMonthly) {
                    clearTimeout(timeoutIdFishMonthly);
                    timeoutIdFishMonthly = setTimeout(function () {
                        $('.monthlyIncomeSpan8').css('background-color', '');
                    }, 3000);
                }
                previousDataFishMonthly = fishMonthly;
            });

            $.get('http://127.0.0.1:5501/api/totalDrinksMonthly', function (drinksMonthly) {
                var totalDrinksMonthly = formatNumberOrd(drinksMonthly);
                var totalDrinksElement = $('.monthlyIncomeSpan9');
                var monthlyTargetDrinks = 800;
                totalDrinksElement.text(totalDrinksMonthly + ' / ' + monthlyTargetDrinks);
                $('.monthlyIncomeSpan9').css('background-color', 'white');
                $('.monthlyIncomeSpan9').css('borderRadius', '8px');
                const checkbox8 = document.querySelector('.custom-checkboxMonthly9');

                if (drinksMonthly >= monthlyTargetDrinks) {
                    if (checkbox8) {
                        checkbox8.classList.remove('error');
                        checkbox8.classList.add('success');
                        checkbox8.textContent = '✓';
                    }
                } else if (drinksMonthly < monthlyTargetDrinks) {
                    if (checkbox8) {
                        checkbox8.classList.remove('success');
                        checkbox8.classList.add('error');
                        checkbox8.textContent = 'X';
                    }
                }
                if (previousDataDrinksMonthly !== null && drinksMonthly !== previousDataDrinksMonthly) {
                    clearTimeout(timeoutIdDrinksMonthly);
                    timeoutIdDrinksMonthly = setTimeout(function () {
                        $('.monthlyIncomeSpan9').css('background-color', '');
                    }, 3000);
                }
                previousDataDrinksMonthly = drinksMonthly;
            });

            $.get('http://127.0.0.1:5501/api/totalSauceMonthly', function (sauceMonthly) {
                var totalSauceMonthly = formatNumberOrd(sauceMonthly);
                var totalSauceElement = $('.monthlyIncomeSpan10');
                var monthlyTargetSauce = 1600;
                totalSauceElement.text(totalSauceMonthly + ' / ' + monthlyTargetSauce);
                $('.monthlyIncomeSpan10').css('background-color', 'white');
                $('.monthlyIncomeSpan10').css('borderRadius', '8px');
                const checkbox9 = document.querySelector('.custom-checkboxMonthly10');

                if (sauceMonthly >= monthlyTargetSauce) {
                    if (checkbox9) {
                        checkbox9.classList.remove('error');
                        checkbox9.classList.add('success');
                        checkbox9.textContent = '✓';
                    }
                } else if (sauceMonthly < monthlyTargetSauce) {
                    if (checkbox9) {
                        checkbox9.classList.remove('success');
                        checkbox9.classList.add('error');
                        checkbox9.textContent = 'X';
                    }
                }
                if (previousDataSauceMonthly !== null && sauceMonthly !== previousDataSauceMonthly) {
                    clearTimeout(timeoutIdSauceMonthly);
                    timeoutIdSauceMonthly = setTimeout(function () {
                        $('.monthlyIncomeSpan10').css('background-color', '');
                    }, 3000);
                }
                previousDataSauceMonthly = sauceMonthly;
            });

            $.get('http://127.0.0.1:5501/api/totalHomePizzaMonthly', function (homePizzaMonthly) {
                var totalHomePizzaMonthly = formatNumberOrd(homePizzaMonthly);
                var totalHomePizzaElement = $('.monthlyIncomeSpan11');
                var monthlyTargetHomePizza = 120;
                totalHomePizzaElement.text(totalHomePizzaMonthly + ' / ' + monthlyTargetHomePizza);
                $('.monthlyIncomeSpan11').css('background-color', 'white');
                $('.monthlyIncomeSpan11').css('borderRadius', '8px');
                const checkbox10 = document.querySelector('.custom-checkboxMonthly11');

                if (homePizzaMonthly >= monthlyTargetHomePizza) {
                    if (checkbox10) {
                        checkbox10.classList.remove('error');
                        checkbox10.classList.add('success');
                        checkbox10.textContent = '✓';
                    }
                } else if (homePizzaMonthly < monthlyTargetHomePizza) {
                    if (checkbox10) {
                        checkbox10.classList.remove('success');
                        checkbox10.classList.add('error');
                        checkbox10.textContent = 'X';
                    }
                }
                if (previousDataHomePizzaMonthly !== null && homePizzaMonthly !== previousDataHomePizzaMonthly) {
                    clearTimeout(timeoutIdHomePizzaMonthly);
                    timeoutIdHomePizzaMonthly = setTimeout(function () {
                        $('.monthlyIncomeSpan11').css('background-color', '');
                    }, 3000);
                }
                previousDataHomePizzaMonthly = homePizzaMonthly;
            });

            $.get('http://127.0.0.1:5501/api/total4StaggioniMonthly', function (staggioniMonthly) {
                var total4StaggioniMonthly = formatNumberOrd(staggioniMonthly);
                var total4StaggioniElement = $('.monthlyIncomeSpan12');
                var monthlyTarget4Staggioni = 120;
                total4StaggioniElement.text(total4StaggioniMonthly + ' / ' + monthlyTarget4Staggioni);
                $('.monthlyIncomeSpan12').css('background-color', 'white');
                $('.monthlyIncomeSpan12').css('borderRadius', '8px');
                const checkbox11 = document.querySelector('.custom-checkboxMonthly12');

                if (staggioniMonthly >= monthlyTarget4Staggioni) {
                    if (checkbox11) {
                        checkbox11.classList.remove('error');
                        checkbox11.classList.add('success');
                        checkbox11.textContent = '✓';
                    }
                } else if (staggioniMonthly < monthlyTarget4Staggioni) {
                    if (checkbox11) {
                        checkbox11.classList.remove('success');
                        checkbox11.classList.add('error');
                        checkbox11.textContent = 'X';
                    }
                }
                if (previousData4StaggioniMonthly !== null && staggioniMonthly !== previousData4StaggioniMonthly) {
                    clearTimeout(timeoutId4StaggioniMonthly);
                    timeoutId4StaggioniMonthly = setTimeout(function () {
                        $('.monthlyIncomeSpan12').css('background-color', '');
                    }, 3000);
                }
                previousData4StaggioniMonthly = staggioniMonthly;
            });
            $.get('http://127.0.0.1:5501/api/totalDiavolaMonthly', function (diavolaMonthly) {
                var totalDiavolaMonthly = formatNumberOrd(diavolaMonthly);
                var totalDiavolaElement = $('.monthlyIncomeSpan13');
                var monthlyTargetDiavola = 120;
                totalDiavolaElement.text(totalDiavolaMonthly + ' / ' + monthlyTargetDiavola);
                $('.monthlyIncomeSpan13').css('background-color', 'white');
                $('.monthlyIncomeSpan13').css('borderRadius', '8px');
                const checkbox12 = document.querySelector('.custom-checkboxMonthly13');

                if (diavolaMonthly >= monthlyTargetDiavola) {
                    if (checkbox12) {
                        checkbox12.classList.remove('error');
                        checkbox12.classList.add('success');
                        checkbox12.textContent = '✓';
                    }
                } else if (diavolaMonthly < monthlyTargetDiavola) {
                    if (checkbox12) {
                        checkbox12.classList.remove('success');
                        checkbox12.classList.add('error');
                        checkbox12.textContent = 'X';
                    }
                }
                if (previousDataDiavolaMonthly !== null && diavolaMonthly !== previousDataDiavolaMonthly) {
                    clearTimeout(timeoutIdDiavolaMonthly);
                    timeoutIdDiavolaMonthly = setTimeout(function () {
                        $('.monthlyIncomeSpan13').css('background-color', '');
                    }, 3000);
                }
                previousDataDiavolaMonthly = diavolaMonthly;
            });
        }

        var previousDataYearly = null;
        var timeoutIdYearly = null;
        var previousDataOrdYearly = null;
        var timeoutIdOrdYearly = null;
        var previousDataItmYearly = null;
        var timeoutIdItmYearly = null;
        var previousDataPizzasYearly = null;
        var timeoutIdPizzasYearly = null;
        var previousDataPorkYearly = null;
        var timeoutIdPorkYearly = null;
        var previousDataPastaYearly = null;
        var timeoutIdPastaYearly = null;
        var previousDataChickenYearly = null;
        var timeoutIdChickenYearly = null;
        var previousDataFishYearly = null;
        var timeoutIdFishYearly = null;
        var previousDataDrinksYearly = null;
        var timeoutIdDrinksYearly = null;
        var previousDataSauceYearly = null;
        var timeoutIdSauceYearly = null;
        var previousDataHomePizzaYearly = null;
        var timeoutIdHomePizzaYearly = null;
        var previousData4StaggioniYearly = null;
        var timeoutId4StaggioniYearly = null;
        var previousDataDiavolaYearly = null;
        var timeoutIdDiavolaYearly = null;
        function displayTotalYearly() {
            $.get('http://127.0.0.1:5501/api/totalMoneyYearly', function (data) {
                var totalMoneyYearly = formatNumber(data.totalMoneyYearly);
                var totalElement = $('.yearlyIncomeSpan1');
                var yearlyTargetIncome = 48000;
                var yearlyTargetIncomeFormat = formatNumber(yearlyTargetIncome);
                totalElement.text('RON ' + totalMoneyYearly + ' / ' + 'RON ' + yearlyTargetIncomeFormat);
                $('.yearlyIncomeSpan1').css('background-color', 'white');
                $('.yearlyIncomeSpan1').css('borderRadius', '8px');
                const checkbox = document.querySelector('.custom-checkboxYearly1');

                if (data.totalMoneyYearly >= yearlyTargetIncome) {
                    if (checkbox) {
                        checkbox.classList.remove('error');
                        checkbox.classList.add('success');
                        checkbox.textContent = '✓';
                    }
                } else if (data.totalMoneyYearly < yearlyTargetIncome) {
                    if (checkbox) {
                        checkbox.classList.remove('success');
                        checkbox.classList.add('error');
                        checkbox.textContent = 'X';
                    }
                }

                if (previousDataYearly !== null && data.totalMoneyYearly !== previousDataYearly) {
                    if (data.totalMoneyYearly > previousDataYearly) {
                        $('.yearlyIncomeSpan1').css('background-color', 'rgb(177, 236, 190)');
                    } else if (data.totalMoneyYearly < previousDataYearly) {
                        $('.yearlyIncomeSpan1').css('background-color', 'rgb(211, 129, 129)');
                    } else {
                        $('.yearlyIncomeSpan1').css('background-color', 'white');
                    }
                    clearTimeout(timeoutIdYearly);
                    timeoutIdYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan1').css('background-color', '');
                    }, 3000);
                }
                previousDataYearly = data.totalMoneyYearly;

                var totalOrdersYearly = formatNumberOrd(data.totalOrdersYearly);
                var totalOrdElement = $('.yearlyIncomeSpan2');
                var yearlyTargetOrders = 4200;
                totalOrdElement.text(totalOrdersYearly + ' / ' + yearlyTargetOrders);
                $('.yearlyIncomeSpan2').css('background-color', 'white');
                $('.yearlyIncomeSpan2').css('borderRadius', '8px');
                const checkbox1 = document.querySelector('.custom-checkboxYearly2');

                if (data.totalOrdersYearly >= yearlyTargetOrders) {
                    if (checkbox1) {
                        checkbox1.classList.remove('error');
                        checkbox1.classList.add('success');
                        checkbox1.textContent = '✓';
                    }
                } else if (data.totalOrdersYearly < yearlyTargetOrders) {
                    if (checkbox1) {
                        checkbox1.classList.remove('success');
                        checkbox1.classList.add('error');
                        checkbox1.textContent = 'X';
                    }
                }
                if (previousDataOrdYearly !== null && data.totalOrdersYearly !== previousDataOrdYearly) {
                    clearTimeout(timeoutIdOrdYearly);
                    timeoutIdOrdYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan2').css('background-color', '');
                    }, 3000);
                }
                previousDataOrdYearly = data.totalOrdersYearly;
            });

            $.get('http://127.0.0.1:5501/api/totalSelledItemsYearly', function (dataYearly) {
                var totalItemsYearly = formatNumberOrd(dataYearly);
                var totalItmElement = $('.yearlyIncomeSpan3');
                var yearlyTargetItems = 11000;
                totalItmElement.text(totalItemsYearly + ' / ' + yearlyTargetItems);
                $('.yearlyIncomeSpan3').css('background-color', 'white');
                $('.yearlyIncomeSpan3').css('borderRadius', '8px');
                const checkbox2 = document.querySelector('.custom-checkboxYearly3');

                if (dataYearly >= yearlyTargetItems) {
                    if (checkbox2) {
                        checkbox2.classList.remove('error');
                        checkbox2.classList.add('success');
                        checkbox2.textContent = '✓';
                    }
                } else if (dataYearly < yearlyTargetItems) {
                    if (checkbox2) {
                        checkbox2.classList.remove('success');
                        checkbox2.classList.add('error');
                        checkbox2.textContent = 'X';
                    }
                }
                if (previousDataItmYearly !== null && dataYearly !== previousDataItmYearly) {
                    clearTimeout(timeoutIdItmYearly);
                    timeoutIdItmYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan3').css('background-color', '');
                    }, 3000);
                }
                previousDataItmYearly = dataYearly;
            });
            $.get('http://127.0.0.1:5501/api/totalPizzasYearly', function (pizzasYearly) {
                var totalPizzasYearly = formatNumberOrd(pizzasYearly);
                var totalPizzasElement = $('.yearlyIncomeSpan4');
                var yearlyTargetPizzas = 4800;
                totalPizzasElement.text(totalPizzasYearly + ' / ' + yearlyTargetPizzas);
                $('.yearlyIncomeSpan4').css('background-color', 'white');
                $('.yearlyIncomeSpan4').css('borderRadius', '8px');
                const checkbox3 = document.querySelector('.custom-checkboxYearly4');

                if (pizzasYearly >= yearlyTargetPizzas) {
                    if (checkbox3) {
                        checkbox3.classList.remove('error');
                        checkbox3.classList.add('success');
                        checkbox3.textContent = '✓';
                    }
                } else if (pizzasYearly < yearlyTargetPizzas) {
                    if (checkbox3) {
                        checkbox3.classList.remove('success');
                        checkbox3.classList.add('error');
                        checkbox3.textContent = 'X';
                    }
                }
                if (previousDataPizzasYearly !== null && pizzasYearly !== previousDataPizzasYearly) {
                    clearTimeout(timeoutIdPizzasYearly);
                    timeoutIdPizzasYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan4').css('background-color', '');
                    }, 3000);
                }
                previousDataPizzasYearly = pizzasYearly;
            });
            $.get('http://127.0.0.1:5501/api/totalPorkYearly', function (porkYearly) {
                var totalPorkYearly = formatNumberOrd(porkYearly);
                var totalPorkElement = $('.yearlyIncomeSpan5');
                var yearlyTargetPork = 1400;
                totalPorkElement.text(totalPorkYearly + ' / ' + yearlyTargetPork);
                $('.yearlyIncomeSpan5').css('background-color', 'white');
                $('.yearlyIncomeSpan5').css('borderRadius', '8px');
                const checkbox4 = document.querySelector('.custom-checkboxYearly5');

                if (porkYearly >= yearlyTargetPork) {
                    if (checkbox4) {
                        checkbox4.classList.remove('error');
                        checkbox4.classList.add('success');
                        checkbox4.textContent = '✓';
                    }
                } else if (porkYearly < yearlyTargetPork) {
                    if (checkbox4) {
                        checkbox4.classList.remove('success');
                        checkbox4.classList.add('error');
                        checkbox4.textContent = 'X';
                    }
                }
                if (previousDataPorkYearly !== null && porkYearly !== previousDataPorkYearly) {
                    clearTimeout(timeoutIdPorkYearly);
                    timeoutIdPorkYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan5').css('background-color', '');
                    }, 3000);
                }
                previousDataPorkYearly = porkYearly;
            });

            $.get('http://127.0.0.1:5501/api/totalPastaYearly', function (pastaYearly) {
                var totalPastaYearly = formatNumberOrd(pastaYearly);
                var totalPastaElement = $('.yearlyIncomeSpan6');
                var yearlyTargetPasta = 1400;
                totalPastaElement.text(totalPastaYearly + ' / ' + yearlyTargetPasta);
                $('.yearlyIncomeSpan6').css('background-color', 'white');
                $('.yearlyIncomeSpan6').css('borderRadius', '8px');
                const checkbox5 = document.querySelector('.custom-checkboxYearly6');

                if (pastaYearly >= yearlyTargetPasta) {
                    if (checkbox5) {
                        checkbox5.classList.remove('error');
                        checkbox5.classList.add('success');
                        checkbox5.textContent = '✓';
                    }
                } else if (pastaYearly < yearlyTargetPasta) {
                    if (checkbox5) {
                        checkbox5.classList.remove('success');
                        checkbox5.classList.add('error');
                        checkbox5.textContent = 'X';
                    }
                }
                if (previousDataPastaYearly !== null && pastaYearly !== previousDataPastaYearly) {
                    clearTimeout(timeoutIdPastaYearly);
                    timeoutIdPastaYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan6').css('background-color', '');
                    }, 3000);
                }
                previousDataPastaYearly = pastaYearly;
            });


            $.get('http://127.0.0.1:5501/api/totalChickenYearly', function (chickenYearly) {
                var totalChickenYearly = formatNumberOrd(chickenYearly);
                var totalChickenElement = $('.yearlyIncomeSpan7');
                var yearlyTargetChicken = 1400;
                totalChickenElement.text(totalChickenYearly + ' / ' + yearlyTargetChicken);
                $('.yearlyIncomeSpan7').css('background-color', 'white');
                $('.yearlyIncomeSpan7').css('borderRadius', '8px');
                const checkbox6 = document.querySelector('.custom-checkboxYearly7');

                if (chickenYearly >= yearlyTargetChicken) {
                    if (checkbox6) {
                        checkbox6.classList.remove('error');
                        checkbox6.classList.add('success');
                        checkbox6.textContent = '✓';
                    }
                } else if (chickenYearly < yearlyTargetChicken) {
                    if (checkbox6) {
                        checkbox6.classList.remove('success');
                        checkbox6.classList.add('error');
                        checkbox6.textContent = 'X';
                    }
                }
                if (previousDataChickenYearly !== null && chickenYearly !== previousDataChickenYearly) {
                    clearTimeout(timeoutIdChickenYearly);
                    timeoutIdChickenYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan7').css('background-color', '');
                    }, 3000);
                }
                previousDataChickenYearly = chickenYearly;
            });

            $.get('http://127.0.0.1:5501/api/totalFishYearly', function (fishYearly) {
                var totalFishYearly = formatNumberOrd(fishYearly);
                var totalFishElement = $('.yearlyIncomeSpan8');
                var yearlyTargetFish = 1400;
                totalFishElement.text(totalFishYearly + ' / ' + yearlyTargetFish);
                $('.yearlyIncomeSpan8').css('background-color', 'white');
                $('.yearlyIncomeSpan8').css('borderRadius', '8px');
                const checkbox7 = document.querySelector('.custom-checkboxYearly8');

                if (fishYearly >= yearlyTargetFish) {
                    if (checkbox7) {
                        checkbox7.classList.remove('error');
                        checkbox7.classList.add('success');
                        checkbox7.textContent = '✓';
                    }
                } else if (fishYearly < yearlyTargetFish) {
                    if (checkbox7) {
                        checkbox7.classList.remove('success');
                        checkbox7.classList.add('error');
                        checkbox7.textContent = 'X';
                    }
                }
                if (previousDataFishYearly !== null && fishYearly !== previousDataFishYearly) {
                    clearTimeout(timeoutIdFishYearly);
                    timeoutIdFishYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan8').css('background-color', '');
                    }, 3000);
                }
                previousDataFishYearly = fishYearly;
            });

            $.get('http://127.0.0.1:5501/api/totalDrinksYearly', function (drinksYearly) {
                var totalDrinksYearly = formatNumberOrd(drinksYearly);
                var totalDrinksElement = $('.yearlyIncomeSpan9');
                var yearlyTargetDrinks = 9600;
                totalDrinksElement.text(totalDrinksYearly + ' / ' + yearlyTargetDrinks);
                $('.yearlyIncomeSpan9').css('background-color', 'white');
                $('.yearlyIncomeSpan9').css('borderRadius', '8px');
                const checkbox8 = document.querySelector('.custom-checkboxYearly9');

                if (drinksYearly >= yearlyTargetDrinks) {
                    if (checkbox8) {
                        checkbox8.classList.remove('error');
                        checkbox8.classList.add('success');
                        checkbox8.textContent = '✓';
                    }
                } else if (drinksYearly < yearlyTargetDrinks) {
                    if (checkbox8) {
                        checkbox8.classList.remove('success');
                        checkbox8.classList.add('error');
                        checkbox8.textContent = 'X';
                    }
                }
                if (previousDataDrinksYearly !== null && drinksYearly !== previousDataDrinksYearly) {
                    clearTimeout(timeoutIdDrinksYearly);
                    timeoutIdDrinksYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan9').css('background-color', '');
                    }, 3000);
                }
                previousDataDrinksYearly = drinksYearly;
            });

            $.get('http://127.0.0.1:5501/api/totalSauceYearly', function (sauceYearly) {
                var totalSauceYearly = formatNumberOrd(sauceYearly);
                var totalSauceElement = $('.yearlyIncomeSpan10');
                var yearlyTargetSauce = 19000;
                totalSauceElement.text(totalSauceYearly + ' / ' + yearlyTargetSauce);
                $('.yearlyIncomeSpan10').css('background-color', 'white');
                $('.yearlyIncomeSpan10').css('borderRadius', '8px');
                const checkbox9 = document.querySelector('.custom-checkboxYearly10');

                if (sauceYearly >= yearlyTargetSauce) {
                    if (checkbox9) {
                        checkbox9.classList.remove('error');
                        checkbox9.classList.add('success');
                        checkbox9.textContent = '✓';
                    }
                } else if (sauceYearly < yearlyTargetSauce) {
                    if (checkbox9) {
                        checkbox9.classList.remove('success');
                        checkbox9.classList.add('error');
                        checkbox9.textContent = 'X';
                    }
                }
                if (previousDataSauceYearly !== null && sauceYearly !== previousDataSauceYearly) {
                    clearTimeout(timeoutIdSauceYearly);
                    timeoutIdSauceYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan10').css('background-color', '');
                    }, 3000);
                }
                previousDataSauceYearly = sauceYearly;
            });

            $.get('http://127.0.0.1:5501/api/totalHomePizzaYearly', function (homePizzaYearly) {
                var totalHomePizzaYearly = formatNumberOrd(homePizzaYearly);
                var totalHomePizzaElement = $('.yearlyIncomeSpan11');
                var yearlyTargetHomePizza = 1400;
                totalHomePizzaElement.text(totalHomePizzaYearly + ' / ' + yearlyTargetHomePizza);
                $('.yearlyIncomeSpan11').css('background-color', 'white');
                $('.yearlyIncomeSpan11').css('borderRadius', '8px');
                const checkbox10 = document.querySelector('.custom-checkboxYearly11');

                if (homePizzaYearly >= yearlyTargetHomePizza) {
                    if (checkbox10) {
                        checkbox10.classList.remove('error');
                        checkbox10.classList.add('success');
                        checkbox10.textContent = '✓';
                    }
                } else if (homePizzaYearly < yearlyTargetHomePizza) {
                    if (checkbox10) {
                        checkbox10.classList.remove('success');
                        checkbox10.classList.add('error');
                        checkbox10.textContent = 'X';
                    }
                }
                if (previousDataHomePizzaYearly !== null && homePizzaYearly !== previousDataHomePizzaYearly) {
                    clearTimeout(timeoutIdHomePizzaYearly);
                    timeoutIdHomePizzaYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan11').css('background-color', '');
                    }, 3000);
                }
                previousDataHomePizzaYearly = homePizzaYearly;
            });

            $.get('http://127.0.0.1:5501/api/total4StaggioniYearly', function (staggioniYearly) {
                var total4StaggioniYearly = formatNumberOrd(staggioniYearly);
                var total4StaggioniElement = $('.yearlyIncomeSpan12');
                var yearlyTarget4Staggioni = 1400;
                total4StaggioniElement.text(total4StaggioniYearly + ' / ' + yearlyTarget4Staggioni);
                $('.yearlyIncomeSpan12').css('background-color', 'white');
                $('.yearlyIncomeSpan12').css('borderRadius', '8px');
                const checkbox11 = document.querySelector('.custom-checkboxYearly12');

                if (staggioniYearly >= yearlyTarget4Staggioni) {
                    if (checkbox11) {
                        checkbox11.classList.remove('error');
                        checkbox11.classList.add('success');
                        checkbox11.textContent = '✓';
                    }
                } else if (staggioniYearly < yearlyTarget4Staggioni) {
                    if (checkbox11) {
                        checkbox11.classList.remove('success');
                        checkbox11.classList.add('error');
                        checkbox11.textContent = 'X';
                    }
                }
                if (previousData4StaggioniYearly !== null && staggioniYearly !== previousData4StaggioniYearly) {
                    clearTimeout(timeoutId4StaggioniYearly);
                    timeoutId4StaggioniYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan12').css('background-color', '');
                    }, 3000);
                }
                previousData4StaggioniYearly = staggioniYearly;
            });
            $.get('http://127.0.0.1:5501/api/totalDiavolaYearly', function (diavolaYearly) {
                var totalDiavolaYearly = formatNumberOrd(diavolaYearly);
                var totalDiavolaElement = $('.yearlyIncomeSpan13');
                var yearlyTargetDiavola = 1400;
                totalDiavolaElement.text(totalDiavolaYearly + ' / ' + yearlyTargetDiavola);
                $('.yearlyIncomeSpan13').css('background-color', 'white');
                $('.yearlyIncomeSpan13').css('borderRadius', '8px');
                const checkbox12 = document.querySelector('.custom-checkboxYearly13');

                if (diavolaYearly >= yearlyTargetDiavola) {
                    if (checkbox12) {
                        checkbox12.classList.remove('error');
                        checkbox12.classList.add('success');
                        checkbox12.textContent = '✓';
                    }
                } else if (diavolaYearly < yearlyTargetDiavola) {
                    if (checkbox12) {
                        checkbox12.classList.remove('success');
                        checkbox12.classList.add('error');
                        checkbox12.textContent = 'X';
                    }
                }
                if (previousDataDiavolaYearly !== null && diavolaYearly !== previousDataDiavolaYearly) {
                    clearTimeout(timeoutIdDiavolaYearly);
                    timeoutIdDiavolaYearly = setTimeout(function () {
                        $('.yearlyIncomeSpan13').css('background-color', '');
                    }, 3000);
                }
                previousDataDiavolaYearly = diavolaYearly;
            });
        }
        displayTotalYearly();
        setInterval(displayTotalYearly, 1000);
        displayTotalMonthly();
        setInterval(displayTotalMonthly, 1000);
        displayTotalDaily();
        setInterval(displayTotalDaily, 1000);
        displayTotalWeekly();
        setInterval(displayTotalWeekly, 1000);
        displayTotalIncome();
        setInterval(displayTotalIncome, 1000);
    });
});
