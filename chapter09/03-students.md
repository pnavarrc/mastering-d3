---
layout: default
title: 9.3 Students
---

<link rel="stylesheet" href="{{site.baseurl}}/chapter09/css/dashboard.css">

<script src="{{site.baseurl}}/chapter09/js/dashboard.js"></script>
<script src="{{site.baseurl}}/chapter09/js/gendata.js"></script>

<h1 class="section-title">{{page.title}}</h1>

<h2 class="section-subtitle">Students Section</h2>

<div class="row">
    <div class="col-md-8">
        <div id="students"></div>
    </div>
    <div class="col-md-4"></div>
</div>

<script>
    // Create and configure an instance of the student's table
    var tableStudents = dashboard.chart.studentsTable()
        .from(classData.from)
        .to(classData.to);

    // Select the container element, bind the data and invoke the chart
    d3.select('div#students')
        .data([classData.students])
        .call(tableStudents);
</script>






