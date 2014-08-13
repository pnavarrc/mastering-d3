/* globals Backbone:false, _:false, d3:false */

var app = app || {};

// Application Model
app.StockAppModel = Backbone.Model.extend({

    // Compiled template for the stock data url
    urlTemplate: _.template('/chapter06/stocks/data/<%= url %>'),

    // Default values
    defaults: {
        stock: null,
        from: null,
        to: null,
        data: []
    },

    initialize: function() {
        this.on('change:stock', this.fetchData);
        this.listenTo(app.Stocks, 'reset', this.fetchData);
    },

    getStock: function() {

        var symbol = this.get('stock'),
            stock = app.Stocks.get(symbol);

        return stock;
    },

    fetchData: function() {

        var that = this,
            stock = this.getStock(),
            url,
            dateExtent;

        if (stock) {

            url = this.urlTemplate(stock.toJSON());

            d3.json(url, function(error, data) {

                if (error) { return error; }

                data.values.forEach(function(d) {
                    d.date = new Date(d.date);
                    d.price = +d.price;
                });

                // Set the stock data
                that.set('data', data.values);

                // Set the initial time interval, if not set
                if ((!that.get('from')) || (!that.get('to'))) {
                    dateExtent = d3.extent(data.values, function(d) {
                        return d.date;
                    });

                    that.set({from: dateExtent[0], to: dateExtent[1]});
                }
            });
        }
    }
});