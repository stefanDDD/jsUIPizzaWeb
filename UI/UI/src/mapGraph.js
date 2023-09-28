fetch('mapGraph.json')
    .then(response => response.json())
    .then(graphData => {
        const nodes = graphData.nodes.slice(0, 23);
        const edges = graphData.edges.slice(0, 56);

        nodes[0].x = 600;
        nodes[0].y = 450;

        nodes[1].x = 760;
        nodes[1].y = 200;

        nodes[2].x = 320;
        nodes[2].y = 190;

        nodes[3].x = 280;
        nodes[3].y = 500;

        nodes[4].x = 400;
        nodes[4].y = 800;

        nodes[5].x = 830;
        nodes[5].y = 700;

        nodes[6].x = 150;
        nodes[6].y = 800;

        nodes[7].x = 600;
        nodes[7].y = 870;

        nodes[8].x = 150;
        nodes[8].y = 400;

        nodes[9].x = 1100;
        nodes[9].y = 500;

        nodes[10].x = 1100;
        nodes[10].y = 800;

        nodes[11].x = 100;
        nodes[11].y = 100;

        nodes[12].x = 1100;
        nodes[12].y = 100;

        nodes[13].x = 500;
        nodes[13].y = 300;

        nodes[14].x = 610;
        nodes[14].y = 600;

        nodes[15].x = 600;
        nodes[15].y = 800;

        nodes[16].x = 350;
        nodes[16].y = 650;

        nodes[17].x = 800;
        nodes[17].y = 550;

        nodes[18].x = 800;
        nodes[18].y = 300;

        nodes[19].x = 200;
        nodes[19].y = 200;

        nodes[20].x = 500;
        nodes[20].y = 140;

        nodes[21].x = 700;
        nodes[21].y = 140;

        nodes[22].x = 900;
        nodes[22].y = 200;

        const svgContainer = d3.select('#graph')
            .style('position', 'absolute')
            .style('left', '50%')
            .style('top', '50%')
            .style('transform', 'translate(-50%, -50%)')
            .style('width', '1200px')
            .style('height', '900px')
            .style('background-color', 'whitesmoke')
            .style('border', '6px solid #999')
            .style('border-radius', '15px');

        const svg = svgContainer.append('svg')
            .attr('width', '100%')
            .attr('height', '100%');

        const link = svg.selectAll('line')
            .data(edges)
            .enter().append('line')
            .attr('stroke', 'gray')
            .attr('stroke-width', 2)
            .attr('x1', d => getNodeById(d.source).x)
            .attr('y1', d => getNodeById(d.source).y)
            .attr('x2', d => getNodeById(d.target).x)
            .attr('y2', d => getNodeById(d.target).y);

        const defs = svg.append('defs');
        const labelIds = edges.map((_, i) => `labelPath${i}`);
        const labelOffset = 10;

        const edgeLabels = svg.selectAll('text')
            .data(edges)
            .enter()
            .append('text')
            .text(d => d.label.toFixed(1))
            .attr('text-anchor', 'middle')
            .style('font-family', 'Trebuchet MS, sans-serif')
            .style('font-weight', 'bold')
            .style('font-size', '13px')
            .style('user-select', 'none')
            .style('-moz-user-select', 'none')
            .style('-webkit-user-select', 'none')
            .attr('transform', d => {
                const source = getNodeById(d.source);
                const target = getNodeById(d.target);
                const dx = target.x - source.x;
                const dy = target.y - source.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const nx = dx / length;
                const ny = dy / length;
                const offsetX = nx * labelOffset;
                const offsetY = ny * labelOffset;
                const x = (source.x + target.x) / 2 + offsetX;
                const y = (source.y + target.y) / 2 + offsetY;
                return `translate(${x},${y})`;
            });

        const node = svg.selectAll('circle')
            .data(nodes)
            .enter().append('circle')
            .attr('r', d => (d.id === 0 ? 20 : 10))
            .attr('fill', d => (d.id === 0 ? 'red' : 'steelblue'))
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);

        node.filter(d => d.id !== 0)
            .attr('r', 15)
            .attr('fill', 'gray');

        const text = svg.selectAll('text.node-label')
            .data(nodes)
            .enter().append('text')
            .text(d => d.label)
            .attr('text-anchor', 'middle')
            .attr('dy', 5.4)
            .attr('dx', -0.2)
            .style('font-family', 'Trebuchet MS, sans-serif')
            .style('font-size', '17px')
            .style('user-select', 'none')
            .style('-moz-user-select', 'none')
            .style('-webkit-user-select', 'none')
            .style('fill', d => (d.id === '0' ? 'red' : 'white'))
            .attr('x', d => d.x)
            .attr('y', d => d.y);

        const squareWidth = 60;
        const squareHeight = 25;

        const excludedNodeIndex = 0;
        const filteredNodes = nodes.filter((node, index) => index !== excludedNodeIndex);

        const squares = svg.selectAll('foreignObject.square')
            .data(filteredNodes)
            .enter().append('foreignObject')
            .attr('class', 'square')
            .attr('width', 80)
            .attr('height', 20)
            .attr('x', d => d.x - squareWidth / 1.2)
            .attr('y', d => d.y - squareHeight / 0.55)
            .append('xhtml:div')
            .append('xhtml:div')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('justify-content', 'center')
            .append('xhtml:p')
            .style('font-family', 'Trebuchet MS, sans-serif')
            .style('font-size', '15px')
            .style('font-weight', 'bold')
            .style('margin', '0')
            .style('stroke', 'lime')
            .style('stroke-width', 1)
            .style('text-align', 'center') 
            .text('{} sec')
            .style('visibility', 'hidden');
        
        squares.style('background-color', d => (d.id === '0' ? 'red' : 'white'))
            .style('border', '2px solid red')
            .style('user-select', 'none')
            .style('-moz-user-select', 'none')
            .style('-webkit-user-select', 'none')
            .style('border-top', 'none')
            .style('border-bottom', 'none')
            .attr('class', 'message-container')
            .attr('class', 'message-container')
            .style('width', 80 + 'px')
            .style('height', 35 + 'px')
            .style('text-align', 'center')


        
        const locWidth = 11;
        const locHeight = 20;

        const locationIcons = svg.selectAll('image')
            .data(filteredNodes)
            .enter()
            .append('image')
            .attr('x', d => d.x - locWidth)
            .attr('y', d => d.y - locHeight)
            .attr('width', 22)
            .attr('height', 22)
            .attr('xlink:href', './jpg/locIcon.png')
            .style('visibility', 'hidden');

        const iconSize = 15;

        const iconPosition1 = { x: 590, y: 430 };
        const iconPosition2 = { x: 610, y: 430 };
        const iconPosition3 = { x: 590, y: 460 };
        const iconPosition4 = { x: 620, y: 460 };
        const iconPosition5 = { x: 600, y: 450 };

        const icon1 = svg.append('image')
            .attr('xlink:href', './jpg/delivererIconGraph.png')
            .attr('width', iconSize * 2)
            .attr('height', iconSize * 2)
            .attr('x', iconPosition1.x - iconSize)
            .attr('y', iconPosition1.y - iconSize);

        const icon2 = svg.append('image')
            .attr('xlink:href', './jpg/delivererIconGraph.png')
            .attr('width', iconSize * 2)
            .attr('height', iconSize * 2)
            .attr('x', iconPosition2.x - iconSize)
            .attr('y', iconPosition2.y - iconSize);

        const icon3 = svg.append('image')
            .attr('xlink:href', './jpg/delivererIconGraph.png')
            .attr('width', iconSize * 2)
            .attr('height', iconSize * 2)
            .attr('x', iconPosition3.x - iconSize)
            .attr('y', iconPosition3.y - iconSize);

        const icon4 = svg.append('image')
            .attr('xlink:href', './jpg/delivererIconGraph.png')
            .attr('width', iconSize * 2)
            .attr('height', iconSize * 2)
            .attr('x', iconPosition4.x - iconSize)
            .attr('y', iconPosition4.y - iconSize);

        const icon5 = svg.append('image')
            .attr('xlink:href', './jpg/delivererIconGraph.png')
            .attr('width', iconSize * 2)
            .attr('height', iconSize * 2)
            .attr('x', iconPosition5.x - iconSize)
            .attr('y', iconPosition5.y - iconSize);

        function getNodeById(id) {
            return graphData.nodes.find(node => node.id === id);
        }

        $(function () {

            function updateDelivererPosition(delivererPath, delivererID, delivererPercentage) {
                if (!Array.isArray(delivererPath) || delivererPath.length < 2) {
                    return;
                }
                var totalEdges = delivererPath.length - 1;
                var currentEdgeIndex = Math.floor(delivererPercentage / 100 * totalEdges);

                if (currentEdgeIndex >= totalEdges) {
                    currentEdgeIndex = totalEdges - 1;
                    delivererPercentage = 100;
                }

                var currentNodeIndex = delivererPath[currentEdgeIndex];
                var nextNodeIndex = delivererPath[currentEdgeIndex + 1];
                var currentNode = getNodeById(currentNodeIndex);
                var nextNode = getNodeById(nextNodeIndex);



                var currentX = currentNode.x + (nextNode.x - currentNode.x) * (delivererPercentage / 100);
                var currentY = currentNode.y + (nextNode.y - currentNode.y) * (delivererPercentage / 100);

                if (delivererID === 1) {
                    icon1.attr('x', currentX - iconSize).attr('y', currentY - iconSize);
                } else if (delivererID === 2) {
                    icon2.attr('x', currentX - iconSize).attr('y', currentY - iconSize);
                } else if (delivererID === 3) {
                    icon3.attr('x', currentX - iconSize).attr('y', currentY - iconSize);
                } else if (delivererID === 4) {
                    icon4.attr('x', currentX - iconSize).attr('y', currentY - iconSize);
                } else if (delivererID === 5) {
                    icon5.attr('x', currentX - iconSize).attr('y', currentY - iconSize);
                }

            }
            function displayRemainingTime(delivererID, delivererDestination, delivererTimeToArrivalTotal) {
                if (typeof delivererDestination !== 'number' || isNaN(delivererDestination)) {
                    console.error('Invalid delivererDestination:', delivererDestination);
                    return;
                }

                var node = getNodeById(delivererDestination);
                if (!node) {
                    console.error(`Node with ID '${delivererDestination}' not found.`);
                    return;
                }
                if (typeof node.y === 'number' && typeof node.x === 'number') {
                    squares.filter(function (d) {
                        return d === node;
                    }).style('visibility', 'visible')
                        .text(delivererTimeToArrivalTotal + ' sec');
                    locationIcons.filter(function (d) {
                        return d === node;
                    }).style('visibility', 'visible')
                } else {
                    console.error(`Invalid coordinates for node with ID '${delivererDestination}'.`);
                }
                if (delivererTimeToArrivalTotal <= 2) {
                    squares.filter(function (d) {
                        return d === node;
                    }).style('visibility', 'hidden');
                    locationIcons.filter(function (d) {
                        return d === node;
                    }).style('visibility', 'hidden')
                }
            }

            function getMessages() {
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:5502/messagesCustom',
                    dataType: 'json',
                    success: function (response) {
                        var nonEmptyMessages = response.filter(function (messageData) {
                            return true;
                        });

                        for (var i = 0; i < nonEmptyMessages.length; i++) {
                            var messageData = nonEmptyMessages[i];
                            updateDelivererPosition(messageData.delivererPath, messageData.delivererId, messageData.delivererPercentage);
                            displayRemainingTime(messageData.delivererId, messageData.delivererDestination, messageData.delivererTimeToArrivalTotal);
                        }
                    },
                    error: function () {
                        console.log('Eroare la preluarea datelor');
                    }
                });
            }
            getMessages();
            setInterval(getMessages, 1000);
        });

    })
    .catch(error => console.error('Error loading graph data:', error));
