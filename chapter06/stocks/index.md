---
layout: section
title: Stock Explorer
---

<link rel="stylesheet" href="{{ site.baseurl }}/chapter06/stocks/css/stock.css">

<!-- Include the Backbone Libraries -->
<script src="{{ site.baseurl }}/js/lib/jquery.js"></script>
<script src="{{ site.baseurl }}/js/lib/underscore.js"></script>
<script src="{{ site.baseurl }}/js/lib/backbone.js"></script>
<script src="{{ site.baseurl }}/chapter06/stockcharts.js"></script>

<!-- Templates  -->
<script type="text/template" id="stock-selector-tpl">
    <select id="stock-selector">
        <% _.each(stocks, function(s) { %>
            <option value="<%= s.symbol %>"><%= s.symbol %></option>
        <% }); %>
    </select>
</script>

<!-- Metrics Template -->
<script type="text/template" id="stock-metrics-tpl">

    <p> Period </p>

    <table class="pure-table">
            <thead>
            <tr>
                <th></th><th>Date</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>From</td><td><%= from %></td>
            </tr>
            <tr>
                <td>To</td><td><%= to %></td>
            </tr>
        </tbody>
    </table>

    <p>Metrics</p>

    <table class="pure-table pure-table-horizontal">
        <thead>
            <tr>
                <th></th><th>Date</th><th>Price</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Min</td><td><%= min.date %></td><td><%= min.price %></td>
            </tr>
            <tr>
                <td>Max</td><td><%= max.date %></td><td><%= max.price %></td>
            </tr>
        </tbody>
    </table>


</script>


<!-- Application Container -->
<div id="stock-app">
    <div class="pure-g-r">
        <div class="pure-u-4-5">
            <div id="stock-title"></div>
            <div id="stock-detail"></div>
            <div id="stock-context"></div>
        </div>
        <div class="pure-u-1-5">
            <div id="stock-control"></div>
            <div id="stock-metrics"></div>
        </div>
    </div>
</div>


<!-- Application Components -->
<script src="{{ site.baseurl }}/chapter06/stocks/js/models/app.js"></script>
<script src="{{ site.baseurl }}/chapter06/stocks/js/models/stock.js"></script>
<script src="{{ site.baseurl }}/chapter06/stocks/js/collections/stocks.js"></script>
<script src="{{ site.baseurl }}/chapter06/stocks/js/views/stocks.js"></script>
<script src="{{ site.baseurl }}/chapter06/stocks/js/views/app.js"></script>


<script>
    // Create a Stock Collection instance
    app.Stocks = new app.StockList();
</script>

<script>
    app.StockRouter = Backbone.Router.extend({

        routes: {
            'stock/:stock': 'stock',
        },

        initialize: function(attributes) {
            this.model = attributes.model;
            this.listenTo(this.model, 'change:stock', function(m) {
                this.stock(m.get('stock'));
            });
        },

        stock: function(symbol) {
            this.model.set('stock', symbol);
            this.navigate('stock/' + symbol, {trigger: true});
        }
    });


    app.appModel = new app.StockAppModel();
    app.appView = new app.StockAppView({model: app.appModel, el: 'div#stock-app'});
    var router = new app.StockRouter({model: app.appModel});
    Backbone.history.start();
</script>
