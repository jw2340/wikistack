const express = require('express');
const app = express();
const routes = require('./routes/');

const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

//Logs information about each incoming request.
app.use('/', function(req, res, next){
  console.log(req.method, req.path, req.statusCode);
  next();
});

var server = app.listen(3000, function(){
  console.log('server listening');
})

app.use('/', routes());

//Serves up static files from some kind of public folder
app.use(express.static('public'));

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);
