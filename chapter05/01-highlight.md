---
layout: default
title: 5.1 Highlighting and Tooltips
---

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Fruit Chart</h2>

<!-- Fruits Chart -->
<script>
    function fruitChart1() {

        // Chart Attributes
        var width = 600,
            height = 120;

        // Radius Extent
        var radiusExtent = [0, 40];

        // Charting Function
        function chart(selection) {
            selection.each(function(data) {

                // Select the container div and create the svg selection
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // Append the svg element on enter
                svg.enter().append('svg');

                // Update the width and height of the SVG element
                svg
                    .attr('width', width)
                    .attr('height', height);

                // Create a scale for the horizontal position
                var xScale = d3.scale.ordinal()
                    .domain(d3.range(data.length))
                    .rangePoints([0, width], 1);

                var maxCal = d3.max(data, function(d) {
                    return d.calories;
                });

                // Create the radius scale
                var rScale = d3.scale.sqrt()
                    .domain([0, maxCal])
                    .rangeRound(radiusExtent);

                // Create a container group for each circle
                var gItems = svg.selectAll('g.fruit-item')
                    .data(data)
                    .enter()
                    .append('g')
                    .attr('class', 'fruit-item')
                    .attr('transform', function(d, i) {
                        return 'translate(' + [xScale(i), height / 2] + ')';
                    });

                // Add a circle to the item group
                var circles = gItems.append('circle')
                    .attr('r', function(d) { return rScale(d.calories); })
                    .attr('fill', function(d) { return d.color; });

                // Add the fruit name
                var labelName = gItems.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '12px')
                    .text(function(d) { return d.name; });

                // Add the calories label
                var labelKCal = gItems.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '10px')
                    .attr('y', 12)
                    .text(function(d) { return d.calories + ' kcal'; });
            });
        }

        // Accessor Methods

        // Width
        chart.width = function(val) {
            if (!arguments.length) { return width; }
            width = val;
            return chart;
        };

        // Height
        chart.height = function(val) {
            if (!arguments.length) { return height; }
            height = val;
            return chart;
        };

        return chart;
    }
</script>

<!-- Container Div -->
<div id="chart01"></div>

<script>
    // Load and parse the json data
    d3.json('/chapter05/fruits.json', function(error, root) {

        // Displays an error message
        if (error) {
            console.error('Error getting or parsing the data.');
            throw error;
        }

        // Create and configure the chart
        var fruits = fruitChart1();

        // Select the container element and invoke the fruit chart
        d3.select('div#chart01')
            .data([root.data])
            .call(fruits);
    });
</script>

<h2 class="section-subtitle">Adding Highlighting</h2>

<!-- Fruits Chart -->
<script>
    function fruitChart2() {

        // Chart Attributes
        var width = 700,
            height = 120;

        // Radius Extent
        var radiusExtent = [0, 40];

        // Charting Function
        function chart(selection) {
            selection.each(function(data) {

                // Select the container div and create the svg selection
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // Append the svg element on enter
                svg.enter().append('svg');

                // Update the width and height of the SVG element
                svg
                    .attr('width', width)
                    .attr('height', height);

                // Create a scale for the horizontal position
                var xScale = d3.scale.ordinal()
                    .domain(d3.range(data.length))
                    .rangePoints([0, width], 1);

                // Create the radius scale
                var maxCal = d3.max(data, function(d) { return d.calories; }),
                    rScale = d3.scale.sqrt()
                        .domain([0, maxCal])
                        .rangeRound(radiusExtent);

                // Create a container group for each circle
                var gItems = svg.selectAll('g.fruit-item')
                    .data(data)
                    .enter()
                    .append('g')
                    .attr('class', 'fruit-item')
                    .attr('transform', function(d, i) {
                        return 'translate(' + [xScale(i), height / 2] + ')';
                    });

                // Add a circle to the item group
                var circles = gItems.append('circle')
                    .attr('r', function(d) { return rScale(d.calories); })
                    .attr('fill', function(d) { return d.color; });

                // Add the fruit name
                var labelName = gItems.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '12px')
                    .attr('pointer-events', 'none')
                    .text(function(d) { return d.name; });

                // Add the calories label
                var labelKCal = gItems.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '10px')
                    .attr('pointer-events', 'none')
                    .attr('y', 12)
                    .text(function(d) { return d.calories + ' kcal'; });

                // We add listeners to the mouseover and mouseout events
                circles
                    .on('mouseover', function(d) {
                        d3.select(this)
                            .attr('stroke-width', 3)
                            .attr('fill', d3.rgb(d.color).brighter())
                            .attr('stroke', d.color);
                    })
                    .on('mouseout', function(d) {
                        d3.select(this)
                            .attr('fill', d.color)
                            .attr('stroke-width', 0);
                    });
            });
        }

        // Accessor Methods

        // Width
        chart.width = function(val) {
            if (!arguments.length) { return width; }
            width = val;
            return chart;
        };

        // Height
        chart.height = function(val) {
            if (!arguments.length) { return height; }
            height = val;
            return chart;
        };

        return chart;
    }
