document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5501/api/orderStatus')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('orderStatusTable');

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.style.position = 'sticky';
            headerRow.style.top = '0';
            const orderIdHeader = document.createElement('th');
            orderIdHeader.textContent = 'Order ID';
            const userIdHeader = document.createElement('th');
            userIdHeader.textContent = 'User ID';
            const timestampHeader = document.createElement('th');
            timestampHeader.textContent = 'Timestamp';
            const statusHeader = document.createElement('th');
            statusHeader.textContent = 'Status';

            headerRow.appendChild(orderIdHeader);
            headerRow.appendChild(userIdHeader);
            headerRow.appendChild(timestampHeader);
            headerRow.appendChild(statusHeader);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            orderIdHeader.style.width = '20%';
            userIdHeader.style.width = '20%';
            timestampHeader.style.width = '35%';
            statusHeader.style.width = '25%';

            const tbody = document.createElement('tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');
                const orderIDCell = document.createElement('td');
                orderIDCell.textContent = row.order_id;
                const userIDCell = document.createElement('td');
                userIDCell.textContent = row.user_id;
                const timestampCell = document.createElement('td');
                timestampCell.textContent = row.timestamp;
                const statusCell = document.createElement('td');

                const statusSpan = document.createElement('span');
                statusSpan.textContent = row.status;
                statusSpan.style.color = "white";
                statusSpan.style.borderRadius = "8px";
                statusSpan.style.padding = '4px';
                if (row.status === 'PENDING') {
                    statusSpan.style.backgroundColor = '#067eff';
                }
                else if (row.status === 'PROCESSING') {
                    statusSpan.style.backgroundColor = '#015bbb';
                }
                else if (row.status === 'IN_PREPARATION') {
                    statusSpan.style.backgroundColor = '#054181';
                }
                else if (row.status === 'IN_DELIVERY') {
                    statusSpan.style.backgroundColor = '#094704';
                }
                else if (row.status === 'READY_FOR_DELIVERY') {
                    statusSpan.style.backgroundColor = '#0f8105';
                }
                else if (row.status === 'CANCELED' || row.status === 'CANCELED_OK') {
                    statusSpan.style.backgroundColor = '#640b0b';
                }
                else if (row.status === 'DONE') {
                    statusSpan.style.backgroundColor = '#1ad309';
                }
                else if (row.status === 'DELIVERED') {
                    statusSpan.style.backgroundColor = '#0b0ead';
                }
                else if (row.item_status === 'QUANTITY_IN_PROGRESS') {
                    statusSpan.style.backgroundColor = '#1ed1b3;';
                }
                statusCell.appendChild(statusSpan);

                tr.appendChild(orderIDCell);
                tr.appendChild(userIDCell);
                tr.appendChild(timestampCell);
                tr.appendChild(statusCell);
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
        const tableBody = document.querySelector('#orderStatusTable tbody');
        const searchTerm = searchInput.value.toLowerCase();

        Array.from(tableBody.rows).forEach(row => {
            const orderIDCell = row.cells[0].textContent.toLowerCase();
            const itemIDCell = row.cells[1].textContent.toLowerCase();
            const timestampCell = row.cells[2].textContent.toLowerCase();
            const statusCell = row.cells[3].querySelector('span');
            const statusText = statusCell.textContent.toLowerCase();

            const rowMatches =
                orderIDCell.includes(searchTerm) ||
                itemIDCell.includes(searchTerm) ||
                timestampCell.includes(searchTerm) ||
                statusText.includes(searchTerm);

            row.style.display = rowMatches ? '' : 'none';
        });
    }
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
});
