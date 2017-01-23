const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.get('/', function(req, res){
  res.status(200);
});

router.post('/', function(req, res){
  res.sendStatus(201, 'submit a new page to the database');
});

router.get('/add', function(req, res){
  res.render('addpage');
});

module.exports = router;
