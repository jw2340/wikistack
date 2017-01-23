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
