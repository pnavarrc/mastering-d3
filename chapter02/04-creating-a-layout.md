---
layout: base
title: "2.4 Creating a Layout Algorithm"
---

## {{ page.title }}


### Contents

- [Creating the Layout Structure](#structure)
- [Counting the Data Items](#counting-items)
- [Adding the Start and End Angles](#adding-angles)
- [Configuring the Angle Extent](#angle-extent)
- [Using the Layout: Radial Chart](#h3-radial-chart)
- [Using the Layout: Bar Chart (Bonus)](#h3-bar-chart)


<!-- Data Generation Functions -->
<script>
        // Data Generation Functions
        // -------------------------

        // Compute a random interval using an Exponential Distribution
        function randomInterval(avgSeconds) {
            return Math.floor(-Math.log(Math.random()) * 1000 * avgSeconds);
        };

        // Create or extend an array of increasing dates.
        function addData(data, numItems, avgSeconds) {
            // Compute the most recent time in the data array, or create one.
            var n = data.length,
                t = (n > 0) ? data[n - 1].date : new Date();

            // Append items with increasing times in the data array.
            for (var k = 0; k < numItems; k += 1) {
                t = new Date(t.getTime() + randomInterval(avgSeconds));
                data.push({date: t});
            }

            return data;
        }
</script>


### <a href="#structure" name="structure">#</a> Creating the Layout Structure

<!-- Sample Output -->
    [
        {hour:  0, startAngle: 0, endAngle: 0, count: 0},
        {hour:  1, startAngle: 0, endAngle: 0, count: 0},
        ...
        {hour: 23, startAngle: 0, endAngle: 0, count: 0}
    ]


<script>
    var RadialLayout = function() {

        // Layout function.
        function layout(data) {
            // Create a map to store the data for each hour.
            var hours = d3.range(0, 24),
                gmap = d3.map(),
                groups = [];

            // Append a data item for each hour, with all the fields set to zero.
            hours.forEach(function(h) {
                gmap.set(h, {hour: h, startAngle: 0, endAngle: 0, count: 0});
            });

            // Copy the values of the map and sort the output data array.
            groups = gmap.values();
            groups.sort(function(a, b) { return a.hour > b.hour ? 1 : -1; });
            return groups;
        }

        // Returns the layout function.
        return layout;
    };
</script>

<script>
    // Create a sample dataset.
    var data = addData([], 300, 20 * 60);

    // Create an instance of the layout function.
    var radialLayout = RadialLayout();

    // Compute the ouput data.
    var output01 = radialLayout(data);
</script>


<!-- Section: Counting the Items -->
### <a href="#counting-items" name="counting-items">#</a> Counting the Data Items

    [
        {hour:  0, startAngle: 0, endAngle: 0, count: 10},
        {hour:  1, startAngle: 0, endAngle: 0, count: 11},
        ...
        {hour: 23, startAngle: 0, endAngle: 0, count: 13}
    ]


<script>
    var RadialLayout = function() {

        // Layout function.
        function layout(data) {
            // Create a map to store the data for each hour.
            var hours = d3.range(0, 24),
                gmap = d3.map(),
                groups = [];

            // Append a data item for each hour, with all the fields set to zero.
            hours.forEach(function(h) {
                gmap.set(h, {hour: h, startAngle: 0, endAngle: 0, count: 0});
            });

            // Count the items belonging to each hour
            data.forEach(function(d) {
                // Get the hour from the date attribute of each data item.
                var _hour = d.date.getHours();

                // Get the output data item corresponding to the item hour.
                var _value = gmap.get(_hour);

                // We increment the count attribute and set the value in the map.
                _value.count += 1;
                gmap.set(_hour, _value);
            });

            // Computation of the output data ...

            // Copy the values of the map and sort the output data array.
            groups = gmap.values();
            groups.sort(function(a, b) { return a.hour > b.hour ? 1 : -1; });
            return groups;
        }

        // Returns the layout function.
        return layout;
    };
</script>

<script>
    // Create an instance of the layout function.
    var radialLayout = RadialLayout();

    // Compute the ouput data.
    var output02 = radialLayout(data);
</script>


### <a href="#adding-angles" name="adding-angles">#</a> Adding the Start and End Angles

    [
        {hour:  0, startAngle: 0,      endAngle: 0.2618, count:  7},
        {hour:  1, startAngle: 0.2618, endAngle: 0.5236, count: 14},
        ...
        {hour: 23, startAngle: 6.0214, endAngle: 6.2832, count: 17}
    ]

<script>
    var RadialLayout = function() {

        // Default Date Accessor
        var value = function(d) { return d.date; }

        // Layout function.
        function layout(data) {
            // Create a map to store the data for each hour.
            var hours = d3.range(0, 24),
                gmap = d3.map(),
                groups = [];

            var itemAngle = 2 * Math.PI / 24;

            // Append a data item for each hour, with all the fields set to zero.
            hours.forEach(function(h) {
                gmap.set(h, {
                    hour: h,
                    startAngle: h * itemAngle,
                    endAngle: (h + 1) * itemAngle,
                    count: 0
                });
            });

            // Count the data items belonging to each hour.
            data.forEach(function(d) {
                // Get the hour of the data item and the corresponding data item.
                var _hour = value(d).getHours(),
                    _value = gmap.get(_hour);

                // Increment the count and set the value in the map.
                _value.count += 1;
                gmap.set(_hour, _value);
            });


            // Copy the values of the map and sort the output data array.
            groups = gmap.values();
            groups.sort(function(a, b) { return a.hour > b.hour ? 1 : -1; });
            return groups;
        }

        // Accessor Methods

        // Date Accessor Function
        layout.value = function(accessorFunction) {
            if (!arguments.length) { return value; }
            value = accessorFunction;
            return layout;
        };

        // Returns the layout function.
        return layout;
    };
</script>

<script>
    // Create and configure an instance of the layout function.
    var radialLayout = RadialLayout()
        .value(function(d) { return d.date; });

    // Compute the ouput data.
    var output03 = radialLayout(data);
</script>


### <a href="#angle-extent" name="angle-extent">#</a> Configuring the Angle Extent

<!-- Sample Output -->
    [
        {hour:  0, startAngle: 0.5236, endAngle: 0.6109, count: 14},
        {hour:  1, startAngle: 0.6109, endAngle: 0.6981, count: 15},
        ...
        {hour: 23, startAngle: 2.5307, endAngle: 2.6180, count: 14}
    ]

<script>
    var RadialLayout = function() {

        var startAngle = 0,
            endAngle = 2 * Math.PI;

        var value = function(d) { return d.date; }

        // Layout function.
        function layout(data) {
            // Create a map to store the data for each hour.
            var hours = d3.range(0, 24),
                gmap = d3.map(),
                groups = [];

            var itemAngle = (endAngle - startAngle) / 24;

            // Append a data item for each hour, with all the fields set to zero.
            hours.forEach(function(h) {
                gmap.set(h, {
                    hour: h,
                    startAngle: startAngle + h * itemAngle,
                    endAngle: startAngle + (h + 1) * itemAngle,
                    count: 0
                });
            });

            // Count the data items belonging to each hour.
            data.forEach(function(d) {
                // Get the hour of the data item and the corresponding data item.
                var _hour = value(d).getHours(),
                    _value = gmap.get(_hour);

                // Increment the count and set the value in the map.
                _value.count += 1;
                gmap.set(_hour, _value);
            });


            // Copy the values of the map and sort the output data array.
            groups = gmap.values();
            groups.sort(function(a, b) { return a.hour > b.hour ? 1 : -1; });
            return groups;
        }

        // Accessor Methods

        // Date Accessor Function
        layout.value = function(accessorFunction) {
            if (!arguments.length) { return value; }
            value = accessorFunction;
            return layout;
        };

        // Angle Extent
        layout.angleExtent = function(value) {
            if (!arguments.length) { return [startAngle, endAngle]; }
            startAngle = value[0];
            endAngle = value[1];
            return layout;
        };

        // Returns the layout function.
        return layout;
    };
</script>


### <a href="#h3-radial-chart" name="h3-radial-chart">#</a> Using the Layout: Radial Chart

<!-- Sample Output -->
    [
        {hour:  0, startAngle: 0,      endAngle: 0.2618, count: 10},
        {hour:  1, startAngle: 0.2618, endAngle: 0.5236, count: 21},
        ...
        {hour: 23, startAngle: 6.0214, endAngle: 6.2832, count:  8}
    ]

<div class="chart-example" id="radial-chart" style="padding: 5px;"></div>

<script>
    // Create and configure the layout function.
    var radialLayout = RadialLayout();

    // Compute the ouput data.
    var output04 = radialLayout(data);

    // Radial Chart
    // ------------

    // Visualization Variables
    var width = 670,
        height = 200,
        innerRadius = 30,
        outerRadius = 100;

    // Append a svg element to the div and set its size.
    var svg = d3.select('#radial-chart').append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create the group and translate it to the center.
    var g = svg.append('g')
        .attr('transform', 'translate(' + [width / 2, height / 2] + ')');

    // Compute the radius scale.
    var rScale = d3.scale.sqrt()
        .domain([0, d3.max(output04, function(d) { return d.count; })])
        .range([2, outerRadius - innerRadius]);

    // Create an arc generator.
    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(function(d) { return innerRadius + rScale(d.count); });

    // Append the paths to the group.
    g.selectAll('path')
        .data(output04)
        .enter()
        .append('path')
            .attr('d', function(d) { return arc(d); })
            .attr('fill', 'grey')
            .attr('stroke', 'white')
            .attr('stroke-width', 1);
</script>


### <a href="#h3-bar-chart" name="h3-bar-chart">#</a> Using the Layout: Bar Chart (Bonus)

<!-- Sample Output -->
    [
        {hour:  0, startAngle: 0,      endAngle: 0.2618, count: 10},
        {hour:  1, startAngle: 0.2618, endAngle: 0.5236, count: 21},
        ...
        {hour: 23, startAngle: 6.0214, endAngle: 6.2832, count:  8}
    ]

<div class="chart-example" id="bar-chart"></div>

<script>
    // Bar Chart
    // ---------

    // Visualization Variables
    var bWidth = 400,
        bHeight = 100;

    var barWidth = bWidth / 24;

    // Append a svg element to the div and set its size.
    var bsvg = d3.select('#bar-chart').append('svg')
        .attr('width', bWidth)
        .attr('height', bHeight);

    // Compute the radius scale.
    var yScale = d3.scale.linear()
        .domain([0, d3.max(output04, function(d) { return d.count; })])
        .range([2, bHeight - 2]);

    // Append the bars
    bsvg.selectAll('rect')
        .data(output04)
        .enter()
            .append('rect')
            .attr('x', function(d, i) { return barWidth * i; })
            .attr('y', function(d) { return bHeight - yScale(d.count); })
            .attr('width', barWidth)
            .attr('height', function(d) { return yScale(d.count); })
            .attr('fill', 'grey')
            .attr('stroke', 'white')
            .attr('stroke-width', 1);
</script>
