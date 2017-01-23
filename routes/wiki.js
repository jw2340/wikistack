const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res){
  res.status(200);
  res.redirect('../');
});

router.post('/', function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;

  var page = Page.build({
    title: title,
    content: content,
  });

  page.save().then(function(savedPage){
    console.log('this is the savedpage',savedPage.route);
    res.redirect(savedPage.route); ///???
  }).catch(function(err){
    console.error(err);
  });
});

router.get('/add', function(req, res){
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
  var title = req.params.urlTitle;

  Page.findOne({
    where : {
      title: title
    }
  })
  .then(function(page) {
    //res.json(data[0]);
    res.render('wikipage', {page : page});
  })
  .catch(next);

});

module.exports = router;
