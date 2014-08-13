---
layout: default
title: "2.2 Barcode Chart"
---

<div>
    <style>
        .chart-example {
            margin: 20px;
            padding: 10px;
            border: solid 1px #babdb6;
        }

        /* Chapter 2 */
        .data-item {
            border: solid 1px black;
            margin: 4px;
            padding: 4px;
            background-color: #eeeeec;
        }
    </style>
</div>


<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Creating the Private Scope</h2>

<script>
    // Barcode Chart
    // -------------

    // We use a closure to create a private scope for the charting
    // function.
    var barcodeChart1 = function() {

        // Definition of the chart variables.
        var width = 600,
            height = 30;

        // Charting function.
        function chart(selection) {
            selection.each(function(data) {
                // Bind the dataset to the svg selection.
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // Create the svg element on enter, and append a
                // background rectangle to it.
                svg.enter()
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('rect')
                        .attr('width', width)
                        .attr('height', height)
                        .attr('fill', 'white');
            });
        }

        return chart;
    };
</script>

<!-- Container div -->
<div class="chart-example" id="chart-01"></div>

<script>
    // The Dataset.
    var data = ['a', 'b', 'c'];

    // Invoke the Barcode function to get the charting function.
    var barcode01 = barcodeChart1();

    // Create the selection, bind the data and call the chart.
    d3.select('#chart-01').selectAll('div.data-item')
        .data(data)
        .enter()
        .append('div')
        .attr('class', 'data-item')
        .call(barcode01);
</script>


<h2 class="section-subtitle">Adding Accessor Methods</h2>


<script>
    var barcodeChart2 = function() {

        // Chart Variables.
        var width = 600,
            height = 30,
            margin = {top: 5, right: 5, bottom: 5, left: 5};

        function chart(selection) {
            selection.each(function(data) {

                // Bind the dataset to the svg selection.
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // Create the svg element on enter, and append a
                // background rectangle to it.
                svg.enter().append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('rect')
                        .attr('width', width)
                        .attr('height', height)
                        .attr('fill', 'white');
            });
        }

        // Accessor Methods

        // Width
        chart.width = function(value) {
            if (!arguments.length) { return width; }
            width = value;
            // Returns the chart to allow method chaining.
            return chart;
        };

        // Height
        chart.height = function(value) {
            if (!arguments.length) { return height; }
            height = value;
            // Returns the chart to allow method chaining.
            return chart;
        };

        // Margin
        chart.margin = function(value) {
            if (!arguments.length) { return margin; }
            margin = value;
            // Returns the chart to allow method chaining.
            return chart;
        };

        return chart;
    };
</script>

<div class="chart-example" id="chart-02"></div>

<script>
    // Configure the chart variables using the accessors methods.
    var barcode02 = barcodeChart2()
        .width(500)
        .height(30)
        .margin({top: 5, right: 5, bottom: 5, left: 5});

    // Create the selection, bind the data and call the chart.
    d3.select('#chart-02').selectAll('div.data-item')
        .data(data)
        .enter()
        .append('div')
        .attr('class', 'data-item')
        .call(barcode02);
</script>


<h2 class="section-subtitle">SVG Initialization</h2>


<script>
    var barcodeChart3 = function() {

        // Chart variables
        var width = 600,
            height = 30,
            margin = {top: 5, right: 5, bottom: 5, left: 5};

        function chart(selection) {
            selection.each(function(data) {
                // Bind the dataset to the svg selection.
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // Call the chart.svgInit method on enter.
                svg.enter()
                    .append('svg')
                    .call(svgInit);
            });
        }

        // Initialize the SVG Element
        function svgInit(svg) {
            // Set the SVG size
            svg
                .attr('width', width)
                .attr('height', height);

            // Create and translate the container group
            var g = svg.append('g')
                .attr('class', 'chart-content')
                .attr('transform', 'translate(' + [margin.top, margin.left] + ')');

            // Add a background rectangle
            g.append('rect')
                .attr('width', width - margin.left - margin.right)
                .attr('height', height - margin.top - margin.bottom)
                .attr('fill', 'white');
        };

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

        // Margin
        chart.margin = function(value) {
            if (!arguments.length) { return margin; }
            margin = value;
            return chart;
        };

        return chart;
    };
