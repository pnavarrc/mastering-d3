---
layout: default
title: 11.5 Raster Reprojection
---

<!-- Include the TopoJSON library and the CSS styles -->
<script src="{{site.baseurl}}/assets/js/lib/topojson.js"></script>
<link rel="stylesheet" type="text/css" href="{{site.baseurl}}/chapter11/maps.css">


<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Equirectangular Projection</h2>

<div id="map-equirectangular"></div>

<script>
    d3.json('/chapter11/data/land.json', function(error, data) {

        if (error) { console.error(error); }

        var width = 600,
            height = 300;

        var geojson = topojson.feature(data, data.objects.ne_50m_land);

        // Create and configure an instance of the Mercator projection
        var equirectangular = d3.geo.equirectangular()
            .scale(width / (2 * Math.PI))
            .translate([width / 2, height / 2]);

        // Create and configure the geographic path generator
        var path = d3.geo.path()
            .projection(equirectangular);

        var div = d3.select('#map-equirectangular'),
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
    });
</script>


<h2 class="section-subtitle">Inverse Projection</h2>

<div id="map-equirectangular-inverse"></div>


<script>
    d3.json('/chapter11/data/land.json', function(error, data) {

        if (error) { console.error(error); }

        var width = 600,
            height = 300;

        var geojson = topojson.feature(data, data.objects.ne_50m_land);

        // Create and configure an instance of the Mercator projection
        var equirectangular = d3.geo.equirectangular()
            .scale(width / (2 * Math.PI))
            .translate([width / 2, height / 2]);

        // Create and configure the geographic path generator
        var path = d3.geo.path()
            .projection(equirectangular);

        var div = d3.select('#map-equirectangular-inverse'),
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

        var rect = svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill-opacity', 0);

        var vLine = svg.append('line')
            .attr('x0', -5)
            .attr('x1', -5)
            .attr('y0',  0)
            .attr('y1',  height)
            .attr('class', 'guide');

        var hLine = svg.append('line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', -5)
            .attr('y2', -5)
            .attr('class', 'guide');

        var coordLabel = svg.append('text')
            .text('')
            .attr('class', 'guide-label');

        var fmt = d3.format('+.1f');

        rect
            .on('mousemove', function() {

                var pos = d3.mouse(this),
                    coords = equirectangular.invert(pos);

                // Update the position of the guides
                vLine.attr('x1', pos[0]).attr('x2', pos[0]);
                hLine.attr('y1', pos[1]).attr('y2', pos[1]);

                coordLabel
                    .attr('x', pos[0] + 5)
                    .attr('y', pos[1] - 5)
                    .text(fmt(coords[0]) + ', ' + fmt(coords[1]));
            })
            .on('mouseout', function() {
                vLine
                    .attr('x1', -5)
                    .attr('x2', -5);
                hLine
                    .attr('y1', -5)
                    .attr('y2', -5);
                coordLabel
                    .attr('x', -5)
                    .attr('y', -5);
            });
    });
</script>

<h2 class="section-subtitle">Draw a Raster Image with Canvas</h2>

<div id="canvas-image"></div>

<script>
    (function() {
        // Canvas element width and height
        var width = 600,
            height = 300;

        // Append the canvas element to the container div
        var div = d3.select('#canvas-image'),
            canvas = div.append('canvas')
                .attr('width', width)
                .attr('height', height);

        // Get the 2D context of the canvas instance
        var context = canvas.node().getContext('2d');

        // Create the image element
        var image = new Image;
        image.onload = onLoad;
        image.src = '/chapter11/data/world.jpg';

        // Copy the image to the canvas context
        function onLoad() {
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
        }
    })();
</script>


<h2 class="section-subtitle">Computing Coordinates with the Inverse Projection</h2>

<div id="canvas-image-inv"></div>

<script>
    (function() {
        var width = 600,
            height = 300;

        var div = d3.select('#canvas-image-inv'),
            canvas = div.append('canvas')
                .attr('width', width)
                .attr('height', height);

        var context = canvas.node().getContext('2d');

        // Create the image element
        var image = new Image;
        image.onload = onLoad;
        image.src = '{{site.baseurl}}/chapter11/data/world.jpg';

        // Projection
        var equirectangular = d3.geo.equirectangular()
            .scale(width / (2 * Math.PI))
            .translate([width / 2, height / 2]);

        var fmt = d3.format('+.2f');

        // Copy the image to the canvas context
        function onLoad() {
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
        }

        // Add an event listener for the mousemove event
        canvas.on('mousemove', function(d) {
            var pos = d3.mouse(this),
                coords = equirectangular.invert(pos),
                label = [fmt(coords[0]), fmt(coords[1])].join(', ');

            context.clearRect(2, 2, 90, 14);
            context.fillText(label, 4, 12);
        });

    })();
</script>


<h2 class="section-subtitle">Reprojecting with the Mercator Projection</h2>

<div id="reprojection-mercator"></div>

