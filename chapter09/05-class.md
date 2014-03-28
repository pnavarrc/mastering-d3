---
layout: default
title: 9.5 Classes
---

<link rel="stylesheet" href="{{site.baseurl}}/chapter09/css/dashboard.css">

<script src="{{site.baseurl}}/assets/js/lib/d3.min.js"></script>
<script src="{{site.baseurl}}/chapter09/js/dashboard.js"></script>
<script src="{{site.baseurl}}/chapter09/js/gendata.js"></script>

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Class Section</h2>

<div class="col-md-8" id='class-section'>
    <table class="table">
        <thead>
            <tr>
                <th>Week</th>
                <th>Average Score</th>
                <th></th>
                <th>Absences</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>

<script>
    var bullet = dashboard.chart.bulletChart()
        .height(20)
        .bullet({height: 6})
        .levels([25, 75, 100]);

    var tbody = d3.select('#class-section').select('tbody');

    var tr = tbody.selectAll('tr')
        .data(classData.weeklyMetrics)
        .enter()
        .append('tr');

    tr.append('td').html(function(d) { return d.date.toDateString(); });

    tr.append('td').selectAll('div')
        .data(function(d) { return [d.score]; })
        .enter()
        .append('div')
        .call(bullet);

    tr.append('td').html(function(d) { return d3.format('%,.f')(d.score/100); });

    tr.append('td')
        .attr('class', 'text-right')
        .html(function(d) { return d.absents; });
</script>