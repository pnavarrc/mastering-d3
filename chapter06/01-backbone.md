---
layout: section
title: Backbone Essentials
---

<script src="{{ site.baseurl }}/js/lib/jquery.js"></script>
<script src="{{ site.baseurl }}/js/lib/underscore.js"></script>
<script src="{{ site.baseurl }}/js/lib/backbone.js"></script>

# {{ page.title }}

<div id="chart01"></div>

<script>
    function itemChart() {

        function chart(selection) {
            selection.each(function(data) {

                d3.select(this).text(data);

            });
        }

        return chart;
    }
</script>


<script>

    var StockModel = Backbone.Model.extend({
        defaults: function() {
            return {
                stock: 'AAPL',
                from: new Date('2013/01/01'),
                to: new Date('2013/01/31')
            };
        }
    });

    var model = new StockModel({stock: 'MSFT'});


    var StockView = Backbone.View.extend({

        chart: itemChart(),

        initialize: function() {

            d3.select('#chart01').selectAll('p')
                .data([this.model.get('stock')])
                .enter()
                .append('p')
                .call(this.chart);

            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            console.log('render stock: ' + this.model.get('stock'));

            d3.select('#chart01')
                .data([this.model.get('stock')])
                .call(this.chart);

        }
    });

    var view = new StockView({model: model});

</script>

