---
layout: section
title: Stock Charts
---

<script src="{{ site.baseurl }}/chapter06/stocks/js/lib/stockcharts.js"></script>

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


## Stock Title Chart

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

## Stock Area Chart: Selecting the Time Interval

<div id="chart02"></div>

<script>
    var contextAreaChart = stockAreaChart()
        .height(60)
        .value(function(d) { return +d.price; })
        .yaxis(false)
        .brushListener(function(extent) {
            console.log(extent);
        });

    d3.json('{{ site.baseurl }}/data/stocks.json', function(error, json) {

        if (error) { return error; }

        var stock = json.data[0];

        d3.select('div#chart02')
            .data([stock.values])
            .call(contextAreaChart);
    });
</script>


## Stock Area Chart: Time Extent

<div id="chart03"></div>

<script>
    var detailAreaChart = stockAreaChart()
        .value(function(d) { return +d.price; })
        .brush(false);

    d3.json('{{ site.baseurl }}/data/stocks.json', function(error, json) {

        if (error) { return error; }

        var data = json.data[0].values,
            from = new Date(data[20].date),
            to = new Date(data[100].date);

        detailAreaChart.timeExtent([from, to]);

        d3.select('div#chart03')
            .data([data])
            .call(detailAreaChart);
    });
</script>

