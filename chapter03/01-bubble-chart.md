---
layout: default
title: 3.1 Bubble Chart without SVG
---

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Loading and Sorting the Data</h2>

<!-- Example of a data item -->
<div class="chart-example">
    Example data item
    <pre id="datum"></pre>
</div>

<script>
    // Load the data asynchronously.
    d3.json('/chapter03/browsers.json', function(error, data) {

        // Handle errors getting or parsing the JSON data.
        if (error) {
            console.error('Error accessing or parsing the JSON file.');
            return error;
        }

        // Get the items and sort them by usage
        var items = data.values;
        items.sort(function(a, b) { return b.usage - a.usage; });

        // Display a data item in the pre#datum.
        d3.select('#datum').text(JSON.stringify(items[0], null, '    '));
    });
</script>


<h2 class="section-subtitle">Force Layout</h2>

<!-- Example of a data item with the computed position -->
<div class="chart-example">
    <pre id="force-item"></pre>
</div>

<script>
    // Load the data asynchronously
    d3.json('/chapter03/browsers.json', function(error, data) {

        // Handle errors getting or parsing the JSON data.
        if (error) { return error; }

        // Access the data items.
        var items = data.values;

        // Sort the data items by usage, greater usage first.
        items.sort(function(a, b) { return b.usage - a.usage; });

        // Size of the visualization container.
        var width = 700,
            height = 200;

        // Configure the force layout.
        var force = d3.layout.force()
            .nodes(items)
            .links([])
            .size([width, height]);

        // Start the force simulation.
        force.start();

        // Display the position of an item.
        d3.select('pre#force-item')
            .text(JSON.stringify(items[0], null, '    '));
    });
</script>


<h2 class="section-subtitle">Creating the DIV Elements</h2>


<div class="chart-example" id="chart1a"></div>

<script>
    // Load the data asynchronously
    d3.json('/chapter03/browsers.json', function(error, data) {

        // Handle errors getting or parsing the JSON data.
        if (error) { return error; }

        // Access the data items.
        var items = data.values;

        // Size of the visualization container.
        var width = 700,
            height = 200;

        // Sort the data items by usage, greater usage first.
        items.sort(function(a, b) { return b.usage - a.usage; });

        // Configure the force layout.
        var force = d3.layout.force()
            .nodes(items)
            .links([])
            .size([width, height])
            .start();

        // Select the container div and configure its attributes
        var containerDiv = d3.select('#chart1a')
            .style('position', 'relative')
            .style('width', width + 'px')
            .style('height', height + 'px')
            .style('padding', 0)
            .style('background-color', '#eeeeec');

        // Create a selection for the bubble divs, bind the data
        // array and set its attributes.
        var bubbleDivs = containerDiv.selectAll('div.bubble')
            .data(items)
            .enter()
            .append('div')
            .attr('class', 'bubble')
            .style('position', 'absolute')
            .style('width', '10px')
            .style('height', '10px')
            .style('background-color', '#222');

        // Register a listener function for the force tick event, and
        // update the position of each div on tick.
        force.on('tick', function() {
            bubbleDivs
                .style('top', function(d) { return (d.y - 5) + 'px'; })
                .style('left', function(d) { return (d.x - 5) + 'px'; });
        });
    });
</script>


<h2 class="section-subtitle">Adding Color</h2>


<div class="chart-example" id="chart1b"></div>

<script>
    // Load the data asynchronously
    d3.json('/chapter03/browsers.json', function(error, data) {

        // Handle errors getting or parsing the JSON data.
        if (error) { return error; }

        // Access the data items.
        var items = data.values;

        // Size of the visualization container.
        var width = 700,
            height = 200;

        // Sort the data items by usage, greater usage first.
        items.sort(function(a, b) { return b.usage - a.usage; });

        // Compute unique browser names
        var browserList = items.map(function(d) { return d.name; }),
            browserNames = d3.set(browserList).values();

        // Create a categorical color scale with 10 levels.
        var cScale = d3.scale.category10()
            .domain(browserNames);

        // Configure the force layout.
        var force = d3.layout.force()
            .nodes(items)
            .links([])
            .size([width, height])
            .start();

        // Select the container div and configure its attributes
        var containerDiv = d3.select('#chart1b')
            .style('position', 'relative')
            .style('width', width + 'px')
            .style('height', height + 'px')
            .style('padding', 0)
            .style('background-color', '#eeeeec');

        // Create a selection for the bubble divs, bind the data
        // array and set its attributes.
        var bubbleDivs = containerDiv.selectAll('div.bubble')
            .data(items)
            .enter()
            .append('div')
            .attr('class', 'bubble')
            .style('position', 'absolute')
            .style('width', '10px')
            .style('height', '10px')
            .style('border-radius', '5px')
            .style('background-color', function(d) {
                // Set the color corresponding to the browser.
                return cScale(d.name);
            });

        // Register a listener function for the force tick event, and
        // update the position of each div on tick.
        force.on('tick', function() {
            bubbleDivs
                .style('top', function(d) { return (d.y - 5) + 'px'; })
                .style('left', function(d) { return (d.x - 5)+ 'px'; });
        });
    });
