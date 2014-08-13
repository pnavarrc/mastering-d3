---
layout: default
title: "3.3 Canvas and D3"
---

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Canvas Example</h2>

<!-- Container for the Canvas Example -->
<div class="chart-example">
    <canvas id="canvas-demo" width="650px" height="60px"></canvas>
</div>

<script>
    // Graphic properties
    var barw = 65,
        barh = 60;

    // Append a canvas element, set its size and get the node.
    var canvas = document.getElementById('canvas-demo');

    // Get the rendering context.
    var context = canvas.getContext('2d');

    // Array with colors, to have one rectangle of each color.
    var color = ['#5c3566', '#6c475b', '#7c584f', '#8c6a44', '#9c7c39',
                 '#ad8d2d', '#bd9f22', '#cdb117', '#ddc20b', '#edd400'];

    // Set the fill color and render ten rectangles.
    for (var k = 0; k < 10; k += 1) {
        // Set the fill color.
        context.fillStyle = color[k];
        context.fillRect(k * barw, 0, barw, barh);
    }
</script>


<h2 class="section-subtitle">Creating Basic Shapes</h2>

<!-- Container for the Canvas Example -->
<div class="chart-example">
    <canvas id="canvas-shape" width="650px" height="60px"></canvas>
</div>

<script>
    // Append a canvas element, set its size and get the node.
    var canvas = document.getElementById('canvas-shape');

    // Get the rendering context.
    var context = canvas.getContext('2d');

    // Create a red semicircle.
    context.beginPath();
    context.fillStyle = '#ff0000';
    context.moveTo(325, 30);
    context.arc(325, 30, 20, Math.PI / 2, 3 * Math.PI / 2);
    context.fill();
</script>


<h2 class="section-subtitle">Force Layout with Canvas</h2>

<!-- Container for Canvas -->
<div class="chart-example" id="canvas-force"></div>

<script>
    // Number of Nodes
    var nNodes = 250,
        createLink = false;

    // Dataset Structure
    var data = {nodes: [], links: []};

    // Iterate in the nodes
    for (var k = 0; k < nNodes; k += 1) {
        // Create a node with a random radius.
        data.nodes.push({radius: Math.random() > 0.3 ? 2 : 4});

        // Create random links to the node.
        for (var j = k + 1; j < nNodes; j += 1) {

            // Only create links if the indexes are closer, with probability 0.1
            createLink = (Math.random() < 0.1) && (Math.abs(k - j) < 8);

            if (createLink) {
                // Append a link with variable distance between the nodes.
                data.links.push({
                    source: k,
                    target: j,
                    dist: 2 * Math.abs(k - j) + 10
                });
            }
        }
    }

    // Figure width and height
    var width = 650,
        height = 300;

    // Create and configure the force layout
    var force = d3.layout.force()
        .size([width, height])
        .nodes(data.nodes)
        .charge(function(d) { return -1.2 * d.radius * d.radius; })
        .linkDistance(function(d) { return d.dist; })
        .links(data.links)
        .start();

    // Create a canvas element and set its size.
    var canvas = d3.select('div#canvas-force').append('canvas')
        .attr('width', width + 'px')
        .attr('height', height + 'px')
        .node();

    // Get the canvas context.
    var context = canvas.getContext('2d');

    force.on('tick', function() {
        // Clear the complete figure.
        context.clearRect(0, 0, width, height);

        // Draw the links
        data.links.forEach(function(d) {
            // Draw a line from source to target
            context.beginPath();
            context.moveTo(d.source.x, d.source.y);
            context.lineTo(d.target.x, d.target.y);
            context.stroke();
        });

        // Draw the nodes
        data.nodes.forEach(function(d, i) {
            // Draws a complete arc for each node.
            context.beginPath();
            context.arc(d.x, d.y, d.radius, 0, 2 * Math.PI, true);
            context.fill();
        });
    });
</script>