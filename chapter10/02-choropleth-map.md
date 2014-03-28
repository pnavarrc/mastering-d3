---
layout: default
title: "10.2 Creating a Chloroplet Map"
---

<link href='{{ site.baseurl}}/chapter10/map.css' rel='stylesheet'>

<h1 class="section-title">{{ page.title }}</h1>

<script>
    // Define the width and height of our maps
    var geoJsonUrl = '{{site.baseurl}}/chapter10/data/countries.geojson',
        width = 400,
        height = 400;
</script>


<h2 class="section-subtitle">Using the Mercator Projection</h2>

<div id="map01"></div>

<script>
    // Load the GeoJSON file
    d3.json(geoJsonUrl, function(error, data) {

        // Handle errors getting or parsing the GeoJSON file
        if (error) { return error; }

        // Setup
        // -----

        // Create the SVG Container
        var div = d3.select('#map01'),
            svg = div.selectAll('svg').data([data]);

        svg.enter().append('svg')
            .attr('width', width)
            .attr('height', height);

        // Projection
        // ----------

        // Create an instance of the mercator projection
        var projection = d3.geo.mercator()
            .translate([width / 2, height / 2]);

        // Create the path generator and configure its projection
        var pathGenerator = d3.geo.path()
            .projection(projection);

        // Features
        // --------

        // Create a selection for the countries and bind the feature data
        var features = svg.selectAll('path.feature').data(data.features);

        // Append the paths on enter
        features.enter().append('path')
            .attr('class', 'feature');

        // Set the path of the countries
        features.attr('d', pathGenerator);
    });
</script>


<h2 class="section-subtitle">Adding the Oceans and the Graticule</h2>

<div id="map02"></div>

<script>
    d3.json(geoJsonUrl, function(error, data) {

        // Handle errors getting or parsing the GeoJSON file
        if (error) { return error; }

        // Setup
        // -----

        // Create the SVG Container
        var div = d3.select('#map02'),
            svg = div.selectAll('svg').data([data]);

        svg.enter().append('svg')
            .attr('width', width)
            .attr('height', height);

        // Projection
        // ----------

        // The width will cover the complete circumference
        var scale = width / (2 * Math.PI);

        // Create the projection, setting the coordinates (0, 0) at the
        // center of the figure
        var projection = d3.geo.mercator()
            .scale(scale)
            .translate([width / 2, height / 2]);

        // Create the path generator
        var pathGenerator = d3.geo.path()
            .projection(projection);

        // Globe
        // -----

        var globeFeature = {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [-179.999,  89.999],
                        [ 179.999,  89.999],
                        [ 179.999, -89.999],
                        [-179.999, -89.999],
                        [-179.999,  89.999]
                    ]
                ]
            }
        };

        // Create a selection for the graticule path and bint the data
        var globe = svg.selectAll('path.globe').data([globeFeature]);

        // Append the graticule paths on enter
        globe.enter().append('path')
            .attr('class', 'globe');

        globe.attr('d', pathGenerator);

        // Features
        // --------

        // Create a selection for the countries and bind the feature data
        var features = svg.selectAll('path.feature').data(data.features);

        // Append the paths on enter
        features.enter().append('path')
            .attr('class', 'feature');

        // Set the path of the countries
        features.attr('d', pathGenerator);

        // Graticule
        // ---------

        // Create the graticule feature generator
        var graticule = d3.geo.graticule();

        // Create a selection for the graticule path and bint the data
        var grid = svg.selectAll('path.graticule').data([graticule()])

        // Append the graticule paths on enter
        grid.enter().append('path')
            .attr('class', 'graticule');

        // Set the path attribute for the graticule
        grid.attr('d', pathGenerator);
    });
</script>


<h2 class="section-subtitle">Creating the Color Scale</h2>

<div id="map03"></div>

