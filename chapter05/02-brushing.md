---
layout: default
title: 1D Brushing
---

<div>
    <style>
        .axis path, line{
            fill: none;
            stroke: #222;
            shape-rendering: crispEdges;
        }

        .axis text {
            font-size: 11px;
        }

        .area {
            fill: #ddd;
            stroke: #aaa;
            stroke-width: 1;
        }

    </style>
</div>

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Creating the Chart</h2>

<!-- Chart Container -->
<div id="chart01" class="chart-example"></div>

<script>
    function areaChart1() {

        // Chart Attributes
        var width = 700,
            height = 300,
            margin = {top: 20, right: 20, bottom: 20, left: 50};

        // Time format
        var timeFormat = '%d-%b-%y';

        // Chart Creation
        function chart(selection) {
            selection.each(function(data) {

                // Select the container element and create the svg selection
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // Initialize the svg element
                svg.enter().append('svg')
                    .call(svgInit);

                // Initialize the svg element
                svg
                    .attr('width', width)
                    .attr('height', height);

                // Configure the time parser
                var parseDate = d3.time.format(timeFormat).parse;

                // Parse the data
                data.forEach(function(d) {
                    d.date = parseDate(d.date);
                    d.close = +d.close;
                });

                // Create the scales and axis
                var xScale = d3.time.scale()
                    .domain(d3.extent(data, function(d) { return d.date; }))
                    .range([0, width - margin.left - margin.right]);

                // Create the x axis
                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('bottom');

                // Invoke the xAxis function on the corresponding group
                svg.select('g.xaxis').call(xAxis);

                // Y Axis and Scale
                var yScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) { return d.close; })])
                    .range([height - margin.top - margin.bottom, 0]);

                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient('left');

                // Invoke the yAxis function of the y axis
                svg.select('g.yaxis').call(yAxis);

                // Chart Content

                // Create and configure the area generator
                var area = d3.svg.area()
                    .x(function(d) { return xScale(d.date); })
                    .y0(height - margin.top - margin.bottom)
                    .y1(function(d) { return yScale(d.close); });

                // Create the area path
                svg.select('g.chart').append("path")
                    .datum(data)
                    .attr("class", "area")
                    .attr("d", area);
            });
        }

        // Chart Initialization
        var svgInit = function(selection) {
            selection.each(function(data) {

                // Select the svg element
                var svg = d3.select(this);

                svg.append('g')
                    .attr('class', 'chart')
                    .attr('transform', function() {
                        var dx = margin.left,
                            dy = margin.top;
                        return 'translate(' + [dx, dy] + ')';
                    });

                // Create and transform the x axis group
                svg.append('g')
                    .attr('class', 'xaxis axis')
                    .attr('transform', function() {
                        var dx = margin.left,
                            dy = height - margin.top;
                        return 'translate(' + [dx, dy] + ')';
                    });

                // Create and transform the y axis group
                svg.append('g')
                    .attr('class', 'yaxis axis')
                    .attr('transform', function() {
                        var dx = margin.left,
                            dy = margin.top;

                        return 'translate(' + [dx, dy] + ')';
                    });
            });
        };

        // Accessors Methods

        // Width Accessor
        chart.width = function(w) {
            if (!arguments.length) { return width; }
            width = w;
            return chart;
        };

        // Height Accessor
        chart.height = function(h) {
            if (!arguments.length) { return height; }
            height = h;
            return chart;
        };

        // Margin Accessor
        chart.margin = function(m) {
            if (!arguments.length) { return margin; }
            margin = m;
            return chart;
        };

        // Time Format Accessor
        chart.timeFormat = function(fmt) {
            if (!arguments.length) { return timeFormat; }
            timeFormat = fmt;
            return chart;
        };

        return chart;
    }
</script>

