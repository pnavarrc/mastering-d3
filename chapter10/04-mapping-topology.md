---
layout: default
title: "10.4 Mapping Topology"
---

<!-- Include the map styles and the topojson library -->
<link href='{{site.baseurl}}/chapter10/map.css' rel='stylesheet'>
<script src='{{site.baseurl}}/assets/js/lib/topojson.js'></script>

<h1 class="section-title">{{ page.title }}</h1>

<h2 class="section-subtitle">Converting TopoJSON to GeoJSON objects</h2>

<div id='map01'></div>

<script type="text/javascript">

    var url = '{{site.baseurl}}/chapter10/data/countries.topojson',
        width = 500,
        height = 500;

    // Create a Feature to represent the entire globe
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

    d3.json(url, function(error, data) {

        if (error) { return error; }

        // Create the SVG container
        var div = d3.select('#map01'),
            svg = div.selectAll('svg').data([data]);

        // Create the SVG container on enter
        svg.enter().append('svg')
            .attr('width', width)
            .attr('height', height);

        // Use the TopoJSON library to construct the feature collection
        var geodata = topojson.feature(data, data.objects.countries);

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

        // Create a selection for the graticule path and bint the data
        var globe = svg.selectAll('path.globe')
            .data([globeFeature])
            .enter().append('path')
            .attr('class', 'globe')
            .attr('d', pathGenerator);

        // Features
        // --------

        // Create a selection for the countries and bind the feature data
        var features = svg.selectAll('path.feature')
            .data(geodata.features)
            .enter()
            .append('path')
            .attr('class', 'feature')
            .attr('d', pathGenerator);

        // Graticule
        // ---------

        // Create the graticule feature generator
        var graticule = d3.geo.graticule();

        // Create a selection for the graticule path and bint the data
        var grid = svg.selectAll('path.graticule')
            .data([graticule()])
            .enter()
            .append('path')
            .attr('class', 'graticule')
            .attr('d', pathGenerator);
    });
</script>


<h2 class="section-subtitle">Centering and Scaling</h2>

<div id='map02'></div>

<script type="text/javascript">
    d3.json(url, function(error, data) {

        if (error) { return error; }

        // Create the SVG container
        var div = d3.select('#map02'),
            svg = div.selectAll('svg').data([data]);

        // Create the SVG container on enter
        svg.enter().append('svg')
            .attr('width', width)
            .attr('height', height);

        // Use the TopoJSON library to construct the feature collection
        var geodata = topojson.feature(data, data.objects.countries);

        // Filter the countries in South America
        var southAmerica = geodata.features.filter(function(d) {
                return d.properties.continent === 'South America';
            });

        // Create a feature collection for south america
        var southAmericaFeature = {
            type: 'FeatureCollection',
            features: southAmerica
        };

        // Projection
        // ----------

        // Compute the bounds, centroid and angle extent of South America
        // to configure the projection
        var bounds = d3.geo.bounds(southAmericaFeature),
            center = d3.geo.centroid(southAmericaFeature),
            distance = d3.geo.distance(bounds[0], bounds[1]);

        // The width will cover the complete circumference
        var scale = width / distance;

        // Create the projection to match the centroid of the feature
        var projection = d3.geo.mercator()
            .scale(scale)
            .translate([width / 2, 0.4 * height])
            .center(center);

        // Create the path generator
        var pathGenerator = d3.geo.path()
            .projection(projection);

        // Globe
        // -----

        // Create a selection for the graticule path and bint the data
        var globe = svg.selectAll('path.globe')
            .data([globeFeature])
            .enter()
            .append('path')
            .attr('class', 'globe')
            .attr('d', pathGenerator);

        // Features
        // --------

        // Create a selection for the countries and bind the feature data
        var featurePath = svg.selectAll('path.feature')
            .data([southAmericaFeature])
            .enter()
            .append('path')
            .attr('class', 'feature')
            .attr('d', pathGenerator);
    });
</script>


<h2 class="section-subtitle">Finding Neighbors</h2>

<div id='map03'></div>

<div>
    <style>
        .bolivia {
            fill: #666;
        }
    </style>
</div>


