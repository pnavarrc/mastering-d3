---
layout: default
title: "4.2 Creating a Color Picker"
---

<script src="{{site.baseurl}}/chapter04/slider.js"></script>
<h2 class="section-subtitle">Color Picker Selector</h2>

<!-- Color Picker Container -->
<div class="chart-example" id="chart01"></div>

<script>
    // Color Picker Selector
    function labColorPicker1() {

        // Selector Attributes

        // Selector Shape
        var width = 30,
            height = 10;

        // Default Color
        var color = d3.lab(100, 0, 0);

        // Charting function
        function chart(selection) {
            selection.each(function() {

                // Create the container group and the rectangle selection.
                var group = d3.select(this),
                    rect = group.selectAll('rect');

                // Bind the rectangle to the color item and set its
                // initial attributes.
                rect.data([chart.color()])
                    .enter()
                    .append('rect')
                    .attr('width', width)
                    .attr('height', height)
                    .attr('fill', function(d) { return d; })
                    .attr('stroke', '#222')
                    .attr('stroke-width', 1);
            });
        }

        // Accessor Methods

        // Width Accessor
        chart.width = function(value) {
            if (!arguments.length) { return width; }
            width = value;
            return chart;
        };

        // Height Accessor
        chart.height = function(value) {
            if (!arguments.length) { return height; }
            height = value;
            return chart;
        };

        // Color Accessor
        chart.color = function(value) {
            if (!arguments.length) { return color; }
            color = d3.lab(value);
            return chart;
        };

        return chart;
    }
</script>

<script>
    // Figure attributes
    var width = 600,
        height = 60,
        offset = 30;

    var svg = d3.select('#chart01').append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create the color picker
    var picker = labColorPicker1()
        .color('#a40000');

    // Create a group for the color picker and translate it.
    var grp = svg.append('g')
        .attr('transform', 'translate(' + [offset, offset] + ')')
        .call(picker);
</script>

<h2 class="section-subtitle">Adding the Color Picker Window</h2>

<!-- Color Picker Container -->
<div class="chart-example" id="chart02"></div>

<script>
    function labColorPicker2() {

        // Color Picker Attributes
        var width = 30,
            height = 10;

        // Default color coordinates
        var color = d3.lab(100, 0, 0);

        function chart(selection) {
            selection.each(function() {

                // Create the container group and the rectangle selection.
                var group = d3.select(this),
                    rect = group.selectAll('rect');

                // Bind the rectangle to the color item and set its
                // initial attributes.
                rect.data([chart.color()])
                    .enter()
                    .append('rect')
                    .attr('width', width)
                    .attr('height', height)
                    .attr('fill', function(d) { return d; })
                    .attr('stroke', '#222')
                    .attr('stroke-width', 1)
                    .on('click', onClick);
            });
        }

        var onClick = function(d) {
            // Select the color picker div and bind the data.
            var div = d3.select('body')
                .selectAll('div.color-picker')
                .data([d]);

            if (div.empty()) {
                // Create the container div, if it doesn't exist.
                div.enter().append('div')
                    .attr('class', 'color-picker')
                    .style('position', 'absolute')
                    .style('left',  (d3.event.pageX + width) + 'px')
                    .style('top', d3.event.pageY + 'px')
                    .style('width', '200px')
                    .style('height', '100px')
                    .style('background-color', '#eee')
                    .style('border', 'solid 1px #555');
            } else {
                // Remove the color picker div, if it exist.
                d3.select('body').selectAll('div.color-picker').remove();
            }
        };

        // Accessor Methods

        // Width Accessor
        chart.width = function(value) {
            if (!arguments.length) { return width; }
            width = value;
            return chart;
        };

        // Height Accessor
        chart.height = function(value) {
            if (!arguments.length) { return height; }
            height = value;
            return chart;
        };

        // Color Accessor
        chart.color = function(value) {
            if (!arguments.length) { return color; }
            color = d3.lab(value);
            return chart;
        };

        return chart;
    }
</script>

<script>
    var width = 600,
        height = 60,
        offset = 30;

    var svg = d3.select('#chart02').append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create the color picker
    var picker = labColorPicker2()
        .color('#a40000');

    // Create a group for the color picker and translate it.
    var grp = svg.append('g')
        .attr('transform', 'translate(' + [offset, offset] + ')')
        .call(picker);

</script>


<h2 class="section-subtitle">Color Picker Window</h2>

<div class="chart-example" id="chart03">
    <div id="cp-window"></div>
</div>

