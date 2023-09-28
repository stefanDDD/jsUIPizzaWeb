$.getScript('./jquery.min.js', function () {
    $(function () {
        function displayEachPizza() {
            $.get('http://127.0.0.1:5501/api/ordersPizzas', function (data) {
                $('#pizza-list').empty();

                if (data && data.length > 0) {
                    var maxQuantity = data[0].total_quantity;

                    data.sort(function (a, b) {
                        return b.quantity - a.quantity;
                    });
                    var itemNumber = 1;

                    data.forEach(function (pizza) {
                        var pizzaDiv = $('<div>');
                        pizzaDiv.addClass('pizza-item');
                        pizzaDiv.text(itemNumber + ". " + pizza.product_name);
                        itemNumber++;

                        var progressBar = $('<div>');
                        progressBar.addClass('progress-barPizza');
                        progressBar.css('overflow', 'hidden');
                        var progress = $('<div>');
                        progress.addClass('progressPizza');
                        var percentage = (pizza.quantity / maxQuantity) * 100;
                        progress.css('width', percentage + '%');

                        if (percentage === 10) {
                            progress.css('background-color', 'transparent');
                        }
                        else if (percentage <= 10) {
                            progress.css('background-color', '#122aaf');
                        } else if (percentage <= 20) {
                            progress.css('background-color', '#125baf');
                        } else if (percentage <= 30) {
                            progress.css('background-color', '#12a4af');
                        }
                        else if (percentage <= 40) {
                            progress.css('background-color', '#12af66');
                        } else if (percentage <= 50) {
                            progress.css('background-color', '#12af1f');
                        } else if (percentage <= 60) {
                            progress.css('background-color', '#73af12');
                        }
                        else if (percentage <= 70) {
                            progress.css('background-color', '#a4af12');
                        } else if (percentage <= 80) {
                            progress.css('background-color', '#af7d12');
                        }
                        else if (percentage <= 90) {
                            progress.css('background-color', '#af4c12');
                        } else if (percentage <= 100) {
                            progress.css('background-color', '#af1212');
                        }

                        progressBar.append(progress);
                        pizzaDiv.append(progressBar);

                        $('#pizza-list').append(pizzaDiv);
                    });
                } else {
                    $('#pizza-list').text('Nicio date disponibile.');
                }
            });
        }
        function displayEachPork() {
            $.get('http://127.0.0.1:5501/api/ordersPork', function (data) {
                $('#pork-list').empty();

                if (data && data.length > 0) {
                    var maxQuantity = data[0].total_quantity;

                    data.sort(function (a, b) {
                        return b.quantity - a.quantity;
                    });
                    var itemNumber = 1;

                    data.forEach(function (pork) {
                        var porkDiv = $('<div>');
                        porkDiv.addClass('pork-item');
                        porkDiv.text(itemNumber + ". " + pork.product_name);
                        itemNumber++;

                        var progressBar = $('<div>');
                        progressBar.addClass('progress-barPork');
                        progressBar.css('overflow', 'hidden');
                        var progress = $('<div>');
                        progress.addClass('progressPork');
                        var percentage = (pork.quantity / maxQuantity) * 100;
                        progress.css('width', percentage + '%');

                        if (percentage === 10) {
                            progress.css('background-color', 'transparent');
                        }
                        else if (percentage <= 10) {
                            progress.css('background-color', '#122aaf');
                        } else if (percentage <= 20) {
                            progress.css('background-color', '#125baf');
                        } else if (percentage <= 30) {
                            progress.css('background-color', '#12a4af');
                        }
                        else if (percentage <= 40) {
                            progress.css('background-color', '#12af66');
                        } else if (percentage <= 50) {
                            progress.css('background-color', '#12af1f');
                        } else if (percentage <= 60) {
                            progress.css('background-color', '#73af12');
                        }
                        else if (percentage <= 70) {
                            progress.css('background-color', '#a4af12');
                        } else if (percentage <= 80) {
                            progress.css('background-color', '#af7d12');
                        }
                        else if (percentage <= 90) {
                            progress.css('background-color', '#af4c12');
                        } else if (percentage <= 100) {
                            progress.css('background-color', '#af1212');
                        }

                        progressBar.append(progress);
                        porkDiv.append(progressBar);

                        $('#pork-list').append(porkDiv);
                    });
                } else {
                    $('#pork-list').text('Nicio date disponibile.');
                }
            });
        }
        function displayEachPasta() {
            $.get('http://127.0.0.1:5501/api/ordersPasta', function (data) {
                $('#pasta-list').empty();

                if (data && data.length > 0) {
                    var maxQuantity = data[0].total_quantity;

                    data.sort(function (a, b) {
                        return b.quantity - a.quantity;
                    });
                    var itemNumber = 1;

                    data.forEach(function (pasta) {
                        var pastaDiv = $('<div>');
                        pastaDiv.addClass('pasta-item');
                        pastaDiv.text(itemNumber + ". " + pasta.product_name);
                        itemNumber++;

                        var progressBar = $('<div>');
                        progressBar.addClass('progress-barPasta');
                        progressBar.css('overflow', 'hidden');
                        var progress = $('<div>');
                        progress.addClass('progressPasta');
                        var percentage = (pasta.quantity / maxQuantity) * 100;
                        progress.css('width', percentage + '%');

                        if (percentage === 10) {
                            progress.css('background-color', 'transparent');
                        }
                        else if (percentage <= 10) {
                            progress.css('background-color', '#122aaf');
                        } else if (percentage <= 20) {
                            progress.css('background-color', '#125baf');
                        } else if (percentage <= 30) {
                            progress.css('background-color', '#12a4af');
                        }
                        else if (percentage <= 40) {
                            progress.css('background-color', '#12af66');
                        } else if (percentage <= 50) {
                            progress.css('background-color', '#12af1f');
                        } else if (percentage <= 60) {
                            progress.css('background-color', '#73af12');
                        }
                        else if (percentage <= 70) {
                            progress.css('background-color', '#a4af12');
                        } else if (percentage <= 80) {
                            progress.css('background-color', '#af7d12');
                        }
                        else if (percentage <= 90) {
                            progress.css('background-color', '#af4c12');
                        } else if (percentage <= 100) {
                            progress.css('background-color', '#af1212');
                        }

                        progressBar.append(progress);
                        pastaDiv.append(progressBar);

                        $('#pasta-list').append(pastaDiv);
                    });
                } else {
                    $('#pasta-list').text('Nicio date disponibile.');
                }
            });
        }

        function displayEachChicken() {
            $.get('http://127.0.0.1:5501/api/ordersChicken', function (data) {
                $('#chicken-list').empty();

                if (data && data.length > 0) {
                    var maxQuantity = data[0].total_quantity;

                    data.sort(function (a, b) {
                        return b.quantity - a.quantity;
                    });
                    var itemNumber = 1;

                    data.forEach(function (chicken) {
                        var chickenDiv = $('<div>');
                        chickenDiv.addClass('chicken-item');
                        chickenDiv.text(itemNumber + ". " + chicken.product_name);
                        itemNumber++;

                        var progressBar = $('<div>');
                        progressBar.addClass('progress-barChicken');
                        progressBar.css('overflow', 'hidden');
                        var progress = $('<div>');
                        progress.addClass('progressChicken');
                        var percentage = (chicken.quantity / maxQuantity) * 100;
                        progress.css('width', percentage + '%');

                        if (percentage === 10) {
                            progress.css('background-color', 'transparent');
                        }
                        else if (percentage <= 10) {
                            progress.css('background-color', '#122aaf');
                        } else if (percentage <= 20) {
                            progress.css('background-color', '#125baf');
                        } else if (percentage <= 30) {
                            progress.css('background-color', '#12a4af');
                        }
                        else if (percentage <= 40) {
                            progress.css('background-color', '#12af66');
                        } else if (percentage <= 50) {
                            progress.css('background-color', '#12af1f');
                        } else if (percentage <= 60) {
                            progress.css('background-color', '#73af12');
                        }
                        else if (percentage <= 70) {
                            progress.css('background-color', '#a4af12');
                        } else if (percentage <= 80) {
                            progress.css('background-color', '#af7d12');
                        }
                        else if (percentage <= 90) {
                            progress.css('background-color', '#af4c12');
                        } else if (percentage <= 100) {
                            progress.css('background-color', '#af1212');
                        }

                        progressBar.append(progress);
                        chickenDiv.append(progressBar);

                        $('#chicken-list').append(chickenDiv);
                    });
                } else {
                    $('#chicken-list').text('Nicio date disponibile.');
                }
            });
        }

        function displayEachFish() {
            $.get('http://127.0.0.1:5501/api/ordersFish', function (data) {
                $('#fish-list').empty();

                if (data && data.length > 0) {
                    var maxQuantity = data[0].total_quantity;

                    data.sort(function (a, b) {
                        return b.quantity - a.quantity;
                    });
                    var itemNumber = 1;

                    data.forEach(function (fish) {
                        var fishDiv = $('<div>');
                        fishDiv.addClass('fish-item');
                        fishDiv.text(itemNumber + ". " + fish.product_name);
                        itemNumber++;

                        var progressBar = $('<div>');
                        progressBar.addClass('progress-barFish');
                        progressBar.css('overflow', 'hidden');
                        var progress = $('<div>');
                        progress.addClass('progressFish');
                        var percentage = (fish.quantity / maxQuantity) * 100;
                        progress.css('width', percentage + '%');

                        if (percentage === 10) {
                            progress.css('background-color', 'transparent');
                        }
                        else if (percentage <= 10) {
                            progress.css('background-color', '#122aaf');
                        } else if (percentage <= 20) {
                            progress.css('background-color', '#125baf');
                        } else if (percentage <= 30) {
                            progress.css('background-color', '#12a4af');
                        }
                        else if (percentage <= 40) {
                            progress.css('background-color', '#12af66');
                        } else if (percentage <= 50) {
                            progress.css('background-color', '#12af1f');
                        } else if (percentage <= 60) {
                            progress.css('background-color', '#73af12');
                        }
                        else if (percentage <= 70) {
                            progress.css('background-color', '#a4af12');
                        } else if (percentage <= 80) {
                            progress.css('background-color', '#af7d12');
                        }
                        else if (percentage <= 90) {
                            progress.css('background-color', '#af4c12');
                        } else if (percentage <= 100) {
                            progress.css('background-color', '#af1212');
                        }

                        progressBar.append(progress);
                        fishDiv.append(progressBar);

                        $('#fish-list').append(fishDiv);
                    });
                } else {
                    $('#fish-list').text('Nicio date disponibile.');
                }
            });
        }

        function displayEachDrink() {
            $.get('http://127.0.0.1:5501/api/ordersDrink', function (data) {
                $('#drink-list').empty();

                if (data && data.length > 0) {
                    var maxQuantity = data[0].total_quantity;

                    data.sort(function (a, b) {
                        return b.quantity - a.quantity;
                    });
                    var itemNumber = 1;

                    data.forEach(function (drink) {
                        var drinkDiv = $('<div>');
                        drinkDiv.addClass('drink-item');
                        drinkDiv.text(itemNumber + ". " + drink.product_name);
                        itemNumber++;

                        var progressBar = $('<div>');
                        progressBar.addClass('progress-barDrink');
                        progressBar.css('overflow', 'hidden');
                        var progress = $('<div>');
                        progress.addClass('progressDrink');
                        var percentage = (drink.quantity / maxQuantity) * 100;
                        progress.css('width', percentage + '%');

                        if (percentage === 10) {
                            progress.css('background-color', 'transparent');
                        }
                        else if (percentage <= 10) {
                            progress.css('background-color', '#122aaf');
                        } else if (percentage <= 20) {
                            progress.css('background-color', '#125baf');
                        } else if (percentage <= 30) {
                            progress.css('background-color', '#12a4af');
                        }
                        else if (percentage <= 40) {
                            progress.css('background-color', '#12af66');
                        } else if (percentage <= 50) {
                            progress.css('background-color', '#12af1f');
                        } else if (percentage <= 60) {
                            progress.css('background-color', '#73af12');
                        }
                        else if (percentage <= 70) {
                            progress.css('background-color', '#a4af12');
                        } else if (percentage <= 80) {
                            progress.css('background-color', '#af7d12');
                        }
                        else if (percentage <= 90) {
                            progress.css('background-color', '#af4c12');
                        } else if (percentage <= 100) {
                            progress.css('background-color', '#af1212');
                        }

                        progressBar.append(progress);
                        drinkDiv.append(progressBar);

                        $('#drink-list').append(drinkDiv);
                    });
                } else {
                    $('#drink-list').text('Nicio date disponibile.');
                }
            });
        }

        function displayEachSauce() {
            $.get('http://127.0.0.1:5501/api/ordersSauce', function (data) {
                $('#sauce-list').empty();

                if (data && data.length > 0) {
                    var maxQuantity = data[0].total_quantity;

                    data.sort(function (a, b) {
                        return b.quantity - a.quantity;
                    });
                    var itemNumber = 1;

                    data.forEach(function (sauce) {
                        var sauceDiv = $('<div>');
                        sauceDiv.addClass('sauce-item');
                        sauceDiv.text(itemNumber + ". " + sauce.product_name);
                        itemNumber++;

                        var progressBar = $('<div>');
                        progressBar.addClass('progress-barSauce');
                        progressBar.css('overflow', 'hidden');
                        var progress = $('<div>');
                        progress.addClass('progressSauce');
                        var percentage = (sauce.quantity / maxQuantity) * 100;
                        progress.css('width', percentage + '%');

                        if (percentage === 10) {
                            progress.css('background-color', 'transparent');
                        }
                        else if (percentage <= 10) {
                            progress.css('background-color', '#122aaf');
                        } else if (percentage <= 20) {
                            progress.css('background-color', '#125baf');
                        } else if (percentage <= 30) {
                            progress.css('background-color', '#12a4af');
                        }
                        else if (percentage <= 40) {
                            progress.css('background-color', '#12af66');
                        } else if (percentage <= 50) {
                            progress.css('background-color', '#12af1f');
                        } else if (percentage <= 60) {
                            progress.css('background-color', '#73af12');
                        }
                        else if (percentage <= 70) {
                            progress.css('background-color', '#a4af12');
                        } else if (percentage <= 80) {
                            progress.css('background-color', '#af7d12');
                        }
                        else if (percentage <= 90) {
                            progress.css('background-color', '#af4c12');
                        } else if (percentage <= 100) {
                            progress.css('background-color', '#af1212');
                        }

                        progressBar.append(progress);
                        sauceDiv.append(progressBar);

                        $('#sauce-list').append(sauceDiv);
                    });
                } else {
                    $('#sauce-list').text('Nicio date disponibile.');
                }
            });
        }

        function displayEachAll() {
            $.get('http://127.0.0.1:5501/api/ordersAll', function (data) {
                $('#all-list').empty();

                if (data && data.length > 0) {
                    var maxQuantity = data[0].total_quantity;

                    data.sort(function (a, b) {
                        return b.quantity - a.quantity;
                    });
                    var itemNumber = 1;

                    data.forEach(function (all) {
                        var allDiv = $('<div>');
                        allDiv.addClass('all-item');
                        allDiv.text(itemNumber + ". " + all.product_name);
                        itemNumber++;

                        var progressBar = $('<div>');
                        progressBar.addClass('progress-barAll');
                        progressBar.css('overflow', 'hidden');
                        var progress = $('<div>');
                        progress.addClass('progressAll');
                        var percentage = (all.quantity / maxQuantity) * 100;
                        progress.css('width', percentage + '%');

                        if (percentage === 10) {
                            progress.css('background-color', 'transparent');
                        }
                        else if (percentage <= 10) {
                            progress.css('background-color', '#122aaf');
                        } else if (percentage <= 20) {
                            progress.css('background-color', '#125baf');
                        } else if (percentage <= 30) {
                            progress.css('background-color', '#12a4af');
                        }
                        else if (percentage <= 40) {
                            progress.css('background-color', '#12af66');
                        } else if (percentage <= 50) {
                            progress.css('background-color', '#12af1f');
                        } else if (percentage <= 60) {
                            progress.css('background-color', '#73af12');
                        }
                        else if (percentage <= 70) {
                            progress.css('background-color', '#a4af12');
                        } else if (percentage <= 80) {
                            progress.css('background-color', '#af7d12');
                        }
                        else if (percentage <= 90) {
                            progress.css('background-color', '#af4c12');
                        } else if (percentage <= 100) {
                            progress.css('background-color', '#af1212');
                        }

                        progressBar.append(progress);
                        allDiv.append(progressBar);

                        $('#all-list').append(allDiv);
                    });
                } else {
                    $('#all-list').text('Nicio date disponibile.');
                }
            });
        }
        displayEachPizza();
        setInterval(displayEachPizza, 1000);
        displayEachPork();
        setInterval(displayEachPork, 1000);
        displayEachPasta();
        setInterval(displayEachPasta, 1000);
        displayEachChicken();
        setInterval(displayEachChicken, 1000);
        displayEachFish();
        setInterval(displayEachFish, 1000);
        displayEachDrink();
        setInterval(displayEachDrink, 1000);
        displayEachSauce();
        setInterval(displayEachSauce, 1000);
        displayEachAll();
        setInterval(displayEachAll, 1000);

    });
});
