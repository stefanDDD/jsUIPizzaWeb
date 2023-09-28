document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5501/api/orderItems_custom')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('orderItemsCustomTable');

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.style.position = 'sticky';
            headerRow.style.top = '0';
            const orderIdHeader = document.createElement('th');
            orderIdHeader.textContent = 'Order ID';
            const productNameHeader = document.createElement('th');
            productNameHeader.textContent = 'Product Name';
            const prepareTimeHeader = document.createElement('th');
            prepareTimeHeader.textContent = 'Prepare Time';
            const costHeader = document.createElement('th');
            costHeader.textContent = 'Cost';
            const quantityHeader = document.createElement('th');
            quantityHeader.textContent = 'Quantity';
            const statusHeader = document.createElement('th');
            statusHeader.textContent = 'Status';

            headerRow.appendChild(orderIdHeader);
            headerRow.appendChild(productNameHeader);
            headerRow.appendChild(prepareTimeHeader);
            headerRow.appendChild(costHeader);
            headerRow.appendChild(quantityHeader);
            headerRow.appendChild(statusHeader);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            orderIdHeader.style.width = '10%'; 
            productNameHeader.style.width = '20%';
            prepareTimeHeader.style.width = '15%';
            costHeader.style.width = '10%';
            quantityHeader.style.width = '10%';
            statusHeader.style.width = '15%';

            const tbody = document.createElement('tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');
                const orderIDCell = document.createElement('td');
                orderIDCell.textContent = row.order_id;
                const productNameCell = document.createElement('td');
                productNameCell.textContent = row.product_name;
                const prepareTimeCell = document.createElement('td');
                prepareTimeCell.textContent = row.prepare_time + " mins";
                const costCell = document.createElement('td');
                costCell.textContent = row.cost;
                const quantityCell = document.createElement('td');
                const formattedCost = parseFloat(row.cost).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'RON',
                    minimumFractionDigits: 2,
                });
                const formattedCostCell = document.createElement('td');
                formattedCostCell.textContent = formattedCost;

                quantityCell.textContent = row.quantity;
                const statusCell = document.createElement('td');

                const statusSpan = document.createElement('span');
                statusSpan.textContent = row.item_status;
                statusSpan.style.color = "white";
                statusSpan.style.borderRadius = "8px";
                statusSpan.style.padding = '4px';
                if (row.item_status === 'PENDING') {
                    statusSpan.style.backgroundColor = '#067eff';
                }
                else if (row.item_status === 'PROCESSING') {
                    statusSpan.style.backgroundColor = '#015bbb';
                }
                else if (row.item_status === 'IN_PREPARATION') {
                    statusSpan.style.backgroundColor = '#054181';
                }
                else if (row.item_status === 'IN_DELIVERY') {
                    statusSpan.style.backgroundColor = '#094704';
                }
                else if (row.item_status === 'READY_FOR_DELIVERY') {
                    statusSpan.style.backgroundColor = '#0f8105';
                }
                else if (row.item_status === 'CANCELED') {
                    statusSpan.style.backgroundColor = '#640b0b';
                }
                else if (row.item_status === 'DONE') {
                    statusSpan.style.backgroundColor = '#1ad309';
                }
                else if (row.item_status === 'QUANTITY_IN_PROGRESS') {
                    statusSpan.style.backgroundColor = '#1ed1b3;';
                }


                statusCell.appendChild(statusSpan);

                tr.appendChild(orderIDCell);
                tr.appendChild(productNameCell);
                tr.appendChild(prepareTimeCell);
                tr.appendChild(formattedCostCell);
                tr.appendChild(quantityCell);
                tr.appendChild(statusCell);
                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
        })
        .catch(error => {
            console.error('Eroare la obținerea datelor:', error);
        });

    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    function performSearch() {
        const tableBody = document.querySelector('#orderItemsCustomTable tbody');
        const searchTerm = searchInput.value.toLowerCase();

        Array.from(tableBody.rows).forEach(row => {
            const orderIDCell = row.cells[0].textContent.toLowerCase();
            const productNameCell = row.cells[1].textContent.toLowerCase();
            const prepareTimeCell = row.cells[2].textContent.toLowerCase();
            const costCell = row.cells[3].textContent.toLowerCase();
            const quantityCell = row.cells[4].textContent.toLowerCase();
            const statusCell = row.cells[5].querySelector('span');
            const statusText = statusCell.textContent.toLowerCase();

            const rowMatches =
                orderIDCell.includes(searchTerm) ||
                productNameCell.includes(searchTerm) ||
                prepareTimeCell.includes(searchTerm) ||
                costCell.includes(searchTerm) ||
                quantityCell.includes(searchTerm) ||
                statusText.includes(searchTerm);

            row.style.display = rowMatches ? '' : 'none';
        });
    }
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
});