<script>
    function labColorPickerWindow() {

        // Color Picker Window Attributes
        var margin = 10,
            labelWidth = 20,
            sliderWidth = 80,
            squareSize = 60,
            width = 3 * margin + labelWidth + sliderWidth + squareSize,
            height = 2 * margin + squareSize;

        var onColorChange = function(color) {};

        function chart(selection) {
            selection.each(function(data) {

                // Select the container div and set its style
                var divContent = d3.select(this)
                    .style('width', width + 'px')
                    .style('height', height + 'px')
                    .style('background-color', '#eee')
                    .style('border', 'solid 1px #555');

                // Create the SVG Element
                var svg = divContent.selectAll('svg')
                    .data([data])
                    .enter()
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);

                // Add the color square.
                var colorSquare = svg.append('rect')
                    .attr('x', 2 * margin + sliderWidth + labelWidth)
                    .attr('y', margin)
                    .attr('width', squareSize)
                    .attr('height', squareSize)
                    .attr('fill', data);

                // Update the color square and call the onColorChange function.
                function updateColor(color) {
                    colorSquare.attr('fill', color);
                    divContent.data([color])
                        .call(onColorChange);
                }

                // Scale to distribute the sliders vertically
                var vScale = d3.scale.ordinal()
                    .domain([0, 1, 2])
                    .rangePoints([0, squareSize], 1);

                svg.selectAll('text')
                    .data(['L', 'a', 'b'])
                    .enter()
                    .append('text')
                    .attr('x', margin)
                    .attr('y', function(d, i) {
                        return margin + vScale(i);
                    })
                    .text(function(d) { return d; });

                var sliderL = sliderControl()
                    .domain([0, 100])
                    .width(sliderWidth)
                    .onSlide(function(selection) {
                        selection.each(function(d) {
                            data.l = d;
                            updateColor(data);
                        });
                    });

                var gSliderL = svg.selectAll('g.slider-l')
                    .data([data.l])
                    .enter()
                    .append('g')
                    .attr('transform', function() {
                        var dx = margin + labelWidth,
                            dy = margin + vScale(0);
                        return 'translate(' + [dx, dy] + ')';
                    })
                    .call(sliderL);

                var sliderA = sliderControl()
                    .domain([-100, 100])
                    .width(sliderWidth)
                    .onSlide(function(selection) {
                        selection.each(function(d) {
                            data.a = d;
                            updateColor(data);
                        });
                    });

                var gSliderA = svg.selectAll('g.slider-a')
                    .data([data.a])
                    .enter()
                    .append('g')
                    .attr('class', 'slider-a')
                    .attr('transform', 'translate(' + [margin + labelWidth, margin + vScale(1)] + ')')
                    .call(sliderA);

                var sliderB = sliderControl()
                    .domain([-100, 100])
                    .width(sliderWidth)
                    .onSlide(function(selection) {
                        selection.each(function(d) {
                            data.b = d;
                            updateColor(data);
                        });
                    });

                var gSliderB = svg.selectAll('g.slider-b')
                    .data([data.b])
                    .enter()
                    .append('g')
                    .attr('class', 'slider-b')
                    .attr('transform', 'translate(' + [margin + labelWidth, margin + vScale(2)] + ')')
                    .call(sliderB);

            });
        }

        chart.onColorChange = function(colorChangeListener) {
            if (!arguments.length) { return onColorChange; }
            onColorChange = colorChangeListener;
            return chart;
        };

        return chart;
    };
</script>

<script>
    function labColorPicker() {

        // Color Picker Attributes
        var width = 30,
            height = 10;

        // Default color coordinates
        var color = d3.lab(100, 0, 0);

        // Default on color change function.
        var onColorChange = function(d) {};

        function chart(selection) {
            selection.each(function() {

                // Create the container group and the rectangle selection.
                var group = d3.select(this),
                    rect = group.selectAll('rect');

                // Bind the rectangle to the color item and set its
                // initial attributes.
                rect.data([chart.color()])
                    .enter()
                    .append('rect')
                    .attr('width', width)
                    .attr('height', height)
                    .attr('fill', function(d) { return d; })
                    .attr('stroke', '#222')
                    .attr('stroke-width', 1)
                    .on('click', chart.onClick);
            });
        }

        chart.onClick = function(d) {

            // Select the picker rectangle
            var rect = d3.select(this);

            // Select the color picker div and bind the data.
            var div = d3.select('body')
                .selectAll('div.color-picker')
                .data([d]);

            if (div.empty()) {

                // Create the Color Picker Content
                var content = labColorPickerWindow()
                    .onColorChange(function(selection) {
                        selection.each(function(d) {
                            rect.data([d]).attr('fill', d);
                        });
                    });

                // Create the container div, if it doesn't exist.
                div.enter().append('div')
                    .attr('class', 'color-picker')
                    .style('position', 'absolute')
                    .style('left',  (d3.event.pageX + width) + 'px')
                    .style('top', (d3.event.pageY) + 'px')
                    .call(content);

                // Bind the data to the rectangle again
                rect.data([div.datum()]);

            } else {
                // Bind the rectangle to the data bound to the content
                // div and update the fill attribute.
                rect.data([div.datum()])
                    .attr('fill', function(d) { return d; });

                // Remove the color picker div, if it exists.
                d3.select('body').selectAll('div.color-picker').remove();
            }

            onColorChange(color);
        };

        // Accessor Methods

        // Color
        chart.color = function(value) {
            if (!arguments.length) { return color; }
            color = d3.lab(value);
            return chart;
        };

        // onColorChange Accessor
        chart.onColorChange = function(onColorChangeFunction) {
            if (!arguments.length) { return onColorChange; }
            onColorChange = onColorChangeFunction;
            return chart;
        };

        return chart;
    }
</script>

<script>
    var width = 600,
        height = 140;

    var svg = d3.select('#chart03').append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create the color picker
    var picker = labColorPicker()
        .color('#fff')
        .onColorChange(function(d) {
            d3.select('body').style('background-color', d);
        });

    // Create a group for the color picker and translate it.
    var grp = svg.append('g')
        .attr('transform', 'translate(250, 30)')
        .call(picker);

</script>

