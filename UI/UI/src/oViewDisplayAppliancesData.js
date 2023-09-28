$.getScript('./jquery.min.js', function () {
    $(function () {
        function displayDatabaseDataDeliverers(delivererId, delivererStatus) {
            $.get('http://127.0.0.1:5501/api/deliverers', function (data) {
                var delivererWorkTimes = {};
                var delivererDeliveries = {};

                data.forEach(deliverer => {
                    var deliverer_id = deliverer.deliverer_id;
                    var workTimeKey = 'workTime' + deliverer_id;
                    var deliveriesKey = 'workDeliveries' + deliverer_id;
                    var delivererStatus = deliverer.deliverer_status;
                    delivererWorkTimes[workTimeKey] = {
                        percentage: deliverer.deliverer_percentage,
                        status: delivererStatus
                    };
                    delivererDeliveries[deliveriesKey] = {
                        deliveries: deliverer.deliverer_deliveries,
                        status: delivererStatus
                    };

                });

                for (var deliverer_id = 1; deliverer_id <= 5; deliverer_id++) {
                    if (deliverer_id === delivererId) {
                        var delivererElement = $('#panelDeliverer' + deliverer_id);
                        var percentageDeliveredSpanDeliverers = [
                            delivererElement.find('.workTime1'),
                            delivererElement.find('.workTime2'),
                            delivererElement.find('.workTime3'),
                            delivererElement.find('.workTime4'),
                            delivererElement.find('.workTime5')
                        ];

                        percentageDeliveredSpanDeliverers.forEach((item, index) => {
                            var workTimeKey = 'workTime' + deliverer_id;
                            if (delivererWorkTimes.hasOwnProperty(workTimeKey)) {
                                var workTimeData = delivererWorkTimes[workTimeKey];
                                if (workTimeData.status === 'DELIVERING' || workTimeData.status === 'NOT_DELIVERING' || delivererStatus !== 'DELIVERING' || delivererStatus !== 'NOT_DELIVERING') {
                                    item.text(workTimeData.percentage + "%");
                                } else {
                                    item.text("N/A");
                                }
                            }
                        });
                    }
                }

                for (var deliverer_id = 1; deliverer_id <= 5; deliverer_id++) {
                    if (deliverer_id === delivererId) {
                        var delivererElement = $('#panelDeliverer' + deliverer_id);
                        var itemsDeliveredSpanDeliverers = [
                            delivererElement.find('.workDeliveries1'),
                            delivererElement.find('.workDeliveries2'),
                            delivererElement.find('.workDeliveries3'),
                            delivererElement.find('.workDeliveries4'),
                            delivererElement.find('.workDeliveries5')
                        ];
                        itemsDeliveredSpanDeliverers.forEach((item, index) => {
                            var deliveriesKey = 'workDeliveries' + deliverer_id;
                            if (delivererDeliveries.hasOwnProperty(deliveriesKey)) {
                                var deliveriesData = delivererDeliveries[deliveriesKey];
                                if (deliveriesData.status === 'DELIVERING' || deliveriesData.status === 'NOT_DELIVERING' || delivererStatus !== 'DELIVERING' || delivererStatus !== 'NOT_DELIVERING') {
                                    item.text(deliveriesData.deliveries + " items");
                                } else {
                                    item.text("N/A");
                                }
                            }
                        });
                    }
                }
            });
        }
        function displayDatabaseDataOvens(ovenId, ovenStatus) {
            $.get('http://127.0.0.1:5501/api/ovens', function (data) {
                var ovenCookTime = {};
                var ovenCookedItems = {};

                data.forEach(oven => {
                    var oven_id = oven.oven_id;
                    var cookedTimeKey = 'timeInUse' + oven_id;
                    var cookedItemsKey = 'itemsPrepared' + oven_id;
                    var ovenStatus = oven.oven_status;
                    ovenCookTime[cookedTimeKey] = {
                        percentage: oven.oven_percentage,
                        status: ovenStatus
                    };
                    ovenCookedItems[cookedItemsKey] = {
                        itemCooks: oven.oven_items_cooked,
                        status: ovenStatus
                    };

                });

                for (var oven_id = 1; oven_id <= 5; oven_id++) {
                    if (oven_id === ovenId) {
                        var ovenElement = $('#panelOven' + oven_id);
                        var percentageOvensSpanTimeUsed = [
                            ovenElement.find('.timeInUse1'),
                            ovenElement.find('.timeInUse2'),
                            ovenElement.find('.timeInUse3'),
                            ovenElement.find('.timeInUse4'),
                            ovenElement.find('.timeInUse5')
                        ];

                        percentageOvensSpanTimeUsed.forEach((item, index) => {
                            var cookedTimeKey = 'timeInUse' + oven_id;
                            if (ovenCookTime.hasOwnProperty(cookedTimeKey)) {
                                var cookTimeData = ovenCookTime[cookedTimeKey];
                                if (cookTimeData.status === 'COOKING' || cookTimeData.status === 'NOT_COOKING' || ovenStatus !== 'COOKING' || ovenStatus !== 'NOT_COOKING') {
                                    item.text(cookTimeData.percentage + "%");
                                } else {
                                    item.text("N/A");
                                }
                            }
                        });
                    }
                }
                for (var oven_id = 1; oven_id <= 5; oven_id++) {
                    if (oven_id === ovenId) {
                        var ovenElement = $('#panelOven' + oven_id);
                        var itemsCookedOvensSpan = [
                            ovenElement.find('.itemsPrepared1'),
                            ovenElement.find('.itemsPrepared2'),
                            ovenElement.find('.itemsPrepared3'),
                            ovenElement.find('.itemsPrepared4'),
                            ovenElement.find('.itemsPrepared5')
                        ];

                        itemsCookedOvensSpan.forEach((item, index) => {
                            var cookedItemsKey = 'itemsPrepared' + oven_id;
                            if (ovenCookedItems.hasOwnProperty(cookedItemsKey)) {
                                var cookItemsData = ovenCookedItems[cookedItemsKey];
                                if (cookItemsData.status === 'COOKING' || cookItemsData.status === 'NOT_COOKING' || ovenStatus !== 'COOKING' || ovenStatus !== 'NOT_COOKING') {
                                    item.text(cookItemsData.itemCooks + " items");
                                } else {
                                    item.text("N/A");
                                }
                            }
                        });
                    }
                }

            });

        }

        function displayDataCustom(ovenId, ovenStatus, prepareTime, remainingTime, delivererTimeToArrivalTotal, delivererId, delivererStatus, delivererTimeToArrival, delivererPath, percentageOvens, delivererPercentageComplete) {
            var ovenElement = $('#panelOven' + ovenId);
            var delivererElement = $('#panelDeliverer' + delivererId);

            var statusSpansOvens = [
                ovenElement.find('.statusOven1'),
                ovenElement.find('.statusOven2'),
                ovenElement.find('.statusOven3'),
                ovenElement.find('.statusOven4'),
                ovenElement.find('.statusOven5')
            ];

            statusSpansOvens.forEach(function (statusSpansOvens) {
                statusSpansOvens.text(ovenStatus);
                statusSpansOvens.removeClass('idle-status cooking-status not-cooking-status');
                if (ovenStatus === 'IDLE') {
                    statusSpansOvens.addClass('idle-status');
                } else if (ovenStatus === 'COOKING') {
                    statusSpansOvens.addClass('cooking-status');
                } else if (ovenStatus === 'NOT_COOKING') {
                    statusSpansOvens.addClass('not-cooking-status');
                }
            });

            var prepareTimeSpansOvens = [
                ovenElement.find('.prepareTime1'),
                ovenElement.find('.prepareTime2'),
                ovenElement.find('.prepareTime3'),
                ovenElement.find('.prepareTime4'),
                ovenElement.find('.prepareTime5')
            ];

            prepareTimeSpansOvens.forEach(function (prepareTimeSpansOvens) {
                prepareTimeSpansOvens.text(prepareTime + " sec");
                if (prepareTime === undefined) {
                    prepareTimeSpansOvens.text("N/A");
                }
            });

            var statusSpansDeliverer = [
                delivererElement.find('.statusDeliverer1'),
                delivererElement.find('.statusDeliverer2'),
                delivererElement.find('.statusDeliverer3'),
                delivererElement.find('.statusDeliverer4'),
                delivererElement.find('.statusDeliverer5')
            ];


            statusSpansDeliverer.forEach(function (statusSpansDeliverer) {
                statusSpansDeliverer.text(delivererStatus);
                statusSpansDeliverer.removeClass('idle-status delivering-status not-delivering-status');
                if (delivererStatus === 'IDLE') {
                    statusSpansDeliverer.addClass('idle-status');
                } else if (delivererStatus === 'DELIVERING') {
                    statusSpansDeliverer.addClass('delivering-status');
                } else if (delivererStatus === 'NOT_DELIVERING') {
                    statusSpansDeliverer.addClass('not-delivering-status');
                }
            });

            var arrivalTimeSpansDeliverer = [
                delivererElement.find('.arrivalTimeDeliverer1'),
                delivererElement.find('.arrivalTimeDeliverer2'),
                delivererElement.find('.arrivalTimeDeliverer3'),
                delivererElement.find('.arrivalTimeDeliverer4'),
                delivererElement.find('.arrivalTimeDeliverer5')
            ];



            arrivalTimeSpansDeliverer.forEach(function (arrivalTimeSpansDeliverer) {
                arrivalTimeSpansDeliverer.text(delivererTimeToArrival + " sec");
                if (delivererStatus === 'NOT_DELIVERING' || delivererStatus === 'IDLE' || delivererTimeToArrival <= 0) {
                    arrivalTimeSpansDeliverer.text("N/A");
                    arrivalTimeSpansDeliverer.css('color', 'black')
                }
                if (delivererTimeToArrival > 5 && delivererStatus === 'DELIVERING') {
                    arrivalTimeSpansDeliverer.css('color', 'red')
                }
                else if (delivererTimeToArrival <= 5 && delivererStatus === 'DELIVERING') {
                    arrivalTimeSpansDeliverer.css('color', 'lime')
                }
            });

            var remainingTimeSpansDeliverer = [
                delivererElement.find('.remainingTimeDeliverer1'),
                delivererElement.find('.remainingTimeDeliverer2'),
                delivererElement.find('.remainingTimeDeliverer3'),
                delivererElement.find('.remainingTimeDeliverer4'),
                delivererElement.find('.remainingTimeDeliverer5')
            ];

            remainingTimeSpansDeliverer.forEach(function (remainingTimeSpansDeliverer) {
                remainingTimeSpansDeliverer.text(delivererTimeToArrivalTotal + " sec");
                if (delivererStatus === 'NOT_DELIVERING' || delivererStatus === 'IDLE' || delivererTimeToArrivalTotal <= 0) {
                    remainingTimeSpansDeliverer.text("N/A");
                    remainingTimeSpansDeliverer.css('color', 'black')
                }
                if (delivererTimeToArrivalTotal > 5 && delivererStatus === 'DELIVERING') {
                    remainingTimeSpansDeliverer.css('color', 'red')
                }
                else if (delivererTimeToArrivalTotal <= 5 && delivererStatus === 'DELIVERING') {
                    remainingTimeSpansDeliverer.css('color', 'lime')
                }
            });

            var delivererPathSpansDeliverer = [
                delivererElement.find('.currentEdge1'),
                delivererElement.find('.currentEdge2'),
                delivererElement.find('.currentEdge3'),
                delivererElement.find('.currentEdge4'),
                delivererElement.find('.currentEdge5')
            ];

            delivererPathSpansDeliverer.forEach(function (delivererPathSpansOvens) {
                if (delivererStatus !== 'DELIVERING' || delivererPath === undefined) {
                    delivererPathSpansOvens.text("N/A");
                } else {
                    if (delivererPath && delivererPath.length > 0) {
                        delivererPathSpansOvens.text("[ " + delivererPath.join(' -> ') + " ]");
                    } else {
                        delivererPathSpansOvens.text("No path available");
                    }
                }
            });

            var delivererElementDefault = $('.default-panelDeliverer');
            var currentEdgeSpansDefault = [];
            for (var i = 1; i <= 5; i++) {
                currentEdgeSpansDefault[i - 1] = delivererElementDefault.find('.currentEdge' + i);

                if (i === delivererId) {
                    if (delivererStatus === 'NOT_DELIVERING' || delivererStatus === 'IDLE' || delivererStatus === undefined) {
                        currentEdgeSpansDefault[i - 1].text("No path available");
                    } else {
                        currentEdgeSpansDefault[i - 1].text("[ " + delivererPath.join(' -> ') + " ]");
                    }
                }
            }
            
            var remainingTimeSpansOvens = [
                ovenElement.find('.remainingTime1'),
                ovenElement.find('.remainingTime2'),
                ovenElement.find('.remainingTime3'),
                ovenElement.find('.remainingTime4'),
                ovenElement.find('.remainingTime5')
            ];

            remainingTimeSpansOvens.forEach(function (remainingTimeSpansOvens) {
                remainingTimeSpansOvens.text(remainingTime + " sec");
                if (ovenStatus === 'NOT_COOKING' || ovenStatus === 'IDLE' || ovenStatus <= 0) {
                    remainingTimeSpansOvens.text("N/A");
                    remainingTimeSpansOvens.css('color', 'black')
                }
                if (remainingTime > 5 && ovenStatus === 'COOKING') {
                    remainingTimeSpansOvens.css('color', 'red')
                }
                else if (remainingTime <= 5 && ovenStatus === 'COOKING') {
                    remainingTimeSpansOvens.css('color', 'lime')
                }
            });

            var percentageSpansOvens = [
                ovenElement.find('.percentageOvens1'),
                ovenElement.find('.percentageOvens2'),
                ovenElement.find('.percentageOvens3'),
                ovenElement.find('.percentageOvens4'),
                ovenElement.find('.percentageOvens5')
            ];

            percentageSpansOvens.forEach(function (percentageSpansOvens) {
                percentageSpansOvens.text(percentageOvens + "%")
                if (ovenStatus === 'NOT_COOKING' || ovenStatus === 'IDLE') {
                    percentageSpansOvens.text("N/A");
                    percentageSpansOvens.css('color', 'black')
                }
                if (percentageOvens >= 80 && ovenStatus === 'COOKING') {
                    percentageSpansOvens.css('color', 'lime')
                }
                else if (percentageOvens < 80 && ovenStatus === 'COOKING') {
                    percentageSpansOvens.css('color', 'red')
                }
            });

            var progressBarOvens = [
                ovenElement.find('#oven1ProgressBar'),
                ovenElement.find('#oven2ProgressBar'),
                ovenElement.find('#oven3ProgressBar'),
                ovenElement.find('#oven4ProgressBar'),
                ovenElement.find('#oven5ProgressBar')
            ];

            progressBarOvens.forEach(function (progressBarOven, index) {
                if (ovenStatus === 'COOKING') {
                    var widthPercentage = Math.min(percentageOvens, 100);
                    progressBarOven.css('width', widthPercentage + '%');
                } else if (ovenStatus === 'NOT_COOKING' || ovenStatus === 'IDLE') {
                    progressBarOven.css('width', '0%'); 
                }
            });

            var ovenElementDefault = $('.default-panelOven');
            var progressBarOvensDefault = [];

            for (var i = 1; i <= 5; i++) {
                progressBarOvensDefault[i - 1] = ovenElementDefault.find('.progressOvens' + i);

                if (i === ovenId) {
                    if (ovenStatus === 'COOKING') {
                        var widthPercentageDefault = Math.min(percentageOvens, 100);
                        progressBarOvensDefault[i - 1].css('width', widthPercentageDefault + '%');
                    } else if (ovenStatus === 'NOT_COOKING' || ovenStatus === 'IDLE' || ovenStatus === undefined) {
                        progressBarOvensDefault[i - 1].css('width', '0%');
                    }
                }
            }


            var progressBarDeliverer = [
                delivererElement.find('#deliverer1ProgressBar'),
                delivererElement.find('#deliverer2ProgressBar'),
                delivererElement.find('#deliverer3ProgressBar'),
                delivererElement.find('#deliverer4ProgressBar'),
                delivererElement.find('#deliverer5ProgressBar')
            ];

            progressBarDeliverer.forEach(function (progressBarDeliverer, index) {
                if (delivererStatus === 'DELIVERING') {
                    var widthPercentage = Math.min(delivererPercentageComplete, 100);
                    progressBarDeliverer.css('width', widthPercentage + '%');
                } else if (delivererStatus === 'NOT_DELIVERING' || delivererStatus === 'IDLE') {
                    progressBarDeliverer.css('width', '0%');
                }
            });

            var delivererPercentageSpansDeliverer = [
                delivererElement.find('.percentage1'),
                delivererElement.find('.percentage2'),
                delivererElement.find('.percentage3'),
                delivererElement.find('.percentage4'),
                delivererElement.find('.percentage5')
            ];


            var delivererElementDefault = $('.default-panelDeliverer');
            var progressBarDeliverersDefault = [];
            for (var i = 1; i <= 5; i++) {
                progressBarDeliverersDefault[i - 1] = delivererElementDefault.find('.progressDeliverer' + i);

                if (i === delivererId) {
                    if (delivererStatus === 'DELIVERING') {
                        var widthPercentageDefault = Math.min(delivererPercentageComplete, 100);
                        progressBarDeliverersDefault[i - 1].css('width', widthPercentageDefault + '%');
                    } else if (delivererStatus === 'NOT_DELIVERING' || delivererStatus === 'IDLE' || delivererStatus === undefined) {
                        progressBarDeliverersDefault[i - 1].css('width', '0%');
                    }
                }
            }

            delivererPercentageSpansDeliverer.forEach(function (delivererPercentageSpansDeliverer) {
                delivererPercentageSpansDeliverer.text(delivererPercentageComplete + "%")
                if (delivererStatus === 'NOT_DELIVERING' || delivererStatus === 'IDLE') {
                    delivererPercentageSpansDeliverer.text("N/A");
                    delivererPercentageSpansDeliverer.css('color', 'black')
                }
                if (delivererPercentageComplete >= 80 && delivererStatus === 'DELIVERING') {
                    delivererPercentageSpansDeliverer.css('color', 'lime')
                }
                else if (delivererPercentageComplete < 80 && delivererStatus === 'DELIVERING') {
                    delivererPercentageSpansDeliverer.css('color', 'red')
                }
            });

        }

        function displayData(ovenId, ovenStatus, delivererId, delivererStatus, percentage, productName) {
            var delivererElement = $('#panelDeliverer' + delivererId);
            var ovenElement = $('#panelOven' + ovenId);

            var productNameSpansOvens = [
                ovenElement.find('.prepareItem1'),
                ovenElement.find('.prepareItem2'),
                ovenElement.find('.prepareItem3'),
                ovenElement.find('.prepareItem4'),
                ovenElement.find('.prepareItem5')
            ];

            productNameSpansOvens.forEach(function (productNameSpansOvens) {
                productNameSpansOvens.text(productName);
                if (ovenStatus === 'NOT_COOKING' || ovenStatus === 'IDLE' || ovenStatus === undefined) {
                    productNameSpansOvens.text("N/A");
                }
            });
            var ovenElementDefault = $('.default-panelOven');
            var productNameSpansDefault = [];

            for (var i = 1; i <= 5; i++) {
                productNameSpansDefault[i - 1] = ovenElementDefault.find('.prepareItem' + i);

                if (i === ovenId) {
                    if (productNameSpansDefault[i - 1].length > 0) {
                        if (ovenStatus === 'NOT_COOKING' || ovenStatus === 'IDLE' || ovenStatus === undefined) {
                            productNameSpansDefault[i - 1].text("N/A");
                        } else {
                            productNameSpansDefault[i - 1].text(productName);
                        }
                    }
                }
            }

        }


        function getMessages() {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:5502/messagesCustom',
                dataType: 'json',
                success: function (response) {
                    var nonEmptyMessages = response.filter(function (messageData) {
                        return true;
                    });

                    for (var i = 0; i < nonEmptyMessages.length; i++) {
                        var messageData = nonEmptyMessages[i];
                        displayDataCustom(messageData.ovenId, messageData.ovenStatus, messageData.prepareTime, messageData.remainingTime, messageData.delivererTimeToArrivalTotal, messageData.delivererId, messageData.delivererStatus, messageData.delivererTimeToArrival, messageData.delivererPath, messageData.percentageOvens, messageData.delivererPercentage, messageData.delivererPercentageComplete);
                        displayDatabaseDataDeliverers(messageData.delivererId, messageData.delivererStatus);
                        displayDatabaseDataOvens(messageData.ovenId, messageData.ovenStatus);
                    }
                },
                error: function () {
                }
            });
            $.ajax({
                type: 'GET',
                url: 'http://localhost:5502/messages',
                dataType: 'json',
                success: function (response) {
                    var nonEmptyMessages = response.filter(function (messageData) {
                        return true;
                    });

                    for (var i = 0; i < nonEmptyMessages.length; i++) {
                        var messageData = nonEmptyMessages[i];
                        displayData(messageData.ovenId, messageData.ovenStatus, messageData.delivererId, messageData.delivererStatus, messageData.percentage, messageData.productName);
                    }
                },
                error: function () {
                }
            });
        }
        getMessages();
        setInterval(getMessages, 250);
    });
});
