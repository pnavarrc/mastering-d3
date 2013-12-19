---
layout: base
title: "2.1 Creating DOM Elements with D3"
---

## {{ page.title }}


### Contents

- [Method Chaining](#chaining)
- [Using selection.call](#call)
- [Defining the Call Argument Function](#call-arg)
- [Creating a SVG Element](#svg)


### <a href="#chaining" name="chaining">#</a> Method Chaining

<div class="chart-example" id="chart-01"></div>

<script>
    // Create a simple array with three elements.
    var data = ['a', 'b', 'c'];

    // Select the container div element, create a selection for the inner
    // divs. Bind the data and append the items on enter. Append a paragraph
    // to each div and set the text attribute.
    d3.select('#chart-01').selectAll('div.data-item')
        .data(data)
        .enter()
        .append('div')
        .attr('class', 'data-item')
        .append('p')
        .text(function(d) { return d; });
</script>


### <a href="#call" name="call">#</a> Using selection.call

<div class="chart-example" id="chart-02"></div>

<script>
    // We can use selection.call to encapsulate the div content creation logic.
    d3.select('#chart-02').selectAll('div.data-item')
        .data(data)
        .enter()
        .append('div')
        .call(function(selection) {
            selection.each(function(data) {
                d3.select(this)
                    .attr('class', 'data-item')
                    .append('p')
                    .text(data);
            });
        });
</script>


### <a href="#call-arg" name="call-arg">#</a> Defining the Call Argument Function

<div class="chart-example" id="chart-03"></div>

<script>
    // Initialization function
    function initDiv(selection) {
        selection.each(function(data) {
            d3.select(this)
                .attr('class', 'data-item')
                .append('p')
                .text(data);
        });
    }

    // Call the initDiv function on each div.data-item element.
    d3.select('#chart-03').selectAll('div.data-item')
        .data(data)
        .enter()
        .append('div')
        .call(initDiv);
</script>


### <a href="#svg" name="svg">#</a> Creating a SVG Element

<div class="chart-example" id="chart-04"></div>

<script>
    // SVG Dimensions
    var width = 400,
        height = 40;

    // Initialization function
    function chart(selection) {
        selection.each(function(data) {

            // Bind the data to the svg selection.
            var div = d3.select(this).attr('class', 'data-item'),
                svg = div.selectAll('svg').data([data]),
                svgEnter = svg.enter();

            // Create the svg element and the background rectangle.
            svgEnter.append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('rect')
                .attr('width', width)
                .attr('height', height)
                .attr('fill', 'white');
        });
    }

    // Use the chart function to append a SVG element in each div.
    d3.select('#chart-04').selectAll('div.data-item')
        .data(data)
        .enter()
        .append('div')
        .call(chart);
</script>