</script>

<div class="chart-example" id="chart-03"></div>

<script>
    // Invoke the Barcode function to get the charting function.
    var barcode03 = barcodeChart3();

    // Create the selection, bind the data and call the chart
    d3.select('#chart-03').selectAll('div.data-item')
        .data(data)
        .enter()
        .append('div')
        .attr('class', 'data-item')
        .call(barcode03);
</script>


<h2 class="section-subtitle">Adding the Bars</h2>


<script>
    var barcodeChart4 = function() {

        // Chart variables
        var width = 600,
            height = 30,
            margin = {top: 5, right: 5, bottom: 5, left: 5};

        function chart(selection) {
            selection.each(function(data) {

                // Bind the dataset to the svg selection.
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // SVG Initialization.
                svg.enter().append('svg').call(svgInit);

                // Compute the horizontal scale.
                var xScale = d3.time.scale()
                    .domain(d3.extent(data, function(d) { return d.date; }))
                    .range([0, width - margin.left - margin.right]);

                // Select the chart group
                var g = svg.select('g.chart-content');

                // Bind the data to the bars selection.
                var bars = g.selectAll('line')
                    .data(data, function(d) { return d.date; });

                // Append the bars on enter and set its attributes.
                bars.enter().append('line')
                    .attr('x1', function(d) { return xScale(d.date); })
                    .attr('x2', function(d) { return xScale(d.date); })
                    .attr('y1', 0)
                    .attr('y2', height - margin.top - margin.bottom)
                    .attr('stroke', '#000')
                    .attr('stroke-opacity', 0.5);
            });
        }

        // Initialize the SVG Element
        function svgInit(svg) {
            // Set the SVG size
            svg
                .attr('width', width)
                .attr('height', height);

            // Create and translate the container group
            var g = svg.append('g')
                .attr('class', 'chart-content')
                .attr('transform', 'translate(' + [margin.top, margin.left] + ')');

            // Add a background rectangle
            g.append('rect')
                .attr('width', width - margin.left - margin.right)
                .attr('height', height - margin.top - margin.bottom)
                .attr('fill', 'white');
        };

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

        // Margin
        chart.margin = function(value) {
            if (!arguments.length) { return margin; }
            margin = value;
            return chart;
        };

        return chart;
    };
</script>

<script>
    // Data Generation Functions
    // -------------------------

    // Compute a random interval using an Exponential Distribution of
    // parameter lambda = (1 / avgSeconds).
    function randomInterval(avgSeconds) {
        return Math.floor(-Math.log(Math.random()) * 1000 * avgSeconds);
    };

    // Create or extend an array of increasing dates by adding a random
    // time interval using an exponential distribution.
    function addData(data, numItems, avgSeconds) {
        // Compute the most recent time in the data array. If the array is
        // empty, uses the current time.
        var n = data.length,
            t = (n > 0) ? data[n - 1].date : new Date();

        // Append items with increasing times in the data array.
        for (var k = 0; k < numItems - 1; k += 1) {
            t = new Date(t.getTime() + randomInterval(avgSeconds));
            data.push({date: t});
        }

        return data;
    }
</script>

<div class="chart-example" id="chart-04"></div>

<script>
    //  Generate a random dataset with dates.
    var data = addData([], 150, 300);

    // Get the barcode chart
    var barcode04 = barcodeChart4();

    // Create the selection, bind the data and call the chart.
    d3.select('#chart-04').selectAll('div.data-item')
        .data([data])
        .enter()
        .append('div')
        .attr('class', 'data-item')
        .call(barcode04);
</script>


<h2 class="section-subtitle">Setting the Date Accessor</h2>


