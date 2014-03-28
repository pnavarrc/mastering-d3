---
layout: default
title: 9.1 Visual Examples
---

<script src="{{ site.baseurl }}/assets/js/lib/moment.js"></script>
<link rel="stylesheet" href="{{ site.baseurl }}/chapter09/css/sales.css">

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Comparing a Table with a Chart</h2>

<p class="lead">The table provides more precision, but the chart allows to spot patterns and changes in time.</p>

<div class="row">
    <div class="col-md-10">
        <div id="table-example">
            <table class="table table-condensed table-striped table-fluid" id='table-sales'>
                <thead></thead>
                <tbody></tbody>
            </table>
        </div>
        <div id="chart-example"></div>
    </div>
</div>

<script>
    // Create some sample data
    var data = {
        name: 'John Doe',
        sales: [
            {date: '2013-01-01', value: 123, units: 244},
            {date: '2013-02-01', value: 112, units: 214},
            {date: '2013-03-01', value:  98, units: 193},
            {date: '2013-04-01', value:  82, units: 174},
            {date: '2013-05-01', value:  93, units: 155},
            {date: '2013-06-01', value:  87, units: 144},
            {date: '2013-07-01', value: 103, units: 127},
            {date: '2013-08-01', value: 125, units: 138},
            {date: '2013-09-01', value: 129, units: 139},
            {date: '2013-10-01', value: 143, units: 152},
            {date: '2013-11-01', value: 163, units: 171},
            {date: '2013-12-01', value: 153, units: 155}
        ]
    };

    // Define formats for the units, value and time
    var monthFormat = d3.time.format('%b'),
        valueFormat = d3.format('$,.0'),
        unitsFormat = d3.format(',.0');

    // Compute the date for each element, without time zone
    data.sales.forEach(function(d) { d.date = moment(d.date).toDate(); })
</script>

<script>
    // Fill the table contents
    // -----
    var months = data.sales.map(function(d) { return monthFormat(d.date); }),
        columnNames = ['Name', ''].concat(months);

    // Create the Table
    var table = d3.select('table#table-sales'),
        thead = table.select('thead'),
        tbody = table.select('tbody');

    // Table Header
    var th = thead.append('tr').selectAll('th')
            .data(columnNames)
            .enter()
            .append('th')
            .html(function(d) { return d; });

    // Table Body

    // Values
    var trValues = tbody.append('tr');

    trValues.append('td').html(data.name);
    trValues.append('td').html('Value');

    var tdValues = tbody.select('tr').selectAll('td.sales-value')
        .data(data.sales)
        .enter()
        .append('td')
        .attr('class', 'sales-value text-right')
        .html(function(d) { return valueFormat(d.value); });

    // Units
    var trUnits = tbody.append('tr');

    trUnits.append('td').html('');
    trUnits.append('td').html('Units');

    var tdUnits = trUnits.selectAll('td.salues-units')
        .data(data.sales)
        .enter()
        .append('td')
        .attr('class', 'sales-units text-right')
        .html(function(d) { return unitsFormat(d.units); });
</script>

<script>

    // Sales Chart
    var salesChart = function() {
        'use strict';

        // Component Attributes
        var me = {
            width: 600,
            height: 200,
            margin: {top: 30, right: 60, bottom: 30, left: 60}
        };

        function chart(selection) {
            selection.each(function(data) {

                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]),
                    width = me.width - me.margin.left - me.margin.right,
                    height = me.height - me.margin.top - me.margin.bottom;

                svg.enter().append('svg').call(chart.init);

                var gchart = svg.select('g.chart');

                // Scales
                var xScale = d3.time.scale()
                    .domain(d3.extent(data, function(d) { return d.date; }))
                    .range([0, width])
                    .nice();

                var valueScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) { return d.value; })])
                    .rangeRound([height, 0])
                    .nice();

                var unitsScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) { return d.units; })])
                    .rangeRound([height, 0])
                    .clamp(true)
                    .nice();

                // Line Generators
                var valueLine = d3.svg.line()
                    .x(function(d) { return xScale(d.date); })
                    .y(function(d) { return valueScale(d.value); });

                var unitsLine = d3.svg.line()
                    .x(function(d) { return xScale(d.date); })
                    .y(function(d) { return unitsScale(d.units); });


                // Create the path elements
                gchart.append('path')
                    .attr('d', valueLine)
                    .attr('class', 'sales-value')
                    .attr('fill', 'none')
                    .attr('stroke', 'black');

                gchart.append('path')
                    .attr('d', unitsLine)
                    .attr('class', 'sales-units')
                    .attr('fill', 'none')
                    .attr('stroke', 'red');

                // Axes

                // Time Axis
                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('bottom')
                    .tickFormat(monthFormat);

                svg.select('g.xaxis').call(xAxis);

                // Values Axis
                var valueAxis = d3.svg.axis()
                    .scale(valueScale)
                    .orient('left')
                    .tickFormat(valueFormat)
                    .ticks(5)
                    .outerTickSize(0);

                svg.select('g.yaxis-value').call(valueAxis);
                svg.select('g.yaxis-value').append('text')
                    .attr('text-anchor', 'end')
                    .attr('dy', '-5')
                    .text('Value');

                // Units Axis
                var unitsAxis = d3.svg.axis()
                    .scale(unitsScale)
                    .tickFormat(unitsFormat)
                    .orient('right')
                    .ticks(5)
                    .outerTickSize(0);

                svg.select('g.yaxis-units').call(unitsAxis);
                svg.select('g.yaxis-units').append('text')
                    .attr('dy', '-5')
                    .text('Units');
            });
        }

        // Component Initialization
        chart.init = function(selection) {
            selection.each(function(data) {

                var svg = d3.select(this),
                    margin = me.margin,
                    height = me.height - margin.top - margin.bottom,
                    width = me.width - margin.left - margin.right;

                // Set the width and height of the SVG element
                svg.attr('width', me.width).attr('height', me.height);

                // Create container groups for the axes
                svg.append('g')
                    .attr('class', 'chart')
                    .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

                svg.append('g')
                    .attr('class', 'axis xaxis')
                    .attr('transform', 'translate(' + [margin.left, margin.top + height] + ')');

                svg.append('g')
                    .attr('class', 'axis yaxis-value')
                    .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

                svg.append('g')
                    .attr('class', 'axis yaxis-units')
                    .attr('transform', 'translate(' + [margin.left + width, margin.top] + ')');

            });
        };

        // Generate Accessor Methods
        function createAccessor(attr) {
            return function(value) {
                if (!arguments.length) { return me[attr]; }
                me[attr] = value;
                return chart;
            };
        }

        for (var attr in me) {
            if ((!chart[attr]) && (me.hasOwnProperty(attr))) {
                chart[attr] = createAccessor(attr);
            }
        }

        return chart;
    };
</script>


<script>
    var div = d3.select('#chart-example'),
        width = parseInt(d3.select('#chart-example').style('width'), 10),
        chart = salesChart()
        .width(width)
        .height(160);

    div.data([data.sales]).call(chart);
</script>

