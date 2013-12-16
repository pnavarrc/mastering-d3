---
layout: section
title: 1D Brushing
---

# {{ page.title }}

## Creating the Chart

<script>
    function areaChart() {

        // Chart Attributes
        var width = 600,
            height = 300,
            margin = {top: 20, right: 20, bottom: 20, left: 20};

        function chart(selection) {
            selection.each(function(data) {

            });
        }

        // Accessors Methods

        // Width Accessor
        chart.width = function(w) {
            if (!arguments.length) { return width; }
            width = w;
            return chart;
        };

        // Height Accessor
        chart.height = function(h) {
            if (!arguments.length) { return height; }
            height = h;
            return chart;
        };

        return chart;
    }
</script>