<script>
    var barcodeChart5 = function() {

        // Chart variables
        var width = 600,
            height = 30,
            margin = {top: 5, right: 5, bottom: 5, left: 5};

        var value = function(d) { return d.date; };

        function chart(selection) {
            selection.each(function(data) {

                // Bind the dataset to the svg selection.
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // SVG Initialization.
                svg.enter().append('svg').call(svgInit);

                // Compute the horizontal scale.
                var xScale = d3.time.scale()
                    .domain(d3.extent(data, value))
                    .range([0, width - margin.left - margin.right]);

                // Select the chart group.
                var g = svg.select('g.chart-content');

                // Bind the data to the bars selection.
                var bars = g.selectAll('line').data(data, value);

                // Create the bars on enter and set their attributes.
                bars.enter().append('line')
                    .attr('x1', function(d) { return xScale(value(d)); })
                    .attr('x2', function(d) { return xScale(value(d)); })
                    .attr('y1', 0)
                    .attr('y2', height - margin.top - margin.bottom)
                    .attr('stroke', '#000')
                    .attr('stroke-opacity', 0.5);
            });
        }

        // Initialize the SVG Element
        function svgInit(svg) {
            // Set the SVG size
            svg
                .attr('width', width)
                .attr('height', height);

            // Create and translate the container group
            var g = svg.append('g')
                .attr('class', 'chart-content')
                .attr('transform', 'translate(' + [margin.top, margin.left] + ')');

            // Add a background rectangle
            g.append('rect')
                .attr('width', width - margin.left - margin.right)
                .attr('height', height - margin.top - margin.bottom)
                .attr('fill', 'white');
        };

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

        // Margin
        chart.margin = function(value) {
            if (!arguments.length) { return margin; }
            margin = value;
            return chart;
        };

        // Date Accessor Method
        chart.value = function(accessorFunction) {
            if (!arguments.length) { return value; }
            value = accessorFunction;
            return chart;
        };

        return chart;
    };
</script>

<div class="chart-example" id="chart-05"></div>

<script>
    // Get the charting function and set the date accessor function.
    var barcode05 = barcodeChart5()
        .value(function(d) { return d.date; });

    // Create the selection, bind the data and call the chart.
    d3.select('#chart-05').selectAll('div.data-item')
        .data([data])
        .enter()
        .append('div')
        .attr('class', 'data-item')
        .call(barcode05);
</script>


<h2 class="section-subtitle">Fixing the Time Interval</h2>


<script>
    var barcodeChart6 = function() {

        // Chart variables
        var width = 600,
            height = 30,
            margin = {top: 5, right: 5, bottom: 5, left: 5};

        // Default Date Accessor.
        var value = function(d) { return d.date; };

        // Default time interval.
        var timeInterval = d3.time.day;

        function chart(selection) {
            selection.each(function(data) {

                // Bind the dataset to the svg selection.
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // SVG Initialization.
                svg.enter().append('svg').call(svgInit);

                // Compute the time interval extent.
                var lastDate = d3.max(data, value),
                    firstDate = timeInterval.offset(lastDate, -1);

                // Compute the horizontal scale.
                var xScale = d3.time.scale()
                    .domain([firstDate, lastDate])
                    .range([0, width - margin.left - margin.right]);

                // Select the chart group.
                var g = svg.select('g.chart-content');

                // Bind the data to the bars selection.
                var bars = g.selectAll('line').data(data, value);

                // Create the bars on enter and set their attributes.
                bars.enter().append('line')
                    .attr('x1', function(d) { return xScale(value(d)); })
                    .attr('x2', function(d) { return xScale(value(d)); })
                    .attr('y1', 0)
                    .attr('y2', height - margin.top - margin.bottom)
                    .attr('stroke', '#000')
                    .attr('stroke-opacity', 0.5);
            });
        }

        // Initialize the SVG Element
        function svgInit(svg) {
            // Set the SVG size
            svg
                .attr('width', width)
                .attr('height', height);

            // Create and translate the container group
            var g = svg.append('g')
                .attr('class', 'chart-content')
                .attr('transform', 'translate(' + [margin.top, margin.left] + ')');

            // Add a background rectangle
            g.append('rect')
                .attr('width', width - margin.left - margin.right)
                .attr('height', height - margin.top - margin.bottom)
                .attr('fill', 'white');
        };

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

        // Margin
        chart.margin = function(value) {
            if (!arguments.length) { return margin; }
            margin = value;
            return chart;
        };

        // Date Accessor
        chart.value = function(accessorFunction) {
            if (!arguments.length) { return value; }
            value = accessorFunction;
            return chart;
        };

        // Time Interval
        chart.timeInterval = function(value) {
            if (!arguments.length) { return timeInterval; }
            timeInterval = value;
            return chart;
        };

        return chart;
    };
