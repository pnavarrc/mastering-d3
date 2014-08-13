---
layout: default
title: 11.1 More Projections
---

<!-- Include the TopoJSON library and the CSS styles -->
<script src="{{site.baseurl}}/assets/js/lib/topojson.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.baseurl}}/chapter11/maps.css">


<h1 class="section-title">{{page.title}}</h1>


<h2 class="section-subtitle">Mercator Projection</h2>

<div id="map-mercator"></div>

<script>
    // Load the TopoJSON land data
    d3.json('/chapter11/data/land.json', function(error, data) {

        // Notifies about errors getting or parsing the data
        if (error) { console.error(error); }

        // Set the width and height of the SVG container
        var width = 300, height = 300;

        // Construct the GeoJSON object from the TopoJSON data
        var geojson = topojson.feature(data, data.objects.ne_50m_land);

        // Create and configure an instance of the Mercator projection
        var mercator = d3.geo.mercator()
            .scale(width / (2 * Math.PI))
            .translate([width / 2, height / 2]);

        // Create and configure the geographic path generator
        var path = d3.geo.path()
            .projection(mercator);

        // Append the SVG container and set its size
        var div = d3.select('#map-mercator'),
            svg = div.append('svg')
                .attr('width', width)
                .attr('height', height);

        // Append the globe path
        svg.append('path').datum({type: 'Sphere'})
            .attr('class', 'globe')
            .attr('d', path);

        // Append the path for the feature collection
        svg.append('path').datum(geojson)
            .attr('class', 'land')
            .attr('d', path);

        // Create the graticule lines and append them to the SVG container
        var graticule = d3.geo.graticule();

        // Add the graticule to the figure
        svg.append('path').datum(graticule())
            .attr('class', 'graticule')
            .attr('d', path);
    });
</script>


<h2 class="section-subtitle">Equirectangular</h2>

<div id="map-equirectangular"></div>

<script>
    d3.json('/chapter11/data/land.json', function(error, data) {

        if (error) { console.error(error); }

        // Construct the GeoJSON object from the TopoJSON data
        var geojson = topojson.feature(data, data.objects.ne_50m_land);

        // Set the width and height of the SVG element
        var width = 600, height = 300;

        // Append the SVG container and set its size
        var div = d3.select('#map-equirectangular'),
            svg = div.append('svg')
                .attr('width', width)
                .attr('height', height);

        // Create and configure an instance of the Equirectangular projection
        var equirectangular = d3.geo.equirectangular()
            .scale(width / (2 * Math.PI))
            .translate([width / 2, height / 2]);

        // Create and configure the geographic path generator
        var path = d3.geo.path()
            .projection(equirectangular);

        // Globe
        svg.append('path').datum({type: 'Sphere'})
            .attr('class', 'globe')
            .attr('d', path);

        // Features
        svg.append('path').datum(geojson)
            .attr('class', 'land')
            .attr('d', path);

        // Create the graticule lines and append them to the SVG container
        var graticule = d3.geo.graticule();

        svg.append('path').datum(graticule())
            .attr('class', 'graticule')
            .attr('d', path);
    });
</script>


<h2 class="section-subtitle">Conic Equidistant</h2>

<div id="map-conic"></div>

<script>
    d3.json('/chapter11/data/land.json', function(error, data) {

        if (error) { console.error(error); }

        // Width and height of the SVG container
        var width = 600, height = 300;

        // Construct the GeoJSON object from the TopoJSON data
        var geojson = topojson.feature(data, data.objects.ne_50m_land);

        // Create and configure an instance of the Conic Equidistant projection
        var conic = d3.geo.conicEquidistant()
            .scale(0.75 * width / (2 * Math.PI))
            .translate([width / 2, height / 2]);

        // Create and configure the geographic path generator
        var path = d3.geo.path()
            .projection(conic);

        // Append the SVG container and set its dimension
        var div = d3.select('#map-conic'),
            svg = div.append('svg')
                .attr('width', width)
                .attr('height', height);

        // Append the Globe path
        svg.append('path').datum({type: 'Sphere'})
            .attr('class', 'globe')
            .attr('d', path);

        // Append the feature path
        svg.append('path').datum(geojson)
            .attr('class', 'land')
            .attr('d', path);

        // Create the graticule lines and append them to the SVG container
        var graticule = d3.geo.graticule();

        svg.append('path').datum(graticule())
            .attr('class', 'graticule')
            .attr('d', path);
    });
