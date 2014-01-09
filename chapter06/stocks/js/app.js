/* globals app:true, Backbone:false */

var app = app || {};

// Create an instance of the stocks collection
app.Stocks = new app.StockList();

// Create the application model instance
app.appModel = new app.StockAppModel();

// Create the application view
app.appView = new app.StockAppView({model: app.appModel, el: 'div#stock-app'});

// Initializes the router
var router = new app.StockRouter({model: app.appModel});
Backbone.history.start();