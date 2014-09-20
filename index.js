
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var Mustache = require('mustache');
var gravatar = require('gravatar');
var sh = require('execSync');

function render (resume) {
  var css = fs.readFileSync(path.resolve(__dirname, 'css', 'theme.css'), 'utf8');
  var js = fs.readFileSync(path.resolve(__dirname, 'js', 'index.js'), 'utf8');

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


  var template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');

  if(resume.bio && resume.bio.email && resume.bio.email.personal) {
    resume.bio.gravatar = gravatar.url(resume.bio.email.personal, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });
  }
  return Mustache.render(template, {resume: resume, css: css, js: js});
}
module.exports = { render: render };