</script>


<h2 class="section-subtitle">Setting the Size</h2>


<div class="chart-example" id="chart1c"></div>

<script>
    // Load the data asynchronously
    d3.json('/chapter03/browsers.json', function(error, data) {

        // Handle errors getting or parsing the JSON data.
        if (error) { return error; }

        // Access the data items.
        var items = data.values;

        // Size of the visualization container.
        var width = 700,
            height = 300;

        // Minimum and maximum radius
        var radiusExtent = [10, 50];

        // Sort the data items by usage, greater usage first.
        items.sort(function(a, b) { return b.usage - a.usage; });

        // Compute unique browser names
        var browserList = items.map(function(d) { return d.name; }),
            browserNames = d3.set(browserList).values();

        // Create a categorical color scale with 10 levels.
        var cScale = d3.scale.category10()
            .domain(browserNames);

        // Create the radius scale
        var rScale = d3.scale.sqrt()
            .domain(d3.extent(items, function(d) { return d.usage; }))
            .range(radiusExtent);

        // Add the radius to each item, to compute it only once.
        items.forEach(function(d) {
            d.r = rScale(d.usage);
        });

        // Configure the force layout.
        var force = d3.layout.force()
            .nodes(items)
            .links([])
            .size([width, height])
            .start();

        // Select the container div and configure its attributes
        var containerDiv = d3.select('#chart1c')
            .style('position', 'relative')
            .style('width', width + 'px')
            .style('height', height + 'px')
            .style('padding', 0)
            .style('background-color', '#eeeeec');

        // Create a selection for the bubble divs, bind the data
        // array and set its attributes.
        var bubbleDivs = containerDiv.selectAll('div.bubble')
            .data(items)
            .enter()
            .append('div')
            .attr('class', 'bubble')
            .style('position', 'absolute')
            .style('border-radius', function(d) { return d.r + 'px'; })
            .style('border', 'solid 1px #222')
            .style('width', function(d) { return (2 * d.r) + 'px'; })
            .style('height', function(d) { return (2 * d.r) + 'px'; })
            .style('background-color', function(d) { return cScale(d.name); });

        // Register a listener function for the force tick event, and
        // update the position of each div on tick.
        force.on('tick', function() {
            bubbleDivs
                .style('top', function(d) { return (d.y - d.r) + 'px'; })
                .style('left', function(d) { return (d.x - d.r)+ 'px'; });
        });
    });
</script>


<h2 class="section-subtitle">Setting the Charge</h2>


<div class="chart-example" id="chart1d"></div>

<script>
    // Load the data asynchronously
    d3.json('/chapter03/browsers.json', function(error, data) {

        // Handle errors getting or parsing the JSON data.
        if (error) { return error; }

        // Access the data items.
        var items = data.values;

        // Size of the visualization container.
        var width = 700,
            height = 300;

        // Minimum and maximum radius
        var radiusExtent = [10, 50];

        // Sort the data items by usage, greater usage first.
        items.sort(function(a, b) { return b.usage - a.usage; });

        // Compute unique browser names
        var browserList = items.map(function(d) { return d.name; }),
            browserNames = d3.set(browserList).values();

        // Create a categorical color scale with 10 levels.
        var cScale = d3.scale.category10()
            .domain(browserNames);

        // Create the radius scale
        var rScale = d3.scale.sqrt()
            .domain(d3.extent(items, function(d) { return d.usage; }))
            .range(radiusExtent);

        // Add the radius to each item, to compute it only once.
        items.forEach(function(d) {
            d.r = rScale(d.usage);
        });

        // Configure the force layout.
        var force = d3.layout.force()
            .nodes(items)
            .links([])
            .size([width, height])
            .charge(function(d) { return -0.12 * d.r * d.r; })
            .start();

        // Select the container div and configure its attributes
        var containerDiv = d3.select('#chart1d')
            .style('position', 'relative')
            .style('width', width + 'px')
            .style('height', height + 'px')
            .style('padding', 0)
            .style('background-color', '#eeeeec');

        // Create a selection for the bubble divs, bind the data
        // array and set its attributes.
        var bubbleDivs = containerDiv.selectAll('div.bubble')
            .data(items)
            .enter()
            .append('div')
            .attr('class', 'bubble')
            .style('position', 'absolute')
            .style('border-radius', function(d) { return d.r + 'px'; })
            .style('border', 'solid 1px #222')
            .style('width', function(d) { return (2 * d.r) + 'px'; })
            .style('height', function(d) { return (2 * d.r) + 'px'; })
            .style('background-color', function(d) { return cScale(d.name); });

        // Register a listener function for the force tick event, and
        // update the position of each div on tick.
        force.on('tick', function() {
            bubbleDivs
                .style('top', function(d) { return (d.y - d.r) + 'px'; })
                .style('left', function(d) { return (d.x - d.r)+ 'px'; });
        });
    });
