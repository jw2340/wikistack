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
  
  function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}
  

  var page = Page.build({
    title: title,
    content: content
  });

  page.save().then(function(){
    res.redirect('/');
  }).catch(function(err){
    console.error(err);
  });
});

router.get('/add', function(req, res){
  res.render('addpage');
});

module.exports = router;
