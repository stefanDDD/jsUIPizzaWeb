document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5501/api/menuItems')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('menuItemsTable');

            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.style.position = 'sticky';
            headerRow.style.top = '0';
            const itemIdHeader = document.createElement('th');
            itemIdHeader.textContent = 'Item ID';
            const productNameHeader = document.createElement('th');
            productNameHeader.textContent = 'Product Name';
            const prepareTimeHeader = document.createElement('th');
            prepareTimeHeader.textContent = 'Prepare Time';
            const costHeader = document.createElement('th');
            costHeader.textContent = 'Cost';

            headerRow.appendChild(itemIdHeader);
            headerRow.appendChild(productNameHeader);
            headerRow.appendChild(prepareTimeHeader);
            headerRow.appendChild(costHeader);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            itemIdHeader.style.width = '20%';
            productNameHeader.style.width = '30%';
            prepareTimeHeader.style.width = '30%';
            costHeader.style.width = '20%';

            const tbody = document.createElement('tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');
                const itemIdCell = document.createElement('td');
                itemIdCell.textContent = row.item_id;
                const productNameCell = document.createElement('td');
                productNameCell.textContent = row.product_name;
                const prepareTimeCell = document.createElement('td');
                prepareTimeCell.textContent = row.prepare_time + " sec";
                const costCell = document.createElement('td');
                costCell.textContent = row.cost;
                
                const formattedCost = parseFloat(row.cost).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'RON',
                    minimumFractionDigits: 2,
                });
                const formattedCostCell = document.createElement('td');
                formattedCostCell.textContent = formattedCost;

                tr.appendChild(itemIdCell);
                tr.appendChild(productNameCell);
                tr.appendChild(prepareTimeCell);
                tr.appendChild(formattedCostCell);
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
        const tableBody = document.querySelector('#menuItemsTable tbody');
        const searchTerm = searchInput.value.toLowerCase();

        Array.from(tableBody.rows).forEach(row => {
            const itemIdCell = row.cells[0].textContent.toLowerCase();
            const productNameCell = row.cells[1].textContent.toLowerCase();
            const prepareTimeCell = row.cells[2].textContent.toLowerCase();
            const costCell = row.cells[3].textContent.toLowerCase();

            const rowMatches =
                itemIdCell.includes(searchTerm) ||
                productNameCell.includes(searchTerm) ||
                prepareTimeCell.includes(searchTerm) ||
                costCell.includes(searchTerm);

            row.style.display = rowMatches ? '' : 'none';
        });
    }
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
});
