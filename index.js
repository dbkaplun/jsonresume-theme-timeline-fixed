
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var Mustache = require('mustache');
var gravatar = require('gravatar');
var moment = require('moment');

function render (resume) {
/*
var files = {};
csscustom = csscustom.replace(/url\(["']?(\S*)\.(png|jpg|jpeg|gif)["']?\)/g, function(match, file, type)
{
  var fileName = file + '.' + type;
  var size = fs.statSync(fileName).size;
  if (size > 4096) {
    console.log('Skipping ' + fileName + ' (' + (Math.round(size/1024*100)/100) + 'k)');
    return match;
  }
  else {
    var base64 = fs.readFileSync(fileName).toString('base64');
    if (typeof(files[fileName]) !== 'undefined') {
      console.log('Warning: ' + fileName + ' has already been base64 encoded in the css');
    }
    files[fileName] = true;
    return 'url("data:image/' + (type === 'jpg' ? 'jpeg' : type) + ';base64,' + base64 + '")';
  }
});


cssbootstrap = cssbootstrap.replace(/url\(["']?(\S*)\.(png|jpg|jpeg|gif)["']?\)/g, function(match, file, type)
{
  var fileName = file + '.' + type;
  var size = fs.statSync(fileName).size;
  if (size > 4096) {
    console.log('Skipping ' + fileName + ' (' + (Math.round(size/1024*100)/100) + 'k)');
    return match;
  }
  else {
    var base64 = fs.readFileSync(fileName).toString('base64');
    if (typeof(files[fileName]) !== 'undefined') {
      console.log('Warning: ' + fileName + ' has already been base64 encoded in the css');
    }
    files[fileName] = true;
    return 'url("data:image/' + (type === 'jpg' ? 'jpeg' : type) + ';base64,' + base64 + '")';
  }
});
fs.writeFileSync('theme.css', cssbootstrap + csscustom);
*/


  var template = fs.readFileSync(path.resolve(__dirname, 'index.mustache'), 'utf8');

  if (resume.basics && resume.basics.email && resume.basics.email) {
    resume.basics.gravatar = gravatar.url(resume.basics.email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });
  }
  resume.basics.profiles = (resume.basics.profiles || []).map(function (profile) {
    profile.networkIcon = profile.network.toLowerCase();
    return profile;
  });
  [{
    keys: ['startDate', 'endDate'],
    sections: [resume.work, resume.education]
  }, {
    keys: ['date'],
    sections: [resume.awards]
  }].forEach(function (opts) {
    opts.sections
      .filter(Boolean)
      .forEach(function (section) {
        section.forEach(function (event) {
          opts.keys.forEach(function (key) {
            if (event[key]) {
              event[key + 'Readable'] = moment(event[key]).format('MMMM YYYY');
            } else {
              console.log("no " + key + " in " + JSON.stringify(event));
            }
          });
        });
      });
  });

  return Mustache.render(template, {resume: resume});
}
module.exports = { render: render };