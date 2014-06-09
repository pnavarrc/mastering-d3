/* global d3: false */

function sliderControl() {

    // Slider width and height.
    var width = 600;

    // Default domain of values.
    var domain = [0, 100];

    // Default slider callback
    var onSlide = function(selection) { };

    // Charting function
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

            // Append a circle as handle
            var handle = group.selectAll('circle')
                .data([data])
                .enter()
                .append('circle')
                .call(chart.initHandle);

            // Set the domain
            var posScale = d3.scale.linear()
                .domain(domain)
                .range([0, width]);

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

            var drag = d3.behavior.drag()
                .on('drag', moveHandle);

            // Correct the position of the handle to use the data.
            handle
                .attr('cx', function(d) { return posScale(d); })
                .call(drag);
        });
    }

    chart.initLine = function(selection) {
        selection
            .attr('x1', 2)
            .attr('x2', width - 4)
            .attr('stroke', '#777')
            .attr('stroke-width', 4)
            .attr('stroke-linecap', 'round');
    };

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