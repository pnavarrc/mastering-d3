---
layout: empty
title: 11.4 Fullscreen Cellestial Sphere
---

<link rel="stylesheet" type="text/css" href="{{site.baseurl}}/chapter11/maps.css">
<div>
<style>
    body, html {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    #stereographic {
        width: 100%;
        height: 100%;
    }
</style>
</div>

<script>
    d3.json('/chapter11/data/hyg.json', function(error, data) {

        if (error) { console.error(error); }

        // Create the container div
        var div = d3.select('body').append('div').attr('id', 'stereographic');

        // Compute the width and height of the container div
        var width = parseInt(div.style('width'), 10),
            height = parseInt(div.style('height'), 10);

        // Creates the SVG container and set it's dimensions
        var svg = div.append('svg')
            .attr('width', width)
            .attr('height', height);

        // Stores the projection rotation angles
        var rotate = {x: 0, y: 45};

        // Configure the projection
        var projection = d3.geo.stereographic()
            .scale(4.5 * height / Math.PI)
            .translate([width / 2, height / 2])
            .clipAngle(120)
            .rotate([rotate.x, -rotate.y]);

        // Create and configure the geographic path generator
        var path = d3.geo.path().projection(projection);

        // Add the globe outline
        svg.append('path').datum({type: 'Sphere'})
            .attr('class', 'cellestial-globe')
            .attr('d', path);

        // Creates and draw graticule lines
        var graticule = d3.geo.graticule();

        var lines = svg.selectAll('path.graticule').data([graticule()])
            .enter().append('path')
            .attr('class', 'graticule')
            .attr('d', path);

        var rScale = d3.scale.linear()
            .domain(d3.extent(data.features, function(d) { return d.properties.mag; }))
            .range([4, 1]);

        // Compute the radius for the point features
        path.pointRadius(function(d) {
            return d.properties ? rScale(d.properties.mag) : 1;
        });

        // Computes a color scale that approximates the color of the stars
        var cScale = d3.scale.linear()
            .domain([-0.3, 0, 0.6, 0.8, 1.42])
            .range(['#6495ed', '#fff', '#fcff6c', '#ffb439', '#ff4039']);

        // Add the star features to the SVG container
        var stars = svg.selectAll('path.star-color').data(data.features)
            .enter().append('path')
            .attr('class', 'star-color')
            .attr('d', path)
            .attr('fill', function(d) { return cScale(d.properties.color); });

        // Add labels for the stars
        var name = svg.selectAll('text').data(data.features)
            .enter().append('text')
            .attr('class', 'star-label')
            .attr('x', function(d) { return projection(d.geometry.coordinates)[0] + 8; })
            .attr('y', function(d) { return projection(d.geometry.coordinates)[1] + 8; })
            .text(function(d) { return d.properties.name; })
            .attr('fill', 'white');

        var overlay = svg.selectAll('rect').data([rotate])
            .enter().append('rect');

        overlay
            .attr('width', width)
            .attr('height', height)
            .attr('fill-opacity', 0);

        var dragBehavior = d3.behavior.drag()
            .origin(Object)
            .on('drag', drag);

        overlay.call(dragBehavior);

        function drag(d) {
            projection.rotate([(d.x = d3.event.x) / 2, -(d.y = d3.event.y) / 2]);
            stars.attr('d', function(u) {
                var p = path(u);
                return p ? p : 'M 10 10';
            });
            lines.attr('d', path);
            name
                .attr('x', function(d) { return projection(d.geometry.coordinates)[0] + 8; })
                .attr('y', function(d) { return projection(d.geometry.coordinates)[1] + 8; })
        }
    });
</script>