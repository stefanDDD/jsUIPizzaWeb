$.getScript('./jquery.min.js', function () {
    $(function () {
        function displayMessageAppliances(delivererId, delivererStatus, ovenId, ovenStatus) {
            var messageOven = "";
            var messageDeliverer = "";
            var imgSrcOven = "";
            var imgSrcDeliverer = "";
            if (ovenStatus === 'COOKING') {
                messageOven = `Oven is cooking.`;
                imgSrcOven = "./jpg/oven.gif";
            }
            else if (ovenStatus === 'NOT_COOKING') {
                messageOven = `Oven is not cooking.`;
                imgSrcOven = "./jpg/ovenFree.png";
            }
            else if (ovenStatus === 'IDLE') {
                messageOven = `Oven is idle.`
                imgSrcOven = "./jpg/ovenFree.png";
            }
            var selectorOven = '.oven-info[data-oven="' + ovenId + '"]';
            $(selectorOven).text(messageOven);
            $('#oven-img-status-' + ovenId).attr('src', imgSrcOven);

            if (delivererStatus === 'DELIVERING') {
                messageDeliverer = `Deliverer is in delivery.`;
                imgSrcDeliverer = "./jpg/deliverer.gif";
            }
            else if (delivererStatus === 'NOT_DELIVERING') {
                messageDeliverer = `Deliverer is not in delivery.`;
                imgSrcDeliverer = "./jpg/delivererFree.png";
            }
            else if (delivererStatus === 'IDLE') {
                messageDeliverer = `Deliverer is idle.`;
                imgSrcDeliverer = "./jpg/delivererFree.png";
            }
            var selectorDeliverer = '.deliverer-info[data-deliverer="' + delivererId + '"]';
            $(selectorDeliverer).text(messageDeliverer);
            $('#deliverer-img-status-' + delivererId).attr('src', imgSrcDeliverer);

        }
        function displayDefaultMessage() {
            var defaultMessage = "Failed to retrieve data from the server.";
            var defaultImageSrcDeliverer = "./jpg/delivererFree.png";
            var defaultImageSrcOven = "./jpg/ovenFree.png";

            $('.oven-info').text(defaultMessage);
            $('.deliverer-info').text(defaultMessage);
            $('[id^="oven-img-status-"]').attr('src', defaultImageSrcOven);
            $('[id^="deliverer-img-status-"]').attr('src', defaultImageSrcDeliverer);
        }

        function displayNoDataMessage() {
            var noDataMessage = "No data available from the server.";
            var defaultImageSrcDeliverer = "./jpg/delivererFree.png";
            var defaultImageSrcOven = "./jpg/ovenFree.png";

            $('.oven-info').text(noDataMessage);
            $('.deliverer-info').text(noDataMessage);
            $('[id^="oven-img-status-"]').attr('src', defaultImageSrcOven);
            $('[id^="deliverer-img-status-"]').attr('src', defaultImageSrcDeliverer);
        }
        function getMessages() {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:5502/messagesCustom',
                dataType: 'json',
                success: function (response) {
                    if (response.length === 0) {
                        displayNoDataMessage();
                    } else {
                        var nonEmptyMessages = response.filter(function (messageData) {
                            return true;
                        });

                        for (var i = 0; i < nonEmptyMessages.length; i++) {
                            var messageData = nonEmptyMessages[i];
                            displayMessageAppliances(messageData.delivererId, messageData.delivererStatus, messageData.ovenId, messageData.ovenStatus);
                        }
                    }
                },
                error: function () {
                    displayDefaultMessage();
                }
            });
        }

        getMessages();
        setInterval(getMessages, 1000);
    });
});
