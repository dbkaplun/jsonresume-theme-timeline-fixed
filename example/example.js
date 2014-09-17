var schema = require('resume-schema');
var resume = schema.resumeJson;
var fs = require('fs');
resume = JSON.parse(fs.readFileSync(__dirname + '/resume.json'));
var theme = require('..');

var html = theme.render(resume);

fs.writeFileSync('example.html', html);

