---
layout: main
title: "10.2 Mapping Greenland"
---

{{page.title}}
==============

<div>
    <style type="text/css">
        .ocean {
            fill: #a9dff3;
        }

        .nook {
            fill: #555;
        }

        .feature {
            fill: #ede6bb;
            stroke: #e2d793;
        }

        .graticule {
            fill: none;
            stroke: #ccc;
            stroke-opacity: 0.5;
        }

        .label {
            font-size: 22px;
            fill: #555;
            fill-opacity: 0.5;
        }
    </style>
</div>


Loading the GeoJSON File
------------------------

<div id="map01"></div>

<script type="text/javascript">

    // Define the size of the map
    var width = 300,
        height = 300,
        margin = 0,
        url = '{{site.baseurl}}/chapter10/data/greenland.json';

    d3.json(url, function(error, geodata) {

        // Handle errors getting and parsing the GeoJSON data
        if (error) { return error; }

        // Create the SVG container
        var div = d3.select('#map01'),
            svg = div.append('svg')
                .attr('width', width + 2 * margin)
                .attr('height', height + 2 * margin),
            gmap = svg.append('g')
                .attr('class', 'map')
                .attr('transform', 'translate(' + [margin, margin] + ')');

        // Background rectangle
        gmap.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'ocean');
    });
</script>


Using the Mercator Projection
-----------------------------

<div id="map02"></div>

<script type="text/javascript">
    d3.json(url, function(error, geodata) {

        // Handle errors getting and parsing the GeoJSON data
        if (error) { return error; }

        // Create the SVG container
        var div = d3.select('#map02'),
            svg = div.append('svg')
                .attr('width', width + 2 * margin)
                .attr('height', height + 2 * margin),
            gmap = svg.append('g')
                .attr('class', 'map')
                .attr('transform', 'translate(' + [margin, margin] + ')');

        // Background rectangle
        gmap.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'ocean');

        // Configure the Mercator Projection
        // ---------------------------------

        // This scale will use the entire width to represent the world
        var scale = width / (2 * Math.PI),
            projection = d3.geo.mercator()
                .scale(scale)
                .translate([width / 2, height / 2]);

        // Compute the position of the capital in screen coordinates
        var nookCoords = [-51.738, 64.175],
            nookPixels = projection(nookCoords);

        // Append a small circle and a label to mark the spot
        gmap.append('circle')
            .attr('cx', nookPixels[0])
            .attr('cy', nookPixels[1])
            .attr('r', 3)
            .attr('class', 'nook');

        // Append a label with the name of the capital
        gmap.append('text')
            .attr('x', nookPixels[0] + 5)
            .attr('y', nookPixels[1] + 5)
            .text('Nook')
            .attr('class', 'nook');
    });
</script>


Adding the Features
-------------------

<div id="map03"></div>

<script type="text/javascript">
    d3.json(url, function(error, geodata) {

        // Handle errors getting and parsing the GeoJSON data
        if (error) { return error; }

        // Create the SVG container
        var div = d3.select('#map03'),
            svg = div.append('svg')
                .attr('width', width + 2 * margin)
                .attr('height', height + 2 * margin),
            gmap = svg.append('g')
                .attr('class', 'map')
                .attr('transform', 'translate(' + [margin, margin] + ')');

        // Background rectangle
        gmap.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'ocean');

        // Projection
        // ----------

        // This scale will use the entire width to represent the world
        var scale = width / (2 * Math.PI),
            projection = d3.geo.mercator()
                .scale(scale)
                .translate([width / 2, height / 2]);

        // Create an instance of the path generator and set its projection
        var path = d3.geo.path()
            .projection(projection);

        // Features
        // --------

        // Select the feature paths and bind them to the features array
        var features = gmap.selectAll('path.feature')
            .data(geodata.features);

        // Append the paths on enter, and set the class to feature
        features.enter().append('path')
            .attr('class', 'feature');

        // Update the feature path
        features.attr('d', function(d) { return path(d)});
    });
</script>


Rotating the Projection
-----------------------

<div id="map04"></div>

<script type="text/javascript">
    d3.json(url, function(error, geodata) {

        // Handle errors getting and parsing the GeoJSON data
        if (error) { return error; }

        // Create the SVG container
        var div = d3.select('#map04'),
            svg = div.append('svg')
                .attr('width', width + 2 * margin)
                .attr('height', height + 2 * margin),
            gmap = svg.append('g')
                .attr('class', 'map')
                .attr('transform', 'translate(' + [margin, margin] + ')');

        // Background rectangle
        gmap.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'ocean');

        // Projection
        // ----------

        // Compute geographic bounds and centroid
        var geoCenter = d3.geo.centroid(geodata),
            scale = width / (2 * Math.PI);

        // This scale will use the entire width to represent the world
        var projection = d3.geo.mercator()
                .scale(scale)
                .translate([width / 2, height / 2])
                .rotate([-geoCenter[0], -geoCenter[1]]);

        // Create an instance of the path generator and set its projection
        var path = d3.geo.path()
            .projection(projection);

        // Features
        // --------

        // Select the feature paths and bind them to the features array
        var features = gmap.selectAll('path.feature')
            .data(geodata.features);

        // Append the paths on enter, and set the class to feature
        features.enter().append('path')
            .attr('class', 'feature');

        // Update the feature path
        features
            .attr('d', path(geodata));
    });
</script>


Scaling the Projection
----------------------

<div id="map05"></div>