</script>


<h2 class="section-subtitle">Conic Equidistant (New Zealand)</h2>

<div id="map-conic-rotated"></div>

<script>
    d3.json('/chapter11/data/land.json', function(error, data) {

        if (error) { console.error(error); }

        // Width and height of the SVG container
        var width = 600, height = 300;

        // Construct the GeoJSON object from the TopoJSON data
        var geojson = topojson.feature(data, data.objects.ne_50m_land);

        // Create and configure an instance of the projection
        var conic = d3.geo.conicEquidistant()
            .scale(0.85 * width / (Math.PI / 3))
            .rotate([-141, 0])
            .translate([width / 2, height / 2])
            .parallels([5, -15]);

        // Create and configure the geographic path generator
        var path = d3.geo.path()
            .projection(conic);

        // Append the SVG container and set its dimension
        var div = d3.select('#map-conic-rotated'),
            svg = div.append('svg')
                .attr('width', width)
                .attr('height', height);

        // Append the Globe path
        svg.append('path').datum({type: 'Sphere'})
            .attr('class', 'globe')
            .attr('d', path);

        // Append the feature path
        svg.append('path').datum(geojson)
            .attr('class', 'land')
            .attr('d', path);

        // Create the graticule lines and append them to the SVG container
        var graticule = d3.geo.graticule();

        svg.append('path').datum(graticule())
            .attr('class', 'graticule')
            .attr('d', path);
    });
</script>


<h2 class="section-subtitle">Orthographic Projection</h2>

<div id="map-orthographic"></div>

<script>
    d3.json('/chapter11/data/land.json', function(error, data) {

        if (error) { console.error(error); }

        // Width and height of the SVG element
        var width = 600, height = 300;

        var geojson = topojson.feature(data, data.objects.ne_50m_land);

        // Create and configure an instance of the Orthographic projection
        var orthographic = d3.geo.orthographic()
            .scale(height / 2)
            .translate([width / 2, height / 2]);

        // Create and configure the geographic path generator
        var path = d3.geo.path()
            .projection(orthographic);

        var div = d3.select('#map-orthographic'),
            svg = div.append('svg')
                .attr('width', width)
                .attr('height', height);

        // Globe
        svg.append('path').datum({type: 'Sphere'})
            .attr('class', 'globe')
            .attr('d', path);

        // Features
        svg.append('path').datum(geojson)
            .attr('class', 'land')
            .attr('d', path);

        // Create the graticule lines and append them to the SVG container
        var graticule = d3.geo.graticule();

        svg.append('path').datum(graticule())
            .attr('class', 'graticule')
            .attr('d', path);
    });
</script>


<h2 class="section-subtitle">Orthographic Projection (with Clipping)</h2>

<div id="map-orthographic-clip"></div>

<script>
    d3.json('/chapter11/data/land.json', function(error, data) {

        if (error) { console.error(error); }

        // Width and height of the SVG element
        var width = 600, height = 300;

        var geojson = topojson.feature(data, data.objects.ne_50m_land);

        // Create and configure an instance of the Orthographic projection
        var orthographic = d3.geo.orthographic()
            .scale(height / 2)
            .translate([width / 2, height / 2])
            .clipAngle(90);

        // Create and configure the geographic path generator
        var path = d3.geo.path()
            .projection(orthographic);

        var div = d3.select('#map-orthographic-clip'),
            svg = div.append('svg')
                .attr('width', width)
                .attr('height', height);

        // Globe
        svg.append('path').datum({type: 'Sphere'})
            .attr('class', 'globe')
            .attr('d', path);

        // Features
        svg.append('path').datum(geojson)
            .attr('class', 'land')
            .attr('d', path);

        // Create the graticule lines and append them to the SVG container
        var graticule = d3.geo.graticule();

        svg.append('path').datum(graticule())
            .attr('class', 'graticule')
            .attr('d', path);
    });
</script>