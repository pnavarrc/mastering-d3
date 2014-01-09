---
layout: spa
title: Stock Explorer
---

<!-- Include the Backbone Libraries -->
<script src="{{ site.baseurl }}/js/lib/jquery.js"></script>
<script src="{{ site.baseurl }}/js/lib/underscore.js"></script>
<script src="{{ site.baseurl }}/js/lib/backbone.js"></script>
<script src="{{ site.baseurl }}/js/lib/d3.min.js"></script>
<script src="{{ site.baseurl }}/chapter06/stocks/js/lib/stockcharts.js"></script>

<div>
    <link rel="stylesheet" href="{{ site.baseurl }}/chapter06/stocks/css/stock.css"/>
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

<div class="pure-g-r" id="stock-app">

    <div class="pure-u-1">
        <div id="stock-control"></div>
        <div id="stock-title"></div>
    </div>
    <div class="pure-u-1 charts">
        <div id="stock-detail"></div>
        <div id="stock-context"></div>
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
            'stock/:stock/from/:from/to/:to': 'setState'
        },

        initialize: function(attributes) {
            this.model = attributes.model;
            this.listenTo(this.model, 'change:from change:to', function(m) {
                this.setState(m.get('stock'), m.get('from'), m.get('to'));
            });
        },

        setState: function(symbol, from, to) {

            from = new Date(from),
            to = new Date(to);

            this.model.set({stock: symbol, from: from, to: to});

            var urlTpl = _.template('stock/<%= stock %>/from/<%= from %>/to/<%= to %>'),
                fromString = from.toDateString(),
                toString = to.toDateString();

            this.navigate(urlTpl({stock: symbol, from: fromString, to: toString}), {trigger: true});
        }

    });


    app.appModel = new app.StockAppModel();
    app.appView = new app.StockAppView({model: app.appModel, el: 'div#stock-app'});
    var router = new app.StockRouter({model: app.appModel});
    Backbone.history.start();
</script>