</script>

<div class="chart-example" id="chart-06"></div>

<script>
    // Get the charting function and set the time interval.
    var barcode06 = barcodeChart6()
        .timeInterval(d3.time.day);

    // Create the selection, bind the data and call the chart.
    d3.select('#chart-06').selectAll('div.data-item')
        .data([data])
        .enter()
        .append('div')
        .attr('class', 'data-item')
        .call(barcode06);
</script>


<h2 class="section-subtitle">Updating the Chart</h2>


<script>
    var barcodeChart7 = function() {

        // Chart variables
        var width = 600,
            height = 30,
            margin = {top: 5, right: 5, bottom: 5, left: 5};

        // Default Date Accessor.
        var value = function(d) { return d.date; };

        // Default time interval.
        var timeInterval = d3.time.day;

        function chart(selection) {
            selection.each(function(data) {
                // Bind the dataset to the svg selection.
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // SVG Initialization.
                svg.enter().append('svg').call(svgInit);

                // Compute the time interval extent.
                var lastDate = d3.max(data, value),
                    firstDate = timeInterval.offset(lastDate, -1);

                // Compute the horizontal scale
                var xScale = d3.time.scale()
                    .domain([firstDate, lastDate])
                    .range([0, width - margin.left - margin.right]);

                // Select the chart group
                var g = svg.select('g.chart-content');

                // Bind the data
                var bars = g.selectAll('line')
                    .data(data, value);

                // Create the bars on enter
                bars.enter().append('line')
                    .attr('x1', function(d) { return xScale(value(d)); })
                    .attr('x2', function(d) { return xScale(value(d)); })
                    .attr('y1', 0)
                    .attr('y2', height - margin.top - margin.bottom)
                    .attr('stroke', '#000')
                    .attr('stroke-opacity', 0.5);

                // Update the position of the bars.
                bars.transition()
                    .duration(300)
                    .attr('x1', function(d) { return xScale(value(d)); })
                    .attr('x2', function(d) { return xScale(value(d)); });
            });
        }

        // Initialize the SVG Element
        function svgInit(svg) {
            // Set the SVG size
            svg
                .attr('width', width)
                .attr('height', height);

            // Create and translate the container group
            var g = svg.append('g')
                .attr('class', 'chart-content')
                .attr('transform', 'translate(' + [margin.top, margin.left] + ')');

            // Add a background rectangle
            g.append('rect')
                .attr('width', width - margin.left - margin.right)
                .attr('height', height - margin.top - margin.bottom)
                .attr('fill', 'white');
        };

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

        // Margin
        chart.margin = function(value) {
            if (!arguments.length) { return margin; }
            margin = value;
            return chart;
        };

        // Date Accessor
        chart.value = function(accessorFunction) {
            if (!arguments.length) { return value; }
            value = accessorFunction;
            return chart;
        };

        // Time Interval
        chart.timeInterval = function(value) {
            if (!arguments.length) { return timeInterval; }
            timeInterval = value;
            return chart;
        };

        return chart;
    };
</script>

<button id="btn-update-07" class="btn btn-default btn-sm">Add data</button>
<div class="chart-example" id="chart-07"></div>

<script>
    // Copy the data array and create an instance of the chart function.
    var data07 = addData([], 150, 3 * 60),
        barcode07 = barcodeChart7();

    // Create the selection, bind the data and call the chart.
    d3.select('#chart-07').selectAll('div.data-item')
        .data([data07])
        .enter()
        .append('div')
        .attr('class', 'data-item')
        .call(barcode07);

    // Add a callback to the button click event.
    d3.select('#btn-update-07')
        .on('click', function() {
            // Add more random data to the dataset.
            data07 = addData(data07, 30, 3 * 60);

            // Rebind the data-item selection with the updated dataset.
            d3.select('#chart-07').selectAll('div.data-item')
                .data([data07])
                .call(barcode07);
        });
</script>


<h2 class="section-subtitle">Fixing the Transition</h2>


