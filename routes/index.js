const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.get('/', function(req, res){
  res.render('index');
})





module.exports = function() {
  return router;
}