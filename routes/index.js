var express = require('express');
var fs = require('fs');
var url = require("url");
var router = express.Router();
var tree = require('../tools/tree.js');
var path = require('path');


/* GET method. */
router.get('/', index_func);
router.get('/loadfile', loadfile_func);

/* POST method */
router.post('/save',save_func);
router.post('/loadtree', loadtree_func);


function save_func(req, res, next) {
  fs.writeFile(req.body.filename, req.body.code, function (err) {
    if(err)
      console.log(err);
    res.send({'result':'success'});
  });
}

function loadfile_func(req, res, next) 
{
  var params = url.parse(req.url, true).query;
  fs.readFile(params.filename, function (err, data) {
    if(err)
      console.log(err);
    else
      res.send(data);
  });
}

function index_func(req, res, next) 
{
  fs.readFile('./project.json', function (err, data) {
    res.render('index', {'projectjson':JSON.parse(data)});
  });
}

function loadtree_func(req, res, next)
{
  tree.readpath( path.isAbsolute(req.body.path)?req.body.path:(path.join(__dirname, '..', req.body.path)), function (data) {
    res.send(data);
  })
}

module.exports = router;
