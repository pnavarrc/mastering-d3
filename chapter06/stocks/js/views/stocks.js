/* globals Backbone:false, _:false, d3:false, stockTitleChart:false, $:false, stockAreaChart:false */

var app = app || {};

app.StockTitleView = Backbone.View.extend({

    chart: stockTitleChart()
        .title(function(d) {
            return _.template('<%= name %>', d);
        }),

    initialize: function() {
        this.listenTo(this.model, 'change:stock', this.render);
        this.render();
    },

    render: function() {
        d3.select(this.el)
            .data([this.model.getStock().toJSON()])
            .call(this.chart);

        return this;
    }
});

// Stock Selector View
app.StockSelectorView = Backbone.View.extend({

    // Compiles the view template
    template: _.template($('#stock-selector-tpl').html()),

    // DOM Event Listeners
    events: {
        'change #stock-selector': 'stockSelected'
    },

    initialize: function() {
        // Listen for changes to the stock collection and the model
        this.listenTo(app.Stocks, 'reset', this.render);
        this.listenTo(this.model, 'change:stock', this.render);
        this.render();
    },

    render: function() {
        // Stores a reference to the 'this context'
        var self = this;

        // Render the select element
        this.$el.html(this.template({stocks: app.Stocks.toJSON()}));
        // Update the selected option
        $('#stock-selector option').each(function() {
            this.selected = this.value === self.model.get('stock');
        });

        return this;
    },

    stockSelected: function(e) {
        this.model.set('stock', e.target.value);
    }
});

app.StockContextView = Backbone.View.extend({

    // Initialize the stock area chart
    chart: stockAreaChart()
        .height(60)
        .margin({top: 5, right: 5, bottom: 20, left: 30})
        .date(function(d) { return new Date(d.date); })
        .value(function(d) { return +d.price; })
        .yaxis(false),

    // Render the view on model changes
    initialize: function() {
        // Get the width of the container element
        var width = parseInt(d3.select(this.el).style('width'), 10);

        // Bind the brush listener function. The listener will update
        // the model time interval
        var self = this;
        this.chart
            .width(width)
            .brushListener(function(extent) {
                self.model.set({from: extent[0], to: extent[1]});
            });

        // The view will render on changes to the model
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {

        // Update the time extent
        this.chart
            .timeExtent([this.model.get('from'), this.model.get('to')]);

        // Select the container element, bind the data and invoke the chart
        d3.select(this.el)
            .data([this.model.get('data')])
            .call(this.chart);

        return this;
    }
});


// Stock Detail Chart
app.StockDetailView = Backbone.View.extend({

    // Initialize the stock area chart
    chart: stockAreaChart()
        .margin({top: 5, right: 5, bottom: 30, left: 30})
        .value(function(d) { return +d.price; })
        .date(function(d) { return new Date(d.date); })
        .brush(false),

    // Render the view on model changes
    initialize: function() {
        var width = parseInt(d3.select(this.el).style('width'), 10);
        this.chart.width(width);
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {

        // Update the chart time extent
        var from = this.model.get('from'),
            to = this.model.get('to');

        this.chart.timeExtent([from, to]);

        // Select the container element, bind the data and invoke the chart
        d3.select(this.el)
            .data([this.model.get('data')])
            .call(this.chart);

        return this;
    }
});


