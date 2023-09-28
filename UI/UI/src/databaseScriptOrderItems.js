document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5501/api/orderItems')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('orderItemsTable');

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.style.position = 'sticky';
            headerRow.style.top = '0';
            const orderIdHeader = document.createElement('th');
            orderIdHeader.textContent = 'Order ID';
            const itemIdHeader = document.createElement('th');
            itemIdHeader.textContent = 'Item ID';
            const quantityHeader = document.createElement('th');
            quantityHeader.textContent = 'Quantity';
            const itemStatusHeader = document.createElement('th');
            itemStatusHeader.textContent = 'Item Status';

            headerRow.appendChild(orderIdHeader);
            headerRow.appendChild(itemIdHeader);
            headerRow.appendChild(quantityHeader);
            headerRow.appendChild(itemStatusHeader);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            orderIdHeader.style.width = '25%';
            itemIdHeader.style.width = '25%';
            quantityHeader.style.width = '25%';
            itemStatusHeader.style.width = '25%';

            const tbody = document.createElement('tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');
                const orderIDCell = document.createElement('td');
                orderIDCell.textContent = row.order_id;
                const itemIDCell = document.createElement('td');
                itemIDCell.textContent = row.item_id;
                const quantityCell = document.createElement('td');
                quantityCell.textContent = row.quantity;
                const itemStatusCell = document.createElement('td');


                const itemStatusSpan = document.createElement('span');
                itemStatusSpan.textContent = row.item_status;
                itemStatusSpan.style.color = "white";
                itemStatusSpan.style.borderRadius = "8px";
                itemStatusSpan.style.padding = '4px';
                if (row.item_status === 'PENDING') {
                    itemStatusSpan.style.backgroundColor = '#067eff';
                }
                else if (row.item_status === 'PROCESSING') {
                    itemStatusSpan.style.backgroundColor = '#015bbb';
                }
                else if (row.item_status === 'IN_PREPARATION') {
                    itemStatusSpan.style.backgroundColor = '#054181';
                }
                else if (row.item_status === 'IN_DELIVERY') {
                    itemStatusSpan.style.backgroundColor = '#094704';
                }
                else if (row.item_status === 'READY_FOR_DELIVERY') {
                    itemStatusSpan.style.backgroundColor = '#0f8105';
                }
                else if (row.item_status === 'CANCELED') {
                    itemStatusSpan.style.backgroundColor = '#640b0b';
                }
                else if (row.item_status === 'DONE') {
                    itemStatusSpan.style.backgroundColor = '#1ad309';
                }
                else if (row.item_status === 'DELIVERED') {
                    itemStatusSpan.style.backgroundColor = '#0b0ead';
                }
                else if (row.item_status === 'QUANTITY_IN_PROGRESS') {
                    statusSpan.style.backgroundColor = '#1ed1b3;';
                }
                itemStatusCell.appendChild(itemStatusSpan);
                tr.appendChild(orderIDCell);
                tr.appendChild(itemIDCell);
                tr.appendChild(quantityCell);
                tr.appendChild(itemStatusCell);
                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
        })
        .catch(error => {
            console.error('Eroare la obținerea datelor:', error);
        });
    
    const searchButton = document.getElementById('search-button-dbPage');
    const searchInput = document.getElementById('search-input-dbPage');

    function performSearch() {
        const tableBody = document.querySelector('#orderItemsTable tbody');
        const searchTerm = searchInput.value.toLowerCase();

        Array.from(tableBody.rows).forEach(row => {
            const orderIDCell = row.cells[0].textContent.toLowerCase();
            const itemIDCell = row.cells[1].textContent.toLowerCase();
            const quantityCell = row.cells[2].textContent.toLowerCase();
            const itemStatusCell = row.cells[3].querySelector('span');
            const itemStatusText = itemStatusCell.textContent.toLowerCase();

            const rowMatches =
                orderIDCell.includes(searchTerm) ||
                itemIDCell.includes(searchTerm) ||
                quantityCell.includes(searchTerm) ||
                itemStatusText.includes(searchTerm);

            row.style.display = rowMatches ? '' : 'none';
        });
    }
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
});
