$.getScript('./jquery.min.js', function () {
    $(function () {
        function displayMessageConsoleOvens(statusDisplay, emptyOvens) {
            var oldOvenStatus = $('.ovenStatusSpan').text();

            if (statusDisplay === true) {
                $('.ovenStatusSpan').text(`${emptyOvens} / 5`);
            } else {
                $('.ovenStatusSpan').text(oldOvenStatus);
            }
        }

        function displayMessageConsoleDeliverers(freeDeliverersCheck, freeDeliverers) {
            var oldDelivererStatus = $('.delivererStatusSpan').text();

            if (freeDeliverersCheck === true) {
                $('.delivererStatusSpan').text(`${freeDeliverers} / 5`);
            } else {
                $('.delivererStatusSpan').text(oldDelivererStatus);
            }
        }

        function displayMessageConsoleRawMaterials(rawMaterialStatus, rawMaterialMessage) {
            var oldRawMaterialMessage = $('.rawMaterialStatusSpan').text();

            if (rawMaterialStatus === true) {
                $('.rawMaterialStatusSpan').text(`${rawMaterialMessage}`);
            } else {
                $('.rawMaterialStatusSpan').text(oldRawMaterialMessage);
            }
        }

        function getMessagesConsoleOvens() {
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
                        displayMessageConsoleOvens(messageData.statusDisplay, messageData.emptyOvens);
                    }
                },
                error: function () {
                    displayMessageConsoleOvens(false, 'N/A');
                }
            });
        }
        function getMessagesConsoleDeliverers() {
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
                        displayMessageConsoleDeliverers(messageData.freeDeliverersCheck, messageData.freeDeliverers);
                    }
                },
                error: function () {
                    displayMessageConsoleDeliverers(false, 'N/A');

                }
            });
        }
        function getMessagesConsoleRawmaterial() {
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
                        displayMessageConsoleRawMaterials(messageData.rawMaterialStatus, messageData.rawMaterialMessage);
                    }
                },
                error: function () {
                    displayMessageConsoleRawMaterials(false, 'N/A');
                }
            });
        }

        getMessagesConsoleOvens();
        setInterval(getMessagesConsoleOvens, 250);
        getMessagesConsoleDeliverers();
        setInterval(getMessagesConsoleDeliverers, 250);
        getMessagesConsoleRawmaterial();
        setInterval(getMessagesConsoleRawmaterial, 250);
    });
});
