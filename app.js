const express = require('express');
const app = express();
const routes = require('./routes/');

const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const models = require('./models')
const wikiRouter = require('./routes/wiki');

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

//Logs information about each incoming request.
app.use(morgan('dev'));

//Serves up static files from some kind of public folder
app.use(express.static('public'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// syncing our models
models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

app.use('/', routes());
app.use('/wiki', wikiRouter);


app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});
