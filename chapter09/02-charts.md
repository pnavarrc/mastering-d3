---
layout: default
title: 9.2 Charts
---

<link rel="stylesheet" href="{{site.baseurl}}/chapter09/css/dashboard.css">

<script src="{{site.baseurl}}/chapter09/js/dashboard.js"></script>
<script src="{{site.baseurl}}/chapter09/js/gendata.js"></script>

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Absences</h2>

<div class="row">
    <div class="col-md-6">
        <table class="table table-condensed table-fluid">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Absences</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Adam Lewis</td>
                    <td><div id="absences-chart"></div></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<script>
    // Create and configure the chart
    var absences = dashboard.chart.absenceChart()
        .width(200)
        .height(20)
        .from(classData.from)
        .to(classData.to);

    // Select the container element and bind the example data
    d3.select('#absences-chart')
        .data([classData.students[0].absences])
        .call(absences);
</script>


<h2 class="section-subtitle">Scores</h2>

<div class="row">
    <div class="col-md-10">
        <table class="table table-condensed table-fluid">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Art</th>
                    <th>Mathematics</th>
                    <th>Literature</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Adam Lewis</td>
                    <td><div id="score-chart-1"></div></td>
                    <td><div id="score-chart-2"></div></td>
                    <td><div id="score-chart-3"></div></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>


<script>
    // Create and configure the score charts
    var score = dashboard.chart.scoreChart()
        .width(200)
        .height(60)
        .from(classData.from)
        .to(classData.to);


    // Select the container elements, bind the data and invoke the score chart
    d3.select('#score-chart-1')
        .data([classData.students[0].classes[0].scores])
        .call(score);

    d3.select('#score-chart-2')
        .data([classData.students[0].classes[1].scores])
        .call(score);

    d3.select('#score-chart-3')
        .data([classData.students[0].classes[2].scores])
        .call(score);
</script>

<h2 class="section-subtitle">Bullet Chart</h2>

<div id="bullet-example"></div>

<script>
    var bullet = dashboard.chart.bulletChart();

    d3.select('#bullet-example')
        .data([78.23])
        .call(bullet);
</script>