<script>
    (function() {
        // Canvas dimensions
        var width = 600, height = 300;

        // Append the canvas element and set its dimension
        var div = d3.select('#reprojection-mercator'),
            canvas = div.append('canvas')
                .attr('width', width)
                .attr('height', height);

        // Get the canvas 2D context
        var context = canvas.node().getContext('2d');

        // Create and configure the Equirectancular projection
        var equirectangular = d3.geo.equirectangular()
            .scale(width / (2 * Math.PI))
            .translate([width / 2, height / 2]);

        // Create and configure the Mercator projection
        var mercator = d3.geo.mercator()
            .scale(height / (2 * Math.PI))
            .translate([width / 2, height / 2]);

        // Create and load the image
        var image = new Image(width, height);
        image.onload = onLoad;
        image.src = '{{site.baseurl}}/chapter11/data/world.jpg';

        // Invoked when the image is fully loades
        function onLoad() {

            // Draw the image using the entire canvas
            context.drawImage(image, 0, 0, image.width, image.height);

            // Retrieve the source image data as an array
            var sourceData = context.getImageData(0, 0, image.width, image.height).data;

            // Create a new target image element and retrieve its data array
            var target = context.createImageData(image.width, image.height),
                targetData = target.data;

            // Iterate through the pixels of the canvas area
            for (var x = 0, w = image.width; x < w; x += 1) {
                for (var y = 0, h = image.height; y < h; y += 1) {

                    // Compute the latitude and longitude corresponding to the
                    // current row and column in the target projection
                    var coords = mercator.invert([x, y]);

                    // Variables to store the target and source index in the
                    // data array
                    var targetIndex,
                        sourceIndex,
                        pixels;

                    if ((!isNaN(coords[0])) && (!isNaN(coords[1]))) {

                        pixels = equirectangular(coords);

                        sourceIndex = 4 * (Math.floor(pixels[0]) + w * Math.floor(pixels[1]));
                        sourceIndex = sourceIndex - (sourceIndex % 4);

                        targetIndex = 4 * (x + w * y);
                        targetIndex = targetIndex - (targetIndex % 4);

                        targetData[targetIndex]     = sourceData[sourceIndex];
                        targetData[targetIndex + 1] = sourceData[sourceIndex + 1];
                        targetData[targetIndex + 2] = sourceData[sourceIndex + 2];
                        targetData[targetIndex + 3] = sourceData[sourceIndex + 3];
                    }
                }
            }

            context.clearRect(0, 0, image.width, image.height);
            context.putImageData(target, 0, 0);
        }

    })();
</script>

<h2 class="section-subtitle">Reprojecting with the Orthographic Projection</h2>

<div id="canvas-image-orthographic"></div>

<script>
    (function() {
        var width = 600,
            height = 300;

        var div = d3.select('#canvas-image-orthographic'),
            canvas = div.append('canvas')
                .attr('width', width)
                .attr('height', height);

        var context = canvas.node().getContext('2d');

        // Create and configure the Equirectangular projection
        var equirectangular = d3.geo.equirectangular()
            .scale(width / (2 * Math.PI))
            .translate([width / 2, height / 2]);

        // Create and configure the Orthographic projection
        var orthographic = d3.geo.orthographic()
            .scale(Math.sqrt(2) * height / Math.PI)
            .translate([width / 2, height / 2])
            .clipAngle(90);

        // Create the image element
        var image = new Image(width, height);
        image.onload = onLoad;
        image.src = '{{site.baseurl}}/chapter11/data/world.jpg';

        // Copy the image to the canvas context
        function onLoad() {

            // Copy the image to the canvas area
            context.drawImage(image, 0, 0, image.width, image.height);

            // Reads the source image data from the canvas context
            var sourceData = context.getImageData(0, 0, image.width, image.height).data;

            // Creates an empty target image and gets its data
            var target = context.createImageData(image.width, image.height),
                targetData = target.data;

            // Iterate in the target image
            for (var x = 0, w = image.width; x < w; x += 1) {
                for (var y = 0, h = image.height; y < h; y += 1) {

                    // Compute the geographic coordinates of the current pixel
                    var coords = orthographic.invert([x, y]);

                    // Source and target image indices
                    var targetIndex,
                        sourceIndex,
                        pixels;

                    // Check if the inverse projection is defined for the current pixel
                    if ((!isNaN(coords[0])) && (!isNaN(coords[1]))) {

                        // Compute the pixel coordinates in the source projection
                        pixels = equirectangular(coords);

                        // Compute the index of the red channel of the source and target pixels
                        sourceIndex = 4 * (Math.floor(pixels[0]) + w * Math.floor(pixels[1]));
                        sourceIndex = sourceIndex - (sourceIndex % 4);

                        targetIndex = 4 * (x + w * y);
                        targetIndex = targetIndex - (targetIndex % 4);

                        // Copy the red, green, blue and alpha channels
                        targetData[targetIndex]     = sourceData[sourceIndex];
                        targetData[targetIndex + 1] = sourceData[sourceIndex + 1];
                        targetData[targetIndex + 2] = sourceData[sourceIndex + 2];
                        targetData[targetIndex + 3] = sourceData[sourceIndex + 3];
                    }

                }
            }

            // Clear the canvas element and copy the target image
            context.clearRect(0, 0, image.width, image.height);
            context.putImageData(target, 0, 0);
        }

    })();
</script>
