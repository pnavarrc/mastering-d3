/* globals d3:false  */

var dashboard = {
    version: '0.1.0',  // semver
    chart: {}
};

// Score Chart
dashboard.chart.scoreChart = function() {
    'use strict';

    // Component Attributes
    var me = {
        width: 200,
        height: 100,
        margin: {top: 4, right: 4, bottom: 4, left: 4},
        from: new Date('2013-01-01'),
        to: new Date('2013-12-31')
    };

    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]),
                width = me.width - me.margin.left - me.margin.right,
                height = me.height - me.margin.top - me.margin.bottom;

            svg.enter().append('svg').call(chart.init);

            var gbackg = svg.select('g.background'),
                gchart = svg.select('g.score-chart');

            // Scales
            var xScale = d3.time.scale()
                .domain([me.from, me.to])
                .range([0, width]);

            var yScale = d3.scale.linear()
                .domain([0, 100])
                .range([height, 0]);

            var line = d3.svg.line()
                .x(function(d) { return xScale(d.date); })
                .y(function(d) { return yScale(d.score); });

            gbackg.append('rect')
                .attr('width', width)
                .attr('height', height)
                .attr('class', 'score-bg');

            gbackg.append('rect')
                .attr('y', yScale(75))
                .attr('width', width)
                .attr('height', height - yScale(75))
                .attr('class', 'score-high');

            gbackg.append('rect')
                .attr('y', yScale(25))
                .attr('width', width)
                .attr('height', height - yScale(25))
                .attr('class', 'score-medium');

            var scoreLine = gchart.selectAll('path.score-line')
                .data([data])
                .enter()
                .append('path')
                .attr('class', 'score-line');

            scoreLine.attr('d', line);

        });
    }

    // Component Initialization
    chart.init = function(selection) {
        selection.each(function(data) {

            var margin = me.margin,
                width = me.width - margin.left - margin.right,
                height = me.height - margin.top - margin.bottom;

            var svg = d3.select(this)
                .attr('width', me.width)
                .attr('height', me.height);

            var gcont = svg.append('g')
                .attr('class', 'chart-scores');

            gcont.append('g')
                .attr('class', 'background')
                .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

            var gchart = gcont.append('g')
                .attr('class', 'score-chart')
                .attr('transform', 'translate(' + [margin.left, margin.top] + ')');
        });
    };

    // Generate Accessor Methods
    function createAccessor(attr) {
        return function(value) {
            if (!arguments.length) { return me[attr]; }
            me[attr] = value;
            return chart;
        };
    }

    for (var attr in me) {
        if ((!chart[attr]) && (me.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};


// Absence Chart
dashboard.chart.absenceChart = function() {
    'use strict';

    // Component Attributes
    var me = {
        width: 200,
        height: 20,
        margin: {top: 2, right: 2, bottom: 2, left: 2},
        from: new Date('2013-01-01'),
        to: new Date('2013-12-31')
    };

    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]),
                width = me.width - me.margin.left - me.margin.right,
                height = me.height - me.margin.top - me.margin.bottom;

            svg.enter().append('svg').call(chart.init);

            var dates = d3.time.days(me.from, me.to);

            // Scales
            var xScale = d3.time.scale()
                .domain([me.from, me.to])
                .range([0, width]);

            // Chart
            var gchart = svg.select('g.absence-chart'),
                bgBars = gchart.selectAll('rect.bg-bar').data(dates),
                bars = gchart.selectAll('rect.bar').data(data);

            bgBars.enter().append('rect')
                .attr('class', 'bg-bar')
                .attr('x', function(d) { return xScale(d); })
                .attr('y', 0)
                .attr('height', height)
                .attr('width', 1);

            bars.enter().append('rect')
                .attr('class', 'bar')
                .attr('x', function(d) { return xScale(d); })
                .attr('y', 0)
                .attr('height', height)
                .attr('width', 1);
        });
    }

    // Component Initialization
    chart.init = function(selection) {
        selection.each(function(data) {

            var margin = me.margin,
                width = me.width - margin.left - margin.right,
                height = me.height - margin.top - margin.bottom;

            var svg = d3.select(this)
                .attr('width', me.width)
                .attr('height', me.height);

            var gcont = svg.append('g')
                .attr('class', 'chart-absences');

            var gchart = gcont.append('g')
                .attr('class', 'absence-chart')
                .attr('transform', 'translate(' + [margin.left, margin.top] + ')');
        });
    };

    // Generate Accessor Methods
    function createAccessor(attr) {
        return function(value) {
            if (!arguments.length) { return me[attr]; }
            me[attr] = value;
            return chart;
        };
    }

    for (var attr in me) {
        if ((!chart[attr]) && (me.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};

dashboard.chart.studentsTable = function() {
    'use strict';

    // Component Attributes
    var me = {
        from: new Date('2013-01-01'),
        to: new Date('2013-12-31'),
        headers: [
            'Name',
            'Absences',
            'Art',
            'Math',
            'History',
            'Literature',
            'Avg'
        ],
        height: 22,
        absencesChart: dashboard.chart.absenceChart()
            .width(80),
        scoresChart: dashboard.chart.scoreChart()
            .width(80)
    };

    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                table = div.selectAll('table.table-responsive').data([data]);

            table.enter().append('table')
                .attr('class', 'table-responsive')
                .call(chart.init);

            var tbody = table.select('tbody'),
                tr = tbody.selectAll('tr')
                    .data(function(d) { return d; });

            tr.enter().append('tr');

            me.absencesChart.height(me.height);
            me.scoresChart.height(me.height);


            // Student Name
            tr.append('td').html(function(d) { return d.name; });

            me.absencesChart
                .from(me.from)
                .to(me.to);

            // Absences
            tr.append('td').selectAll('div.absences')
                .data(function(d) { return [d.absences]; })
                .enter()
                .append('div')
                .attr('class', 'absences')
                .call(me.absencesChart);

            // Scores
            var tdScore = tr.selectAll('td.score')
                .data(function(d) {
                    return d.classes.map(function(d) { return d.scores; });
                })
                .enter()
                .append('td')
                .attr('class', 'score');

            me.scoresChart.from(me.from).to(me.to);

            tdScore.call(me.scoresChart);

            tr.append('td')
                .attr('class', 'avg-score')
                .html(function(d) { return d3.format('%,.1')(0.01 * d.avgScore); });
        });
    }

    // Component Initialization
    chart.init = function(selection) {
        selection.each(function(data) {

            var table = d3.select(this),
                tHead = table.append('thead');

            var tBody = table.selectAll('tbody')
                .data([data])
                .enter()
                .append('tbody');

            // Table Header
            var trHead = tHead.selectAll('tr').data([data])
                .enter().append('tr');

            trHead.selectAll('th')
                .data(me.headers)
                .enter()
                .append('th')
                .classed('text-center', function(d, i) { return i >= 2; })
                .html(function(d) { return d; });

        });
    };

    // Generate Accessor Methods
    function createAccessor(attr) {
        return function(value) {
            if (!arguments.length) { return me[attr]; }
            me[attr] = value;
            return chart;
        };
    }

    for (var attr in me) {
        if ((!chart[attr]) && (me.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};


// Bullet Chart
dashboard.chart.bulletChart = function() {
    'use strict';

    // Component Attributes
    var me = {
        width: 300,
        height: 40,
        margin: {top: 4, right: 4, bottom: 4, left: 4},
        bullet: {height: 10},
        levels: [25, 50, 75, 100]
    };

    function chart(selection) {
        selection.each(function(data) {

            // Select the container element and bind the data to the SVG selection
            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]),
                margin = me.margin,
                width = me.width - me.margin.left - me.margin.right,
                height = me.height - me.margin.top - me.margin.bottom;

            // Initialize the chart on enter
            svg.enter().append('svg').call(chart.init);

            // Compute the horizontal scale
            var xScale = d3.scale.linear()
                .domain([0, 100])
                .range([0, width]);

            // Select the background and bullet groups
            var gbackg = svg.select('g.background'),
                gbullet = svg.select('g.bullet');

            gbullet.append('rect')
                .attr('class', 'bullet-core')
                .attr('width', function(d) { return xScale(d); })
                .attr('height', me.bullet.height);

            // Background stripes
            gbackg.selectAll('rect.bullet-level')
                .data(me.levels.sort(function(a, b) { return b - a; }))
                .enter()
                .append('rect')
                .attr('class', function(d, i) { return 'bullet-level bullet-level-' + i; })
                .attr('width', function(d) { return xScale(d); })
                .attr('height', height);

        });
    }

    // Component Initialization
    chart.init = function(selection) {
        selection.each(function(data) {

            var margin = me.margin,
                width = me.width - margin.left - margin.right,
                height = me.height - margin.top - margin.bottom,
                cy = 0.5 * (height - me.bullet.height),
                svg = d3.select(this);

            // Set the width and height of the SVG element
            svg.attr('width', me.width).attr('height', me.height);

            // Create and translate a group to contain the inner elements
            // of the bullet chart.
            var gcont = svg.append('g')
                .attr('class', 'bullet-chart')
                .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

            // Group for the background areas
            var gbackg = gcont.append('g')
                .attr('class', 'background');

            // Create a group for the bullet and center it vertically
            var gchart = gcont.selectAll('g.bullet')
                .data([data])
                .enter()
                .append('g')
                .attr('class', 'bullet')
                .attr('transform', 'translate(' + [0, cy] + ')');
        });
    };

    // Generate Accessor Methods
    function createAccessor(attr) {
        return function(value) {
            if (!arguments.length) { return me[attr]; }
            me[attr] = value;
            return chart;
        };
    }

    for (var attr in me) {
        if ((!chart[attr]) && (me.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};


dashboard.chart.tableCourses = function() {
    'use strict';

    // Component Attributes
    var me = {
        header: ['Course', 'Avg. Scores', 'Avg. Score', ''],
        from: new Date('2013-01-01'),
        to: new Date('2013-12-31'),
        height: 26,
        levels: [25, 75, 100]
    };

    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                table = div.selectAll('table.table').data([data]);

            table.enter().append('table').call(chart.init);

            var thead = table.select('thead'),
                tbody = table.select('tbody');

            // Table Head
            var trHead = thead.append('tr');

            trHead.selectAll('th')
                .data(me.header)
                .enter()
                .append('th')
                .html(function(d) { return d; });

            var tr = tbody.selectAll('tr').data(data)
                    .enter()
                    .append('tr');

            // Course Name
            tr.append('td').html(function(d) { return d.name; });

            // Average Scores
            var scores = dashboard.chart.scoreChart()
                .height(me.height)
                .from(me.from)
                .to(me.to);

            tr.append('td').selectAll('div')
                .data(function(d) { return [d.avgScores]; })
                .enter()
                .append('div')
                .call(scores);

            var bullet = dashboard.chart.bulletChart()
                .height(me.height)
                .width(150)
                .bullet({height: 6})
                .levels(me.levels);

            tr.append('td').selectAll('div')
                .data(function(d) { return [d.avgScore]; })
                .enter()
                .append('div')
                .call(bullet);

            tr.append('td')
                .html(function(d) { return d3.format(',.1%')(d.avgScore / 1e2); });
        });
    }

    // Component Initialization
    chart.init = function(selection) {
        selection.each(function(data) {

            var table = d3.select(this)
                .attr('class', 'table table-condensed table-fluid');

            table.append('thead');
            table.append('tbody');
        });
    };

    // Generate Accessor Methods
    function createAccessor(attr) {
        return function(value) {
            if (!arguments.length) { return me[attr]; }
            me[attr] = value;
            return chart;
        };
    }

    for (var attr in me) {
        if ((!chart[attr]) && (me.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};

dashboard.chart.tableClass = function() {
    'use strict';

    // Component Attributes
    var me = {
        bullet: dashboard.chart.bulletChart(),
        levels: [25, 75, 100],
        height: 22,
        header: ['Week', 'Average Score', '', 'Absences'],
        from: new Date('2013-01-01'),
        to: new Date('2013-12-31'),
        rows: 6
    };


    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                table = div.selectAll('table.table').data([data]);

            table.enter().append('table').call(chart.init);

            data.sort(function(a, b) { return b.date - a.date; });

            var items = data.slice(0, me.rows);


            var thead = table.select('thead'),
                tbody = table.select('tbody'),
                tr = tbody.selectAll('tr').data(items)
                    .enter()
                    .append('tr');

            thead.append('tr').selectAll('th')
                .data(me.header)
                .enter()
                .append('th')
                .html(function(d) { return d; });

            me.bullet
                .height(me.height)
                .bullet({height: 6})
                .levels(me.levels);

            // Date
            tr.append('td').html(function(d) { return d.date.toDateString(); });

            // Score Chart
            tr.append('td').selectAll('div')
                .data(function(d) { return [d.score]; })
                .enter()
                .append('div')
                .call(me.bullet);

            tr.append('td')
                .html(function(d) { return d3.format('%,.f')(d.score / 1e2); });

            tr.append('td')
                .attr('class', 'text-right')
                .html(function(d) { return d.absents; });
        });
    }

    // Component Initialization
    chart.init = function(selection) {
        selection.each(function(data) {

            var table = d3.select(this)
                .attr('class', 'table table-condensed table-fluid');

            table.append('thead');
            table.append('tbody');

        });
    };

    // Generate Accessor Methods
    function createAccessor(attr) {
        return function(value) {
            if (!arguments.length) { return me[attr]; }
            me[attr] = value;
            return chart;
        };
    }

    for (var attr in me) {
        if ((!chart[attr]) && (me.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};