<script>
    // Load the TSV Stock Data
    d3.tsv('/chapter05/aapl.tsv', function(error, data) {

        // Handle errors getting or parsing the data
        if (error) {
            console.error(error);
            throw error;
        }

        // Create and configure the area chart
        var chart = areaChart1();

        // Bind the chart to the container div
        d3.select('div#chart01')
            .datum(data)
            .call(chart);
    });
</script>


<h2 class="section-subtitle">Brushing</h2>

<div>
    <style>
        .brush rect {
            fill: #bbb;
            stroke: #bbb;
            stroke-width: 0.5;
            stroke-opacity: 0.4;
            fill-opacity: 0.05;
        }
    </style>
</div>


<div id="chart02" class="chart-example"></div>

<script>
    function areaChart2() {

        // Chart Attributes
        var width = 700,
            height = 300,
            margin = {top: 20, right: 20, bottom: 20, left: 50};

        // Time format
        var timeFormat = '%d-%b-%y';

        // Chart Creation
        function chart(selection) {
            selection.each(function(data) {

                // Select the container element and create the svg selection
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // Initialize the svg element
                svg.enter().append('svg')
                    .call(svgInit);

                // Initialize the svg element
                svg
                    .attr('width', width)
                    .attr('height', height);

                // Configure the time parser
                var parseDate = d3.time.format(timeFormat).parse;

                // Parse the data
                data.forEach(function(d) {
                    d.date = parseDate(d.date);
                    d.close = +d.close;
                });

                // Create the scales and axis
                var xScale = d3.time.scale()
                    .domain(d3.extent(data, function(d) { return d.date; }))
                    .range([0, width - margin.left - margin.right]);

                // Create the x axis
                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('bottom');

                // Invoke the xAxis function on the corresponding group
                svg.select('g.xaxis').call(xAxis);

                // Y Axis and Scale
                var yScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) { return d.close; })])
                    .range([height - margin.top - margin.bottom, 0]);

                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient('left');

                // Invoke the yAxis function of the y axis
                svg.select('g.yaxis').call(yAxis);

                // Chart Content

                // Create and configure the area generator
                var area = d3.svg.area()
                    .x(function(d) { return xScale(d.date); })
                    .y0(height - margin.top - margin.bottom)
                    .y1(function(d) { return yScale(d.close); });

                // Create the area path
                svg.select('g.chart').append("path")
                    .datum(data)
                    .attr("class", "area")
                    .attr("d", area);

                // Brushing
                // --------

                function brushListener() {
                    var brushExtent = d3.event.target.extent();
                    console.log(brushExtent);
                }

                var brush = d3.svg.brush()
                    .x(xScale)
                    .on('brush', brushListener);

                var gBrush = svg.select('g.brush')
                    .call(brush);

                // Change the height of the brushing rectangle
                gBrush.selectAll('rect')
                    .attr('height', height - margin.top - margin.bottom);


            });
        }

        // Chart Initialization
        var svgInit = function(selection) {
            selection.each(function(data) {

                // Select the svg element
                var svg = d3.select(this);

                svg.append('g')
                    .attr('class', 'chart')
                    .attr('transform', function() {
                        var dx = margin.left,
                            dy = margin.top;
                        return 'translate(' + [dx, dy] + ')';
                    });

                // Create and transform the x axis group
                svg.append('g')
                    .attr('class', 'xaxis axis')
                    .attr('transform', function() {
                        var dx = margin.left,
                            dy = height - margin.top;
                        return 'translate(' + [dx, dy] + ')';
                    });

                // Create and transform the y axis group
                svg.append('g')
                    .attr('class', 'yaxis axis')
                    .attr('transform', function() {
                        var dx = margin.left,
                            dy = margin.top;
                        return 'translate(' + [dx, dy] + ')';
                    });

                // Create and translate the brush container group
                var gBrush = svg.append('g')
                    .attr('class', 'brush')
                    .attr('transform', function() {
                        var dx = margin.left,
                            dy = margin.top;
                        return 'translate(' + [dx, dy] + ')';
                    });
            });
        };

        // Accessors Methods

        // Width Accessor
        chart.width = function(w) {
            if (!arguments.length) { return width; }
            width = w;
            return chart;
        };

        // Height Accessor
        chart.height = function(h) {
            if (!arguments.length) { return height; }
            height = h;
            return chart;
        };

        // Margin Accessor
        chart.margin = function(m) {
            if (!arguments.length) { return margin; }
            margin = m;
            return chart;
        };

        // Time Format Accessor
        chart.timeFormat = function(fmt) {
            if (!arguments.length) { return timeFormat; }
            timeFormat = fmt;
            return chart;
        };

        return chart;
    }