<script>
    d3.json(geoJsonUrl, function(error, data) {

        // Handle errors getting or parsing the GeoJSON file
        if (error) { return error; }

        // Setup
        // -----
        var width = 500,
            height = 500;

        // Create the SVG Container
        var div = d3.select('#map03'),
            svg = div.selectAll('svg').data([data]);

        svg.enter().append('svg')
            .attr('width', width)
            .attr('height', height);

        // Projection
        // ----------

        // The width will cover the complete circumference
        var scale = width / (2 * Math.PI);

        // Create the projection, setting the coordinates (0, 0) at the
        // center of the figure
        var projection = d3.geo.mercator()
            .scale(scale)
            .translate([width / 2, height / 2]);

        // Create the path generator
        var pathGenerator = d3.geo.path()
            .projection(projection);

        // Globe
        // -----

        var globeFeature = {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [-179.999,  89.999],
                        [ 179.999,  89.999],
                        [ 179.999, -89.999],
                        [-179.999, -89.999],
                        [-179.999,  89.999]
                    ]
                ]
            }
        };

        // Create a selection for the graticule path and bint the data
        var globe = svg.selectAll('path.globe-white').data([globeFeature]);

        // Append the graticule paths on enter
        globe.enter().append('path')
            .attr('class', 'globe-white');

        globe.attr('d', pathGenerator);

        // Features
        // --------

        var colorRange = [
            '#f7fcfd',
            '#e0ecf4',
            '#bfd3e6',
            '#9ebcda',
            '#8c96c6',
            '#8c6bb1',
            '#88419d',
            '#6e016b'];

        // Create the color scale for the area of the features
        var colorScale = d3.scale.quantize()
            .domain(d3.extent(data.features, d3.geo.area))
            .range(colorRange);

        // Create a selection for the countries and bind the feature data
        var features = svg.selectAll('path.feature-color').data(data.features);

        // Append the paths on enter
        features.enter().append('path')
            .attr('class', 'feature-color');

        // Set the path of the countries
        features.attr('d', pathGenerator)
            .attr('fill', function(d) { return colorScale(d3.geo.area(d)); });
    });
</script>


<h2 class="section-subtitle">Using the Orthographic Projection</h2>

<div id="map04"></div>

<script>
    d3.json(geoJsonUrl, function(error, data) {

        // Handle errors getting or parsing the GeoJSON file
        if (error) { return error; }

        // Setup
        // -----

        // Create the SVG Container
        var div = d3.select('#map04'),
            svg = div.selectAll('svg').data([data]);

        var svgEnter = svg.enter().append('svg')
            .attr('width', width)
            .attr('height', height);

        // Projection
        // ----------

        // The width will cover the complete circumference
        var scale = 1.3 * width / Math.PI;

        // Create the projection, setting the coordinates (0, 0) at the
        // center of the figure
        var projection = d3.geo.orthographic()
                .scale(scale)
                .translate([width / 2, height / 2])
                .clipAngle(90);

        // Create the path generator
        var pathGenerator = d3.geo.path()
            .projection(projection);

        // Globe
        // -----

        var globeFeature = {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [-179.999,  89.999],
                        [ 179.999,  89.999],
                        [ 179.999, -89.999],
                        [-179.999, -89.999],
                        [-179.999,  89.999]
                    ]
                ]
            }
        };

        // Create a selection for the globe
        var globe = svg.selectAll('path.globe').data([globeFeature]);

        // Append the graticule paths on enter
        globe.enter().append('path')
            .attr('class', 'globe');

        // Set the path of the globe using the path generator
        globe.attr('d', pathGenerator);

        // Features
        // --------

        // Create a selection for the countries and bind the feature data
        var features = svg.selectAll('path.feature').data(data.features);

        // Append the paths on enter
        features.enter().append('path')
            .attr('class', 'feature');

        // Set the path of the countries
        features.attr('d', pathGenerator);

        // Graticule
        // ---------

        // Create the graticule feature generator
        var graticule = d3.geo.graticule();

        // Create a selection for the graticule path and bint the data
        var grid = svg.selectAll('path.graticule').data([graticule()])

        // Append the graticule paths on enter
        grid.enter().append('path').attr('class', 'graticule');

        // Set the path attribute for the graticule
        grid.attr('d', pathGenerator);
    });
</script>
