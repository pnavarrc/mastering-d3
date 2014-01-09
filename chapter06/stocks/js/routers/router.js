var app = app || {};

app.StockRouter = Backbone.Router.extend({

    // Define the application routes
    routes: {
        'stock/:stock': 'setStock',
        'stock/:stock/from/:from/to/:to': 'setState'
    },

    // Listen to model changes to update the url route
    initialize: function(attributes) {
        this.model = attributes.model;

        this.listenTo(this.model, 'change', function(m) {
            if (m.get('from') && m.get('to')) {
                this.setState(m.get('stock'), m.get('from'), m.get('to'));
            } else {
                this.setStock(m.get('stock'));
            }
        });
    },

    // Set the application stock and updates the url
    setStock: function(symbol) {
        var urlTpl = _.template('stock/<%= stock %>');

        this.model.set({stock: symbol});
        this.navigate(urlTpl({stock: symbol}), {trigger: true});
    },

    // Set the application state and updates the url
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