document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5501/api/orderStatus_custom')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('orderStatusCustomTable');
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.style.position = 'sticky';
            headerRow.style.top = '0';
            const orderIdHeader = document.createElement('th');
            orderIdHeader.textContent = 'Order ID';
            const fullNameHeader = document.createElement('th');
            fullNameHeader.textContent = 'Full Name';
            const addressHeader = document.createElement('th');
            addressHeader.textContent = 'Address';
            const phoneHeader = document.createElement('th');
            phoneHeader.textContent = 'Phone';
            const emailHeader = document.createElement('th');
            emailHeader.textContent = 'Email';
            const statusHeader = document.createElement('th');
            statusHeader.textContent = 'Status';

            headerRow.appendChild(orderIdHeader);
            headerRow.appendChild(fullNameHeader);
            headerRow.appendChild(addressHeader);
            headerRow.appendChild(phoneHeader);
            headerRow.appendChild(emailHeader);
            headerRow.appendChild(statusHeader);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');

            data.forEach(row => {
                const tr = document.createElement('tr');
                const orderIDCell = document.createElement('td');
                orderIDCell.textContent = row.order_id;
                const fullNameCell = document.createElement('td');
                fullNameCell.textContent = row.full_name;
                const addressCell = document.createElement('td');
                addressCell.textContent = row.address;
                const phoneNumberCell = document.createElement('td');
                phoneNumberCell.textContent = row.phone_number;
                const emailCell = document.createElement('td');
                emailCell.textContent = row.e_mail;
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
                else if (row.item_status === 'QUANTITY_IN_PROGRESS') {
                    statusSpan.style.backgroundColor = '#1ed1b3;';
                }

                statusCell.appendChild(statusSpan);

                tr.appendChild(orderIDCell);
                tr.appendChild(fullNameCell);
                tr.appendChild(addressCell);
                tr.appendChild(phoneNumberCell);
                tr.appendChild(emailCell);
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
        const tableBody = document.querySelector('#orderStatusCustomTable tbody');
        const searchTerm = searchInput.value.toLowerCase();

        Array.from(tableBody.rows).forEach(row => {
            const orderIDCell = row.cells[0].textContent.toLowerCase();
            const fullNameCell = row.cells[1].textContent.toLowerCase();
            const addressCell = row.cells[2].textContent.toLowerCase();
            const phoneNumberCell = row.cells[3].textContent.toLowerCase();
            const emailCell = row.cells[4].textContent.toLowerCase();
            const statusCell = row.cells[5].querySelector('span'); 
            const statusText = statusCell.textContent.toLowerCase();

            const rowMatches =
                orderIDCell.includes(searchTerm) ||
                fullNameCell.includes(searchTerm) ||
                addressCell.includes(searchTerm) ||
                phoneNumberCell.includes(searchTerm) ||
                emailCell.includes(searchTerm) ||
                statusText.includes(searchTerm);

            row.style.display = rowMatches ? '' : 'none';
        });
    }
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
});
