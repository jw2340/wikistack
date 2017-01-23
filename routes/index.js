const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res){
  var pages = Page.findAll({
    attributes: ['title', 'urlTitle']
  }).then(function(pages){
    res.render('index', {pages: pages})
  });
})

module.exports = function() {
  return router;
}