$.getScript('./jquery.min.js', function () {
    $(function () {
        var previousMessage = ''; // Initialize the previous message

        function displayMessage(statusDisplay, currentTime, emptyOvens, freeDeliverers, freeDeliverersCheck,
            delivererId, isDelivering, currentPath, userId, nextUserId, deliveryTime, distance,
            halfDistance, halfTime, waitingTooLong, ovenId, productName, orderId, ovenStatus, isDeliveringMap, location, percentage, statusBar) {
            var message = "";
            if (statusDisplay === true) {
                message = `Not new orders. There are ${emptyOvens} empty ovens. The current time is ${currentTime}.`;
            }
            else if (freeDeliverersCheck === true) {
                message = `Not new orders for delivery. There are ${freeDeliverers} free deliverers.`;
            }
            else if (isDelivering === 0) {
                message = `Deliverer ${delivererId} is going for a delivery.`;
            }
            else if (isDelivering === 1) {
                const formattedPath = `[ ${currentPath.join(' -> ')} ]`;
                message = `Deliverer ${delivererId} current path is: ${formattedPath}.`;
            }
            else if (isDelivering === 2) {
                message = `Deliverer ${delivererId} is at half of the distance ${halfDistance} from user ${userId} to user ${nextUserId}, remaining time: ${halfTime} seconds.`;
            }
            else if (isDelivering === 3) {
                message = `Deliverer ${delivererId} has finished the delivery between the user ${userId} and user ${nextUserId} in ${deliveryTime} seconds and distance ${distance}.`;
            }
            else if (isDelivering === 4) {
                message = `Deliverer ${delivererId} has finished the delivery to all customers.`;
            }
            else if (isDelivering === 5) {
                message = `Deliverer ${delivererId} has returned to the restaurant.`;
            }
            else if (waitingTooLong === true) {
                message = `Deliverer ${delivererId} is waiting for an order to be done. The estimated wait time is 10 seconds.`;
            }
            else if (ovenStatus === 'NOT_COOKING') {
                message = `Oven ${ovenId} has finished baking ${productName} from order ${orderId}.`;
            }
            else if (ovenStatus === 'COOKING') {
                message = `Oven ${ovenId} is now baking ${productName} from order ${orderId}.`;
            }
            else if (isDeliveringMap === true && percentage > 0) {
                const desiredSpaces = 10;
                const filledSpaces = desiredSpaces - statusBar.length + 2;
                const filledStatusBar = `[${'#'.repeat(filledSpaces)}${statusBar.slice(1)}`;
                const formattedStatusBar = filledStatusBar.replace(/ /g, '&nbsp;');
                message = `Deliverer ${delivererId}: ${formattedStatusBar} ${percentage}% ${location}.`;
            }

            if (message !== "" && message !== previousMessage) {
                const messageElement = $('<li>' + message + '</li>');
                $('.message-container').append(messageElement);

                var container = $('.message-container');
                container.scrollTop(container[0].scrollHeight);
            }
        }

        function getMessages() {
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
                        displayMessage(messageData.statusDisplay, messageData.currentTime, messageData.emptyOvens, messageData.freeDeliverers, messageData.freeDeliverersCheck,
                            messageData.delivererId, messageData.isDelivering, messageData.currentPath, messageData.userId, messageData.nextUserId, messageData.deliveryTime,
                            messageData.distance, messageData.halfDistance, messageData.halfTime, messageData.waitingTooLong, messageData.ovenId, messageData.productName,
                            messageData.orderId, messageData.ovenStatus, messageData.isDeliveringMap, messageData.location, messageData.percentage, messageData.statusBar);
                    }
                },
                error: function () {
                    console.log('Error retrieving data');
                }
            });
        }

        getMessages();
        setInterval(getMessages, 3000);
    });
});
