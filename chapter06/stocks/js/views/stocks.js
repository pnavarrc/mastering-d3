/* globals Backbone:false, _:false, d3:false, stockTitleChart:false, $:false, stockAreaChart:false */

var app = app || {};

app.StockTitleView = Backbone.View.extend({

    chart: stockTitleChart()
        .title(function(d) {
            return _.template('<%= symbol %> <%= name %>', d);
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

        // Bind the brush listener function. The listener will update
        // the model time interval
        var self = this;
        this.chart.brushListener(function(extent) {
                self.model.set({from: extent[0], to: extent[1]});
            });

        // The view will render on changes to the model
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        // Update the time extent
        this.chart.timeExtent([this.model.get('from'), this.model.get('to')]);

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

app.StockMetricsView = Backbone.View.extend({

    template: _.template($('#stock-metrics-tpl').html()),

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {

        var from = this.model.get('from'),
            to = this.model.get('to'),
            data = this.model.get('data'),
            selectedData,
            min, max,
            vars = {
                from: '',
                to: '',
                min: {date: '', price: ''},
                max: {date: '', price: ''}
            };

        if (from && to) {
            vars.from = from.toLocaleDateString();
            vars.to = to.toLocaleDateString();

            selectedData = data.filter(function(d) {
                return (from <= d.date) && (d.date <= to);
            });

            min = _.min(selectedData, function(d) { return d.price; });
            max = _.max(selectedData, function(d) { return d.price; });

            min.date = new Date(min.date);
            max.date = new Date(max.date);

            vars.min.date = min.date.toLocaleDateString();
            vars.max.date = max.date.toLocaleDateString();
            vars.min.price = min.price;
            vars.max.price = max.price;
        }

        this.$el.html(this.template(vars));
        return this;
    }
});


