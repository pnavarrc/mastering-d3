---
layout: default
title: Dashboard
---

<link rel="stylesheet" href="{{site.baseurl}}/chapter09/css/dashboard.css">
<script src="{{site.baseurl}}/chapter09/js/dashboard.js"></script>
<script src="{{site.baseurl}}/chapter09/js/gendata.js"></script>

<div>
    <style>
        .ds-section {
            border-top: solid 3px #777;
            background-color: #fafafa;
        }

        .ds-section-title {
            color: #777;
            font-size: 16px;
            font-weight: bold;
            font-variant: small-caps;
        }

        .ds-dashboard-title {
            color: #555;
            font-size: 18px;
            font-weight: bold;
            font-variant: small-caps;
        }
    </style>
</div>


<div class="row">
    <div class="col-md-12">
        <p class="ds-dashboard-title">class dashboard</p>
    </div>
    <div class="col-md-6 ds-section">
        <p class="ds-section-title">students</p>
        <div id="section-students"></div>
    </div>
    <div class="col-md-6">
        <div class="row">
            <div class="col-md-12">
                <div id="section-courses" class="ds-section">
                    <p class="ds-section-title">courses</p>
                    <table class="table table-condensed table-fluid">
                        <thead></thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-12">
                <div class="ds-section">
                    <p class="ds-section-title">class</p>
                    <div id="section-class"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Students Section -->
<script>
    // Create and configure an instance of the student's table
    var tableStudents = dashboard.chart.studentsTable()
        .from(classData.from)
        .to(classData.to)
        .height(26);

    // Select the container element, bind the data and invoke the chart
    d3.select('div#section-students')
        .data([classData.students])
        .call(tableStudents);
</script>

<!-- Course Section -->
<script>
    var courses = dashboard.chart.tableCourses()
        .from(classData.from)
        .to(classData.to)
        .height(22);

    d3.select('#section-courses')
        .data([classData.classes])
        .call(courses);
</script>

<!-- Class Section -->
<script>
    var classChart = dashboard.chart.tableClass()
        .from(classData.from)
        .to(classData.to)
        .height(20);

    console.log(classData.weeklyMetrics);

    d3.select('#section-class')
        .data([classData.weeklyMetrics])
        .call(classChart);
</script>

