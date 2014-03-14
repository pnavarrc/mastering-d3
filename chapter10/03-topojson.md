---
layout: main
title: "10.3 Reading the TopoJSON File"
---

{{page.title}}
==============

<div>
    <pre id="json"></pre>
</div>

<script type="text/javascript">

    var url = '{{site.baseurl}}/chapter10/data/greenland.topojson';

    d3.json(url, function(error, geodata) {

        // Handles errors getting and parsing the data
        if (error) { return error; }

        // Dumps the content of the TopoJSON file in the pre element
        d3.select('pre#json').html(JSON.stringify(geodata, null, 4));
    });
</script>