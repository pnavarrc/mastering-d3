---
layout: default
title: 10.1 Countries GeoJSON File
---

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">GeoJSON file</h2>

<div>
    <pre id="json"></pre>
</div>

<script type="text/javascript">

    var geoJsonUrl = '{{site.baseurl}}/chapter10/data/countries.geojson';

    d3.json(geoJsonUrl, function(error, geodata) {

        // Handles errors getting and parsing the data
        if (error) { return error; }

        // Dumps the content of the GeoJSON file in the pre element
        d3.select('pre#json').html(JSON.stringify(geodata, null, 4));
    });
</script>
