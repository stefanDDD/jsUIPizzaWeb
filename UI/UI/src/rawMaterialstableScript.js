document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5501/api/rawMaterials')
        .then(response => response.json())
        .then(data => {

            const table = document.getElementById('rawMaterialsTable');
            const imageRawMaterialHeader = document.createElement('th');
            imageRawMaterialHeader.textContent = '';
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.style.position = 'sticky';
            headerRow.style.top = '0';
            const rawMaterialNameHeader = document.createElement('th');
            rawMaterialNameHeader.textContent = 'Name';
            const rawMaterialCostHeader = document.createElement('th');
            rawMaterialCostHeader.textContent = 'Current Cost';
            const rawMaterialQuantityHeader = document.createElement('th');
            rawMaterialQuantityHeader.textContent = 'Current Quantity';
            const incrementButtonHeader = document.createElement('th');
            incrementButtonHeader.textContent = 'Purchase';
            const errorConstHeader = document.createElement('th');
            errorConstHeader.textContent = '';

            headerRow.appendChild(imageRawMaterialHeader);
            headerRow.appendChild(rawMaterialNameHeader);
            headerRow.appendChild(rawMaterialCostHeader);
            headerRow.appendChild(rawMaterialQuantityHeader);
            headerRow.appendChild(incrementButtonHeader);
            headerRow.appendChild(errorConstHeader);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            rawMaterialNameHeader.style.width = '25%';
            rawMaterialCostHeader.style.width = '25%';
            rawMaterialQuantityHeader.style.width = '25%';
            errorConstHeader.style.width = '10%';

            const idToImageMap = {
                1: './jpg/Flour.png',
                2: './jpg/Yeast.png',
                3: './jpg/BottledWater.png',
                4: './jpg/Sugar.png',
                5: './jpg/OliveOil.png',
                6: './jpg/Salt.png',
                7: './jpg/Packaging.png',
                8: './jpg/TomatoSauce.png',
                9: './jpg/garlic.png',
                10: './jpg/tomatoes.png',
                11: './jpg/mozzarella.png',
                12: './jpg/gorgonzola.png',
                13: './jpg/parmesan.png',
                14: './jpg/ricotta.png',
                15: './jpg/oregano.png',
                16: './jpg/mushrooms.png',
                17: './jpg/chickenBreast.png',
                18: './jpg/salami.png',
                19: './jpg/bacon.png',
                20: './jpg/sausages.png',
                21: './jpg/ham.png',
                22: './jpg/onion.png',
                23: './jpg/pepper.png',
                24: './jpg/corn.png',
                25: './jpg/ketchup.png',
                26: './jpg/chesse.png',
                27: './jpg/pineapple.png',
                28: './jpg/paprika.png',
                29: './jpg/olive.png',
                30: './jpg/milk.png',
                31: './jpg/pastrami.png',
                32: './jpg/basil.png',
                33: './jpg/prosciutto.png',
                34: './jpg/cheddar.png',
                35: './jpg/egg.png',
                36: './jpg/thyme.png',
                37: './jpg/groundBeef.png',
                38: './jpg/rucola.png',
                39: './jpg/caraway.png',
                40: './jpg/tuna.png',
                41: './jpg/pepperFlakes.png',
                42: './jpg/chorizo.png',
                43: './jpg/hotPaprika.png',
                44: './jpg/mustard.png',
                45: './jpg/broccolli.png',
                46: './jpg/napkins.png',
                47: './jpg/fille.png',
                48: './jpg/semolina.png',
                49: './jpg/pepperoni.png',
                50: './jpg/porkChop.png',
                51: './jpg/chickenSoup.png',
                52: './jpg/largeContainer.png',
                53: './jpg/sourCream.png',
                54: './jpg/porkLoin.png',
                55: './jpg/frenchFries.png',
                56: './jpg/breadRoll.png',
                57: './jpg/pickleSalad.png',
                58: './jpg/coleslaw.png',
                59: './jpg/plasticCutlery.png',
                60: './jpg/porkNeck.png',
                61: './jpg/carrot.png',
                62: './jpg/bayLeaves.png',
                63: './jpg/cinnamon.png',
                64: './jpg/whiteWine.png',
                65: './jpg/rosemary.png',
                66: './jpg/sweetBoya.png',
                67: './jpg/allSpice.png',
                68: './jpg/coriander.png',
                69: './jpg/marjoram.png',
                70: './jpg/mayonnaise.png',
                71: './jpg/honey.png',
                72: './jpg/breadCrumbs.png',
                73: './jpg/starch.png',
                74: './jpg/pancetta.png',
                75: './jpg/celery.png',
                76: './jpg/mincedPork.png',
                77: './jpg/broth.png',
                78: './jpg/tagliatelle.png',
                79: './jpg/penne.png',
                80: './jpg/spaghetti.png',
                81: './jpg/guanciale.png',
                82: './jpg/pecorinoRomano.png',
                83: './jpg/butter.png',
                84: './jpg/perejil.png',
                85: './jpg/smallContainer.png',
                86: './jpg/sweetSauce.png',
                87: './jpg/hotSauce.png',
                88: './jpg/garlicSauce.png',
                89: './jpg/greekSauce.png',
                90: './jpg/lemonJuice.png',
                91: './jpg/chickenThighs.png',
                92: './jpg/zucchini.png',
                93: './jpg/eggplant.png',
                94: './jpg/skewersChopsticks.png',
                95: './jpg/mediumContainer.png',
                96: './jpg/chickenLegs.png',
                97: './jpg/bream.png',
                98: './jpg/lemon.png',
                99: './jpg/cucumber.png',
                100: './jpg/yogurt.png',
                101: './jpg/dill.png',
                102: './jpg/trout.png',
                103: './jpg/salmonFillet.png',
                104: './jpg/carp.png',
                105: './jpg/coke.png',
                106: './jpg/fanta.png',
                107: './jpg/sprite.png',
                108: './jpg/pepsi.png'
            };
            const tbody = document.createElement('tbody');
            const totalFinalPrices = {};

            data.forEach(row => {
                const rawMaterialId = row.id_raw_material;
                const tr = document.createElement('tr');
                const imageRawMaterialCell = document.createElement('td');

                if (row.id_raw_material in idToImageMap) {
                    const imageSrc = idToImageMap[row.id_raw_material];
                    const imageElementID = document.createElement('img');

                    imageElementID.src = imageSrc;
                    imageElementID.width = 45;
                    imageElementID.height = 40;
                    imageElementID.style.backgroundColor = 'transparent';
                    imageElementID.setAttribute('draggable', 'false');

                    imageElementID.onerror = () => {
                        console.error('Error loading image:', imageSrc);
                    };

                    imageRawMaterialCell.appendChild(imageElementID);
                }
                const rawMaterialNameCell = document.createElement('td');
                rawMaterialNameCell.textContent = row.name_raw_material;
                const rawMaterialCostCell = document.createElement('td');
                const formattedCost = parseFloat(row.cost_raw_material_per_piece).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'RON',
                    minimumFractionDigits: 2,
                });
                rawMaterialCostCell.textContent = formattedCost;

                const rawMaterialQuantityCell = document.createElement('td');
                rawMaterialQuantityCell.textContent = row.quantity_raw_material + " pieces";

                const incrementButtonCell = document.createElement('td');
                const buttonWrapper = document.createElement('div');
                buttonWrapper.classList.add('button-wrapper');

                const decrementButton = document.createElement('button');
                decrementButton.textContent = '-';
                decrementButton.addEventListener('click', () => {
                    updateButtonValue(-1, rawMaterialId);
                });

                const incrementButton = document.createElement('button');
                incrementButton.textContent = '+';
                incrementButton.addEventListener('click', () => {
                    updateButtonValue(1, rawMaterialId);
                });

                const buttonValueSpan = document.createElement('span');
                buttonValueSpan.textContent = '0';

                let buttonValue = 0;
                const rowsToUpdate = [];

                const updateButtonValue = (change, rawMaterialId) => {
                    if (change === -1 && buttonValue === 0) {
                        return;
                    }
                    if (change === 1 && buttonValue === 10000) {
                        return;
                    }
                    if (buttonValue >= 50 && buttonValue < 100) {
                        if (change === -1 && buttonValue === 50) {
                            buttonValue -= 1;
                        } else {
                            buttonValue += change * 5;
                        }
                    }
                    else if (buttonValue >= 100 && buttonValue < 200) {
                        if (change === -1 && buttonValue === 100) {
                            buttonValue -= 5;
                        } else {
                            buttonValue += change * 10;
                        }
                    }
                    else if (buttonValue >= 200 && buttonValue < 500) {
                        if (change === -1 && buttonValue === 200) {
                            buttonValue -= 10;
                        } else {
                            buttonValue += change * 50;
                        }
                    }
                    else if (buttonValue >= 500 && buttonValue < 1000) {
                        if (change === -1 && buttonValue === 500) {
                            buttonValue -= 50;
                        } else {
                            buttonValue += change * 100;
                        }
                    }
                    else if (buttonValue >= 1000 && buttonValue <= 10000) {
                        if (change === -1 && buttonValue === 1000) {
                            buttonValue -= 100;
                        } else {
                            buttonValue += change * 1000;
                        }
                    }
                    else {
                        buttonValue += change;
                    }
                    if (buttonValue < 0) {
                        buttonValue = 0;
                    }

                    const costPerPiece = parseFloat(row.cost_raw_material_per_piece);
                    const quantityChange = buttonValue * costPerPiece;
                    if (totalFinalPrices[rawMaterialId] === undefined) {
                        totalFinalPrices[rawMaterialId] = quantityChange;
                    } else {
                        totalFinalPrices[rawMaterialId] = quantityChange;
                    }

                    let totalPrice = 0;
                    for (const id in totalFinalPrices) {
                        totalPrice += totalFinalPrices[id];
                    }
                    if (totalPrice < 0) {
                        totalPrice = 0;
                    }
                    let formattedValue;
                    if (buttonValue >= 10000) {
                        formattedValue = (buttonValue / 1000).toFixed(0) + 'k';
                    }
                    else if (buttonValue >= 1000) {
                        formattedValue = (buttonValue / 1000).toFixed(0) + 'k';
                    }
                    else {
                        formattedValue = buttonValue.toString();
                    }
                    if (buttonValue !== 0) {
                        rowsToUpdate.push(rawMaterialId);
                    }

                    buttonValueSpan.textContent = formattedValue;
                    transactionPriceInput.value = 'RON ' + totalPrice.toFixed(2);
                    transactionPriceInput.style.userSelect = 'none';
                    setTimeout(() => {
                        buttonWrapper.classList.remove('clicked');
                    }, 200);
                };

                const confirmTransactionButton = document.querySelector('.confirm-transaction-RawMaterials');

                confirmTransactionButton.addEventListener('click', async () => {
                    try {
                        const uniqueUpdates = {};

                        rowsToUpdate.forEach((rawMaterialId) => {
                            if (!uniqueUpdates[rawMaterialId]) {
                                uniqueUpdates[rawMaterialId] = {
                                    rawMaterialId: rawMaterialId,
                                    quantityChange: buttonValue
                                };
                            }
                        });

                        const updatePromises = Object.values(uniqueUpdates);

                        console.log(updatePromises);

                        const response = await fetch('http://localhost:5501/api/rawMaterials_batch_update', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatePromises),
                        });

                        const data = await response.json();
                    } catch (error) {
                        console.error('Error updating quantity:', error);
                    }
                });
                confirmTransactionButton.addEventListener('click', function () {
                    buttonValue = 0;
                    formattedValue = 0;
                    buttonValueSpan.textContent = '0';
                    transactionPriceInput.value = 'RON ' + defaultTransactionPrice.toFixed(2);
                });
                const incrementButtonWrapper = document.createElement('div');
                incrementButtonWrapper.classList.add('button-wrapper');
                incrementButtonWrapper.appendChild(decrementButton);
                incrementButtonWrapper.appendChild(buttonValueSpan);
                incrementButtonWrapper.appendChild(incrementButton);
                incrementButtonCell.appendChild(incrementButtonWrapper);

                const errorCell = document.createElement('td');
                const imageElement = document.createElement('img');

                if (row.status_raw_material === 'LOW_QUANTITY') {
                    tr.classList.add('low-quantity-row');
                    imageElement.src = './jpg/warning.png';
                    imageElement.width = 25;
                    imageElement.height = 25;
                    imageElement.style.display = 'block';
                    imageElement.style.margin = '0 auto';
                    imageElement.setAttribute('draggable', 'false');

                } else if (row.status_raw_material === 'OUT_OF_QUANTITY') {
                    tr.classList.add('no-quantity-row');
                    imageElement.src = './jpg/error.png';
                    imageElement.width = 25;
                    imageElement.height = 25;
                    imageElement.style.display = 'block';
                    imageElement.style.margin = '0 auto';
                    imageElement.setAttribute('draggable', 'false');

                }
                errorCell.appendChild(imageElement);

                tr.appendChild(imageRawMaterialCell);
                tr.appendChild(rawMaterialNameCell);
                tr.appendChild(rawMaterialCostCell);
                tr.appendChild(rawMaterialQuantityCell);
                tr.appendChild(incrementButtonCell);
                tr.appendChild(errorCell);
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
        })
        .catch(error => {
            console.error('Eroare la obținerea datelor:', error);
        });

    const searchButton = document.getElementById('search-button-RawMaterials');
    const searchInput = document.getElementById('search-input-RawMaterials');

    function performSearch() {
        const tableBody = document.querySelector('#rawMaterialsTable tbody');
        const searchTerm = searchInput.value.toLowerCase();

        Array.from(tableBody.rows).forEach(row => {
            const rawMaterialNameCell = row.cells[1].textContent.toLowerCase();
            const rawNaterialCostCell = row.cells[2].textContent.toLowerCase();
            const rawMaterialQuantityCell = row.cells[3].textContent.toLowerCase();

            const rowMatches =
                rawMaterialNameCell.includes(searchTerm) ||
                rawNaterialCostCell.includes(searchTerm) ||
                rawMaterialQuantityCell.includes(searchTerm)

            row.style.display = rowMatches ? '' : 'none';
        });
    }
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);

    const transactionPriceInput = document.getElementById('transactionPricePay');
    const defaultTransactionPrice = 0.00;
    transactionPriceInput.value = 'RON ' + defaultTransactionPrice.toFixed(2);

})