</script>

<!-- Container Div -->
<div id="chart02"></div>

<script>
    // Load and parse the json data
    d3.json('/chapter05/fruits.json', function(error, root) {

        // Displays the error message
        if (error) {
            console.error('Error getting or parsing the data.');
        }

        // Create and configure the fruit chart
        var fruits = fruitChart2();

        // Select the container element and invoke the chart function
        d3.select('div#chart02')
            .data([root.data])
            .call(fruits);
    });
</script>


<h2 class="section-subtitle">Tooltip API</h2>


<script>
    function tooltipChart1() {
        'use strict';

        // Charting function
        function chart(selection) {
            selection.each(function(d) {
                // Bind the mouse events to the container element
                d3.select(this)
                    .on('mouseover.tooltip', create)
                    .on('mousemove.tooltip', move)
                    .on('mouseout.tooltip', remove);
            });
        }

        // This functions will create, move and remove the tooltip
        function init() { console.log('init'); };
        function create(d) { console.log('create '); };
        function move(d) { console.log('move'); };
        function remove(d) { console.log('remove'); };

        return chart;
    }
</script>

<!-- Container of the rectangle -->
<div id="chart03"></div>

<script>
    // Tooltip Data item
    var data = [{
        title: 'Title',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    }];

    // Create and configure the tooltip
    var tooltip = tooltipChart1();

    // Size of the rectangle
    var width = 700,
        height = 80;

    // Select the container div and append an svg element
    var div = d3.select('div#chart03'),
        svg = div.append('svg')
            .attr('width', width)
            .attr('height', height);

    // Create the rectangles, binding the mouseover and mouseout events
    // to anonymous functions to highlight the rectangles.
    var rect = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', '#eee')
        .on('mouseover', function(d) {
            d3.select(this).attr('fill', '#ddd');
        })
        .on('mouseout', function(d) {
            d3.select(this).attr('fill', '#eee');
        });

    // Call the tooltip chart, passing the selection as argument.
    rect.call(tooltip);
</script>


<h2 class="section-subtitle">Tooltip Content</h2>

<script>
    function tooltipChart() {
        'use strict';

        // Tooltip width and height
        var width = 200,
            height = 80;

        // Tooltip Offset
        var offset = {x: 20, y: 0};

        // Default Accessors for the Title and Content
        var title = function(d) { return d.title; };
        var content = function(d) { return d.content; };

        // Charting function
        function chart(selection) {
            selection.each(function(d) {
                // Bind the mouse events to the container element
                d3.select(this)
                    .on('mouseover.tooltip', create)
                    .on('mousemove.tooltip', move)
                    .on('mouseout.tooltip', remove);
            });
        }

        // Initialize the tooltip
        var init = function(selection) {
            selection.each(function(data) {
                // Create and configure the tooltip container
                d3.select(this)
                    .attr('class', 'tooltip-container')
                    .style('width', width + 'px');

                // Tooltip Title
                d3.select(this).append('p')
                    .attr('class', 'tooltip-title')
                    .text(title(data));

                // Tooltip Content
                d3.select(this).append('p')
                    .attr('class', 'tooltip-content')
                    .text(content(data));
            });
        };

        // Create the tooltip chart
        var create = function(data) {

            // Create the tooltip container div
            var tooltipContainer = d3.select('body').append('div')
                .datum(data)
                .attr('class', 'tooltip-container')
                .call(init);

            // Move the tooltip to its initial position
            tooltipContainer
                .style('left', (d3.event.pageX + offset.x) + 'px')
                .style('top', (d3.event.pageY + offset.y) + 'px');
        };

        // Move the tooltip to follow the pointer
        var move = function() {
            // Select the tooltip and move it following the pointer
            d3.select('body').select('div.tooltip-container')
                .style('left', (d3.event.pageX + offset.x) + 'px')
                .style('top', (d3.event.pageY + offset.y) + 'px');
        };

        // Remove the tooltip
        var remove = function() {
            // Remove the tooltip div.
            d3.select('div.tooltip-container').remove();
        };

        // Accessor for the Title Function
        chart.title = function(titleAccessor) {
            if (!arguments.length) { return title; }
            title = titleAccessor;
            return chart;
        };

        // Accessor for the Content Function
        chart.content = function(contentAccessor) {
            if (!arguments.length) { return content; }
            content = contentAccessor;
            return chart;
        };


        return chart;
    }
