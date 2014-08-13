/* globals Backbone:false, _:false, d3:false */
var app = app || {};

// Stock Information Model
app.Stock = Backbone.Model.extend({

    // Default stock symbol, name and url
    defaults: { symbol: null, name: null, url: null },

    // The stock symbol is unique, it can be used as ID
    idAttribute: 'symbol'
});