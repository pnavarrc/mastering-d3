---
layout: default
title: 10.5 Using Mapbox
---

<h1 class="section-title">{{page.title}}</h1>

<script src='https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css' rel='stylesheet' />


<div>
    <style>
        .map-container {
            position: relative;
            width: 600px;
            height: 400px;
        }

        #map01 {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
        }

        #map02 {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
        }

        .city {
            fill: #4ECDC4;
            fill-opacity: 0.3;
        }

        .highlight {
            fill-opacity: 0.8;
        }

    </style>
</div>


<h2 class="section-subtitle">Simple Map</h2>

<div class="map-container">
    <div id="map01"></div>
</div>

<script>
    // Declare the map ID, the center and zoom level of the map view
    var mapID = 'pnavarrc.hhm52af9',
        center = [12.526, -69.997],
        zoomLevel = 11;

    // Create an instance of the map and render it in the container div
    var map01 = L.mapbox.map('map01', mapID)
        .setView(center, zoomLevel);
</script>


<h2 class="section-subtitle">Adding a D3 Layer</h2>

<div class="map-container">
    <div id="map02"></div>
</div>

<script>
    //  Create an instance of the map and render it in the #map02 div.
    var map02 = L.mapbox.map('map02', mapID)
        .setView(center, zoomLevel);


    // Create a class that implements the Layer interface
    var D3Layer = L.Class.extend({

        initialize: function(data) {
            this._data = data;
        },

        onAdd: function(map) {

            // Create SVG elements under the overlay pane
            var div = d3.select(map.getPanes().overlayPane),
                svg = div.selectAll('svg.point').data(this._data);

            // Stores the latitude and longitude of each city
            this._data.forEach(function(d) {
                d.LatLng = new L.LatLng(d.coordinates[0], d.coordinates[1]);
            });

            // Create a scale for the population
            var rScale = d3.scale.sqrt()
                .domain([0, d3.max(this._data, function(d) { return d.population; })])
                .range([0, 35]);

            // Append the SVG containers for the bubbles
            svg.enter().append('svg')
                .attr('width', function(d) { return 2 * rScale(d.population); })
                .attr('height', function(d) { return 2 * rScale(d.population); })
                .attr('class', 'point leaflet-zoom-hide')
                .style('position', 'absolute');

            // Append the bubbles (finally!)
            svg.append('circle')
                .attr('cx', function(d) { return rScale(d.population); })
                .attr('cy', function(d) { return rScale(d.population); })
                .attr('r', function(d) { return rScale(d.population); })
                .attr('class', 'city')
                .on('mouseover', function(d) {
                    d3.select(this).classed('highlight', true);
                })
                .on('mouseout', function(d) {
                    d3.select(this).classed('highlight', false);
                });


            function updateBubbles() {
                svg
                    .style('left', function(d) {
                        var dx = map.latLngToLayerPoint(d.LatLng).x;
                        return (dx - rScale(d.population)) + 'px';
                    })
                    .style('top', function(d) {
                        var dy = map.latLngToLayerPoint(d.LatLng).y;
                        return (dy - rScale(d.population)) + 'px';
                    });
            }

            map.on('viewreset', updateBubbles);
            updateBubbles();
        },

        onRemove: function(map) {
            var div = d3.select(map.getPanes().overlayPane);
            div.selectAll('svg.point').remove();
        }
    });


// Retrieve the dataset of cities of Aruba
d3.json('{{site.baseurl}}/chapter10/data/aruba-cities.json', function(error, data) {

    // Handle errors getting or parsing the data
    if (error) { return error; }

    // Create a layer with the cities data
    map02.addLayer(new D3Layer(data.cities));
});


</script>

