---
layout: basic
title: 9.4 Courses
---

<link rel="stylesheet" href="{{site.baseurl}}/chapter09/css/dashboard.css">

<script src="{{site.baseurl}}/chapter09/js/dashboard.js"></script>
<script src="{{site.baseurl}}/chapter09/js/gendata.js"></script>
<script src="{{site.baseurl}}/chapter09/js/gendata.js"></script>

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Courses Section</h2>

<div class="col-md-6" id='courses-section'>
    <table class="table"><thead></thead><tbody></tbody></table>
</div>

<script>
    var thead = d3.select('#courses-section').select('thead'),
        tbody = d3.select('#courses-section').select('tbody');

    // Table Head
    var trHead = thead.append('tr');
    trHead.selectAll('th')
        .data(['Course', 'Average Assessment Scores', 'Avgerage Score', ''])
        .enter()
        .append('th')
        .html(function(d) { return d; });

    var tr = tbody.selectAll('tr')
            .data(classData.classes)
            .enter()
            .append('tr');

    // Course Name
    tr.append('td')
        .html(function(d) { console.log(d); return d.name; });

    // Average Scores
    var scores = dashboard.chart.scoreChart()
        .height(30)
        .from(classData.from)
        .to(classData.to);

    tr.append('td').selectAll('div')
        .data(function(d) { console.log(d); return [d.avgScores]; })
        .enter()
        .append('div')
        .call(scores);

    var bullet = dashboard.chart.bulletChart()
        .height(30)
        .width(200)
        .levels([25, 75, 100]);

    tr.append('td').selectAll('div')
        .data(function(d) { return [d.avgScore]; })
        .enter()
        .append('div')
        .call(bullet);
</script>