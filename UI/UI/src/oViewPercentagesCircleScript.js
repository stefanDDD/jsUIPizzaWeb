$.getScript('./jquery.min.js', function () {
    $(function () {
        const statusColors = {
            'PENDING': '#b17d4d',
            'PROCESSING': '#0401bb',
            'IN_PREPARATION': '#0190bb',
            'QUANTITY_IN_PROGRESS': '#01bb2f',
            'DONE': '#9fbb01',
            'READY_FOR_DELIVERY': '#bb5b01',
            'IN_DELIVERY': '#000000',
            'DELIVERED': '#9806b6',
            'CANCELED': '#ff0606'
        };

        function updateProgressCircles() {
            $.get('http://127.0.0.1:5501/api/statusPercentage', function (data) {
                const progressBar = document.getElementById('progressBarOverall');
                progressBar.innerHTML = '';
                let totalPercentage = 0;
                let leftPercentage = 0;

                for (const statusData of data) {
                    const status = statusData.status;
                    const percentage = parseFloat(statusData.percentage);
                    const color = statusColors[status];

                    const progressSegment = document.createElement('div');
                    progressSegment.className = 'progress-segmentOverall';
                    progressSegment.style.width = percentage + '%';
                    progressSegment.style.backgroundColor = color;
                    progressSegment.style.left = leftPercentage + '%';

                    progressBar.appendChild(progressSegment);

                    totalPercentage += percentage;
                    leftPercentage = totalPercentage;
                }
            });
        }

        updateProgressCircles();
        setInterval(updateProgressCircles, 1000);
    });
});