<script>
    var barcodeChart8 = function() {

        // Chart variables
        var width = 600,
            height = 30,
            margin = {top: 5, right: 5, bottom: 5, left: 5};

        // Default Date Accessor.
        var value = function(d) { return d.date; };

        // Default time interval.
        var timeInterval = d3.time.day;

        function chart(selection) {
            selection.each(function(data) {

                // Bind the dataset to the svg selection.
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // SVG Initialization.
                svg.enter().append('svg').call(svgInit);

                // Select the chart group and the lines in that group
                var g = svg.select('g.chart-content'),
                    lines = g.selectAll('line');

                // Compute the most recent date from the dataset
                var lastDate = d3.max(data, value);

                // Replace the lastDate with the most recent date of the
                // dataset before the update, if the selection is not empty.
                lastDate = lines.empty() ? lastDate : d3.max(lines.data(), value);

                // Compute the date of the lastDate minus the time interval.
                var firstDate = timeInterval.offset(lastDate, -1);

                // Compute the horizontal scale with the previous dataset values.
                var xScale = d3.time.scale()
                    .domain([firstDate, lastDate])
                    .range([0, width - margin.left - margin.right]);

                // Bind the updated data to the bars.
                var bars = g.selectAll('line').data(data, value);

                // Create the bars on enter and set their position.
                bars.enter().append('line')
                    .attr('x1', function(d) { return xScale(value(d)); })
                    .attr('x2', function(d) { return xScale(value(d)); })
                    .attr('y1', 0)
                    .attr('y2', height - margin.top - margin.bottom)
                    .attr('stroke', '#000')
                    .attr('stroke-opacity', 0.5);

                // Update the scale with the new dataset.
                lastDate = d3.max(data, value);
                firstDate = timeInterval.offset(lastDate, -1);
                xScale.domain([firstDate, lastDate]);

                // Update the position of the bars, with the updated scale.
                bars.transition()
                    .duration(300)
                    .attr('x1', function(d) { return xScale(value(d)); })
                    .attr('x2', function(d) { return xScale(value(d)); });
            });
        }

        // Initialize the SVG Element
        function svgInit(svg) {
            // Set the SVG size
            svg
                .attr('width', width)
                .attr('height', height);

            // Create and translate the container group
            var g = svg.append('g')
                .attr('class', 'chart-content')
                .attr('transform', 'translate(' + [margin.top, margin.left] + ')');

            // Add a background rectangle
            g.append('rect')
                .attr('width', width - margin.left - margin.right)
                .attr('height', height - margin.top - margin.bottom)
                .attr('fill', 'white');
        };

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

        // Margin
        chart.margin = function(value) {
            if (!arguments.length) { return margin; }
            margin = value;
            return chart;
        };

        // Date Accessor
        chart.value = function(accessorFunction) {
            if (!arguments.length) { return value; }
            value = accessorFunction;
            return chart;
        };

        // Time Interval
        chart.timeInterval = function(value) {
            if (!arguments.length) { return timeInterval; }
            timeInterval = value;
            return chart;
        };

        return chart;
    };
</script>

<button id="btn-update-08"  class="btn btn-default btn-sm">Add data</button>
<div class="chart-example" id="chart-08"></div>

<script>
    // Create a random data array and  an instance of the chart function.
    var data08 = addData([], 150, 3 * 60),
        barcode08 = barcodeChart8();

    // Create the selection, bind the data and call the chart.
    d3.select('#chart-08').selectAll('div.data-item')
        .data([data08])
        .enter()
        .append('div')
        .attr('class', 'data-item')
        .call(barcode08);

    // Add a callback to the button click event.
    d3.select('#btn-update-08')
        .on('click', function() {
            // Add more random data to the dataset.
            data08 = addData(data08, 30, 2 * 60);

            // Rebind the data-item selection with the updated dataset.
            d3.select('#chart-08').selectAll('div.data-item')
                .data([data08])
                .call(barcode08);
        });

</script>


<h2 class="section-subtitle">Removing the Bars</h2>