</script>

<script>
    // Load the TSV Stock Data
    d3.tsv('/chapter05/aapl.tsv', function(error, data) {

        // Handle errors getting or parsing the data
        if (error) {
            console.error(error);
            throw error;
        }

        // Create and configure the area chart
        var chart = areaChart2();

        // Bind the chart to the container div
        d3.select('div#chart02')
            .datum(data)
            .call(chart);
    });
</script>


<h2 class="section-subtitle">Brushing Annotations</h2>

<div id="chart04" class="chart-example"></div>

<script>
    function areaChart() {

        // Chart Attributes
        var width = 700,
            height = 300,
            margin = {top: 20, right: 20, bottom: 20, left: 50};

        // Time format
        var timeFormat = '%d-%b-%y';

        // Chart Creation
        function chart(selection) {
            selection.each(function(data) {

                // Select the container element and create the svg selection
                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                // Initialize the svg element
                svg.enter().append('svg')
                    .call(svgInit);

                // Initialize the svg element
                svg
                    .attr('width', width)
                    .attr('height', height);

                // Configure the time parser
                var parseDate = d3.time.format(timeFormat).parse;

                // Parse the data
                data.forEach(function(d) {
                    d.date = parseDate(d.date);
                    d.close = +d.close;
                });

                // Create the scales and axis
                var xScale = d3.time.scale()
                    .domain(d3.extent(data, function(d) { return d.date; }))
                    .range([0, width - margin.left - margin.right]);

                // Create the x axis
                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('bottom');

                // Invoke the xAxis function on the corresponding group
                svg.select('g.xaxis').call(xAxis);

                // Y Axis and Scale
                var yScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) { return d.close; })])
                    .range([height - margin.top - margin.bottom, 0]);

                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient('left');

                // Invoke the yAxis function of the y axis
                svg.select('g.yaxis').call(yAxis);

                // Chart Content

                // Create and configure the area generator
                var area = d3.svg.area()
                    .x(function(d) { return xScale(d.date); })
                    .y0(height - margin.top - margin.bottom)
                    .y1(function(d) { return yScale(d.close); });

                // Create the area path
                svg.select('g.chart').append("path")
                    .datum(data)
                    .attr("class", "area")
                    .attr("d", area);

                // Brush Listener function
                function brushListener() {
                    var s = d3.event.target.extent();

                    // Filter the items within the brush extent
                    var items = data.filter(function(d) {
                            return (s[0] <= d.date) && (d.date <= s[1]);
                        });

                    var dateA = s[0],
                        dateB = s[1],
                        priceA = 0,
                        priceB = 0,
                        dPrice = 0,
                        priceData = [];

                    // Compute the percentual variation of the period
                    if (items.length > 2) {

                        // Get the prices at the beginning and end of the period
                        priceB = items[0].close;
                        priceA = Math.max(items[items.length - 1].close, 1e-8);

                        // Price data
                        priceData = [
                            {date: dateA, price: priceA},
                            {date: dateB, price: priceB}
                        ];

                        // Compute the relative price variation
                        dPrice = 100 * (priceB - priceA) / priceA;

                        // Translate the price marker groups
                        var marker = gBrush.selectAll('g.price-marker')
                            .data(priceData)
                                .attr('transform', function(d) {
                                    var dx = xScale(dateA),
                                        dy = yScale(d.price);
                                    return 'translate(' + [dx, dy] + ')';
                                });

                        // Update the price labels
                        marker.select('text').text(function(d) {
                            return d.date.toLocaleDateString() + ' $' + d.price;
                        });

                        // Update the price line length
                        marker.select('line')
                            .attr('x2', function(d, i) {
                                return (xScale(dateB) - xScale(dateA));
                            });

                        // Update the variation label position and content
                        gBrush.select('text.variation')
                            .attr('x', xScale(dateB) + 4)
                            .attr('y', yScale((priceA + priceB) / 2))
                            .text(dPrice.toFixed(2) + ' %')
                            .attr('stroke', function() {
                                return dPrice > 0 ? '#204a87' : '#a40000';
                            });
                    }
                }


                // Configure the brush control
                var brush = d3.svg.brush()
                    .x(xScale)
                    .on('brush', brushListener);

                var gBrush = svg.select('g.brush').call(brush);

                // Change the height of the brushing rectangle
                gBrush.selectAll('rect')
                    .attr('height', height - margin.top - margin.bottom);


            });
        }

        // Chart Initialization
        var svgInit = function(selection) {
            selection.each(function(data) {

                // Select the svg element
                var svg = d3.select(this);

                svg.append('g')
                    .attr('class', 'chart')
                    .attr('transform', function() {
                        var dx = margin.left,
                            dy = margin.top;
                        return 'translate(' + [dx, dy] + ')';
                    });

                // Create and transform the x axis group
                svg.append('g')
                    .attr('class', 'xaxis axis')
                    .attr('transform', function() {
                        var dx = margin.left,
                            dy = height - margin.top;
                        return 'translate(' + [dx, dy] + ')';
                    });

                // Create and transform the y axis group
                svg.append('g')
                    .attr('class', 'yaxis axis')
                    .attr('transform', function() {
                        var dx = margin.left,
                            dy = margin.top;
                        return 'translate(' + [dx, dy] + ')';
                    });

                // Create and translate the brush container group
                var gBrush = svg.append('g')
                    .attr('class', 'brush')
                    .attr('transform', function() {
                        var dx = margin.left,
                            dy = margin.top;
                        return 'translate(' + [dx, dy] + ')';
                    });

                var gMarker = gBrush.selectAll('g.price-marker')
                    .data([0, 0])
                    .enter()
                    .append('g')
                    .attr('class', 'price-marker');

                gMarker.append('text')
                    .attr('x', -2)
                    .attr('text-anchor', 'end')
                    .attr('font-size', 11);

                gMarker.append('line')
                    .attr('stroke-dasharray', '5,5');

                gBrush.append('text')
                    .attr('class', 'variation')
                    .attr('font-size', 11);
            });
        };

        // Accessors Methods

        // Width Accessor
        chart.width = function(w) {
            if (!arguments.length) { return width; }
            width = w;
            return chart;
        };

        // Height Accessor
        chart.height = function(h) {
            if (!arguments.length) { return height; }
            height = h;
            return chart;
        };

        // Margin Accessor
        chart.margin = function(m) {
            if (!arguments.length) { return margin; }
            margin = m;
            return chart;
        };

        // Time Format Accessor
        chart.timeFormat = function(fmt) {
            if (!arguments.length) { return timeFormat; }
            timeFormat = fmt;
            return chart;
        };

        return chart;
    }
</script>

<script>
    // Load the TSV Stock Data
    d3.tsv('/chapter05/aapl.tsv', function(error, data) {

        // Handle errors getting or parsing the data
        if (error) { console.error(error); }

        // Create and configure the area chart
        var chart = areaChart();

        // Bind the chart to the container div
        d3.select('div#chart04')
            .datum(data)
            .call(chart);
    });
</script>

