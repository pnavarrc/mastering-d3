---
layout: default
title: "4.1 Creating a Slider"
---

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Drag Behavior</h2>

<div class="chart-example" id="chart01"></div>

<script>
    // Width and height of the figure.
    var width = 600,
        height = 150;

    // Create the svg element.
    var svg = d3.select('#chart01').append('svg')
        .attr('width', width)
        .attr('height', height);

    // Append a grey circle in the middle.
    var circle = svg.append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', 30)
        .attr('fill', '#555');

    // Create and configure a drag behavior.
    var drag = d3.behavior.drag()
        .on('drag', dragListener);

    // Add dragging handling to the circle.
    circle.call(drag);

    // Moves the circle on drag.
    function dragListener(d) {
        // Get the current position of the circle.
        var cx = +d3.select(this).attr('cx'),
            cy = +d3.select(this).attr('cy');

        // Set the new position of the circle.
        d3.select(this)
            .attr('cx', cx + d3.event.dx)
            .attr('cy', cy + d3.event.dy);
    }
</script>

<h2 class="section-subtitle">Creating a Slider</h2>

<!-- Container of the chart -->
<div class="chart-example" id="chart02"></div>

<script>

    // Slider Control
    // --------------

    function sliderControl() {

        // Slider Attributes

        // Slider width.
        var width = 600;

        // Default domain.
        var domain = [0, 100];

        // Default slider callback.
        var onSlide = function(selection) { };

        // Charting function.
        function chart(selection) {
            selection.each(function(data) {

                // Select the container group.
                var group = d3.select(this);

                // Add a line covering the complete width.
                group.selectAll('line')
                    .data([data])
                    .enter()
                    .append('line')
                    .call(chart.initLine);

                // Append a circle as handler.
                var handle = group.selectAll('circle')
                    .data([data])
                    .enter().append('circle')
                    .call(chart.initHandle);

                // Set the position scale.
                var posScale = d3.scale.linear()
                    .domain(domain)
                    .range([0, width]);


                // Set the position of the circle and adds the drag behavior.
                handle.attr('cx', function(d) { return posScale(d); });

                // Create and configure the drag behavior.
                var drag = d3.behavior.drag()
                    .on('drag', moveHandle);

                handle.call(drag);

                function moveHandle(d) {
                    // Compute the future position of the handle
                    var cx = +d3.select(this).attr('cx') + d3.event.dx;

                    // Update the position if its within its valid range.
                    if ((0 < cx) && (cx < width)) {
                        // Compute the new value and rebind the data
                        d3.select(this)
                            .data([posScale.invert(cx)])
                            .attr('cx', cx)
                            .call(onSlide);
                    }
                }
            });
        }

        // Set the initial attributes of the line.
        chart.initLine = function(selection) {
            selection
                .attr('x1', 2)
                .attr('x2', width - 4)
                .attr('stroke', '#777')
                .attr('stroke-width', 4)
                .attr('stroke-linecap', 'round');
        };

        // Set the initial attributes of the handle.
        chart.initHandle = function(selection) {
            selection
                .attr('cx', function(d) { return width / 2; })
                .attr('r', 6)
                .attr('fill', '#aaa')
                .attr('stroke', '#222')
                .attr('stroke-width', 2);
        };

        // Accessor Methods

        // Width
        chart.width = function(value) {
            if (!arguments.length) { return width; }
            width = value;
            return chart;
        };

        // Domain
        chart.domain = function(value) {
            if (!arguments.length) { return domain; }
            domain = value;
            return chart;
        };

        // Slide callback function
        chart.onSlide = function(onSlideFunction) {
            if (!arguments.length) { return onSlide; }
            onSlide = onSlideFunction;
            return chart;
        };

        return chart;
    }

    // Figure properties.
    var width = 600,
        height = 60,
        margin = 20;

    // Create the svg element and set its dimensions.
    var svg = d3.select('#chart02').append('svg')
        .attr('width', width + 2 * margin)
        .attr('height', height + 2 * margin);

    // Valid range and initial value.
    var value = 70,
        domain = [0, 100];

    // Create and configure the slider control.
    var slider = sliderControl()
        .width(width)
        .domain(domain);

    // Set a simple callback for the slide event.
    slider.onSlide(function(selection) {
        selection.each(function(d) {
            console.log('value = ' + d);
        });
    });

    // Create a container for the slider and translate it
    // to align it vertically.
    var gSlider = svg.selectAll('g')
        .data([value])
        .enter()
        .append('g')
        .attr('transform', 'translate(' + [margin, height / 2] + ')')
        .call(slider);
</script>

<h2 class="section-subtitle">Using the Slider</h2>

<div class="chart-example" id="chart03"></div>

<script>
    // Chart Settings
    var width = 600,
        height = 40,
        margin = 10;

    // Initial value
    var domain = [0, 100],
        value = 35;

    // Create the svg element
    var svg = d3.select('#chart03').append('svg')
        .attr('width', width + 2 * margin)
        .attr('height', height + 3 * margin);

    // Create a color scale with the same range that the slider
    var cScale = d3.scale.linear()
        .domain(domain)
        .range(['#edd400', '#a40000']);

    // Add a background to the svg element.
    var rectangle = svg.append('rect')
        .attr('x', margin)
        .attr('y', 2 * margin)
        .attr('width', width)
        .attr('height', height)
        .attr('fill', cScale(value));

    // Create and configure the slider control.
    var slider = sliderControl()
        .domain(domain)
        .width(width)
        .onSlide(function(selection) {
            selection.each(function(d) {
                rectangle.attr('fill', cScale(d));
            });
        });

    // Create a group to hold the slider and add the slider to it.
    var gSlider = svg.selectAll('g')
        .data([value])
        .enter()
        .append('g')
        .attr('transform', 'translate(' + [margin, margin] + ')')
        .call(slider);
</script>
