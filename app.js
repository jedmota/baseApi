var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    //mongoose = require('mongoose');
    ConcertProvider = require('./concertprovider').ConcertProvider;

var app = express();

// Database

//mongoose.connect('mongodb://localhost/ecomm_database');
var concertProvider = new ConcertProvider('localhost', 27017);

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

app.post('/api/concerts', function (req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body));
  concertProvider.save(req.body , function( error, docs) {
    console.log('Insertion is done!'); 
    res.send(JSON.stringify(docs, null, 2));
  });
});

app.get('/api/concerts/where/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  var token = new RegExp(req.param('token'), 'i');
  concertProvider.find({ where: token }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/concerts/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  var token = new RegExp(req.param('token'), 'i');
  concertProvider.find({ where: token }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/concerts/bandname/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  var token = new RegExp(req.param('token'), 'i');
  concertProvider.find({ bandName: token }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/concerts/when/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  var token = new RegExp(req.param('token'), 'i');
  concertProvider.find({ when: token }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/concerts/weekday/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  var token = new RegExp(req.param('token'), 'i');
  concertProvider.find({ weekday: token }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/concerts/festival/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  var token = new RegExp(req.param('token'), 'i');
  concertProvider.find({ festival: token }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/concerts/id/:token', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  concertProvider.find({ id: parseInt(req.param('token')) }, function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.get('/api/concerts', function(req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body));
  concertProvider.findAll(function(error, emps){
    res.send(JSON.stringify(emps, null, 2));
  });
});

app.delete('/api/concerts', function (req, res) {
  console.log(req.method + ': ' + req.url + ' ' + JSON.stringify(req.body)); 
  concertProvider.dropDatabase(function(error) {

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
