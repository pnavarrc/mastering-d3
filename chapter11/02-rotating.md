---
layout: default
title: 11.2 Rotating Globe
---

<!-- Include the TopoJSON library and the CSS styles -->
<script src="{{site.baseurl}}/assets/js/lib/topojson.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.baseurl}}/chapter11/maps.css">

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Orthographic Projection</h2>

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


<h2 class="section-subtitle">Rotating and Zooming the Globe</h2>

<div id="map-zoom-orthographic"></div>

<script>
    d3.json('/chapter11/data/land.json', function(error, data) {

        if (error) { console.error(error); }

        var width = 800,
            height = 400;

        var geojson = topojson.feature(data, data.objects.ne_50m_land);

        // Store the rotation and scale of the projection
        var state = {x: 0, y: -45, scale: height / 2};

        // Configure the Orthographic projection
        var orthographic = d3.geo.orthographic()
            .scale(state.scale)
            .translate([width / 2, height / 2])
            .clipAngle(90)
            .rotate([state.x, state.y]);

        // Create and configure the geographic path generator
        var path = d3.geo.path()
            .projection(orthographic);

        var div = d3.select('#map-zoom-orthographic'),
            svg = div.append('svg')
                .attr('width', width)
                .attr('height', height);

        // Globe
        var globe = svg.append('path').datum({type: 'Sphere'})
            .attr('class', 'globe')
            .attr('d', path);

        // Features
        var land = svg.append('path').datum(geojson)
            .attr('class', 'land')
            .attr('d', path);

        // Create the graticule lines and append them to the SVG container
        var graticule = d3.geo.graticule();

        var lines = svg.append('path').datum(graticule())
            .attr('class', 'graticule')
            .attr('d', path);

        // Append the overlay and set its attributes
        var overlay = svg.append('circle').datum(state)
            .attr('r', height / 2)
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
            .attr('fill-opacity', 0);

        // Create and configure the zoom behavior
        var zoomBehavior = d3.behavior.zoom()
            .scaleExtent([0.5, 8])
            .on('zoom', zoom);

        // Add event listeners for the zoom gestures to the overlay
        overlay.call(zoomBehavior);

        function zoom(d) {

            // Compute the projection scale and the constant
            var scale = d3.event.scale,
                dx = d3.event.translate[0],
                dy = d3.event.translate[1];

            // Maps the translation vector to rotation angles
            d.x = 180 / width * dx;    // Horizontal rotation
            d.y = -180 / height * dy;  // Vertical rotation

            // Update the projection with the new rotation and scale
            orthographic
                .rotate([d.x, d.y])
                .scale(d.scale * scale);

            // Recompute the paths and the overlay radius
            svg.selectAll('path').attr('d', path);
            overlay.attr('r', scale * height / 2);
        }


    });
</script>