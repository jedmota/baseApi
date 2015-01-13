var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    //mongoose = require('mongoose');
    PostProvider = require('./postprovider').PostProvider;

var app = express();

// Database

//mongoose.connect('mongodb://localhost/ecomm_database');
var postProvider = new PostProvider('localhost', 27017);

// Config

app.configure(function () {
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
	console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
	res.send('Sample API is running');
});

app.post('/api/posts', function (req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body));
  postProvider.save(req.body , function( error, docs) {
    console.log('Insertion is done!'); 
    res.send(JSON.stringify(docs, null, 2));
  });
});

app.get('/api/posts/where/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  var token = new RegExp(req.param('token'), 'i');
  postProvider.find({ where: token }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/posts/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  var token = new RegExp(req.param('token'), 'i');
  postProvider.find({ where: token }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/posts/bandname/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  var token = new RegExp(req.param('token'), 'i');
  postProvider.find({ bandName: token }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/posts/when/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  var token = new RegExp(req.param('token'), 'i');
  postProvider.find({ when: token }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/posts/weekday/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  var token = new RegExp(req.param('token'), 'i');
  postProvider.find({ weekday: token }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/posts/festival/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  var token = new RegExp(req.param('token'), 'i');
  postProvider.find({ festival: token }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/posts/id/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  postProvider.find({ id: parseInt(req.param('token')) }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/posts', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body));
  postProvider.findAll(function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.delete('/api/posts', function (req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  postProvider.dropDatabase(function(error) {

    if( error )
      res.send('Error dropping the Database...');
    else
    {
      console.log('Database is dropped!');
      res.send('Database is dropped!');
    }
  });
});

// Launch server

app.listen(9000);
// app.listen(9000, 'localhost');
console.log('Server Running...');
