---
layout: default
title: Stock Charts
---

<script src="/chapter06/stocks/js/lib/stockcharts.js"></script>

<div>
    <style>
        .axis path, line{
            fill: none;
            stroke: #222;
            shape-rendering: crispEdges;
        }

        .axis text {
            font-size: 11px;
        }

        .stock-area {
            fill: #ddd;
            stroke: #aaa;
            stroke-width: 1;
        }

        .brush rect {
            fill: #204a87;
            stroke: #bbb;
            stroke-width: 0.5;
            stroke-opacity: 0.4;
            fill-opacity: 0.2;
        }
    </style>
</div>


<h2 class="section-subtitle">Stock Title Chart</h2>

<div id="chart01"></div>

<script>
    // Create and configure the chart
    var titleChart = stockTitleChart()
        .title(function(d) { return d.symbol + ' ' + d.name; });

    // Select the container element, bind the dataset and invoke the chart
    d3.select('div#chart01')
        .data([{symbol: 'AAPL', name: 'Apple Inc.'}])
        .call(titleChart);
</script>

<h2 class="section-subtitle">Stock Area Chart: Time Extent</h2>

<div id="chart03"></div>

<script>
    var detailAreaChart = stockAreaChart()
        .value(function(d) { return d.price; })
        .brush(false);

    d3.json('/chapter06/stocks/data/aapl.json', function(error, json) {

        if (error) { return error; }

        var data = json.values,
            from = new Date(data[0].date),
            to = new Date(data[data.length - 1].date);

        detailAreaChart.timeExtent([from, to]);

        d3.select('div#chart03')
            .data([data])
            .call(detailAreaChart);
    });
</script>


<h2 class="section-subtitle">Stock Area Chart: Selecting the Time Interval</h2>

<div id="chart02"></div>

<script>
    var contextAreaChart = stockAreaChart()
        .height(60)
        .value(function(d) { return d.price; })
        .yaxis(false)
        .brushListener(function(extent) {
            console.log(extent);
        });

    d3.json('/chapter06/stocks/data/aapl.json', function(error, json) {

        if (error) {
            throw error;
        }

        d3.select('div#chart02')
            .data([json.values])
            .call(contextAreaChart);
    });
</script>