</script>


<h2 class="section-subtitle">Creating a Reusable Chart</h2>

<div class="chart-example" id="chart1e"></div>

<script>
    function bubbleChart() {

        // Chart Attributes

        var width = 700,
            height = 300;

        var radiusExtent = [10, 50];

        var cScale = d3.scale.category10();

        var name = function(d) { return d.name; }

        var usage = function(d) { return d.usage; }

        var charge = function(d) { return -0.12 * d.r * d.r; }

        function chart(selection) {
            selection.each(function(data) {

                // Select the container div and configure its attributes
                var containerDiv = d3.select(this);

                // Sort the data items by usage, greater usage first.
                data.sort(function(a, b) { return usage(b) - usage(a); });

                // Compute unique browser names
                var nameList = data.map(name),
                    uniqueNames = d3.set(nameList).values();

                // Set the scale domain
                cScale.domain(uniqueNames);

                // Create the radius scale
                var rScale = d3.scale.sqrt()
                    .domain(d3.extent(data, usage))
                    .range(radiusExtent);

                // Add the radius to each item, to compute it only once.
                data.forEach(function(d) { d.r = rScale(usage(d)); });

                // Configure the force layout.
                var force = d3.layout.force()
                    .nodes(data)
                    .links([])
                    .size([width, height])
                    .charge(function(d) { return -0.12 * d.r * d.r; })
                    .start();

                containerDiv
                    .style('position', 'relative')
                    .style('width', width + 'px')
                    .style('height', height + 'px')
                    .style('padding', 0)
                    .style('background-color', '#eeeeec');

                // Create a selection for the bubble divs, bind the data
                // array and set its attributes.
                var bubbleDivs = containerDiv.selectAll('div.bubble')
                    .data(data)
                    .enter()
                    .append('div')
                    .attr('class', 'bubble')
                    .style('position', 'absolute')
                    .style('border-radius', function(d) { return d.r + 'px'; })
                    .style('border', 'solid 1px #222')
                    .style('width', function(d) { return (2 * d.r) + 'px'; })
                    .style('height', function(d) { return (2 * d.r) + 'px'; })
                    .style('background-color', function(d) { return cScale(name(d)); });

                // Register a listener function for the force tick event, and
                // update the position of each div on tick.
                force.on('tick', function() {
                    bubbleDivs
                        .style('top', function(d) { return (d.y - d.r) + 'px'; })
                        .style('left', function(d) { return (d.x - d.r)+ 'px'; });
                });
            });
        }

        // Accessor Methods

        // Width
        chart.width = function(value) {
            if (!arguments.length) { return width; }
            width = value;
            return chart;
        };

        // Height
        chart.height = function(value) {
            if (!arguments.length) { return height; }
            height = value;
            return chart;
        };

        // Radius Extent
        chart.radiusExtent = function(value) {
            if (!arguments.length) { return radiusExtent; }
            radiusExtent = value;
            return chart;
        };

        // Usage Accessor
        chart.usage = function(usageAccessor) {
            if (!arguments.length) { return usage; }
            usage = usageAccessor;
            return chart;
        };

        // Name Accessor
        chart.name = function(nameAccessor) {
            if (!arguments.length) { return name; }
            name = nameAccessor;
            return chart;
        };

        // Color Scale
        chart.colorScale = function(colorScale) {
            if (!arguments.length) { return cScale; }
            cScale = colorScale;
            return chart;
        };

        // Charge of the layout
        chart.charge = function(chargeMethod) {
            if (!arguments.length) { return charge; }
            charge = chargeMethod;
            return charge;
        }

        return chart;
    };


    // Load the data asynchronously
    d3.json('/chapter03/browsers.json', function(error, data) {

        // Handle errors getting or parsing the JSON data.
        if (error) { return error; }

        var chart = bubbleChart()
            .width(500);

        d3.select('#chart1e')
            .data([data.values])
            .call(chart);
    });
</script>


<h2 class="section-subtitle">Adding a Legend</h2>

<div class="chart-example">
    <div class="chart-example" id="chart1f"></div>
    <div class="chart-example" id="legend1f"></div>
    <div style="clear: left;"></div>
</div>

