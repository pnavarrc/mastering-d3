---
layout: main
title: "10.4 Creating Maps with TopoJSON"
---

{{page.title}}
==============

<!-- Include the TopoJSON library and the map styles -->
<script src='{{ site.baseurl}}/assets/js/lib/topojson.js'></script>
<link href='{{ site.baseurl}}/chapter10/greenland.css' rel='stylesheet'>


Adding the Features
-------------------

<div id="map01"></div>

<script type="text/javascript">
    var url = '{{site.baseurl}}/chapter10/data/greenland.topojson',
        width  = 600,
        height = 600,
        margin = 0;

    d3.json(url, function(error, data) {

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

        // Add the background rectangle
        gmap.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'ocean');

        // Read the TopoJSON object 'greenland' and create GeoJSON feature
        var geodata = topojson.feature(data, data.objects.greenland),
            features = geodata.features;

        // Projection
        // ----------

        // Get the geographic bounds, centroid and angular extent of the
        // feature to compute the projection scale
        var geoCenter = d3.geo.centroid(geodata),
            geoBounds = d3.geo.bounds(geodata),
            geoDistance = d3.geo.distance(geoBounds[0], geoBounds[1]),
            scale = width / geoDistance;

        // Create an instance of the projection
        var projection = d3.geo.mercator()
                .scale(scale)
                .translate([width / 2, height / 2])
                .rotate([-geoCenter[0], -geoCenter[1]]);

        // Features
        // --------

        // Create and configure the path generator
        var pathGenerator = d3.geo.path()
            .projection(projection);

        // Select the feature paths and bind them to the features array
        var featurePaths = gmap.selectAll('path.feature').data(features);

        // Append the paths on enter, and set the class to feature
        featurePaths.enter().append('path')
            .attr('class', 'feature');

        // Update the feature path
        featurePaths
            .attr('d', function(d) { return pathGenerator(d); });

        // Generate parallel and meridian lines
        var graticule = d3.geo.graticule()
            .step([10, 5]);

        // Append the path to the map
        gmap.append('path')
            .attr('d', pathGenerator(graticule()))
            .attr('class', 'graticule');
    });
</script>


Adding Labels
-------------

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

        // Projection
        // ----------

        var data = topojson.feature(geodata, geodata.objects.greenland),
            features = data.features;

        // Compute geographic bounds and centroid
        var geoCenter = d3.geo.centroid(data),
            geoBounds = d3.geo.bounds(data),
            geoDistance = d3.geo.distance(geoBounds[0], geoBounds[1]);

        var scale = width / geoDistance;

        // Create an instance of the projection
        var projection = d3.geo.mercator()
                .scale(scale)
                .translate([width / 2, height / 2])
                .rotate([-geoCenter[0], -geoCenter[1]]);

        // Create an instance of the path generator and set its projection
        var path = d3.geo.path()
            .projection(projection);

        // Select the feature paths and bind them to the features array
        var featurePaths = gmap.selectAll('path.feature')
            .data(features);

        // Append the paths on enter, and set the class to feature
        featurePaths.enter().append('path').attr('class', 'feature');

        // Update the feature path
        featurePaths.attr('d', function(d) { return path(d); });

        // Generate parallel and meridian lines
        var graticule = d3.geo.graticule();

        // Append the path to the map
        gmap.append('path')
            .attr('d', path(graticule()))
            .attr('class', 'graticule');

        function population(d) {
            return d.properties.POP_MAX;
        }

        // Labels
        var places = topojson.feature(geodata, geodata.objects.places),
            placeFeatures = places.features;

        var placeLabels = gmap.selectAll('text.place')
            .data(placeFeatures.filter(function(d) { return population(d) > 1e3; }));

        // Labels
        placeLabels.enter().append('text').attr('class', 'place');

        placeLabels
            .attr('x', function(d) { return projection(d.geometry.coordinates)[0]; })
            .attr('y', function(d) { return projection(d.geometry.coordinates)[1]; })
            .attr('text-anchor', 'middle')
            .text(function(d) { return d.properties.NAMEASCII; });


    });
</script>


Adding Labels
-------------

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

        var data = topojson.feature(geodata, geodata.objects.greenland),
            features = data.features;

        // Compute geographic bounds and centroid
        var geoCenter = d3.geo.centroid(data),
            geoBounds = d3.geo.bounds(data),
            geoDistance = d3.geo.distance(geoBounds[0], geoBounds[1]);

        var scale = width / geoDistance;

        // Create an instance of the projection
        var projection = d3.geo.mercator()
                .scale(scale)
                .translate([width / 2, height / 2])
                .rotate([-geoCenter[0], -geoCenter[1]]);

        // Create an instance of the path generator and set its projection
        var path = d3.geo.path()
            .projection(projection);

        // Select the feature paths and bind them to the features array
        var featurePaths = gmap.selectAll('path.feature')
            .data(features);

        // Append the paths on enter, and set the class to feature
        featurePaths.enter().append('path').attr('class', 'feature');

        // Update the feature path
        featurePaths.attr('d', function(d) { return path(d); });

        // Generate parallel and meridian lines
        var graticule = d3.geo.graticule();

        // Append the path to the map
        gmap.append('path')
            .attr('d', path(graticule()))
            .attr('class', 'graticule');


        // Labels
        var places = topojson.feature(geodata, geodata.objects.places),
            placeFeatures = places.features;

        var placePaths = gmap.selectAll('path.place').data(placeFeatures);

        function population(d) {
            return d.properties.POP_MAX;
        }

        var rScale = d3.scale.sqrt()
            .domain([0, d3.max(placeFeatures, population)])
            .rangeRound([2, 26]);

        var path = d3.geo.path()
            .projection(projection)
            .pointRadius(function(d) { return rScale(population(d)); });

        placePaths.enter().append('path')
            .attr('class', 'place');

        placePaths
            .attr('d', path);

        // Labels
        // ------


        var fontSize = d3.scale.sqrt()
            .domain([0, d3.max(placeFeatures, population)])
            .rangeRound([8, 16]);

        var placeLabels = gmap.selectAll('text.place')
            .data(placeFeatures.filter(function(d) { return population(d) > 1e3; }));

        // Labels
        placeLabels.enter().append('text').attr('class', 'place');

        placeLabels
            .each(function(d) { d.pos = projection(d.geometry.coordinates); })
            .attr('x', function(d) {
                var dx = rScale(population(d)) + 6;
                return (d.pos[0] > width / 2) ? d.pos[0] + dx : d.pos[0] - dx;
            })
            .attr('y', function(d) { return d.pos[1]; })
            .attr('text-anchor', function(d) { return (d.pos[0] > width / 2) ? 'start' : 'end'; })
            .attr('font-size', function(d) {
                return fontSize(population(d)) + 'px';
            })
            .text(function(d) { return d.properties.NAMEASCII; });


    });
</script>

