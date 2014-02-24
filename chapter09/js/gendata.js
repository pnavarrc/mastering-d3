/* globals d3:false */

var classData = {
    // Dates
    from: new Date('2013-09-01'),
    to: new Date('2013-10-31'),

    // Students
    students: [
        {id:  0, name: 'Adam Lewis'},
        {id:  1, name: 'Boris Mackenzie'},
        {id:  2, name: 'Sam McDonald'},
        {id:  3, name: 'James Tucker'},
        {id:  4, name: 'Abigail Bower'},
        {id:  5, name: 'Robert Hodges'},
        {id:  6, name: 'Amanda Johnston'},
        {id:  7, name: 'Edward Roberts'},
        {id:  8, name: 'Amanda Bond'},
        {id:  9, name: 'Joshua Hart'},
        {id: 10, name: 'Lillian Rutherford'},
        {id: 11, name: 'Neil Knox'},
        {id: 12, name: 'Lily Dowd'},
        {id: 13, name: 'Luke Carr'},
        {id: 14, name: 'Anne Thomson'}
    ],

    // Classes
    classes: [
        {id: 0, name: 'Art',  assessments: []},
        {id: 1, name: 'Mathematics', assessments: []},
        {id: 2, name: 'History', assessments: []},
        {id: 3, name: 'Literature',  assessments: []}
    ],

    assessments: [
        '2013-09-15',
        '2013-09-30',
        '2013-10-15',
        '2013-10-31'
    ]
};


function generateScores(className) {
    var items = [];
    classData.assessments.forEach(function(d) {
        items.push({
            date: new Date(d),
            score: 45 + Math.floor(Math.random() * 50 - 20 * Math.round(Math.random() < 0.5)),
            className: className
        });
    });

    return items;
}

function generateAbsences(from, to) {

    var items = [], dates = d3.time.days(from, to), dayOfWeek;

    dates.forEach(function(d) {
        dayOfWeek = d.getDay();
        if ((dayOfWeek !== 0) && (dayOfWeek !== 6) && (Math.random() < 0.05)) {
            items.push(d);
        }
    });

    return items;
}


// Generate absences and scores
classData.students.forEach(function(d) {

    d.absences = generateAbsences(classData.from, classData.to);
    d.classes = [];

    classData.classes.forEach(function(u) {
        d.classes.push({
            name: u.name,
            scores: generateScores(u.name)
        });
    });

    // Compute average scores
    var scores = d3.merge(d.classes.map(function(u) { return u.scores; }));
    d.avgScore = d3.mean(scores, function(u) { return u.score; });
});


classData.classes.forEach(function(d) {
    d.avgScores = [];
    classData.assessments.forEach(function(u) {

        d.avgScores.push({
            date: new Date(u),
            score: 45 + Math.floor(Math.random() * 50 - 20 * Math.round(Math.random() < 0.5))
        });

        d.avgScore = d3.mean(d.avgScores, function(m) { return m.score; });
    });
});

classData.weeks = [
    '2013-09-03',
    '2013-09-10',
    '2013-09-17',
    '2013-09-25',
    '2013-10-01',
    '2013-10-08',
    '2013-10-15',
    '2013-10-22',
    '2013-10-29'
];


classData.weeklyMetrics = [];
classData.weeks.forEach(function(d) {
    classData.weeklyMetrics.push({
        date: new Date(d),
        score: 45 + Math.floor(Math.random() * 50 - 20 * Math.round(Math.random() < 0.5)),
        absents: Math.floor(Math.random() * 4)
    });
});