<script type="text/javascript">
    d3.json(url, function(error, data) {

        if (error) { return error; }

        // Create the SVG container
        var div = d3.select('#map03'),
            svg = div.selectAll('svg').data([data]);

        // Create the SVG container on enter
        svg.enter().append('svg')
            .attr('width', width)
            .attr('height', height);

        // Use the TopoJSON library to construct the feature collection
        var geodata = topojson.feature(data, data.objects.countries);

        // Filter the countries in South America
        var southAmerica = geodata.features.filter(function(d) {
                return d.properties.continent === 'South America';
            });

        // Create a feature collection for south america
        var southAmericaFeature = {
            type: 'FeatureCollection',
            features: southAmerica
        };

        // Projection
        // ----------

        // Compute the bounds, centroid and angle extent of South America
        // to configure the projection
        var bounds = d3.geo.bounds(southAmericaFeature),
            center = d3.geo.centroid(southAmericaFeature),
            distance = d3.geo.distance(bounds[0], bounds[1]);

        // The width will cover the complete circumference
        var scale = 0.9 * width / distance;

        // Create the projection to match the centroid of the feature
        var projection = d3.geo.mercator()
            .scale(scale)
            .translate([width / 2, 0.35 * height])
            .center(center);

        // Create the path generator
        var pathGenerator = d3.geo.path()
            .projection(projection);

        // Globe
        // -----

        // Create a selection for the graticule path and bint the data
        var globe = svg.selectAll('path.globe')
            .data([globeFeature])
            .enter()
            .append('path')
            .attr('class', 'globe')
            .attr('d', pathGenerator);

        // Features
        // --------

        // Create a selection for the countries and bind the feature data
        var featurePath = svg.selectAll('path.feature')
            .data([southAmericaFeature])
            .enter()
            .append('path')
            .attr('class', 'feature')
            .attr('d', pathGenerator);

        // Neighbors
        // ---------

        // Compute the neighbors of each geometry object.
        var neighbors = topojson.neighbors(data.objects.countries.geometries),
            countryIndex = 0;

        // Find the index of Bolivia in the geometries array
        data.objects.countries.geometries.forEach(function(d, i) {
            if (d.properties.admin === 'Bolivia') { countryIndex = i; }
        });

        // Construct a Geometry Collection with the neighbors plus the country
        var geomCollection  = {
            type: 'GeometryCollection',
            geometries: []
        };

        // Add the neighbor's geometry object to the geometry collection
        neighbors[countryIndex].forEach(function(i) {
            geomCollection.geometries.push(data.objects.countries.geometries[i]);
        });

        // Construct a Feature object for the neighbors
        var neighborFeature = topojson.feature(data, geomCollection);

        // Add paths for the neighbor countries
        var neighborPaths = svg.selectAll('path.neighbor')
            .data([neighborFeature])
            .enter()
            .append('path')
            .attr('class', 'neighbor')
            .attr('d', pathGenerator);


        var boliviaGeom = {
            type: 'GeometryCollection',
            geometries: [data.objects.countries.geometries[countryIndex]]
        };

        var boliviaFeature = topojson.feature(data, boliviaGeom);

        var boliviaPaths = svg.selectAll('path.bolivia')
            .data([boliviaFeature])
            .enter()
            .append('path')
            .attr('class', 'bolivia')
            .attr('d', pathGenerator);
    });
</script>


<h2 class="section-subtitle">Drawing a Frontier</h2>

<div id='map04'></div>

<script type="text/javascript">
    d3.json(url, function(error, data) {

        if (error) { return error; }

        // Create the SVG container
        var div = d3.select('#map04'),
            svg = div.selectAll('svg').data([data]);

        // Create the SVG container on enter
        svg.enter().append('svg')
            .attr('width', width)
            .attr('height', height);

        // Use the TopoJSON library to construct the feature collection
        var geodata = topojson.feature(data, data.objects.countries);

        // Filter the countries in South America
        var southAmerica = geodata.features.filter(function(d) {
                return d.properties.continent === 'South America';
            });

        // Create a feature collection for south america
        var southAmericaFeature = {
            type: 'FeatureCollection',
            features: southAmerica
        };

        // Projection
        // ----------

        // Compute the bounds, centroid and angle extent of South America
        // to configure the projection
        var bounds = d3.geo.bounds(southAmericaFeature),
            center = d3.geo.centroid(southAmericaFeature),
            distance = d3.geo.distance(bounds[0], bounds[1]);

        // The width will cover the complete circumference
        var scale = 0.9 * width / distance;

        // Create the projection to match the centroid of the feature
        var projection = d3.geo.mercator()
            .scale(scale)
            .translate([width / 2, 0.35 * height])
            .center(center);

        // Create the path generator
        var pathGenerator = d3.geo.path()
            .projection(projection);

        // Globe
        // -----

        // Create a selection for the graticule path and bint the data
        var globe = svg.selectAll('path.globe')
            .data([globeFeature])
            .enter()
            .append('path')
            .attr('class', 'globe')
            .attr('d', pathGenerator);

        // Features
        // --------

        // Create a selection for the countries and bind the feature data
        var featurePath = svg.selectAll('path.feature')
            .data([southAmericaFeature])
            .enter()
            .append('path')
            .attr('class', 'feature')
            .attr('d', pathGenerator);

        // Neighbors
        // ---------

        // Compute the neighbors of each geometry object.
        var neighbors = topojson.neighbors(data.objects.countries.geometries),
            countryIndex = 0;

        // Find the index of Bolivia in the geometries array
        data.objects.countries.geometries.forEach(function(d, i) {
            if (d.properties.admin === 'Bolivia') { countryIndex = i; }
        });

        // Construct a Geometry Collection with the neighbors plus the country
        var geomCollection  = {
            type: 'GeometryCollection',
            geometries: neighbors[countryIndex]
        };

        // Add the neighbor's geometry object to the geometry collection
        neighbors[countryIndex].forEach(function(i) {
            geomCollection.geometries.push(data.objects.countries.geometries[i]);
        });

        // Construct a Feature object for the neighbors
        var neighborFeature = topojson.feature(data, geomCollection);

        // Add paths for the neighbor countries
        var neighborPaths = svg.selectAll('path.neighbor')
            .data([neighborFeature])
            .enter()
            .append('path')
            .attr('class', 'neighbor')
            .attr('d', pathGenerator);

        var boliviaGeom = {
            type: 'GeometryCollection',
            geometries: [data.objects.countries.geometries[countryIndex]]
        };

        var boliviaFeature = topojson.feature(data, boliviaGeom);

        var boliviaPaths = svg.selectAll('path.bolivia')
            .data([boliviaFeature])
            .enter()
            .append('path')
            .attr('class', 'bolivia')
            .attr('d', pathGenerator);


        // Frontier
        // --------

        var frontier = topojson.mesh(data, data.objects.countries, function(a, b) {
            return (a.properties.admin === 'Brazil')  && (b.properties.admin === 'Bolivia') ||
                   (a.properties.admin === 'Bolivia') && (b.properties.admin === 'Brazil');
        });

        var frontierPath = svg.selectAll('path.frontier')
            .data([frontier])
            .enter()
            .append('path')
            .attr('class', 'frontier')
            .attr('d', pathGenerator);

    });
</script>