<script type="text/javascript">
    d3.json(url, function(error, geodata) {

        // Handle errors getting and parsing the GeoJSON data
        if (error) { return error; }

        // Create the SVG container
        var div = d3.select('#map05'),
            svg = div.append('svg')
                .attr('width', width + 2 * margin)
                .attr('height', height + 2 * margin),
            gmap = svg.append('g')
                .attr('class', 'map')
                .attr('transform', 'translate(' + [margin, margin] + ')');

        // Background rectangle
        gmap.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'ocean');

        // Projection
        // ----------

        // Compute geographic bounds and centroid
        var geoCenter = d3.geo.centroid(geodata),
            geoBounds = d3.geo.bounds(geodata),
            geoDistance = d3.geo.distance(geoBounds[0], geoBounds[1]);

        var scale = 0.9 * width / geoDistance;

        // This scale will use the entire width to represent the world
        var projection = d3.geo.mercator()
                .scale(scale)
                .translate([width / 2, height / 2])
                .rotate([-geoCenter[0], -geoCenter[1]]);

        // Create an instance of the path generator and set its projection
        var path = d3.geo.path()
            .projection(projection);

        // Features
        // --------

        // Select the feature paths and bind them to the features array
        var features = gmap.selectAll('path.feature')
            .data(geodata.features);

        // Append the paths on enter, and set the class to feature
        features.enter().append('path')
            .attr('class', 'feature');

        // Update the feature path
        features
            .attr('d', path(geodata));
    });
</script>


Adding the Graticule
--------------------

<div id="map06"></div>

<script type="text/javascript">
    d3.json(url, function(error, geodata) {

        // Handle errors getting and parsing the GeoJSON data
        if (error) { return error; }

        // Create the SVG container
        var div = d3.select('#map06'),
            svg = div.append('svg')
                .attr('width', width + 2 * margin)
                .attr('height', height + 2 * margin),
            gmap = svg.append('g')
                .attr('class', 'map')
                .attr('transform', 'translate(' + [margin, margin] + ')');

        // Background rectangle
        gmap.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'ocean');

        // Projection
        // ----------

        // Compute geographic bounds and centroid
        var geoCenter = d3.geo.centroid(geodata),
            geoBounds = d3.geo.bounds(geodata),
            geoDistance = d3.geo.distance(geoBounds[0], geoBounds[1]);

        var scale = 0.9 * width / geoDistance;

        // Create an instance of the projection
        var projection = d3.geo.mercator()
                .scale(scale)
                .translate([width / 2, height / 2])
                .rotate([-geoCenter[0], -geoCenter[1]]);

        // Create an instance of the path generator and set its projection
        var path = d3.geo.path()
            .projection(projection);

        // Select the feature paths and bind them to the features array
        var features = gmap.selectAll('path.feature')
            .data(geodata.features);

        // Append the paths on enter, and set the class to feature
        features.enter().append('path')
            .attr('class', 'feature');

        // Update the feature path
        features.attr('d', function(d) { return path(d); });

        // Generate parallel and meridian lines
        var graticule = d3.geo.graticule();

        // Append the path to the map
        gmap.append('path')
            .attr('d', path(graticule()))
            .attr('class', 'graticule');

        // Create a selection for the labels and bind the features data
        var labels = gmap.selectAll('text.label')
            .data(geodata.features);

        // Append the labels on enter
        labels.enter().append('text')
            .attr('class', 'label');

        // Set the position and content of the labels
        labels
            .attr('x', function(d) { return projection(d3.geo.centroid(d))[0]; })
            .attr('y', function(d) { return projection(d3.geo.centroid(d))[1]; })
            .text(function(d) { return d.properties.NAME_LONG; });

    });
</script>

Using the Ortographic Projection
--------------------------------

<div id="map07"></div>

<script type="text/javascript">
    d3.json(url, function(error, geodata) {

        // Handle errors getting and parsing the GeoJSON data
        if (error) { return error; }

        // Create the SVG container
        var div = d3.select('#map07'),
            svg = div.append('svg')
                .attr('width', width + 2 * margin)
                .attr('height', height + 2 * margin),
            gmap = svg.append('g')
                .attr('class', 'map')
                .attr('transform', 'translate(' + [margin, margin] + ')');

        // Background rectangle
        gmap.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'ocean');

        // Projection
        // ----------

        // Compute geographic bounds and centroid
        var geoCenter = d3.geo.centroid(geodata),
            geoBounds = d3.geo.bounds(geodata),
            geoDistance = d3.geo.distance(geoBounds[0], geoBounds[1]);

        var scale = width / geoDistance;

        // Create and configure the orthographic projection
        var projection = d3.geo.orthographic()
                .scale(scale)
                .translate([width / 2, height / 5])
                .center(geoCenter);

        // Create an instance of the path generator and set its projection
        var path = d3.geo.path()
            .projection(projection);

        // Generate parallel and meridian lines
        var graticule = d3.geo.graticule();

        // Append the path to the map
        gmap.append('path')
            .attr('d', path(graticule()))
            .attr('class', 'graticule')
            .style('stroke', '#333')
            .style('stroke-opacity', 0.3);

        // Select the feature paths and bind them to the features array
        var features = gmap.selectAll('path.feature')
            .data(geodata.features);

        // Append the paths on enter, and set the class to feature
        features.enter().append('path')
            .attr('class', 'feature');

        // Update the feature path
        features.attr('d', function(d) { return path(d); });

    });
</script>