<script>
    function legendChartA() {

        // Chart Attributes

        // Color Scale
        var cScale = d3.scale.category20();

        // Charting function.
        function chart(selection) {
            selection.each(function(data) {

                var containerDiv = d3.select(this);

                // Add the label 'Legend' on enter
                containerDiv.selectAll('b')
                    .data([data])
                    .enter().append('b')
                    .text('Legend');
            });
        }

        // Accessor methods

        // Color Scale Accessor
        chart.colorScale = function(value) {
            if (!arguments.length) { return cScale; }
            cScale = value;
            return chart;
        };

        return chart;
    };
</script>


<script>
    // Load the data asynchronously
    d3.json('/chapter03/browsers.json', function(error, data) {

        // Handle errors getting or parsing the JSON data.
        if (error) { return error; }

        // Create an instance of the bubble chart.
        var chart = bubbleChart()
            .width(400);

        // Select the chart container and bind it to the dataset.
        d3.select('#chart1f')
            .data([data.values])
            .style('float', 'left')
            .style('margin', '2px')
            .call(chart);

        // Create an instance of the legend chart.
        var legend = legendChartA()
            .colorScale(chart.colorScale());

        // Select the container of the legend and invoke the legend function.
        var legendDiv = d3.select('#legend1f')
            .data([chart.colorScale().domain()])
            .call(legend);
    });
</script>


<h2 class="section-subtitle">Adding Legend Items</h2>

<!-- Container div -->
<div class="chart-example">
    <div class="chart-example" id="chart1g"></div>
    <div class="chart-example" id="legend1g"></div>
    <div style="clear: left;"></div>
</div>

<script>
    function legendChartB() {

        // Chart Attributes

        // Color Scale
        var cScale = d3.scale.category20();

        // Key function
        var key = function(d) { return d.name; };

        // Label function
        var label = function(d) { return d.name };

        // Legend width
        var width = 200;

        // Charting function.
        function chart(selection) {
            selection.each(function(data) {

                // Select the container element and set its attributes.
                var containerDiv = d3.select(this)
                    .style('width', width + 'px');

                // Add the label 'Legend' on enter
                containerDiv.selectAll('p.legent-title')
                    .data([data])
                    .enter()
                    .append('p')
                    .attr('class', 'legend-title')
                    .text('Legend');

                // Add a div for each data item
                var itemDiv = containerDiv.selectAll('div.item')
                    .data(data)
                    .enter()
                    .append('div')
                    .attr('class', 'item');

                // Add a paragraph in the div and set its attributes
                var itemP = itemDiv.append('p')
                    .style('line-height', '0.8em')
                    .style('font-size', '11px');

                // Add two points as markers
                itemP.append('span').text('..')
                    .style('color', function(d) { return cScale(d.name); })
                    .style('background', function(d) { return cScale(d.name); });

                // Append the text showing the label
                itemP.append('text')
                    .text(label);
            });
        }

        // Accessor methods

        // Color Scale Accessor
        chart.colorScale = function(value) {
            if (!arguments.length) { return cScale; }
            cScale = value;
            return chart;
        };

        // Width Accessor
        chart.width = function(value) {
            if (!arguments.length) { return width; }
            width = value;
            return chart;
        };

        // Label Accessor
        chart.label = function(labelAccessor) {
            if (!arguments.length) { return label; }
            label = labelAccessor;
            return chart;
        }

        // Key Accessor
        chart.key = function(keyAccessor) {
            if (!arguments.length) { return key; }
            key = keyAccessor;
            return chart;
        }

        return chart;
    };
</script>


<script>
    // Load the data asynchronously
    d3.json('/chapter03/browsers.json', function(error, data) {

        // Handle errors getting or parsing the JSON data.
        if (error) { return error; }

        // Create an instance of the bubble chart.
        var chart = bubbleChart()
            .width(400);

        // Select the chart container and bind it to the dataset.
        d3.select('#chart1g')
            .data([data.values])
            .style('float', 'left')
            .style('margin', '2px')
            .call(chart);

        // Get the color scale of the chart.
        var cScale = chart.colorScale();

        // Create a map to aggregate the browser usage
        var browsers = d3.map();

        // Adds up the usage for each browser.
        data.values.forEach(function(d) {
            var item = browsers.get(d.name);
            if (item) {
                browsers.set(d.name, {
                    name: d.name,
                    usage: d.usage + item.usage
                });
            } else {
                browsers.set(d.name, {
                    name: d.name,
                    usage: d.usage
                });
            }
        });

        var browserItems = browsers.values().sort(function(a, b) {
            return b.usage - a.usage;
        });

        // Create an instance of the legend chart.
        var legend = legendChartB()
            .colorScale(cScale)
            .label(function(d) {
                return ' ' + d.name + ' (' + d.usage.toFixed(2) + '%)';
            });

        // Select the container of the legend and invoke the legend function.
        var legendDiv = d3.select('#legend1g')
            .data([browserItems])
            .style('float', 'left')
            .style('margin', '2px')
            .call(legend);
    });
</script>
