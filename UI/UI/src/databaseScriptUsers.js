document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5501/api/users')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('usersTable');

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.style.position = 'sticky';
            headerRow.style.top = '0';
            const userIdHeader = document.createElement('th');
            userIdHeader.textContent = 'User ID';
            const fullNameHeader = document.createElement('th');
            fullNameHeader.textContent = 'Full Name';
            const phoneHeader = document.createElement('th');
            phoneHeader.textContent = 'Phone Number';
            const addressHeader = document.createElement('th');
            addressHeader.textContent = 'Address';

            headerRow.appendChild(userIdHeader);
            headerRow.appendChild(fullNameHeader);
            headerRow.appendChild(phoneHeader);
            headerRow.appendChild(addressHeader);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            userIdHeader.style.width = '10%';
            fullNameHeader.style.width = '30%';
            phoneHeader.style.width = '30%';
            addressHeader.style.width = '30%';
            
            const tbody = document.createElement('tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');
                const userIdCell = document.createElement('td');
                userIdCell.textContent = row.user_id;
                const fullNameCell = document.createElement('td');
                fullNameCell.textContent = row.full_name;
                const phoneCell = document.createElement('td');
                phoneCell.textContent = row.phone_number;
                const addressCell = document.createElement('td');
                addressCell.textContent = row.address;
                tr.appendChild(userIdCell);
                tr.appendChild(fullNameCell);
                tr.appendChild(phoneCell);
                tr.appendChild(addressCell);
                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
            const tableWrapper = document.querySelector('.usersContainer');
            tableWrapper.appendChild(table);
        })
        .catch(error => {
            console.error('Eroare la obținerea datelor:', error);
        });

    const searchButton = document.getElementById('search-button-dbPage');
    const searchInput = document.getElementById('search-input-dbPage');

    function performSearch() {
        const tableBody = document.querySelector('#usersTable tbody');
        const searchTerm = searchInput.value.toLowerCase();

        Array.from(tableBody.rows).forEach(row => {
            const userIDCell = row.cells[0].textContent.toLowerCase();
            const fullNameCell = row.cells[1].textContent.toLowerCase();
            const phoneCell = row.cells[2].textContent.toLowerCase();
            const addressCell = row.cells[3].textContent.toLowerCase();

            const rowMatches =
                userIDCell.includes(searchTerm) ||
                fullNameCell.includes(searchTerm) ||
                phoneCell.includes(searchTerm) ||
                addressCell.includes(searchTerm);

            row.style.display = rowMatches ? '' : 'none';
        });
    }
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
});