</script>

<!-- Container of the rectangle -->
<div>
    <style>
        .tooltip-container {
            position: absolute;
            pointer-events: none;
            padding: 2px 4px 2px 6px;
            background-color: #eee;
            border: solid 1px #aaa;
        }

        .tooltip-title {
            text-align: center;
            font-size: 12px;
            font-weight: bold;
            line-height: 1em;
        }

        .tooltip-content {
            font-size: 11px;
        }

    </style>
</div>

<div id="chart04"></div>

<script>

    // Tooltip Data item
    var data = [{
        title: 'Title',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    }];

    // Create and configure the tooltip
    var tooltip = tooltipChart();

    // Size of the rectangle
    var width = 700,
        height = 80;

    // Select the container div and append an svg element
    var div = d3.select('div#chart04'),
        svg = div.append('svg')
            .attr('width', width)
            .attr('height', height);

    // Create the rectangles, binding the mouseover and mouseout events
    // to anonymous functions to highlight the rectangles.
    var rect = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', '#eee')
        .on('mouseover', function(d) {
            d3.select(this).attr('fill', '#ddd');
        })
        .on('mouseout', function(d) {
            d3.select(this).attr('fill', '#eee');
        });

    // Call the tooltip chart, passing the selection as argument.
    rect.call(tooltip);
</script>


<h2 class="section-subtitle">Using the Tooltip</h2>


<div id="chart05"></div>

<!-- Fruits Chart -->
<script>
    function fruitChart() {

        // Chart Attributes
        var width = 700,
            height = 120;

        // Radius Extent
        var radiusExtent = [0, 40];

        // Create and configure the tooltip
        var tooltip = tooltipChart()
            .title(function(d) { return d.name; })
            .content(function(d) { return d.description; });

        // Charting Function
        function chart(selection) {
            selection.each(function(data) {

                // Select the container div and create the svg selection
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // Append the svg element on enter
                svg.enter().append('svg');

                // Update the width and height of the SVG element
                svg
                    .attr('width', width)
                    .attr('height', height);

                // Create a scale for the horizontal position
                var xScale = d3.scale.ordinal()
                    .domain(d3.range(data.length))
                    .rangePoints([0, width], 1);

                // Create the radius scale
                var maxCal = d3.max(data, function(d) { return d.calories; }),
                    rScale = d3.scale.sqrt()
                        .domain([0, maxCal])
                        .rangeRound(radiusExtent);

                // Create a container group for each circle
                var gItems = svg.selectAll('g.fruit-item')
                    .data(data)
                    .enter()
                    .append('g')
                    .attr('class', 'fruit-item')
                    .attr('transform', function(d, i) {
                        return 'translate(' + [xScale(i), height / 2] + ')';
                    });

                // Add a circle to the item group
                var circles = gItems.append('circle')
                    .attr('r', function(d) { return rScale(d.calories); })
                    .attr('fill', function(d) { return d.color; });

                // Add the fruit name
                var labelName = gItems.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '12px')
                    .attr('pointer-events', 'none')
                    .text(function(d) { return d.name; });

                // Add the calories label
                var labelKCal = gItems.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '10px')
                    .attr('pointer-events', 'none')
                    .attr('y', 12)
                    .text(function(d) { return d.calories + ' kcal'; });

                // We add listeners to the mouseover and mouseout events
                circles
                    .on('mouseover', function(d) {
                        d3.select(this)
                            .attr('fill', d3.rgb(d.color).brighter())
                            .attr('stroke', d.color)
                            .attr('stroke-width', 3);
                    })
                    .on('mouseout', function(d) {
                        d3.select(this)
                            .attr('fill', d.color)
                            .attr('stroke-width', 0);
                    })
                    .call(tooltip);

            });
        }

        // Accessor Methods

        // Width
        chart.width = function(val) {
            if (!arguments.length) { return width; }
            width = val;
            return chart;
        };

        // Height
        chart.height = function(val) {
            if (!arguments.length) { return height; }
            height = val;
            return chart;
        };

        return chart;
    }
</script>

<script>
    // Load and parse the json data
    d3.json('/chapter05/fruits.json', function(error, root) {

        // Handle errors getting or parsing the json data.
        if (error) {
            console.error('Error getting or parsing the data.');
        }

        // Create and configure the fruit chart
        var fruits = fruitChart();

        d3.select('div#chart05')
            .data([root.data])
            .call(fruits);
    });
</script>
