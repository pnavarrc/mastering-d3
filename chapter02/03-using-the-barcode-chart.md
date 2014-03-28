---
layout: default
title: "2.3 Using the Barcode Chart"
---

<div>
    <style>
        .chart-example {
            margin: 20px;
            padding: 10px;
            border: solid 1px #babdb6;
        }

        /* Chapter 2 */
        .data-item {
            border: solid 1px black;
            margin: 4px;
            padding: 4px;
            background-color: #eeeeec;
        }
    </style>
</div>

<script>
    // Data Generation Functions
    // -------------------------

    // Compute a random interval using an Exponential Distribution of
    // parameter lambda = (1 / avgSeconds).
    function randomInterval(avgSeconds) {
        return Math.floor(-Math.log(Math.random()) * 1000 * avgSeconds);
    };

    // Create or extend an array of increasing dates by adding a random
    // time interval using an exponential distribution.
    function addData(data, numItems, avgSeconds) {
        // Compute the most recent time in the data array. If the array is
        // empty, uses the current time.
        var n = data.length,
            t = (n > 0) ? data[n - 1].date : new Date();

        // Append items with increasing times in the data array.
        for (var k = 0; k < numItems; k += 1) {
            t = new Date(t.getTime() + randomInterval(avgSeconds));
            data.push({date: t});
        }

        return data;
    }
</script>


<h1 class="section-title">{{ page.title }}</h1>

<div class="chart-example" id="chart"></div>
<script src="{{ site.baseurl }}/chapter02/barcode.js"></script>
<script>

    // Dataset
    // -------

    // Generate a dataset with sample data.
    var data = [
        {name: 'AAPL', mentions: addData([], 850,  2 * 60), byHour: 34.3},
        {name: 'MSFT', mentions: addData([], 800,  5 * 60), byHour: 11.1},
        {name: 'GOOG', mentions: addData([], 630,  3 * 60), byHour: 19.2},
        {name: 'NFLX', mentions: addData([], 310, 10 * 60), byHour:  6.7}
    ];

    // Barcode Chart Configuration
    // ---------------------------

    // Create and configure an instance of the barcode chart.
    var barcode = barcodeChart()
        .width(480)
        .height(25)
        .margin({top: 1, right: 1, bottom: 1, left: 1});

    // Table Structure
    // ---------------

    // Create a table element.
    var table = d3.select('#chart').selectAll('table')
        .data([data])
        .enter()
        .append('table')
        .attr('class', 'table table-condensed');

    // Append the table header and body.
    var tableHead = table.append('thead'),
        tableBody = table.append('tbody');

    // Add the table header content.
    tableHead.append('tr').selectAll('th')
        .data(['Name', 'Today Mentions', 'mentions/hour'])
        .enter()
        .append('th')
        .text(function(d) { return d; });

    // Table Content
    // -------------

    // Add the table body rows.
    var rows = tableBody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

    // Add the stock name cell.
    rows.append('td')
        .text(function(d) { return d.name; });

    // Add the barcode chart.
    rows.append('td')
        .datum(function(d) { return d.mentions; })
        .call(barcode);

    // Add the number of mentions by hour, aligned to the right.
    rows.append('td').append('p')
        .attr('class', 'pull-right')
        .text(function(d) { return d.byHour; });

</script>
