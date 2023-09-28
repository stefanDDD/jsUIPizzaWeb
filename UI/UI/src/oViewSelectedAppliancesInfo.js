function showPanelDeliverer(delivererNumber) {
    var selectedPanel = document.querySelector('#panelDeliverer' + delivererNumber);

    if (selectedPanel.style.visibility === 'visible') {
        selectedPanel.style.visibility = 'hidden';
    } else {
        var panels = document.querySelectorAll('.informationsDeliverers');
        panels.forEach(panel => {
            panel.style.visibility = 'hidden';
        });
        selectedPanel.style.visibility = 'visible';
    }
}

function showPanelOven(ovenNumber) {
    var selectedPanel = document.querySelector('#panelOven' + ovenNumber);

    if (selectedPanel.style.visibility === 'visible') {
        selectedPanel.style.visibility = 'hidden';
    } else {
        var panels = document.querySelectorAll('.informationsOvens');
        panels.forEach(panel => {
            panel.style.visibility = 'hidden';
        });
        selectedPanel.style.visibility = 'visible';
    }
}
