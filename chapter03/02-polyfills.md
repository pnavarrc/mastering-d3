---
layout: default
title: "3.2 Polyfills"
---

<div>
    <script src="/assets/js/lib/modernizr-latest.js" charset="utf-8"></script>

    <!-- Canvg Libraries -->
    <script src="/assets/js/lib/rgbcolor.js"></script>
    <script src="/assets/js/lib/StackBlur.js"></script>
    <script src="/assets/js/lib/canvg.js"></script>
</div>

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Detecting SVG Support</h2>

<div id="svg-support"></div>

<script>
    if (Modernizr.svg) {
        d3.select('#svg-support')
            .attr('class', 'alert alert-success')
            .text('Your browser has SVG support.');
    } else {
        d3.select('#svg-support')
            .attr('class', 'alert alert-danger')
            .text('SVG support unavailable.');
    }
</script>


<h2 class="section-subtitle">Using Canvg</h2>

<div id="canvg-demo"></div>

<script>
    // Set the width and height of the figure.
    var width = 600,
        height = 300;

    // Select the container div and append the SVG element.
    var containerDiv = d3.select('#canvg-demo'),
        svg = containerDiv.append('svg')
            .attr('width', width)
            .attr('height', height);

    // Generate data for the position and size of the rectangles.
    var data = [];
    for (var k = 0; k < 60; k += 1) {
        for (var j = 0; j < 30; j += 1) {
            data.push({
                x: 5 + 10 * k,
                y: 5 + 10 * j,
                z: (k - 50) +  (20 - j)
            });
        }
    }

    // Create a radius scale using the z attribute.
    var rScale = d3.scale.sqrt()
        .domain(d3.extent(data, function(d) { return d.z; }))
        .range([3, 5]);

    // Create a linear color scale using the z attribute.
    var cScale = d3.scale.linear()
        .domain(d3.extent(data, function(d) { return d.z; }))
        .range(['#204a87', '#cc0000']);

    // Select the circle elements, bind the dataset and append
    // the circles on enter.
    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .attr('r', function(d) { return rScale(d.z); })
        .attr('fill', function(d) { return cScale(d.z); })
        .attr('fill-opacity', 0.9);

    // Replace all the SVG elements by canvas drawings.
    canvg();
</script>