<script>
    var barcodeChart9 = function() {

        // Chart Variables.
        var width = 600,
            height = 30,
            margin = {top: 5, right: 5, bottom: 5, left: 5};

        // Default Date Accessor.
        var value = function(d) { return d.date; };

        // Default time interval.
        var timeInterval = d3.time.day;

        function chart(selection) {
            selection.each(function(data) {

                // Bind the dataset to the svg selection.
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // SVG Initialization.
                svg.enter().append('svg').call(chart.svgInit);

                // Select the chart group and the lines in that group
                var g = svg.select('g.chart-content'),
                    lines = g.selectAll('line');

                // Compute the most recent date from the dataset
                var lastDate = d3.max(data, value);

                // Replace the lastDate with the most recent date of the
                // dataset before the update, if the selection is not empty.
                lastDate = lines.empty() ? lastDate : d3.max(lines.data(), value);

                // Compute the date of the lastDate minus the time interval.
                var firstDate = timeInterval.offset(lastDate, -1);

                // Compute the horizontal scale with the previous dataset values.
                var xScale = d3.time.scale()
                    .domain([firstDate, lastDate])
                    .range([0, width - margin.left - margin.right]);

                // Bind the updated data to the bars.
                var bars = g.selectAll('line').data(data, value);

                // Create the bars on enter and set their position.
                bars.enter().append('line')
                    .attr('x1', function(d) { return xScale(value(d)); })
                    .attr('x2', function(d) { return xScale(value(d)); })
                    .attr('y1', 0)
                    .attr('y2', height - margin.top - margin.bottom)
                    .attr('stroke', '#000')
                    .attr('stroke-opacity', 0.5);

                // Update the scale with the new dataset
                lastDate = d3.max(data, value);
                firstDate = timeInterval.offset(lastDate, -1);
                xScale.domain([firstDate, lastDate]);

                // Update the position of the bars, with the updated scale.
                bars.transition()
                    .duration(300)
                    .attr('x1', function(d) { return xScale(value(d)); })
                    .attr('x2', function(d) { return xScale(value(d)); });

                // Remove the bars that don't have corresponding data items.
                bars.exit().transition()
                    .duration(300)
                    .attr('stroke-opacity', 0)
                    .remove();
            });
        }

        // Initialize the SVG Element
        chart.svgInit = function(svg) {
            // Set the SVG size
            svg
                .attr('width', width)
                .attr('height', height);

            // Create and translate the container group
            var g = svg.append('g')
                .attr('class', 'chart-content')
                .attr('transform', 'translate(' + [margin.top, margin.left] + ')');

            // Add a background rectangle
            g.append('rect')
                .attr('width', width - margin.left - margin.right)
                .attr('height', height - margin.top - margin.bottom)
                .attr('fill', 'white');
        };

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

        // Margin
        chart.margin = function(value) {
            if (!arguments.length) { return margin; }
            margin = value;
            return chart;
        };

        // Date Accessor
        chart.value = function(accessorFunction) {
            if (!arguments.length) { return value; }
            value = accessorFunction;
            return chart;
        };

        // Time Interval
        chart.timeInterval = function(value) {
            if (!arguments.length) { return timeInterval; }
            timeInterval = value;
            return chart;
        };

        return chart;
    };
</script>

<button id="btn-update-09" class="btn btn-default btn-sm">Add data</button>
<button id="btn-remove-09" class="btn btn-default btn-sm">Remove data</button>
<div class="chart-example" id="chart-09"></div>

<script>
    // Create a random data array and  an instance of the chart function.
    var data09 = addData([], 150, 3 * 60),
        barcode09 = barcodeChart9();

    // Create the selection, bind the data and call the chart.
    d3.select('#chart-09').selectAll('div.data-item')
        .data([data09])
        .enter()
        .append('div')
        .attr('class', 'data-item')
        .call(barcode09);

    // Create the callback for the add data button.
    d3.select('#btn-update-09')
        .on('click', function() {
            // Adds 30 data items to the array.
            data09 = addData(data09, 30, 3 * 60);

            // Rebinds the updated dataset.
            d3.select('#chart-09').selectAll('div.data-item')
                .data([data09])
                .call(barcode09);
        });

    // Binds a callback to the remove button
    d3.select('#btn-remove-09')
        .on('click', function() {
            // Remove 10 items, if there are more than ten in the array.
            if (data09.length > 10) {
                data09 = data09.slice(10, data09.length);
            }

            // Rebinds the updated dataset.
            d3.select('#chart-09').selectAll('div.data-item')
                .data([data09])
                .call(barcode09);
        });
</script>