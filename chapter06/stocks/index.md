---
layout: basic
title: Stock Explorer
---

<!-- Include the Backbone Libraries -->
<script src="/assets/js/lib/jquery.min.js"></script>
<script src="/assets/js/lib/underscore.js"></script>
<script src="/assets/js/lib/backbone.js"></script>
<script src="/assets/js/lib/d3.min.js"></script>
<script src="/chapter06/stocks/js/lib/stockcharts.js"></script>

<div>
    <link rel="stylesheet" href="/chapter06/stocks/css/stock.css"/>
</div>

<!-- Templates  -->
<script type="text/template" id="stock-selector-tpl">
    <select id="stock-selector">
        <% _.each(stocks, function(s) { %>
            <option value="<%= s.symbol %>"><%= s.symbol %></option>
        <% }); %>
    </select>
</script>


<!-- Application Container -->

<div id="stock-app">
    <div>
        <div id="stock-control"></div>
        <div id="stock-title"></div>
    </div>
    <div class="charts">
        <div id="stock-detail"></div>
        <div id="stock-context"></div>
    </div>
</div>


<!-- Application Components -->
<script src="/chapter06/stocks/js/models/app.js"></script>
<script src="/chapter06/stocks/js/models/stock.js"></script>
<script src="/chapter06/stocks/js/collections/stocks.js"></script>
<script src="/chapter06/stocks/js/views/stocks.js"></script>
<script src="/chapter06/stocks/js/views/app.js"></script>
<script src="/chapter06/stocks/js/routers/router.js"></script>
<script src="/chapter06/stocks/js/app.js"></script>
