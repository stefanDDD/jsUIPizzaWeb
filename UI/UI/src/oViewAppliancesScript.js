$.getScript('./jquery.min.js', function () {
    $(function () {
        function displayMessageAppliances(delivererId, delivererStatus, ovenId, ovenStatus) {
            var imgSrcOven = "";
            var imgSrcDeliverer = "";
            if (ovenStatus === 'COOKING') {
                imgSrcOven = "./jpg/oven.gif";
            } else if (ovenStatus === 'NOT_COOKING' || ovenStatus === 'IDLE') {
                imgSrcOven = "./jpg/ovenFree.png";
            }

            $('#ovenImageSts' + ovenId).attr('src', imgSrcOven);

            if (delivererStatus === 'DELIVERING') {
                imgSrcDeliverer = "./jpg/deliverer.gif";
            } else if (delivererStatus === 'NOT_DELIVERING' || delivererStatus === 'IDLE') {
                imgSrcDeliverer = "./jpg/delivererFree.png";
            }

            $('#delivererImageSts' + delivererId).attr('src', imgSrcDeliverer);

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
                        displayMessageAppliances(messageData.delivererId, messageData.delivererStatus, messageData.ovenId, messageData.ovenStatus);
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